import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routing from './Routing'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ThemeProvider } from './context/theme-provider'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: false,
            refetchOnWindowFocus: import.meta.env.PROD,
        },
    },
})

function App() {
    return (
        <>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <QueryClientProvider client={queryClient}>
                    <div className='flex flex-col min-h-screen'>
                        <NavBar />
                        <Routing />
                        <Footer />
                    </div>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    )
}

export default App
