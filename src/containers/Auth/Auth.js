import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import { updateObject, checkValidity } from '../../shared/utility'

/**
 *  Create the auth state set via props. Also you can caull authform to read and set to write
 *  useState is what allows that to happen
 * @param {*} props
 */
const auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 8
      },
      valid: false,
      touched: false
    }
  })

  /**
   * Same as above but it's for signup
   */
  const [isSignup, setIsSignup] = useState(true)

  /**
   * Calls use effect when either the building burger or auth are changed
   * Is used to set redirect paths based on if user is building or done
   */
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])
  /**
   * Handles input changes, by taking in multiple event tpyes then caulling update object then checking validity
   * Finally uses set Auth form to setup the atuh form with the object created from events
   * @param {*} event
   * @param {*} controlName
   */
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      })
    })
    setAuthForm(updatedControls)
  }
  /**
   * Takes in events and calls on Auth to submit the email and password value while noting if it's a signup
   * @param {*} event
   */
  const submitHandler = event => {
    event.preventDefault()
    props.onAuth(authForm.email.value, authForm.password.value, isSignup)
  }
  /**
   * Toggles auth mode
   */
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }
  /**
   * For each key in the form add it to ann array which is later mapped to a jsx component
   */
  const formElementsArray = []
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    })
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ))
  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null
  errorMessage = props.error ? <p> {props.error.message} </p> : null

  let authRedirect = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {' '}
      {authRedirect} {errorMessage}{' '}
      <form onSubmit={submitHandler}>
        {' '}
        {form} <Button btnType='Success'> Submit </Button>{' '}
      </form>{' '}
      <Button clicked={switchAuthModeHandler} btnType='Danger'>
        Switch to {isSignup ? 'Sign In' : 'Sign up'}{' '}
      </Button>{' '}
    </div>
  )
}
/**
 *  Takes in the state so we can use it as props in other methods
 * this is done because it's using hooks in a functional component
 * @param {*} state
 */
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}
/**
 * This Dispatches the email and password to the store and then dispatches the redirect path
 * useful for getting what is in the dispatch matched to props so we can use it in the container
 * https://stackoverflow.com/questions/39419237/what-is-mapdispatchtoprops
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth)
