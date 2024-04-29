FROM node:22-slim

WORKDIR /app

# Stage 1: Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Build the app
COPY . .
RUN npm run build

# Stage 3: Run the app
CMD ["npm", "run", "start"]