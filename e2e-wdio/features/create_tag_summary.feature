@tag_summary @create_tag
Feature: Create tags in note
    As a User
    I want to be able to create tags in note

    Background:
        Given  User navigates to Hashnotes page
        Then  User is redirected to Hashnotes page
        Given  Users selects a note from the side Bar

    Scenario Outline: Create a tag
        When User enters <tag>
        When User clicks on <key> key
        Then <tag> tag is created
        Then Displayed in the "Tag Summary" section
        When User enters <tag>
        When User clicks on <key> key
        Then <tag> tag is created
        Then Displayed in the "Tag Summary" section
        Examples:
            | tag                 | key       |
            | #bla                | Enter     |
            | #bla                | Space Bar |
            | #1234               | Enter     |
            | #1234               | Space Bar |
            | #testtagblaletatata | Enter     |
            | #testtagblaletatata | Space Bar |


    Scenario Outline: Identical tags on same row
        When User creates <tag1>
        When User creates <tag1> a second time on the same row
        Then Tag is added once to "Tag Summary" with one bullet point
        Examples:
            | tag1 |
            | #1   |
            | #bla |

    Scenario Outline: Identical tags on different rows
        When User creates <tag1> on first row
        When User creates <tag1> on different row
        Then Tag is added once to "Tag Summary" with two bullet points
        Examples:
            | tag1 |
            | #1   |
            | #bla |

    Scenario Outline: Text added only to one of the bullet points
        When User creates <tag1> on first row
        When User creates <tag2> on different row
        Then Tag is added once to "Tag Summary" with two bullet points
        When User adds <text> to <tag2>
        Then <text > is displayed only next to the second bullet point
        Examples:
            | tag1 | tag2 | text |
            | #1   | #1   | test |
            | #bla | #bla | bla  |

    Scenario: Several tags can be created at the same time
        When User enters "#1214#abc#tag"
        When User clicks on "Enter" key
        Then Three separate tags are created
        Then Displayed in the "Tag Summary" section

    Scenario Outline: Text is added to all tags
        When User enters <tags>
        When User clicks on "Space Bar" key
        Then Five separate tags are created
        Then Displayed in the "Tag Summary"
        When User enter <text> after tags in the text editor
        Then <text> is displayed after each tag in the "Tag Summary"
        Examples:
            | tags            | text   |
            | #1#2#3#4#5      | test   |
            | #a#b#c#d        | bla    |
            | #ala#bala#porto | random |

    Scenario: Tags cannot contain space
        When User enters "#tag"
        When User clicks on "Space Bar" key
        Then Tag "tag" is created automatically

    Scenario Outline: Tags containing special characters cannot be created
        When User enters <tag>
        When User clicks on "Enter" key
        Then <tag> is not created

        Examples:
            | tag |
            | #%  |
            | #:  |
            | #)  |
            | #@  |
            | #=  |

    Scenario: Tag added before text
        When User creates a tag
        When User adds text after tag
        Then The text is displayed in "Tag Summary" under the tag

    Scenario: Tag added after text
        When User adds text in note
        When User adds a tag
        Then The text is displayed in "Tag Summary" under the tag

    Scenario Outline: Text added between two different tags
        When User creates <tag1>
        When User adds <text> after <tag1>
        When User creates <tag2>
        Then <text> is displayed under <tag1> in "Tag Summary"
        Then <text> is displayed under <tag2> in "Tag Summary"
        Examples:
            | tag1 | tag2 | text   |
            | #1   | #2   | bla    |
            | #3   | #4   | test   |
            | #5   | #6   | random |

    Scenario: Text not displayed in "Tag Summary"
        When User creates a tag
        When User adds text right after tag
        Then Text is displayed in "Tag Summary"
        When User moves to the next row
        When User adds text
        Then Text is not displayed in in "Tag Summary"






