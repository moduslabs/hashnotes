import { Then } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'
import moment from 'moment';
import { get } from 'http';
import { connect } from 'http2';

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
        browser.keys(['Meta','a']);
        browser.keys('Backspace');
        return true;
    }else {
        throw new Error('The text is not reverted')
    } 
});
// Notes editor
Then (/^(.*) is successfully pasted$/, {}, (text) =>{
   
    let textBeforeDelete = browser.config.ScenarioCtx['textBeforeDelete']

    if (textBeforeDelete === text){
        browser.keys('Backspace');
        return true;
    }else {
        throw new Error('The text is not reverted')
    }  
});
// Notes editor
Then (/^text format is changed to (.*)$/, {}, (format) =>{
    let switchFrame = $('//iframe[@class="tox-edit-area__iframe"]')

    if (format === 'Bold'){

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Bold"){
            browser.switchToFrame(switchFrame);
            browser.keys('Backspace');
        }
    }else if(format === 'Underline'){

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Underline"){
            browser.switchToFrame(switchFrame); 
            browser.keys('Backspace');

        }         
    }else if(format === 'Superscript'){

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Superscript"){
            browser.switchToFrame(switchFrame);
            browser.keys('Backspace');

        }      
    }else if(format === 'Code'){

        browser.switchToFrame(null);
        let formatApplied = HashNotesPage.getNoteEditor().getFormatingApplied();

        if (formatApplied = "Code"){
            browser.switchToFrame(switchFrame); 
            browser.keys('Backspace');
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

    let textPosition = HashNotesPage.getNoteEditor().textAttribute("style")
    console.log(textPosition, '-------------------------')
   if(position === 'right'){

       if (textPosition === 'text-align: right;'){
            browser.keys('Backspace');
            return true
       }else {
           throw new Error('Text is not aligned correct')
        }
   }else if(position === 'justify'){

       if(textPosition === 'text-align: justify;'){
            browser.keys('Backspace');
            return true
       }else {
            throw new Error('Text is not aligned correct')
        }
   }else if(position === 'center'){

    if(textPosition === 'text-align: center;'){
            browser.keys('Backspace');
            return true
       }else {
            throw new Error('Text is not aligned correct')
        }
   }else if(position === 'left'){

    if(textPosition === 'text-align: left;'){
            browser.keys('Backspace');
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
                browser.keys('Backspace');
                return true;
        }else{
            throw new Error('Link wasn\'t successfully added to the text')
        }
    }else{
        throw new Error('Text wasn\'s added')
    }
});
// Create tag summary
Then (/^'#bla' tag is created$/, {}, () => {
    let tagName = HashNotesPage.getNoteEditor().getAreaText()

    if (tagName === '#bla'){
        let tagCreated = $('//span[text()="#bla"]').getAttribute('class')
        if (tagCreated === 'hashtag'){
            return true
        }else {
            throw new Error('Tag was not created')
        }
    }else {
        throw new Error('Tag name was not found')
    }
});
// Create tag summary
Then (/^displayed in the "Tag Summary" section$/, {}, () => {
    browser.switchToFrame(null)
    let tagSumDisplayed = HashNotesPage.getTagSidebar().isTagDisplayed();
    console.log(tagSumDisplayed)
    if (tagSumDisplayed === '#bla'){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace')
        return true;
    }else {
        throw new Error('Tag is not displayed in Tag Summary');
    }
});
// Create tag summary
Then (/^tag is added once to "Tag Summary" with one bullet point$/, {}, () => {
    browser.switchToFrame(null)
    let numOfTags = HashNotesPage.getTagSidebar().numOfTagsSum();
    let numOfBullets = HashNotesPage.getTagSidebar().numOfBulletsSum();
    if (numOfTags === 1 && numOfBullets === 1){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace')
        return true;
    }else {
        throw new Error('There is more than 1 tag in the Tag Summary')
    }
});
// Create tag summary
Then (/^tag is added once to "Tag Summary" with two bullet points$/, {}, () => {
    browser.switchToFrame(null)
    let numOfTags = HashNotesPage.getTagSidebar().numOfTagsSum();
    let numOfBullets = HashNotesPage.getTagSidebar().numOfBulletsSum();
    if (numOfTags === 1 && numOfBullets === 2){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace')
        return true;
    }else {
        throw new Error('There is more than 1 tag in the Tag Summary')
    }
});
// Create tag summary
Then (/^"test" text is displayed only next to the second bullet$/, {}, () => {
    browser.switchToFrame(null)
    let textBullet;
    let numOfBullets = HashNotesPage.getTagSidebar().numOfBulletsSum();
    let bulletPosition = $$('//div[@class="content"]');

    for(let i = 0; i < numOfBullets; i++){
        textBullet = bulletPosition[i].getText();    
    }

    if (textBullet === 'test'){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace')
        return true;
    }else{
        throw new Error('Text is not displayed next second bullet')
    }
});
// Create tag summary
Then (/^three separate tags are created in the "Tag Summary" section$/, {}, () => {
    browser.switchToFrame(null)
    let numOfTags = HashNotesPage.getTagSidebar().numOfTagsSum();

    if (numOfTags === 3){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace')
        return true;
    }else {
        throw new Error('The number of tags displayed in the Tag Summary is not 3')
    }
});
// Create tag summary
Then (/^"test" text is displayed after each tag in the "Tag Summary" section$/, {}, () => {
    browser.switchToFrame(null);
    let tagName;
    let textBullet
    let numOfTags = HashNotesPage.getTagSidebar().numOfTagsSum()
    let tagPosition = $$('//hn-tag-sidebar//div[2]//div/span[1]');
    let bulletPosition = $$('//div[@class="content"]');

    for(let i = 0; i < numOfTags; i++){
        tagName = tagPosition[i].getText();
        textBullet = bulletPosition[i].getText();

        if(tagName === '#1' && textBullet === 'test'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else if(tagName === '#2' && textBullet === 'test'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else if(tagName === '#3' && textBullet === 'test'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else if(tagName === '#4' && textBullet === 'test'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else if(tagName === '#5' && textBullet === 'test'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else{
            throw new Error(`The text for tag ${tagName} is not correct  `)
        }

    }

    browser.keys(['Meta', 'a']);
    browser.keys('Backspace')
    return true;

});
// Create tag summary
Then (/^"#tag" is created automatically with no space$/, {}, () => {
    browser.switchToFrame(null);
    let hashTagName = HashNotesPage.getTagSidebar().isTagDisplayed();

    let splitHashtag = hashTagName.split("")
    for (let i = 0; i < splitHashtag.length; i++){
        if (splitHashtag[i] !== ""){
            browser.keys(['Meta', 'a']);
            browser.keys('Backspace')
            return true;
        }else {
            throw new Error("Tag contains a space");
        }
    }

});
// Create tag summary
Then (/^(.*) tag is not created$/, {}, (tag) => {

    let tagExists = HashNotesPage.getNoteEditor().isTagCreated()
    let textAdded = HashNotesPage.getNoteEditor().getAreaText()
    if (tag === textAdded && tagExists === false){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace');
        return true;
    }else {
        throw new Error ('Tag is created using special characters')
    }


});
// Create tag summary
Then (/^text is displayed in "Tag Summary" next to the bullet point$/, {}, () => {
    browser.switchToFrame(null)
    let textBullet;
    let numOfBullets = HashNotesPage.getTagSidebar().numOfBulletsSum();
    let bulletPosition = $$('//div[@class="content"]');

    for(let i = 0; i < numOfBullets; i++){
        textBullet = bulletPosition[i].getText();    
    }

    if (textBullet === 'linkText'){
        browser.keys(['Meta', 'a']);
        browser.keys('Backspace')
        return true;
    }else{
        throw new Error('Text is not displayed next second bullet')
    }

});
// Create tag summary
Then (/^text is displayed after the bullet points of each tag in "Tag Summary"$/, {}, () => {
    browser.switchToFrame(null);
    let tagName;
    let textBullet
    let numOfTags = HashNotesPage.getTagSidebar().numOfTagsSum()
    let tagPosition = $$('//hn-tag-sidebar//div[2]//div/span[1]');
    let bulletPosition = $$('//div[@class="content"]');

    for(let i = 0; i < numOfTags; i++){
        tagName = tagPosition[i].getText();
        textBullet = bulletPosition[i].getText();

        if(tagName === '#1' && textBullet === 'random'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else if(tagName === '#2' && textBullet === 'random'){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else{
            throw new Error(`The text for tag ${tagName} is not correct  `)
        }
    }

    browser.keys(['Meta', 'a']);
    browser.keys('Backspace')
    return true;
});
// Create tag summary
Then (/^text is not displayed in "Tag Summary" next to the bullet of tag "#1"$/, {}, () => {
    browser.switchToFrame(null);
    let tagName;
    let textBullet
    let numOfTags = HashNotesPage.getTagSidebar().numOfTagsSum()
    let tagPosition = $$('//hn-tag-sidebar//div[2]//div/span[1]');
    let bulletPosition = $$('//div[@class="content"]');

    for(let i = 0; i < numOfTags; i++){
        tagName = tagPosition[i].getText();
        textBullet = bulletPosition[i].getText();

        if(tagName === '#1' && textBullet === ''){
            console.log(`Tag name:${tagName} and bullet value:${textBullet}`)
        }else{
            throw new Error(`The text for tag ${tagName} is not correct  `)
        }
    }

    browser.keys(['Meta', 'a']);
    browser.keys('Backspace')
    return true;
});
// Edit tag summary
Then (/^tag is updated in the "Tag Summary" section$/, {}, () => {
    let initTagSummary = browser.config.ScenarioCtx["initTagSummary"];
    let editTagSummary = browser.config.ScenarioCtx["editTagSummary"];

    if (initTagSummary !== editTagSummary && editTagSummary === "#testEdit"){
        console.log(editTagSummary);
        browser.keys(['Meta','a']);
        browser.keys('Backspace');
    }else {
        throw new Error ('Tag was not updated');
    }
});
// Edit tag summary
Then (/^tag is removed in the "Tag Summary" section$/, {}, () => {
    let tagCreated = browser.config.ScenarioCtx["tagCreated"];

    let tagExists = HashNotesPage.getNoteEditor().getAreaText();
    console.log(tagExists);

    if (tagCreated !== tagExists && tagExists === ''){
        console.log(tagExists);
    }else {
        throw new Error('Tag is not removed from the "Tag Summary" section')
    }
});
// Edit tag summary
Then (/^only two bullet points are displayed in the "Tag Summary" section$/, {}, () => {
    browser.switchToFrame(null)
    let numOfBullets = HashNotesPage.getTagSidebar().numOfBulletsSum();

    if (numOfBullets === 2){
        return true;
    }else {
        throw new Error('There are more than two bullet present in the "Tag Summary" section');
    }
});
 // Search notes list
Then (/^only the note with (.*) text is found$/, {}, (text) => {
    browser.pause(1000);
    let numOfNotes = parseInt(HashNotesPage.getNoteSidebar().getNumberOfNotes());
    let searchedNote = HashNotesPage.getNoteSidebar().textSearchedNote();

    if (numOfNotes === 1 && searchedNote === text){
        return true;
    }else {
        throw new Error("The note with 'bla' text is not found")
    }
});
 // Search notes list
Then (/^error message is displayed$/, {}, () => {
    browser.pause(1000);
    let errorMessageDisplayed = HashNotesPage.getNoteSidebar().isErrorDisplayed()
    console.log(errorMessageDisplayed);
    if (errorMessageDisplayed === "We didn't find any notes that match your search."){
        return true;
    }else {
        throw new Error ("Error message is not displayed");
    }
});
// Search notes trash folder
Then (/^note with (.*) is found$/, {}, (text) => {
    browser.pause(1000);
    let numOfNotes = parseInt(HashNotesPage.getNoteSidebar().getNumberOfNotes());
    let searchedNote = HashNotesPage.getNoteSidebar().textSearchedNote();

    if (numOfNotes === 1 && searchedNote === text){
        return true;
    }else {
        throw new Error(`The note with ${text} text is not found`)
    }
});

Then (/^note displayed view port$/, {}, () => {
    let listSize = HashNotesPage.getNoteSidebar().getNumberOfNotes();

    let firstNoteDisplayed = HashNotesPage.getNoteSidebar().displayedInViewPort(listSize);
    if(firstNoteDisplayed === true){
        return true
    }else {
        throw new Error('Note is not displayed in view port')
    }

});

Then (/^list note is scrollable$/, {}, () => {
    let listBeforeScroll = browser.config.ScenarioCtx["listBeforeScroll"];

    let listAfterScroll = HashNotesPage.getNoteSidebar().listOnYAxis();

    let lastNoteDisplayed = HashNotesPage.getNoteSidebar().displayedInViewPort(1);

    if (listBeforeScroll !== listAfterScroll && lastNoteDisplayed === false){
        return true;
    }else {
        throw new Error('List note is not scrollable')
    }

});


