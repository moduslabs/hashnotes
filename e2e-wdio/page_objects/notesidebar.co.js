class NoteSidebarCo {

    get component() { return $('//hn-note-sidebar'); }

    get backToNotesButton() { return $('//ion-button.back-to-notes-button'); }

    get newButton() { return $('ion-button.new-note-button'); } // $('//ion-button[@class="new-note-button"]'); }

    get notesList() { return $('//ion-list'); }

    get searchBar() { return $('input.searchbar-input'); }

    get trashFolder() { return $('ion-button.trash-button');} // $('//ion-button[@class="trash-button"]'); }

    addNewNote(){
        this.newButton.click();
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
