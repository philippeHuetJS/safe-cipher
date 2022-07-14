# safe-cipher

[![CI status](https://img.shields.io/github/workflow/status/philippeHuetJS/safe-cipher/GitHub%20CI)](https://github.com/philippeHuetJS/safe-cipher/actions)
[![MIT license](https://img.shields.io/github/license/philippeHuetJS/safe-cipher)](https://github.com/philippeHuetJS/safe-cipher/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/philippeHuetJS/safe-cipher)](https://github.com/philippeHuetJS/safe-cipher/releases)

Wrapper to encrypt and decrypt a data

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

### Cipher.encrypt(data)

```js
var encrypted = Cipher.encrypt('foo')
console.log(encrypted) // "Nr/zF+vX9e2TmD3iY2tP+w"
```

### Cipher.decrypt(data)

```js
var decrypted = Cipher.decrypt(encrypted)
console.log(decrypted) // "foo"
```

Encrypts and decrypts a data with AES-256 cipher. Returns a string with base64 and UTF-8 encodings.

## Testing

```sh
$ npm run test
```

## Documentation

Find [here](https://nodejs.org/en/docs/) the official documentation.

## License

[MIT](LICENSE)
