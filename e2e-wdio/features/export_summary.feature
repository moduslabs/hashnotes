@export_summary
Feature: Export summary
    As a User
    I want to be able to export the summary

    Background:
        Given  User navigates to Hashnotes page
        Then  User is redirected to Hashnotes page
        Given Here is at least one empty note in the list


    Scenario: Export blank summary
        When User clicks "Export Summary" button
        Then Preview screen is displayed
        When User click "Save" button
        Then Blank Summary is exported successfully

    Scenario Outline: Export summary
        When User create <tag>
        When User adds <text>
        When User clicks "Export Summary" button
        Then Preview screen is displayed
        When User click "Save" button
        Then The content of the summary is exported successfully
        Examples:
            | tag  | text |
            | #1   | bla  |
            | #tag | 2    |



