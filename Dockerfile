# Use the official Node.js image as base
FROM node:14

# Create file system
RUN mkdir /db
RUN mkdir -p /src/app

# Set the working directory in the container
WORKDIR /src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]
