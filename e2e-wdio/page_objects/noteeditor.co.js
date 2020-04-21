class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get componentMenu() { return $('//div[@role="menu"]');}

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    get fileMenu() { return this.component.$('.//span[text()="File"]');}

    get newNoteButton () {return this.componentMenu.$('.//div[text()="New note"]');}

    get deleteNoteButton () {return this.componentMenu.$('.//div[text()="Delete note"]');}

    deleteNote(){
        this.deleteNoteButton.click();
    }

    addNote(){
        this.newNoteButton.click();
    }

    openFileMenu(){
        this.fileMenu.click();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new NoteEditorCo();
