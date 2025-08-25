Feature: Login functionality

    @login @smoke
    Scenario Outline: Successful login
        Given I am on the login page
        When I enter credentials "<username>" and "<password>"
        And I click the login button
        Then I should see the homepage

        Examples:
            | username      | password     |
            | standard_user | secret_sauce |

    @login @negative
    Scenario Outline: Unsuccessful login
        Given I am on the login page
        When I enter credentials "<username>" and "<password>"
        And I click the login button
        Then I should see an error message

        Examples:
            | username     | password     |
            | invalid_user | invalid_pass |

    @login @ui
    Scenario: Username field should have focus by default
        Given I am on the login page
        When the page is loaded
        Then the username field should have focus

    @login @ui
    Scenario: Login button should be disabled on page load
        Given I am on the login page
        When the page is loaded
        Then the login button should be disabled

    @login @ui
    Scenario: All login elements should be present
        Given I am on the login page
        When the page is loaded
        Then all login elements should be visible
