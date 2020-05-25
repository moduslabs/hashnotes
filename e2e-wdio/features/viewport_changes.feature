@viewport_changes

Feature: Scroll bar is displayed
    As a User
    I want to be able to scroll up/down in the different sections of the Hashnotes page

    Background:
        Given the Hashnotes application is opened

    Scenario: List note is scrollable
        Given there are several notes added
        When the user selects the first note added
        Then note displayed view port
        Then list note is scrollable

    Scenario: Scroll bar displayed for text editor
        Given there is a note with text added on multiple rows
        When the user changes the viewport of the Hashnotes page until the text does not fit the screen of the text editor
        Then 

    # Scenario: Scroll bar displayed for "Tag Summary"
    #     Given there is a note with tags are added on different rows
    #     When the user changes the viewport of the Hashnotes page until the tags don't fit the screen
    #     Then 
