FROM node:6.2-wheezy

RUN mkdir -p /opt/app
WORKDIR /opt/app

ADD package.json /opt/app
RUN npm install

COPY config /opt/app/config
COPY src /opt/app/src
ADD gulpfile.js /opt/app
ADD .eslintrc /opt/app
RUN npm run build 

EXPOSE 8080 
CMD ["node", "build/boot.js"]
