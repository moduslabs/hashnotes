@notes @delete
Feature: Delete notes
    As a User
    I want to be able to delete notes

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page
        Given Here is at least one note in the list

    Scenario Outline: Note is deleted
        When User clicks the "Delete Note" icon from <location> while having a note selected
        When User does not select any option from the notification prompt
        Then Note is deleted
        Then Moved to the thrash folder
        Examples:
            | location    |
            | editor_menu |
            | list_menu   |

    Scenario: Notification displayed when note is deleted
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification with "Cancel" and "Dismiss" buttons is displayed

    Scenario: Note is deleted when notification prompt is dismissed
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification prompt with "Cancel" and "Dismiss" buttons is displayed
        When User clicks the "Dismiss" button
        Then Note is deleted
        Then Moved to the trash folder

    Scenario: Delete note action is cancelled
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification prompt with "Cancel" and "Dismiss" buttons is displayed
        When User clicks the "Cancel" button
        Then Note is restored in notes list

    Scenario: Timestamp not updated after cancelling delete action
        When User clicks the "Delete Note" icon from editor menu while having a note selected
        Then Notification with "Cancel" and "Dismiss" buttons is displayed
        When User clicks the "Cancel" button
        Then Note is restored in notes list
        Then Timestamp of note is not updated
