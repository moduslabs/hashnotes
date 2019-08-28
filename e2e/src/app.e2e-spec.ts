import { AppPage } from "./app.po";

describe("new App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should be blank", async () => {
    await page.navigateTo();
    const text = await page.getParagraphText();
    await expect(text).toContain("The world is your oyster.");
  });
});
