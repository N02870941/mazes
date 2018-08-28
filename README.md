# Mazes
[![Build Status](https://travis-ci.com/N02870941/mazes.svg?branch=master)](https://travis-ci.com/N02870941/mazes)

A simple maze generator and solver available in the form of a [web app][site].

# Running the application locally
This app can be run using any of the following three programs:

1. `docker`
2. `gulp`
3. `node`

## Running with Docker
You can expose the app on `localhost:8080` if you have `docker` installed by executing the following:

```
docker pull jabaridash/mazes

docker run -p 8080:80 jabaridash/mazes
```

## Running from source (with browser-sync)
You can also run it from source if you have `git` and `node 8+` installed. This will run the app on `localhost:8080` and also make it available on `localhost:3000` with `browser-sync` for automatic page refresh when the code is modified.

```
git clone https://github.com/N02870941/mazes.git

cd mazes/src

npm install

gulp dev
```

## Running from source (without browser-sync)
Lastly, you can run from source as a basic `node` app without `browser-sync` by executing the following:

```
git clone https://github.com/N02870941/mazes.git

cd mazes/src

npm install

node app.js
```
