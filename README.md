# redis-project
![dependencies](https://img.shields.io/david/bryansouza/redis-project)
![typescript](https://img.shields.io/github/languages/top/bryansouza/redis-project)

Simple API that uses Redis as cache. Besides, this project consumes the Oxford Dictionaries API.

## Usage
### 1. Environment variables
   
First, create a `.env` file in the root of the project.

Then, add these variables:
`HOSTNAME`
`PORT`
`OXFORD_DICTIONARY_API_URL`
`APP_ID`
`APP_KEY`

### 2. Building the app's image
```
docker build -t redis-project .
```
   
### 3. Running the container
```
docker run -it --rm -p 80:3000 redis-project
```

### 4. Rest Client *(Optional)*
After installing the `Rest Client` extension on `vscode`, open the `requests.rest` file to send HTTP requests.

## How it works
### 1. Redis
Redis is a server that provides data structures in order to cache our data. We can use it as a database, cache or message broker.
