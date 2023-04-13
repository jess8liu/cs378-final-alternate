import React, { useState, useEffect } from 'react'
// import { uid } from 'uid';
// import { auth, database } from "./config.jsx";
// import { set, ref, onValue, remove, update } from "firebase/database";
import MapCells from './MapCells';

function ImageEditPage(props) {

	return (
		<div>
			<div>
				<textarea className='title_input' rows='1' placeholder='Set Title' value={props.title}
				// onChange={(e) => setTitle(e.target.value)}
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
				<button onClick={() => props.deleteImage(props.src)}>Trash</button>
			</div>
		</div>
	)
}

export default ImageEditPage;