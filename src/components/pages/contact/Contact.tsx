const Contact = () => {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-700 rounded-lg"
                                placeholder="Enter your name"
                                title="Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 bg-gray-700 rounded-lg"
                                placeholder="Enter your email"
                                title="Email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                rows={5}
                                className="w-full p-3 bg-gray-700 rounded-lg"
                                placeholder="Enter your message"
                                title="Message"
                            ></textarea>
                        </div>
                        <button className="bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;