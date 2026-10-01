import type { PropsWithChildren } from 'react';
import { motion, type MotionProps } from 'motion/react';
interface SpotlightCardProps extends PropsWithChildren {
 className?: string;
 spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
 motionProps?: MotionProps;
 index?: number;
}
export default function SpotlightCard({children,className='',motionProps={}}:SpotlightCardProps) {
 return <motion.div initial={false} {...motionProps} className={`surface-panel ${className}`}><div className="flex flex-1 flex-col">{children}</div></motion.div>;
}
