Feature: Add To Cart

  @addToCart
  Scenario Outline: User Successfully add to cart with items <items>
    Given User go to SauceDemo website and Login
    And User select <items> and verified it
    Examples:
      | items                      |
      | "Sauce Labs Backpack"      |
      | "Sauce Labs Fleece Jacket" |