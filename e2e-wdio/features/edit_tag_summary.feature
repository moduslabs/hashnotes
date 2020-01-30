@tag_summary @edit_tag @delete_tag
Feature: Edit tags in note
    As a User
    I want to be able to edit tags

    Background:
        Given  User navigates to Hashnotes page
        Then  User is redirected to Hashnotes page
        Given  User selects a note from the side Bar
        Given User adds a tag in the note

    Scenario: Edit tag
        When User edits tag
        Then Tag is updated in the "Tag Summary" section

    Scenario: Delete tag
        When User deletes tag
        Then Tag is removed in the "Tag Summary" section

    Scenario: Bullet point is removed
        When User uses same tag on three different rows
        Then Tag is added in "Tag Summary" with three bullet points
        When User deletes one of the tag from one of the rows
        Then Only two bullet points are displayed

