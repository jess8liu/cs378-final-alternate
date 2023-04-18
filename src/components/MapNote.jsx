import React from "react";

function MapNote(props) {

	const edit_funct = props.edit_funct;

	return (
		<>
			<div className="singular_note">
				<div className="title_section">
					<div className="title">
						{props.title}
					</div>
					<button className="save_btn" onClick={edit_funct}>
						Edit
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
					>
						Trash
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

export default MapNote;