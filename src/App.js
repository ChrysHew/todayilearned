import CategoryFilter from "./Components/CategoryFilter";
import NewFactForm from "./Components/NewFactForm";
import FactList from "./Components/FactList";
import Header from "./Components/Header";
import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import Loader from "./Components/Loader";
import Sidebar from "./Components/Sidebar";
import { getCurrentUser, signOut } from "./Services/auth";
//import { uSeAuth } from "./Services/useAuth";

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
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const { user } = useAuth();
  //   const fetchUser = async () => {
  //     const loggedInUser = await getCurrentUser();
  //     setUser(loggedInUser);
  //   };
  //   fetchUser();
  // }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null); // Reset user state on logout
    console.log("Logged out");
  };

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        // Test connection first
        console.log("Attempting to connect to Supabase...");
        console.log("Supabase URL:", process.env.REACT_APP_SUPABASE_URL);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        let { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (error) {
          console.error("❌ Error fetching facts:", error);
          console.error("Error details:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          alert(`There was a problem getting data: ${error.message}\n\nCheck the browser console for more details.`);
          setFacts([]);
        } else {
          console.log("✅ Facts loaded successfully:", facts?.length || 0, "facts");
          if (facts && facts.length > 0) {
            console.log("Sample fact:", facts[0]);
          } else {
            console.warn("⚠️ No facts found. The table might be empty or RLS policies are blocking access.");
          }
          setFacts(facts || []);
        }
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
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            user={user} // pass user state
            setUser={setUser} // pass setUser so sign up can update it
            handleLogout={handleLogout} // if needed in profile
          />
        ) : null}
      </aside>
    </>
  );
}
export default App;
