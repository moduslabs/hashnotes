import { Given } from 'cucumber';
import HashNotesPage from '../page_objects/dashboard.page'

Given(/^the Hashnotes application is opened$/, {}, () => {
    HashNotesPage.open();
});
