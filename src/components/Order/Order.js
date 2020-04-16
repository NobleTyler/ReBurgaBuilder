import React from 'react'
import classes from './Order.css'

/**
 *  take props then push the name and ammount per ingredient into a dictionary
 *  then map that and create a span dynamically, using ig name key ammount from the ingredient
 *  lots of that dynamic work happens in the map function where you can see it returns well ingredient output
 * @param {ingredients, ig} props 
 */
const order = props => {
  const ingredients = []

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }
  const ingredientOutput = ingredients.map(ig => (
    <span className={classes.Output} key={ig.name}>
      {ig.name}({ig.amount})
    </span>
  ))

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price:<strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  )
}
export default order
