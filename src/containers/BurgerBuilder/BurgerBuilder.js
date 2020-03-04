import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'
import Ax from '../../hoc/Ax'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.1,
  bacon: 0.7,
  meat: 0.3
}
class BurgerBuilder extends Component {
  /* constructor(props){
        super(props);
        this.state = {...}
   }*/
  state = {
    totalPrice: 10,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount () {
    /*axios
      .get('https://react-burger-68669.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(error => {
        this.setState({ error: true })
      })*/
  }
  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }
  addIngredientHandler = type => {
    const oldCount = this.props.ings[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.props.ings
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }
  removeIngredientHandler = type => {
    const oldCount = this.props.ings[type]
    if (oldCount > 0) {
      const updatedCount = oldCount - 1
      const updatedIngredients = {
        ...this.props.ings
      }
      updatedIngredients[type] = updatedCount
      const priceAddition = INGREDIENT_PRICES[type]
      const oldPrice = this.state.totalPrice
      const newPrice = oldPrice - priceAddition
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
      this.updatePurchaseState(updatedIngredients)
    }
  }
  //May need to set this to just false and true as two methods in later implementations
  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing })
  }
  purchaseContinueHandler = () => {
    const queryParams = []
    for (let i in this.props.ings) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.props.ings[i])
      )
    }
    queryParams.push('price='+this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    let burger = this.state.error ? <p>Ingredients not loaded!</p> : <Spinner />
    if (this.props.ings) {
      burger = (
        <Ax>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Ax>
      )
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
      console.log("It's loading")
    }
    return (
      <Ax>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Ax>
    )
  }
}
const mapStateToProps = state =>{
  return{
    ing: state.ingredients
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded: (ingName)=>dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
    onIngredientRemoved: (ingName)=>dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
