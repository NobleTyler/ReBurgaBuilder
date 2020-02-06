import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
const burger = (props) =>{
    //Basically map foreaches the keys, and seperates them into keys, then we make another sub array in there of how many of one thing we see
    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return[...Array(props.ingredients[igKey])].map((_,i)=> {
            return <BurgerIngredient key={igKey+i} type={igKey} />;
        });
    });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type ="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type ="bread-bottom"/>
        </div>
    );
}
export default burger;