const Skills = () => {
    const skills = [
        { name: 'JavaScript' },
        { name: 'React' },
        { name: 'TypeScript' },
        { name: 'Node.js' },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-4xl font-bold mb-8">My Skills</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.name} className="bg-gray-800 p-6 rounded-lg">
                            <span className="text-lg font-semibold">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skills;