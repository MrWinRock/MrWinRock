// Programming Languages
import c_original from "../images/skills/c-original.svg";
import cplusplus_original from "../images/skills/cplusplus-original.svg";
import csharp_original from "../images/skills/csharp-original.svg";
import javascript_original from "../images/skills/javascript-original.svg";
import typescript_original from "../images/skills/typescript-original.svg";
import java_original from "../images/skills/java-original.svg";
import kotlinlang_icon from "../images/skills/kotlinlang-icon.svg";
import python_original from "../images/skills/python-original.svg";
import go_original from "../images/skills/go-original.svg";
import gnu_bash_icon from "../images/skills/gnu_bash-icon.svg";

// Web Technologies
import html5_original_wordmark from "../images/skills/html5-original-wordmark.svg";
import css3_original_wordmark from "../images/skills/css3-original-wordmark.svg";
import react_original_wordmark from "../images/skills/react-original-wordmark.svg";
import nodejs_original_wordmark from "../images/skills/nodejs-original-wordmark.svg";
import express_original_wordmark from "../images/skills/express-original-wordmark.svg";
import socketio_icon from "../images/skills/socketio-icon.svg";

// Mobile Development
import header_logo from "../images/skills/header_logo.svg";
import flutterio_icon from "../images/skills/flutterio-icon.svg";

// Databases
import mysql_original_wordmark from "../images/skills/mysql-original-wordmark.svg";
import postgresql_original_wordmark from "../images/skills/postgresql-original-wordmark.svg";
import mongodb_original_wordmark from "../images/skills/mongodb-original-wordmark.svg";
import mariadb_icon from "../images/skills/mariadb-icon.svg";
import firebase_icon from "../images/skills/firebase-icon.svg";

// Cloud & DevOps
import amazonwebservices_original_wordmark from "../images/skills/amazonwebservices-original-wordmark.svg";
import google_cloud_icon from "../images/skills/google_cloud-icon.svg";
import docker_original_wordmark from "../images/skills/docker-original-wordmark.svg";
import heroku_icon from "../images/skills/heroku-icon.svg";

// Game Development
import unity3d_icon from "../images/skills/unity3d-icon.svg";
import unreal_engine from "../images/skills/unreal-engine.svg";

// Design & Tools
import figma_icon from "../images/skills/figma-icon.svg";
import photoshop_line from "../images/skills/photoshop-line.svg";
import blender_community_badge from "../images/skills/blender_community_badge_white.svg";

// Other Tools
import git_scm_icon from "../images/skills/git-scm-icon.svg";
import linux_original from "../images/skills/linux-original.svg";
import arduino_icon from "../images/skills/arduino-1.svg";
import postman_icon from "../images/skills/getpostman-icon.svg";

// Export a function that takes the translation function as parameter
export const getSkillCategories = (t: (key: string) => string) => [
    {
        title: t("skills.categories.programming"),
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
        title: t("skills.categories.web"),
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
        title: t("skills.categories.mobile"),
        skills: [
            { name: 'React Native', image: header_logo },
            { name: 'Flutter', image: flutterio_icon },
        ]
    },
    {
        title: t("skills.categories.databases"),
        skills: [
            { name: 'MySQL', image: mysql_original_wordmark },
            { name: 'PostgreSQL', image: postgresql_original_wordmark },
            { name: 'MongoDB', image: mongodb_original_wordmark },
            { name: 'MariaDB', image: mariadb_icon },
            { name: 'Firebase', image: firebase_icon },
        ]
    },
    {
        title: t("skills.categories.cloud"),
        skills: [
            { name: 'AWS', image: amazonwebservices_original_wordmark },
            { name: 'Google Cloud Platform', image: google_cloud_icon },
            { name: 'Docker', image: docker_original_wordmark },
            { name: 'Heroku', image: heroku_icon },
        ]
    },
    {
        title: t("skills.categories.game"),
        skills: [
            { name: 'Unity', image: unity3d_icon },
            { name: 'Unreal Engine', image: unreal_engine },
        ]
    },
    {
        title: t("skills.categories.design"),
        skills: [
            { name: 'Figma', image: figma_icon },
            { name: 'Photoshop', image: photoshop_line },
            { name: 'Blender', image: blender_community_badge },
        ]
    },
    {
        title: t("skills.categories.other"),
        skills: [
            { name: 'Git', image: git_scm_icon },
            { name: 'Linux', image: linux_original },
            { name: 'Arduino', image: arduino_icon },
            { name: 'Postman', image: postman_icon },
        ]
    }
];