import React, { useRef, useState, useEffect } from "react";
import { motion, type MotionProps } from "motion/react";
import "./SpotLightCard.css";

type CSSVarName = `--${string}`;
type CSSVarValue = string | number;
const cssVar = (name: CSSVarName, value: CSSVarValue) =>
    ({ [name]: value } as Record<CSSVarName, CSSVarValue>);

interface SpotlightCardProps extends React.PropsWithChildren {
    className?: string;
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
    motionProps?: MotionProps;
    index?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 0, 255, 0.50)",
    motionProps = {},
    index = 0,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        overlayRef.current?.style.setProperty("--spotlight-color", spotlightColor);
    }, [spotlightColor]);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!containerRef.current || !overlayRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        overlayRef.current.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
        overlayRef.current.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
    };

    const activate = () => setActive(true);
    const deactivate = () => setActive(false);

    const defaultMotionProps: MotionProps = {
        initial: { opacity: 0, y: 50, rotateX: -15 },
        animate: { opacity: 1, y: 0, rotateX: 0 },
        transition: { duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 },
        whileHover: {

            transition: { duration: 0.3 },
        },
        whileTap: { scale: 0.97 },
    };

    const { whileHover: userWhileHover, ...restMotionProps } = motionProps;
    const baseWhileHover = defaultMotionProps.whileHover;

    let computedWhileHover: MotionProps["whileHover"];
    if (userWhileHover === undefined) {
        computedWhileHover = baseWhileHover;
    } else if (userWhileHover && typeof userWhileHover === "object" && !Array.isArray(userWhileHover)) {
        computedWhileHover = {
            ...(baseWhileHover as Record<string, unknown>),
            ...(userWhileHover as Record<string, unknown>),
        } as MotionProps["whileHover"];
    } else {
        computedWhileHover = userWhileHover;
    }

    const finalMotionProps: MotionProps = {
        ...defaultMotionProps,
        ...restMotionProps,
        whileHover: computedWhileHover,
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onFocus={activate}
            onBlur={deactivate}
            onMouseEnter={activate}
            onMouseLeave={deactivate}
            className={`relative rounded-3xl border overflow-hidden p-8 flex h-full ${className}`}
            style={{
                ...cssVar("--border-color", "rgb(38 38 38)"),
                backgroundColor: "rgb(42 42 42)",
                borderColor: "var(--border-color)",
                borderWidth: "1px",
                borderStyle: "solid",
            }}
            {...finalMotionProps}
        >
            <div ref={overlayRef} className={`spotlight-overlay ${active ? "visible" : ""}`} />

            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to right, rgba(147, 51, 234, 0.05), transparent, rgba(6, 182, 212, 0.05))",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-1 flex-col">
                {children}
            </div>
        </motion.div>
    );
};

export default SpotlightCard;