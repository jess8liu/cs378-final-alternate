import React, { useState, useEffect } from "react";
import { auth, database } from './config';
import { set, ref, onValue } from 'firebase/database';
import { uid } from 'uid';
import Note from './Note.jsx';

export default function Notetaker() {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [listOfNotes, setListOfNotes] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(ref(database, `/${auth.currentUser.uid}`), snapshot => {
          setListOfNotes([]);
          const data = snapshot.val();
          if (data != null) {
            Object.values(data).map(note => {
              setListOfNotes((oldArray) => [note, ... oldArray]);
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
  
  return (
    <>
      {/* Container DIV for all of the notes */}
      <div>
        {/* {
          listOfNotes.map(note => (
            // <Note title_dis={note.title_dis} content_dis={note.content_dis}/>
          ))
        } */}
      </div>
    </>
  )
}