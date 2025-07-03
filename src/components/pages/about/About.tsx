const About = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">About Me</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">My Story</h2>
                        <p className="text-gray-300 mb-4">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque repellendus officia veniam quis molestiae? Quis, blanditiis harum! Recusandae non, provident eos ipsum voluptatibus corporis laborum voluptas deserunt dolor vel eum!
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Education</h2>
                        <p className="text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;