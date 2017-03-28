import * as chai from "chai"
import {IServerInjectResponse} from "hapi"

const server = require('../src/index').init()

describe('truncator specifications: should keep anything smaller than a million', () => {
    it('0', done =>
        assertEquals(done, '0', '0'))

    it('3.14', done =>
        assertEquals(done, '3.14', '3.14'))
    it('3.141592653589793', done =>
        assertEquals(done, '3.141592653589793', '3.141592653589793'))

    it('532', done =>
        assertEquals(done, '532', '532'))

    it('1.234e+3', done =>
        assertEquals(done, '1.234e+3', '1234'))

    it('-123456.789', done =>
        assertEquals(done, '-123456.789', '-123456.789'))
})

describe('truncator specifications: should abbreviate millions', () => {
    it('1000000', done =>
        assertEquals(done, '1000000', '1M'))
    it('1100000', done =>
        assertEquals(done, '1100000', '1.1M'))
    it('1234567', done =>
        assertEquals(done, '1234567', '1.2M'))
    it('1290000', done =>
        assertEquals(done, '1290000', '1.2M'))
    it('1999999', done =>
        assertEquals(done, '1999999', '1.9M'))
    it('87654321', done =>
        assertEquals(done, '87654321', '87.6M'))
    it('2500000.34', done =>
        assertEquals(done, '2500000.34', '2.5M'))

    it('1.234567e+7', done =>
        assertEquals(done, '1.234567e+7', '12.3M'))
    it('1.23e-2', done =>
        assertEquals(done, '1.23e-2', '0.0123'))

    it('-1.234567e+7', done =>
        assertEquals(done, '-1.234567e+7', '-12.3M'))

    it('-987654321', done =>
        assertEquals(done, '-987654321', '-987.6M'))
})

describe('truncator specifications: should abbreviate billions and greater', () => {
    it('1123456789', done =>
        assertEquals(done, '1123456789', '1.1B'))

    // double precision lost
    it('1.2e+119', done =>
        assertEquals(done, '1.2e+119', '119.9Octot'))
    it('1.2e+120', done =>
        assertEquals(done, '1.2e+120', '1.1Novent'))
    it('1.2e+121', done =>
        assertEquals(done, '1.2e+121', '11.9Novent'))
    it('1.2e+122', done =>
        assertEquals(done, '1.2e+122', '119.9Novent'))
    it('1.2e+123', done =>
        assertEquals(done, '1.2e+123', '1.1Quadra'))

    // double precision lost
    it('1.2e+152', done =>
        assertEquals(done, '1.2e+152', '1.1999999999999997e+29Quadra'))
    it('1.2e+153', done =>
        assertEquals(done, '1.2e+153', '1.1Quinquag'))

    it('Number.MAX_VALUE', done =>
        assertEquals(done, '1.7976931348623157e+308', '179.7Unc'))

    it('-1123456789.345678', done =>
        assertEquals(done, '-1123456789.345678', '-1.1B'))
})

const assertEquals = function (done: () => any, input: string, expected: string) {
    server.inject({method: 'GET', url: '/truncate/' + input}, (res: IServerInjectResponse) => {
        chai.assert.equal(res.result, expected)
        done()
    })
}