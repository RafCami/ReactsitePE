import useRedirectAfterCountdown from '@/components/Hooks/useRedirectAfterCountdown '
import { FunctionComponent } from 'react'

interface Error404Props {}

const Error404: FunctionComponent<Error404Props> = () => {
    useRedirectAfterCountdown({ destination: '/', timeout: 5000, enabled: true })

    return (
        <>
            <h1 className='text-4xl underline text-center my-24'>404: Page not found!</h1>
            <h2 className='text-xl text-center'>You will be redirected to the home page...</h2>
        </>
    )
}

export default Error404
