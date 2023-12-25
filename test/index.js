'use strict'

var Cipher = require('..')
var assert = require('assert')

var cipher = new Cipher('aes-256-cbc')

describe('encrypt', function () {
  it('should require an argument', function () {
    var encrypted = cipher.encrypt.bind(cipher)

    assert.throws(encrypted, /The "data" argument.*required./)
  })

  it('should be of type string', function () {
    var encrypted = cipher.encrypt.bind(cipher, { prop: 'foo' })

    assert.throws(encrypted, /The "data" argument.*string./)
  })

  it('should encrypt a plaintext', function () {
    var encrypted = cipher.encrypt('foo')

    assert.ok(typeof encrypted === 'string')
    assert.ok(encrypted.length > 0)
    assert.ok(/^[a-zA-Z0-9+/]+={0,2}$/.test(encrypted))
  })
})

describe('decrypt', function () {
  it('should require an argument', function () {
    var decrypted = cipher.decrypt.bind(cipher)

    assert.throws(decrypted, /The "data" argument.*required./)
  })

  it('should be of type string', function () {
    var decrypted = cipher.decrypt.bind(cipher, { prop: 'foo' })

    assert.throws(decrypted, /The "data" argument.*string./)
  })

  it('should decrypt a ciphertext', function () {
    var encrypted = cipher.encrypt('foo')
    var decrypted = cipher.decrypt(encrypted)

    assert.strictEqual(decrypted, 'foo')
  })
})
