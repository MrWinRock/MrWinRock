import type { ReactNode } from 'react';

export function PageIntro({ title, titleId, description, descriptionId, actions }: {
    title: string;
    titleId?: string;
    description?: string;
    descriptionId?: string;
    actions?: ReactNode;
}) {
    return <header className="page-intro">
        <h1 className="page-title" id={titleId}>{title}</h1>
        {(description || actions) && <div className="page-intro-context">
            {description && <p id={descriptionId} className="page-description">{description}</p>}
            {actions && <div className="page-intro-actions">{actions}</div>}
        </div>}
    </header>;
}
