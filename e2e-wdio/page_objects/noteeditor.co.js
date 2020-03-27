class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new NoteEditorCo();
