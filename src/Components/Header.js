function Header({ showForm, setShowForm, showSidebar, setShowSidebar }) {
  const appTitle = "TeamVision";
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
            <h1>{appTitle}</h1>
          </div>
        </a>
        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Close" : "Share a fact"}
        </button>
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
      </header>
    </>
  );
}

export default Header;
