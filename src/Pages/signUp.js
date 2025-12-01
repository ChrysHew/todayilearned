import { useEffect, useState } from "react";
import "../signUpStyle.css";
import supabase from "../supabase";
import Loader from "../Components/Loader";
import { signUpWithEmail } from "../Services/auth";
import { signInWithEmail } from "../Services/auth";
import { Link } from "react-router-dom";

function SignUp({ user, setUser }) {
  // State to manage active tab

  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("sign-up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Clear form fields when user logs out (user becomes null)
  useEffect(() => {
    if (!user) {
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      setErrorMessage("");
    }
  }, [user]);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     try {
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();
  //       setSession(session);
  //     } catch (error) {
  //       console.error("Error fetching session:", error.message);
  //     }
  //   };

  //   fetchSession();
  // }, []);

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Clear any previous errors
    setErrorMessage("");

    // Validate password length (Supabase requires at least 6 characters)
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Warn about test emails that Supabase might block
    const blockedTestEmails = ['example@gmail.com', 'test@test.com', 'test@example.com'];
    if (blockedTestEmails.includes(email.toLowerCase())) {
      setErrorMessage("This test email is blocked. Please use a real email address.");
      return;
    }

    try {
      const newUser = await signUpWithEmail(username, email, password);
      setUser(newUser); // Fixed: should call setUser, not assign to it
      setErrorMessage(""); // Clear any errors on success
      console.log("Sign up successful:", newUser.email);
      // Show success message about email confirmation
      alert("Sign up successful! Please check your email inbox (and spam folder) to confirm your account before signing in.");
    } catch (error) {
      console.error("Error during sign up:", error);
      // Display the specific error message from Supabase
      setErrorMessage(error.message || "Failed to sign up. Please try again.");
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setErrorMessage("Please enter your email address first.");
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        setErrorMessage(`Failed to resend email: ${error.message}`);
      } else {
        setErrorMessage("");
        alert("Confirmation email sent! Please check your inbox (and spam folder).");
      }
    } catch (error) {
      console.error("Error resending confirmation:", error);
      setErrorMessage("Failed to resend confirmation email. Please try again.");
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        setUser(user);
        setErrorMessage(""); // Clear any errors on success
        // Clear form fields after successful sign-in
        setEmail("");
        setPassword("");
        console.log("Logged in successfully:", user);
      } else {
        setErrorMessage("Failed to sign in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      // Display the specific error message from Supabase
      let errorMsg = error.message || "Failed to sign in. Please try again.";
      
      // Provide helpful message for email confirmation
      if (error.message && error.message.includes("Email not confirmed")) {
        errorMsg = "Please check your email and confirm your account before signing in. Check your spam folder if you don't see the email.";
      }
      
      setErrorMessage(errorMsg);
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
                        type="email"
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
                        type="email"
                        name="your_email_1"
                        id="your_email_1"
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
                        name="password_1"
                        id="password_1"
                        className="input-text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                <p>{errorMessage}</p>
                {errorMessage.includes("Email not confirmed") && (
                  <button
                    onClick={handleResendConfirmation}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    Resend Confirmation Email
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
