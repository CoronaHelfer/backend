FROM node:latest
RUN addgroup --system backend
RUN adduser backend --system --ingroup backend
RUN mkdir /app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN chown -R backend:backend /app

EXPOSE 3000

USER backend

CMD npm start
