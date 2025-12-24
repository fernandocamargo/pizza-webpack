/**
 * Nightwatch Globals
 *
 * Configuration and hooks for e2e tests
 * @see http://nightwatchjs.org/guide#external-globals
 *
 * Note: For Docker/CI environments, we don't start a webpack dev server here.
 * Instead, the server should already be running (e.g., via `npm start` or docker-compose)
 */

module.exports = {
  // Default timeout for all wait operations
  waitForConditionTimeout: 5000

  // No before/after hooks needed for Docker environment
  // The dev server is started by the run-tests.sh script
}
