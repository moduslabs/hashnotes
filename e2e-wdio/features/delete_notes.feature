@notes @delete
Feature: Delete notes
    As a User
    I want to be able to delete notes

    Background:
        Given the Hashnotes application is opened
        Given there is only one note in the list
    #Done
    Scenario: Notification displayed when note is deleted
        When the user clicks the "Delete Note" icon from editor menu
        Then a notification prompt with "Cancel" and "Dismiss" buttons is displayed

    # Scenario: Note is deleted when notification prompt is dismissed
    #     When the user clicks the "Delete Note" icon from editor menu while
    #     When the user clicks the "Dismiss" button from notification prompt
    #     Then note is deleted
    #     Then moved to the trash folder
    #Done
    Scenario: Delete note action is cancelled
        Given a new note is created
        When the user clicks the "Delete Note" icon from editor menu
        When the user clicks the "Cancel" button from notification prompt
        Then note is restored in notes list

    # Scenario: Timestamp not updated after cancelling delete action
    #     Given a new note is created
    #     When the user clicks the "Delete Note" icon from editor menu
    #     When the user clicks the "Cancel" button from notification prompt
    #     Then note is restored in notes list
    #     Then timestamp of note is not updated

    # Scenario Outline: Note is deleted
    #     When the user clicks the "Delete Note" icon from <location>
    #     Then note is deleted
    #     Then moved to the thrash folder
    #     Examples:
    #         | location    |
    #         | editor_menu |
    #         | list_menu   |


