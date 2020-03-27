@tag_summary @create_tag
Feature: Create tags in note
    As a User
    I want to be able to create tags in note

    Background:
        Given the Hashnotes application is opened
        Given the user has a note selected

    Scenario Outline: Create a tag
        When the user enters <tag> text
        When the user clicks on <key> key
        Then <tag> tag is created
        Then displayed in the "Tag Summary" section
        Examples:
            | tag   | key       |
            | #bla  | Enter     |
            | #bla  | Space Bar |
            | #1234 | Enter     |
            | #1234 | Space Bar |


    Scenario Outline: Identical tags on same row
        When the user creates <tag1> tag
        When the user creates <tag1> tag a second time on the same row
        Then tag is added once to "Tag Summary" with one bullet point
        Examples:
            | tag1 |
            | #1   |
            | #bla |

    Scenario Outline: Identical tags on different rows
        When the user creates <tag1> tag on first row
        When the user creates <tag1> tag on different row
        Then tag is added once to "Tag Summary" with two bullet points
        Examples:
            | tag1 |
            | #1   |
            | #bla |

    Scenario Outline: Text added only to one of the bullet points
        Given <tag1> tag is created on the first row
        Given <tag2> tag is created on a different row
        When the user adds <text> to <tag2>
        Then <text> is displayed only next to the second bullet point
        Examples:
            | tag1 | tag2 | text |
            | #1   | #1   | test |
            | #bla | #bla | bla  |

    Scenario: Several tags can be created at the same time
        When the user creates "#1214#abc#tag" tags
        Then three separate tags are created in the "Tag Summary" section

    Scenario Outline: Text is added to all tags
        Given <tags> tags are created
        Given displayed in the "Tag Summary" section
        When  the user enter <text> text after tags in the text editor
        Then  <text> text is displayed after each tag in the "Tag Summary"
        Examples:
            | tags       | text |
            | #1#2#3#4#5 | test |
            | #a#b#c#d   | bla  |

    Scenario: Tags cannot contain space
        When the user enters "#tag"
        When the user clicks on "Space Bar" key
        Then "#tag" is created automatically

    Scenario Outline: Tags containing special characters cannot be created
        When the user enters <tag> tag
        When the user clicks on "Enter" key
        Then <tag> tag is not created
        Examples:
            | tag |
            | #%  |
            | #:  |
            | #)  |
            | #@  |
            | #=  |

    Scenario: Tag added before text
        Given a tag is created
        When the user adds text after tag
        Then text is displayed in "Tag Summary" under the tag

    Scenario: Tag added after text
        Given text is added in the note
        When the user adds a tag after text
        Then text is displayed in "Tag Summary" under the tag

    Scenario Outline: Text added between two different tags
        Given <tag1> tag is created on the first row
        Given <tag2> tag on the same row as <tag1> tag
        When the user adds <text> text after <tag1> tag
        Then text is displayed after both tags in "Tag Summary"
        Examples:
            | tag1 | tag2  | text    |
            | #1   | #2    | bla     |
            | #tag | #test | 1242152 |

    Scenario: Text not displayed in "Tag Summary"
        Given a tag is created
        When the user adds text on different row than the tag
        Then text is not displayed in "Tag Summary"






