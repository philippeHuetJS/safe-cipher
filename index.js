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

module.exports = cipher()

/**
 * Module instances.
 * @private
 */

function cipher () {
  return new Cipher('aes-256-cbc')
}

/**
 * Module constructors.
 * @param {String} algorithm
 * @private
 */

function Cipher (algorithm) {
  this.algorithm = algorithm
  this.iv = crypto.randomBytes(16)
  this.key = crypto.randomBytes(32)
}

/**
 * Method to encrypt a plaintext.
 *
 * @param {String} data
 * @returns {String}
 * @public
 */

Cipher.prototype.encrypt = function encrypt (data) {
  if (!data) {
    throw new TypeError('The "data" argument is required.')
  }
  if (typeof data !== 'string') {
    throw new TypeError('The "data" argument must be a string.')
  }
  // generate cipher
  var cipher = crypto.createCipheriv(
    this.algorithm,
    this.key,
    this.iv
  )
  // encrypt plaintext
  var ciphertext = cipher.update(data, 'utf8')
  // encode cipher
  ciphertext += cipher
    .final('base64')
    .replace(/=+$/, '')
  // output ciphertext
  return ciphertext
}

/**
 * Method to decrypt a ciphertext.
 *
 * @param {String} data
 * @returns {String}
 * @public
 */

Cipher.prototype.decrypt = function decrypt (data) {
  if (!data) {
    throw new TypeError('The "data" argument is required.')
  }
  if (typeof data !== 'string') {
    throw new TypeError('The "data" argument must be a string.')
  }
  // generate decipher
  var decipher = crypto.createDecipheriv(
    this.algorithm,
    this.key,
    this.iv
  )
  // decrypt ciphertext
  var plaintext = decipher.update(data, 'base64')
  // encode decipher
  plaintext += decipher
    .final('utf8')
  // output plaintext
  return plaintext
}
