import Ingredient from './Ingredient'

export default interface Recipe {
    id: number
    title: string
    image: string
    missedIngredients: Ingredient[]
    unusedIngredients: Ingredient[]
    usedIngredients: Ingredient[]
}
