@search @trashFolder
Feature: Search for notes in thrash folder
    As a User
    I want to be able to search for notes in the trash folder

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page

    Scenario Outline: Search for note
        Given User adds note with <text>
        When User deletes note with <text>
        When User clicks the "Trash Folder" button from sidebar
        When User enters <text> in "Search Trash" field
        Then Note with <text> is found
        Examples:
            | text                 |
            | bla                  |
            | 1234                 |
            | !@#$%^&*()_+}{":<>?  |
            | @!%$#^%$& test 12425 |

    Scenario Outline: Search for non existent note
        Given User clicks the "Trash Folder" button from sidebar
        When User enters <text> in "Search Trash" field
        Then Error message is displayed
        Examples:
            | text            |
            | test            |
            | 51251           |
            | #&*$%848        |
            | test 336 ^#$&*( |



