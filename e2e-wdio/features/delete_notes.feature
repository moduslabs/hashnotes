@notes @delete
Feature: Delete notes
    As a User
    I want to be able to delete notes

    Background:
        Given the Hashnotes application is opened
        Given there is only one note in the list
    # Done
    Scenario: Notification displayed when note is deleted
        When the user deletes a note using the "Delete Note" button from File menu
        Then a notification prompt with "Cancel" and "Dismiss" buttons is displayed
    #Done
    Scenario: Note is deleted when notification prompt is dismissed
        Given the trash folder is empty
        Given a new note is created
        When the user deletes a note using the "Delete Note" button from File menu
        When the user clicks the "Dismiss" button from notification prompt
        Then note is deleted
        Then moved to the trash folder
    #Done
    Scenario: Delete note action is cancelled
        Given a new note is created
        When the user deletes a note using the "Delete Note" button from File menu
        When the user clicks the "Cancel" button from notification prompt
        Then note is restored in notes list
    #In progress
    Scenario: Timestamp not updated after cancelling delete action
        Given a new note with specific timestamp is added
        When the user deletes a note using the "Delete Note" button from File menu
        When the user clicks the "Cancel" button from notification prompt
        Then note is restored in notes list
        Then timestamp of note is not updated
    # Done
    Scenario Outline: Note is deleted when nofication prompt buttons are not selected
        Given the trash folder is empty
        Given a new note is created
        When the user clicks the "Delete Note" icon from <location>
        Then note is deleted
        Then moved to the trash folder
        Examples:
            | location    |
            | list_menu   |
            | editor_menu |
            


