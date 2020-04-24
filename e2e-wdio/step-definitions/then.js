import { Then } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'
import moment from 'moment';

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
        console.log('Note creation time is matching the local time')
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
    browser.setTimeout({'implicit': 5000 })
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

Then (/^note is restored in notes list$/, {}, () =>{
    let numOfNotes = HashNotesPage.getNoteSidebar().getNumberOfNotes();
    if (numOfNotes === 2){
        return true;
    }else {
        throw new Error('There is less than 2 or more than 2 notes')
    }
} )

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


