import GenerateGroceryList from '@/components/Food/GenerateGroceryList'
import IngredientsInput from '@/components/Food/IngredientsInput'
import MealPlanner from '@/components/Food/MealPlanner'
import RecipeSuggestions from '@/components/Food/RecipeSuggestions'
import FoodContext from '@/context/FoodContext'
import Ingredient from '@/models/Ingredient'
import Recipe from '@/models/Recipe'
import { FunctionComponent, Suspense, useState } from 'react'

interface FoodProps {}

const Food: FunctionComponent<FoodProps> = () => {
    const [ingredientsStock, setIngredientsStock] = useState<Ingredient[]>([])
    const [recipePlan, setRecipePlan] = useState<Recipe[]>([])
    const [mealPlan, setMealPlan] = useState<Recipe[][]>(Array(7).fill([]))

    return (
        <div className='mx-12'>
            <FoodContext.Provider
                value={{
                    ingredients: ingredientsStock,
                    setIngredients: setIngredientsStock,
                    recipes: recipePlan,
                    setRecipes: setRecipePlan,
                    mealPlan: mealPlan,
                    setMealPlan: setMealPlan,
                }}
            >
                <div className='text-center'>
                    <h1 className='inline-block text-4xl my-24 border-4 rounded-lg p-4'>Meal Planner</h1>
                </div>
                <IngredientsInput />
                <div className='border-2 p-2 rounded-lg my-4'>
                    <h1 className='text-2xl mb-2'>Step 2: Choose Recipes</h1>
                    <h2 className='text-lg m-2'>Drag the desired recipe to a day to plan it</h2>
                    <Suspense fallback={<RecipeSuggestions skeleton={true} />}>
                        <RecipeSuggestions />
                    </Suspense>
                    <MealPlanner />
                </div>
                <GenerateGroceryList />
            </FoodContext.Provider>
        </div>
    )
}

export default Food
