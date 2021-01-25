import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../redux/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
	const { shippingAddress } = useSelector(state => state.cart)
	const { userInfo } = useSelector(state => state.userLogin)
	const [address, setAddress] = useState(
		shippingAddress.address ? shippingAddress.address : ''
	)
	const [city, setCity] = useState(
		shippingAddress.city ? shippingAddress.city : ''
	)
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode ? shippingAddress.postalCode : ''
	)
	const [country, setCountry] = useState(
		shippingAddress.country ? shippingAddress.country : ''
	)
	const { push } = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userInfo) {
			push('/login')
		}
	}, [push, userInfo])

	const submitHandler = e => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 loggedIn={userInfo} />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						required
						onChange={e => setAddress(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						required
						onChange={e => setCity(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						required
						onChange={e => setPostalCode(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						required
						onChange={e => setCountry(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
