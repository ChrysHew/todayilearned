import { useEffect, useState } from "react";
import "../signUpStyle.css";
import supabase from "../supabase";
import Loader from "../Components/Loader";

function SignUp() {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("sign-up");

  // Function to handle tab switching
  const openCity = (event, tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    // Set default active tab on mount
    setActiveTab("sign-up");
  }, []);

  return (
    <div className="form">
      <div className="page-content">
        <div className="form-container">
          <div className="form-content">
            <div className="tab">
              <div className="tab-inner">
                <button
                  className={`tablinks ${
                    activeTab === "sign-up" ? "active" : ""
                  }`}
                  onClick={(event) => openCity(event, "sign-up")}
                  id="defaultOpen"
                >
                  Sign Up
                </button>
              </div>
              <div className="tab-inner">
                <button
                  className={`tablinks ${
                    activeTab === "sign-in" ? "active" : ""
                  }`}
                  onClick={(event) => openCity(event, "sign-in")}
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Sign-Up Form */}
            <form
              className="form-detail"
              style={{ display: activeTab === "sign-up" ? "block" : "none" }}
            >
              <div className="tabcontent" id="sign-up">
                <div className="form-row">
                  <label className="form-row-inner">
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="input-text"
                      placeholder="Username"
                      required
                    />
                    <span className="border"></span>
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-row-inner">
                    <input
                      type="text"
                      name="your_email"
                      id="your_email"
                      className="input-text"
                      placeholder="E-mail"
                      required
                    />
                    <span className="border"></span>
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-row-inner">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="input-text"
                      placeholder="Password"
                      required
                    />
                    <span className="border"></span>
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-row-inner">
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      className="input-text"
                      placeholder="Confirm Password"
                      required
                    />
                    <span className="border"></span>
                  </label>
                </div>
                <div className="form-row-last">
                  <input
                    type="submit"
                    name="register"
                    className="register"
                    value="Register"
                  />
                </div>
              </div>
            </form>

            {/* Sign-In Form */}
            <form
              className="form-detail"
              style={{ display: activeTab === "sign-in" ? "block" : "none" }}
            >
              <div className="tabcontent" id="sign-in">
                <div className="form-row">
                  <label className="form-row-inner">
                    <input
                      type="text"
                      name="your_email_1"
                      id="your_email_1"
                      className="input-text"
                      placeholder="E-mail"
                      required
                    />
                    <span className="border"></span>
                  </label>
                </div>
                <div className="form-row">
                  <label className="form-row-inner">
                    <input
                      type="password"
                      name="password_1"
                      id="password_1"
                      className="input-text"
                      placeholder="Password"
                      required
                    />
                    <span className="border"></span>
                  </label>
                </div>
                <div className="form-row-last">
                  <input
                    type="submit"
                    name="register"
                    className="register"
                    value="Sign In"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
