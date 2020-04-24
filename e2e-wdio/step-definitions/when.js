import { When } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

//Create note feature
When(/^the user deletes the note$/, {}, () => {
    HashNotesPage.getNoteEditor().openFileMenu();
    browser.pause(1000)
    HashNotesPage.getNoteEditor().deleteNote()
});
//Create note feature
When(/^the user creates a new note from the File menu inside the trash folder$/, {},() =>{
    HashNotesPage.getNoteSidebar().isTrashFolderLoad();
    HashNotesPage.getNoteEditor().openFileMenu();
    browser.pause(2000)
    HashNotesPage.getNoteEditor().addNote();
});
//Create note feature
When(/^the user clicks the "New Note" button from (.*)$/,{}, (location) => {
    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    if(location === "sidebar"){
            HashNotesPage.getNoteSidebar().addNewNoteSidebar();
            browser.pause(2000);
    } else if(location === "file_menu") {
            HashNotesPage.getNoteEditor().openFileMenu();
            browser.pause(2000);
            HashNotesPage.getNoteEditor().addNote();
    } else {
        throw new Error(`Invalid argument exception ${location}`)
    }
});
//Access and exit trash folder feature
When(/^the user clicks the "Trash Folder" button from sidebar$/, {}, () => {
    HashNotesPage.getNoteSidebar().isTrashButtonLoaded();
    HashNotesPage.getNoteSidebar().openTrashFolder();
    browser.pause(2000);
});
//Access and exit trash folder feature
When(/^the user clicks the "Back to notes" button$/, {}, () => {
    HashNotesPage.getNoteSidebar().backToNotes();
    browser.pause(2000);
});
//Delete notes feature
When(/^the user clicks the "Delete Note" icon from editor menu$/, {},() =>{
    HashNotesPage.getNoteEditor().openFileMenu();
    HashNotesPage.getNoteEditor().deleteNote()
});
//Delete notes feature
When(/^the user clicks the "Cancel" button from notification prompt$/, {},() =>{
    let numOfNotes = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    console.log(numOfNotes + 'prima');
    if (numOfNotes === 1){
        HashNotesPage.getPrompt().cancelBtnClick();
    }else {
        throw new Error('There are more then 1 notes in the list')
    }
});

When(/^User clicks on the search note field/, {},() =>{
    HashNotesPage.getNoteSidebar().isSearchBarFocus();
});




