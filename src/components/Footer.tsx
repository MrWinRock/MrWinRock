import { useTranslation } from 'react-i18next';
export default function Footer() {
 const { t } = useTranslation();
 return <footer className="footer"><div className="footer-inner"><p>© {new Date().getFullYear()} MrWinRock. {t('footer.rights')}</p><div className="footer-links"><a href="https://github.com/MrWinRock" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></footer>;
}
