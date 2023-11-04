import Ingredient from '@/models/Ingredient'
import Recipe from '@/models/Recipe'
import { Dispatch, createContext } from 'react'

interface FoodContextProps {
    ingredients: Ingredient[]
    setIngredients: Dispatch<React.SetStateAction<Ingredient[]>>
    recipes: Recipe[]
    setRecipes: Dispatch<React.SetStateAction<Recipe[]>>
    mealPlan: Recipe[][]
    setMealPlan: Dispatch<React.SetStateAction<Recipe[][]>>
}

const FoodContext = createContext<FoodContextProps>({
    ingredients: [],
    setIngredients: () => {},
    recipes: [],
    setRecipes: () => {},
    mealPlan: Array(7).fill([]),
    setMealPlan: () => {},
})

export default FoodContext
