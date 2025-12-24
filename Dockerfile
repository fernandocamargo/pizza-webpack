# Use Node 8 to match the original project era (2016-2017)
FROM node:8-alpine

# Set working directory
WORKDIR /app

# Install build dependencies for node-sass
RUN apk add --no-cache python2 make g++

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies using yarn, ignoring engine compatibility checks
# This allows installing packages with the exact versions from package.json
RUN yarn install --ignore-engines --frozen-lockfile || yarn install --ignore-engines

# Copy project files
COPY . .

# Expose the default port
EXPOSE 8080

# Start the development server
CMD ["yarn", "start"]
