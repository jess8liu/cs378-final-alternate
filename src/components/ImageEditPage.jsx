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
				<div className='map' style={{ backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0585/4239/1348/products/ForestEncampment_digital_day_grid.jpg?v=1676584019")'}}>
					{/* <img src={props.src}></img> */}
					<MapCells />
				</div>
			</div>
			<div>
				{/* <button onClick={handleDelete}>Trash</button> */}
			</div>
		</div>
	)
}

export default ImageEditPage;