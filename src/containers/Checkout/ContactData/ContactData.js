import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

/**
 * this is the value that holsd contact data, useState connects it as a hook as well
 * @param {*} props
 */
const contactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  })
  //form hooks
  const [formIsValid, setFormIsValid] = useState(false)
  /**
   * Takes in an event that is not explitely handled does nothing, and then turns the formData into a list
   * Then exectures the orderfunction using the token and the order attributes
   * @param {*} event
   */
  const orderHandler = event => {
    event.preventDefault()
    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    }
    props.onOrderBurger(order, props.token)
  }
  /**
   *  handles input changes by taking in an event and calling the appropriate hooks to update the order form
   *  then creates jsx based on said form in order to export it later
   * @param {*} event
   * @param {*} inputIdentifier
   */
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      )
    })
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    })

    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }
  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          elementType={formElement.config.elementType}
          key={formElement.id}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}

      <Button btnType='Success' disabled={!formIsValid}>
        Order
      </Button>
    </form>
  )
  if (props.loading) {
    console.log('contact data is loading')
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter contact data</h4>
      {form}
    </div>
  )
}
//Hooks up the form to the state so we can use it in this file
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
//deals with dispatching the purchased burger to props
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  }
}
//connext and export an error handled contact data form also hooks in axios
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios))
