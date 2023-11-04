import { FunctionComponent, Suspense, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useGetIngredientAutocomplete } from '@/api/SpoonacularAPI'
import IngredientsList from './IngredientsList'

interface IngredientsInputProps {}

const IngredientsInput: FunctionComponent<IngredientsInputProps> = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [debouncedValue, setDebouncedValue] = useState<string>(inputValue)
    const { data: suggestions } = useGetIngredientAutocomplete(debouncedValue)
    const [searchValue, setSearchValue] = useState<string>('')

    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            setSearchValue(inputValue)
            setInputValue('')
            event.preventDefault() // Prevents the default action of the event
        }
    }

    //Set debounce time lower for production
    //set high to save api calls during development
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (inputValue.trim() !== debouncedValue.trim() && inputValue.trim() !== '')
                setDebouncedValue(inputValue)
        }, 2000)

        return () => {
            clearTimeout(timerId)
        }
    }, [inputValue])

    return (
        <div className='border-2 p-2 rounded-lg'>
            <h1 className='text-2xl mb-2'>Step 1: Choose Ingredients</h1>
            <h2 className='text-lg m-2'>Enter ingredients you have on hand</h2>
            <h3 className='text-xs mx-4 mt-2'>Wait 2 seconds after typing to get autocomplete suggestions</h3>
            <Input
                type='text'
                name='IngredientInput'
                className='my-3 w-1/2 lg:w-1/3 xl:w-1/4'
                placeholder='Enter an ingredient'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                list='suggestions'
            />
            <p className='text-sm mx-4'>Press enter to submit ingredient</p>
            <Suspense fallback={<div>Loading...</div>}>
                <datalist id='suggestions'>
                    {suggestions &&
                        suggestions.map((suggestion, index) => (
                            <option key={index} value={suggestion.name} />
                        ))}
                </datalist>
            </Suspense>
            <Suspense fallback={<IngredientsList search={''} skeleton={true} />}>
                <div className=''>
                    <IngredientsList search={searchValue} />
                </div>
            </Suspense>
        </div>
    )
}

export default IngredientsInput
