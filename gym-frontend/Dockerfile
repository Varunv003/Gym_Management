FROM node:20

WORKDIR /app

# Build the Vue.js project
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build
COPY package.json ./
COPY package-lock.json ./
# Copy full project first (including vite.config.ts)
COPY . .

# Install dependencies after all files are in place
RUN npm install

EXPOSE 5173
EXPOSE 8080 

CMD ["npm", "run", "dev"]
