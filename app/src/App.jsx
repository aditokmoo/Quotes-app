import { Link } from 'react-router-dom';
// Components
import { SortingQuotes } from './components/SortingQuotes';
import { FilterQuotes } from './components/FilterQuotes';
import { Quote } from './components/Quote';
import { Pagination } from './components/Pagination';
// toastify
import { ToastContainer } from 'react-toastify';
// Icons
import { FaPlus } from 'react-icons/fa';
// CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
	return (
		<main>
			<div className="container">
				<h1>Quotes</h1>
				<div className="section">
					<div className="select_section">
						<FilterQuotes />
						<SortingQuotes />
					</div>
					<Quote />
					<Pagination />
				</div>
				<div className="add_quote">
					<Link to="/add">
						<FaPlus className="add_icon" />
					</Link>
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
		</main>
	);
}

export default App;
