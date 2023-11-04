import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <div className='bg-background mt-auto pt-16 pb-8 flex flex-col items-center box-border'>
            <div className='footer-links w-full max-w-5xl flex justify-center'>
                <div className='footer-link-item flex flex-col items-start m-4 text-left w-40 box-border'>
                    <h2 className='text-md mb-4 text-inherit'>About Me</h2>
                    <Link className='text-inherit hover:text-gray-400' to='https://github.com/RafCami'>
                        GitHub
                    </Link>
                    <Link
                        className='text-inherit hover:text-gray-400'
                        to='https://www.linkedin.com/in/rafcami/'
                    >
                        LinkedIn
                    </Link>
                </div>
                <div className='footer-link-wrapper flex'>
                    <div className='footer-link-items flex flex-col items-start m-4 text-left w-40 box-border'>
                        <h2 className='text-md mb-4 text-inherit'>Pages</h2>
                        <Link className='text-inherit hover:text-gray-400' to='/'>
                            Home
                        </Link>
                        <Link className='text-inherit hover:text-gray-400' to='/Games'>
                            Games
                        </Link>
                        <Link className='text-inherit hover:text-gray-400' to='/Mealplanner'>
                            Meal Planner
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
