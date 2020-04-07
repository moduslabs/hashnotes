import { Then } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

Then(/^User is redirected to Hashnotes page$/, {}, () => {
    HashNotesPage.isLoaded();
});

Then(/^a new note is added at the top of the notes list with updated timestamp$/, {}, () => {
    HashNotesPage.getNoteSidebar().getNoteTime();
});

Then (/^Trash Folder is displayed$/, {}, () => {
    HashNotesPage.getNoteSidebar().isTrashFolderLoad();
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

Then (/^Notes that begin with (Note|Lorem) are shown$/, {}, (searchCriteria) => {
    //.....
});
