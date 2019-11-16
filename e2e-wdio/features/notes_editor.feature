@editor
Feature: Edit notes

    As a User
    I want to edit notes

    Background:
    Given  User navigates to Hashnotes page
     Then  User is redirected to Hashnotes page
     Then  User select a note from the note side Bar

    Scenario: User add a note using the file menu
      When User clicks on File menu
      Then User clicks on new note option
      Then A new note is added

    Scenario: User delete a note using the file menu
      When  User clicks on File menu
       And  User clicks on Delete note option
      Then  Note is deleted

    Scenario Outline: User undo a change using the edit menu
      When  User adds <text> into the text field
      Then  User clicks Edit menu
       And  User clicks Undo option
      Then  Change made is undo
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario Outline: User redo a change using the edit menu
      When  User adds <text> into the text field
      Then  User clicks Edit menu
       And  User clicks Redo option
      Then  Change made is redo
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario Outline: User cut text using the edit menu
      When  User selects <text> on the text field
      Then  User clicks Edit menu
       And  User clicks Cut option
      Then  Selected <text> is cut
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario Outline: User copy text using the edit menu
      When  User selects <text> on the text field
      Then  User clicks Edit menu
       And  User clicks Copy option
      Then  Selected <text> is copied
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario Outline: User paste text using the edit menu
      When  User selects <text> on the text field
      Then  User clicks Edit menu
       And  User clicks Paste option
      Then  Selected <text> is pasted
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario: User select all the text using the edit menu
      When  User clicks Edit menu
       And  User clicks Select all option
      Then  All the text is selected

    Scenario Outline: User insert a Link
      When  User select a line with the mouse pointer
       And  User clicks Insert menu
       And  User clicks Link option
      Then  A Insert/Edit Link modal is open
      Then  User enter <link> into the URL field
      Then  Text to displayed field is autocomplete with the URL field value
      Then  User clicks on the Save button
      Then  Link is inserted in the note text field
      Examples:
            | link                    |
            | https://www.google.com/ |


    Scenario Outline: User give format to the text
      When  User selects a <text>
      Then  User clicks the Format menu
      Then  User clicks <format> option
      Examples:
            | text             |
            | Food             |
            | Hello there      |
            | format           |
            | Bold             |
            | Italic           |
            | Underline        |
            | Strikethrough    |
            | Superscript      |
            | Subscript        |
            | Code             |
            | Formats          |
            | Blocks           |
            | Fonts            |
            | Font sizes       |
            | Align            |
            | Text color       |
            | Background color |
            | Clear Formatting |

    Scenario: Shorcut List displayed
      When  User clicks help menu
      Then  User clicks shorcut list option
       And  Shorcut list is shown

    Scenario Outline: User undo a change using the undo icon
      When  User adds <text> into the text field
       And  User clicks the undo icon
      Then  Change made is undo
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario Outline: User redo a change using the redo icon
      When  User adds <text> into the text field
      Then  User clicks edit menu
       And  User clicks redo icon
      Then  Change made is redo
      Examples:
            | text              |
            | Food              |
            | Hello there       |
            | a                 |
            | How you ever been |

    Scenario Outline: User insert/edit a URL using the Insert/Edit link icon
      When  User select a line with the mouse pointer
       And  User clicks Insert/Edit link icon
      Then  A Insert/Edit Link modal is open
      Then  User enter <link> into the URL field
      Then  Text to displayed field is autocomplete with the URL field value
      Then  User clicks on the Save button
      Then  Link is inserted in the note text field
      Examples:
            | link                    |
            | https://www.google.com/ |

    Scenario Outline: User Bold a text using the Bold icon
      When  User selects <text>
      Then  User clicks on the Bold icon
      Then  Text is bolded
      Examples:
            | text        |
            | Food        |
            | Hello there |

    Scenario Outline: User Italic a text using the Italic icon
      When  User selects <text>
      Then  User clicks on the Italic icon
      Then  Text is italize
      Examples:
            | text        |
            | Food        |
            | Hello there |

    Scenario Outline: User create a Numbered list using the Numbered list icon
      When  User selects <text>
      Then  User clicks on the Numbered list icon
      Then  <text> is listed by number
      Examples:
            | text                 |
            | First, second, third |

    Scenario Outline: User create a Bullet list using the Bullet list icon
      When  User selects <text>
      Then  User clicks on the Bullet list icon
      Then  <text> is listed by bullets
      Examples:
            | text                 |
            | First, second, third |

    Scenario Outline: User align text to the left using the Align left icon
      When  User selects <text>
      Then  User clicks on the Align left icon
      Then  Text is align to the left
      Examples:
            | text        |
            | Food        |
            | Hello there |

    Scenario Outline: User align text to the center using the Align center icon
      When  User selects <text>
      Then  User clicks on the Align center icon
      Then  Text is centered
      Examples:
            | text        |
            | Food        |
            | Hello there |

    Scenario Outline: User align text to the right using the Align right icon
      When  User selects <text>
      Then  User clicks on the Align right icon
      Then  Text is align to the right
      Examples:
            | text        |
            | Food        |
            | Hello there |

    Scenario Outline: User justify text to the right using the Justify icon
      When  User selects <text>
      Then  User clicks on the Justify icon
      Then  Text is Justified
      Examples:
            | text        |
            | Food        |
            | Hello there |

    Scenario: User delete a note using the Delete note icon
      When  User clicks the trash icon
      Then  Note is deleted

    Scenario Outline: User write <text> in a note
      When  User select a line with the mouse pointer
       And  User types <text> into the text field
      Then  Text is automatically save
      Examples:
            | text        |
            | Food        |
            | Hello there |
