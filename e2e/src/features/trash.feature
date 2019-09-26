Feature: Trash Folder
    As a user of the HashNotes application
    I should be able to see and use the functionality in the left sidebar
    In order to create and have quick access to the notes

    Scenario: Clicking the "Trash Folder" button takes you to the Trash Folder screen
        Given I go to "https://hashnotes.netlify.com/"
        When I click the "Trash Folder" button
        Then I see the Trash screen present
        And I see the "Search Trash" input box
        And I see the "Back to notes" button
        And I see the deleted notes if present

    Scenario: "Back to notes" button is present and takes the user to the Notes left sidebar
        Given I go to "https://hashnotes.netlify.com/"
        When I click the "Trash Folder" button
        Then I see the Trash screen present
        And I see the "Search Trash" input box
        And I see the "Back to notes" button
        When I click the "Back to notes" button
        Then I navigate to the standard left sidebar view