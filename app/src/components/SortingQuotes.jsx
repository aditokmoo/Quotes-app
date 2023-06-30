import { useContext } from 'react';
import AppContext from '../context/AppContext';

export const SortingQuotes = () => {
	const { handleFilterChange } = useContext(AppContext)

	return (
		<section>
			<div className="sorting">
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
