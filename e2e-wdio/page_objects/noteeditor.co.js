class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get componentMenu() { return $('//div[@role="menu"]');}

    get textArea() { return $('#tinymce > h1');}

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    get fileMenu() { return this.component.$('.//span[text()="File"]');}

    get newNoteBtn () {return this.componentMenu.$('.//div[text()="New note"]');}

    get delNoteBtnFile () {return this.componentMenu.$('.//div[text()="Delete note"]');}

    get delNoteBtnEditor () {return this.component.$('.//button[@title="Delete note"]');}

    get editMenu() { return this.component.$('.//span[text()="Edit"]');} 

    get undoBtnEditMenu() {return this.componentMenu.$('.//div[@title="Undo"]');}

    get undoBtnEditBar() {return this.component.$('.//button[@title="Undo"]');}

    
    clickUndoBtnEditBar(){
        this.undoBtnEditBar.click();
    }

    clickUndoBtn(){
        this.undoBtnEditMenu.click();
    }

    clickEditBtn(){
        this.editMenu.click();
    }

    addAreaText(anyText){
        this.textArea.addValue(anyText);
    }

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
