import React, { useEffect, useState } from "react";
import { storage } from "./config.jsx";
import { ref as storageRef, uploadBytes, listAll, getDownloadURL, deleteObject, updateMetadata, uploadBytesResumable, getMetadata } from "firebase/storage";
import SettingList from "./SettingList.jsx";
import note_edit from "../images/note_edit.svg";
import unpinned from "../images/unpinned.svg";
import pinned from "../images/pinned.svg"
import trash from "../images/trash.svg";


function ImageNote(props) {

	const edit_funct = props.edit_funct;
	const [title, setTitle] = useState('');

	useEffect(() => {
		const imageRef = storageRef(storage, props.src);
		getMetadata(imageRef).then((metadata) => {
			setTitle(metadata.customMetadata.noteTitle);
		}).catch((error) => {
			alert(error);
		})
	}, []);

	return (
		<>
			<div className="singular_note">
				<div className="title_section">
					<div className="title">
						{title}
					</div>
					<button className="save_btn" onClick={edit_funct} title="Edit Note">
						<img src={note_edit}/>
					</button>
					<button className="pin_btn" title="Pin Note">
						<img src={unpinned}/>
					</button>
				</div>

				<div className="body_section">
					{/* Input Section (for notes) */}
					<div className="body_image">
						<img src={props.src} width="100%" />
					</div>
				</div>

				<div className="body_section">
					<button className="setting_btn"
					// onClick={toggleSetting}
					>
						Settings
					</button>

					<button className="trash_btn"
						onClick={() => props.deleteImage(props.src)}
						title="Delete Note"
					>
						<img src={trash}/>
					</button>
				</div>

				{/* Settings List */}
				{
					// setting &&
					<>
						<div className="dropdown_div">
							{/* <SettingList
								edit_funct={props.edit_funct}
								trash_funct={() => handleDelete(props.note_info.cur_uid)} /> */}
						</div>
					</>

				}
			</div>
		</>
	);
}

export default ImageNote;