import { Then } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'
import moment from 'moment';

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

Then (/the user is redirected to the notes list$/, {}, () => {
    browser.pause(5000)
    console.log('notes list displayed')
});
