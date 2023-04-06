import React, { useState, useEffect } from "react";
import { auth, database } from "./config.jsx";
import LogoutButton from "./LogoutButton.jsx"

function SideBar(props) {
  
  return (
    <>
        <div className="sidebar">
            {/* Menu for buttons */}
            <div className="side">
                <div className="title_logo">
                {/* Add logo image here */}
                <img src={require("../images/bitmap.png")} alt="Image of Parchment's logo." width={"60%"} />
                </div>

                <div>
                {/* Username */}
                <h3 className="username">{props.user}</h3>
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
        
        {/* <LogoutButton 
          authen={auth}
          logout_dis={props.logout_dis}
        /> */}

        
    </>
  );
}

export default SideBar;


