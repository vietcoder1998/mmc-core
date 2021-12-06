const assert = require('assert')
const BlockChain = require('../lib/entities/index').BlockChain
describe('BlockChainTest', function () {
    describe('#check existed', function () {
        it('block is valid', function () {
            assert.ok(new BlockChain(), 'block is invalid')
        })
    })
})
