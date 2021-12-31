# CSC 499 Project

Project to compare WebAssembly performance with Javascript/Typescript

## Setup

To build the project on your own machine. Follow the following steps:

### Install Rust
You can install Rust at https://www.rust-lang.org/install.html

### Install wasm-pack
```
$ cargo install wasm-pack
```

### Build the package
#### Note You need to have Node.js and NPM installed

```
$ wasm-pack build --target bundler
```

### Link pkg directory to NPM
```
$ cd pkg
$ npm link
```
### Install dependencies
```
$ npm install
```
### Start dev server
```
$ npm run dev
```
