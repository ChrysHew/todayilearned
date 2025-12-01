import { useState } from "react";
import supabase from "../supabase";
function Fact({ fact, setFacts, CATEGORIES }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(voteType) {
    setIsUpdating(true);

    // default to 0 if null
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
      // update success, optimistic UI update
      if (updatedFact && updatedFact.length > 0) {
        console.log("✅ Vote updated successfully:", voteType, updatedFact[0]);
        console.log(`Updated ${voteType} from ${currentValue} to ${updatedFact[0][voteType]}`);
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        );
      } else {
        // no data returned but update worked - optimistic update
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

  async function handleDelete() {
    if (fact.id <= 11) {
      alert(
        "You can't delete the default facts. You can add your own to experiment with it."
      );
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this fact?"
    );
    if (isConfirmed) {
      setIsUpdating(true);
      const { error } = await supabase.from("facts").delete().eq("id", fact.id);

      if (error) {
        alert("There was an error deleting the fact.");
        setIsUpdating(false);
      } else {
        setFacts((facts) => facts.filter((f) => f.id !== fact.id));
        setIsUpdating(false);
      }
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
          <button onClick={handleDelete} disabled={isUpdating}>
            🗑️
          </button>
        </div>
      </li>
    </>
  );
}

export default Fact;
