import { GET_CATEGORIES, GET_CATEGORY_POSTS } from '../actions/categories.js'

export default function categories(state = {}, action){
	switch(action.type){
		case GET_CATEGORIES :
			return {
				...state,
				...action.categories,
			}
		case GET_CATEGORY_POSTS :
			return {
				posts: action.posts,
			}
		default :
			return state
	}
}