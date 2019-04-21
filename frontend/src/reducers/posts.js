import { 
	RECEIVE_POSTS, 
	RECEIVE_POST, 
	ADD_POST, 
	VOTE_ON_POST, 
	GET_POSTS_BY_CATEGORY,
	EDIT_POST,
	DELETE_POST
} from '../actions/posts.js'

export default function posts (state = {}, action){
	let index = ''

	switch(action.type){
		case RECEIVE_POSTS :
			return {
				...state,
				...action.posts,
			}
		case RECEIVE_POST :
			return {
				post: action.post,
			}
		case ADD_POST :
			return {
				...state,
				[action.post.id]:  action.post,
			}
		case VOTE_ON_POST :
			index = Object.keys(state).filter((key) => 
				state[key].id === action.post.id ? key : null)
			return {
				...state,
				[index]: action.post,
			}
		case GET_POSTS_BY_CATEGORY :
			return {
				...action.posts,
			}
		case EDIT_POST :
			index = Object.keys(state).filter((key) => 
				state[key].id === action.post.id ? key : null)
			return {
				...state,
				[index]: action.post,
			}
		case DELETE_POST : 
			Object.keys(state).forEach((key) => key === action.post.id ? delete state[key] : null)
			return {
				...state,
			}
		default :
			return state
	}
}