import GameLightbox from '@/components/Game/GameLightbox'
import GameList from '@/components/Game/GameList'
import GameListLoading from '@/components/Game/GameListLoading'
import GameContext from '@/context/GameContext'
import { FunctionComponent, Suspense, useState } from 'react'

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
    const [images, setImages] = useState<string[]>([''])
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <GameContext.Provider
                value={{
                    images: images,
                    setImages: setImages,
                    open: open,
                    setOpen: setOpen,
                }}
            >
                <Suspense fallback={<GameListLoading />}>
                    <GameList />
                    <GameLightbox />
                </Suspense>
            </GameContext.Provider>
        </>
    )
}

export default Game
