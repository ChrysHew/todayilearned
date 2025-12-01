import { Fragment } from "react";
import Fact from "./Fact";

function FactList({ facts, setFacts, CATEGORIES, handleLoadMore, hasMore }) {
  if (facts.length < 1) {
    return (
      <p className="system-message">
        There are no facts for this category yet. Share the first one!🥳
      </p>
    );
  }

  return (
    <>
      {" "}
      <section>
        <ul className="facts-list">
          {facts.map((fact) => (
            <Fact
              key={fact.id}
              fact={fact}
              setFacts={setFacts}
              CATEGORIES={CATEGORIES}
            />
          ))}
        </ul>
        <p>There are {facts.length} facts in the database. Add your own!</p>
        {hasMore && <button className="btn btn-large btn-all-categories" onClick={handleLoadMore}>Load More</button>}
      </section>
    </>
  );
}

export default FactList;
