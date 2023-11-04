import { useGetLatest80PlusGames } from '@/api/RawgAPI'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import GameContext from '@/context/GameContext'

interface GameListProps {}

const GameList: FunctionComponent<GameListProps> = () => {
    const { data: games } = useGetLatest80PlusGames()
    const [currentScreenshotIndices, setCurrentScreenshotIndices] = useState<Record<number, number>>({})
    const { setImages, setOpen } = useContext(GameContext)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentScreenshotIndices((indices) => {
                const newIndices = { ...indices }
                if (games) {
                    games.forEach((game) => {
                        const validScreenshots = game.short_screenshots.filter(
                            (screenshot) => screenshot.id !== -1
                        )
                        if (validScreenshots.length > 0) {
                            newIndices[game.id] =
                                ((newIndices[game.id] !== undefined ? newIndices[game.id] : -1) + 1) %
                                validScreenshots.length
                        }
                    })
                }
                return newIndices
            })
        }, 2500)
        return () => {
            clearInterval(interval)
        }
    }, [games])

    const setLightbox = (index: number) => {
        setOpen(true)
        if (games) setImages(games[index].short_screenshots.map((screenshot) => screenshot.image))
    }

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
                {games &&
                    games.map((game, index) => {
                        const validScreenshots = game.short_screenshots.filter(
                            (screenshot) => screenshot.id !== -1
                        )
                        return (
                            <HoverCard key={game.id}>
                                <HoverCardTrigger asChild>
                                    <div key={game.id} className='rounded-md  border-2 p-4'>
                                        <h2 className='text-2xl font-bold text-center my-4'>{game.name}</h2>
                                        <div className='aspect-video relative'>
                                            <img
                                                src={game.background_image}
                                                alt={game.name}
                                                className='rounded-md'
                                            />
                                        </div>
                                        <p className='my-2'>
                                            <span className='font-bold'>Released:</span> {game.released}
                                        </p>
                                        <p className='my-2'>
                                            <span className='font-bold'>Metacritic:</span>{' '}
                                            <span
                                                className={`rounded-md p-1 ${
                                                    game.metacritic < 90 ? 'bg-orange-500' : 'bg-green-500'
                                                }`}
                                            >
                                                {game.metacritic}
                                            </span>
                                        </p>
                                        <p className='my-2'>
                                            <span className='font-bold'>Platforms:</span>{' '}
                                            {game.platforms
                                                .map((platform) => platform.platform.name)
                                                .join(', ')}
                                        </p>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className='w-80'>
                                    <div className='flex justify-between space-x-4 aspect-video relative'>
                                        {validScreenshots.length > 0 &&
                                            currentScreenshotIndices[game.id] !== undefined &&
                                            currentScreenshotIndices[game.id] < validScreenshots.length && (
                                                <img
                                                    src={
                                                        validScreenshots[currentScreenshotIndices[game.id]]
                                                            .image
                                                    }
                                                    alt={game.name}
                                                    className='rounded-md'
                                                    onClick={() => setLightbox(index)}
                                                />
                                            )}
                                    </div>
                                    <p className='text-center text-gray-500 text-sm'>
                                        {currentScreenshotIndices[game.id] + 1}/{validScreenshots.length}
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        )
                    })}
            </div>
            {/* {lbImages.length > 0 && (<Lightbox 
                open={lbOpen}
                close={() => setLbOpen(false)}
                slides={lbImages.map(url => ({
                  src: url,
                  // width: 320,
                  // height: 213,
                }))}
              />)} */}
            <footer className='text-center text-gray-500 text-sm'>
                <p>
                    Powered by{' '}
                    <a
                        href='https://rawg.io/apidocs'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline'
                    >
                        RAWG API
                    </a>
                </p>
            </footer>
        </>
    )
}

export default GameList
