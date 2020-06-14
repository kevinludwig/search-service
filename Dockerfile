FROM node:12

RUN mkdir -p /opt/app
WORKDIR /opt/app

ADD package.json /opt/app
ADD package-lock.json /opt/app
RUN npm install --production

COPY config /opt/app/config
COPY src /opt/app/src

EXPOSE 8080 
CMD ["node", "build/boot.js"]
