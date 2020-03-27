@notes @create
Feature: Create notes
    As a user, I want to be able to create notes

    Background:
        Given the Hashnotes application is opened

#    Scenario: Empty note is created in the Hashnotes page when accessed for the first time
#        Then Empty note is created by default

    Scenario Outline: Create new note
        When the user clicks the "New Note" button from <location>
        Then a new note is added at the top of the notes list with updated timestamp
        Examples:
            | location  |
            | sidebar   |
            | file_menu |

#    Scenario Outline: New note is placed at the top of notes list
#        When User clicks the "New Note" button from <location>
#        Then New note is placed at the top of the notes list
#        Examples:
#            | location  |
#            | sidebar   |
#            | file_menu |

    Scenario: New note is created automatically when the last note from the notes list is deleted
        Given there is only one note in the list
        When the user deletes the note
        Then a new note is created automatically with current timestamp

    Scenario: Notes list is displayed when creating new note from trash folder
        Given a note from the trash folder is selected
        When the user clicks the "New Note" button from the File menu
        Then the user is redirected to the notes list
