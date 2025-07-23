import { motion } from "motion/react";

// Programming Languages
import c_original from "./../../../images/skills/c-original.svg";
import cplusplus_original from "./../../../images/skills/cplusplus-original.svg";
import csharp_original from "./../../../images/skills/csharp-original.svg";
import javascript_original from "./../../../images/skills/javascript-original.svg";
import typescript_original from "./../../../images/skills/typescript-original.svg";
import java_original from "./../../../images/skills/java-original.svg";
import kotlinlang_icon from "./../../../images/skills/kotlinlang-icon.svg";
import python_original from "./../../../images/skills/python-original.svg";
import go_original from "./../../../images/skills/go-original.svg";
import gnu_bash_icon from "./../../../images/skills/gnu_bash-icon.svg";

// Web Technologies
import html5_original_wordmark from "./../../../images/skills/html5-original-wordmark.svg";
import css3_original_wordmark from "./../../../images/skills/css3-original-wordmark.svg";
import react_original_wordmark from "./../../../images/skills/react-original-wordmark.svg";
import nodejs_original_wordmark from "./../../../images/skills/nodejs-original-wordmark.svg";
import express_original_wordmark from "./../../../images/skills/express-original-wordmark.svg";
import socketio_icon from "./../../../images/skills/socketio-icon.svg";

// Mobile Development
import header_logo from "./../../../images/skills/header_logo.svg";
import flutterio_icon from "./../../../images/skills/flutterio-icon.svg";

// Databases
import mysql_original_wordmark from "./../../../images/skills/mysql-original-wordmark.svg";
import postgresql_original_wordmark from "./../../../images/skills/postgresql-original-wordmark.svg";
import mongodb_original_wordmark from "./../../../images/skills/mongodb-original-wordmark.svg";
import mariadb_icon from "./../../../images/skills/mariadb-icon.svg";
import firebase_icon from "./../../../images/skills/firebase-icon.svg";

// Cloud & DevOps
import amazonwebservices_original_wordmark from "./../../../images/skills/amazonwebservices-original-wordmark.svg";
import google_cloud_icon from "./../../../images/skills/google_cloud-icon.svg";
import docker_original_wordmark from "./../../../images/skills/docker-original-wordmark.svg";
import heroku_icon from "./../../../images/skills/heroku-icon.svg";

// Game Development
import unity3d_icon from "./../../../images/skills/unity3d-icon.svg";
import unreal_engine from "./../../../images/skills/unreal-engine.svg";

// Design & Tools
import figma_icon from "./../../../images/skills/figma-icon.svg";
import photoshop_line from "./../../../images/skills/photoshop-line.svg";
import blender_community_badge from "./../../../images/skills/blender_community_badge_white.svg";

// Other Tools
import git_scm_icon from "./../../../images/skills/git-scm-icon.svg";
import linux_original from "./../../../images/skills/linux-original.svg";
import arduino_icon from "./../../../images/skills/arduino-1.svg";
import postman_icon from "./../../../images/skills/getpostman-icon.svg";

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming Languages",
            skills: [
                { name: 'C', image: c_original },
                { name: 'C++', image: cplusplus_original },
                { name: 'C#', image: csharp_original },
                { name: 'JavaScript', image: javascript_original },
                { name: 'TypeScript', image: typescript_original },
                { name: 'Java', image: java_original },
                { name: 'Kotlin', image: kotlinlang_icon },
                { name: 'Python', image: python_original },
                { name: 'Go', image: go_original },
                { name: 'Bash', image: gnu_bash_icon },
            ]
        },
        {
            title: "Web Technologies",
            skills: [
                { name: 'HTML5', image: html5_original_wordmark },
                { name: 'CSS3', image: css3_original_wordmark },
                { name: 'React', image: react_original_wordmark },
                { name: 'Node.js', image: nodejs_original_wordmark },
                { name: 'Express', image: express_original_wordmark },
                { name: 'Socket.io', image: socketio_icon },
            ]
        },
        {
            title: "Mobile Development",
            skills: [
                { name: 'React Native', image: header_logo },
                { name: 'Flutter', image: flutterio_icon },
            ]
        },
        {
            title: "Databases",
            skills: [
                { name: 'MySQL', image: mysql_original_wordmark },
                { name: 'PostgreSQL', image: postgresql_original_wordmark },
                { name: 'MongoDB', image: mongodb_original_wordmark },
                { name: 'MariaDB', image: mariadb_icon },
                { name: 'Firebase', image: firebase_icon },
            ]
        },
        {
            title: "Cloud & DevOps",
            skills: [
                { name: 'AWS', image: amazonwebservices_original_wordmark },
                { name: 'Google Cloud Platform', image: google_cloud_icon },
                { name: 'Docker', image: docker_original_wordmark },
                { name: 'Heroku', image: heroku_icon },
            ]
        },
        {
            title: "Game Development",
            skills: [
                { name: 'Unity', image: unity3d_icon },
                { name: 'Unreal Engine', image: unreal_engine },
            ]
        },
        {
            title: "Design & Tools",
            skills: [
                { name: 'Figma', image: figma_icon },
                { name: 'Photoshop', image: photoshop_line },
                { name: 'Blender', image: blender_community_badge },
            ]
        },
        {
            title: "Other Tools",
            skills: [
                { name: 'Git', image: git_scm_icon },
                { name: 'Linux', image: linux_original },
                { name: 'Arduino', image: arduino_icon },
                { name: 'Postman', image: postman_icon },
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
                                    >
                                        <motion.img
                                            src={skill.image}
                                            alt={skill.name}
                                            className="w-10 h-10"
                                            whileHover={{
                                                scale: 1.1,
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