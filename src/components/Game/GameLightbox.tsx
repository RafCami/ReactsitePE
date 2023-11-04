import GameContext from '@/context/GameContext'
import { FunctionComponent, useContext } from 'react'
import { Lightbox } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface GameLightboxProps {}

const GameLightbox: FunctionComponent<GameLightboxProps> = () => {
    const { images, open, setOpen } = useContext(GameContext)
    return (
        <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={images.map((url) => ({
                src: url,
            }))}
        />
    )
}

export default GameLightbox
