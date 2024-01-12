FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY index.js db.js ./
CMD ["npm", "start"]
