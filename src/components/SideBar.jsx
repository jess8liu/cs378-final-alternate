import React, { useState, useEffect } from "react";
// import { auth, database } from "./config.jsx";
// import LogoutButton from "./LogoutButton.jsx"
// import HomePage from "./HomePage.jsx";
function SideBar(props) {

  return (
    <>
      <div className="sidebar">
        {/* Menu for buttons */}
        <div className="side">
          <div className="title_logo">
            {/* Add logo image here */}
            <img src={require("../images/bitmap.png")} alt="Parchment's logo." width={'50%'} />
          </div>

          <div>
            {/* Username */}
            <h3 className="username">{props.user}</h3>
          </div>
        </div>
        <div className="side_btns_box">
          <button className="side_subheader_btns" onClick={props.resetSearch}>
            All Notes
          </button>
          <button className="side_subheader_btns" onClick={() => props.handleTag("map")}>
            Maps
          </button>
          <button className="side_subheader_btns" onClick={() => props.handleTag("character")}>
            Characters
          </button>
          <button className="side_subheader_btns" onClick={() => props.handleTag("lore")}>
            Lore
          </button>

        </div>
      </div>

      {/* <LogoutButton 
          authen={auth}
          logout_dis={props.logout_dis}
        /> */}


    </>
  );
}

export default SideBar;


