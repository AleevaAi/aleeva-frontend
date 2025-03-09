import { useEffect, useState } from "react";

export default function Home() {
    const [backendMessage, setBackendMessage] = useState("Loading...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/");
                const data = await response.json();
                setBackendMessage(data.message);
            } catch (error) {
                console.error("Error fetching backend:", error);
                setBackendMessage("Failed to connect to API");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to Aleeva AI</h1>
            <p>Backend Response: {backendMessage}</p>
        </div>
    );
}