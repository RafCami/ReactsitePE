import { FunctionComponent } from 'react'
import { Skeleton } from '../ui/skeleton'

interface GameListLoadingProps {}

const GameListLoading: FunctionComponent<GameListLoadingProps> = () => {
    return (
        <>
            <div className='text-center'>
                <h1 className='inline-block text-4xl my-24 border-4 rounded-lg p-4'>
                    Latest games with a Metacritic score over 80
                </h1>
            </div>
            <h2 className='text-xl font-bold mx-32 my-12'>
                Hover over a game to see screenshots. Click the screenshots to enlarge
            </h2>
            <div className='mx-28 mb-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((x) => (
                    <div key={x} className='rounded-md  border-2 p-4'>
                        <Skeleton className='text-2xl font-bold text-center my-4' />
                        <div className='aspect-video w-full'>
                            <Skeleton className='my-2 w-full h-full rounded-md' />
                        </div>
                        <Skeleton className='my-2 w-1/2 h-5 rounded-xl' />
                        <Skeleton className='my-2 w-1/4 h-5 rounded-xl' />
                        <Skeleton className='my-2 w-1/2 h-5 rounded-xl' />
                    </div>
                ))}
            </div>
        </>
    )
}

export default GameListLoading
