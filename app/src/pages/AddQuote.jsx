import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//css
import './css/addQuote.css';

export const AddQuote = () => {
	const { addQuote, handleFormChange, formData } = useContext(AppContext);

	return (
		<section>
			<div className="container">
				<div className="form">
					<h1>Add Quote</h1>
					<form onSubmit={addQuote}>
						<div className="form_container">
							<div className="input_container">
								<label htmlFor="author">Author</label>
								<input
									type="text"
									placeholder="Enter author..."
									id="author"
									value={formData.author}
									name="author"
									onChange={handleFormChange}
									required
								/>
							</div>
							<div className="input_container">
								<label htmlFor="content">Content</label>
								<input
									type="text"
									placeholder="Enter content..."
									id="content"
									value={formData.content}
									name="content"
									onChange={handleFormChange}
									required
								/>
							</div>
							<div className="input_container">
								<label htmlFor="tags">Tags</label>
								<input
									type="text"
									placeholder="Enter tags..."
									id="tags"
									value={formData.tags}
									name="tags"
									onChange={handleFormChange}
									required
								/>
							</div>
							<div className="btns">
								<button>Submit</button>
								<Link to="/">
									<button>Back</button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover
				theme="dark"
			/>
		</section>
	);
};
