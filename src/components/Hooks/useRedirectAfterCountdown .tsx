import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseRedirectAfterCountdownParams {
    destination: string
    timeout?: number
    enabled: boolean
}

const useRedirectAfterCountdown = ({
    destination,
    timeout,
    enabled,
}: UseRedirectAfterCountdownParams): void => {
    // Use the default value when the user didn't specify a specific timeout.
    timeout = timeout ?? 2000
    const navigate = useNavigate()

    useEffect(() => {
        if (enabled) {
            const timeoutId = setTimeout(() => navigate(destination), timeout)
            return () => clearTimeout(timeoutId)
        }
    }, [enabled, navigate, timeout, destination])
}

export default useRedirectAfterCountdown
