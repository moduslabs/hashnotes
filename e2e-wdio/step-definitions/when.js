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
When(/^the user deletes a note using the "Delete Note" button from File menu$/, {},() =>{

    let numOfNotesBeforeDelete = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    browser.config.ScenarioCtx["numOfNotesBeforeDelete"] = numOfNotesBeforeDelete;

    HashNotesPage.getNoteEditor().openFileMenu();
    HashNotesPage.getNoteEditor().deleteNote()
});
//Delete notes feature
When(/^the user clicks the "Cancel" button from notification prompt$/, {},() =>{   
    let numOfNotesBeforeCancel = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    //browser.config.ScenarioCtx["numOfNotesBeforeCancel"] = numOfNotesBeforeCancel;

    if (numOfNotesBeforeCancel === 1){
        HashNotesPage.getPrompt().cancelBtnClick();
    }else{
        throw new Error('There are more then 1 notes in the list')
    }
});
//Delete notes feature
When(/^the user clicks the "Dismiss" button from notification prompt$/, {},() =>{
        HashNotesPage.getPrompt().dismissBtnClick();
});
//Delete notes feature
When(/^the user clicks the "Delete Note" icon from (.*)$/, {},(location) =>{   
    let numOfNotesBeforeDelete = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    browser.config.ScenarioCtx["numOfNotesBeforeDelete"] = numOfNotesBeforeDelete;

    if(location === "list_menu"){
            HashNotesPage.getNoteEditor().openFileMenu();
            HashNotesPage.getNoteEditor().deleteNote();
    } else if(location === "editor_menu") { 
            browser.setWindowSize(1600, 1200)
            HashNotesPage.getNoteEditor().deleteNoteEditor();
    } else {
        throw new Error(`Invalid argument exception ${test}`)
    }
});
//Delete notes from trash folder
When(/^the user deletes note using the "Delete Note" icon from editor menu$/, {},() =>{

    let numOfNotesBeforeDelete = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    browser.config.ScenarioCtx["numOfNotesBeforeDelete"] = numOfNotesBeforeDelete;

    browser.setWindowSize(1600, 1200)
    HashNotesPage.getNoteEditor().deleteNoteEditor();
    //HashNotesPage.getPrompt().dismissBtnClick();
    browser.setTimeout({implicit: 2000});
});
//Delete notes from trash folder
When(/^the user cancels the delete note action$/, {},() =>{   
    let numOfNotesBeforeCancel = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    //browser.config.ScenarioCtx["numOfNotesBeforeCancel"] = numOfNotesBeforeCancel;
    if (numOfNotesBeforeCancel === 1){

        HashNotesPage.getPrompt().cancelBtnClick();
    }else{
        throw new Error('There are more then 1 notes in the list')
    }
});
// Notes editor
When(/^the user clicks the "Undo" button from (.*)$/, {},(location) =>{  
    
    browser.switchToFrame(null);
    if(location === "edit_menu"){
            HashNotesPage.getNoteEditor().clickEditBtn();
            HashNotesPage.getNoteEditor().clickUndoBtn();
    } else if(location === "edit_bar") { 
            browser.setWindowSize(1600, 1200)
            HashNotesPage.getNoteEditor().clickUndoBtnEditBar();
    } else {
        throw new Error('Button not found')
    }
});
When(/^the user clicks the "Redo" button from (.*)$/, {},(location) =>{  

    if(location === "edit_menu"){
            HashNotesPage.getNoteEditor().clickEditBtn();
            HashNotesPage.getNoteEditor().clickRedoBtn();
    } else if(location === "edit_bar") { 
            browser.setWindowSize(1600, 1200)
            HashNotesPage.getNoteEditor().clickRedoBtnEditBar();
    } else {
        throw new Error('Button not found')
    }
});


When(/^the user copies the text added using "Copy" button from edit_menu$/, {},() =>{  
    browser.keys(['Meta', 'a']);
    browser.pause(7000);
});
When(/^User clicks on the search note field/, {},() =>{
    HashNotesPage.getNoteSidebar().isSearchBarFocus();
});




