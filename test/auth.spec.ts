import axios from '../src/index'
import { getAjaxRequest } from './helper'

describe('auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should accept HTTP Basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame',
      },
    })

    return getAjaxRequest().then((request) => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })

  test('should accept HTTP Basic auth with non-Latin1 characters', () => {
    axios('/foo', {
      auth: {
        username: 'Aladßç£☃din',
        password: 'open sesame',
      },
    })
    // .then(() => {
    //   throw new Error(
    //     'Should not succeed to make a HTTP Basic auth request with non-latin1 chars in credentials.'
    //   )
    // })
    // .catch((error) => {
    //   expect(/character/i.test(error.message)).toBeTruthy()
    // })
    return getAjaxRequest().then((request) => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZN/nowNkaW46b3BlbiBzZXNhbWU=')
    })
  })
})
