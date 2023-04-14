import React, { useState, useEffect } from 'react'
import { storage } from "./config.jsx";
import { ref as storageRef, uploadBytes, listAll, getDownloadURL, deleteObject, updateMetadata, uploadBytesResumable, getMetadata} from "firebase/storage";

// import { uid } from 'uid';
import { auth, database } from "./config.jsx";
import { set, ref, onValue, remove, update } from "firebase/database";
import MapCells from './MapCells';

function ImageEditPage(props) {
	const [title, setTitle] = useState("");
	const imageRef = storageRef(storage, props.src);

	const newMetaData = {
		customMetadata: {
		  noteTitle: title,
		}
	  }

	useEffect(() => {
		getMetadata(imageRef).then((metadata) => {
			setTitle(metadata.customMetadata.noteTitle);
		}).catch((error) => {
			alert(error);
		})
	}, []);

	const updateNote = () => {
		updateMetadata(imageRef, newMetaData)
	}


	return (
		<div>
			<div>
				<textarea className='title_input' rows='1' placeholder='Set Title' value={title}
				onChange={(e) => setTitle(e.target.value)}
				>
				</textarea>
				{/* <h1>Title</h1> */}
				{/* <button className='edit_page_btns' onClick={handleAddTags}>Add Tags</button> */}
				<button className='edit_page_btns'>Pin</button>
			</div>
			<div>

				<div className='map' style={{
					background_size: 'contain'
				}}>
					<img src={props.src}></img>
					{/* <MapCells /> */}
				</div>
			</div>
			<div>
				<button onClick={() => { updateNote(); }}> Submit </button>
				<button onClick={() => props.deleteImage(props.src)}>Trash</button>
			</div>
		</div>
	)
}

export default ImageEditPage;