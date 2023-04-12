import "../App.css";
import React, { useState, useEffect } from 'react'
import { uid } from 'uid';
import { auth, database } from "./config.jsx";
import { set, ref, onValue, remove, update } from "firebase/database";

const EditPage = ({ note_info }) => {

	const [note, setNote] = useState(note_info.content);
	const [title, setTitle] = useState(note_info.title);

	// tags to indicate for the note
	const [character, setCharacter] = useState(note_info.character);
	const [lore, setLore] = useState(note_info.lore);
	const [map, setMap] = useState(note_info.map);

	// deletes the entire post from the database
	const handleDelete = () => {
		alert('Note will be deleted')
		// implement fully once database is running 
		remove(ref(database, `/${auth.currentUser.uid}/${note_info.cur_uid}`));
	}

	// adds tag to the database
	const handleAddTags = () => {
		update(ref(database, `/${auth.currentUser.uid}/${note_info.cur_uid}`), {
			character: character,
			lore: lore,
			map: map
		});
	}

	// updates the note to the database
	const updateNote = () => {
		update(ref(database, `/${auth.currentUser.uid}/${note_info.cur_uid}`), {
			title: title,
			content: note,
			cur_uid: note_info.cur_uid,
		});
		alert('updating:', note)
	}

	const handleCharacter = () => {
		setCharacter(!character);
	}

	const handleLore = () => {
		setLore(!lore);
	}

	const handleMap = () => {
		setMap(!map);
	}

	return (
		<div>
			<div>
				<textarea className='title_input' rows='1' placeholder='Set Title' value={title} onChange={(e) => setTitle(e.target.value)}>
				</textarea>
				{/* <h1>Title</h1> */}
				
				<button className={`edit_page_btns ${character ? 'green': 'red'}`} onClick={handleCharacter}> Character </button>
				<button className={`edit_page_btns ${lore ? 'green': 'red'}`} onClick={handleLore}> Lore </button>
				<button className={`edit_page_btns ${map ? 'green': 'red'}`} onClick={handleMap}> Map </button>
				<button className='edit_page_btns' onClick={handleAddTags}>Save Tags</button>
				<button className='edit_page_btns'>Pin</button>
			</div>
			<div>
				<textarea className='note_input' rows='30' value={note} onChange={(e) => { setNote(e.target.value) }}>
				</textarea>
				<button onClick={() => { updateNote(); }}> Submit Text </button>
			</div>
			<div>
				<button onClick={handleDelete}>Trash</button>
			</div>
		</div>
	)
}

export default EditPage