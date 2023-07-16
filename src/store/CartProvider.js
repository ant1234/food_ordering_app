import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if(action.type === "ADD") {

        const totalAmountUpdated = state.totalAmount + action.item.price * action.item.amount;
        const existingCartIndex = state.items.findIndex((item) => 
            item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartIndex];

        let updatedItem;
        let updatedItems;

        if(existingCartItem) {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        } else {
            updatedItems = action.item;
            updatedItems = state.items.concat(action.item);
        }

        return ({
            items: updatedItems,
            totalAmount: totalAmountUpdated,
        });
    }
    if(action.type === "REMOVE") {
        const existingCartIndex = state.items.findIndex((item) => 
            item.id === action.id
        );
        const existingCartItem = state.items[existingCartIndex];
        const totalAmountUpdated = state.totalAmount - existingCartItem.price;

        let updatedItem;
        let updatedItems;

        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItem[existingCartIndex] = updatedItem;
        }

        return ({
            items: updatedItems,
            totalAmount: totalAmountUpdated,
        });

    }

    return defaultCartState;
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            item: item,
        });
    };

    const removeItemHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id,
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler, 
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;