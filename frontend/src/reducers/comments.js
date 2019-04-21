import { GET_COMMENTS, CLEAN_COMMENTS_ARRAY, ADD_COMMENT, VOTE_ON_COMMENT } from '../actions/comments'

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
		case ADD_COMMENT : 
			return {
				...state,
				[action.comment.id]: action.comment,
			}
		case VOTE_ON_COMMENT :
			const index = Object.keys(state).filter((key) => 
				state[key].id === action.comment.id ? key : null)
			return {
				...state,
				[index]: action.comment
			}
		default :
			return state
	}
}