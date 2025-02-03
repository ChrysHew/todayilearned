import { useEffect, useState } from "react";
import "../signUpStyle.css";
import supabase from "../supabase";
import Loader from "../Components/Loader";
import { signUpWithEmail } from "../Services/auth";
import { signInWithEmail } from "../Services/auth";

function SignUp() {
  // State to manage active tab
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("sign-up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("Error fetching session:", error.message);
      }
    };

    fetchSession();
  }, []);

  const handleSignUp = async () => {
    // Clear any previous errors
    //setErrorMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // const { user, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });
      // if (error) {
      //   console.error("Sign Up Error:", email, password, error.message);
      //   return;
      // }
      signUpWithEmail(username, email, password);
      console.log("Sign up successful:", email, password);
      // Optionally, redirect signIn or home page
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(error.message);
    }
  };

  const handleSignIn = async () => {
    const user = await signInWithEmail(email, password);
    if (user) {
      console.log("Logged in:", user);
    }
  };

  // Function to handle tab switching
  const openCity = (_event, tabName) => {
    setActiveTab(tabName);
  };

  // Set default active tab on default
  //useEffect(() => {
  //   setActiveTab("sign-up");
  // }, []);

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
            {activeTab === "sign-up" && (
              <form
                onSubmit={handleSignUp}
                className="form-detail"
                style={{ display: activeTab === "sign-up" ? "block" : "none" }}
              >
                <div className="tabcontent" id="sign-up">
                  <div className="form-row">
                    <label className="form-row-inner">
                      <input
                        type="text"
                        value={username}
                        name="full_name"
                        id="full_name"
                        className="input-text"
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
            )}

            {/* Sign-In Form */}
            {activeTab === "sign-in" && (
              <form
                onSubmit={handleSignIn}
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
            )}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
