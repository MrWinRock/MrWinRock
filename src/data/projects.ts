export interface Project {
    _id?: string;
    title: string;
    description: string;
    url?: string;
    repo?: string;
    tech: string[];
    featured: boolean;
    order: number;
}

export const projects: Project[] = [
    {
        title: "MrWinRock",
        description: "My Portfolio Website.",
        url: "/",
        repo: "https://github.com/MrWinRock/MrWinRock",
        tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        featured: true,
        order: 1
    },
    {
        title: "MrWinRock API",
        description: "Backend API powering portfolio functionality.",
        url: "https://api.mrwinrock.com/",
        repo: "https://github.com/MrWinRock/mrwinrock-app",
        tech: ["Bun", "TypeScript", "Hono", "Zod", "Google Cloud Platform", "Cloudflare"],
        featured: true,
        order: 2
    },
    {
        title: "InfoXP",
        description: "AI-powered game knowledge platform leveraging LLMs for Q&A and insights, built as a TypeScript React web app.",
        url: "",
        repo: "https://github.com/MrWinRock/infoxp",
        tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        featured: true,
        order: 3
    },
    {
        title: "InfoXP Mobile",
        description: "React Native mobile client providing on-the-go access to InfoXP’s LLM-driven game insights with a TypeScript codebase.",
        url: "",
        repo: "https://github.com/MrWinRock/infoxp-mobile",
        tech: ["React Native", "TypeScript", "Expo"],
        featured: false,
        order: 4
    },
    {
        title: "InfoXP Backend",
        description: "TypeScript API service on Bun powering LLM-backed game knowledge, containerized for scalable deployment.",
        url: "",
        repo: "https://github.com/MrWinRock/infoxp-app",
        tech: ["Bun", "TypeScript", "Express.js", "Docker", "MongoDB"],
        featured: false,
        order: 5
    },
    {
        title: "Stringy",
        description: "A Blog Platform Discussing about IT.",
        url: "https://stringy-b8c5e.web.app/",
        repo: "https://github.com/MrWinRock/Stringy",
        tech: ["React", "Javascript"],
        featured: false,
        order: 6
    },
    {
        title: "Stringy Backend",
        description: "Backend for the Stringy application.",
        url: "",
        repo: "",
        tech: ["Node.js", "Express.js", "JWT", "Google Cloud SQL", "Google Cloud Platform"],
        featured: false,
        order: 7
    },
    {
        title: "SSRU Interactive Map",
        description: "An Interactive Map for SSRU.",
        url: "https://mrwinrock.github.io/ssru-inter-map/",
        repo: "https://github.com/MrWinRock/ssru-inter-map",
        tech: ["React", "Javascript", "Zoom Pan Pitch"],
        featured: false,
        order: 8
    },
    {
        title: "ChadChat",
        description: "An Interactive Real-Time Chat Application.",
        url: "",
        repo: "https://github.com/MrWinRock/ChadChat",
        tech: ["React Native", "Typescript"],
        featured: false,
        order: 9
    },
    {
        title: "ChadChat Backend",
        description: "Backend for the ChadChat application.",
        url: "",
        repo: "https://github.com/MrWinRock/chadchat-backend",
        tech: ["Node.js", "Express.js", "Socket.io", "MongoDB"],
        featured: false,
        order: 10
    },
    {
        title: "Chronobreak",
        description: "World clock, Time zone converter, Alarm, Stopwatch, Timer",
        url: "",
        repo: "https://github.com/MrWinRock/chronobreak",
        tech: ["React Native", "Javascript", "Typescript", "PHP"],
        featured: false,
        order: 11
    },
    {
        title: "QRCode Generator",
        description: "A simple QR code generator app.",
        url: "https://github.com/MrWinRock/qrcode-generator/releases/tag/qrcode",
        repo: "https://github.com/MrWinRock/qrcode-generator",
        tech: ["Python", "tkinter"],
        featured: false,
        order: 12
    },
    {
        title: "Todo App",
        description: "Basic Todo App.",
        url: "https://todo-react-group.web.app",
        repo: "https://github.com/MrWinRock/todoreact",
        tech: ["React", "Javascript"],
        featured: false,
        order: 13
    },
    {
        title: "EarthMC Data Site",
        description: "EarthMC Server Data Site.",
        url: "https://mrwinrock.github.io/earthmc-web-data",
        repo: "https://github.com/MrWinRock/earthmc-web-data",
        tech: ["React", "Typescript", "Vite", "Tailwind CSS"],
        featured: false,
        order: 14
    },
    {
        title: "EarthMC API Proxy",
        description: "EarthMC Proxy API Server For POST Requests.",
        url: "",
        repo: "https://github.com/MrWinRock/earthmc-api-proxy",
        tech: ["Node.js", "Express.js"],
        featured: false,
        order: 15
    },
    {
        title: "Crazy Dad Lore 3D",
        description: "A 3D Road game created for the Thailand Summer Jam 2025.",
        url: "https://marguro.itch.io/crazy-dad-lore",
        repo: "https://github.com/MrWinRock/summer-jam-2025?tab=readme-ov-file",
        tech: ["Unity 3D", "C#"],
        featured: false,
        order: 16
    },
    {
        title: "Horror Company",
        description: "A 2D game created for the Thailand Horror Jam 2024.",
        url: "https://marguro.itch.io/horror-company",
        repo: "https://github.com/MrWinRock/Horror_Company",
        tech: ["Unity", "C#"],
        featured: false,
        order: 17
    },
    {
        title: "Give Me A Sign",
        description: "A 2D psychological horror game created for Thailand Horror Jam 2025.",
        url: "https://marguro.itch.io/give-me-a-sign",
        repo: "https://github.com/MrWinRock/give-me-a-sign",
        tech: ["Unity", "C#", "Whisper AI"],
        featured: false,
        order: 18
    },
    {
        title: "Elysia App",
        description: "API service for Elysia framework experiments connecting to MongoDB.",
        url: "",
        repo: "https://github.com/MrWinRock/elysia-app",
        tech: ["Bun", "TypeScript", "ElysiaJS", "MongoDB"],
        featured: false,
        order: 19
    },
    {
        title: "Next App",
        description: "Full stack Next.js application, database integration, and responsive design.",
        url: "",
        repo: "https://github.com/MrWinRock/next-app",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "MongoDB"],
        featured: false,
        order: 20
    }
]