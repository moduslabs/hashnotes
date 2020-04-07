@tag_summary @edit_tag @delete_tag
Feature: Edit tags in note
    As a User
    I want to be able to edit tags

    Background:
        Given the Hashnotes application is opened
        Given the user has selected a note which contains a tag

    Scenario: Edit tag
        When the user edits tag
        Then tag is updated in the "Tag Summary" section

    Scenario: Delete tag
        When the user deletes tag
        Then tag is removed in the "Tag Summary" section

    Scenario: Bullet point is removed
        Given the initial tag is copied on 2 more rows
        When User deletes the tag from one of the rows
        Then Only two bullet points are displayed

