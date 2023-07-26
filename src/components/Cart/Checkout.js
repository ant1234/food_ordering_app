import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isUnderFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {

  const nameInput = useRef(); 
  const streetInput = useRef(); 
  const postcodeInput = useRef(); 
  const cityInput = useRef(); 

  const [isValidInput, setIsValidInput] = useState({
    name: '',
    street: '',
    postcode: '',
    city: '',
  });
  
  const confirmHandler = (event) => {

    event.preventDefault();
    const nameInputValue = nameInput.current.value;
    const streetInputValue = streetInput.current.value;
    const postcodeInputtValue = postcodeInput.current.value;
    const cityInputValue = cityInput.current.value;

    const nameInputValueValid = !isEmpty(nameInputValue);
    const streetInputValueValid = !isEmpty(streetInputValue);
    const postcodeInputtValueValid = !isEmpty(postcodeInputtValue) && !isUnderFiveChars(postcodeInputtValue);
    const cityInputValueValid = !isEmpty(cityInputValue);

    setIsValidInput({
        name: nameInputValueValid,
        street: streetInputValueValid,
        postcode: postcodeInputtValueValid,
        city: cityInputValueValid,
    });

    if(!nameInputValueValid && 
       !streetInputValueValid && 
       !postcodeInputtValueValid && 
       !cityInputValueValid) {
       return;
    } else {
        props.onSubmitData({
            name: nameInputValue,
            street: streetInputValue,
            postcode: postcodeInputtValue,
            city: cityInputValue,
        });
    }

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!isValidInput.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput} />
        {!isValidInput.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${classes.control} ${!isValidInput.street ? classes.invalid : ''}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput} />
        {!isValidInput.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${classes.control} ${!isValidInput.postcode ? classes.invalid : ''}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postcodeInput}/>
        {!isValidInput.postcode && <p>Please enter a valid postcode.</p>}
      </div>
      <div className={`${classes.control} ${!isValidInput.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInput}/>
        {!isValidInput.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCloseCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;