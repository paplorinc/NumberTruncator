import * as chai from "chai"
import {IServerInjectResponse} from "hapi"
import {truncate} from "../src/truncator";

const server = require('../src/index').init()
const assert = chai.assert

describe('truncator specifications: should keep anything invalid or smaller than a million', () => {
    it('via `get`', done => assertEquals(done, '532', '532'))

    it('via method call', done => {
        assert(truncate('0') == '0')
        assert(truncate('3.14') == '3.14')
        assert(truncate('3.141592653589793') == '3.141592653589793')
        assert(truncate('-123456.789') == '-123456.789')

        assert(truncate("") == "")
        assert(truncate("invalid") == "invalid")
        assert(truncate(NaN.toString()) == NaN.toString())
        assert(truncate(Infinity.toString()) == Infinity.toString())
        assert(truncate((-Infinity).toString()) == (-Infinity).toString())

        done()
    })
})

describe('truncator specifications: should abbreviate millions', () => {
    it('via `get`', done => assertEquals(done, '1000000', '1M'))

    it('via method call', done => {
        assert(truncate('1100000') == '1.1M')
        assert(truncate('1234567') == '1.2M')
        assert(truncate('1290000') == '1.2M')
        assert(truncate('1999999') == '1.9M')
        assert(truncate('2500000.34') == '2.5M')
        assert(truncate('87654321') == '87.6M')
        assert(truncate('-987654321') == '-987.6M')
        done()
    })
})

describe('truncator specifications: should abbreviate billions and greater', () => {
    it('via `get`', done => assertEquals(done, '1123456789', '1.1B'))

    it('via method call', done => {
        assert(truncate('-1234567891.2345') == '-1.2B')
        assert(truncate('1234567893123') == '1.2Tril')
        assert(truncate('12345678931234') == '12.3Tril')
        assert(truncate('123456789312345') == '123.4Tril')
        assert(truncate('1234567893123456') == '1.2Quadri')
        assert(truncate('12345678931234567') == '12.3Quadri')
        assert(truncate('123456789312345678') == '123.4Quadri')
        assert(truncate('1234567893123456789') == '1.2Quint')
        done()
    })
})

const assertEquals = (done: () => any, input: string, expected: string) => {
    server.inject({method: 'GET', url: '/truncate/' + input}, (res: IServerInjectResponse) => {
        chai.assert.equal(res.result, expected)
        done()
    })
}