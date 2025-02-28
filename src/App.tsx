import { useEffect, useState } from "react";

const mockInsights = [
  {
    urlPattern: "/1234/pages",
    title: "Users struggle with navigation",
    creator: "Alice",
    date: "2024-02-27",
    tags: ["UX", "Research"],
    image: "https://link.to/jira.png"
  },
  {
    urlPattern: "/5678/settings",
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
    if (!chrome?.storage) return;

    chrome.storage.local.get("lastVisitedURL", (data) => {
      if (data.lastVisitedURL) {
        setUrl(data.lastVisitedURL);
        setInsights(getInsights(data.lastVisitedURL));
      }
    });
  }, []);

  return (
    <div>
      <h2>Current Page:</h2>
      <p>{url || "No URL detected"}</p>
      <h3>Insights</h3>
      {insights.length > 0 ? (
        insights.map((insight, i) => (
          <div key={i} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
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
  );
}

export default App;
