@notes @delete @trashFolder
Feature: Delete notes from trash folder
    As a User
    I want to be able to delete notes from the trash folder

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page
        When User click on "Trash Folder" button from sidebar
        Then User is redirected to the thrash folder page
        Given Here is at least one note in the list

    Scenario Outline: Note is permanently deleted
        When User clicks the "Delete Note" icon from <location> while having a note selected
        When User does not select any option from the notification prompt
        Then Note is permanently deleted
        Then Removed from trash folder
        Examples:
            | location    |
            | editor_menu |
            | list_menu   |

    Scenario: Notification displayed when note is deleted
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification with "Cancel" and "Dismiss" buttons is displayed

    Scenario: Note is permanently deleted when notification prompt is dismissed
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification prompt with "Cancel" and "Dismiss" buttons is displayed
        When User clicks the "Dismiss" button
        Then Note is permanently deleted
        Then Removed from trash folder

    Scenario: Permanently delete note action is cancelled
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification prompt with "Cancel" and "Dismiss" buttons is displayed
        When User clicks the "Cancel" button
        Then Note is restored in trash folder notes list

    Scenario: Timestamp not updated after cancelling delete action
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification with "Cancel" and "Dismiss" buttons is displayed
        When User clicks the "Cancel" button
        Then Note is restored in trash folder notes list
        Then Timestamp of note is not updated

