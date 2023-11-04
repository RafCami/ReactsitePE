import { FunctionComponent, useEffect, useState } from 'react'
import { Badge } from '../ui/badge'

interface ParallaxBackgroundProps {}

const ParallaxBackground: FunctionComponent<ParallaxBackgroundProps> = () => {
    const [offsetY, setOffsetY] = useState(0)

    const handleScroll = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className='relative overflow-hidden h-1/2'>
            <div
                className='absolute top-0 left-0 w-full h-[150%] bg-center bg-no-repeat bg-cover'
                style={{
                    backgroundImage: `url('/images/code-1839406_1920.jpg')`,
                    transform: `translateY(${-offsetY * 0.5}px)`,
                }}
            />
            <div className='absolute top-0 left-0 w-full h-full flex items-center lg:items-start lg:mt-1/8 justify-center lg:justify-end lg:pr-28'>
                <Badge>
                    <h1 className='text-4xl text-inherit text-center p-12'>
                        {' '}
                        Welcome
                        <br /> To My React Webpage!{' '}
                    </h1>
                </Badge>
            </div>
        </div>
    )
}

export default ParallaxBackground
