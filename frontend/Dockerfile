# Use an official Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /entity.linking

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend source code into the container
COPY . .

# Expose the port the React development server runs on 
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]
