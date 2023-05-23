FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
EXPOSE 3000

ENV PORT=3000

ENV NODE_ENV=production
CMD ["npm", "start"]