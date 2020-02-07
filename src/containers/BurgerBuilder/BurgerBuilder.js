import React,{ Component } from "react";
import Ax from '../../hoc/Ax'
import Burger from '../../components/Burger/Burger'
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
       }
   }
    render(){
        return(
            <Ax>
                <Burger ingredients={this.state.ingredients}/>
            <div>Build Controls</div>
            </Ax>
        );
    }
}
export default BurgerBuilder;