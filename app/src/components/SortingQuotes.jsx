import { useContext, useEffect, useState } from 'react';
// css
import './css/sortingQuotes.css';
import AppContext from '../context/AppContext';

export const SortingQuotes = () => {
	const { handleSelectChange, tags, dropdown, setDropdown } = useContext(AppContext);

	return (
		<section>
			<div className="sorting">
				<form>
					<div className="multiselect">
						<div className="selectBox" onClick={() => setDropdown((prevState) => !prevState)}>
							<select>
								<option>Select an option</option>
							</select>
							<div className="overSelect" />
						</div>
						{dropdown && (
							<div id="checkboxes">
								{tags.map((tag, index) => (
									<label htmlFor={tag} key={index}>
										<input type="checkbox" id={tag} onChange={handleSelectChange} name={tag} />{tag}
									</label>
								))}
							</div>
						)}
					</div>
				</form>
			</div>
		</section>
	);
};
