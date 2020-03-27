
/** Page selenium page-object-prototype */
export default class Page {
    constructor(title, path) {
        this.title = title;
        this.path = path;
    }

    open() {
        browser.url(this.path);
    }
}
