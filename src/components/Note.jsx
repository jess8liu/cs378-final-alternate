import React, { useState, useEffect } from "react";
import SettingList from "./SettingList";
import Notetake from "./Notetaker";

function Note(props) {
  const togglePin = (e) => {
    e.preventDefault();
    setPin(!pin);
    console.log("Pin: " + pin);
  };

  const toggleSetting = (e) => {
    e.preventDefault();
    setSetting(!setting);
  };

  const handleDelete = () => {
    alert("Note will be deleted");
    // implement once database is running
    
  };

  const [pin, setPin] = useState(false);
  const [title, setTitle] = useState(props.title_dis);
  const [content, setContent] = useState(props.content_dis)
  const [setting, setSetting] = useState(false);

  return (
    <>
      <div className="title_section">
        <div className="title">{title}</div>
        <button className="pin_btn" onClick={togglePin}>
          Pin
        </button>
      </div>

      <div className="body_section">
        {/* Input Section (for notes) */}
        <textarea className="body_section textbox">
          {/* {<Notetake/>} */}
          {props.text_dis}
        </textarea>
      </div>

      <div className="body_section">
        <button className="setting_btn" onClick={toggleSetting}>
          Settings
        </button>
        <button className="trash_btn" onClick={handleDelete}>
          Trash
        </button>
      </div>

      {/* Settings List */}
      {setting && <SettingList />}
    </>
  );
}

export default Note;
