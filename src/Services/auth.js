import supabase from "../supabase";

// Sign in function
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Login Error:", error.message);
    // Throw error so it can be caught and displayed to user
    throw new Error(error.message);
  }
  return data.user; // Return the logged-in user
}

// Sign up function
export async function signUpWithEmail(username, email, password) {
  // Step 1: Sign up with email and password
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: username, // This will be stored immediately in user_metadata
      },
    },
  });

  // If there's an error, throw it so it can be caught and displayed
  if (error) {
    console.error("Sign Up Error:", email, error.message);
    // Throw error with message so it can be caught and displayed to user
    throw new Error(error.message);
  }

  const { user } = data;
  if (!user) {
    throw new Error("Sign up failed. No user was created.");
  }

  console.log("Sign up successful:", user.email);
  return user; // Return the newly created user with the username
}

// Sign out function
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout Error:", error.message);
  } else {
    console.log("User logged out");
  }
}

// Get current logged-in user
export function getCurrentUser() {
  return supabase.auth.getUser().then(({ data }) => data.user);
}

// Optional: Listen for authentication state changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}
