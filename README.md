# It's pizza time! 🍕

A React 15 + webpack 1 pizza builder from the 2016 era - a time capsule of cutting-edge web development practices from the "golden age" of the React/Redux ecosystem.

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
- **Declarative API** for drag-and-drop (vs. imperative DOM manipulation)
- **Backend-agnostic**: Supports HTML5 drag-and-drop API and touch events
- **Higher-Order Components pattern** for composable behavior
- **Immutable state transitions** aligned with React's philosophy
- **Built on Flux principles** with unidirectional data flow

Example from this codebase:
```javascript
// Drag source decorator
export default DragSource(TOPPING_DRAG_SOURCE, source, collect)(Topping)

// Drop target decorator
export default DropTarget([TOPPING_DRAG_SOURCE], target, collect)(Pizza)
```

**Further reading:**
- [React DnD Documentation](https://react-dnd.github.io/react-dnd/)
- [Dan Abramov's Blog](https://overreacted.io/)

### Webpack 1: The Module Bundler Revolution

[**Webpack**](https://webpack.js.org/) transformed how we build web applications by treating everything as a module.

**What made webpack groundbreaking:**
- **Universal module system**: AMD, CommonJS, ES6 modules in one tool
- **Code splitting**: Dynamic imports for performance optimization
- **Loader ecosystem**: Transform any file type (JS, CSS, images, fonts)
- **Hot Module Replacement**: Update code without full page refresh
- **Plugin architecture**: Extensible build pipeline

This project showcases webpack 1's complexity with modular configuration:
- `/conf/webpack/entries/` - Environment-specific entry points
- `/conf/webpack/loaders/` - Asset transformation pipeline
- `/conf/webpack/plugins/` - Build optimization and tooling

**Evolution context:**
- Webpack 1.x (this project): Manual configuration, verbose setup
- Webpack 2 (2016): Tree shaking, native ES6 modules
- Webpack 4 (2018): Zero-config mode, major performance improvements
- Webpack 5 (2020): Module federation, persistent caching

**Further reading:**
- [Webpack: The Confusing Parts](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)
- [Webpack 1.x to 2.x Migration Guide](https://webpack.js.org/migrate/3/)

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
- [**Flux Architecture**](https://facebook.github.io/flux/) - Unidirectional data flow pattern
- [**Container/Presentational Components**](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) - Separation of concerns pattern by Dan Abramov
- [**Higher-Order Components**](https://reactjs.org/docs/higher-order-components.html) - Component composition pattern (pre-Hooks)

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
The project implements sophisticated HMR setup combining:
- `webpack-hot-middleware` - Webpack HMR server
- `react-transform-hmr` - React component hot reloading
- `redux-hot-loader` - Preserve state across reloads

**Redux DevTools:**
Integrated [Redux DevTools](https://github.com/reduxjs/redux-devtools) with:
- Time-travel debugging
- Action replay
- State diff visualization
- [Introducing Redux DevTools (2015)](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)

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
1. User interaction triggers action creators
2. Actions dispatched to reducers
3. Reducers return new state (immutably)
4. Store notifies connected components
5. Components re-render with new props

**Key files:**
- `src/js/client/actions/` - Action creators (async with thunks)
- `src/js/client/reducers/` - Pure state transformations
- `src/js/client/store/` - Environment-specific store configuration
- `src/js/client/constants/` - Action type constants

### Immutability Pattern

```javascript
// From src/js/client/reducers/toppings.js
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

**Benefits:**
- Prevents accidental mutations
- Enables efficient `shouldComponentUpdate` optimizations
- Time-travel debugging possible
- Predictable state updates

**Further reading:**
- [Immutability in React](https://reactjs.org/docs/update.html)
- [The Case for Immutability](https://medium.com/@kentcdodds/the-state-of-javascript-state-management-in-2019-e27e0d2b0c24)

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
- **Separation of concerns**: Data, logic, and presentation layers
- **Environment awareness**: Different configs for dev/prod/test
- **Modular configuration**: Webpack config split across multiple files
- **Colocation**: Tests mirror source structure

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

- Docker and Docker Compose (recommended)
- OR Node 8.x and npm/yarn (if running locally)

## Installation & Usage

### Using Docker (Recommended)

Docker ensures you can run the project without worrying about Node version compatibility.

**Start the development server:**
```bash
docker-compose up
```

The app will be available at http://localhost:8080 with hot-reload enabled.

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
docker-compose run app yarn build

# Linting
docker-compose run app yarn lint
```

### Using Local Node (Alternative)

If you have Node 8.x installed locally:

**Installation:**
```bash
npm install
```

**Development:**
```bash
npm start
```

**Build:**
```bash
npm run build
```

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

In 2016, JavaScript lacked native immutable data structures. Immutable.js provided:

```javascript
// Efficient updates without mutation
const state1 = Map({ count: 0 })
const state2 = state1.set('count', 1)

state1 === state2  // false (different references)
state1.get('count')  // 0 (original unchanged)
state2.get('count')  // 1 (new version)
```

**Modern alternative (2025):**
```javascript
// Immer library or native spread operators
const state1 = { count: 0 }
const state2 = { ...state1, count: 1 }
```

### Why Redux Thunk?

Before async/await was standardized, thunks provided elegant async actions:

```javascript
// Thunk returns a function instead of action object
export const fetchToppings = (dispatch) => {
  dispatch(setLoadingStatus(true))
  return Data.getToppings()
    .then(toJSON)
    .then(formatToppings)
    .then(dispatchFetchResponse.bind(dispatch))
}
```

**Modern alternative:**
```javascript
// React Query / SWR handle this entirely
const { data, isLoading } = useQuery('toppings', fetchToppings)
```

### Why HOCs (Higher-Order Components)?

HOCs enabled component composition before Hooks:

```javascript
// Wrap component with drag-and-drop behavior
export default DragSource(TOPPING_DRAG_SOURCE, source, collect)(Topping)
```

**Modern alternative (react-dnd hooks):**
```javascript
function Topping() {
  const [{ isDragging }, drag] = useDrag({
    type: TOPPING_DRAG_SOURCE,
    // ...
  })
}
```

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
