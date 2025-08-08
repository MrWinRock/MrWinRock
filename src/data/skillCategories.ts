// Programming Languages
import c_logo from "../images/skills/c.svg";
import cplusplus_logo from "../images/skills/cplusplus.svg";
import csharp_logo from "../images/skills/csharp.svg";
import javascript_logo from "../images/skills/javascript.svg";
import typescript_logo from "../images/skills/typescript.svg";
import java_logo from "../images/skills/java.svg";
import kotlinlang_logo from "../images/skills/kotlinlang.svg";
import python_logo from "../images/skills/python.svg";
import dart_logo from "../images/skills/dart.svg";
import go_logo from "../images/skills/go.svg";
import gnu_bash_logo from "../images/skills/bash.svg";
/* JSX/TSX uses React logo */

// Web Development
import html5_logo from "../images/skills/html5.svg";
import css3_logo from "../images/skills/css3.svg";
import react_logo from "../images/skills/react.svg";
import tailwindcss_logo from "../images/skills/tailwindcss.svg";
import bootstrap_logo from "../images/skills/bootstrap.svg";
import motion_logo from "../images/skills/motion.png";

// Mobile Development
import react_native_logo from "../images/skills/react-native.svg";
import flutterio_logo from "../images/skills/flutter.svg";
import expo_logo from "../images/skills/expo.svg";

// Backend Technologies
import nodejs_logo from "../images/skills/nodejs.svg";
import express_logo from "../images/skills/express.svg";
import socketio_logo from "../images/skills/socketio.svg";
import spring_boot_logo from "../images/skills/spring-boot.svg";
import jwt_logo from "../images/skills/jwt.svg";
import hono_logo from "../images/skills/hono.svg";
import zod_logo from "../images/skills/zod.webp";

// Databases
import mysql_logo from "../images/skills/mysql.svg";
import postgresql_logo from "../images/skills/postgresql.svg";
import mongodb_logo from "../images/skills/mongodb.svg";
import mariadb_logo from "../images/skills/mariadb.svg";
import firebase_logo from "../images/skills/firebase.svg";

// Cloud & DevOps
import aws_logo from "../images/skills/aws.svg";
import google_cloud_logo from "../images/skills/google_cloud.svg";
import docker_logo from "../images/skills/docker.svg";
import heroku_logo from "../images/skills/heroku.svg";
import github_actions_logo from "../images/skills/github.svg";

// Dev Tools
import vscode_logo from "../images/skills/vscode.svg";
import androidstudio_logo from "../images/skills/androidstudio.svg";
import intellij_logo from "../images/skills/intellij.svg";

// Game Development
import unity3d_logo from "../images/skills/unity.svg";
import unreal_engine_logo from "../images/skills/unreal-engine.svg";

// Design & Tools
import figma_logo from "../images/skills/figma.svg";
import photoshop_logo from "../images/skills/photoshop.svg";
import blender_logo from "../images/skills/blender.svg";

// Other Tools
import git_scm_logo from "../images/skills/git.svg";
import linux_logo from "../images/skills/linux.svg";
import arduino_logo from "../images/skills/arduino.svg";
import postman_logo from "../images/skills/postman.svg";
import npm_logo from "../images/skills/npm.svg";
import bun_logo from "../images/skills/bun.svg";
import eslint_logo from "../images/skills/eslint.svg";
import playwright_logo from "../images/skills/playwright.png";
import robot_framework_logo from "../images/skills/robotframework.svg";

export const getSkillCategories = (t: (key: string) => string) => [
    {
        title: t("skills.categories.programming"),
        skills: [
            { name: 'C', image: c_logo },
            { name: 'C++', image: cplusplus_logo },
            { name: 'C#', image: csharp_logo },
            { name: 'JavaScript', image: javascript_logo },
            { name: 'TypeScript', image: typescript_logo },
            { name: 'JSX/TSX', image: react_logo },
            { name: 'Java', image: java_logo },
            { name: 'Kotlin', image: kotlinlang_logo },
            { name: 'Python', image: python_logo },
            { name: 'Go', image: go_logo },
            { name: 'Dart', image: dart_logo },
            { name: 'Bash', image: gnu_bash_logo },
        ]
    },
    {
        title: t("skills.categories.web"),
        skills: [
            { name: 'HTML5', image: html5_logo },
            { name: 'CSS3', image: css3_logo },
            { name: 'React', image: react_logo },
            { name: 'Motion', image: motion_logo },
            { name: 'Tailwind CSS', image: tailwindcss_logo },
            { name: 'Bootstrap', image: bootstrap_logo },
        ]
    },
    {
        title: t("skills.categories.mobile"),
        skills: [
            { name: 'React Native', image: react_native_logo },
            { name: 'Flutter', image: flutterio_logo },
            { name: 'Expo', image: expo_logo },
        ]
    },
    {
        title: t("skills.categories.backend"),
        skills: [
            { name: 'Node.js', image: nodejs_logo },
            { name: 'Express', image: express_logo },
            { name: 'Socket.io', image: socketio_logo },
            { name: 'Spring Boot', image: spring_boot_logo },
            { name: 'JSON Web Tokens (JWT)', image: jwt_logo },
            { name: 'Hono', image: hono_logo },
            { name: 'Zod', image: zod_logo },
        ]
    },
    {
        title: t("skills.categories.databases"),
        skills: [
            { name: 'MySQL', image: mysql_logo },
            { name: 'PostgreSQL', image: postgresql_logo },
            { name: 'MongoDB', image: mongodb_logo },
            { name: 'MariaDB', image: mariadb_logo },
            { name: 'Firebase', image: firebase_logo },
        ]
    },
    {
        title: t("skills.categories.cloud"),
        skills: [
            { name: 'AWS', image: aws_logo },
            { name: 'Google Cloud Platform', image: google_cloud_logo },
            { name: 'Docker', image: docker_logo },
            { name: 'Heroku', image: heroku_logo },
            { name: 'GitHub Actions', image: github_actions_logo },
        ]
    },
    {
        title: t("skills.categories.devtools"),
        skills: [
            { name: 'VS Code', image: vscode_logo },
            { name: 'Android Studio', image: androidstudio_logo },
            { name: 'IntelliJ IDEA', image: intellij_logo },
        ]
    },
    {
        title: t("skills.categories.game"),
        skills: [
            { name: 'Unity', image: unity3d_logo },
            { name: 'Unreal Engine', image: unreal_engine_logo },
        ]
    },
    {
        title: t("skills.categories.design"),
        skills: [
            { name: 'Figma', image: figma_logo },
            { name: 'Photoshop', image: photoshop_logo },
            { name: 'Blender', image: blender_logo },
        ]
    },
    {
        title: t("skills.categories.other"),
        skills: [
            { name: 'Git', image: git_scm_logo },
            { name: 'Linux', image: linux_logo },
            { name: 'Arduino', image: arduino_logo },
            { name: 'Postman', image: postman_logo },
            { name: 'npm', image: npm_logo },
            { name: 'bun', image: bun_logo },
            { name: 'ESLint', image: eslint_logo },
            { name: 'Playwright', image: playwright_logo },
            { name: 'Robot Framework', image: robot_framework_logo },
        ]
    }
];
