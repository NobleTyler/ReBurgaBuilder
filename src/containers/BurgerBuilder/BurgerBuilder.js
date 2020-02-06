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
           salad:1,
           bacon:1,
           cheese:2,
           meat:2
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