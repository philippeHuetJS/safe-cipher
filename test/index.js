'use strict'

var Cipher = require('..')
var assert = require('assert')

describe('.encrypt(data)', function () {
  it('should require an argument', function () {
    var encrypted = Cipher.encrypt.bind(null)
    assert.throws(encrypted, /The "data" argument.*required./)
  })
  it('should be of type string', function () {
    var encrypted = Cipher.encrypt.bind(null, Buffer.from('foo'))
    assert.throws(encrypted, /The "data" argument.*string./)
  })
  it('should encrypt a plaintext', function () {
    var encrypted = Cipher.encrypt('foo')
    assert.ok(typeof encrypted === 'string')
    assert.deepStrictEqual(encrypted.length, 22)
  })
})

describe('.decrypt(data)', function () {
  it('should require an argument', function () {
    var decrypted = Cipher.decrypt.bind(null)
    assert.throws(decrypted, /The "data" argument.*required./)
  })
  it('should be of type string', function () {
    var decrypted = Cipher.decrypt.bind(null, Buffer.from('foo'))
    assert.throws(decrypted, /The "data" argument.*string./)
  })
  it('should decrypt a ciphertext', function () {
    var encrypted = Cipher.encrypt('foo')
    var decrypted = Cipher.decrypt(encrypted)
    assert.strictEqual(decrypted, 'foo')
  })
})
