import React,{ Component } from "react";
import Ax from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.1,
    bacon:0.7,
    meat: 0.3
}
class BurgerBuilder extends Component{
   /* constructor(props){
        super(props);
        this.state = {...}
   }*/
   state = {
       ingredients:{
           salad:0,
           bacon:0,
           cheese:0,
           meat:0
       },
       totalPrice: 10
   }
   addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+ 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice+ priceAddition;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
   }
   removeIngredientHandler = (type) => {

   }
    render(){
        return(
            <Ax>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </Ax>
        );
    }
}
export default BurgerBuilder;