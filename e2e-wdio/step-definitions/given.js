import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page';
import moment from 'moment';

//Create note feature
Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
    HashNotesPage.getPrompt().waitForTiny();
    HashNotesPage.getPrompt().closeBtnClickTiny();
});
//Create note feature
Given(/^there is only one note in the list$/, {}, () => {
    let numOfNotes = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    // console.log(numOfNotes);
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
    browser.setTimeout({'implicit': 2000 });   
});
//Delete notes feature
Given(/^the trash folder is empty$/, {}, () => {
    HashNotesPage.getNoteSidebar().openTrashFolder();
    let numOfNotesTrash = HashNotesPage.getNoteSidebar().getNumberOfNotes();

    if (numOfNotesTrash !== 0){
        for (let i = 0; i < numOfNotesTrash; i++){
            HashNotesPage.getNoteSidebar().backToNotesExists();
            HashNotesPage.getNoteEditor().openFileMenu();
            HashNotesPage.getNoteEditor().deleteNote();
            HashNotesPage.getPrompt().dismissBtnClick();
        }
    }
    HashNotesPage.getNoteSidebar().backToNotes();
    
});
// Delete notes feature
Given(/^a new note is added$/, {}, () => {
    let timeOfNote;
    let localSecond = parseInt(moment().format('ss'));
    let waitTimeNoteCreate;
     if( localSecond >= 1 && localSecond <= 59){
         waitTimeNoteCreate = (60 - localSecond) + 3;
         if ( waitTimeNoteCreate >=1 && waitTimeNoteCreate<= 9){
             HashNotesPage.getNoteSidebar().newButtonDisplayed();
             HashNotesPage.getNoteSidebar().addNewNoteSidebar();
             timeOfNote = HashNotesPage.getNoteSidebar().getNoteTime();
             timeOfNote = timeOfNote.toString()
             browser.pause(waitTimeNoteCreate * 1000)
         }else{
             HashNotesPage.getNoteSidebar().newButtonDisplayed();
             HashNotesPage.getNoteSidebar().addNewNoteSidebar();
             timeOfNote = HashNotesPage.getNoteSidebar().getNoteTime();
             timeOfNote = timeOfNote.toString()
             browser.pause(waitTimeNoteCreate * 1000)
         }
     }

    
    browser.config.ScenarioCtx["timeOfNote"] = timeOfNote;
      
});
// Delete notes from trash folder
Given(/^there is a note in the "Trash Folder"$/, {}, () => {
    HashNotesPage.getNoteEditor().openFileMenu()
    HashNotesPage.getNoteEditor().deleteNote()
    HashNotesPage.getPrompt().dismissBtnClick();
    HashNotesPage.getNoteSidebar().openTrashFolder()
    HashNotesPage.getNoteSidebar().isTrashFolderLoad()
    HashNotesPage.getPrompt().waitForTiny();
    HashNotesPage.getPrompt().closeBtnClickTiny();
});
// Delete notes from trash folder
Given(/^a new note is added in the trash folder$/, {}, () => {
    
    let timeOfNote;
    let localSecond = parseInt(moment().format('ss'));
    let waitTimeNoteCreate;

    HashNotesPage.getNoteSidebar().isTrashFolderLoad();
    HashNotesPage.getNoteSidebar().backToNotes();
    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    HashNotesPage.getNoteSidebar().addNewNoteSidebar();
    HashNotesPage.getNoteEditor().openFileMenu();
    HashNotesPage.getNoteEditor().deleteNote()
    HashNotesPage.getPrompt().dismissBtnClick()
    HashNotesPage.getNoteSidebar().openTrashFolder();

    if( localSecond >= 1 && localSecond <= 59){
        waitTimeNoteCreate = (60 - localSecond) + 3;
        if ( waitTimeNoteCreate >=1 && waitTimeNoteCreate<= 9){
            timeOfNote = HashNotesPage.getNoteSidebar().getNoteTime();
            timeOfNote = timeOfNote.toString()
            browser.pause(waitTimeNoteCreate * 1000)
        }else{
            timeOfNote = HashNotesPage.getNoteSidebar().getNoteTime();
            timeOfNote = timeOfNote.toString()
            browser.pause(waitTimeNoteCreate * 1000)
        }
    }
    
    browser.config.ScenarioCtx["timeOfNote"] = timeOfNote;
      
});
// Notes editor
Given(/^(.*) is added to the note$/, {},(text) =>{   
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame); 
    
    if (text === "Food"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else if (text === "How you ever been"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else {
        throw new Error('Something went wrong')
    }
});


