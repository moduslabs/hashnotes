@notes @delete @trashFolder
Feature: Delete notes from trash folder
    As a User
    I want to be able to delete notes from the trash folder

    Background:
        Given the Hashnotes application is opened
        Given the user has a note selected from the "Trash Folder"

    Scenario Outline: Note is permanently deleted
        When the user clicks the "Delete Note" icon from <location>
        Then note is permanently deleted
        Examples:
            | location    |
            | editor_menu |
            | list_menu   |

    Scenario: Notification displayed when note is deleted
        When the user clicks the "Delete Note" icon from editor menu
        Then a notification prompt with "Cancel" and "Dismiss" buttons is displayed

    Scenario: Note is permanently deleted when notification prompt is dismissed
        When the user clicks the "Delete Note" icon from editor menu
        When the user clicks the "Dismiss" button from the notification prompt
        Then note is permanently deleted
        Then removed from trash folder

    Scenario: Permanently delete note action is cancelled
        When the user clicks the "Delete Note" icon from editor menu
        When the user clicks the "Cancel" button from the notification prompt
        Then note is restored in trash folder notes list
        Then timestamp of note is not updated

