import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const MealItem = props => {

    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
         cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price, 
            amount: amount
        });
    }

    return (
         
        <li className={classes.meal}>
            <div key={props.id} >
                <h3>{props.name}</h3>
                <div key={props.id} className={classes.description}>
                {props.description}
                </div>
                <div key={props.id} className={classes.price}>
                    {price}
                </div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div> 
        </li>
        
    );
}; 

export default MealItem;