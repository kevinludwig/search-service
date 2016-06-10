### search-template

Node + elasticsearch

### Setup

Install [node 6.2](https://nodejs.org/en/download/current/') or better

```
npm install
npm test
npm start
```

### Docker setup

* Install [Docker](https://www.docker.com/products/docker-toolbox)
* Create a docker VM `docker-machine create --driver virtualbox default`
* Put the following in your `.bash\_profile`: `eval "$(docker-machine env default)"`
* build a docker container for this project: `docker build -t search-template`
* run it: `docker run -i -t search-template`

### TODO

* Recently added, recently modified search
* access control 
