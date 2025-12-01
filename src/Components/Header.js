function Header({ showForm, setShowForm, showSidebar, setShowSidebar }) {

  return (
    <>
      <header className="header">
        {/* Separate class for the Link */}
        <a href="/" className="logo-link">
          <div className="logo">
            <img
              src="mlogo.png"
              height="68"
              width="68"
              alt="Today I Learned Logo"
            />
            <h1>
              {process.env.REACT_APP_USE_NEW_APP_NAME === "true"
                ? "Today I Learned"
                : "TeamVision"}
            </h1>
          </div>
        </a>
        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
        {process.env.REACT_APP_SHOW_USER_ICON === "true" && (
          <div>
            <button
              className="user-photo-btn"
              onClick={() => setShowSidebar((show) => !show)}
            >
              <img
                src="ulogo.png"
                height="68"
                width="68"
                alt="Today I Learned Logo"
              />
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
