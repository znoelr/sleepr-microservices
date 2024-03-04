# Build step 1
FROM node:alpine as build

WORKDIR /usr/src/sleepr_app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build


# Build step 2
FROM node:alpine as production

ARG APP_ENV=production
ENV APP_ENV=${NODE_ENV}

WORKDIR /usr/src/sleepr_app

COPY package.json .
COPY package-lock.json .

# Avoid installing --save-dev dependencies
RUN npm i --omit=dev

COPY --from=build /usr/src/sleepr_app/dist ./dist

CMD ["node", "dist/apps/payments/main"]
