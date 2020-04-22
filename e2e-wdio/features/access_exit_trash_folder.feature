@trashFolder
Feature: Access and exit trash folder
    As a User
    I want to be able to access and exit the trash folder

    Background:
        Given the Hashnotes application is opened

    Scenario: Trash folder is accessed
        When the user clicks the "Trash Folder" button from sidebar
        Then trash folder is accessed

    Scenario: Trash folder is exited
        Given the trash folder is opened
        When the user clicks the "Back to notes" button
        Then Hashnotes main page is displayed
