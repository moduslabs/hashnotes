@trashFolder
Feature: Access and exit trash folder
    As a User
    I want to be able to access and exit the trash folder

    Background:
        Given User navigates to Hashnotes page
        Then User is redirected to Hashnotes page

    Scenario: Trash folder is accessed
        When User clicks the "Trash Folder" button from sidebar
        Then Trash folder is accessed

    Scenario: Trash folder is exited
        When User clicks the "Trash Folder" button from sidebar
        Then Trash folder is accessed
        Then List of deleted is displayed
        When User clicks the "Back to notes" button
        Then Hasnotes main page is displayed
