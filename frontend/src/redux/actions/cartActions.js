import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data: product } = await axios.get(`/api/products/${id}`)

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: product._id,
			name: product.name,
			image: product.image,
			price: product.price,
			countInStock: product.countInStock,
			qty,
		},
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = id => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = shippingAddress => dispatch => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: shippingAddress,
	})

	localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
}

export const savePaymentMethod = paymentMethod => dispatch => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: paymentMethod,
	})

	localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}
