FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install  --legacy-peer-deps


# Copy the rest of the application code to the working directory
COPY . .

RUN npm install -g serve

# Build the React app
RUN npm run build

COPY /dist /dist


EXPOSE 3000

CMD serve -s dist
#CMD ["npm", "run", "dev"]
# Start nginx
#CMD ["nginx", "-g", "daemon off;"]
