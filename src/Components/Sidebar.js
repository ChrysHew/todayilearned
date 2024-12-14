import { useState } from "react";
import supabase from "../supabase";

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
        aria-hidden="true"
      >
        <button
          className="sidebar__content"
          onClick={() => setShowSidebar((show) => !show)}
        >
          <span>X</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
