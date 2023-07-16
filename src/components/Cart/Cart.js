import React, {useContext} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const onRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const onAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    return (
        <Modal onCloseCart={props.onCloseCart}>
            <div>
                <ul className={classes['cart-items']}>
                    {cartCtx.items.map(item => 
                        <CartItem 
                            key={item.id}
                            name={item.name}
                            amount={item.amount}
                            price={item.price}
                            onRemove={onRemoveHandler.bind(null, item.id)}
                            onAdd={onAddHandler.bind(null,item)}
                        />
                    )}
                </ul>  
                <div className={classes.total}><span>Total Amount</span></div>
                <div><span>{totalAmount}</span></div>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );

};

export default Cart;