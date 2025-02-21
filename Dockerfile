# Use Node.js LTS version as base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "dev"]