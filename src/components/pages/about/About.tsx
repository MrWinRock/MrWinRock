import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About Me</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <motion.h2 className="text-2xl font-semibold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>My Story</motion.h2>
                        <motion.p className="text-gray-300 mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            Hi! I'm Pharthiwath Gristsoopharruth, a Computer Science student at Suan Sunandha Rajabhat University, based in Bangkok, Thailand.
                            I'm passionate about full-stack development and have a strong interest in cybersecurity.
                            I’ve worked on several projects including <a href="https://github.com/MrWinRock/stringy" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Stringy</a>,
                            a blog platform for IT discussions, and <a href="https://github.com/MrWinRock/chadchat" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Chadchat</a>,
                            a simple real-time one-on-one chat application.
                            Outside of coding, I enjoy gaming, exploring cybersecurity, watching football, and motorsport.
                            My goal is to grow into a senior role in the computer science field and contribute to impactful, secure software systems.
                        </motion.p>
                    </div>
                    <div>
                        <motion.h2 className="text-2xl font-semibold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>Education</motion.h2>
                        <motion.p className="text-gray-300"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            I'm currently pursuing a Bachelor's degree in Computer Science at Suan Sunandha Rajabhat University, with a GPA of 3.66.
                            My studies focus on artificial intelligence, full-stack web and mobile application development, backend systems, and cybersecurity.
                            This academic foundation, combined with hands-on projects, is shaping me into a versatile and forward-thinking developer.
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;