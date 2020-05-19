@viewport_changes

Feature: Scroll bar is displayed
    As a User
    I want to be able to scroll up/down in the different sections of the Hashnotes page

    Background:
        Given the Hashnotes application is opened
        Given the user has a note containing text on different rows

    Scenario: Scroll bar displayed for notes list
        When the user changes the viewport of the Hashnotes page until the note details don't fit the screen
        Then scroll bar is displayed

    Scenario: Scroll bar displayed for text editor
        When the user changes the viewport of the Hashnotes page until the text does not fit the screen of the text editor
        Then scroll bar is displayed

    Scenario: Scroll bar displayed for "Tag Summary"
        Given tags are added on different rows in the note
        When the user changes the viewport of the Hashnotes page until the tags don't fit the screen
        Then scroll bar is displayed
