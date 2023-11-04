import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Food from './pages/Food'
import Error404 from './pages/404'

interface RoutingProps {}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/Games'} element={<Game />} />
            <Route path={'/Mealplanner'} element={<Food />} />
            <Route path={'*'} element={<Error404 />} />
        </Routes>
    )
}

export default Routing
