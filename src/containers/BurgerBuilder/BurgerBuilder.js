import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
/**
 * This functional component uses hooks to  create a burger builder
 */
const burgerBuilder = props => {
  //Sets the hook for purchasing and setpurchasing
  const [purchasing, setPurchasing] = useState(false)

  //Access redux via use Selector.
  const dispatch = useDispatch()
  const ings = useSelector(state => state.burgerBuilder.ingredients)
  const price = useSelector(state => state.burgerBuilder.totalPrice)
  const error = useSelector(state => state.burgerBuilder.error)
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  //Dispatch these actions to the action handlder and call them on the argument
  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName))
  const onIngredientRemoved = ingName =>
    dispatch(actions.removeIngredient(ingName))
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  )
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path))
  // When ingredients are changed this updates the state
  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }
  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])
  //Set authentication and purchase history
  const purchaseHandler = () => {
    if (!isAuthenticated) {
      onSetAuthRedirectPath('/checkout')
      props.history.push('auth')
    } else setPurchasing(true)
  }
  //Cancels purchase
  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }
  //continues purchase and updates history
  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push('/checkout')
  }
  //Take disabled keys and let user know if ingredients cannot be loaded. Then return the required jsx for the ingredient not loaded
  const disabledInfo = {
    ...ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if (ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </React.Fragment>
    )
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    )
  }
  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  )
}

export default withErrorHandler(burgerBuilder, axios)
