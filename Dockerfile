FROM node:18 as build
WORKDIR /opt/app
ADD . .
RUN npm ci
RUN npm run migrate:generate
RUN npm run build --prod


FROM node:18
WORKDIR /opt/app
COPY --from=build /opt/app/dist ./dist
ADD *.json ./
ADD ./prisma ./prisma
ADD ./libs ./libs
ADD ./src ./src
RUN npm ci --omit=dev
RUN npm run migrate:generate
CMD [ "node", "./dist/src/main.js" ]
