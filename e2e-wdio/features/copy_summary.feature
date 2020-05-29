@copy_summary
Feature: Copy tag summary content
    As a User
    I want to be able to copy the content of the "Tag Summary"

    Background:
        Given the Hashnotes application is opened
# This test case needs to excuted against Safari, since on Chrome the paste key combination is not working due to a bug
    Scenario: Copy of "Tag Summary" section content
        Given "test" text is added after "#1" tag
        Given the "Copy" button from "Tag Summary" is clicked
        When the users uses the paste command in a new note
        Then only one tag with one bullet is displayed in "Tag Summary"




