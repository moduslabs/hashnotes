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
    browser.pause(2000)
    HashNotesPage.getNoteSidebar().newButtonExists();
});
//Access and exit trash folder feature
Then (/^trash folder is accessed$/, {}, () => {
    HashNotesPage.getNoteSidebar().backToNotesExists();
});
//Access and exit trash folder feature
Then (/^Hashnotes main page is displayed$/, {}, () => {
    browser.pause(2000)
    HashNotesPage.getNoteSidebar().newButtonExists();
});
//Delete notes feature
Then (/^a notification prompt with "Cancel" and "Dismiss" buttons is displayed$/, {}, () => {
    browser.setTimeout({'implicit': 2000 })
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
    } else{
        throw new Error ('Prompt not displayed')
    }
});
//Delete notes feature
Then (/^note is restored in notes list$/, {}, () =>{

    let numOfNotesAfterCancel = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    let numOfNotesBeforeCancel = parseInt(browser.config.ScenarioCtx["numOfNotesBeforeCancel"], 10);
    if (numOfNotesAfterCancel === (numOfNotesBeforeCancel + 1)){
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

Then (/^timestamp of note is not updated$/, {}, () =>{
    let localTimeAtCreation;
    let noteTime = HashNotesPage.getNoteSidebar().getNoteTime();
    noteTime = noteTime.toString();

   localTimeAtCreation = browser.config.ScenarioCtx["formatedLocalTime"];
    console.log('Second', localTimeAtCreation);

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


