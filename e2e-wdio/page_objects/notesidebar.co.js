class NoteSidebarCo {

    get component() { return $('//hn-note-sidebar'); }

    get backToNotesButton() { return $('ion-button.back-to-notes-button'); }

    get newButtonSideBar() { return $('ion-button.new-note-button'); } // $('//ion-button[@class="new-note-button"]'); }

    get notesList() { return $('//ion-list'); }

    get searchBar() { return $('input.searchbar-input'); }

    get trashFolder() { return $('ion-button.trash-button');} // $('//ion-button[@class="trash-button"]'); }

    get lastNoteAdded(){
        const noteList = $$('//hn-note-list//ion-list/ion-item');
        return $(noteList[0].$('.//div[@class="date"]'));
    }

    get numOfNotes(){
        return $$('//hn-note-list//ion-list/ion-item');
    }

    get textOfSearchedNote() { return $('//div[@class="listItemTitle"]');}

    get errorMessage() { return this.component.$('//p[@class="no-matching-notes"]')}

    isErrorDisplayed () {
        return this.errorMessage.getText();
    }

    textSearchedNote() {
       return this.textOfSearchedNote.getText()
    }

    searchText(search){
        this.searchBar.addValue(search);
    }

    selectNote(){
        this.lastNoteAdded.click();
    }
    getNumberOfNotes(){
        return this.numOfNotes.length;
    }

    getNoteTime(){
        return this.lastNoteAdded.getText();
    }

    newButtonDisplayed(){
        this.newButtonSideBar.waitForDisplayed();
    }

    newButtonExists(){
        this.newButtonSideBar.isExisting();
    }

    addNewNoteSidebar(){
        this.newButtonSideBar.click();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }

    isLoremFound(){
        /*.........*/
    }

    isNoteAdded(){
        expect(this.notesList.length).to.not.equal(0);
    }

    isNoteFound(){
        /* ......... */
    }

    isSearchBarFocus(){
        expect(this.searchBar.click());
    }

    isTrashFolderLoad(){
        this.backToNotesButton.waitForDisplayed();
    }

    backToNotesExists(){
        this.backToNotesButton.isExisting();
    }

    backToNotes(){
        this.backToNotesButton.click();
    }

    isTrashButtonLoaded(){
        this.trashFolder.waitForDisplayed()
    }

    openTrashFolder(){
        this.trashFolder.click();
    }
}

module.exports = new NoteSidebarCo();
