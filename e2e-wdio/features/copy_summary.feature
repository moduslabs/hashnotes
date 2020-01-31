@copy_summary
Feature: Copy tag summary content
    As a User
    I want to be able to copy the content of the "Tag Summary"

    Background:
        Given  User navigates to Hashnotes page
        Then  User is redirected to Hashnotes page
        Given  User selects a note from the side Bar

    Scenario Outline: Copy of "Tag Summary" section content
        When User creates <tag>
        Then <tag> is added in the "Tag Summary"
        When User adds <text> after <tag>
        Then <text> is added in the "Tag Summary"
        When User clicks the "Copy" button
        Then Content of the "Tag Summary" section is copied
        When Users creates a new note
        When Users uses the paste command to insert the copied values in the note
        Then The values are successfully inserted in the new note
        Examples:
            | tag  | text   |
            | #a   | test   |
            | #bla | random |




