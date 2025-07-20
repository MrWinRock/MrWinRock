import { motion } from "motion/react";

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming Languages",
            skills: [
                { name: 'C', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg' },
                { name: 'C++', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
                { name: 'C#', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' },
                { name: 'Java', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
                { name: 'JavaScript', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
                { name: 'Python', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'Go', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg' },
                { name: 'Bash', image: 'https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg' },
            ]
        },
        {
            title: "Web Technologies",
            skills: [
                { name: 'HTML5', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg' },
                { name: 'CSS3', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg' },
                { name: 'React', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg' },
                { name: 'Node.js', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg' },
                { name: 'Express', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg' },
            ]
        },
        {
            title: "Mobile Development",
            skills: [
                { name: 'React Native', image: 'https://reactnative.dev/img/header_logo.svg' },
                { name: 'Flutter', image: 'https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg' },
            ]
        },
        {
            title: "Databases",
            skills: [
                { name: 'MySQL', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg' },
                { name: 'PostgreSQL', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg' },
                { name: 'MongoDB', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg' },
                { name: 'MariaDB', image: 'https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg' },
                { name: 'Firebase', image: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
            ]
        },
        {
            title: "Cloud & DevOps",
            skills: [
                { name: 'AWS', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
                { name: 'Google Cloud Platform', image: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg' },
                { name: 'Docker', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg' },
                { name: 'Heroku', image: 'https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg' },
            ]
        },
        {
            title: "Game Development",
            skills: [
                { name: 'Unity', image: 'https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg' },
                { name: 'Unreal Engine', image: 'https://raw.githubusercontent.com/kenangundogan/fontisto/036b7eca71aab1bef8e6a0518f7329f13ed62f6b/icons/svg/brand/unreal-engine.svg' },
            ]
        },
        {
            title: "Design & Tools",
            skills: [
                { name: 'Figma', image: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
                { name: 'Photoshop', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg' },
                { name: 'Blender', image: 'https://download.blender.org/branding/community/blender_community_badge_white.svg' },
            ]
        },
        {
            title: "Other Tools",
            skills: [
                { name: 'Git', image: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
                { name: 'Linux', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg' },
                { name: 'Arduino', image: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg' },
                { name: 'Postman', image: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
            ]
        }
    ];

    return (
        <motion.div
            className="min-h-screen p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    My Skills
                </motion.h1>

                <div className="space-y-12">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: categoryIndex * 0.2 + 0.4
                            }}
                        >
                            <motion.h2
                                className="text-2xl font-semibold mb-6 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: categoryIndex * 0.2 + 0.5 }}
                            >
                                {category.title}
                            </motion.h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        className="p-button p-4 flex flex-col gap-2 items-center justify-center text-center"
                                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.6,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            rotateY: 10,
                                            transition: { duration: 0.15 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.img
                                            src={skill.image}
                                            alt={skill.name}
                                            className="w-10 h-10"
                                            whileHover={{
                                                rotate: 360,
                                                transition: { duration: 0.6 }
                                            }}
                                        />
                                        <span className="text-sm font-semibold">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default Skills;