@other

Feature: Other functionalities of the Hashnotes page

    As a User
    I want to be able to perform other actions in the Hashnotes page

    Background:
        Given User navigates to Hashnotes page
        Then  User is redirected to Hashnotes page
        Given Users selects a note from the side Bar

    Scenario: Scroll bar displayed for notes list
        Given User adds random text in note
        When User changes the size of the Hashnotes page until the note details don't fit the screen
        Then Scroll bar is displayed

    Scenario: Scroll bar displayed for text editor
        Given User adds random text on different rows in note
        When User changes the viewport of the Hashnotes page until the text does not fit the screen of the text editor
        Then Scroll bar is displayed

    Scenario: Scroll bar displayed for "Tag Summary"
        Given User adds several tags on different rows in note
        When User changes the viewport of the Hashnotes page until the tags d'ont fit the screen
        Then Scroll bar is displayed


    Scenario Outline: Day indicator from the timestamp is updated
        Given User has a note create <numberOfDays> days ago
        When  User verifies the day indicator from timestamp
        Then  Day indicator has the the value <day>
        Examples:
            | numberOfDays | day                 |
            | 1            | Yesterday           |
            | 2            | actual creation day |
            | 4            | actual creation day |
            | 5            | actual creation day |
            | 7            | Today               |
