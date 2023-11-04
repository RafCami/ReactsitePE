import FoodContext from '@/context/FoodContext'
import { FunctionComponent, useContext } from 'react'
import { Separator } from '@/components/ui/separator'

interface MealPlannerProps {}

const MealPlanner: FunctionComponent<MealPlannerProps> = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const { recipes: recipesToPlan, mealPlan: recipes, setMealPlan: setRecipes } = useContext(FoodContext)

    const handleOnDrag = (e: React.DragEvent, recipeId: string, dayIndex: string) => {
        e.dataTransfer.setData('Recipe', recipeId)
        e.dataTransfer.setData('Origin', dayIndex)
    }

    const handleOnDrop = (e: React.DragEvent, dayIndex: number) => {
        const recipeId = parseInt(e.dataTransfer.getData('Recipe'))
        const origin = e.dataTransfer.getData('Origin')
        if (origin === 'suggestions') {
            const getRecipe = recipesToPlan.find((recipe) => recipe.id === recipeId)
            setRecipes((oldRecipes) => {
                const newRecipes = [...oldRecipes]
                newRecipes[dayIndex] = [...newRecipes[dayIndex], getRecipe!]
                return newRecipes
            })
        } else {
            const getRecipe = recipes[parseInt(origin)].find((recipe) => recipe.id === recipeId)
            setRecipes((oldRecipes) => {
                const newRecipes = [...oldRecipes]
                newRecipes[dayIndex] = [...newRecipes[dayIndex], getRecipe!]
                let found = false
                newRecipes[parseInt(origin)] = newRecipes[parseInt(origin)].filter((recipe) => {
                    if (!found && recipe.id === recipeId) {
                        found = true
                        return false
                    }
                    return true
                })
                return newRecipes
            })
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    return (
        <>
            <h1 className='text-2xl mb-2'>Step 3: Plan Recipes</h1>
            <h2 className='text-lg m-2'>Drag recipes to different days or click to remove them</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 my-5 mx-6'>
                {Array.from({ length: 7 }, (_, i) => {
                    const d = new Date()
                    d.setDate(d.getDate() + i + 1)
                    return (
                        <div
                            key={i}
                            className='border-2 border-gray-200 p-4'
                            onDrop={(e) => handleOnDrop(e, i)}
                            onDragOver={handleDragOver}
                        >
                            <h2 className='text-xl font-bold mb-4'>{`${days[d.getDay()]} ${d.getDate()}/${
                                d.getMonth() + 1
                            }`}</h2>
                            <ul>
                                {recipes[i].map((recipe, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setRecipes((oldRecipes) => {
                                                const newRecipes = [...oldRecipes]
                                                let found = false
                                                newRecipes[i] = newRecipes[i].filter((newRecipe) => {
                                                    if (!found && newRecipe.id === recipe.id) {
                                                        found = true
                                                        return false
                                                    }
                                                    return true
                                                })
                                                return newRecipes
                                            })
                                        }}
                                        draggable
                                        onDragStart={(e) =>
                                            handleOnDrag(e, recipe.id.toString(), i.toString())
                                        }
                                    >
                                        {index !== 0 && <Separator className='my-4' />}
                                        <img
                                            src={`${recipe.image}`}
                                            alt={recipe.title}
                                            className='w-1/2 lg:w-full'
                                        />
                                        <span className='font-semibold'>{recipe.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default MealPlanner
