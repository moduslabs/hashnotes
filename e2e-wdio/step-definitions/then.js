import { Then } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

Then(/^User is redirected to Hashnotes page$/, {}, () => {
    HashNotesPage.isLoaded();
});

Then(/^A new note is added$/, {}, () => {
    HashNotesPage.getNoteSidebar().isNoteAdded();
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
