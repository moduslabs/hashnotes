import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page';
import moment from 'moment';

//Create note feature
Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
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
Given(/^a new note with specific timestamp is added$/, {}, () => {
    let localTime;
    let formatedLocalTime;
    let localHour = moment().format('hh');

    HashNotesPage.getNoteSidebar().newButtonDisplayed();
    HashNotesPage.getNoteSidebar().addNewNoteSidebar();

    let formatTime = function () {
        if (localHour === '12'){
    localTime ='Today, ' + '00' + moment().format(":mm a")
        }else {
        localTime = 'Today, ' + moment().format("hh:mm a");
        }
        return localTime
    }

    formatedLocalTime = formatTime();
    browser.config.ScenarioCtx["formatedLocalTime"] = formatedLocalTime;
    //Other way to store the value of formatedLocalTime to ScenarioCtx
    // browser.config.ScenarioCtx = {
    //     formatedLocalTime
    // };
      
});
