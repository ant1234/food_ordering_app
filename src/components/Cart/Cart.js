import React, {useContext, useState} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const onRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const onAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const onOrderHandler = event => {
        setIsCheckout(true);
    };

    const onSubmitData = async userData => {
        setIsSubmitting(true);
        await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData.name,
                address: userData.street,
                postcode: userData.postcode,
                city: userData.city, 
                orderedItems: cartCtx.items,
            }),
        });
        setIsSubmitting(false);
        setHasSubmitted(true);
        cartCtx.clearCart();
    };

    const checkoutButtons = (
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
            </div>
    );

    const modalContent = (
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
    );

    const isSubmittingContent = <p>Is Submitting ...</p>

    const hasSubmitedContent = <p>Has Subitted !!!! ...</p>

    return (
        <Modal onCloseCart={props.onCloseCart}>

            {!isSubmitting && !hasSubmitted && modalContent}
            {isSubmitting && !hasSubmitted && isSubmittingContent}
            {!isSubmitting && hasSubmitted && hasSubmitedContent}

            {isCheckout && <Checkout onSubmitData={onSubmitData} onCloseCart={props.onCloseCart}/>} 
            {!isCheckout && checkoutButtons}
        </Modal>
    );

};

export default Cart;