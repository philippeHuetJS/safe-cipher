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

module.exports = (function cipher() {
  return new Cipher('aes-256-cbc')
})()

/**
 * Module constructors.
 * @private
 */

function Cipher(algorithm) {
  this.algorithm = algorithm

  this.key = generateKey()
  this.iv = crypto.randomBytes(16)
}

/**
 * Method to encrypt a plaintext.
 *
 * @param {String} data - The data to encrypt with AES cipher block chaining.
 * @returns {String} - The encrypted data in base64 format.
 * @throws {Error} - In case of invalid input.
 * @public
 */

Cipher.prototype.encrypt = function encrypt(data) {
  if (!data) {
    throw new TypeError('The "data" argument is required.')
  }

  if (typeof data !== 'string') {
    throw new TypeError('The "data" argument must be a string.')
  }

  var cipher = crypto.createCipheriv(
    this.algorithm,
    this.key,
    this.iv
  )

  var ciphertext = cipher.update(data, 'utf8')
  var encoded = cipher.final()

  // generate ciphertext
  return Buffer.concat([ciphertext, encoded])
    .toString('base64')
    .replace(/=+$/, '')
}

/**
 * Method to decrypt a ciphertext.
 *
 * @param {String} data - The data to decrypt with AES cipher block chaining.
 * @returns {String} - The decrypted data in UTF8 format.
 * @throws {Error} - In case of invalid input.
 * @public
 */

Cipher.prototype.decrypt = function decrypt(data) {
  if (!data) {
    throw new TypeError('The "data" argument is required.')
  }

  if (typeof data !== 'string') {
    throw new TypeError('The "data" argument must be a string.')
  }

  var decipher = crypto.createDecipheriv(
    this.algorithm,
    this.key,
    this.iv
  )

  var plaintext = decipher.update(data, 'base64')
  var encoded = decipher.final()

  // generate plaintext
  return Buffer.concat([plaintext, encoded]).toString('utf8')
}

/**
 * Function to generate a key for AES.
 *
 * @returns {String} - The generated key in hexadecimal format.
 * @private
 */

function generateKey() {
  // generate AES key
  return crypto
    .generateKeySync('aes', {
      length: 128
    })
    .export()
    .toString('hex')
}
