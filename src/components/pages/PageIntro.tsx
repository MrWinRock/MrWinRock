import type { ReactNode } from 'react';

export function PageIntro({ title, titleId, description, actions }: {
    title: string;
    titleId?: string;
    description?: string;
    actions?: ReactNode;
}) {
    return <header className="page-intro">
        <div className="page-intro-copy">
            <h1 className="page-title" id={titleId}>{title}</h1>
            {description && <p className="page-description">{description}</p>}
        </div>
        {actions && <div className="page-intro-actions">{actions}</div>}
    </header>;
}
