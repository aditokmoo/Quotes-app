import { useContext, useState } from 'react';
// css
import './css/filterQuotes.css';
import AppContext from '../context/AppContext';

export const FilterQuotes = () => {
	const {handleFilterChange} = useContext(AppContext)

	return (
		<section>
			<div className="filter">
				<form>
					<select name="" id="" onChange={(e) => handleFilterChange(e)}>
						<option value="">Filter quotes</option>
                        <option value="createdAt">Created</option>
                        <option value="author">Author</option>
                        <option value="upvotesCount">Up votes</option>
                        <option value="downvotesCount">Down votes</option>
					</select>
				</form>
			</div>
		</section>
	);
};
