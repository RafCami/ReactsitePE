import axios from 'axios'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import IGame from '@/models/IGame'

const client = axios.create({
    baseURL: 'https://api.rawg.io/api/',
})

const getLatest80PlusGames = async (): Promise<IGame[]> => {
    // https://api.rawg.io/api/games?page=1&page_size=15&metacritic=80,100&ordering=-released
    const { data } = await client.get(`games`, {
        params: {
            key: import.meta.env.VITE_RAWG_API_KEY,
            page: 1,
            page_size: 15,
            metacritic: '80,100',
            ordering: '-released',
        },
    })
    //delay to test suspense
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return data.results
}

export const useGetLatest80PlusGames = (): UseQueryResult<IGame[], Error> => {
    return useQuery({
        queryKey: ['80PlusMetacritic'],
        queryFn: async () => await getLatest80PlusGames(),
        staleTime: Infinity,
        cacheTime: Infinity,
    })
}
//https://api.rawg.io/api/games?page=1&page_size=15&metacritic=80,100&ordering=-released
