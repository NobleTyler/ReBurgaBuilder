import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'


describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
    it('should store token on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            idToken:'token',
            userId:'user'
        })).toEqual({
            token: 'token',
            userId: 'user',
            error: null,
            loading: false,
            authRedirectPath: '/'

        })
    })
})