@editor
Feature: Edits notes
    As a User
    I want to be able to edit notes

    Background:
        Given the Hashnotes application is opened
    #Done
    # Scenario Outline: Undo change
    #     Given <text> text is added to the note
    #     When  the user clicks the "Undo" button from <location>
    #     Then  <text> text is removed
    #     Examples:
    #         | text              | location  |
    #         | Food              | edit_menu |
    #         | How you ever been | edit_bar  |
    #Done
    # Scenario Outline: Redo change
    #     Given <text> text is added to the note
    #     Given <text> text is removed from the note using the "Undo" button
    #     When the user clicks the "Redo" button from <location>
    #     Then delete action of <text> text is reverted
    #     Examples:
    #         | text              | location  |
    #         | Food              | edit_menu |
    #         | How you ever been | edit_bar  |
    #Done
    #The below scenario can't be runned on MAC Chrome browser due to the fact the "Command" key is not recognised
    # Scenario Outline: Copy and Paste text
    #     Given <text> text is added to the note
    #     When the user copies the text added using copy combination of keys
    #     When the user clears the text
    #     When the user pastes the text in the note using paste combination of keys
    #     Then <text> is successfully pasted
    #     Examples:
    #         | text              |
    #         | Food              |
    #         | How you ever been |
    #To be Done
    # Scenario: Insert link
    #     Given "random" text is added to the note
    #     When  User selects <text>
    #     When  User clicks on "Insert" menu
    #     When  User selects "Link" option
    #     Then  A "Insert/Edit Link" modal is open
    #     When  User enters <link> into the "URL" field
    #     Then  "Text to display" field is autocompleted with the selected text
    #     When  User clicks on the "Save" button
    #     Then  Link is inserted in the note text field
    #     Examples:
    #         | text   | link                    |
    #         | random | https://www.google.com/ |
    #Done
    # Scenario Outline: Text format
    #     Given <text> text is added to the note
    #     Given text is selected
    #     When the user selects the <format> format
    #     Then text format is changed to <format>
    #     Examples:
    #         | text        | format      |
    #         | Food        | Bold        |
    #         | Hello there | Underline   |
    #         | format      | Superscript |
    #         | random      | Code        |

    #Done
    # Scenario: Shorcut list
    #     When the user selects the "Shortcut list" option from "Help" menu
    #     Then Shorcut list is displayed

    # In progress
    Scenario Outline: List creation
        Given <text1> text is added to the note
        Given <text2> text is added on the second row of the note
        Given <text3> text is added on the third row of the note
        Given added texts are selected
        When  the user clicks on the <list_type> button from editor menu
        Then  texts are listed by <list_type>
        Examples:
            | text1  | text2       | text3             | list_type     |
            | Food   | format      | random            | numbered_list |
            | random | Hello there | How you ever been | bullet_list   |

    # Scenario Outline: Text alignment
    #     Given <text> is added to the note
    #     Given <text> is selected
    #     When  the user selects <align> icon
    #     Then  text is align to the <position>
    #     Examples:
    #         | text        | align        | position |
    #         | Food        | align_right  | right    |
    #         | 12345678    | justify      | left     |
    #         | Test text   | align_center | center   |
    #         | Hello there | align_left   | left     |

