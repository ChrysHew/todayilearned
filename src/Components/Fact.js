import { useState } from "react";
import supabase from "../supabase";
function Fact({ fact, setFacts, CATEGORIES }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(voteType) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [voteType]: fact[voteType] + 1 })
      .eq("id", fact.id)
      .select();

    if (!error) {
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
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
            👍 {fact.votesInteresting}
          </button>
          <button
            onClick={() => handleVote("votesMindblowing")}
            disabled={isUpdating}
          >
            🤯 {fact.votesMindblowing}
          </button>
          <button
            onClick={() => handleVote("votesFalse")}
            disabled={isUpdating}
          >
            ⛔️ {fact.votesFalse}
          </button>
        </div>
      </li>
    </>
  );
}

export default Fact;
