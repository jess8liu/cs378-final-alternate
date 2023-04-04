import "../App.css";
import React, { useState, useEffect } from "react";
import { set, ref, onValue } from "firebase/database";
import { auth, database } from "./config.jsx";
import { uid } from "uid";
import Note from "./Note"
import Notetaker from "./Notetaker";

export default function HomePage(props) {
  // ----------------------------------------------------------------------
  // VARIABLES

  const user = uid();
  const [artist, setArtist] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ----------------------------------------------------------------------
  // FUNCTIONS

  function saveArtist() {
    // 0. Error Message
    if (name === "") {
      setErrorMsg("Missing Name.");
      return;
    } else {
      setErrorMsg("");
    }

    set(ref(database, `/${auth.currentUser.uid}/${user}`), {
      user: user,
      text: name
    })
      .then(() => {
        alert("saved changes to Notes");
      })
      .catch((error) => {
        alert(error);
      });

    // Setting favorite artist
    setArtist(name);
    setName("");
  }

  // Load list on screen & load from database
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(database, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val();
          setArtist("");
          if (data != null) {
            let lastobj = Object.values(data).pop();
            setArtist(lastobj.text);
          }
        });
      }
    });
  }, []);

  // ----------------------------------------------------------------------
  // DISPLAYED ON WEBSITE
  return (
    <>
      <div className="sidebar">
        {/* Menu for buttons */}
        <div className="side box">
          <div className="title_logo">
            {/* Add logo image here */}
            <img src={require("../images/bitmap.png")} alt="Image of Parchment's logo." width={"60%"} />
          </div>

          <div>
            <h3>{props.curr_username}</h3>
          </div>
        </div>
        <div className="user_btns_box">
          <button className="subheader_btns">
            Maps
          </button>
          <button className="subheader_btns">
            Characters
          </button>
        </div>
      </div>


      <div className="notes_home">
        {/* Header on top of the page */}
        <div className="title_header">
          <h1>
            Parchment
          </h1>
        </div>

        {/* Subheader with buttons for notes homepage */}
        <div className="subheader_btns">
          <button className="note_editor_btn">
            Add Note
          </button>
          <button className="note_editor_btn">
            Remove Note
          </button>
          <button className="note_editor_btn">
            Edit Note
          </button>
        </div>

        {/* List of Notes */}
        <div className="note_list box">
          <div className="box">
            <h3>All Notes</h3>
          </div>

          <br />

          <Notetaker/>
          <div className="singular_note">
            <Note title_dis="Title" text_dis=""hello/>
          </div>
          <div className="singular_note">
            <Note title_dis="Title" />
          </div>
          <div className="singular_note">
            <Note title_dis="Title" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="box">
          <p>
            Add a new note
          </p>
          <form>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn save"
              onClick={(e) => {
                e.preventDefault();
                saveArtist();
              }}
            >
              Save
            </button>

            {errorMsg && <p className="error"> {errorMsg} </p>}
          </form>
        </div>

        {/* Save Button*/}
        <div className="btns_list"></div>
      </div>

    </>
  );
}
