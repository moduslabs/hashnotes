@export_summary
Feature: Export summary
    As a User
    I want to be able to export the summary

    Background:
        Given the Hashnotes application is opened
        Given there is one empty note


    Scenario: Export blank summary
        When the user clicks the "Export Summary" button
        When the user clicks the "Save" button
        Then a blank Summary is exported successfully

    Scenario Outline: Export summary
        Given a <tag> with <text> are added in note
        When the user clicks the "Export Summary" button
        When the user clicks the "Save" button
        Then the content of the summary is exported successfully
        Examples:
            | tag  | text |
            | #1   | bla  |
            | #tag | 2    |



