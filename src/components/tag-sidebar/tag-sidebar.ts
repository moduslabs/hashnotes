import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { Tag } from '../../interfaces/tag';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-tag-sidebar',
  styleUrls: ['tag-sidebar.scss'],
  templateUrl: 'tag-sidebar.html',
})
export class TagSidebarComponent {
  @Input() public set noteContent(noteContent: string) {
    this._noteContent = noteContent ? noteContent : '';
    this.onNoteContentChange();
  }

  @Input() public set editor(editor: any) {
    this._editor = editor ? editor : undefined;
    this.onNoteContentChange();
  }

  public get noteContent(): string {
    return this._noteContent;
  }

  public get editor(): any {
    return this._editor;
  }

  public get title(): string {
    return this._noteContent.split('\n')[0];
  }

  private static readonly CLASSNAME_COPY_BULLET = 'tag-summary-copy-bullet';
  private static readonly CLASSNAME_COPY_SPACER = 'tag-summary-copy-spacer';
  private static readonly HASHTAG_DELIMITER_REGEX_GLOBAL = /[_-]/g;
  private static readonly ALLOWED_HTML_TAGS = ["STRONG", "EM", "SPAN", "A", "CODE", "SUB", "SUP"];

  @ViewChild('tagSummary', { static: false }) public tagSummary: ElementRef;

  public tags: Array<Tag> = [];

  private _noteContent = '';
  private _editor = undefined;

  private static sanitizeMiddleHashtag(hashtag: string): string {
    return hashtag
      .substring(1, hashtag.length)
      .replace(TagSidebarComponent.HASHTAG_DELIMITER_REGEX_GLOBAL, ' ');
  }

  private static isLeadingTag(element: Element): boolean {
    let isLeadingTag = false;
    if (!element.previousSibling) {
      isLeadingTag = true;
    } else if (!element.previousElementSibling && !element.previousSibling.textContent.trim()) {
      isLeadingTag = true;
    } else if (!!element.previousElementSibling && element.previousElementSibling.className === "hashtag" && (!element.previousSibling.textContent.trim() || element.previousSibling === element.previousElementSibling)) {
      isLeadingTag = TagSidebarComponent.isLeadingTag(element.previousElementSibling);
    }

    return isLeadingTag;
  }

  private static isTrailingTag(element: Element): boolean {
    let isTrailingTag = false;
    if (!element.nextSibling) {
      isTrailingTag = true;
    } else if (!element.nextElementSibling && !element.nextSibling.textContent.trim()) {
      isTrailingTag = true;
    } else if (!!element.nextElementSibling && element.nextElementSibling.className === "hashtag" && (!element.nextSibling.textContent.trim() || element.nextSibling === element.nextElementSibling)) {
      isTrailingTag = TagSidebarComponent.isTrailingTag(element.nextElementSibling);
    }

    return isTrailingTag;
  }

  private static findTagsInEditor(editor: any): Array<Tag> {
    const tagSpans = editor.$('span.hashtag').toArray()
    const uniqueTagLines = [...new Set(tagSpans.map((tagSpan: HTMLElement): HTMLElement => tagSpan.closest("body > *") as HTMLElement))]
    const uniqueTagNames = [...new Set(tagSpans.map((tagSpan: HTMLElement): string => tagSpan.innerText))]
    const tags = uniqueTagNames.map((tagName: string): Tag => 
      ({
        content: uniqueTagLines
          .filter(
            (line: HTMLElement): boolean => 
            Array.from(line.querySelectorAll("span.hashtag"))
            .map(
              (tagSpan: HTMLElement): string => tagSpan.innerText
            )
            .includes(tagName)
          )
          .map((tagLine: HTMLElement): string => TagSidebarComponent.filterLineContent(tagLine)),
        name: tagName,
      }),
    )
    
    return tags;
  }

  private static filterLineContent(tagLine: HTMLElement): string {
    const tagLineNodeCopy = (tagLine.cloneNode(true)) as HTMLElement
    tagLineNodeCopy.normalize()
    const tagSpanElements = Array.from(tagLineNodeCopy.querySelectorAll("span.hashtag"))
    tagSpanElements.filter((element: HTMLElement) => TagSidebarComponent.isLeadingTag(element) || TagSidebarComponent.isTrailingTag(element))
    .forEach((element: HTMLElement) => {
      element.remove()
    })
    const middleTagSpanElements = Array.from(tagLineNodeCopy.querySelectorAll("span.hashtag"))
    middleTagSpanElements.forEach((element: HTMLElement) => {
      element.innerHTML = TagSidebarComponent.sanitizeMiddleHashtag(element.innerText)
    })
    const lineElements = Array.from(tagLineNodeCopy.querySelectorAll("*"))
    const invalidElements = lineElements.filter((element: HTMLElement) => 
      !TagSidebarComponent.ALLOWED_HTML_TAGS.includes(element.nodeName)
    )
    invalidElements.forEach((element : HTMLElement) => {
      const parentNode = element.parentNode;
      while (element.firstChild) {
        parentNode.insertBefore(element.firstChild, element);
      }
      parentNode.removeChild(element);  
      parentNode.normalize();
    })
    const filteredHtml = tagLineNodeCopy.innerHTML
    tagLineNodeCopy.remove()

    return filteredHtml
  }

  private static getTagSummaryText(node: any): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return `${node.textContent}`;
    }
    if (
      !!node.className &&
      node.className === TagSidebarComponent.CLASSNAME_COPY_SPACER
    ) {
      return '\n';
    }
    if (
      !!node.className &&
      node.className === TagSidebarComponent.CLASSNAME_COPY_BULLET
    ) {
      return '- ';
    }

    let text = '';
    for (const childNode of node.childNodes) {
      text += TagSidebarComponent.getTagSummaryText(childNode);
    }

    return text;
  }

  constructor(private readonly clipboardService: ClipboardService) {}

  public tagTracker(_index: number, tag: Tag): string {
    return `${tag.name}-${tag.content.join('-')}`;
  }

  public contentTracker(_index: number, content: string): string {
    return content;
  }

  public onExportButtonClick(): void {
    print();
  }

  public onCopyButtonClick(): void {
    this.clipboardService.copyFromContent(
      TagSidebarComponent.getTagSummaryText(this.tagSummary.nativeElement),
    );
  }

  private onNoteContentChange(): void {
    this.tags.length = 0;
    if (this.editor) {
      this.tags.push(...TagSidebarComponent.findTagsInEditor(this.editor));
    }
  }
}
