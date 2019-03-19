#!/bin/sh
set -e

cd ${TRAVIS_BUILD_DIR}/src
npm test
