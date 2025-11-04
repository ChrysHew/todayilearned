import { useState } from "react";
import supabase from "../supabase";
function Fact({ fact, setFacts, CATEGORIES }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(voteType) {
    setIsUpdating(true);
    
    // Handle null values - if vote is null, start at 0, otherwise increment
    const currentValue = fact[voteType] ?? 0;
    const newValue = currentValue + 1;
    
    console.log(`Updating ${voteType}:`, {
      currentValue,
      newValue,
      factId: fact.id
    });
    
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [voteType]: newValue })
      .eq("id", fact.id)
      .select();

    if (error) {
      console.error("❌ Error updating vote:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      alert(`Failed to update vote: ${error.message}`);
      setIsUpdating(false);
    } else {
      // Update succeeded (error is null), even if select() didn't return data
      // Update the UI optimistically with the new value
      if (updatedFact && updatedFact.length > 0) {
        console.log("✅ Vote updated successfully:", voteType, updatedFact[0]);
        console.log(`Updated ${voteType} from ${currentValue} to ${updatedFact[0][voteType]}`);
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        );
      } else {
        // Select didn't return data, but update succeeded - update UI optimistically
        console.log("✅ Vote update succeeded, updating UI optimistically");
        console.log(`Updated ${voteType} from ${currentValue} to ${newValue}`);
        setFacts((facts) =>
          facts.map((f) => 
            f.id === fact.id 
              ? { ...f, [voteType]: newValue }
              : f
          )
        );
      }
      setIsUpdating(false);
    }
  }
  return (
    <>
      <li className="fact">
        <p>
          {isDisputed ? <span className="disputed">[⛔DISPUTED]</span> : null}
          {fact.text}
          <a
            className="source"
            href={fact.source}
            target="_blank"
            rel="noreferrer"
          >
            (Source)
          </a>
        </p>
        <span
          className="tag"
          style={{
            borderColor: CATEGORIES.find((cat) => cat.name === fact.category)
              .color,
            color: CATEGORIES.find((cat) => cat.name === fact.category).color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button
            onClick={() => handleVote("votesInteresting")}
            disabled={isUpdating}
          >
            👍 {fact.votesInteresting ?? 0}
          </button>
          <button
            onClick={() => handleVote("votesMindblowing")}
            disabled={isUpdating}
          >
            🤯 {fact.votesMindblowing ?? 0}
          </button>
          <button
            onClick={() => handleVote("votesFalse")}
            disabled={isUpdating}
          >
            ⛔️ {fact.votesFalse ?? 0}
          </button>
        </div>
      </li>
    </>
  );
}

export default Fact;
