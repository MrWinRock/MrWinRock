import { useState } from "react";
import { api } from "../lib/api";

const APITester = () => {
    const [out, setOut] = useState<string>("");

    const run = async () => {
        setOut("Loading...");
        try {
            const res = await api.health();
            setOut(JSON.stringify(res, null, 2));
        } catch (e) {
            setOut(e instanceof Error ? e.message : "Unknown error");
        }
    };

    return (
        <div className="mb-6 space-y-2">
            <h2 className="text-lg font-semibold">API Tester</h2>
            <button className="p-button" onClick={run}>Test Health Endpoint</button>
            <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto max-h-48">{out}</pre>
        </div>
    );
};

export default APITester;