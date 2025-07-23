import { useTranslation } from 'react-i18next';
import githubIcon from '../assets/icons/github-icon.svg';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer pt-8 pb-4">
            <div className="container mx-auto mb-2 text-center flex justify-center items-center">
                <a
                    href="https://github.com/MrWinRock/MrWinRock"
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View on GitHub"
                >
                    <img
                        src={githubIcon}
                        alt="GitHub"
                        className="w-8 h-8 filter invert"
                    />
                </a>
            </div>
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MrWinRock. {t('footer.rights')}</p>
                <p className="text-gray-500 text-sm mt-2">
                    {t('footer.builtWith')}
                </p>
            </div>
            <div className="">
                <div className="container mx-auto text-center py-4">
                    <p className="text-gray-400 text-sm">
                        {t('footer.followMe')}{" "}
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
