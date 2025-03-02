import { db } from "./firebaseConfig.ts"; // Ensure this file is set up correctly
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

// Reference the "insights" collection in Firestore
const insightsCollection = collection(db, "insights");

// Your JSON data
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

// Function to upload each insight to Firestore
const uploadInsights = async () => {
  for (const insight of mockInsights) {
    try {
      await addDoc(insightsCollection, insight); // Save to Firestore
      console.log(`✅ Added: ${insight.title}`); // Log success
    } catch (error) {
      console.error(`❌ Error adding insight:`, error); // Log error
    }
  }
};

// Run the function
uploadInsights();
