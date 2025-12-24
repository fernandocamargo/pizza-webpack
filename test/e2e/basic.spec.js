/**
 * Basic E2E Tests
 * Comprehensive tests to verify all core functionality in a single session
 */

module.exports = {
  /**
   * Setup - runs before tests
   */
  before: function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 2000)
      .pause(1000) // Give React time to mount and API to load
  },

  /**
   * Teardown - runs after all tests
   */
  after: function(browser) {
    browser.end()
  },

  /**
   * Comprehensive test: All core functionality
   */
  'Pizza builder application works correctly': function(browser) {
    // Test 1: Application renders correctly
    browser
      .assert.visible('#root', 'React root element should be visible')
      .assert.visible('.menu', 'Toppings menu should be visible')
      .assert.visible('.pizzas', 'Pizza container should be visible')

    // Test 2: Toppings are loaded from API
    browser
      .waitForElementVisible('.menu .topic', 3000, 'Waiting for toppings to load from API')
      .elements('css selector', '.menu .topic', function(result) {
        browser.assert.ok(
          result.value.length > 0,
          `Expected at least 1 topping, found ${result.value.length}`
        )
      })

    // Test 3: Pizza slots are rendered (appear after toppings load)
    browser
      .waitForElementVisible('.pizzas dl', 3000, 'Waiting for pizza slots to render')
      .elements('css selector', '.pizzas dl', function(result) {
        browser.assert.ok(
          result.value.length > 0,
          `Expected at least 1 pizza, found ${result.value.length}`
        )
      })

    // Test 4: Verify root element has wrapper class
    browser
      .assert.cssClassPresent('#root', 'wrapper', 'Root should have wrapper class for styling')

    // Test 5: Verify page structure is complete
    browser
      .assert.elementPresent('.menu h2', 'Menu should have a heading')
      .assert.elementPresent('.pizzas h2', 'Pizzas section should have a heading')
  }
}
