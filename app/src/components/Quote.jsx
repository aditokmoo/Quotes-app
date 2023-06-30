import AppContext from '../context/AppContext';
import { useContext } from 'react';
// Icons
import { VscTriangleUp, VscTriangleDown } from 'react-icons/vsc';
// css
import './css/quote.css';

export const Quote = () => {
	const { quotes, voteDown, voteUp, getColorByRating } = useContext(AppContext)

	return quotes.map(({ id, author, content, upvotesCount, downvotesCount, givenVote }) => (
		<div className="quote" key={id}>
			<div className="rating">
				<span>
					<VscTriangleUp className={givenVote === 'upvote' ? 'rating_icon active' : 'rating_icon'} onClick={() => voteUp(id)} />
				</span>
				<span
					className={`rating_percentage ${getColorByRating(
						Math.round(upvotesCount + downvotesCount === 0 ? 0 : Math.round(upvotesCount / (upvotesCount + downvotesCount) * 100))
					)}`}
				>
					{upvotesCount + downvotesCount === 0 ? 0 : Math.round(upvotesCount / (upvotesCount + downvotesCount) * 100)} %
				</span>
				<span className="rating_count">
					{upvotesCount} / {downvotesCount}
				</span>
				<span>
					<VscTriangleDown className={givenVote === 'downvote' ? 'rating_icon active' : 'rating_icon'} onClick={() => voteDown(id)} />
				</span>
			</div>
			<div className="content">
				<p className="content_rate">{content}</p>
				<span className="content_author">- {author}</span>
			</div>
		</div>
	));
};
