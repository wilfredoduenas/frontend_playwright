Feature: Purchase functionality

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  @purchase @smoke
  Scenario: Complete purchase of all products
    When I add the following products to the cart:
      | product   |
      | backpack  |
      | bike      |
      | bolt      |
      | fleece    |
      | onesie    |
    And I proceed to checkout
    And I complete the purchase with:
      | firstName | lastName | postalCode |
      | Reyss     | Tester   | 12345      |
    Then the purchase should be successful
