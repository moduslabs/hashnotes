@other

Feature: Other functionalities of the Hashnotes page

    As a User
    I want to be able to perform other actions in the Hashnotes page

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page

    Scenario: Scroll bar displayed
        When User adds more than four empty notes
        Then Scroll bar is displayed

    Scenario: Scroll bar is removed
        Given User adds five notes
        When User deletes one note
        Then Scroll bar is removed

    Scenario Outline: Day indicator from the timestamp is updated
        Given User clicks the "New Note" button from the sidebar
        And User moves the system date with <numberOfDays> in front
        When User refreshes the Hashnotes page
        Then Timestamp displays <day>
        Examples:
            | numberOfDays | day                 |
            | 1            | Yesterday           |
            | 2            | actual creation day |
            | 4            | actual creation day |
            | 5            | actual creation day |
            | 7            | Today               |
