# Step 1: Use an official Node.js runtime as a parent image
FROM node:14

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY CocktailAiWeb/ .

# Step 4: Install dependencies
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV production
ENV PORT 8080

# Run npm start when the container launches
CMD ["npm", "start"]