import { useEffect, useState } from "react";

export default function Home() {
  const [backendMessage, setBackendMessage] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/`);
        const data = await response.json();
        setBackendMessage(data.message);
      } catch (error) {
        console.error("Error fetching from backend:", error);
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