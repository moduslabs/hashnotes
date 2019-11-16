@notes
Feature: Create, delete or search notes

    As a User
    I want to add new notes

    Background:
    Given User navigates to Hashnotes page
     Then User is redirected to Hashnotes page

    @this
    Scenario: User add a note from left panel
      When User clicks on New note button
      Then A new note is added

    @this
    Scenario: User goes to Trash Folder
      When  User clicks the Trash folder option
      Then  Trash Folder is displayed

    @this
    Scenario Outline: Scenario Outline name: User Search a note
      When  User clicks on the search note field
      Then  User types <searchCriteria>
      Then  Notes that begin with <searchCriteria> are shown
      Examples:
         | searchCriteria |
         | Note           |
         | Lorem          |

