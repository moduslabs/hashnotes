class NoteSidebarCo {

    get component() { return $('//hn-note-sidebar'); }

    get backToNotesButton() { return $('//ion-button.back-to-notes-button'); }

    get newButtonSideBar() { return $('ion-button.new-note-button'); } // $('//ion-button[@class="new-note-button"]'); }

    get notesList() { return $('//ion-list'); }

    get searchBar() { return $('input.searchbar-input'); }

    get trashFolder() { return $('ion-button.trash-button');} // $('//ion-button[@class="trash-button"]'); }

    get lastNoteAdded(){
        const noteList = $$('//hn-note-list//ion-list/ion-item');
        return $(noteList[0].$('.//div[@class="date"]'));
    }

    getNoteTime(){
        console.log(this.lastNoteAdded.getText());
    }

    newButtonExists(){
        this.newButtonSideBar.waitForDisplayed();
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
        expect(this.backToNotesButton);
    }

    setSearchBar(searchCriteriaVal) {
        this.searchBar.val = searchCriteriaVal
    }

    trashFolderLoad(){
        this.trashFolder.click();
    }
}

module.exports = new NoteSidebarCo();
