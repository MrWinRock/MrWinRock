import { useRef, useState, type MouseEvent, type PropsWithChildren } from 'react';
import { motion, type MotionProps } from 'motion/react';
import './SpotLightCard.css';

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  motionProps?: MotionProps;
  index?: number;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(138, 43, 226, 0.22)',
  motionProps = {},
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
    node.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...motionProps}
      className={`surface-panel ${className}`}
    >
      <div
        aria-hidden="true"
        className={`spotlight-overlay${isHovered ? ' visible' : ''}`}
      />
      <div className="relative z-1 flex flex-1 flex-col">{children}</div>
    </motion.div>
  );
}
