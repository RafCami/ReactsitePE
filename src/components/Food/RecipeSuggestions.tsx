import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import FoodContext from '@/context/FoodContext'
import { useGetRecipes } from '@/api/SpoonacularAPI'
import { Skeleton } from '../ui/skeleton'
import Ingredient from '@/models/Ingredient'

interface RecipeSuggestionsProps {
    skeleton?: boolean
}

const RecipeSuggestions: FunctionComponent<RecipeSuggestionsProps> = ({ skeleton = false }) => {
    const { ingredients, recipes, setRecipes } = useContext(FoodContext)
    const [localIngredients, setLocalIngredients] = useState<Ingredient[]>(ingredients)
    const [ingredientList, setIngredientList] = useState<string>('')
    const { data: recipeList } = useGetRecipes(ingredientList)

    useEffect(() => {
        setLocalIngredients(ingredients)
    }, [ingredients])

    useEffect(() => {
        if (localIngredients.length > 0) {
            const ingredientString = localIngredients.map((ingredient) => ingredient.name).join(',')
            setIngredientList(ingredientString)
        } else {
            setIngredientList('')
        }
    }, [localIngredients])

    useEffect(() => {
        recipeList && recipeList.length > 0 ? setRecipes(recipeList) : setRecipes([])
    }, [recipeList])

    const handleOnDrag = (e: React.DragEvent, recipeId: string) => {
        e.dataTransfer.setData('Recipe', recipeId)
        e.dataTransfer.setData('Origin', 'suggestions')
    }

    return (
        <>
            <ScrollArea className='h-96 w-4/5 rounded-md border my-5 mx-auto'>
                <Table>
                    <TableCaption>Drag recipe to the desired day in the meal planner</TableCaption>
                    <TableHeader className='sticky'>
                        <TableRow>
                            <TableHead className='w-[100px]'>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Used Ingredients</TableHead>
                            <TableHead>Missing Ingredients</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!skeleton &&
                            recipes &&
                            recipes.length > 0 &&
                            recipes.map((recipe) => (
                                <TableRow
                                    key={recipe.id}
                                    draggable
                                    onDragStart={(e) => handleOnDrag(e, recipe.id.toString())}
                                >
                                    <TableCell>
                                        <img src={`${recipe.image}`} alt={recipe.title} />
                                    </TableCell>
                                    <TableCell className='text-left'>{recipe.title}</TableCell>
                                    <TableCell>
                                        <ul>
                                            {recipe.usedIngredients.map((ingredient, index) => (
                                                <li key={ingredient.id}>
                                                    {ingredient.name}
                                                    {index !== recipe.unusedIngredients.length - 1 && ','}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <ul>
                                            {recipe.missedIngredients.map((ingredient, index) => (
                                                <li key={ingredient.id}>
                                                    {ingredient.name}
                                                    {index !== recipe.missedIngredients.length - 1 && ','}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {skeleton && (
                            <TableRow key={0}>
                                <TableCell>
                                    <Skeleton className='h-12 w-12 rounded-full' />
                                </TableCell>
                                <TableCell className='text-left'>
                                    <Skeleton className='h-4 w-[250px]' />
                                </TableCell>
                                <TableCell>
                                    <ul>
                                        <li>
                                            <Skeleton className='h-4 w-[250px]' />
                                        </li>
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <ul>
                                        <li>
                                            <Skeleton className='h-4 w-[250px]' />
                                        </li>
                                    </ul>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </>
    )
}

export default RecipeSuggestions
