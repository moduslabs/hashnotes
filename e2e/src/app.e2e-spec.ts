import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load', async () => {
    await page.navigateTo();
    expect(true).toBe(true);
  });
});
