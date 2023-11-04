import FoodContext from '@/context/FoodContext'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useGetIngredient } from '@/api/SpoonacularAPI'
import Ingredient from '@/models/Ingredient'
import { Skeleton } from '../ui/skeleton'

interface IngredientsListProps {
    search: string
    skeleton?: boolean
}

const IngredientsList: FunctionComponent<IngredientsListProps> = ({ search, skeleton = false }) => {
    const { ingredients, setIngredients } = useContext(FoodContext)
    const { data: ingredientResult } = useGetIngredient(search)
    const [newIngredient, setNewIngredient] = useState<Ingredient | null>(null)

    const handleRemove = (id: number) => {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== id))
    }

    useEffect(() => {
        if (ingredientResult) {
            setNewIngredient(ingredientResult)
        }
    }, [ingredientResult])

    useEffect(() => {
        if (newIngredient && newIngredient.id !== 0) {
            if (!ingredients.some((ingredient) => ingredient.id === newIngredient.id)) {
                setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
            }
            setNewIngredient(null)
        }
    }, [newIngredient])

    return (
        <Table className='w-full lg:w-3/4 mx-auto'>
            <TableCaption>Click to remove ingredient</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[100px]'>Image</TableHead>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id} onClick={() => handleRemove(ingredient.id)}>
                        <TableCell>
                            <img
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                                alt={ingredient.name}
                            />
                        </TableCell>
                        <TableCell className='text-left'>{ingredient.name}</TableCell>
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
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default IngredientsList
