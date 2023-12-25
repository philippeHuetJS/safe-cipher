/*!
 * safe-cipher
 * Copyright(c) 2022 Philippe Huet
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var crypto = require('crypto')

/**
 * Module exports.
 * @public
 */

module.exports = Cipher

/**
 * Module constructors.
 *
 * @class Cipher
 * @classdesc A class representing an AES-based cryptographic algorithm for encryption.
 * @param {String} algorithm - The encryption algorithm.
 * @param {String} [key] - Optional key for AES.
 * @throws {TypeError} Throws an error if the provided algorithm is invalid.
 * @public
 */

function Cipher(algorithm, key = generateKey()) {
  if (
    !algorithm ||
    typeof algorithm !== 'string' ||
    !crypto.getCiphers().includes(algorithm)
  ) {
    throw new TypeError(
      `Invalid algorithm. Expected one of: ${crypto
        .getCiphers()
        .join(', ')}`
    )
  }

  this.algorithm = algorithm
  this.key = key

  this.iv = crypto.randomBytes(16)
}

/**
 * Method to encrypt a plaintext.
 *
 * @param {String} data - The plaintext data to encrypt.
 * @returns {String} - The encrypted data in base64 format.
 * @throws {TypeError} - In case of invalid input.
 * @public
 */

Cipher.prototype.encrypt = function encrypt(data) {
  if (arguments.length === 0) {
    throw new TypeError('The "data" argument is required.')
  }

  if (!data || typeof data !== 'string') {
    throw new TypeError(
      'The "data" argument must be a non-empty string.'
    )
  }

  var cipher = crypto.createCipheriv(
    this.algorithm,
    this.key,
    this.iv
  )

  var ciphertext = cipher.update(data, 'utf8')
  var encoded = cipher.final()

  return Buffer.concat([ciphertext, encoded])
    .toString('base64')
    .replace(/=+$/, '')
}

/**
 * Method to decrypt a ciphertext.
 *
 * @param {String} data - The base64-encoded encrypted data to decrypt.
 * @returns {String} - The decrypted data in UTF8 format.
 * @throws {TypeError} - In case of invalid input.
 * @public
 */

Cipher.prototype.decrypt = function decrypt(data) {
  if (arguments.length === 0) {
    throw new TypeError('The "data" argument is required.')
  }

  if (!data || typeof data !== 'string') {
    throw new TypeError(
      'The "data" argument must be a non-empty string.'
    )
  }

  var decipher = crypto.createDecipheriv(
    this.algorithm,
    this.key,
    this.iv
  )

  var plaintext = decipher.update(data, 'base64')
  var encoded = decipher.final()

  return Buffer.concat([plaintext, encoded]).toString('utf8')
}

/**
 * Function to generate a key when no key is provided.
 *
 * @returns {String} - The generated key in hexadecimal format.
 * @private
 */

function generateKey() {
  return crypto
    .generateKeySync('aes', {
      length: 128
    })
    .export()
    .toString('hex')
}
