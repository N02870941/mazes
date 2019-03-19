set -e

cd ${TRAVIS_BUILD_DIR}

TAG="${TRAVIS_BRANCH}-${TRAVIS_BUILD_NUMBER}"

if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  TAG="PR-${TRAVIS_PULL_REQUEST}-${TRAVIS_BUILD_NUMBER}" 
fi

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -t jabaridash/mazes:${TAG} .
docker push jabaridash/mazes:${TAG}

if [ $TRAVIS_BRANCH == "master" ]; then
  docker tag jabaridash/mazes:${TAG} jabaridash/mazes
  docker push jabaridash/mazes
fi
