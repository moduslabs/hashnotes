@search @notesList
Feature: Search for notes
    As a User
    I want to be able to search for notes

    Background:
        Given the Hashnotes application is opened
    #Done
    Scenario Outline: Search for note
        Given several notes are created with random text
        Given a note containing text <text> is created
        When the user searches for a note with <text> text
        Then only the note with <text> text is found
        Examples:
            | text  |
            | omega |
            | 17475 |
            | #test |
    #Done
    Scenario: Search for non existent note
        When the user searches for "home" text
        Then error message is displayed




