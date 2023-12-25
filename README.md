# safe-cipher

[![CI status](https://img.shields.io/github/actions/workflow/status/philippeHuetJS/safe-cipher/ci.yml)](https://github.com/philippeHuetJS/safe-cipher/actions)
[![MIT license](https://img.shields.io/github/license/philippeHuetJS/safe-cipher)](https://github.com/philippeHuetJS/safe-cipher/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/philippeHuetJS/safe-cipher)](https://github.com/philippeHuetJS/safe-cipher/releases)

Module to encrypt and decrypt a data

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm](https://www.npmjs.com/) registry.

```sh
$ npm install safe-cipher
```

## API

```js
var Cipher = require('safe-cipher')
```

TypeScript:

```typescript
import Cipher from 'safe-cipher'
```

### cipher.encrypt(data)

```js
var cipher = new Cipher('aes-256-cbc')

var encrypted = cipher.encrypt('foo')
console.log(encrypted) // "De+8/ATkTpuJ+Jy/ez/D6Q"
```

### cipher.decrypt(data)

```js
var decrypted = cipher.decrypt(encrypted)
console.log(decrypted) // "foo"
```

## Description

Encrypts and decrypts a data with AES cipher block chaining. Returns a string in base64 and utf8 formats.

## Test

```sh
$ npm run test
```

## Documentation

Find [here](https://nodejs.org/en/docs/) the official documentation.

## License

[MIT](LICENSE)
