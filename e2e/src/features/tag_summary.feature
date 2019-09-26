Feature: Tag Summary
    As a user of the HashNotes application
    I should be able to see and use the Tag Summary
    In order to have my notes organized by tags

    Scenario: The copy button is present and copies the tag summary + note's title
        Given I go to "https://hashnotes.netlify.com/"
        When I add a new note with the "New Note" title
        And I add a paragraph with the text "This is a paragraph #firsttag"
        And I add a paragraph with the text "Taggless paragraph"
        Then I see the "This is a paragraph" text present under the "#firsttag" in the tag summary section
        And I don't see the "Taggless paragraph" text in the tag summary section
        And I see the "Copy" button in the tag summary section 
        When I click the "Copy" button
        Then the tag summary text is copied to the Clipboard containing the "New Note" title, the "#firsttag" tag and the  "This is a paragraph" text, 

    Scenario: The export summary button is present and opens the print options
        Given I go to "https://hashnotes.netlify.com/"
        When I add a new note with the "New Note" title
        And I add a paragraph with the text "This is a paragraph #firsttag"
        And I add a paragraph with the text "Taggless paragraph"
        Then I see the "This is a paragraph" text present under the "#firsttag" in the tag summary section
        And I don't see the "Taggless paragraph" text in the tag summary section
        And I see the "Export Summary" button in the tag section
        When I click the "Export Summary" button
        Then the browser's print screen appers with the preview of the tag summary
        When I click the "Save/Print" button in the browser's print pop-up
        Then I see the "New Note" title, "#firsttag" tag and the "This is a paragraph" exported

    Scenario Outline: The tag is in different places of the paragraph
        Given I go to "https://hashnotes.netlify.com/"
        When I add a new note 
        And I add a <paragraph>
        Then I see the <paragraph_in_tag_summary> present under the <tag> in the tag summary section
    Examples:
     | paragraph                            | tag        | paragraph_in_tag_summary  |
     | #firstword This is a shord paragraph | #firstword | This is a paragraph       | 
     | This is a #short paragraph           | #short     | This is a short paragraph | 
     | This is a short #paragraph           | #paragraph | This is a short           | 

    Scenario: Multiple paragraphs with the same tags
        Given I go to "https://hashnotes.netlify.com/"
        When I add a new note with the "New Note" title
        And I add "This is a paragraph #testing" paragraph
        And I add "This is another paragraph #testing" paragraph
        And I add "This is #testing paragraph" paragraph
        And I add "#testing This is another paragraph" paragraph
        Then I see the following text in the tag summary section under the "#testing" tag:
            | This is a paragraph       |
            | This is another paragraph |
            | This is testing paragraph |
            | This is another paragraph |

    Scenario: Multiple paragraphs with different tags
        Given I go to "https://hashnotes.netlify.com/"
        When I add a new note with the "New Note" title
        And I add "This is a paragraph #testing" paragraph
        And I add "This is #testing paragraph" paragraph
        And I add "This is a paragraph #testing2" paragraph
        And I add "This is #testing2 paragraph" paragraph
        Then I see the following text in the tag summary section under the "#testing" tag:
            | This is a paragraph       |
            | This is testing paragraph |
        Then I see the following text in the tag summary section under the "#testing2" tag:
            | This is a paragraph        |
            | This is testing2 paragraph |
