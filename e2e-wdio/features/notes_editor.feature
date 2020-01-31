@editor
Feature: Edits notes
    As a User
    I want to be able to edit notes

    Background:
        Given User navigates to Hashnotes page
        Then  User is redirected to Hashnotes page
        Given User selects a note from the side Bar

    Scenario Outline: Undo change
        When  User adds <text> into the text field
        When  User clicks the "Undo" button from <location>
        Then  <text> is removed
        Examples:
            | text              | location  |
            | Food              | edit_menu |
            | How you ever been | edit_bar  |

    Scenario Outline: Redo change
        When  User adds <text> into the text field
        When  User deletes <text>
        When  User clicks the "Redo" button from <location>
        Then  Delete action is reverted
        Examples:
            | text              | location  |
            | a                 | edit_menu |
            | How you ever been | edit_bar  |


    Scenario Outline: Copy and Paste text
        When User adds <text> to note
        When User selects <text>
        When User copies <text> using "Copy" button from edit_menu
        When User deletes <text>
        When User pastes the <text> in the note using "Paste" button from "Edit" menu
        Examples:
            | text      |
            | test      |
            | abcdedf   |
            | #@#^&$%*$ |

    Scenario Outline: Insert link
        Given User adds <text> to note
        When  User selects <text>
        When  User clicks on "Insert" menu
        When  User selects "Link" option
        Then  A "Insert/Edit Link" modal is open
        When  User enters <link> into the "URL" field
        Then  "Text to display" field is autocompleted with the selected text
        When  User clicks on the "Save" button
        Then  Link is inserted in the note text field
        Examples:
            | text   | link                    |
            | random | https://www.google.com/ |


    Scenario Outline: Text format
        Given User adds <text> to note
        When  User selects a <text>
        When  User clicks the Format menu
        When  User clicks <format> option
        Then  Text format is changed to <format>
        Examples:
            | text        | format      |
            | Food        | Bold        |
            | Hello there | Underline   |
            | format      | Superscript |
            | random      | Code        |


    Scenario: Shorcut list
        When  User clicks "Help" menu
        Then  "Shortcut list" option is displayed
        When  User selects the "Shortcut list" option
        Then  Shorcut list is displayed


    Scenario Outline: List creation
        Given User adds <text1>
        Given User adds <text2> on the second row
        Given User adds <text3> on the third row
        When  User selects <text1>, <text2>, <text3>
        Then  User clicks on the <list_type> button from editor menu
        Then  Texts are listed by number
        Examples:
            | text1 | text2  | text3 | list_type     |
            | first | second | third | numbered_list |
            | 1     | 2      | 3     | bullet_list   |

    Scenario Outline: Text alignment
        Given User adds <text>
        When  User selects <text>
        When  User select <align> icon
        Then  Text is align to the <position>
        Examples:
            | text        | align        | position |
            | Food        | align_right  | right    |
            | 12345678    | justify      | left     |
            | Test text   | align_center | center   |
            | Hello there | align_left   | left     |

