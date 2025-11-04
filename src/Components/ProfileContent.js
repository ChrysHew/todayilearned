import { useState } from "react";
import supabase from "../supabase";

function ProfileContent({ user, handleLogout }) {
  let disputedPosts = 0;
  let totalPosts = 0;
  let votesInterestingCount = 0;
  let votesMindblowingCount = 0;
  let votesFalseCount = 0;
  // Use actual user data if available
  let userName = user?.user_metadata?.display_name || user?.email || "John Doe";
  let userDescription = user ? "Logged in user" : "A guest user";

  return (
    <>
      <div className="profile-content-container">
        <div className="user-details">
          <div className="user-photo">
            <img
              src="ulogo.png"
              height="68"
              width="68"
              alt="Today I Learned Logo"
            />
          </div>
          <div className="user-bio-container">
            <div className="user-name">{userName}</div>
            <div className="user-description">{userDescription}</div>
          </div>
        </div>
        <div className="vote-stats">
          <div className="votes-count">
            <div className="statNumber">{votesInterestingCount}</div>
            <div className="statTitle">
              Interesting
              <br />
              Votes
            </div>
          </div>
          <div className="votes-count">
            <div className="statNumber">{votesMindblowingCount}</div>
            <div className="statTitle">
              Mindblowing
              <br />
              Votes
            </div>
          </div>
          <div className="votes-count">
            <div className="statNumber">{votesFalseCount}</div>
            <div className="statTitle">
              False
              <br />
              Votes
            </div>
          </div>
        </div>
        <div className="posts-view"></div>
        <div className="post-stats">
          <div className="posts-count">
            <div className="statNumber">{totalPosts}</div>
            <div className="statTitle-alt">Total Posts</div>
          </div>
          <div className="posts-count">
            <div className="statNumber">{disputedPosts}</div>
            <div className="statTitle-alt">Disputed Posts</div>
          </div>
        </div>
        <div className="logout-section" style={{ marginTop: "20px", padding: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#dc2626"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#ef4444"}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileContent;
