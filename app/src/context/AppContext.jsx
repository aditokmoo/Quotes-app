import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [ quotes, setQuotes ] = useState([]);
	const [ totalQuotes, setTotalQuotes ] = useState();
	const [ updateQuote, setUpdateQuote ] = useState();
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ filter, setFilter ] = useState();
	const [ formData, setFormData ] = useState({
		author: '',
		content: '',
		tags: []
	});

	const [ tags, setTags ] = useState();
	const [ dropdown, setDropdown ] = useState(false);
	const [ selected, setSelected ] = useState([]);

	const getTags = async () => {
		try {
			const res = await fetch('http://localhost:3000/tags');
			const data = await res.json();

			setTags(data);
		} catch (error) {
			// Error message
			toast.error(error, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'dark'
			});
		}
	};

	const handleSelectChange = (e) => {
		setSelected((prevState) => {
			if (e.target.checked) {
				return [ ...prevState, e.target.name ];
			} else {
				return prevState.filter((name) => name !== e.target.name);
			}
		});
	};

	useEffect(
		() => {
			getTags();
		},
		[ dropdown ]
	);

	const navigate = useNavigate();
	const total_pages = Math.ceil(totalQuotes / 5);

	// Filter
	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};

	// Pagination foward
	const handlePaginationUp = () => {
		setCurrentPage((prevState) => prevState + 1);
	};

	// Pagination back
	const handlePaginationDown = () => {
		setCurrentPage((prevState) => prevState - 1);
	};

	// Handle Form Change
	const handleFormChange = (e) => {
		if (e.target.id === 'tags') {
			// Split the input value into separate words
			const words = e.target.value.split(',').map((word) => word.trim());

			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: words
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value
			}));
		}
	};

	// Add Quote
	const addQuote = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:3000/quotes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const data = await res.json();
			// Clear form data
			setFormData({
				author: '',
				content: '',
				tags: []
			});
			// Success message
			toast.success('Quote posted', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'dark'
			});
			// Link to home page after some time
			setTimeout(() => {
				navigate('/');
			}, 1500);
		} catch (error) {
			// Error message
			toast.error(error, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'dark'
			});
		}
	};

	// Vote up function
	const voteUp = async (id) => {
		const res_post = await fetch(`http://localhost:3000/quotes/${id}/upvote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res_post.status === 200) {
			const post_data = await res_post.json();
			setUpdateQuote(post_data);
		} else if (res_post.status === 400) {
			// Vote already exist so on second click delete vote
			const res_delete = await fetch(`http://localhost:3000/quotes/${id}/upvote`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res_delete.status === 200) {
				const delete_data = await res_delete.json();
				// Success message
				setUpdateQuote(delete_data);
			} else {
				// Error message
				toast.error('First remove vote', {
					position: 'top-right',
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: 'dark'
				});
			}
		} else {
			// Error message
			toast.error('Failed to vote', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'dark'
			});
		}
	};

	// Vote down function
	const voteDown = async (id) => {
		const res_post = await fetch(`http://localhost:3000/quotes/${id}/downvote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res_post.status === 200) {
			const post_data = await res_post.json();
			// Sucess message goes here
			setUpdateQuote(post_data);
		} else if (res_post.status === 400) {
			// Vote already exist so on second click delete vote
			const res_delete = await fetch(`http://localhost:3000/quotes/${id}/downvote`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res_delete.status === 200) {
				const delete_data = await res_delete.json();
				// Success message
				setUpdateQuote(delete_data);
			} else {
				// Error message
				toast.error('First remove vote', {
					position: 'top-right',
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: 'dark'
				});
			}
		} else {
			// Error message
			toast.error('Failed to vote', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'dark'
			});
		}
	};

	// Get Colors by rating
	const getColorByRating = (rate) => {
		switch (true) {
			case rate <= 30:
				return 'orange';
			case rate <= 50:
				return 'light_orange';
			case rate <= 70:
				return 'yellow';
			case rate <= 90:
				return 'light_green';
			case rate <= 100:
				return 'green';
		}
	};

	useEffect(
		() => {
			const getQuotes = async () => {
				const select = selected.join(',');

				try {
					const res = await fetch(
						`http://localhost:3000/quotes?pageSize=5&sortBy=${filter}&page=${currentPage}&tags=${select}`
					);
					const data = await res.json();

					setQuotes(data.quotes);
					setTotalQuotes(data.quotesCount);
				} catch (error) {
					// Error message
			toast.error(error, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: 'dark'
			});
				}
			};
			getQuotes();
		},
		[ updateQuote, filter, currentPage, selected ]
	);

	return (
		<AppContext.Provider
			value={{
				quotes,
				total_pages,
				currentPage,
				formData,
				dropdown,
				tags,
				setDropdown,
				handleSelectChange,
				addQuote,
				handleFormChange,
				handleFilterChange,
				handlePaginationDown,
				handlePaginationUp,
				getColorByRating,
				voteDown,
				voteUp
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
