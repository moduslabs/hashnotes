@copy_summary
Feature: Copy tag summary content
    As a User
    I want to be able to copy the content of the "Tag Summary"

    Background:
        Given the Hashnotes application is opened
        Given the user has a note selected

    Scenario Outline: Copy of "Tag Summary" section content
        Given <tag> tag is created with <text> text
        When the user clicks the "Copy" button
        When the users creates a new note
        When the users uses the paste command
        Then the values are successfully inserted in the new note
        Examples:
            | tag  | text   |
            | #1   | test   |
            | #bla | random |




