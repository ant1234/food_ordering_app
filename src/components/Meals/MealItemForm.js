import React, {useRef, useState} from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = props => {

    const amountInputRef = useRef();
    const [validAmount, setValidAmount] = useState(true);

    const onOrderHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmountNumber === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5) {
            setValidAmount(false);
            return;
        } 

        props.onAddToCart(enteredAmountNumber);

    };

    return (
        <form onSubmit={onOrderHandler} className={classes.form} type="submit">
            <div>
                <Input
                    ref={amountInputRef}
                    label="amount" 
                    input={{
                        id: Math.random().toFixed(10), 
                        type: "number",
                        step: "1",
                        label: "Enter amount",
                        min: "1",
                        max: "5",
                        defaultValue: "1",
                    }}
                />
                <button>Add + </button>
                {!validAmount && <p>Please enter a valid amount ( 1 - 5 )</p>}
            </div>
        </form>
    );
};

export default MealItemForm;