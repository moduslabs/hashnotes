import { Then } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'
import moment from 'moment';
import { get } from 'http';

//Create note feature
Then(/^a new note is created automatically with updated timestamp$/, {}, () => {
    let localTime;
    let formatedLocalTime;
    let localHour = moment().format("hh");
    let formatTime = function () {
        if (localHour === '12'){
        localTime ='Today, ' + '00' + moment().format(":mm a")
        }else {
        localTime = 'Today, ' + moment().format("hh:mm a");
        }
        return localTime
    }
    formatedLocalTime = formatTime();

    let noteTime = HashNotesPage.getNoteSidebar().getNoteTime();
    noteTime = noteTime.toString();

    if (noteTime === formatedLocalTime){
        console.log('Note creation time is matching the local time')
        return true;
    }else {
        throw new Error('Note creation time is not matching the local time');
    }
});
//Create note feature
Then(/^a new note is added at the top of the notes list with updated timestamp$/, {}, () => {
    let localTime;
    let formatedLocalTime;
    let localHour = moment().format("hh");
    let formatTime = function () {
        if (localHour === '12'){
        localTime ='Today, ' + '00' + moment().format(":mm a")
        }else {
        localTime = 'Today, ' + moment().format("hh:mm a");
        }
        return localTime
    }
    formatedLocalTime = formatTime();

    let noteTime = HashNotesPage.getNoteSidebar().getNoteTime();
    noteTime = noteTime.toString();

    if (noteTime === formatedLocalTime){
        //console.log('Note creation time is matching the local time')
        return true;
    }else {
        throw new Error('Note creation time is not matching the local time');
    }
    
});
//Create note feature
Then (/^the user is redirected to the notes list$/, {}, () => {
    HashNotesPage.getNoteSidebar().newButtonExists();
});
//Access and exit trash folder feature
Then (/^trash folder is accessed$/, {}, () => {
    HashNotesPage.getNoteSidebar().backToNotesExists();
});
//Access and exit trash folder feature
Then (/^Hashnotes main page is displayed$/, {}, () => {
    HashNotesPage.getNoteSidebar().newButtonExists();
});
//Delete notes feature
Then (/^a notification prompt with "Cancel" and "Dismiss" buttons is displayed$/, {}, () => {
    browser.setTimeout({'implicit': 3000 })
    let promptTxt = HashNotesPage.getPrompt().promptDisplayed();
    let cancelBtn = HashNotesPage.getPrompt().cancelBtnDisplayed();
    let dismissBtn = HashNotesPage.getPrompt().dismissBtnDisplayed();
    promptTxt.toString();

    if(promptTxt === 'Moved 1 item to the trash.'){
        if((cancelBtn === 'CANCEL') && (dismissBtn === 'DISMISS')){
            return true;
        }else{
            throw new Error ('Buttons not found')
        }
    } else if(promptTxt === 'Permanently deleted 1 item.'){
        if((cancelBtn === 'CANCEL') && (dismissBtn === 'DISMISS')){
            return true;
        }else{
            throw new Error ('Buttons not found')
        }
    }else {
        throw new Error ('Prompt not displayed')
    }
});
//Delete notes feature
Then (/^note is restored in notes list$/, {}, () =>{

    let numOfNotesAfterCancel = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    let numOfNotesBeforeDelete = parseInt(browser.config.ScenarioCtx["numOfNotesBeforeDelete"], 10);
    if (numOfNotesAfterCancel === (numOfNotesBeforeDelete)){
        return true;
    }else {
        throw new Error('There is less than 2 or more than 2 notes')
    }
});
//Delete notes feature
Then (/^note is deleted$/, {}, () =>{

    let numOfNotesAfterDelete = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    let numOfNotesBeforeDelete = parseInt(browser.config.ScenarioCtx["numOfNotesBeforeDelete"], 10);

    if ((numOfNotesAfterDelete) === (numOfNotesBeforeDelete - 1)){
        return true;
    }else {
        throw new Error('There is more than 1 note')
    }
});
//Delete notes feature
Then (/^moved to the trash folder$/, {}, () =>{
    HashNotesPage.getNoteSidebar().openTrashFolder();
    let notesTrash = HashNotesPage.getNoteSidebar().getNumberOfNotes()

    if (notesTrash === 1){
        return true;
    }else {
        throw new Error ('There are more than 1 notes in the Trash Folder!!!')
    }
});
//Delete notes feature
Then (/^timestamp of note is not updated$/, {}, () =>{
    let localTime;
    let localTimeAfterWaiting;
    let timeOfNote;
    let localHour = moment().format('hh');

    let noteTimeAfterDelete = HashNotesPage.getNoteSidebar().getNoteTime();
    noteTimeAfterDelete = noteTimeAfterDelete.toString();

    let formatTime = function () {
        if (localHour === '12'){
    localTime ='Today, ' + '00' + moment().format(":mm a")
        }else {
        localTime = 'Today, ' + moment().format("hh:mm a");
        }
        return localTime
    }

    localTimeAfterWaiting = formatTime();

    timeOfNote = browser.config.ScenarioCtx["timeOfNote"];

    if ((noteTimeAfterDelete !== localTimeAfterWaiting) && (noteTimeAfterDelete === timeOfNote)){
        return true;
    }else {
        throw new Error ('The timestamp of the note has changed')
    }
 });
//Delete notes feature
 Then (/^note is permanently deleted$/, {}, () => {
    let numOfNotes = parseInt(HashNotesPage.getNoteSidebar().getNumberOfNotes());

    if (numOfNotes === 0){
        return true;
    }else {
        throw new Error ('There note is still present in the trash folder')
    }
});
//Delete notes from trash folder
Then (/^note is restored in trash folder notes list$/, {}, () =>{

    let numOfNotesAfterCancel = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    let numOfNotesBeforeDelete = parseInt(browser.config.ScenarioCtx["numOfNotesBeforeDelete"], 10);
    if (numOfNotesAfterCancel === (numOfNotesBeforeDelete)){
        return true;
    }else {
        throw new Error('There is less than 2 or more than 2 notes')
    }
});
// Notes editor
Then (/^note is restored in trash folder notes list$/, {}, () =>{

    let numOfNotesAfterCancel = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    let numOfNotesBeforeDelete = parseInt(browser.config.ScenarioCtx["numOfNotesBeforeDelete"], 10);
    if (numOfNotesAfterCancel === (numOfNotesBeforeDelete)){
        return true;
    }else {
        throw new Error('There is less than 2 or more than 2 notes')
    }
});
// Notes editor
Then (/^(.*) is removed$/, {}, (text) =>{
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);
    
    let textArea = HashNotesPage.getNoteEditor().getAreaText();
    
    if (text !== textArea){
        return true;
    }else {
        throw new Error('The text is still present')
    }
});
// Notes editor
Then (/^delete action of (.*) text is reverted$/, {}, (text) =>{
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);
    
    let textArea = HashNotesPage.getNoteEditor().getAreaText();
    console.log(textArea);
    if (text === textArea){
        HashNotesPage.getNoteEditor().deleteAreaText();
        browser.switchToFrame(null)
        // Added the click Bold button step here, since the clear value action from above is not
        // fully completed, and in order to that a random action must be performed
        HashNotesPage.getNoteEditor().clickBoldBtn();
        return true;
    }else {
        throw new Error('The text is not reverted')
    } 
});
// Notes editor
Then (/^(.*) is successfully pasted$/, {}, (text) =>{
   
    let textBeforeDelete = browser.config.ScenarioCtx['textBeforeDelete']

    if (textBeforeDelete === text){
        HashNotesPage.getNoteEditor().deleteAreaText();
        // Added the click Bold button step here, since the clear value action from above is not
        // fully completed, and in order to that a random action must be performed
        browser.switchToFrame(null)
        HashNotesPage.getNoteEditor().clickBoldBtn();
        return true;
    }else {
        throw new Error('The text is not reverted')
    }  
});
// Notes editor
Then (/^text format is changed to (.*)$/, {}, (format) =>{
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')

    if (format === 'Bold'){
        browser.switchToFrame(switchFrame); 

        browser.keys(['Meta','a']);

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Bold"){
            browser.switchToFrame(switchFrame); 
            HashNotesPage.getNoteEditor().deleteAreaText();

            browser.switchToFrame(null);
            HashNotesPage.getNoteEditor().clickBoldBtn();
            
        }
    }else if(format === 'Underline'){
        browser.switchToFrame(switchFrame); 

        browser.keys(['Meta','a']);

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Underline"){
            browser.switchToFrame(switchFrame); 
            HashNotesPage.getNoteEditor().deleteAreaText();

            browser.switchToFrame(null);
            HashNotesPage.getNoteEditor().clickBoldBtn();

        }         
    }else if(format === 'Superscript'){
        browser.switchToFrame(switchFrame); 

        browser.keys(['Meta','a']);

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Superscript"){
            browser.switchToFrame(switchFrame); 
            HashNotesPage.getNoteEditor().deleteAreaText();

            browser.switchToFrame(null);
            HashNotesPage.getNoteEditor().clickBoldBtn();

        }      
    }else if(format === 'Code'){
        browser.switchToFrame(switchFrame); 

        browser.keys(['Meta','a']);

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Code"){
            browser.switchToFrame(switchFrame); 
            HashNotesPage.getNoteEditor().deleteAreaText();

            browser.switchToFrame(null);
            HashNotesPage.getNoteEditor().clickBoldBtn();

        }  
    }else {
        throw new Error('Incorrect formatting')
    }
});
// Notes editor
Then (/^Shorcut list is displayed$/, {}, () => {
    let shortcutPrompt = HashNotesPage.getNoteEditor().shortcutListDisplayed();

    if (shortcutPrompt === true){
        return true;
    }else {
        throw new Error('Shortcut prompt not displayed');
        }
});
// Notes editor
Then (/^texts are listed by (.*)$/, {}, (list) => {
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')

    if (list === 'numbered_list'){
        let numListBtnState = HashNotesPage.getNoteEditor().isNumListBtnPressed();
        if(numListBtnState === 'true'){
            browser.switchToFrame(switchFrame); 
            let textAsNumList = $$('#tinymce ol>li').length;
            if (textAsNumList === 3){
                browser.keys(['Meta', 'a']);
                browser.keys('Backspace');
                return true;
            }else {
                throw new Error ('Text is not listed a numbered list')
            }
        }else {
            throw new Error ('The numbered list button is not pressed')
        }
    }else if ( list === 'bullet_list'){
        let bulletListBtnState = HashNotesPage.getNoteEditor().isBulletListBtnPressed();
        if(bulletListBtnState === 'true'){
            browser.switchToFrame(switchFrame); 
            let textAsNumList = $$('#tinymce ul>li').length;
            if (textAsNumList === 3){
                browser.keys(['Meta', 'a']);
                browser.keys('Backspace');
                return true;
            }else {
                throw new Error ('Text is not listed a bullet list')
            }
        }else {
            throw new Error ('The bullet list button is not pressed')
        }
    }else {
        throw new Error ('Text is not listed as neither list')
    }
});
// Notes editor
Then (/^text is align to the (.*)$/, {}, (position) => {
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame); 

    let textPosition = HashNotesPage.getNoteEditor().textAlignment()
    console.log(textPosition, '-------------------------')
   if(position === 'right'){

       if (textPosition === 'text-align: right;'){
            browser.keys(['Meta', 'a']);
            HashNotesPage.getNoteEditor().deleteAreaText();
            browser.switchToFrame(null)
            HashNotesPage.getNoteEditor().clickBoldBtn();
            return true
       }else {
           throw new Error('Text is not aligned correct')
        }
   }else if(position === 'justify'){

       if(textPosition === 'text-align: justify;'){
            browser.keys(['Meta', 'a']);
            HashNotesPage.getNoteEditor().deleteAreaText();
            browser.switchToFrame(null)
            HashNotesPage.getNoteEditor().clickBoldBtn();
            return true
       }else {
            throw new Error('Text is not aligned correct')
        }
   }else if(position === 'center'){

    if(textPosition === 'text-align: center;'){
            browser.keys(['Meta', 'a']);
            HashNotesPage.getNoteEditor().deleteAreaText();
            browser.switchToFrame(null)
            HashNotesPage.getNoteEditor().clickBoldBtn();
            return true
       }else {
            throw new Error('Text is not aligned correct')
        }
   }else if(position === 'left'){

    if(textPosition === 'text-align: left;'){
            browser.keys(['Meta', 'a']);    
            HashNotesPage.getNoteEditor().deleteAreaText();
            browser.switchToFrame(null)
            HashNotesPage.getNoteEditor().clickBoldBtn();
            return true
       }else {
            throw new Error('Text is not aligned correct')
        }
   }else{
       throw new Error('Incorrect alignement of text')
   }
});
// Notes editor
Then (/^the "google homepage" is linked to the "linkText" text$/, {}, () => {
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')
    browser.switchToFrame(switchFrame);

    let textAdded = HashNotesPage.getNoteEditor().getAreaText()
    if(textAdded = 'linkText'){
        let linkAdded = $('.//a[text()="linkText"]').getAttribute('href')
        if(linkAdded === 'https://www.google.com/'){
                browser.keys(['Meta', 'a']);
                HashNotesPage.getNoteEditor().deleteAreaText();
                browser.switchToFrame(null)
                HashNotesPage.getNoteEditor().clickBoldBtn();
                return true;
        }else{
            throw new Error('Link wasn\'t successfully added to the text')
        }
    }else{
        throw new Error('Text wasn\'s added')
    }
});

Then (/^User types (Note|Lorem)$/, {}, (searchCriteria) => {
    switch (searchCriteria) {
        case 'Note':
            HashNotesPage.getNoteSidebar().setSearchBar("Note");
            break;
        case 'Lorem':
            HashNotesPage.getNoteSidebar().setSearchBar("Lorem");
            break;
        default:
            break;
    }
});