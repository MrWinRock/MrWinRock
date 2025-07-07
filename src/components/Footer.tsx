
const Footer = () => {
    return (
        <footer className="footer pt-8 pb-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MrWinRock. All rights reserved.</p>
                <p className="text-gray-500 text-sm mt-2">
                    Built with React, TypeScript, and Tailwind CSS
                </p>
            </div>
        </footer>
    );
};

export default Footer;
