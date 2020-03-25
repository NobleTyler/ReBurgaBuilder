import { takeEvery, all,takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {
  authCheckStateSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
  authUserSaga
} from './auth'
import { initIngredientsSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchOrderSaga } from './order'

export function * watchAuth () {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ])
}

export function * watchBurgerBuilder () {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}
export function * watchOrder () {
    //Take latest makes it so only one goes on at a time from this saga
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrderSaga)
}
