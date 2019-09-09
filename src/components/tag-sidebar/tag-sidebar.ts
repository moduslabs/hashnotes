import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  private static readonly TAG_REGEX_GLOBAL = /#[\w\-]+(?<=\s|$)/g;
  private static readonly TAG_CONTENT_REGEX = /(?:<\w+>)?(.*?)(?:\s*#)/;

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
      .filter((line: string): boolean => line.includes(tagName))
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
    const tagMatches =
      noteContent.match(TagSidebarComponent.TAG_REGEX_GLOBAL) || [];
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

  public tagTracker(_index: number, tag: Tag): string {
    return `${tag.name}-${tag.content.join('-')}`;
  }

  public contentTracker(_index: number, content: string): string {
    return content;
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
