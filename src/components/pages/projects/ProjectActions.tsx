
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
            className="project-actions"
        >
            {liveUrl ? (
                <a
                    href={liveUrl}
                    className="project-action-live"
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
                <span className="project-action-live project-action-unavailable" aria-disabled="true">
                    {t("projects.notAvailable")}
                </span>
            )}

            {repositoryUrl ? (
                <a
                    href={repositoryUrl}
                    className="project-action-repository"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t('projects.github')}
                >
                    <img
                        src={githubIcon}
                        alt="GitHub"
                        className="filter invert"
                    />
                </a>
            ) : (
                <div
                    className="project-action-repository project-action-unavailable" aria-disabled="true"
                    title={t('projects.noRepository')}
                >
                    <img
                        src={githubIcon}
                        alt="GitHub"
                        className="filter invert"
                    />
                </div>
            )}
        </div>
    );
};
