import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
	switch (type) {
		case CART_ADD_ITEM:
			const item = payload
			const existItem = state.cartItems.find(
				cartItem => cartItem.product === item.product
			)

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(cartItem =>
						cartItem.product === existItem.product ? item : cartItem
					),
				}
			} else {
				return { ...state, cartItems: [...state.cartItems, item] }
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(item => item.product !== payload),
			}
		default:
			return state
	}
}