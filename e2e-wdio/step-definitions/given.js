import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

Given(/^User navigates to Hashnotes page$/, {}, () => {
    HashNotesPage.open();
});
