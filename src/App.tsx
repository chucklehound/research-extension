import { useEffect, useState } from "react";

import { db } from "./firebaseConfig"; // Ensure this file is set up correctly
import { collection, getDocs } from "firebase/firestore";

import "./app.css";


const mockInsights = [
  {
    urlPattern: "dentally.co/login",
    title: "Users struggle with navigation",
    creator: "Alice",
    date: "2024-02-27",
    tags: ["UX", "Research"],
    image: "https://link.to/jira.png"
  },
  {
    urlPattern: "dentally.co/login",
    title: "Settings page needs clearer labels",
    creator: "Bob",
    date: "2024-02-20",
    tags: ["UI", "Usability"],
    image: ""
  }
];

const getInsights = (currentUrl: string) => {
  return mockInsights.filter((insight) => currentUrl.includes(insight.urlPattern));
};

function App() {
  const [url, setUrl] = useState("");
  const [insights, setInsights] = useState<typeof mockInsights>([]);

  useEffect(() => {
    if (typeof chrome === "undefined" || !chrome.storage) return;

    chrome.storage.local.get("lastVisitedURL", async (data) => {
      if (data.lastVisitedURL) {
        setUrl(data.lastVisitedURL);
  
        // Fetch insights from Firestore
        const insightsRef = collection(db, "insights");
        const snapshot = await getDocs(insightsRef);
        const insightsData = snapshot.docs.map((doc) => doc.data() as { 
          urlPattern: string; 
          title: string; 
          creator: string; 
          date: string; 
          tags: string[]; 
          image: string;
        });
  
        setInsights(insightsData.filter((insight) => data.lastVisitedURL.includes(insight.urlPattern)));
      }
    });
  }, []);

  return (
    <div className="insights-main">
      <header className="insights-header">
        <h1>Dentally Research Buddy</h1>
        <h2>Current Page: <span>{url || "No URL detected"}</span></h2>
      </header>
      
      <div className="insights-list">
      <h3>Insights</h3>
      {insights.length > 0 ? (
        insights.map((insight, i) => (
          <div key={i} className="insight-card">
            <h4>{insight.title}</h4>
            <p><strong>By:</strong> {insight.creator} | <strong>Date:</strong> {insight.date}</p>
            <p><strong>Tags:</strong> {insight.tags.join(", ")}</p>
            {insight.image && <img src={insight.image} alt="Insight" width="100" />}
          </div>
        ))
      ) : (
        <p>No insights available for this page.</p>
      )}
      </div>
    </div>
  );
}

export default App;
