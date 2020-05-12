import { When } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

//Create note feature
When(/^the user deletes the note$/, {}, () => {
    HashNotesPage.getNoteEditor().openFileMenu();
    HashNotesPage.getNoteEditor().deleteNote()
});
//Create note feature
When(/^the user creates a new note from the File menu inside the trash folder$/, {},() =>{
    HashNotesPage.getNoteSidebar().isTrashFolderLoad();
    HashNotesPage.getNoteEditor().openFileMenu();
    HashNotesPage.getNoteEditor().addNote();
});
//Create note feature
When(/^the user clicks the "New Note" button from (.*)$/,{}, (location) => {
    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    if(location === "sidebar"){
            HashNotesPage.getNoteSidebar().addNewNoteSidebar();
    } else if(location === "file_menu") {
            HashNotesPage.getNoteEditor().openFileMenu();
            HashNotesPage.getNoteEditor().addNote();
    } else {
        throw new Error(`Invalid argument exception ${location}`)
    }
});
//Access and exit trash folder feature
When(/^the user clicks the "Trash Folder" button from sidebar$/, {}, () => {
    HashNotesPage.getNoteSidebar().isTrashButtonLoaded();
    HashNotesPage.getNoteSidebar().openTrashFolder();
});
//Access and exit trash folder feature
When(/^the user clicks the "Back to notes" button$/, {}, () => {
    HashNotesPage.getNoteSidebar().backToNotes();
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
            HashNotesPage.getNoteEditor().deleteNoteEditor();
    } else {
        throw new Error(`Invalid argument exception ${test}`)
    }
});
//Delete notes from trash folder
When(/^the user deletes note using the "Delete Note" icon from editor menu$/, {},() =>{

    let numOfNotesBeforeDelete = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    browser.config.ScenarioCtx["numOfNotesBeforeDelete"] = numOfNotesBeforeDelete;

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
            HashNotesPage.getNoteEditor().clickUndoBtnEditBar();
    } else {
        throw new Error('Button not found')
    }
});
// Notes editor
When(/^the user clicks the "Redo" button from (.*)$/, {},(location) =>{  

    if(location === "edit_menu"){
            HashNotesPage.getNoteEditor().clickEditBtn();
            HashNotesPage.getNoteEditor().clickRedoBtn();
    } else if(location === "edit_bar") { 
            HashNotesPage.getNoteEditor().clickRedoBtnEditBar();
    } else {
        throw new Error('Button not found')
    }
});
// Notes editor
When(/^the user copies the text added using copy combination of keys$/, {},() =>{  
    browser.keys(['Meta', 'a']);
    browser.keys(['Meta', 'c']);
    
    let textBeforeDelete = HashNotesPage.getNoteEditor().getAreaText()
    browser.config.ScenarioCtx["textBeforeDelete"] = textBeforeDelete;
});
// Notes editor
When(/^the user clears the text$/, {},() =>{
    
    HashNotesPage.getNoteEditor().deleteAreaText()
});
// Notes editor
When(/^the user pastes the text in the note using paste combination of keys$/, {},() =>{
    browser.keys(['Meta', 'v']);
});
// Notes editor
When(/^the user selects the (.*) format$/, {},(format) =>{
    browser.switchToFrame(null)

    if (format === 'Bold'){
        HashNotesPage.getNoteEditor().clickBoldBtn()
         
    }else if(format === 'Underline'){
        HashNotesPage.getNoteEditor().clickFormatBtn();
        HashNotesPage.getNoteEditor().clickUnderlineBtn();
          
    }else if(format === 'Superscript'){
        HashNotesPage.getNoteEditor().clickFormatBtn();
        HashNotesPage.getNoteEditor().clickSuperscriptBtn()
       
    }else if(format === 'Code'){
        HashNotesPage.getNoteEditor().clickFormatBtn();
        HashNotesPage.getNoteEditor().clickCodeBtn();
       
    }else {
        throw new Error('Button not found')
    }
});
// Notes editor
When(/^the user selects the "Shortcut list" option from "Help" menu$/, {}, () => {
    HashNotesPage.getNoteEditor().clickHelpBtn();
    HashNotesPage.getNoteEditor().clickShorcutListBtn();
});
// Notes editor
When(/^the user clicks on the (.*) button from editor menu$/, {},(button) =>{
    browser.switchToFrame(null);

    if (button === 'numbered_list'){
        HashNotesPage.getNoteEditor().clickNumListBtn()
    }else if (button === 'bullet_list'){
        HashNotesPage.getNoteEditor().clickBulletListBtn()
    }else {
        throw new Error ('Text is not listed by any list type')
    }
});
// Notes editor
When(/^the user selects (.*) icon$/, {},(align) =>{
    browser.switchToFrame(null)

    if (align === 'align_right'){
        HashNotesPage.getNoteEditor().clickAlignRightBtn();
    }else if (align === 'justify'){
        HashNotesPage.getNoteEditor().clickJustifyBtn();
    }else if (align === 'align_center'){
        HashNotesPage.getNoteEditor().clickAlignCenterBtn();
    }else if (align === 'align_left'){
        HashNotesPage.getNoteEditor().clickAlignLeftBtn();
    }else{
        throw new Error ('Text is misaligned')
    }
});
// Notes editor
When(/^the user selects the "Link" option from the "Insert" menu$/, {},() =>{
    browser.switchToFrame(null)
    HashNotesPage.getNoteEditor().clickInsertBtn();
    HashNotesPage.getNoteEditor().clickLinkBtn();
});
// Notes editor
When(/^the user adds the "google homepage" link to the "URL" field$/, {},() =>{
    HashNotesPage.getNoteEditor().addUrl('https://www.google.com/');
});
// Notes editor
When(/^the user clicks on the "Save" button/, {},() =>{
    HashNotesPage.getNoteEditor().clickSaveLinkBtn();
});

When(/^User clicks on the search note field/, {},() =>{
    HashNotesPage.getNoteSidebar().isSearchBarFocus();
});




