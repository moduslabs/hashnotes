@notes @create
Feature: Create notes
    As a User
    I want to be able to add notes

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page

    Scenario: Empty note is created in the Hashnotes page when accessed for the first time
        Then Empty note is created by default

    Scenario Outline: Create new note
        When User clicks the "New Note" button from <location>
        Then New note is added to the notes list
        Then New note timestamp is updated with current date and time
        Examples:
            | location  |
            | sidebar   |
            | file_menu |

    Scenario Outline: New note is placed at the top of notes list
        When User clicks the "New Note" button from <location>
        Then New note is placed at the top of the notes list
        Examples:
            | location  |
            | sidebar   |
            | file_menu |

    Scenario: New note is created automatically when the last note from the notes list is deleted
        Given User has only one note added in the list
        When User deletes the only note found in the list
        Then The note is deleted successfully
        Then A new note is created automatically with current timestamp

    Scenario: Notes list is displayed when creating new note from trash folder
        Given User clicks the "New Note" button from sidebar
        Then New note is added to the notes list
        When User clicks the "Delete Note" icon from editor menu for the created note
        When User clicks the "Trash Folder" button from sidebar
        When User selects the deleted note
        When User clicks the "New Note" button from File menu
        Then The user is redirected to the notes list
