class NoteEditorCo {

    get component() { return $('//hn-note-editor'); }

    get componentMenu() { return $('//div[@class="tox-menubar"]');}

    get toolBarMenu() {return $('//div[@class="tox-toolbar__primary"]');}

    get textArea() { return $('#tinymce h1:first-child');}

    get formatDropDown() { return $('//div[@class="tox-menu"]');}

    get insertLinkComponent(){ return $('//div[@class="tox-dialog"]');}

    get statusBar() { return this.component.$('.//div[@class="tox-statusbar"]'); }

    get fileMenu() { return this.component.$('.//span[text()="File"]');}

    get newNoteBtn () {return this.componentMenu.$('//div[@title="New note"]');}

    get delNoteBtnFile () {return this.componentMenu.$('//div[@title="Delete note"]');}

    get delNoteBtnEditor () {return this.component.$('.//button[@title="Delete note"]');}

    get editMenu() { return this.component.$('.//span[text()="Edit"]');} 

    get undoBtnEditMenu() {return this.componentMenu.$('//div[@title="Undo"]');}

    get undoBtnEditBar() {return this.component.$('.//button[@title="Undo"]');}

    get redoBtnEditMenu() {return this.componentMenu.$('//div[@title="Redo"]');}

    get redoBtnEditBar() {return this.component.$('.//button[@title="Redo"]');}

    get boldBtnEditBar() {return this.component.$('.//button[@title="Bold"]');}

    get copyBtnEditMenu() {return this.componentMenu.$('.//div[@title="Copy"]');}

    get pasteBtnEditMenu() {return this.componentMenu.$('.//div[@title="Paste"]');}

    get formatMenu() {return this.component.$('.//span[text()="Format"]');}

    get underlineBtn() {return this.componentMenu.$('//div[@title="Underline"]')};

    get superscriptBtn() {return this.componentMenu.$('//div[@title="Superscript"]')};

    get codeBtn() {return this.componentMenu.$('//div[@title="Code"]')};

    get formatingApplied() {return this.toolBarMenu.$('//span[@class="tox-tbtn__select-label"]');}

    get helpBtn() { return this.component.$('.//span[text()="Help"]');}

    get shorcutListBtn() { return $('//div[text()="Shortcut list"]');}

    get shortcutListPrompt() { return $('//div[@class="tox-dialog"]');}

    get numListBtn() {return this.toolBarMenu.$('.//button[@title="Numbered list"]');}

    get bulletListBtn() {return this.toolBarMenu.$('.//button[@title="Bullet list"]');}

    get headingsOpt() { return $('//div[@title="Headings"]');}

    get headingOneOpt() {return $('//div[@title="Heading 1"]');}

    get alignLeftBtn() {return this.toolBarMenu.$('.//button[@title="Align left"]');}

    get alignCenterBtn() {return this.toolBarMenu.$('.//button[@title="Align center"]');}

    get alignRightBtn() {return this.toolBarMenu.$('.//button[@title="Align right"]');}

    get justifyBtn() {return this.toolBarMenu.$('.//button[@title="Justify"]');}

    get insertBtn() {return this.component.$('.//span[text()="Insert"]');}

    get linkBtn() {return $('.//div[@title="Link..."]');}

    get urlField() {return this.insertLinkComponent.$('.//input[@type="url"]')}

    get saveLinkBtn() {return this.insertLinkComponent.$('.//button[@title="Save"]')}

    clickSaveLinkBtn(){
        this.saveLinkBtn.click();
    }

    addUrl(url){
        this.urlField.addValue(url);
    }

    clickLinkBtn(){
        this.linkBtn.click();
    }

    clickInsertBtn(){
        this.insertBtn.click();
    }

    textAttribute(attribute){
        return this.textArea.getAttribute(attribute)
    }

    clickAlignLeftBtn(){
        this.alignLeftBtn.click();
    }

    clickAlignCenterBtn(){
        this.alignCenterBtn.click();
    }

    clickAlignRightBtn(){
        this.alignRightBtn.click();
    }

    clickJustifyBtn(){
        this.justifyBtn.click();
    }

    clickheadingOneOpt(){
        this.headingOneOpt.click();
    }

    clickHeadingOpt(){
        this.headingsOpt.click();
    }

    clickFormatDropDown(){ 
        this.formatingApplied.click();
    }

    isBulletListBtnPressed(){
        return this.bulletListBtn.getAttribute('aria-pressed');
     }

    isNumListBtnPressed(){
       return this.numListBtn.getAttribute('aria-pressed');
    }

    clickBulletListBtn(){
        this.bulletListBtn.click();
    }

    clickNumListBtn() {
        this.numListBtn.click();
    }

    shortcutListDisplayed(){
        return this.shortcutListPrompt.isDisplayed();
    }

    clickShorcutListBtn(){
        this.shorcutListBtn.click();
    }

    clickHelpBtn() {
        this.helpBtn.click();
    }

    getFormatingApplied(){
        return this.formatingApplied.getText();
    }
    clickCodeBtn(){
        this.codeBtn.click();
    }

    clickSuperscriptBtn(){
        this.superscriptBtn.click();
    }

    clickUnderlineBtn(){
        this.underlineBtn.click();
    }

    clickFormatBtn(){
        this.formatMenu.click();
    }

    clickBtnCopy(){
        this.copyBtnEditMenu.click();
    }

    clickBtnPaste(){
        this.pasteBtnEditMenu.click();
    }

    clickBoldBtn() {
        this.boldBtnEditBar.click();
    }

    clickRedoBtnEditBar(){
        this.redoBtnEditBar.click();
    }

    clickRedoBtn(){
        this.redoBtnEditMenu.click();
    }

    deleteAreaText(){
        this.textArea.clearValue();
    }

    getAreaText(){
        return this.textArea.getText();
    }
    
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
