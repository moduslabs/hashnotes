@tag_summary @edit_tag @delete_tag
Feature: Edit tags in note
    As a User
    I want to be able to edit tags

    Background:
        Given the Hashnotes application is opened
        Given the user has a note which contains a tag
    #Done
    Scenario: Update Tag Summary section
        When the user updates the tag
        Then tag is updated in the "Tag Summary" section
    #Done
    Scenario: Delete tag
        When the user deletes the tag
        Then tag is removed in the "Tag Summary" section
    #Done
    Scenario: Bullet point is removed
        Given the initial tag is copied on the next 2 rows
        When the user deletes the tag from one of the rows
        Then only two bullet points are displayed in the "Tag Summary" section

