# Use a lightweight image for bun (bun's own Docker image or a node base image)
FROM oven/bun:latest AS build

# Set the working directory
WORKDIR /app

# Copy both the root and UI package.json files
COPY package.json bun.lockb ./
COPY ui/package.json ui/bun.lockb ui/

# Install dependencies for both the server and the UI
RUN bun install

RUN bun run ui:install

# Copy all source files
COPY . .

# Build the Vite UI app
RUN bun run ui:build

# Expose the port that Bun server will listen on
EXPOSE 3000

# Command to run the server (using bun to run the server.ts file)
CMD ["bun", "run", "server.ts"]
