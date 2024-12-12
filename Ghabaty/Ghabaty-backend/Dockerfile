# Use the Node.js image as the base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy necessary files for installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Expose the port your app uses
EXPOSE 4000

# Start your app
CMD ["node", "index.js"]
