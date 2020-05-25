@viewport_changes

Feature: Scroll bar is displayed
    As a User
    I want to be able to scroll up/down in the different sections of the Hashnotes page

    Background:
        Given the Hashnotes application is opened

    Scenario: List note is scrollable
        Given there are several notes added
        When the user selects the first note added
        Then note displayed viewport
        Then list note is scrollable

    Scenario: Text area is scrollable      
        Given there is a note with text added on multiple rows
        When the user selects the first row of the note which is not displayed in viewport
        Then first row is displayed in viewport
        Then text area is scrollable

    Scenario: Tag Summary is scrollable
        Given ther is a note with different tags added on multiple rows
        When the user selects the last tag added which is not displayed in viewport
        Then tag is displayed in viewport
        Then "Tag Summary" is scrollable

