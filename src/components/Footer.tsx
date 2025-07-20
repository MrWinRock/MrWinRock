
const Footer = () => {
    return (
        <footer className="footer pt-8 pb-4">
            <div className="container mx-auto text-center flex justify-center items-center">
                <a
                    href="https://github.com/MrWinRock/MrWinRock"
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on GitHub"
                >
                    <img
                        src="../src/assets/icons/github-icon.svg"
                        alt="GitHub"
                        className="w-8 h-8 filter invert"
                    />
                </a>
            </div>
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MrWinRock. All rights reserved.</p>
                <p className="text-gray-500 text-sm mt-2">
                    Built with React, TypeScript, and Tailwind CSS
                </p>
            </div>
            <div className="">
                <div className="container mx-auto text-center py-4">
                    <p className="text-gray-400 text-sm">
                        Follow me on{" "}
                        <a href="https://github.com/MrWinRock" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>{" "}
                        and{" "}
                        <a href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
