import { Dispatch, createContext } from 'react'

interface GameContextProps {
    images: string[]
    setImages: Dispatch<React.SetStateAction<string[]>>
    open: boolean
    setOpen: Dispatch<React.SetStateAction<boolean>>
}

const GameContext = createContext<GameContextProps>({
    images: [''],
    setImages: () => {},
    open: false,
    setOpen: () => {},
})

export default GameContext
