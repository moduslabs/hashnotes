@notes @delete @trashFolder
Feature: Delete notes from trash folder
    As a User
    I want to be able to delete notes from the trash folder

    Background:
        Given the Hashnotes application is opened
        Given there is a note in the "Trash Folder"
    #Done
    Scenario Outline: Note is permanently deleted when no buttons from notification prompt are selected
        When the user clicks the "Delete Note" icon from <location>
        Then note is permanently deleted
        Examples:
            | location    |
            | editor_menu |
            | list_menu   |
    #Done
    Scenario: Notification displayed when note is deleted
        When the user deletes note using the "Delete Note" icon from editor menu
        Then a notification prompt with "Cancel" and "Dismiss" buttons is displayed
    #Done
    Scenario: Note is permanently deleted when notification prompt is dismissed
        When the user deletes note using the "Delete Note" icon from editor menu
        When the user clicks the "Dismiss" button from notification prompt
        Then note is permanently deleted

    Scenario: Permanently delete note action is cancelled
        Given a new note is added in the trash folder
        When the user deletes note using the "Delete Note" icon from editor menu
        When the user cancels the delete note action
        Then note is restored in trash folder notes list
        Then timestamp of note is not updated

