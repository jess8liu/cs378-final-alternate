import React, { useState, useEffect } from 'react'
import { uid } from 'uid';
import { auth, database } from "./config.jsx";

const EditPage = (post) => {

    const [note, setNote] = useState('');
    const post_ref = ref(database, post)

    // deletes the entire post from the database
    const handleDelete = () => {
        alert('Note will be deleted')
        // implement fully once database is running 
        post_ref.remove()
    }

    // adds tag to the database
    const handleAddTags = (e) => {
        // implement fully once firebase is running
        alert('Handling Tags')
        const tag_ref = ref(database, post + '/' + 'tags')

    }

    // updates the note to the database
    const updateNote = (e) => {
        alert('updating:', note)
        set(ref(database, uid, '/text'),
            note)
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
                    {note}
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