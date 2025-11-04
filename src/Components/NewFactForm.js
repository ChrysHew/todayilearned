import { useState } from "react";
import supabase from "../supabase";

function NewFactForm({ setFacts, CATEGORIES }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  function isValidURL(string) {
    let givenURL;
    try {
      givenURL = new URL(string);
    } catch (error) {
      console.log("error is", error);
      return false;
    }
    return givenURL;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate inputs and provide feedback
    if (!text) {
      alert("Please enter a fact text.");
      return;
    }
    if (!source) {
      alert("Please enter a source URL.");
      return;
    }
    if (!isValidURL(source)) {
      alert("Please enter a valid URL for the source (e.g., https://example.com).");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    if (textLength > 200) {
      alert("Fact text must be 200 characters or less.");
      return;
    }

    console.log("Attempting to insert fact:", { text, source, category });

    setIsUploading(true);
    // If createdIn is a date column, use current date; if integer, use year
    // Using current date in ISO format (YYYY-MM-DD) which works for date columns
    const currentDate = new Date().toISOString().split('T')[0];
    
    const factData = {
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: currentDate, // Format: "2025-01-XX" for date type columns
    };
    console.log("Inserting fact data:", factData);
    
    const { data: newFact, error } = await supabase
      .from("facts")
      .insert([factData])
      .select();
    setIsUploading(false);

    //Add the new fact to the UI: add the fact to the state
    if (error) {
      console.error("❌ Error adding fact:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      alert(`There was a problem adding data: ${error.message}\n\nCheck the browser console for more details.`);
    } else if (newFact && newFact.length > 0) {
      console.log("✅ Fact added successfully:", newFact[0]);
      setFacts((facts) => [newFact[0], ...facts]);
      //Reset the input fields
      setText("");
      setSource("");
      setCategory("");
    } else {
      console.warn("⚠️ No data returned from insert, but no error either.");
      alert("Fact might have been added, but couldn't refresh the list. Please refresh the page.");
    }
  }

  return (
    <>
      <form className="fact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Share a fact with the world..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
        />
        <span>{200 - textLength}</span>
        <input
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
          disabled={isUploading}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isUploading}
        >
          <option value="">Choose category:</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button className="btn btn-large" disabled={isUploading}>
          Post
        </button>
      </form>
    </>
  );
}

export default NewFactForm;
