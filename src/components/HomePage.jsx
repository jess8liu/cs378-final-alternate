import "../App.css";
import React, { useState, useEffect } from "react";
import { set, ref, onValue, remove } from "firebase/database";
import { auth, database } from "./config.jsx";
import { uid } from "uid";
import Note from "./Note"
import Notetaker from "./Notetaker";
import SettingList from "./SettingList";

export default function HomePage(props) {
  // ----------------------------------------------------------------------
  // VARIABLES

  const [artist, setArtist] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ----------------------------------------------------------------------
  // FUNCTIONS

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [listOfNotes, setListOfNotes] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(ref(database, `/${auth.currentUser.uid}`), (snapshot) => {
          setListOfNotes([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((note) => {
              setListOfNotes((oldArray) => [...oldArray, note]);
            })
          }
        })
      }
    })
  }, []);



  const writeToDatabase = () => {
    const cur_uid = uid();
    set(ref(database, `/${auth.currentUser.uid}/${cur_uid}`), {
      title: title,
      content: note,
      cur_uid: cur_uid,
    })
    setNote("");
  };

  /*
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
  */
  
  // ----------------------------------------------------------------------
  // NOTE FUNCTIONS
  const [pin, setPin] = useState(false);
  // const [title, setTitle] = useState(props.title_dis);
  const [content, setContent] = useState(props.content_dis)
  const [setting, setSetting] = useState(false);
  const togglePin = (e) => {
    e.preventDefault();
    setPin(!pin);
    console.log("Pin: " + pin);
  };

  const toggleSetting = (e) => {
    e.preventDefault();
    setSetting(!setting);
  };

  const handleDelete = (uid) => {
  //  alert("Note will be deleted");
    // implement once database is running
    remove(ref(database, `/${auth.currentUser.uid}/${uid}`));
  };

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
          <input type="Text" placeholder="text" value={note} onChange={(e) =>setNote(e.target.value)}></input>
          <button className="note_editor_btn" onClick={writeToDatabase}>
            Add Note
          </button>
          {/* <button className="note_editor_btn" onClick={remove}>
            Remove Note
          </button>
          <button className="note_editor_btn" onClick={edit}>
            Edit Note
          </button> */}
        </div>

        {/* List of Notes */}
        <div className="note_list box">
          <div className="box">
            <h3>All Notes</h3>
          </div>

          <br />

          <div>
            {
              listOfNotes.map(note => (
                <>
                  <div className="title_section">
                    <div className="title">{note.title}</div>
                    <button className="pin_btn" onClick={togglePin}>
                      Pin
                    </button>
                  </div>

                  <div className="body_section">
                    {/* Input Section (for notes) */}
                    <textarea className="body_section textbox" value={note.content}>
                      {/* {<Notetake/>} */}
                    </textarea>
                    <div> Inside of div:
                    {note.content}
                    </div>
                  </div>

                  <div className="body_section">
                    <button className="setting_btn" onClick={toggleSetting}>
                      Settings
                    </button>
                    <button className="save_btn" onClick={toggleSetting}>
                      Save
                    </button>
                    <button className="trash_btn" onClick={() => handleDelete(note.cur_uid)}>
                      Trash
                    </button>
                  </div>

                  {/* Settings List */}
                  {setting && <SettingList />}
                </>
                // <Note title_dis={note.title_dis} content_dis={note.content_dis} />
              ))
            }
          </div>

          <div className="singular_note">
            <Note title_dis="Title" text_dis="" hello />
          </div>
          <div className="singular_note">
            <Note title_dis="Title" />
          </div>
          <div className="singular_note">
            <Note title_dis="Title" />
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="box">
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
