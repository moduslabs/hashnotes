import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

//Create note feature
Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
});
//Create note feature
Given(/^there is only one note in the list$/, {}, () => {
    let numOfNotes = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    console.log(numOfNotes);
    if (numOfNotes > 1){
        for(let i = 1; i < numOfNotes; i++ ){
            HashNotesPage.getNoteEditor().openFileMenu();
            browser.pause(2000)
            HashNotesPage.getNoteEditor().deleteNote()
            browser.pause(2000)
        }
    }
    
});
//Create note feature & //Access and exit trash folder feature
Given(/^the trash folder is opened$/, {}, () => {
    HashNotesPage.getNoteSidebar().openTrashFolder();
    browser.pause(2000);
});
//Delete notes feature
Given(/^a new note is created$/, {}, () => {
    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    HashNotesPage.getNoteSidebar().addNewNoteSidebar();
    browser.setTimeout({'implicit': 3000 })
});

// Given(/^a containing)

