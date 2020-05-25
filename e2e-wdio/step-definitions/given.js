import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page';
import moment from 'moment';
import { connect } from 'http2';


Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
    browser.setWindowSize(1600, 1200)
    HashNotesPage.getPrompt().waitForTiny();
    HashNotesPage.getPrompt().closeBtnClickTiny();
});
//Create note feature
Given(/^there is only one note in the list$/, {}, () => {
    let numOfNotes = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    if (numOfNotes > 1){
        for(let i = 1; i < numOfNotes; i++ ){
            HashNotesPage.getNoteEditor().openFileMenu();
            HashNotesPage.getNoteEditor().deleteNote()
            HashNotesPage.getPrompt().dismissBtnClick();
        }
    }
    
});
//Create note feature & //Access and exit trash folder feature
Given(/^the trash folder is opened$/, {}, () => {
    HashNotesPage.getNoteSidebar().openTrashFolder();
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

    let  headingExists = $$('#tinymce h1').length;

    if (headingExists === 1){
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
    }else if (headingExists === 0){
        browser.switchToFrame(null)
        HashNotesPage.getNoteEditor().clickFormatDropDown();
        HashNotesPage.getNoteEditor().clickHeadingOpt()
        HashNotesPage.getNoteEditor().clickheadingOneOpt();

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
    }else{
        throw new Error ('Something went wrong')
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
// Notes editor
Given(/^text is selected$/, {},() =>{   

    browser.keys(['Meta', 'a']);
});
// Notes editor
Given(/^(.*) text is added on the second row of the note$/, {},(text2) =>{   

    browser.keys('Enter');

    let secondRow = $('#tinymce p:nth-child(2)').getText();
    if (secondRow === ''){
        $('#tinymce p:nth-child(2)').addValue(text2);
    }else{
        throw new Error('Row was not added')
    }
});
// Notes editor
Given(/^(.*) text is added on the third row of the note$/, {},(text3) =>{   
    
    browser.keys('Enter');

    let thirdRow = $('#tinymce p:nth-child(3)').getText();
    if (thirdRow === ''){
        $('#tinymce p:nth-child(3)').addValue(text3);
    }else{
        throw new Error('Row was not added')
    }
});
// Notes editor
Given(/^added texts are selected$/, {},() =>{   
    browser.keys(['Meta', 'a']);
});
// Notes editor
Given(/^"linkText" text is already added to the note$/, {},() =>{  
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame); 

    let  headingExists = $$('#tinymce h1').length;

    if (headingExists === 1){
        HashNotesPage.getNoteEditor().addAreaText('linkText');
    }else if (headingExists === 0){
        browser.switchToFrame(null)
        HashNotesPage.getNoteEditor().clickFormatDropDown();
        HashNotesPage.getNoteEditor().clickHeadingOpt()
        HashNotesPage.getNoteEditor().clickheadingOneOpt();

        browser.switchToFrame(switchFrame);
        HashNotesPage.getNoteEditor().addAreaText('linkText');
    }else {
        throw new Error('Something went wrong')
    }
});
// Create tag summary
Given(/^"#1" tag is created$/, {},() =>{  
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);

    let headingExists = $$('#tinymce h1').length;

    if (headingExists === 1){
        HashNotesPage.getNoteEditor().addAreaText('#1')
    }else if (headingExists === 0) {
        browser.switchToFrame(null)
        HashNotesPage.getNoteEditor().clickFormatDropDown();
        HashNotesPage.getNoteEditor().clickHeadingOpt()
        HashNotesPage.getNoteEditor().clickheadingOneOpt();
        browser.switchToFrame(switchFrame);
        HashNotesPage.getNoteEditor().addAreaText('#1')
    }else{
        throw new Error ('Something went wrong')
    }
});
// Create tag summary
Given(/^"#1" tag is created on the next row$/, {},() =>{  
    browser.keys('Enter');
    
    let secondRow = $('#tinymce p:nth-child(2)').getText();
    if (secondRow === ''){
        $('#tinymce p:nth-child(2)').addValue('#1');
    }else{
        throw new Error('Row was not added')
    }
});
// Create tag summary
Given(/^"#1#2#3#4#5" tags are created$/, {},() =>{  
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);

    let headingExists = $$('#tinymce h1').length;

    if (headingExists === 1){
        HashNotesPage.getNoteEditor().addAreaText('#1#2#3#4#5')
    }else if (headingExists === 0) {
        browser.switchToFrame(null)
        HashNotesPage.getNoteEditor().clickFormatDropDown();
        HashNotesPage.getNoteEditor().clickHeadingOpt()
        HashNotesPage.getNoteEditor().clickheadingOneOpt();
        browser.switchToFrame(switchFrame);
        HashNotesPage.getNoteEditor().addAreaText('#1#2#3#4#5')
    }else{
        throw new Error ('Something went wrong')
    }
});
// Create tag summary
Given(/^"random" text is added after "#1" tag$/, {},() =>{  
   browser.keys('Space');
   HashNotesPage.getNoteEditor().addAreaText('random')
});
// Edit tag summary
Given(/^the user has a note which contains a tag$/, {},() =>{  
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);

    let headingExists = $$('#tinymce h1').length;

    if (headingExists === 1){
        HashNotesPage.getNoteEditor().addAreaText('#testTag')
    }else if (headingExists === 0) {
        browser.switchToFrame(null)
        HashNotesPage.getNoteEditor().clickFormatDropDown();
        HashNotesPage.getNoteEditor().clickHeadingOpt()
        HashNotesPage.getNoteEditor().clickheadingOneOpt();
        browser.switchToFrame(switchFrame);
        HashNotesPage.getNoteEditor().addAreaText('#testTag')
    }else{
        throw new Error ('Something went wrong')
    }
    
 });
// Edit tag summary
 Given(/^the initial tag is copied on the next 2 rows$/, {},() =>{  
    let initialTag = HashNotesPage .getNoteEditor().getAreaText()

    for (let i = 2; i <= 3; i++){
        browser.keys('Enter');
        $(`#tinymce p:nth-child(${i})`).addValue(initialTag);
    }
 });
 // Search notes list
 Given(/^several notes are created with random text$/, {},() =>{ 
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')

    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    let textWords = ['test','random', 'word', 'simple', 'another', 'word']

    for (let  i = 0; i < 4; i++){
        let randomWord = textWords[Math.floor(Math.random() * textWords.length)]
        browser.switchToFrame(switchFrame);
        HashNotesPage.getNoteEditor().addAreaText(randomWord);

        browser.switchToFrame(null);
        HashNotesPage.getNoteSidebar().addNewNoteSidebar();
    }
 });
 // Search notes list
 Given(/^a note containing text (.*) is created$/, {},(text) =>{ 
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);
    HashNotesPage.getNoteEditor().addAreaText(text);
 });
// Search notes trash folder
 Given(/^several notes with random text are in the "Trash Folder"$/, {},() =>{ 
    

    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    let textWords = ['test','random', 'word', 'simple', 'another', 'word']

    for (let  i = 0; i < 4; i++){
        let randomWord = textWords[Math.floor(Math.random() * textWords.length)]

        let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
        browser.switchToFrame(switchFrame);

        HashNotesPage.getNoteEditor().addAreaText(randomWord);

        browser.switchToFrame(null);
        HashNotesPage.getNoteEditor().deleteNoteEditor();

    }

});
// Search notes trash folder
Given(/^a note containing (.*) text is added in the "Trash Folder"$/, {},(text) =>{ 
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);

    HashNotesPage.getNoteEditor().addAreaText(text)

    browser.switchToFrame(null);
    HashNotesPage.getNoteEditor().deleteNoteEditor();

});
Given(/^"test" text is added after "#1" tag$/, {},() =>{ 
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);

    HashNotesPage.getNoteEditor().addAreaText('#1')
    browser.keys('Space')
    HashNotesPage.getNoteEditor().addAreaText('test')
});
// Viewport changes
Given(/^there are several notes added$/, {},() =>{ 
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')

    HashNotesPage.getNoteSidebar().newButtonDisplayed();

    for (let  i = 0; i < 6; i++){
        // Scroll bar is displayed in full screen(screen size 1920 * 1080) only if seven notes are added. 
        browser.switchToFrame(switchFrame);
        HashNotesPage.getNoteEditor().addAreaText(`Note ${i}`)

        browser.switchToFrame(null)
        HashNotesPage.getNoteSidebar().addNewNoteSidebar();

    }
});
// Viewport changes
Given(/^there is a note with text added on multiple rows$/, {},() =>{
    let numOfNotes = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    if (numOfNotes > 1){
        for(let i = 1; i < numOfNotes; i++ ){
            HashNotesPage.getNoteEditor().openFileMenu();
            HashNotesPage.getNoteEditor().deleteNote()
            HashNotesPage.getPrompt().dismissBtnClick();
        }
    }
    
    browser.switchToFrame(switchFrame);
    HashNotesPage.getNoteEditor().addAreaText('test');
    browser.keys('Enter');

    for (let i = 2; i < 25; i++){
        let headingInViewPort = HashNotesPage.getNoteEditor().headingInViewPort()
        if(headingInViewPort !== false){
            browser.keys('Enter');
            HashNotesPage.getNoteEditor().addParagraf(i, `${i}`)

        }else{
            break;
        }
    }

    let numOfParagrafs = HashNotesPage.getNoteEditor().numOfParagrafs();
    browser.config.ScenarioCtx["numOfParagrafs"] = numOfParagrafs;
    let lastPagrafBeforeScroll = HashNotesPage.getNoteEditor().paragrafInViewPort(numOfParagrafs)

    browser.config.ScenarioCtx["lastPagrafBeforeScroll"] = lastPagrafBeforeScroll;
});

Given(/^ther is a note with different tags added on multiple rows$/, {},() =>{
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')

    HashNotesPage.getNoteSidebar().addNewNoteSidebar();
    
    browser.switchToFrame(switchFrame);
    HashNotesPage.getNoteEditor().addAreaText('#bla');
    browser.keys('Enter');

    for (let i = 2; i < 11; i++){
        
            browser.keys('Enter');
            HashNotesPage.getNoteEditor().addParagraf(i, `#${i}`)

    }
});

