import React,{ Component } from "react";
import Ax from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
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
       totalPrice: 10,
       purchasable:false,
       purchasing:false
   }

   updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients).map(igKey=>{
        return ingredients[igKey];
    }).reduce((sum,el)=>{
        return sum+el;
    },0);
    this.setState({purchasable:sum>0})
   }
   addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+ 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
   }
   removeIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       if(oldCount>0){
        const updatedCount = oldCount- 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
   }
   //May need to set this to just false and true as two methods in later implementations
   purchaseHandler = () => {
       this.setState({purchasing:!this.state.purchasing})
   }
   purchaseContinueHandler =() =>{
       alert("okay is continueing");
   }
    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        
        return(
            <Ax>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseHandler}
                    purchaseContinued={this.purchaseContinueHandler}/> 
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled ={disabledInfo}
                purchasable = {this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
            </Ax>
        );
    }
}
export default BurgerBuilder;