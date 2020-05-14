@tag_summary @create_tag
Feature: Create tags in note
    As a User
    I want to be able to create tags in note

    Background:
        Given the Hashnotes application is opened
        # Given the user has a note selected
    #Done
    Scenario: Create a tag
        When the user creates '#bla' tag
        Then '#bla' tag is created
        Then displayed in the "Tag Summary" section
    #Done
    Scenario: Identical tags on same row
        When the user creates the '#1234' tag twice on the same row
        Then tag is added once to "Tag Summary" with one bullet point
    #Done
    Scenario: Identical tags on different rows
        When the user creates '#bla' tag
        When the user creates '#bla' tag on the following row
        Then tag is added once to "Tag Summary" with two bullet points
    #Done
    Scenario: Text added only to one of the bullet points
        Given "#1" tag is created
        Given "#1" tag is created on the next row
        When the user adds "test" after second tag added
        Then "test" text is displayed only next to the second bullet
    #Done
    Scenario: Several tags can be created at the same time
        When the user creates "#1214#abc#tag" tags
        Then three separate tags are created in the "Tag Summary" section
    #Done
    Scenario: Text is added to all tags
        Given "#1#2#3#4#5" tags are created
        When  the user enter "test" text after tags in the text editor
        Then  "test" text is displayed after each tag in the "Tag Summary" section
    #In progress
    Scenario: Tags cannot contain space
        When the user creates '#bla' tag
        When the user clicks on "Space Bar" key
        Then "#tag" is created automatically

    # Scenario Outline: Tags containing special characters cannot be created
    #     When the user enters <tag> tag
    #     When the user clicks on "Enter" key
    #     Then <tag> tag is not created
    #     Examples:
    #         | tag |
    #         | #%  |
    #         | #:  |
    #         | #)  |
    #         | #@  |
    #         | #=  |

    # Scenario: Tag added after text
    #     Given text is added in the note
    #     When the user adds a tag after text
    #     Then text is displayed in "Tag Summary" under the tag

    # Scenario Outline: Text added between two different tags
    #     Given <tag1> tag is created on the first row
    #     Given <tag2> tag on the same row as <tag1> tag
    #     When the user adds <text> text after <tag1> tag
    #     Then text is displayed after both tags in "Tag Summary"
    #     Examples:
    #         | tag1 | tag2  | text    |
    #         | #1   | #2    | bla     |
    #         | #tag | #test | 1242152 |

    # Scenario: Text not displayed in "Tag Summary"
    #     Given a tag is created
    #     When the user adds text on different row than the tag
    #     Then text is not displayed in "Tag Summary"






