import { RECEIVE_POSTS, RECEIVE_POST, ADD_POST, VOTE_ON_POST, GET_POSTS_BY_CATEGORY } from '../actions/posts.js'

export default function posts (state = {}, action){

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
			const index = Object.keys(state).filter((key) => 
				state[key].id === action.post.id ? key : null)
			return {
				...state,
				[index]: action.post,
			}
		case GET_POSTS_BY_CATEGORY :
			return {
				...action.posts,
			}
		default :
			return state
	}
}