import CategoryFilter from "./Components/CategoryFilter";
import NewFactForm from "./Components/NewFactForm";
import FactList from "./Components/FactList";
import Header from "./Components/Header";
import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import Loader from "./Components/Loader";
import Sidebar from "./Components/Sidebar";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#F85BA2" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        let { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        !error ? setFacts(facts) : alert("There was a problem getting data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      {/* HEADER */}
      <Header
        showForm={showForm}
        setShowForm={setShowForm}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      {showForm ? (
        <NewFactForm setFacts={setFacts} CATEGORIES={CATEGORIES} />
      ) : null}
      {/* MAIN */}
      <main className="main">
        <CategoryFilter
          setCurrentCategory={setCurrentCategory}
          CATEGORIES={CATEGORIES}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} CATEGORIES={CATEGORIES} />
        )}
      </main>
      {/*SIDEBAR*/}
      <aside>
        {showSidebar ? (
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        ) : null}
      </aside>
    </>
  );
}
export default App;
