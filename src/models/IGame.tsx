import IPlatformContainer from './IPlatformContainer'
import IScreenshot from './IScreenshot'

export default interface IGameProps {
    id: number
    name: string
    released: string
    background_image: string
    metacritic: number
    platforms: IPlatformContainer[]
    short_screenshots: IScreenshot[]
}
