# React TodoMVC Kata

A React kata based on [TasteJS' TodoMVC application](http://todomvc.com/examples/react).

# Overview

This application uses `create-react-app` as a base project. It has been enhanced to include `cypress` as the e2e testing framework.

## Objectives

- Characterization Tests
- Convert router from Director to React Router
- Implement Redux/Flux pattern
- Split `App.jsx` into sub-components
  - Example patterns: Smart/Dumb, Presentation/Container, etc.
  - Understand when to use Functional vs Class components
- Convert project to TypeScript
- Bonus: End-to-end UI tests using Cypress

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn e2e`

Runs headless Cypress instance

### `yarn e2e:open`

Runs Cypress application with GUI

## Useful Links

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Attribution

TasteJS MIT License: https://github.com/tastejs/todomvc/blob/master/license.md

## License

MIT