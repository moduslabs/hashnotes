Feature: Left Sidebar
    As a user of the HashNotes application
    I should be able to see and use the functionality in the left sidebar
    In order to create and have quick access to the notes

    Scenario: The "NEW NOTE" button is present and creates a new empty note
        Given I go to "https://hashnotes.netlify.com/"
        When I click the "NEW NOTE" red button on the left sidebar
        Then I see a new empty note created 
        And I see the "Today" date and the current hour in the left sidebar

    Scenario: Selecting a note from the left sidebar displays it in the edit window
        Given I go to "https://hashnotes.netlify.com/"
        When I select an existing note from the left sidebar
        Then I see that the note is selected 
        And that the note is opened in the edit window with it's text present

    Scenario: Editing an existing note changes it's timestamp to "Today" and current hour
        Given I go to "https://hashnotes.netlify.com/"
        When I select an existing note from the left sidebar
        Then I see that the note is selected 
        And that the note is opened in the edit window with it's text present
        When I add a character to the note
        Then I see the timestamp in the left sidebar changed to "Today" and to the current hour
        And I see that the edited note is the first one in the left sidebar

    # TODO - Not implemented yet! 
    # Scenario: Using "Search Notes" input box returns desired notes
    #     Given I go to "https://hashnotes.netlify.com/"
    #     When I add a new note with the "First Note" title
    #     And I add a new note with the "Second Note" title
    #     And I add a new note with the "Third Note" title
    #     When I enter the "Second" text into the "Search Notes" input box