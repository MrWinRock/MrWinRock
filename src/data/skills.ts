// Programming Languages
import c_logo from "../images/skills/c.svg";
import cplusplus_logo from "../images/skills/cplusplus.svg";
import csharp_logo from "../images/skills/csharp.svg";
import javascript_logo from "../images/skills/javascript.svg";
import typescript_logo from "../images/skills/typescript.svg";
import jsx_tsx_logo from "../images/skills/jsx-tsx.svg";
import java_logo from "../images/skills/java.svg";
import kotlinlang_logo from "../images/skills/kotlinlang.svg";
import python_logo from "../images/skills/python.svg";
import dart_logo from "../images/skills/dart.svg";
import go_logo from "../images/skills/go.svg";
import gnu_bash_logo from "../images/skills/bash.svg";

// Web Development
import html5_logo from "../images/skills/html5.svg";
import css3_logo from "../images/skills/css3.svg";
import react_logo from "../images/skills/react.svg";
import nextjs_logo from "../images/skills/nextjs.svg";
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
import elysiajs_logo from "../images/skills/elysiajs.svg";

// Databases
import mysql_logo from "../images/skills/mysql.svg";
import postgresql_logo from "../images/skills/postgresql.svg";
import mongodb_logo from "../images/skills/mongodb.svg";
import mariadb_logo from "../images/skills/mariadb.svg";
import firebase_logo from "../images/skills/firebase.svg";
import dbeaver_logo from "../images/skills/DBeaver.svg";

// Cloud & DevOps
import aws_logo from "../images/skills/aws.svg";
import google_cloud_logo from "../images/skills/google_cloud.svg";
import cloudflare_logo from "../images/skills/cloudflare.svg";
import docker_logo from "../images/skills/docker.svg";
import heroku_logo from "../images/skills/heroku.svg";
import github_actions_logo from "../images/skills/github.svg";
import flyio_logo from "../images/skills/flyio.svg";
import render_logo from "../images/skills/render.svg";

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
import jira_logo from "../images/skills/jira.svg";
import pytorch_logo from "../images/skills/pytorch.svg";

export interface Skill {
    name: string;
    category: string;
    icon: string;
    order: number;
    _id?: string;
}

export const skills: Skill[] = [
    // Programming Languages
    { name: 'C', category: 'programming', icon: c_logo, order: 1 },
    { name: 'C++', category: 'programming', icon: cplusplus_logo, order: 2 },
    { name: 'C#', category: 'programming', icon: csharp_logo, order: 3 },
    { name: 'JavaScript', category: 'programming', icon: javascript_logo, order: 4 },
    { name: 'TypeScript', category: 'programming', icon: typescript_logo, order: 5 },
    { name: 'JSX/TSX', category: 'programming', icon: jsx_tsx_logo, order: 6 },
    { name: 'Java', category: 'programming', icon: java_logo, order: 7 },
    { name: 'Kotlin', category: 'programming', icon: kotlinlang_logo, order: 8 },
    { name: 'Python', category: 'programming', icon: python_logo, order: 9 },
    { name: 'Go', category: 'programming', icon: go_logo, order: 10 },
    { name: 'Dart', category: 'programming', icon: dart_logo, order: 11 },
    { name: 'Bash', category: 'programming', icon: gnu_bash_logo, order: 12 },

    // Web Development
    { name: 'HTML5', category: 'web', icon: html5_logo, order: 13 },
    { name: 'CSS3', category: 'web', icon: css3_logo, order: 14 },
    { name: 'React', category: 'web', icon: react_logo, order: 15 },
    { name: 'Next.js', category: 'web', icon: nextjs_logo, order: 16 },
    { name: 'Motion', category: 'web', icon: motion_logo, order: 17 },
    { name: 'Tailwind CSS', category: 'web', icon: tailwindcss_logo, order: 18 },
    { name: 'Bootstrap', category: 'web', icon: bootstrap_logo, order: 19 },

    // Mobile Development
    { name: 'React Native', category: 'mobile', icon: react_native_logo, order: 20 },
    { name: 'Flutter', category: 'mobile', icon: flutterio_logo, order: 21 },
    { name: 'Expo', category: 'mobile', icon: expo_logo, order: 22 },

    // Backend Technologies
    { name: 'Node.js', category: 'backend', icon: nodejs_logo, order: 23 },
    { name: 'Express', category: 'backend', icon: express_logo, order: 24 },
    { name: 'Socket.io', category: 'backend', icon: socketio_logo, order: 25 },
    { name: 'Spring Boot', category: 'backend', icon: spring_boot_logo, order: 26 },
    { name: 'JSON Web Tokens (JWT)', category: 'backend', icon: jwt_logo, order: 27 },
    { name: 'Hono', category: 'backend', icon: hono_logo, order: 28 },
    { name: 'Zod', category: 'backend', icon: zod_logo, order: 29 },
    { name: 'ElysiaJS', category: 'backend', icon: elysiajs_logo, order: 30 },

    // Databases
    { name: 'MySQL', category: 'databases', icon: mysql_logo, order: 31 },
    { name: 'PostgreSQL', category: 'databases', icon: postgresql_logo, order: 32 },
    { name: 'MongoDB', category: 'databases', icon: mongodb_logo, order: 33 },
    { name: 'MariaDB', category: 'databases', icon: mariadb_logo, order: 34 },
    { name: 'Firebase', category: 'databases', icon: firebase_logo, order: 35 },
    { name: 'DBeaver', category: 'databases', icon: dbeaver_logo, order: 36 },

    // Cloud & DevOps
    { name: 'AWS', category: 'cloud', icon: aws_logo, order: 37 },
    { name: 'Google Cloud Platform', category: 'cloud', icon: google_cloud_logo, order: 38 },
    { name: 'Cloudflare', category: 'cloud', icon: cloudflare_logo, order: 39 },
    { name: 'Docker', category: 'cloud', icon: docker_logo, order: 40 },
    { name: 'Heroku', category: 'cloud', icon: heroku_logo, order: 41 },
    { name: 'GitHub Actions', category: 'cloud', icon: github_actions_logo, order: 42 },
    { name: 'Fly.io', category: 'cloud', icon: flyio_logo, order: 43 },
    { name: 'Render', category: 'cloud', icon: render_logo, order: 44 },

    // Dev Tools
    { name: 'VS Code', category: 'devtools', icon: vscode_logo, order: 45 },
    { name: 'Android Studio', category: 'devtools', icon: androidstudio_logo, order: 46 },
    { name: 'IntelliJ IDEA', category: 'devtools', icon: intellij_logo, order: 47 },

    // Game Development
    { name: 'Unity', category: 'game', icon: unity3d_logo, order: 48 },
    { name: 'Unreal Engine', category: 'game', icon: unreal_engine_logo, order: 49 },

    // Design & Tools
    { name: 'Figma', category: 'design', icon: figma_logo, order: 50 },
    { name: 'Photoshop', category: 'design', icon: photoshop_logo, order: 51 },
    { name: 'Blender', category: 'design', icon: blender_logo, order: 52 },

    // Other Tools
    { name: 'Git', category: 'other', icon: git_scm_logo, order: 53 },
    { name: 'Linux', category: 'other', icon: linux_logo, order: 54 },
    { name: 'Arduino', category: 'other', icon: arduino_logo, order: 55 },
    { name: 'Postman', category: 'other', icon: postman_logo, order: 56 },
    { name: 'npm', category: 'other', icon: npm_logo, order: 57 },
    { name: 'bun', category: 'other', icon: bun_logo, order: 58 },
    { name: 'ESLint', category: 'other', icon: eslint_logo, order: 59 },
    { name: 'Playwright', category: 'other', icon: playwright_logo, order: 60 },
    { name: 'Robot Framework', category: 'other', icon: robot_framework_logo, order: 61 },
    { name: 'Jira', category: 'other', icon: jira_logo, order: 62 },
    { name: 'PyTorch', category: 'other', icon: pytorch_logo, order: 63 },
];
