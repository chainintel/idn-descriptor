'use strict'
var expect = require('chai').expect
const Descriptors = require('../dist/index.js')

describe('Descriptors', () => {
  it('should import', async () => {
    console.log(Descriptors)
    new Descriptors.PackageDescriptor()
  })
  it('should calculateHash', async () => {
    let pkg = new Descriptors.PackageDescriptor()
    let hash = await pkg.calculateHash()
    console.log(hash)
  })
})
