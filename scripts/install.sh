#!/bin/sh
set -e

cd ${TRAVIS_BUILD_DIR}/src
npm install -g firebase-tools
npm install
