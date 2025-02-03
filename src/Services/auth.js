import React, { useState, useEffect, createContext, useContext } from "react";
import supabase from "../supabase";

// Sign in function
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Login Error:", error.message);
    return null;
  }
  return data.user; // Return the logged-in user
}

// Sign up function
export async function signUpWithEmail(username, email, password) {
  // Step 1: Sign up with email and password
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Sign Up Error:", email, password, error.message);
    return null;
  }

  // Step 2: Add username to user profile after successful sign-up
  const { user } = data;

  const { error: profileError } = await supabase
    .from("users") // Assuming you have a profiles table to store user details
    .insert({
      id: user.id, // Use the user's ID from Supabase authentication
      //email: user.email,
      //created_at: new Date().toISOString(),
      display_name: username, // Add the username to the profile table
    });

  if (profileError) {
    console.error("Profile Error:", profileError.message);
    return null;
  }

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
