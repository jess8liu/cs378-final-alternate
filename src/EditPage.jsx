import React, { useState, useEffect } from 'react'
import { uid } from 'uid';
import { auth, db } from '../firebase';

const EditPage = () => {

    const handleDelete = () => {
        alert('Note will be deleted')
        // implement once database is running 
    }

    const handleAddTags = (e) => {
        // implement once firebase is running
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
                TEXTBOX
            </div>
            <div>
                <button onClick={handleDelete}>Trash</button>
            </div>
        </div>

    )
}

export default EditPage