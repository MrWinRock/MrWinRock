import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './../css/navbar.css'

const Navbar = () => {

    return (
        <nav className="navbar flex items-center justify-between p-4 bg-gray-800 text-white z-10">
            <div className="flex flex-row items-center justify-center gap-4">
                <img src={logo} alt="Logo" />
                <a href="/" className="navbar-title text-[32px] font-[900] text-white">
                    MrWinRock
                </a>
            </div>
            <div className="hidden flex gap-6 items-center">
                <Link to="/" className="p-button">Home</Link>
                <Link to="/about" className="p-button">About</Link>
                <Link to="/skills" className="p-button">Skills</Link>
                <Link to="/projects" className="p-button">Projects</Link>
                <Link to="/experience" className="p-button">Experience</Link>
                <Link to="/contact" className="p-button">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;