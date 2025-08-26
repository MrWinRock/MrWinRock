import { useState } from "react";
import { api } from "../lib/api";

const APITester = () => {
    const [health, setHealth] = useState<string>("");
    const [fish, setFish] = useState<string>("");
    const [skills, setSkills] = useState<string>("");

    const healthTest = async () => {
        setHealth("Loading...");
        try {
            const res = await api.health();
            setHealth(JSON.stringify(res, null, 2));
        } catch (e) {
            setHealth(e instanceof Error ? e.message : "Unknown error");
        }
    };

    const fishTest = async () => {
        setFish("Loading...");
        try {
            const res = await api.fish();
            setFish(JSON.stringify(res, null, 2));
        } catch (e) {
            setFish(e instanceof Error ? e.message : "Unknown error");
        }
    };

    const skillTest = async () => {
        setSkills("Loading...");
        try {
            const res = await api.skills();
            setSkills(JSON.stringify(res, null, 2));
        } catch (e) {
            setSkills(e instanceof Error ? e.message : "Unknown error");
        }
    };

    return (
        <div className="mb-6 space-y-2">
            <h2 className="text-lg font-semibold">API Tester</h2>
            <div className="api-container">
                <h3 className="text-sm font-medium">Test the health endpoint of the API</h3>
                <button className="p-button" onClick={healthTest}>Test Health Endpoint</button>
                <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto max-h-48">{health}</pre>
            </div>
            <div className="api-container">
                <h3 className="text-sm font-medium">FISH</h3>
                <button className="p-button" onClick={fishTest}>Test Fish Endpoint</button>
                <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto max-h-48">{fish}</pre>
            </div>
            <div className="api-container">
                <h3 className="text-sm font-medium">SKILLS</h3>
                <button className="p-button" onClick={skillTest}>Test Skills Endpoint</button>
                <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto max-h-48">{skills}</pre>
            </div>
        </div>
    );
};

export default APITester;