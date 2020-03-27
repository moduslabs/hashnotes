@notes @delete
Feature: Delete notes
    As a User
    I want to be able to delete notes

    Background:
        Given the Hashnotes application is opened
        Given the user has a note selected

    Scenario: Notification displayed when note is deleted
        When the user clicks the "Delete Note" icon from editor menu
        Then a notification prompt with "Cancel" and "Dismiss" buttons is displayed

    Scenario: Note is deleted when notification prompt is dismissed
        When the user clicks the "Delete Note" icon from editor menu while
        When the user clicks the "Dismiss" button from notification prompt
        Then note is deleted
        Then moved to the trash folder

    Scenario: Delete note action is cancelled
        When the user clicks the "Delete Note" icon from editor menu
        When the ser clicks the "Cancel" button from notification prompt
        Then note is restored in notes list

    Scenario: Timestamp not updated after cancelling delete action
        When the user clicks the "Delete Note" icon from editor menu
        When the user clicks the "Cancel" button from notification prompt
        Then note is restored in notes list
        Then timestamp of note is not updated

    Scenario Outline: Note is deleted
        When the user clicks the "Delete Note" icon from <location>
        Then note is deleted
        Then moved to the thrash folder
        Examples:
            | location    |
            | editor_menu |
            | list_menu   |


