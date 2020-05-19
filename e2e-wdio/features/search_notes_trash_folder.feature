@search @trashFolder
Feature: Search for notes in thrash folder
    As a User
    I want to be able to search for notes in the trash folder

    Background:
        Given the Hashnotes application is opened
    #Done
    Scenario Outline: Search for note
        Given several notes with random text are in the "Trash Folder"
        Given a note containing <text> text is added in the "Trash Folder"
        When the user searches for the note with <text> text in the "Trash Folder"
        Then note with <text> is found
        Examples:
            | text  |
            | bla   |
            | 1234  |
            | #tag |
    #Done
    Scenario: Search for non existent note
        Given the trash folder is opened
        When the user searches for "home" text
        Then error message is displayed



