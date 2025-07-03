const Projects = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Projects</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3">Project 1</h3>
                        <p className="text-gray-300 mb-4">Description of your project...</p>
                        <div className="flex gap-2">
                            <span className="bg-[#FF00FF] text-white px-2 py-1 rounded text-sm">React</span>
                            <span className="bg-[#00FFFF] text-black px-2 py-1 rounded text-sm">TypeScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;