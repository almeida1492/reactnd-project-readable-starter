import { GET_CATEGORIES } from '../actions/categories.js'

export default function categories(state = {}, action){
	console.log(state)
	switch(action.type){
		case GET_CATEGORIES :
			return {
				...state,
				...action.categories,
			}
		default :
			return state
	}
}