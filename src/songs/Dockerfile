# Use the official Node.js image as the base image
FROM node:20.12.2 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the production stage
#FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Expose the port your application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start", "start:prod"]
