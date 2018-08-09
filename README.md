# Mazes
[![Build Status](https://travis-ci.com/N02870941/mazes.svg?branch=master)](https://travis-ci.com/N02870941/mazes)

Mazes is a simple maze generator an solver available in the form of a docker based web app.

# How to run
Ensure you have docker installed before running the following commands:

```
docker pull jabaridash/mazes

docker run -p 8080:80 jabaridash/mazes
```

You can also run it from source if you have git and node 8+installed:

```
git clone https://github.com/N02870941/mazes.git

cd mazes/src

npm install

node index 8080
```
