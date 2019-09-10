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

  public get noteContent(): string {
    return this._noteContent;
  }
  public get title(): string {
    return this._noteContent.split('\n')[0];
  }
  private static readonly CLASSNAME_COPY_BULLET = 'tag-summary-copy-bullet';
  private static readonly CLASSNAME_COPY_SPACER = 'tag-summary-copy-spacer';
  private static readonly TAG_CONTENT_REGEX = /(.*)(?:<span class="hashtag">)(?:.*)(?:<\/span>)/;
  private static readonly TAG_REGEX = /(?:<span class="hashtag">)(.*)(?:<\/span>)/;
  private static readonly TAG_REGEX_GLOBAL = /(?:<span class="hashtag">)(#[\w\-]+)(?:<\/span>)/g;

  @ViewChild('tagSummary', { static: false }) public tagSummary: ElementRef;

  public tags: Array<Tag> = [];

  private _noteContent = '';

  private static findTagContentInNoteContentLines({
    noteContentLines,
    tagName,
  }: {
    noteContentLines: Array<string>;
    tagName: string;
  }): Array<string> {
    return noteContentLines
      .filter((line: string): boolean =>
        line.includes(`<span class="hashtag">${tagName}</span>`),
      )
      .map(
        (line: string): string =>
          line.match(TagSidebarComponent.TAG_CONTENT_REGEX)[1],
      );
  }

  private static findTagsInNoteContent({
    noteContent,
  }: {
    noteContent: string;
  }): Array<Tag> {
    const tagSpanMatches =
      noteContent.match(TagSidebarComponent.TAG_REGEX_GLOBAL) || [];
    const tagMatches =
      tagSpanMatches.map(
        (tagSpan: string): string =>
          tagSpan.match(TagSidebarComponent.TAG_REGEX)[1],
      ) || [];
    const tagMatchesUnique = [...new Set(tagMatches)];

    const noteContentLines = noteContent.split('\n');

    return tagMatchesUnique.map(
      (tagName: string): Tag => ({
        content: TagSidebarComponent.findTagContentInNoteContentLines({
          noteContentLines,
          tagName,
        }),
        name: tagName,
      }),
    );
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
    this.tags.push(
      ...TagSidebarComponent.findTagsInNoteContent({
        noteContent: this.noteContent,
      }),
    );
  }
}
