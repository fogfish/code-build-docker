#!/bin/sh
set -eu

cat <<EOF
==> test docker 19.x
EOF
docker --version | grep '19.[0-9]' || exit 1

cat <<EOF
==> test docker build
EOF
echo "FROM alpine" | docker build -t test -
docker run test
