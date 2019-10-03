Feature: Note formatting
    As a user of the HashNotes application
    I should be able to format my notes
    In order see immediately the important information in the notes

    Scenario: The formatting applied to the notes should be visible on the two sidebars
        Given I go to "https://hashnotes.netlify.com/"
        When I click the "NEW NOTE" red button on the left sidebar
        Then I see a new empty note created
        When I enter a phrase having Bold, Italic, Underline and Strikethrough formatting and a #tag
        Then I see the phrase with correct formatting in the left and right-side sidebars

    Scenario: All formatting options should work as expected
        Given I go to "https://hashnotes.netlify.com/"
        When I click the "NEW NOTE" red button on the left sidebar
        Then I see a new empty note created
        When I enter a phrase having the formatting options:
          | Bold | Italic | Underline | Strikethrough | Superscript | Subscript | Code |
        Then I see that the text is formatted correctly

    Scenario: Bold, Italic and Underline formats have shortcut keys in the menu
        Given I go to "https://hashnotes.netlify.com/"
        When I open the Format menu
        Then I see that the Bold, Italic and Underline formats have shortcut keys present
