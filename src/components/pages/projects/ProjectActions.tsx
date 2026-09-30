
import { useTranslation } from "react-i18next";
import githubIcon from "../../../assets/icons/github-icon.svg";
import { safeExternalUrl } from "../../../lib/safeExternalUrl";

interface ProjectActionsProps {
    url: unknown;
    repo: unknown;
    delay?: number;
}

export const ProjectActions = ({ url, repo }: ProjectActionsProps) => {
    const { t } = useTranslation();
    const liveUrl = safeExternalUrl(url);
    const repositoryUrl = safeExternalUrl(repo);

    return (
        <div
            className="flex justify-between items-center mt-auto"
        >
            {liveUrl ? (
                <a
                    href={liveUrl}
                    className="s-button flex flex-row items-center gap-2 px-4 py-2 text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("projects.viewLive")}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                    >
                        <path d="M18 13V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                </a>
            ) : (
                <span className="s-button px-4 py-2 text-sm font-medium opacity-50">
                    {t("projects.notAvailable")}
                </span>
            )}

            {repositoryUrl ? (
                <a
                    href={repositoryUrl}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t('projects.github')}
                >
                    <img
                        src={githubIcon}
                        alt="GitHub"
                        className="w-8 h-8 filter invert"
                    />
                </a>
            ) : (
                <div
                    className="p-2 rounded-full cursor-not-allowed opacity-30"
                    title={t('projects.noRepository')}
                >
                    <img
                        src={githubIcon}
                        alt="GitHub"
                        className="w-8 h-8 filter invert"
                    />
                </div>
            )}
        </div>
    );
};
