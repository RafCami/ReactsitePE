import FlipCard from '@/components/Home/FlipCard'
import ParallaxBackground from '@/components/Home/ParallaxBackground'
import { FunctionComponent } from 'react'

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <>
            <ParallaxBackground />
            <div className='text-center'>
                <h1 className='inline-block text-4xl mt-20 border-4 rounded-lg p-4'>Go To</h1>
            </div>
            <div className='my-14 mx-28 grid grid-cols-1 md:grid-cols-2 gap-10 self-center'>
                <div className='col-span-1 justify-end items-end'>
                    <FlipCard
                        bgImage='images/Gamingbg.png'
                        linkurl='/Games'
                        popupImage='images/Morio.png'
                        titleImage='images/Gamingtitle.png'
                    />
                </div>
                <div className='col-span-1'>
                    <FlipCard
                        bgImage='images/Foodbg.png'
                        linkurl='/Mealplanner'
                        popupImage='images/Foodpop.png'
                        titleImage='images/Foodtitle.png'
                    />
                </div>
            </div>
        </>
    )
}

export default Home
