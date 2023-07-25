import React, {useEffect, useState} from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);

  useEffect(() => {

    const fetchMeals = async () => {
      
      let mealsArr = []; 
      let responseMeals;

      const response = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/meals.json');
      responseMeals = await response.json();
       
        for (const key in responseMeals) {
          mealsArr.push({
            id: key,
            name: responseMeals[key].name,
            description: responseMeals[key].description,
            price: responseMeals[key].price,
          });
        }

        setMeals(mealsArr);
    }

    fetchMeals();

  }, []);

  console.log(meals);

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