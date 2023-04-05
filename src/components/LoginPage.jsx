import "../App.css";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./config";

import HomePage from "../components/HomePage";

export default function LoginPage() {
  // -------------------------------------------------------------------------------
  // STATE VARIABLES

  const [s_email, setS_Email] = useState("");
  const [s_password, setS_Password] = useState("");
  const [l_email, setL_Email] = useState("");
  const [l_password, setL_Password] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // -------------------------------------------------------------------------------
  // FUNCTION: SIGN UP

  function signup() {
    createUserWithEmailAndPassword(auth, s_email, s_password)
      .then(() => {
        alert('Account successfully created.');
      })
      .catch((error) => alert('Creating an account was not successful.'));
  }

  // -------------------------------------------------------------------------------
  // FUNCTION: LOG IN

  function login() {
    signInWithEmailAndPassword(auth, l_email, l_password)
      .then(() => {
        setIsLoggedIn(true);
        setL_Email('');
        setL_Password('');
      })
      .catch((error) => alert("Couldn't Sign in."));
  }

  // -------------------------------------------------------------------------------
  // FUNCTION: LOG OUT

  function logout(e) {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => alert("Couldn't Log Out."));
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          {/*----------------------- SIGN UP ----------------------- */}

          <div className="box">
            <p> Sign up for an account: </p>

            <input
              type="text"
              id="sign_email"
              placeholder="Email/Username"
              onChange={(e) => setS_Email(e.target.value)}
            />
            <br />
            <input
              type="password"
              id="sign_password"
              placeholder="Password"
              onChange={(e) => setS_Password(e.target.value)}
            />
            <button
              className="btn"
              onClick={(e) => {
                document.getElementById("sign_email").value = "";
                document.getElementById("sign_password").value = "";
                e.preventDefault();
                signup();
              }}
            >
              Sign Up
            </button>
          </div>
          <br />
          {/*----------------------- LOG IN ----------------------- */}

          <div className="box">
            <p> Log in to your account: </p>
            <input
              type="text"
              placeholder="Email/Username"
              onChange={(e) => setL_Email(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setL_Password(e.target.value)}
            />
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Log In
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      {/*----------------------- REDIRECT PAGE ----------------------- */}

      {isLoggedIn ? (
        <>
          <div className="background">
            <div>
              <HomePage curr_username={auth.currentUser.email} />
            </div>

            {/* Logout Button */}
            <div className="sidebar">
              <button
                className="btn logout"
                onClick={(e) => { logout(e); }}
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
