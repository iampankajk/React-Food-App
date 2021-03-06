import { useEffect,useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";


const AvailableMeals = ()=>{
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState();

    useEffect(()=>{
      const fetchMeals = async ()=>{
       const response = await fetch('https://react-practise-b6d2c-default-rtdb.firebaseio.com/meals.json');

       if(!response.ok){
         throw new Error('Something went wrong');
       }
       const respenseData = await response.json();

       const loadedMeals = [];
       for(const key in respenseData){
         loadedMeals.push({
           id:key,
           name:respenseData[key].name,
           description:respenseData[key].description,
           price:respenseData[key].price,
         });
       }
       
       setMeals(loadedMeals);
       setIsLoading(false);
      }

        fetchMeals().catch(error=>{
          setIsLoading(false);
        setHttpError(error.message);
        });
     
      
    },[])

    if(isLoading){
      return <section className={classes.mealsLoading}>
        <p>Loading.....</p>
      </section>
    }
    if(httpError){
      return <section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>
    }
    const mealsList = meals.map(meal=> <MealItem key={meal.id} id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description} />)

    return(
        <section className={classes.meals}>
          <Card>
             <ul>
                {mealsList}
            </ul>
          </Card>
           
        </section>
    )
};

export default AvailableMeals;