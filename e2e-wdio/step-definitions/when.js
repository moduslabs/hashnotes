import { When } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

When(/^User clicks on New note button$/, {}, () => {
    HashNotesPage.getNoteSidebar().addNewNote();
});

When(/^User clicks the Trash folder option$/, {},() =>{
    HashNotesPage.getNoteSidebar().trashFolderLoad();
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
            HashNotesPage.getNoteEditor().addNoteMenu();
    } else {
        throw new Error(`Invalid argument exception ${location}`)
    }
});
