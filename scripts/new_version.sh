#!/usr/bin/env bash

if [ $# == 0 ]; then
    echo "Usage: $0 version"
    echo "* version: <version, x.y.z>"
    exit
fi

VERSION=$1

if [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    # Update the package version.
    npm version "$VERSION"
    git tag -fa -m "" "v${VERSION}"

    read -p "Want to push(y/n)? " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Change major tag.
        MAJOR="${VERSION%%.*}"
        git tag -d "v${MAJOR}"
        git tag -fa -m "" "v${MAJOR}"

        git push -f --tags
    else
        git tag -d "v${VERSION}"
        git reset --hard HEAD~1
    fi
else
    echo "Error: invalid version: '$VERSION'"
    exit 1
fi
