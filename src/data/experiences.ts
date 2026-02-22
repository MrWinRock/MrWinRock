export interface Experience {
    _id?: string;
    title: string;
    company: string;
    location: string;
    type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract";
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
    tech: string[];
    order: number;
}

export const experiences: Experience[] = [
    {
        title: "Software Developer Intern",
        company: "DevDee Thailand",
        location: "Bangkok, Thailand",
        type: "Internship",
        startDate: "2026-12",
        description: "Developed web applications using React and .NET",
        achievements: [
            // "",
        ],
        tech: ["React", ".NET Core", "MySQL"],
        order: 1,
    },
];
