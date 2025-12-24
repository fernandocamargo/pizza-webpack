# It's pizza time!

A React 15 + webpack 1 pizza builder from the 2016 era.

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
