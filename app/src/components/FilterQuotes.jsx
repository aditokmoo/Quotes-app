import { useContext } from 'react';
// css
import './css/filterQuotes.css';
import AppContext from '../context/AppContext';

export const FilterQuotes = () => {
	const { handleSelectChange, tags, dropdown, setDropdown } = useContext(AppContext);

	return (
		<section>
			<div className="filter">
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
