import "../App.css";
import React, { useState, useEffect } from "react";
import { set, ref, onValue, remove } from "firebase/database";
import { auth, database } from "./config.jsx";
import { uid } from "uid";
import Note from "./Note"
// import Notetaker from "./Notetaker";
import SettingList from "./SettingList";
import EditPage from "./EditPage";

export default function HomePage(props) {
  // ----------------------------------------------------------------------
  // VARIABLES
  const [title, setTitle] = useState('');
  const [listOfNotes, setListOfNotes] = useState([]);
  const [pin, setPin] = useState(false);
  const [content, setContent] = useState(props.content_dis)
  const [setting, setSetting] = useState(false);
  const [isEditing, setEditingState] = useState(false);
  const [edit_info, setEdit_Info] = useState('');
  // ----------------------------------------------------------------------
  // FUNCTIONS
  // Shows the list of notes
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

  // Writes to database
  const writeToDatabase = () => {
    const cur_uid = uid();
    set(ref(database, `/${auth.currentUser.uid}/${cur_uid}`), {
      title: title,
      content: "",
      is_pinned: pin,
      cur_uid: cur_uid,
    })
  };

  // ----------------------------------------------------------------------
  // NOTE FUNCTIONS
  // Pins notes to the top of note list
  const togglePin = (is_pinned) => {
    is_pinned.preventDefault();
    setPin(!is_pinned);
    console.log("Pin: " + is_pinned);
  };

  // Displays settings of notes
  const toggleSetting = (e) => {
    e.preventDefault();
    setSetting(!setting);
  };

  // Deletes the note; probably add an alert before completely deleting note
  const handleDelete = (uid) => {
    // implement once database is running
    remove(ref(database, `/${auth.currentUser.uid}/${uid}`));
  };

  const handleUpdate = (note) => {
    setEdit_Info(note);
    setEditingState(true);
    // Pass the uid and information to the editing page
  }

  // Return from the editing page
  const handleExitEdit = (e) => {
    setEditingState(false);
  }

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
          {/* <input type="Text" placeholder="text" value={note} onChange={(e) => setNote(e.target.value)}></input> */}
          <button className="note_editor_btn" onClick={writeToDatabase}>
            Add Note
          </button>
        </div>

        {/* List of Notes */}
        <div className="note_list box">
          <div className="box">
            <h3>All Notes</h3>
          </div>

          <br />

          <div>
            {/* Show the notes if person is not currently editing the notes */}
            {!isEditing ? (
              <>
                <div className="singular_note">
                  <Note title_dis="Title" text_dis="" hello />
                </div>
                <div className="singular_note">
                  <Note title_dis="Title" />
                </div>
                <div className="singular_note">
                  <Note title_dis="Title" />
                </div>
                {listOfNotes.map(note => (
                  <>
                    <div className="title_section">
                      <div className="title">{note.title}</div>
                      <button className="pin_btn" onClick={() => togglePin(note.is_pinned)}>
                        Pin
                      </button>
                    </div>

                    <div className="body_section">
                      {/* Input Section (for notes) */}
                      <textarea className="body_section textbox" value={note.content}>
                      </textarea>
                    </div>

                    <div className="body_section">
                      <button className="setting_btn" onClick={toggleSetting}>
                        Settings
                      </button>
                      <button className="save_btn" onClick={() => handleUpdate(note)}>
                        Edit
                      </button>
                      <button className="trash_btn" onClick={() => handleDelete(note.cur_uid)}>
                        Trash
                      </button>
                    </div>

                    {/* Settings List */}
                    {setting && <SettingList />}
                  </>
                ))}
              </>
            ) : (
                <>
                  {/* Put the editing page here if edit is in order */}
                  <button onClick={handleExitEdit}>
                    Exit
                  </button>
                  <EditPage note_info={edit_info} />
                </>
            )}
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
