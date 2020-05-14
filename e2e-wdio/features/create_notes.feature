@notes @create
Feature: Create notes
    As a user, I want to be able to create notes

    Background:
        Given the Hashnotes application is opened

    Scenario Outline: Create new note
        When the user clicks the "New Note" button from <location>
        Then a new note is added at the top of the notes list with updated timestamp
        Examples:
            | location  |
            | sidebar   |
            | file_menu |

    Scenario: New note is created automatically when the last note from the notes list is deleted
        Given there is only one note in the list
        When the user deletes the note
        Then a new note is created automatically with updated timestamp

    Scenario: Notes list is displayed when creating new note from trash folder
        Given the trash folder is opened
        When the user creates a new note from the File menu inside the trash folder
        Then the user is redirected to the notes list