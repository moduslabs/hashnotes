import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { Note } from '../../interfaces/note';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-tag-sidebar',
  styleUrls: ['tag-sidebar.scss'],
  templateUrl: 'tag-sidebar.html',
})
export class TagSidebarComponent implements OnChanges {
  @Input() public readonly noteContent: string;
  
  public tags = [];

  public ngOnChanges(): void {
    const findTags = /#[\w\-]+/g;
    let m: Array<any> | RegExpExecArray;
    const tagsNew = [];
    do {
      m = findTags.exec(this.noteContent);
      if (m) {
        if (!tagsNew.some((tag) => tag.name === m[0])) { // skip if tag already appears in list
          tagsNew.push({
            content: [],
            name: m[0],
          });
        }
      }
    } while (m);
    
    const editorLines = this.noteContent.split("\n");
    tagsNew.forEach(tag => {
      const taggedLines = editorLines.filter((line) => line.includes(tag.name))
      taggedLines.forEach((line) => {
        const findContent = /(<\w+>)?(.*?)\s*#/g;
        m = findContent.exec(line)
        if (m) {
          tag.content.push(m[2])
        } else {
          tag.content.push("") // shouldn't execute
        }
      });
    });

    this.tags = tagsNew;
  }

  public tagTracker(index, item): any {
    return item.name;
  }

  public contentTracker(index, item): any {
    return item;
  }
}
