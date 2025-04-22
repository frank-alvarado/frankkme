#!/usr/bin/env bash
# Usage: ./scripts/docker_build_cv.sh
# Builds the Docker image for CV PDF generation
set -euo pipefail
IMAGE="frjalv/cv-builder:latest"
DOCKERFILE="latex/Dockerfile"
BUILD_CTX="."

echo "Building Docker image: $IMAGE..."
docker build -f "$DOCKERFILE" -t "$IMAGE" "$BUILD_CTX"
