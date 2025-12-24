# It's pizza time! 🍕

A React 15 + webpack 1 pizza builder from the 2016 era - a time capsule of cutting-edge web development practices from the "golden age" of the React/Redux ecosystem.

<img width="1437" height="743" alt="Screenshot 2025-12-24 at 19 23 59" src="https://github.com/user-attachments/assets/3185419a-c2ce-4d04-856a-fc044cb60083" />

## Table of Contents

- [Overview](#overview)
- [Technical Highlights](#technical-highlights)
  - [React DnD: Dan Abramov's Innovative Approach](#react-dnd-dan-abramovs-innovative-approach)
  - [Webpack 1: The Module Bundler Revolution](#webpack-1-the-module-bundler-revolution)
- [Technology Stack](#technology-stack)
- [Architecture & Patterns](#architecture--patterns)
  - [Flux/Redux Architecture](#fluxredux-architecture)
  - [Immutability Pattern](#immutability-pattern)
  - [Testing Strategy](#testing-strategy)
  - [Advanced Patterns & Utilities](#advanced-patterns--utilities)
- [What This Project Demonstrates](#what-this-project-demonstrates)
- [Reflections: 2016 vs 2025](#reflections-2016-vs-2025)
- [Technical Deep Dives](#technical-deep-dives)
- [Installation & Usage](#installation--usage)
- [Additional Learning Resources](#additional-learning-resources)

## Overview

This project showcases a **drag-and-drop pizza builder** where users can create custom pizzas by dragging toppings onto pizza slots. Built in **August-September 2016**, it demonstrates the architectural patterns, tooling complexity, and innovative libraries that defined modern web development at the peak of the pre-hooks React era.

### Historical Context

This codebase represents a pivotal moment in web development history:

- **ES6/ES2015** was barely one year old (finalized June 2015)
- **React 15.3** introduced incremental improvements before the major paradigm shift of Hooks (2019)
- **Webpack 1** dominated the bundling landscape (webpack 2 was still in beta)
- **Redux** was the undisputed state management solution
- The ecosystem required extensive configuration and tooling knowledge

## Technical Highlights

### React DnD: Dan Abramov's Innovative Approach

This project uses [**react-dnd**](https://github.com/react-dnd/react-dnd) by [Dan Abramov](https://github.com/gaearon) (co-author of Redux, Create React App, and React core team member), which revolutionized drag-and-drop in React applications.

**Why it was innovative:**
- **[Declarative API](https://en.wikipedia.org/wiki/Declarative_programming)** for drag-and-drop (vs. [imperative DOM manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction))
- **Backend-agnostic**: Supports [HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) and [touch events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- **[Higher-Order Components pattern](https://reactjs.org/docs/higher-order-components.html)** for composable behavior
- **[Immutable state transitions](https://en.wikipedia.org/wiki/Immutable_object)** aligned with React's philosophy
- **Built on [Flux principles](https://facebook.github.io/flux/docs/in-depth-overview)** with unidirectional data flow

**Implementation in this codebase:**
- [`src/js/client/components/topping.js`](src/js/client/components/topping.js) - Draggable topping component
- [`src/js/client/components/pizza.js`](src/js/client/components/pizza.js) - Droppable pizza slot component
- [`src/js/client/constants/drag.js`](src/js/client/constants/drag.js) - Drag source type constants

Example from [`topping.js:39-40`](src/js/client/components/topping.js#L39-L40):
```javascript
// Drag source decorator - makes topping draggable
export default DragSource(TOPPING_DRAG_SOURCE, source, collect)(Topping)
```

Example from [`pizza.js:71-72`](src/js/client/components/pizza.js#L71-L72):
```javascript
// Drop target decorator - makes pizza accept toppings
export default DropTarget([TOPPING_DRAG_SOURCE], target, collect)(Pizza)
```

**Further reading:**
- [React DnD Documentation](https://react-dnd.github.io/react-dnd/)
- [Dan Abramov's Blog](https://overreacted.io/)
- [React DnD: Declarative Drag and Drop](https://www.youtube.com/watch?v=XiHfYdwJgXQ) - Conference talk

### Webpack 1: The Module Bundler Revolution

[**Webpack**](https://webpack.js.org/) transformed how we build web applications by treating everything as a module using the [**dependency graph**](https://webpack.js.org/concepts/dependency-graph/) pattern.

**What made webpack groundbreaking:**
- **Universal module system**: [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), [CommonJS](https://en.wikipedia.org/wiki/CommonJS), [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) in one tool
- **[Code splitting](https://webpack.js.org/guides/code-splitting/)**: Dynamic imports for performance optimization
- **[Loader ecosystem](https://webpack.js.org/concepts/loaders/)**: Transform any file type (JS, CSS, images, fonts)
- **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)**: Update code without full page refresh
- **[Plugin architecture](https://webpack.js.org/concepts/plugins/)**: Extensible build pipeline

**This project's webpack configuration:**
- [`conf/webpack/`](conf/webpack/) - Modular webpack configuration
  - [`entries/`](conf/webpack/entries/) - Environment-specific entry points
  - [`loaders/`](conf/webpack/loaders/) - Asset transformation pipeline ([`scripts.js`](conf/webpack/loaders/scripts.js), [`styles.js`](conf/webpack/loaders/styles.js), [`fonts.js`](conf/webpack/loaders/fonts.js))
  - [`plugins/`](conf/webpack/plugins/) - Build optimization ([`common.js`](conf/webpack/plugins/common.js), [`production.js`](conf/webpack/plugins/production.js), [`development.js`](conf/webpack/plugins/development.js))
  - [`settings.js`](conf/webpack/settings.js) - Shared settings
  - [`helpers.js`](conf/webpack/helpers.js) - Utility functions
- [`webpack.config.js`](webpack.config.js) - Main configuration entry point
- [`src/js/server/`](src/js/server/) - Build scripts
  - [`webpack-hot-reload.js`](src/js/server/webpack-hot-reload.js) - Development server with HMR
  - [`build.js`](src/js/server/build.js) - Production build script

**Example loader configuration** from [`loaders/scripts.js`](conf/webpack/loaders/scripts.js):
```javascript
// Babel loader: ES6+ → ES5 transpilation
{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'stage-0', 'react']
  }
}
```

**Evolution context:**
- **Webpack 1.x** (this project): Manual configuration, `preLoaders`/`loaders` syntax
- **Webpack 2** (2016): [Tree shaking](https://webpack.js.org/guides/tree-shaking/), native ES6 modules
- **Webpack 4** (2018): Zero-config mode, performance improvements
- **Webpack 5** (2020): [Module federation](https://webpack.js.org/concepts/module-federation/), persistent caching

**Further reading:**
- [Webpack: The Confusing Parts](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)
- [Webpack Concepts](https://webpack.js.org/concepts/)
- [What is Webpack?](https://survivejs.com/webpack/what-is-webpack/) - SurviveJS guide

## Technology Stack

### Core Framework & State Management

| Technology | Version | Purpose | Innovation |
|------------|---------|---------|------------|
| [**React**](https://react.dev/) | 15.3.0 | UI library | Virtual DOM, component-based architecture |
| [**Redux**](https://redux.js.org/) | 3.5.2 | Predictable state container | Time-travel debugging, single source of truth |
| [**React-Redux**](https://react-redux.js.org/) | 4.4.5 | React bindings for Redux | Efficient re-rendering with shallow equality |
| [**Immutable.js**](https://immutable-js.com/) | 3.8.1 | Persistent data structures | Structural sharing, efficient change detection |
| [**redux-thunk**](https://github.com/reduxjs/redux-thunk) | 2.1.0 | Async actions | Middleware for side effects |

**Key concepts:**
- [**Flux Architecture**](https://facebook.github.io/flux/) - [Unidirectional data flow](https://redux.js.org/basics/data-flow) pattern
- [**Container/Presentational Components**](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) - [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) pattern by Dan Abramov
- [**Higher-Order Components (HOCs)**](https://reactjs.org/docs/higher-order-components.html) - Component composition pattern (pre-Hooks)
- [**Pure Functions**](https://en.wikipedia.org/wiki/Pure_function) - Predictable, testable reducers
- [**Middleware**](https://redux.js.org/understanding/history-and-design/middleware) - Extensible action processing pipeline
- [**Action Creators**](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#action-creators) - Encapsulate action creation logic

**Implementation files:**
- [`src/js/client/containers/app.js`](src/js/client/containers/app.js) - Smart container component
- [`src/js/client/components/app.js`](src/js/client/components/app.js) - Presentational component
- [`src/js/client/components/menu.js`](src/js/client/components/menu.js) - Menu UI component
- [`src/js/client/components/topping.js`](src/js/client/components/topping.js) - Individual topping component

### Build Pipeline & Tooling

| Tool | Version | Purpose | Historical Note |
|------|---------|---------|-----------------|
| [**Webpack**](https://webpack.js.org/) | 1.13.1 | Module bundler | Industry standard, pre-Parcel/Rollup era |
| [**Babel**](https://babeljs.io/) | 6.x | JavaScript transpiler | Made ES6+ usable in production |
| [**BrowserSync**](https://browsersync.io/) | 2.14.0 | Live reloading | Multi-device testing synchronization |
| [**ESLint**](https://eslint.org/) | 3.3.1 | Code linting | Airbnb style guide era |

**Babel Presets (2016 era):**
- `babel-preset-es2015` - ES6 features (let/const, arrows, classes)
- `babel-preset-stage-0` - Experimental features (decorators, async/await)
- `babel-preset-react` - JSX transformation
- [Babel 6 Blog Post](https://babeljs.io/blog/2015/10/29/6.0.0)

### Development Experience

**Hot Module Replacement (HMR):**
The project implements sophisticated [**HMR**](https://webpack.js.org/concepts/hot-module-replacement/) setup combining multiple tools:

- [**webpack-hot-middleware**](https://github.com/webpack-contrib/webpack-hot-middleware) - Webpack HMR server
- [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) - React component hot reloading (by Dan Abramov)
- [**redux-hot-loader**](https://github.com/reduxjs/redux-devtools) - Preserve state across reloads
- [**BrowserSync**](https://browsersync.io/) - Multi-device synchronization

**HMR implementation:**
- [`src/js/server/webpack-hot-reload.js`](src/js/server/webpack-hot-reload.js) - Development server with HMR and BrowserSync
- [`conf/webpack/plugins/development.js`](conf/webpack/plugins/development.js) - HMR plugins ([`HotModuleReplacementPlugin`](https://webpack.js.org/plugins/hot-module-replacement-plugin/), [`NoErrorsPlugin`](https://webpack.js.org/plugins/no-emit-on-errors-plugin/))
- [`.babelrc`](.babelrc) - Babel transforms for HMR
- [`src/js/client/index.js`](src/js/client/index.js) - HMR acceptance for reducers

**Redux DevTools:**
Integrated [**Redux DevTools**](https://github.com/reduxjs/redux-devtools) with complete debugging suite:

- [**Time-travel debugging**](https://redux.js.org/usage/devtools#time-travel-debugging) - Rewind and replay actions
- **Action replay** - Re-dispatch previous actions
- **State diff visualization** - See what changed
- [**redux-logger**](https://github.com/LogRocket/redux-logger) - Console logging middleware
- [**DockMonitor**](https://github.com/reduxjs/redux-devtools-dock-monitor) - Dockable monitor UI
- [**LogMonitor**](https://github.com/reduxjs/redux-devtools-log-monitor) - Action log display

**DevTools implementation:**
- [`src/js/client/store/development.js`](src/js/client/store/development.js) - DevTools integration
- [`src/js/client/containers/dev-tools.js`](src/js/client/containers/dev-tools.js) - DevTools UI container
- [`src/js/client/containers/root.development.js`](src/js/client/containers/root.development.js) - Root with DevTools

**Further reading:**
- [Hot Reloading in React](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf) - Dan Abramov (2014)
- [Redux DevTools Walkthrough](https://www.youtube.com/watch?v=xsSnOQynTHs) - Video tutorial
- [The Power of Hot Reloading](https://www.youtube.com/watch?v=xsSnOQynTHs) - Dan Abramov talk

### Polyfills & Browser Compatibility

2016 required extensive polyfilling:

| Polyfill | Why Needed in 2016 |
|----------|-------------------|
| `es6-promise` | Promises not universally supported |
| `isomorphic-fetch` | Fetch API still experimental |
| Babel transforms | IE11, older browsers lacked ES6 |

**Browser landscape 2016:**
- IE11 still widely used
- Safari 9.x
- Chrome 52
- Firefox 48

## Architecture & Patterns

### Flux/Redux Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Actions   │────▶│   Reducers   │────▶│    Store    │
└─────────────┘     └──────────────┘     └─────────────┘
       ▲                                         │
       │                                         ▼
       │                                  ┌─────────────┐
       └──────────────────────────────────│ Components  │
                                         └─────────────┘
```

**Unidirectional data flow:**
1. User interaction triggers [action creators](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions)
2. Actions dispatched to [reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers)
3. Reducers return new state (immutably)
4. [Store](https://redux.js.org/api/store) notifies connected components via [subscriptions](https://redux.js.org/api/store#subscribelistener)
5. Components re-render with new [props](https://react.dev/learn/passing-props-to-a-component)

**Key files in this project:**

**Actions** (dispatching changes):
- [`src/js/client/actions/toppings.js`](src/js/client/actions/toppings.js) - Topping-related actions ([thunks](https://github.com/reduxjs/redux-thunk) for async API calls)
- [`src/js/client/actions/pizzas.js`](src/js/client/actions/pizzas.js) - Pizza creation and topping management actions
- [`src/js/client/constants/actions.js`](src/js/client/constants/actions.js) - Action type constants ([FSA](https://github.com/redux-utilities/flux-standard-action) pattern)

**Reducers** (pure state transformations):
- [`src/js/client/reducers/toppings.js`](src/js/client/reducers/toppings.js) - Manages available toppings state
- [`src/js/client/reducers/pizzas.js`](src/js/client/reducers/pizzas.js) - Manages user's pizza configurations
- [`src/js/client/reducers/index.js`](src/js/client/reducers/index.js) - [Root reducer](https://redux.js.org/api/combinereducers) combining all reducers

**Store** (single source of truth):
- [`src/js/client/store/configure.js`](src/js/client/store/configure.js) - Environment-aware store factory
- [`src/js/client/store/development.js`](src/js/client/store/development.js) - Dev store with [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [`src/js/client/store/production.js`](src/js/client/store/production.js) - Production store (optimized)
- [`src/js/client/store/test.js`](src/js/client/store/test.js) - Test store configuration

**Data Layer** (API integration):
- [`src/js/data/toppings.js`](src/js/data/toppings.js) - API calls using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [`src/json/toppings.json`](src/json/toppings.json) - Mock API data

### Immutability Pattern

All state is managed with [**Immutable.js**](https://immutable-js.com/) [persistent data structures](https://en.wikipedia.org/wiki/Persistent_data_structure):

```javascript
// From src/js/client/reducers/toppings.js
import { fromJS, List } from 'immutable'

const initialState = fromJS({
  items: [],
  loading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPPINGS:
      return state.set('items', List(action.toppings))
    default:
      return state
  }
}
```

**Immutable.js operations used:**
- [`fromJS()`](https://immutable-js.com/docs/v3.8.1/fromJS/) - Convert plain JS to Immutable structures
- [`Map`](https://immutable-js.com/docs/v3.8.1/Map/) - Immutable key-value pairs
- [`List`](https://immutable-js.com/docs/v3.8.1/List/) - Immutable arrays
- [`.set()`](https://immutable-js.com/docs/v3.8.1/Map/#set) - Update value (returns new Map)
- [`.get()`](https://immutable-js.com/docs/v3.8.1/Map/#get) - Read value
- [`.mergeIn()`](https://immutable-js.com/docs/v3.8.1/Map/#mergeIn) - Deep merge

**Benefits:**
- Prevents [accidental mutations](https://alistapart.com/article/why-mutation-can-be-scary/)
- Enables efficient [`shouldComponentUpdate`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) optimizations via [shallow equality](https://redux.js.org/faq/immutable-data#why-is-immutability-required)
- [Time-travel debugging](https://redux.js.org/usage/implementing-undo-history) possible
- Predictable state updates
- [Structural sharing](https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2) for memory efficiency

**Implementation files:**
- [`src/js/client/reducers/toppings.js`](src/js/client/reducers/toppings.js) - Immutable topping state
- [`src/js/client/reducers/pizzas.js`](src/js/client/reducers/pizzas.js) - Immutable pizza state with nested updates
- [`src/js/client/utils/local-storage.js`](src/js/client/utils/local-storage.js) - Serialize/deserialize Immutable data

**Further reading:**
- [Immutability in React and Redux](https://daveceddia.com/react-redux-immutability-guide/)
- [The Dao of Immutability](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd)
- [Immutable.js: An Introduction](https://www.sitepoint.com/immutability-javascript/)

### Project Structure

```
src/
├── js/
│   ├── client/              # Frontend application
│   │   ├── actions/         # Redux action creators (thunks)
│   │   ├── components/      # Presentational components
│   │   ├── constants/       # Action types, drag sources
│   │   ├── containers/      # Connected (smart) components
│   │   ├── reducers/        # Pure state transformations
│   │   ├── store/           # Store config (dev/prod/test)
│   │   └── utils/           # Helpers (colors, localStorage)
│   ├── data/                # API layer / data fetching
│   └── server/              # Build scripts (HMR, production)
├── scss/                    # Sass stylesheets
├── markup/                  # HTML templates
└── json/                    # Mock API data

conf/webpack/                # Modular webpack configuration
├── entries/                 # Entry points per environment
├── loaders/                 # Asset transformation pipeline
├── plugins/                 # Build plugins per environment
└── helpers/                 # Config utilities
```

**Design principles:**
- **[Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)**: Data, logic, and presentation layers
- **[Environment awareness](https://12factor.net/config)**: Different configs for dev/prod/test
- **Modular configuration**: Webpack config split across multiple files
- **[Colocation](https://kentcdodds.com/blog/colocation)**: Tests mirror source structure
- **[DRY (Don't Repeat Yourself)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)**: Shared utilities and helpers

### Testing Strategy

This project uses a comprehensive testing stack covering **unit**, **integration**, and **end-to-end** tests:

#### Unit & Integration Testing

**Test Framework:**
- [**Mocha**](https://mochajs.org/) - Test runner with [BDD-style](https://en.wikipedia.org/wiki/Behavior-driven_development) syntax (`describe`, `it`)
- [**Chai**](https://www.chaijs.com/) - [Assertion library](https://www.chaijs.com/api/assert/) with expect/should/assert APIs
- [**Enzyme**](https://enzymejs.github.io/enzyme/) - React component testing utilities (by Airbnb)
- [**Sinon**](https://sinonjs.org/) - [Test doubles](https://martinfowler.com/bliki/TestDouble.html) (spies, stubs, mocks)
- [**Nock**](https://github.com/nock/nock) - HTTP mocking for API tests
- [**mocha-webpack**](https://github.com/zinserjan/mocha-webpack) - Run tests in webpack context

**Test files:**
- [`test/unit/client/reducers/toppings.js`](test/unit/client/reducers/toppings.js) - Reducer unit tests
- [`test/setup.js`](test/setup.js) - Test environment setup (JSDOM, Enzyme adapter)
- [`.mocharc.json`](.mocharc.json) - Mocha configuration

**Running unit tests:**
```bash
npm test                    # Run unit test suite
npm run test:watch         # Watch mode for TDD
```

#### End-to-End Testing

**E2E Framework (2016 era):**
- [**Nightwatch.js**](http://nightwatchjs.org/) v0.9 - E2E testing framework built on [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/)
- [**Selenium Server**](https://www.selenium.dev/) - Browser automation server
- [**ChromeDriver**](https://chromedriver.chromium.org/) - Chrome browser driver
- [**GeckoDriver**](https://github.com/mozilla/geckodriver) - Firefox browser driver

**Why Nightwatch in 2016?**
- Built on proven [Selenium WebDriver](https://www.selenium.dev/) technology
- Clean, readable [fluent API](http://nightwatchjs.org/api) for writing tests
- Built-in test runner and [assertion library](http://nightwatchjs.org/api#assertions)
- [Page Object Model](https://martinfowler.com/bliki/PageObject.html) support
- Automatic screenshot capture on failures
- Parallel test execution support

**E2E test files:**
- [`test/e2e/pizza-builder.spec.js`](test/e2e/pizza-builder.spec.js) - Main e2e test suite
- [`test/e2e/pizza-builder-pom.spec.js`](test/e2e/pizza-builder-pom.spec.js) - Tests using [Page Object Model](https://martinfowler.com/bliki/PageObject.html)
- [`test/e2e/pages/pizzaBuilder.js`](test/e2e/pages/pizzaBuilder.js) - Page Object for pizza builder
- [`test/e2e/globals.js`](test/e2e/globals.js) - Global hooks (start/stop dev server)
- [`nightwatch.json`](nightwatch.json) - Nightwatch configuration

**What the E2E tests cover:**
- ✅ Application loads and renders correctly
- ✅ Toppings menu loads from API
- ✅ Pizza slots are displayed
- ✅ Can create new pizzas
- ✅ Drag-and-drop functionality structure
- ✅ LocalStorage state persistence
- ✅ Redux DevTools integration
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ No console errors on load

**Running e2e tests:**

**Using Docker (Recommended - No local setup required!):**
```bash
# Build the e2e testing image (includes Java, Chrome, Selenium)
docker-compose --profile test build e2e

# Run e2e tests in Docker container
docker-compose --profile test run --rm e2e

# Alternative: Run with custom command
docker-compose --profile test run --rm e2e yarn test:e2e:docker
```

**Using Local Node:**
```bash
npm run test:e2e           # Run all e2e tests (Chrome)
npm run test:e2e:chrome    # Run in Chrome
npm run test:e2e:firefox   # Run in Firefox
npm run test:e2e:docker    # Run in headless mode (for Docker/CI)
```

**Prerequisites for local e2e tests:**
- Java Runtime Environment (JRE) for Selenium Server
- Chrome or Firefox browser installed

**Docker includes everything automatically:**
- ✅ Node.js 8
- ✅ Java Runtime (OpenJDK)
- ✅ Google Chrome (stable)
- ✅ ChromeDriver
- ✅ Selenium Server
- ✅ All npm dependencies

**E2E test output:**
- **Reports**: `test/e2e/reports/` - XML test reports
- **Screenshots**: `test/e2e/screenshots/` - Failure screenshots
- **Logs**: `selenium-debug.log` - Selenium server logs

**Page Object Model Pattern:**

The tests demonstrate the [Page Object Model](https://martinfowler.com/bliki/PageObject.html) pattern, a best practice from 2016 for organizing e2e tests:

```javascript
// Page Object: test/e2e/pages/pizzaBuilder.js
module.exports = {
  elements: {
    menu: { selector: '.menu' },
    pizzas: { selector: '.pizza' }
  },
  commands: [{
    waitForApp: function() {
      return this.waitForElementVisible('@menu', 2000)
    }
  }]
}

// Usage in tests: test/e2e/pizza-builder-pom.spec.js
const pizzaBuilder = browser.page.pizzaBuilder()
pizzaBuilder.navigate().waitForApp()
```

**Benefits of POM:**
- **Maintainability** - Change selectors in one place
- **Reusability** - Share page methods across tests
- **Readability** - Tests read like user actions
- **DRY principle** - Reduce code duplication

**Historical Context:**

In 2016, e2e testing options included:
- [Selenium WebDriver](https://www.selenium.dev/) (2004) - Industry standard
- [Protractor](https://www.protractortest.org/) (2013) - Angular-specific
- [Nightwatch.js](http://nightwatchjs.org/) (2014) - Cleaner Selenium API
- [CasperJS](http://casperjs.org/) / [PhantomJS](http://phantomjs.org/) - Headless testing
- [TestCafe](https://testcafe.io/) (2016) - No WebDriver needed

Modern alternatives (2020+):
- [Playwright](https://playwright.dev/) (2020) - Microsoft's modern e2e framework
- [Cypress](https://www.cypress.io/) (2017) - Developer-friendly e2e testing
- [Puppeteer](https://pptr.dev/) (2017) - Chrome DevTools Protocol

**Further reading:**
- [Nightwatch.js Guide](http://nightwatchjs.org/guide) - Official documentation
- [Page Object Pattern](https://martinfowler.com/bliki/PageObject.html) - Martin Fowler
- [Testing Redux](https://redux.js.org/usage/writing-tests) - Official guide
- [Enzyme Documentation](https://enzymejs.github.io/enzyme/docs/api/)
- [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/) - Core technology

### Advanced Patterns & Utilities

**LocalStorage Persistence:**
- [`src/js/client/utils/local-storage.js`](src/js/client/utils/local-storage.js) - [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) wrapper
- Automatic state persistence via [store subscription](https://redux.js.org/api/store#subscribelistener)
- Immutable.js serialization/deserialization
- Error handling for storage limits and privacy modes

**Color Generation:**
- [`src/js/client/utils/colors.js`](src/js/client/utils/colors.js) - Deterministic color generation from IDs
- [HSL color space](https://en.wikipedia.org/wiki/HSL_and_HSV) manipulation
- Sine wave algorithm for unique colors

**PropTypes Validation:**
All components use [**PropTypes**](https://reactjs.org/docs/typechecking-with-proptypes.html) for runtime type checking:
```javascript
// From src/js/client/components/topping.js
static propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}
```

**Utility Libraries:**
- [**lodash**](https://lodash.com/) - Functional utilities ([`isEqual`](https://lodash.com/docs/#isEqual), [`toArray`](https://lodash.com/docs/#toArray), [`head`](https://lodash.com/docs/#head), [`gte`](https://lodash.com/docs/#gte))
- [**classnames**](https://github.com/JedWatson/classnames) - Conditional CSS class composition

**Code Quality:**
- [`.eslintrc`](.eslintrc) - ESLint configuration with [React rules](https://github.com/jsx-eslint/eslint-plugin-react)
- [`.editorconfig`](.editorconfig) - Consistent code formatting across editors
- [`package.json`](package.json) - npm scripts and dependencies

## What This Project Demonstrates

### Technical Competencies

✅ **Complex state management** - Redux + Immutable.js architecture
✅ **Advanced UX** - Drag-and-drop with touch/mouse support
✅ **Build tooling mastery** - Webpack 1 configuration expertise
✅ **Modern JavaScript** - ES6+, decorators, async/await
✅ **Performance optimization** - HMR, code splitting, compression
✅ **Cross-browser compatibility** - Polyfills, transpilation
✅ **Developer experience** - Redux DevTools, live reloading, linting

### Historical Perspective

This codebase is valuable for understanding:

1. **Pre-Hooks React patterns** - HOCs, container pattern, class components
2. **Redux's dominance** - Before Context API + Hooks alternatives
3. **Webpack 1 complexity** - Manual configuration before conventions
4. **Babel's critical role** - Making ES6+ viable in production
5. **Tooling evolution** - How far we've come (and what we've lost)

### Modern Equivalents (2025)

| 2016 Pattern | 2025 Equivalent |
|--------------|-----------------|
| Class components | Function components + Hooks |
| Redux + redux-thunk | Context API / Zustand / React Query |
| Webpack 1 | Vite / Turbopack / webpack 5 |
| Babel presets | Native ES modules in browsers |
| HOCs (Higher-Order Components) | Custom Hooks |
| PropTypes | TypeScript |
| react-dnd decorators | react-dnd hooks API |

## Prerequisites

- [**Docker**](https://docs.docker.com/get-docker/) and [**Docker Compose**](https://docs.docker.com/compose/) (recommended)
- OR [**Node.js 8.x**](https://nodejs.org/) and npm/yarn (if running locally)

## Installation & Usage

### Using Docker (Recommended)

[Docker](https://www.docker.com/) ensures you can run the project without worrying about [Node version compatibility](https://nodejs.org/en/about/releases/).

**Configuration files:**
- [`Dockerfile`](Dockerfile) - [Node 8 Alpine](https://hub.docker.com/_/node) image for development
- [`Dockerfile.e2e`](Dockerfile.e2e) - Node 8 + Java + Chrome + Selenium for e2e testing
- [`docker-compose.yml`](docker-compose.yml) - Multi-service orchestration:
  - `app` service - Development server (runs by default)
  - `e2e` service - E2E testing environment (runs with `--profile test`)
- [`.dockerignore`](.dockerignore) - Excludes `node_modules` from build context

**Start the development server:**
```bash
docker-compose up
```

The app will be available at **http://localhost:8080** with [hot-reload](#development-experience) enabled.

**Stop the server:**
```bash
docker-compose down
```

**Rebuild after dependency changes:**
```bash
docker-compose up --build
```

**Run other commands:**
```bash
# Production build
docker-compose run --rm app yarn build

# Linting
docker-compose run --rm app yarn lint

# Unit tests
docker-compose run --rm app yarn test

# E2E tests (uses separate e2e service with Chrome/Selenium)
docker-compose --profile test build e2e
docker-compose --profile test run --rm e2e
```

### Using Local Node (Alternative)

If you have [Node 8.x](https://nodejs.org/dist/latest-v8.x/) installed locally:

**Installation:**
```bash
npm install
# or
yarn install
```

**Development:**
```bash
npm start          # Start dev server with HMR
npm run dev        # Alias for npm start
```

Development server runs at **http://localhost:8080**

**Production build:**
```bash
npm run build      # Build optimized bundle
```

Output: `build/` directory with minified assets

**Code quality:**
```bash
npm run lint       # Run ESLint
npm test           # Run test suite
npm run test:watch # Run tests in watch mode
```

**Available npm scripts** (from [`package.json`](package.json)):
- `start` / `dev` - Development server ([`webpack-hot-reload.js`](src/js/server/webpack-hot-reload.js))
- `build` - Production build ([`build.js`](src/js/server/build.js))
- `lint` - ESLint with React plugin
- `test` - Mocha test runner
- `test:watch` - Tests in watch mode

### Build Output

**Development mode:**
- Source maps: `eval` for fast rebuilds
- No minification
- [HMR enabled](https://webpack.js.org/concepts/hot-module-replacement/)
- Redux DevTools active

**Production mode:**
- Minified with [UglifyJS](https://github.com/mishoo/UglifyJS)
- Gzipped assets via [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)
- [CSS extracted](https://github.com/webpack-contrib/extract-text-webpack-plugin) to separate file
- Source maps: `cheap-module-source-map`
- [Dead code elimination](https://webpack.js.org/guides/tree-shaking/)

**Build configuration:**
- Production: [`conf/webpack/plugins/production.js`](conf/webpack/plugins/production.js)
- Development: [`conf/webpack/plugins/development.js`](conf/webpack/plugins/development.js)

## Demo
http://fernandocamargo.com/pizza/

## Additional Learning Resources

### Contemporary Articles (2016 Era)

**React & Redux:**
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) - Dan Abramov (2016)
- [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) - Free video course by Dan Abramov
- [Full-Stack Redux Tutorial](https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html) - Comprehensive guide (2015)
- [Redux Best Practices](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e) - (2016)

**Webpack & Build Tools:**
- [Webpack — The Confusing Parts](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9) - Essential webpack 1 guide
- [Beginner's guide to Webpack](https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460) - (2015)
- [Hot Reloading in React](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf) - Dan Abramov on HMR (2014)

**ES6 & Modern JavaScript:**
- [ES6 In Depth](https://hacks.mozilla.org/category/es6-in-depth/) - Mozilla Hacks series (2015)
- [Understanding ES6](https://leanpub.com/understandinges6/read) - Free book by Nicholas C. Zakas

### Key Figures in the Ecosystem

- **[Dan Abramov](https://github.com/gaearon)** - Creator of Redux, React DnD, Create React App; React core team
- **[Andrew Clark](https://github.com/acdlite)** - Redux contributor, React core team, creator of Recompose
- **[Tobias Koppers](https://github.com/sokra)** - Creator of webpack
- **[Sebastian McKenzie](https://github.com/kittens)** - Creator of Babel (formerly 6to5)

### Ecosystem Evolution Timeline

| Year | Major Developments |
|------|-------------------|
| **2015** | • React 0.14 splits React/ReactDOM<br>• Redux 1.0 released<br>• Babel 6 released<br>• ES6/ES2015 finalized |
| **2016** | • **This project built** 🍕<br>• React 15 released<br>• Webpack 2 beta<br>• Create React App launched<br>• Yarn package manager released |
| **2017** | • React 16 (Fiber architecture)<br>• Webpack 3 & 4<br>• Prettier released |
| **2018** | • React 16.8: **Hooks introduced** 🎣<br>• Parcel bundler<br>• Webpack 4 stable |
| **2019** | • React Context API adoption<br>• Redux Toolkit (official recommended approach)<br>• Snowpack early versions |
| **2020+** | • Vite, esbuild gain traction<br>• React 18: Concurrent features<br>• Next.js, Remix frameworks dominate |

## Reflections: 2016 vs 2025

### What We Gained

✅ **Simpler APIs** - Hooks are more intuitive than HOCs and lifecycle methods
✅ **Better performance** - Modern bundlers (Vite) are 10-100x faster
✅ **Type safety** - TypeScript has become the standard
✅ **Less configuration** - Tools have sensible defaults
✅ **Better DX** - Instant feedback, better error messages

### What We Lost

⚠️ **Explicitness** - Webpack config taught build fundamentals
⚠️ **Predictability** - Class component lifecycle was explicit
⚠️ **Debugging** - Redux DevTools time-travel debugging was unmatched
⚠️ **Separation** - Container/Presentational pattern enforced clean architecture
⚠️ **Stability** - 2016 tools were mature; constant churn now

### The Value of Historical Code

This project demonstrates:

1. **Foundation knowledge** - Understanding the problems modern tools solve
2. **Architectural thinking** - Patterns transcend specific technologies
3. **Context awareness** - Constraints shape solutions
4. **Tooling literacy** - How to evaluate and adopt new tools
5. **Evolution mindset** - Technology changes, principles endure

**"Those who cannot remember the past are condemned to repeat it."** - George Santayana

Understanding webpack 1 helps you appreciate Vite. Knowing class components helps you leverage Hooks. Learning Redux teaches you state management fundamentals that apply everywhere.

## Technical Deep Dives

### Why Immutable.js?

In 2016, JavaScript lacked native [immutable data structures](https://en.wikipedia.org/wiki/Immutable_object). [Immutable.js](https://immutable-js.com/) provided [persistent data structures](https://en.wikipedia.org/wiki/Persistent_data_structure) with [structural sharing](https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2):

```javascript
// From src/js/client/reducers/pizzas.js
import { Map } from 'immutable'

// Efficient updates without mutation
const state1 = Map({ count: 0 })
const state2 = state1.set('count', 1)

state1 === state2  // false (different references)
state1.get('count')  // 0 (original unchanged)
state2.get('count')  // 1 (new version)
```

**Benefits in 2016:**
- [Reference equality checks](https://redux.js.org/faq/immutable-data#how-do-i-use-immutable-data-structures-with-redux) for `shouldComponentUpdate`
- Prevented [mutation bugs](https://alistapart.com/article/why-mutation-can-be-scary/)
- Enabled [time-travel debugging](https://redux.js.org/usage/implementing-undo-history)

**Modern alternative (2025):**
```javascript
// Immer library or native spread operators
import produce from 'immer'

const state1 = { count: 0 }
const state2 = produce(state1, draft => { draft.count = 1 })
```

**See implementation:** [`src/js/client/reducers/pizzas.js`](src/js/client/reducers/pizzas.js)

### Why Redux Thunk?

Before [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) was standardized (ES2017), [thunks](https://github.com/reduxjs/redux-thunk) provided elegant async actions using [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):

```javascript
// From src/js/client/actions/toppings.js
export const fetchToppings = (dispatch) => {
  dispatch(setLoadingStatus(true))
  return Data.getToppings()
    .then(toJSON)
    .then(formatToppings)
    .then(dispatchFetchResponse.bind(dispatch))
    .then(dispatchLoadingStatus.bind(dispatch))
}
```

**Why thunks in 2016:**
- [Side effects](https://redux.js.org/understanding/thinking-in-redux/motivation#why-do-i-need-this) outside reducers
- [Delayed dispatch](https://github.com/reduxjs/redux-thunk#motivation) for async operations
- [Function composition](https://en.wikipedia.org/wiki/Function_composition_(computer_science)) with promises

**Modern alternative (2025):**
```javascript
// React Query / SWR handle caching, loading, error states
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery('toppings', fetchToppings)
```

**See implementation:** [`src/js/client/actions/toppings.js`](src/js/client/actions/toppings.js)

### Why HOCs (Higher-Order Components)?

[HOCs](https://reactjs.org/docs/higher-order-components.html) enabled [component composition](https://en.wikipedia.org/wiki/Object_composition) and [cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern) before [Hooks](https://reactjs.org/docs/hooks-intro.html):

```javascript
// From src/js/client/components/topping.js
export default DragSource(TOPPING_DRAG_SOURCE, source, collect)(Topping)
```

**HOC pattern:**
- Takes a component and returns a new component
- [Decorator pattern](https://en.wikipedia.org/wiki/Decorator_pattern) for React
- Enables [mixins](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) replacement
- Used by react-dnd, react-redux ([`connect`](https://react-redux.js.org/api/connect))

**Modern alternative (react-dnd hooks):**
```javascript
// react-dnd v14+ (2021)
import { useDrag } from 'react-dnd'

function Topping() {
  const [{ isDragging }, drag] = useDrag({
    type: TOPPING_DRAG_SOURCE,
    item: { type: TOPPING_DRAG_SOURCE }
  })
  return <div ref={drag}>...</div>
}
```

**See implementation:**
- [`src/js/client/components/topping.js`](src/js/client/components/topping.js) - DragSource HOC
- [`src/js/client/components/pizza.js`](src/js/client/components/pizza.js) - DropTarget HOC
- [`src/js/client/containers/app.js`](src/js/client/containers/app.js) - Redux `connect` HOC

### Why Babel Stage-0?

The [`.babelrc`](.babelrc) uses `stage-0` preset for experimental features:

```json
{
  "presets": ["es2015", "stage-0", "react"],
  "plugins": ["transform-decorators-legacy"]
}
```

**Stage-0 features used:**
- [**Decorators**](https://github.com/tc39/proposal-decorators) - `@DragSource` syntax (still not standard!)
- [**Class properties**](https://github.com/tc39/proposal-class-fields) - `static propTypes = {}`
- [**Object rest/spread**](https://github.com/tc39/proposal-object-rest-spread) - `{...obj}` (now ES2018)
- [**Async/await**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - `async function` (now ES2017)

**TC39 Process:**
- [Stage 0](https://tc39.es/process-document/) - Strawperson (idea phase)
- Stage 1 - Proposal
- Stage 2 - Draft
- Stage 3 - Candidate
- Stage 4 - Finished (added to spec)

**Modern approach:**
Use only [stable features](https://babeljs.io/docs/presets) or [Stage 3+](https://babeljs.io/docs/babel-preset-stage-3) proposals

## Contributing & Feedback

This is a historical artifact preserving 2016 best practices. While contributions are welcome, the goal is to maintain period authenticity rather than modernize.

**Interesting modernization exercises:**
- Port to React Hooks
- Replace Webpack 1 with Vite
- Add TypeScript
- Replace Immutable.js with Immer
- Convert to Next.js

## License

Original project by Fernando Camargo. This documentation enhanced for educational purposes.

## Acknowledgments

**Special thanks to the pioneers:**
- **Dan Abramov** for Redux, React DnD, and incredible teaching
- **The React team** for revolutionizing UI development
- **Tobias Koppers** for webpack and module bundling innovation
- **The open-source community** that built this incredible ecosystem

**This project stands on the shoulders of giants.** 🚀

---

*Built with ❤️ in the 2016 era. Documented with 🔍 in 2025.*
