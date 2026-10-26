export function ArrowIcon({ back = false }: { back?: boolean }) {
    return <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={back ? 'M19 12H5m7 7-7-7 7-7' : 'M5 19 19 5M5 5h14v14'} /></svg>;
}
