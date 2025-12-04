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
    { name: 'HTML5', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/html5.svg", order: 1 },
    { name: 'CSS3', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/css3.svg", order: 2 },
    { name: 'React', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/react.svg", order: 3 },
    { name: 'Next.js', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/nextjs.svg", order: 4 },
    { name: 'Motion', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/motion.png", order: 5 },
    { name: 'Tailwind CSS', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/tailwindcss.svg", order: 6 },
    { name: 'Bootstrap', category: 'web', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/bootstrap.svg", order: 7 },

    // Mobile Development
    { name: 'React Native', category: 'mobile', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/react-native.svg", order: 1 },
    { name: 'Flutter', category: 'mobile', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/flutter.svg", order: 2 },
    { name: 'Expo', category: 'mobile', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/expo.svg", order: 3 },

    // Backend Technologies
    { name: 'Node.js', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/nodejs.svg", order: 1 },
    { name: 'Express', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/express.svg", order: 2 },
    { name: 'Socket.io', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/socketio.svg", order: 3 },
    { name: 'Spring Boot', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/spring-boot.svg", order: 4 },
    { name: 'JSON Web Tokens (JWT)', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/jwt.svg", order: 5 },
    { name: 'Hono', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/hono.svg", order: 6 },
    { name: 'Zod', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/zod.webp", order: 7 },
    { name: 'ElysiaJS', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/elysiajs.svg", order: 8 },
    { name: '.NET Framework', category: 'backend', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/dotnet.svg", order: 9 },

    // Databases
    { name: 'MySQL', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/mysql.svg", order: 1 },
    { name: 'PostgreSQL', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/postgresql.svg", order: 2 },
    { name: 'MongoDB', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/mongodb.svg", order: 3 },
    { name: 'MariaDB', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/mariadb.svg", order: 4 },
    { name: 'Firebase', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/firebase.svg", order: 5 },
    { name: 'DBeaver', category: 'databases', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/dbeaver.svg", order: 6 },

    // Cloud & DevOps
    { name: 'AWS', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/aws.svg", order: 1 },
    { name: 'Google Cloud Platform', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/google_cloud.svg", order: 2 },
    { name: 'Cloudflare', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/cloudflare.svg", order: 3 },
    { name: 'Docker', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/docker.svg", order: 4 },
    { name: 'Heroku', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/heroku.svg", order: 5 },
    { name: 'GitHub Actions', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/github.svg", order: 6 },
    { name: 'Fly.io', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/flyio.svg", order: 7 },
    { name: 'Render', category: 'cloud', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/render.svg", order: 8 },

    // Dev Tools
    { name: 'VS Code', category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/vscode.svg", order: 1 },
    { name: 'Android Studio', category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/androidstudio.svg", order: 2 },
    { name: "JetBrains Rider", category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/rider.svg", order: 3 },
    { name: 'IntelliJ IDEA', category: 'devtools', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/intellij.svg", order: 4 },

    // Game Development
    { name: 'Unity', category: 'game', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/unity.svg", order: 1 },
    { name: 'Unreal Engine', category: 'game', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/unreal-engine.svg", order: 2 },

    // Design & Tools
    { name: 'Figma', category: 'design', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/figma.svg", order: 1 },
    { name: 'Photoshop', category: 'design', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/photoshop.svg", order: 2 },
    { name: 'Blender', category: 'design', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/blender.svg", order: 3 },

    // Other Tools
    { name: 'Git', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/git.svg", order: 1 },
    { name: 'Bitbucket', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/bitbucket.svg", order: 2 },
    { name: 'Linux', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/linux.svg", order: 3 },
    { name: 'Arduino', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/arduino.svg", order: 4 },
    { name: 'Postman', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/postman.svg", order: 5 },
    { name: 'npm', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/npm.svg", order: 6 },
    { name: 'bun', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/bun.svg", order: 7 },
    { name: 'ESLint', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/eslint.svg", order: 8 },
    { name: 'Playwright', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/playwright.png", order: 9 },
    { name: 'Robot Framework', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/robotframework.svg", order: 10 },
    { name: 'Jira', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/jira.svg", order: 11 },
    { name: 'PyTorch', category: 'other', icon: "https://storage.googleapis.com/mrwinrock-portfolio-images/skills/icons/pytorch.svg", order: 12 },
];
