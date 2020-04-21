import { When } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

When(/^the user deletes the note$/, {}, () => {
    HashNotesPage.getNoteEditor().openFileMenu();
    browser.pause(2000)
    HashNotesPage.getNoteEditor().deleteNote()
});

When(/^the user clicks the "New Note" button from the File menu$/, {},() =>{
    browser.pause(5000);
    HashNotesPage.getNoteEditor().openFileMenu();
    browser.pause(2000);
    HashNotesPage.getNoteEditor().addNote();
    browser.pause(2000);
});

When(/^User clicks on the search note field/, {},() =>{
    HashNotesPage.getNoteSidebar().isSearchBarFocus();
});


When(/^the user clicks the "New Note" button from (.*)/,{}, (location) => {
    HashNotesPage.getNoteSidebar().newButtonExists();
    if(location === "sidebar"){
            HashNotesPage.getNoteSidebar().addNewNoteSidebar();
            browser.pause(5000);
    } else if(location === "file_menu") {
            HashNotesPage.getNoteEditor().openFileMenu();
            browser.pause(5000);
            HashNotesPage.getNoteEditor().addNote();
    } else {
        throw new Error(`Invalid argument exception ${location}`)
    }
});
