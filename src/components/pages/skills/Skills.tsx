const Skills = () => {
    const skills = [
        { name: 'Blender', image: 'https://download.blender.org/branding/community/blender_community_badge_white.svg' },
        { name: 'C', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg' },
        { name: 'C++', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
        { name: 'C#', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' },
        { name: 'CSS3', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg' },
        { name: 'Firebase', image: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
        { name: 'Flutter', image: 'https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg' },
        { name: 'Heroku', image: 'https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg' },
        { name: 'Git', image: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
        { name: 'HTML5', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg' },
        { name: 'Java', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
        { name: 'JavaScript', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
        { name: 'Linux', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg' },
        { name: 'Photoshop', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg' },
        { name: 'Python', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
        { name: 'React', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg' },
        { name: 'React Native', image: 'https://reactnative.dev/img/header_logo.svg' },
        { name: 'Unity', image: 'https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg' },
        { name: 'Unreal Engine', image: 'https://raw.githubusercontent.com/kenangundogan/fontisto/036b7eca71aab1bef8e6a0518f7329f13ed62f6b/icons/svg/brand/unreal-engine.svg' },
        { name: 'Arduino', image: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg' },
        { name: 'AWS', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: 'Bash', image: 'https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg' },
        { name: 'Docker', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg' },
        { name: 'Express', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg' },
        { name: 'Figma', image: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
        { name: 'Google Cloud Platform', image: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg' },
        { name: 'Go', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg' },
        { name: 'MariaDB', image: 'https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg' },
        { name: 'MongoDB', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg' },
        { name: 'MySQL', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg' },
        { name: 'Node.js', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg' },
        { name: 'PostgreSQL', image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg' },
        { name: 'Postman', image: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-4xl font-bold mb-8">My Skills</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((skill) => (
                        <div key={skill.name} className="p-button p-6 flex flex-row gap-3 items-center justify-center text-center">
                            <img src={skill.image} alt={skill.name} className="w-8 h-8 rounded-2xl" />
                            <span className="text-lg font-semibold">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skills;