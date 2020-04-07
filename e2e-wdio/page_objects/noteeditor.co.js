class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    get fileMenu() { return this.component.$('.//span[text()="File"]');}

    get newNoteMenu () {return $('.//div[text()="New note"]');}


    addNoteMenu(){
        this.newNoteMenu.click();
    }

    openFileMenu(){
        this.fileMenu.click();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new NoteEditorCo();
