import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

interface FlipCardProps {
    bgImage: string
    titleImage: string
    popupImage: string
    linkurl: string
}

const FlipCard: FunctionComponent<FlipCardProps> = ({ bgImage, titleImage, popupImage, linkurl }) => {
    return (
        <>
            <Link to={linkurl}>
                <div className='flipcard'>
                    <div className='wrapper'>
                        <img src={bgImage} className='flipcard-bg-image' />
                    </div>
                    <img src={titleImage} className='flipcard-title-image' />
                    <img src={popupImage} className='flipcard-popup-image' />
                </div>
            </Link>
        </>
    )
}

export default FlipCard
