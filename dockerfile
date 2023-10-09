FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

CMD ["npm", "start"]