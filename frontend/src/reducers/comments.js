import { GET_COMMENTS, CLEAN_COMMENTS_ARRAY } from '../actions/comments'

export default function comments(state = {}, action){
	switch(action.type){
		case GET_COMMENTS :
			return {
				...state,
				...action.comments,
			}
		case CLEAN_COMMENTS_ARRAY :
			return {
				...action.comments,
			}
		default :
			return state
	}
}