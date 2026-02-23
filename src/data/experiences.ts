export interface Experience {
    _id?: string;
    title: string;
    company: string;
    location: string;
    type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor's Degree";
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
    tech: string[];
    order: number;
}

export const experiences: Experience[] = [
    {
        title: "Computer Science Student",
        company: "Suan Sunandha Rajabhat University",
        location: "Bangkok, Thailand",
        type: "Bachelor's Degree",
        startDate: "2022-06",
        description: "Computer Science, Faculty of Science",
        achievements: [
            "GPA: 3.68",
        ],
        tech: [],
        order: 1,
    },
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
        order: 2,
    },
];
