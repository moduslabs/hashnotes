@tag
Feature: Test the tag summary of an specific note

   As a User
   I want to be able to tag summary notes

    Background:
    Given  User navigates to Hashnotes page
     Then  User is redirected to Hashnotes page
     Then  User select a note from the note side Bar
     Then  Tag Summary shown the highlight text of the note selected

    Scenario: User export a summary tag
      When  User clicks on Export summary option
      Then  File explorer window is open
       And  User select a local folder from the file explorer
      Then  User clicks on the save button
      Then  Summary note is exported

    Scenario: User copy a tag summary
      When  User clicks on the copy icon
      Then  User clicks on a new note button
      Then  User pastes the tag summary copied
