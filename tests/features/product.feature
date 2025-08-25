  Feature: Product functionality


  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  @product @smoke @all
  Scenario: Add all products to cart and verify badge
    When I add the following products to the cart:
      | product   |
      | backpack  |
      | bike      |
      | bolt      |
      | fleece    |
      | onesie    |
    Then the cart badge should show 5

  @product @smoke @single
  Scenario Outline: Add product to cart and verify badge
    When I add 1 <product> to the cart
    Then the cart badge should show 1

    Examples:
      | product   |
      | backpack  |
      | bike      |
      | bolt      |
      | fleece    |
      | onesie    |

  @product @ui
  Scenario: All product elements should be visible
    Then all product elements should be visible