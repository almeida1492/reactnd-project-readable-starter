import { RECEIVE_POSTS, RECEIVE_POST, ADD_POST, VOTE_ON_POST } from '../actions/posts.js'

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
			return {
				post: action.post,
			}
		default :
			return state
	}
}