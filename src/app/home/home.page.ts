import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  styleUrls: ["home.page.scss"],
  templateUrl: "home.page.html",
})
export class HomePage {
  public editorContents = `<h1>WebEx University Kickoff Notes</h1>
<p>Todd Wilkens: runs partner ops for CC #people</p>
<p>Eric Wilkens: Cloud ops subset, provisioning, partner help desk #people</p>
<p></p>
<h2>What is it?</h2>
<p>Training became part of BU</p>
<p>Before all revenue based, take a course and pay for it</p>
<p>Focus has shift. Gain seats, provide better service to partners adding seats.</p>
<p>Tier 1 services interface with end users, confused on tech. It's advanced, not plug & play.</p>
<p>End users go to partners, partners aren't trained. Train the trainer approach, main trainer isn't retaining everything.</p>
<p></p>
<p>Sell what we have vs what we don't have #pain-point</p>
<p></p>
<p>What can partners get in return for certifying? What is their incentive? #question</p>
<p></p>
<p>Why do 146/893 sales partner enroll but not start? #question</p>`;
  public tags = [];

  public updateTags(): void {
    const re = /<p>(.+)#([\w\-]+)<\/p>/g;
    let m: Array<any> | RegExpExecArray;
    const tagsNew = [];
    do {
      m = re.exec(this.editorContents);
      if (m) {
        if (tagsNew.some((tag) => tag.name === m[2])) { // merge if tag already appears in list
          tagsNew.find((tag) => tag.name === m[2]).content.push(m[1])
        } else {
          tagsNew.push({
            content: [m[1]],
            name: m[2],
          });
        }
      }
    } while (m);
    this.tags = tagsNew;
  }

  public identifyTag(index, item): any {
    return item.name;
  }

  public identifyContent(index, item): any {
    return item;
  }
}
