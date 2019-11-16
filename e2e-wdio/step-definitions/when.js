import { When } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

When(/^User clicks on New note button$/, {}, () => {
    HashNotesPage.getNoteSidebar().addNewNote();
});

When(/^User clicks the Trash folder option$/, {},() =>{
    HashNotesPage.getNoteSidebar().trashFolderLoad();
});

When(/^User clicks on the search note field/, {},() =>{
    HashNotesPage.getNoteSidebar().isSearchBarFocus();
});
