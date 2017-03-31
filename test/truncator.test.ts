import * as chai from 'chai';
import {IServerInjectResponse} from 'hapi';
import {truncate} from '../src/truncator';
import {server} from '../src/index';

const expect = chai.expect

describe('truncator specifications: should keep anything invalid or smaller than a million', () => {
    it('via `get`', done => expectEq(done, '532', '532'))

    it('via method call', async () => {
        expect(await truncate('0')).eq('0');
        expect(await truncate('3.14')).eq('3.14')
        expect(await truncate('3.141592653589793')).eq('3.141592653589793')
        expect(await truncate('-123456.789')).eq('-123456.789')

        expect(await truncate('')).eq('')
        expect(await truncate('invalid')).eq('invalid')
        expect(await truncate(NaN.toString())).eq(NaN.toString())
        expect(await truncate(Infinity.toString())).eq(Infinity.toString())
        expect(await truncate((-Infinity).toString())).eq((-Infinity).toString())
    })
})

describe('truncator specifications: should abbreviate millions', () => {
    it('via `get`', done => expectEq(done, '1000000', '1M'))

    it('via method call', async () => {
        expect(await truncate('1100000')).eq('1.1M')
        expect(await truncate('1234567')).eq('1.2M')
        expect(await truncate('1290000')).eq('1.2M')
        expect(await truncate('1999999')).eq('1.9M')
        expect(await truncate('2500000.34')).eq('2.5M')
        expect(await truncate('87654321')).eq('87.6M')
        expect(await truncate('-987654321')).eq('-987.6M')
    })
})

describe('truncator specifications: should abbreviate billions and greater', () => {
    it('via `get`', done => expectEq(done, '1123456789', '1.1B'))

    it('via method call', async () => {
        expect(await truncate('-1234567891.2345')).eq('-1.2B')
        expect(await truncate('1234567893123')).eq('1.2Tril')
        expect(await truncate('12345678931234')).eq('12.3Tril')
        expect(await truncate('123456789312345')).eq('123.4Tril')
        expect(await truncate('1234567893123456')).eq('1.2Quadri')
        expect(await truncate('12345678931234567')).eq('12.3Quadri')
        expect(await truncate('123456789312345678')).eq('123.4Quadri')
        expect(await truncate('1234567893123456789')).eq('1.2Quint')
    })
})

const expectEq = (done: () => any, input: string, expected: string) => {
    server.inject({method: 'GET', url: `/truncate/${input}`}, (res: IServerInjectResponse) => {
        expect(res.result).eq(expected)
        done()
    })
}