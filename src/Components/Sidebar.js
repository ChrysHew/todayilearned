import { useState } from "react";
import supabase from "../supabase";
import ProfileContent from "./ProfileContent";
import SignUp from "../Pages/signUp";

function Sidebar({ showSidebar, setShowSidebar }) {
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

  return (
    <>
      <div
        id="sidebar1"
        className="sidebar"
        aria-label="Main sidebar containing navigation links and some information"
        aria-hidden={showSidebar ? "false" : "true"}
      >
        <button
          className="btn-sidebar"
          onClick={() => setShowSidebar((show) => !show)}
        >
          <span>X</span>
        </button>

        <SignUp />
      </div>
    </>
  );
}

export default Sidebar;
