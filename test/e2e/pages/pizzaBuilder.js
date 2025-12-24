/**
 * Pizza Builder Page Object
 *
 * Page Object Model (POM) pattern for organizing e2e tests
 * Encapsulates page structure and provides reusable methods
 *
 * @see http://nightwatchjs.org/guide#page-objects
 * @see https://martinfowler.com/bliki/PageObject.html
 */

module.exports = {
  url: 'http://localhost:8080',

  /**
   * Page elements
   */
  elements: {
    app: {
      selector: '#root'
    },
    wrapper: {
      selector: '.wrapper'
    },
    header: {
      selector: 'h1'
    },
    menu: {
      selector: '.menu'
    },
    toppings: {
      selector: '.menu .topic'
    },
    pizzasContainer: {
      selector: '.pizzas'
    },
    pizzas: {
      selector: '.pizzas dl'
    },
    pizzaToppings: {
      selector: '.pizzas .toppings'
    },
    menuHeading: {
      selector: '.menu h2'
    },
    pizzasHeading: {
      selector: '.pizzas h2'
    }
  },

  /**
   * Page commands (reusable actions)
   */
  commands: [{
    /**
     * Wait for application to be ready
     */
    waitForApp: function() {
      return this
        .waitForElementVisible('@app', 2000)
        .waitForElementVisible('@menu', 2000)
        .waitForElementVisible('@pizzasContainer', 2000)
    },

    /**
     * Get number of available toppings
     */
    getToppingCount: function(callback) {
      return this.api.elements('css selector', this.elements.toppings.selector, function(result) {
        if (callback) {
          callback.call(this, result.value.length)
        }
      })
    },

    /**
     * Get number of pizzas
     */
    getPizzaCount: function(callback) {
      return this.api.elements('css selector', this.elements.pizzas.selector, function(result) {
        if (callback) {
          callback.call(this, result.value.length)
        }
      })
    },

    /**
     * Add a new pizza
     */
    addPizza: function() {
      return this
        .waitForElementVisible('@addPizzaButton', 1000)
        .click('@addPizzaButton')
        .pause(500)
    },

    /**
     * Verify topping is visible by index
     */
    verifyToppingVisible: function(index) {
      const selector = this.elements.toppings.selector + ':nth-child(' + (index + 1) + ')'
      return this.api.assert.visible(selector)
    },

    /**
     * Get localStorage state
     */
    getLocalStorageState: function(callback) {
      return this.api.execute(
        function() {
          return localStorage.getItem('pizza-webpack')
        },
        [],
        function(result) {
          if (callback && result.value) {
            try {
              const state = JSON.parse(result.value)
              callback.call(this, state)
            } catch (e) {
              callback.call(this, null)
            }
          }
        }
      )
    },

    /**
     * Verify Redux DevTools presence
     */
    hasReduxDevTools: function(callback) {
      return this.api.execute(
        function() {
          return !!document.querySelector('.redux-devtools')
        },
        [],
        function(result) {
          if (callback) {
            callback.call(this, result.value)
          }
        }
      )
    }
  }]
}
