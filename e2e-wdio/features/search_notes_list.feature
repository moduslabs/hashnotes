@search @notesList
Feature: Search for notes
    As a User
    I want to be able to search for notes

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page

    Scenario Outline: Search for note
        Given User adds note with <text>
        When User enters <text> in "Search Notes" field
        Then Note with <text> is found
        Examples:
            | text                 |
            | bla                  |
            | 1234                 |
            | !@#$%^&*()_+}{":<>?  |
            | @!%$#^%$& test 12425 |

    Scenario Outline: Search for non existent note
        When User enters <text> in "Search Notes" field
        Then Error message is displayed
        Examples:
            | text            |
            | test            |
            | 51251           |
            | #&*$%848        |
            | test 336 ^#$&*( |





