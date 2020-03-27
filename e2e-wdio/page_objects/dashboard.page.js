import Page from './page';
import NoteEditorCo from './noteeditor.co';
import NoteSidebarCo from './notesidebar.co';
import TagSidebarCo from './tagsidebar.co';

class Dashboard extends Page {

    getNoteEditor() {
        return NoteEditorCo;
    }

    getNoteSidebar() {
        return NoteSidebarCo;
    }

    getTagSidebar() {
        return TagSidebarCo;
    }

    isLoaded() {
       browser.getUrl();
       browser.getTitle();
       this.getNoteEditor().isLoaded();
       this.getNoteSidebar().isLoaded();
       this.getTagSidebar().isLoaded();
    }
}

module.exports = new Dashboard ('', '/');
