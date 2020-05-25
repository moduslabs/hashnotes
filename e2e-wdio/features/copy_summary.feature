@copy_summary
Feature: Copy tag summary content
    As a User
    I want to be able to copy the content of the "Tag Summary"

    Background:
        Given the Hashnotes application is opened

    Scenario: Copy of "Tag Summary" section content
        Given "test" text is added after "#1" tag
        Given the "Copy" button from "Tag Summary" is clicked
        When the users uses the paste command in a new note
        Then the values copied are successfully inserted in the new note




