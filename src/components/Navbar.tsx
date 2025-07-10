import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar xl:px-4 ">
            <div className='flex max-w-[1200px] mx-auto items-center justify-between p-4'>
                <div className="flex flex-row items-center justify-center gap-1 xl:gap-4">
                    <Link to="/" className="flex flex-row text-[1.5rem] xl:text-[2rem] font-[900] items-center">
                        <img src={logo} alt="Logo" />
                        <span className='navbar-title'>MrWinRock</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex lg:gap-4 xl:gap-6 items-center">
                    <Link to="/" className="p-button">Home</Link>
                    <Link to="/about" className="p-button">About</Link>
                    <Link to="/skills" className="p-button">Skills</Link>
                    <Link to="/projects" className="p-button">Projects</Link>
                    {/* <Link to="/experience" className="p-button">Experience</Link> */}
                    {/* <Link to="/contact" className="p-button">Contact</Link> */}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="flex flex-col gap-4 p-4 width-full">
                    <Link to="/" className="p-button text-center" onClick={closeMenu}>Home</Link>
                    <Link to="/about" className="p-button text-center" onClick={closeMenu}>About</Link>
                    <Link to="/skills" className="p-button text-center" onClick={closeMenu}>Skills</Link>
                    <Link to="/projects" className="p-button text-center" onClick={closeMenu}>Projects</Link>
                    {/* <Link to="/experience" className="p-button text-center" onClick={closeMenu}>Experience</Link> */}
                    {/* <Link to="/contact" className="p-button text-center" onClick={closeMenu}>Contact</Link> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;