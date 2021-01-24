import { Spinner } from 'react-bootstrap'

const Loader = () => {
	return (
		<Spinner animation='border' role='status' style={spinnerStyles}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	)
}

const spinnerStyles = {
	width: '100px',
	height: '100px',
	margin: 'auto',
	display: 'block',
}

export default Loader
