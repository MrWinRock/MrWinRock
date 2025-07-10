import { motion } from "motion/react";

const Construction = () => {
    return (
        <div className="flex flex-col">
            <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                🚧 Under Construction...
            </motion.h1>
            <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                I'm working on this portfolio, please check back later!
            </motion.p>
        </div>
    )
}

export default Construction;