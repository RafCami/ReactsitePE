import axios from 'axios'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import Ingredient from '@/models/Ingredient'
import Recipe from '@/models/Recipe'

const client = axios.create({
    baseURL: 'https://api.spoonacular.com/',
})

const getIngredientAutocomplete = async (query: string): Promise<Ingredient[]> => {
    // https://api.spoonacular.com/food/ingredients/autocomplete?query=appl&number=5
    const { data } = await client.get(`food/ingredients/autocomplete`, {
        params: {
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
            query: query,
            number: 10,
        },
    })
    // delay to test suspense
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return data
}

export const useGetIngredientAutocomplete = (query: string): UseQueryResult<Ingredient[], Error> => {
    return useQuery({
        queryKey: ['query', query],
        queryFn: async () => await getIngredientAutocomplete(query),
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: query !== '',
    })
}

const getIngredient = async (query: string): Promise<Ingredient> => {
    // https://api.spoonacular.com/food/ingredients/search?query=banana&number=1
    const { data } = await client.get(`food/ingredients/search`, {
        params: {
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
            query: query,
            number: 1,
        },
    })
    // delay to test suspense
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return data.results.length > 0 ? data.results[0] : null
}

export const useGetIngredient = (query: string): UseQueryResult<Ingredient, Error> => {
    return useQuery({
        queryKey: ['query', query],
        queryFn: async () => await getIngredient(query),
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: query !== '',
    })
}

const getRecipes = async (query: string): Promise<Recipe[]> => {
    // https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
    const { data } = await client.get(`recipes/findByIngredients`, {
        params: {
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
            ingredients: query,
            number: 10,
        },
    })
    // delay to test suspense
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return data
}

export const useGetRecipes = (query: string): UseQueryResult<Recipe[], Error> => {
    return useQuery({
        queryKey: ['ingredients', query],
        queryFn: async () => await getRecipes(query),
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: query !== '',
    })
}
