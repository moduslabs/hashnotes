import { When } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

//Create note feature
When(/^the user deletes the note$/, {}, () => {
    HashNotesPage.getNoteEditor().openFileMenu();
    browser.pause(2000)
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

When(/^User clicks on the search note field/, {},() =>{
    HashNotesPage.getNoteSidebar().isSearchBarFocus();
});


