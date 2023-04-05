import React, { useState, useEffect } from 'react'
import { uid } from 'uid';
import { auth, database } from "./config.jsx";
import { set, ref, onValue, remove, update } from "firebase/database";

const EditPage = ({note_info}) => {

	const [note, setNote] = useState(note_info.content);
	// deletes the entire post from the database
	const handleDelete = () => {
		alert('Note will be deleted')
		// implement fully once database is running 
		remove(ref(database, `/${auth.currentUser.uid}/${note_info.cur_uid}`));
	}

	// adds tag to the database
	const handleAddTags = (e) => {
		// implement fully once firebase is running
		alert('Handling Tags')
		//   const tag_ref = ref(database, post_uid + '/' + 'tags')

	}

	// updates the note to the database
	const updateNote = (e) => {
		update(ref(database, `/${auth.currentUser.uid}/${note_info.cur_uid}`), {
			content: note,
			cur_uid: note_info.cur_uid,
		});
		alert('updating:', note)
	}

	return (
		<div>
			<div>
				<h1>Title</h1>
				<button onClick={handleAddTags}>Add Tags</button>
				<button>Pin</button>
				<button>Settings</button>
			</div>
			<div>
				<textarea rows='30' value={note} onChange={(e) => setNote(e.target.value)}>
				</textarea>
				<button onClick={updateNote}> Submit Text </button>
			</div>
			<div>
				<button onClick={handleDelete}>Trash</button>
			</div>
		</div>
	)
}

export default EditPage