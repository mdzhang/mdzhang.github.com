# [mdzhang.com](http://mdzhang.com)

[![CircleCI](https://circleci.com/gh/mdzhang/mdzhang.com.svg?style=shield)](https://circleci.com/gh/mdzhang/mdzhang.com)

This repository holds the code for my personal website, [mdzhang.com](http://mdzhang.com).
Built using [Hugo](https://gohugo.io/)

## Setup

* Clone the repository
    ```sh
    git clone https://github.com/mdzhang/mdzhang.com.git
    ```

* Install `node` e.g. using [anyenv](https://github.com/anyenv/anyenv)
    ```sh
    brew install anyenv
    anyenv install nodenv
    nodenv install 18.2.0
    nodenv rehash
    ```

* Install dependencies
    ```sh
    npm i
    ```

* Install [`hugo`](https://gohugo.io/)
    ```sh
    brew install hugo
    ```

* Init the git submodule with the theme
    ```sh
    make init
    ```

## Development

* Start a local server
    ```sh
    make start
    ```

### Code Linting

TODO

### Testing

N/A beyond making sure the `hugo` build passes.

## Deploy

See [Deploy](DEPLOY.md).
