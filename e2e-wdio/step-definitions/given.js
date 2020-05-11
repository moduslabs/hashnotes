import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page';
import moment from 'moment';
import { connect } from 'http2';

//Create note feature
Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
    browser.setWindowSize(1600, 1200)
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
Given(/^(.*) text is added to the note$/, {},(text) =>{  

    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame); 
    
    if (text === "Food"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else if (text === "How you ever been"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else if (text === "Hello there"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else if (text === "format"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else if (text === "random"){
        HashNotesPage.getNoteEditor().addAreaText(text);
    }else {
        throw new Error('Something went wrong')
    }
});
// Notes editor
Given(/^(.*) text is removed from the note using the "Undo" button$/, {},(text) =>{   

    browser.switchToFrame(null);

    if (text === "Food"){
        HashNotesPage.getNoteEditor().clickUndoBtnEditBar();
    }else if (text === "How you ever been"){
        HashNotesPage.getNoteEditor().clickUndoBtnEditBar();
    }else {
        throw new Error('Something went wrong')
    }
});

Given(/^text is selected$/, {},() =>{   

    browser.keys(['Meta', 'a']);

});
// Notes editor
Given(/^(.*) text is added on the second row of the note$/, {},(text2) =>{   

    browser.keys('Enter');

    let secondRow = $('#tinymce p:nth-child(2)').getText();
    console.log(secondRow);
    if (secondRow === ''){
        console.log('bla ---------------------------------')
        $('#tinymce p:nth-child(2)').addValue(text2);
    }else{
        throw new Error('Row was not added')
    }
});
// Notes editor
Given(/^(.*) text is added on the third row of the note$/, {},(text3) =>{   
    
    browser.keys('Enter');

    let thirdRow = $('#tinymce p:nth-child(3)').getText();
    console.log(thirdRow);
    if (thirdRow === ''){
        console.log('bla ---------------------------------')
        $('#tinymce p:nth-child(3)').addValue(text3);
    }else{
        throw new Error('Row was not added')
    }
});

Given(/^added texts are selected$/, {},() =>{   
    browser.keys(['Meta', 'a']);
});


