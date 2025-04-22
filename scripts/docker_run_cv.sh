#!/usr/bin/env bash
# Usage: ./scripts/docker_run_cv.sh
# Runs the Docker container to generate cv.pdf into app/public
set -euo pipefail

IMAGE="frankkme-cv-full"

echo "Generating CV PDF via Docker container..."
docker run --rm \
  -v "$(pwd)/app/public:/work/app/public" \
  "$IMAGE"

echo "Done: app/public/cv.pdf"
