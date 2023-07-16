import React, {useContext, useState, useEffect} from "react";
import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context"; 


const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext); 
    const [buttonIsBumped, setButtonIsBumped] = useState(false);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setButtonIsBumped(true);

        setTimeout(() => {
            setButtonIsBumped(false);
        }, 300)
    },[items])



    const bumpButton = `${classes.button} ${ buttonIsBumped ? classes.bump : ''}`;

    return (
        <button className={bumpButton} onClick={props.onCartClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;