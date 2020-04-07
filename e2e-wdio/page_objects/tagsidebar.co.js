class TagSidebarCo {

    get component() { return $('//hn-tag-sidebar'); }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new TagSidebarCo();
