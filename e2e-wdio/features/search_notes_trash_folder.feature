@search @trashFolder
Feature: Search for notes in thrash folder
    As a User
    I want to be able to search for notes in the trash folder

    Background:
        Given the Hashnotes application is opened

    Scenario Outline: Search for note
        Given a note containing <text> exists in "Trash Folder"
        Given the user has accessed the "Trash Folder"
        When the user searches for <text>
        Then note with <text> is found
        Examples:
            | text                 |
            | bla                  |
            | 1234                 |
            | !@#$%^&*()_+}{":<>?  |
            | @!%$#^%$& test 12425 |

    Scenario Outline: Search for non existent note
        Given the "Trash Folder" is accessed
        When the user searches for <text>
        Then error message is displayed
        Examples:
            | text            |
            | test            |
            | 51251           |
            | #&*$%848        |
            | test 336 ^#$&*( |



