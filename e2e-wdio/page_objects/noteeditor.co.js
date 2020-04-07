class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get componentMenu() { return $('//div[@role="menu"]');}

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    get fileMenu() { return this.component.$('.//span[text()="File"]');}

    get newNoteCreate () {return this.componentMenu.$('.//div[text()="New note"]');}


    addNoteMenu(){
        this.newNoteCreate.click();
    }

    openFileMenu(){
        this.fileMenu.click();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new NoteEditorCo();
