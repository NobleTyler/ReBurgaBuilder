import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'
import * as actions from '../actions/index'

export function * purchaseBurgerSaga (action) {
  yield put(actions.purchaseBurgerStart())
  try {
    const response = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    )
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    )
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error))
  }
}

export function * fetchOrderSaga (action) {
  yield put(actions.fetchOrdersStart())

  try {
    const queryParams =
      '?auth=' +
      action.token +
      '&orderBy="userId"&"equalTo="' +
      action.userId +
      '"'
    const response = yield axios.get('/orders.json?auth=' + queryParams)
    const fetechedOrders = []
    for (let key in response.data) {
      fetechedOrders.push({
        ...response.data[key],
        id: key
      })
    }
    yield put(actions.fetchOrdersSucess(fetechedOrders))
  } catch (error) {
    yield put(actions.fetchOrdersFail(error))
  }
}
