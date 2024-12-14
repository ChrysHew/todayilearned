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

    if (text && source && isValidURL(source) && category && textLength <= 200) {
      /*const newFact = {
        id: 10,
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };*/

      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      //Add the new fact to the UI: add the fact to the state
      if (!error) {
        setFacts((facts) => [newFact[0], ...facts]);
      } else {
        alert("There was a problem adding data");
      }

      //Reset the input fields
      setText("");
      setSource("");
      setCategory("");

      // Close the form
      //setShowForm(false);
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
