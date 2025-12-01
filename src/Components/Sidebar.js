import React from "react";
import { useEffect } from "react";
import supabase from "../supabase";
import ProfileContent from "./ProfileContent";
import SignUp from "../Pages/signUp";

function Sidebar({ showSidebar, setShowSidebar, user, setUser, handleLogout }) {
  return (
    <>
      <div
        id="sidebar1"
        className={`sidebar ${showSidebar ? "show" : "hide"}`} // Add 'hide' class when sidebar is hidden
        aria-label="Main sidebar containing navigation links and some information"
      >
        <button
          className="btn-sidebar"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <span>X</span>
        </button>

        {user ? (
          <ProfileContent user={user} handleLogout={handleLogout} />
        ) : (
          <SignUp user={user} setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default Sidebar;
