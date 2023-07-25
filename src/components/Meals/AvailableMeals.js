import React from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

let responseMeals;

const DUMMY_MEALS = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/meals.json');

if(DUMMY_MEALS.ok) {
  responseMeals = await DUMMY_MEALS.json();
} 

const AvailableMeals = () => {

  let meals = [];  

  for (const key in responseMeals) {
    meals.push(responseMeals[key]);
  }

  return (
      <section className={classes.meals}>
          <Card>
              <ul>
              {meals.map(meal => 
                <MealItem 
                  id={meal.id} 
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />)}
                  
              </ul>
          </Card>
      </section>
  );
};

export default AvailableMeals;