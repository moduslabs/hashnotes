// tslint:disable-next-line no-implicit-dependencies
import { browser, by, element } from "protractor";

export class AppPage {
  public async navigateTo(): Promise<any> {
    return browser.get("/");
  }

  public async getParagraphText(): Promise<string> {
    return element(by.deepCss("app-root ion-content")).getText();
  }
}
