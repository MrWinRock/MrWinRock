// Programming Languages
import c_original from "../images/skills/c-original.svg";
import cplusplus_original from "../images/skills/cplusplus-original.svg";
import csharp_original from "../images/skills/csharp-original.svg";
import javascript_original from "../images/skills/javascript-original.svg";
import typescript_original from "../images/skills/typescript-original.svg";
import java_original from "../images/skills/java-original.svg";
import kotlinlang_icon from "../images/skills/kotlinlang-icon.svg";
import python_original from "../images/skills/python-original.svg";
import dart_icon from "../images/skills/logo_dart_192px.svg";
import go_original from "../images/skills/go-original.svg";
import gnu_bash_icon from "../images/skills/gnu_bash-icon.svg";

// Web Development
import html5_original_wordmark from "../images/skills/html5-original-wordmark.svg";
import css3_original_wordmark from "../images/skills/css3-original-wordmark.svg";
import react_original_wordmark from "../images/skills/react-original-wordmark.svg";
import tailwindcss_icon from "../images/skills/tailwind-css.svg";
import bootstrap_logo from "../images/skills/bootstrap-logo.svg";
import motion_logo from "../images/skills/motion.png";

// Mobile Development
import react_logo from "../images/skills/react_logo.svg";
import flutterio_icon from "../images/skills/flutterio-icon.svg";
import expo_icon from "../images/skills/expo-1.svg";

// Backend Technologies
import nodejs_original_wordmark from "../images/skills/nodejs-original-wordmark.svg";
import express_original_wordmark from "../images/skills/express-original-wordmark.svg";
import socketio_icon from "../images/skills/socketio-icon.svg";
import spring_boot_icon from "../images/skills/icon-spring-boot.svg";
import jwt_icon from "../images/skills/jwt-3.svg";

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
import github_actions_icon from "../images/skills/github-icon.svg";

// Dev Tools
import vscode_icon from "../images/skills/vscode-original.svg";
import androidstudio_icon from "../images/skills/androidstudio-original.svg";
import intellij_icon from "../images/skills/intellij-original.svg";

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
import npm_icon from "../images/skills/npm-original-wordmark.svg";
import bun from "../images/skills/bun-1.svg";
import eslint_icon from "../images/skills/eslint-original.svg";
import playwright from "../images/skills/idVX2ElrpI_1754279985033.png";
import robot_framework from "../images/skills/robotframework-svgrepo-com.svg";

export const getSkillCategories = (t: (key: string) => string) => [
    {
        title: t("skills.categories.programming"),
        skills: [
            { name: 'C', image: c_original },
            { name: 'C++', image: cplusplus_original },
            { name: 'C#', image: csharp_original },
            { name: 'JavaScript', image: javascript_original },
            { name: 'TypeScript', image: typescript_original },
            { name: 'JSX/TSX', image: react_logo },
            { name: 'Java', image: java_original },
            { name: 'Kotlin', image: kotlinlang_icon },
            { name: 'Python', image: python_original },
            { name: 'Go', image: go_original },
            { name: 'Dart', image: dart_icon },
            { name: 'Bash', image: gnu_bash_icon },
        ]
    },
    {
        title: t("skills.categories.web"),
        skills: [
            { name: 'HTML5', image: html5_original_wordmark },
            { name: 'CSS3', image: css3_original_wordmark },
            { name: 'React', image: react_original_wordmark },
            { name: 'Motion', image: motion_logo },
            { name: 'Tailwind CSS', image: tailwindcss_icon },
            { name: 'Bootstrap', image: bootstrap_logo },
        ]
    },
    {
        title: t("skills.categories.mobile"),
        skills: [
            { name: 'React Native', image: react_logo },
            { name: 'Flutter', image: flutterio_icon },
            { name: 'Expo', image: expo_icon },
        ]
    },
    {
        title: t("skills.categories.backend"),
        skills: [
            { name: 'Node.js', image: nodejs_original_wordmark },
            { name: 'Express', image: express_original_wordmark },
            { name: 'Socket.io', image: socketio_icon },
            { name: 'Spring Boot', image: spring_boot_icon },
            { name: 'JSON Web Tokens (JWT)', image: jwt_icon },
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
            { name: 'Github Actions', image: github_actions_icon },
        ]
    },
    {
        title: t("skills.categories.devtools"),
        skills: [
            { name: 'VS Code', image: vscode_icon },
            { name: 'Android Studio', image: androidstudio_icon },
            { name: 'IntelliJ IDEA', image: intellij_icon },
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
            { name: 'npm', image: npm_icon },
            { name: 'bun', image: bun },
            { name: 'ESLint', image: eslint_icon },
            { name: 'Playwright', image: playwright },
            { name: 'Robot Framework', image: robot_framework },
        ]
    }
];
