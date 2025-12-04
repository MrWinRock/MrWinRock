import Construction from "@/components/Construction";
import { motion } from "framer-motion";

const Experience = () => {
    return (
        <motion.div
            className="min-h-screen p-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Construction />
        </motion.div>
    );
};

export default Experience;