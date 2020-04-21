import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
});

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

Given(/^the trash folder is opened$/, {}, () => {
    HashNotesPage.getNoteSidebar().openTrashFolder();
});

