
import { useTranslation } from "react-i18next";
import githubIcon from "../../../assets/icons/github-icon.svg";
import { safeExternalUrl } from "../../../lib/safeExternalUrl";
import { ArrowIcon } from '../../ArrowIcon';

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
                    <ArrowIcon />
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
