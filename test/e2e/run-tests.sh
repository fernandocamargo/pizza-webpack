#!/bin/bash
# E2E Test Runner
# Starts the webpack dev server in the background and runs Nightwatch tests

set -e

echo "Starting webpack dev server..."
yarn start > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
MAX_WAIT=30
COUNTER=0

until curl -s http://localhost:8080 > /dev/null 2>&1 || [ $COUNTER -eq $MAX_WAIT ]; do
  echo "Waiting for server... ($COUNTER/$MAX_WAIT)"
  sleep 1
  COUNTER=$((COUNTER+1))
done

if [ $COUNTER -eq $MAX_WAIT ]; then
  echo "Server failed to start within $MAX_WAIT seconds"
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi

echo "Server is ready!"
sleep 2  # Give it a bit more time to fully compile

echo "Running e2e tests..."
yarn test:e2e:docker

# Capture test exit code
TEST_EXIT=$?

# Kill the server
echo "Stopping webpack dev server..."
kill $SERVER_PID 2>/dev/null || true

# Exit with test result
exit $TEST_EXIT
