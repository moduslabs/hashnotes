class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get componentMenu() { return $('//div[@role="menu"]');}

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    get fileMenu() { return this.component.$('.//span[text()="File"]');}

    get newNoteBtn () {return this.componentMenu.$('.//div[text()="New note"]');}

    get delNoteBtnFile () {return this.componentMenu.$('.//div[text()="Delete note"]');}

    get delNoteBtnEditor () {return this.component.$('.//button[@title="Delete note"]');}

    deleteNote(){
        this.delNoteBtnFile.click();
    }

    deleteNoteEditor(){
        this.delNoteBtnEditor.click();
    }

    addNote(){
        this.newNoteBtn.click();
    }

    openFileMenu(){
        this.fileMenu.click();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new NoteEditorCo();
