Feature: Deleting Notes
    As a user of the HashNotes application
    I should be able to delete existing notes (and to undo the delete action)
    In order to have only the desired notes available


    Scenario: Deleting a note sends it to Trash
        Given I go to "https://hashnotes.netlify.com/"
        When I select an existing note from the left sidebar
        And I click the "move to trash" icon
        Then I see the toaster with the text "Moved 1 item to the trash" with "CANCEL" and "DISMISS" buttons
        When I click the "Trash Folder" button
        Then I see the Trash screen present
        And I see the deleted note present

    Scenario: Deleting a note and pressing CANCEL on the confirmation toaster
        Given I go to "https://hashnotes.netlify.com/"
        When I select an existing note from the left sidebar
        And I click the "move to trash" icon
        Then I see the toaster with the text "Moved 1 item to the trash" with "CANCEL" and "DISMISS" buttons
        When I click the "CANCEl" button
        Then I see that the note is still present
        When I click the "Trash Folder" button
        Then I see the Trash screen present
        And I see the deleted note is not present

    Scenario: Deleting a note and pressing DISMISS on the confirmation toaster
        Given I go to "https://hashnotes.netlify.com/"
        When I select an existing note from the left sidebar
        And I click the "move to trash" icon
        Then I see the toaster with the text "Moved 1 item to the trash" with "CANCEL" and "DISMISS" buttons
        When I click the "DISMISS" button
        Then I see that the toaster is no longer displayed
        When I click the "Trash Folder" button
        Then I see the Trash screen present
        And I see the deleted note present
