export interface Skill {
    name: string;
    category: string;
    icon: string;
    order: number;
    _id?: string;
}

export const skills: Skill[] = [
    // Programming Languages
    { name: 'C', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/c.svg", order: 1 },
    { name: 'C++', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/cplusplus.svg", order: 2 },
    { name: 'C#', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/csharp.svg", order: 3 },
    { name: 'JavaScript', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/javascript.svg", order: 4 },
    { name: 'TypeScript', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/typescript.svg", order: 5 },
    { name: 'JSX/TSX', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/jsx-tsx.svg", order: 6 },
    { name: 'Java', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/java.svg", order: 7 },
    { name: 'Kotlin', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/kotlinlang.svg", order: 8 },
    { name: 'Python', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/python.svg", order: 9 },
    { name: 'Go', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/go.svg", order: 10 },
    { name: 'Dart', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/dart.svg", order: 11 },
    { name: 'Bash', category: 'programming', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/bash.svg", order: 12 },

    // Web Development
    { name: 'HTML5', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/html5.svg", order: 13 },
    { name: 'CSS3', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/css3.svg", order: 14 },
    { name: 'React', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/react.svg", order: 15 },
    { name: 'Next.js', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/nextjs.svg", order: 16 },
    { name: 'Motion', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/motion.png", order: 17 },
    { name: 'Tailwind CSS', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/tailwindcss.svg", order: 18 },
    { name: 'Bootstrap', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/bootstrap.svg", order: 19 },

    // Mobile Development
    { name: 'React Native', category: 'mobile', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/react-native.svg", order: 20 },
    { name: 'Flutter', category: 'mobile', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/flutter.svg", order: 21 },
    { name: 'Expo', category: 'mobile', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/expo.svg", order: 22 },

    // Backend Technologies
    { name: 'Node.js', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/nodejs.svg", order: 23 },
    { name: 'Express', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/express.svg", order: 24 },
    { name: 'Socket.io', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/socketio.svg", order: 25 },
    { name: 'Spring Boot', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/spring-boot.svg", order: 26 },
    { name: 'JSON Web Tokens (JWT)', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/jwt.svg", order: 27 },
    { name: 'Hono', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/hono.svg", order: 28 },
    { name: 'Zod', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/zod.webp", order: 29 },
    { name: 'ElysiaJS', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/elysiajs.svg", order: 30 },

    // Databases
    { name: 'MySQL', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/mysql.svg", order: 31 },
    { name: 'PostgreSQL', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/postgresql.svg", order: 32 },
    { name: 'MongoDB', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/mongodb.svg", order: 33 },
    { name: 'MariaDB', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/mariadb.svg", order: 34 },
    { name: 'Firebase', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/firebase.svg", order: 35 },
    { name: 'DBeaver', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/dbeaver.svg", order: 36 },

    // Cloud & DevOps
    { name: 'AWS', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/aws.svg", order: 37 },
    { name: 'Google Cloud Platform', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/google_cloud.svg", order: 38 },
    { name: 'Cloudflare', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/cloudflare.svg", order: 39 },
    { name: 'Docker', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/docker.svg", order: 40 },
    { name: 'Heroku', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/heroku.svg", order: 41 },
    { name: 'GitHub Actions', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/github.svg", order: 42 },
    { name: 'Fly.io', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/flyio.svg", order: 43 },
    { name: 'Render', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/render.svg", order: 44 },

    // Dev Tools
    { name: 'VS Code', category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/vscode.svg", order: 45 },
    { name: 'Android Studio', category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/androidstudio.svg", order: 46 },
    { name: 'IntelliJ IDEA', category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/intellij.svg", order: 47 },

    // Game Development
    { name: 'Unity', category: 'game', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/unity.svg", order: 48 },
    { name: 'Unreal Engine', category: 'game', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/unreal-engine.svg", order: 49 },

    // Design & Tools
    { name: 'Figma', category: 'design', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/figma.svg", order: 50 },
    { name: 'Photoshop', category: 'design', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/photoshop.svg", order: 51 },
    { name: 'Blender', category: 'design', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/blender.svg", order: 52 },

    // Other Tools
    { name: 'Git', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/git.svg", order: 53 },
    { name: 'Linux', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/linux.svg", order: 54 },
    { name: 'Arduino', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/arduino.svg", order: 55 },
    { name: 'Postman', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/postman.svg", order: 56 },
    { name: 'npm', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/npm.svg", order: 57 },
    { name: 'bun', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/bun.svg", order: 58 },
    { name: 'ESLint', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/eslint.svg", order: 59 },
    { name: 'Playwright', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/playwright.png", order: 60 },
    { name: 'Robot Framework', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/robotframework.svg", order: 61 },
    { name: 'Jira', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/jira.svg", order: 62 },
    { name: 'PyTorch', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/pytorch.svg", order: 63 },
];
