import { GET_COMMENTS, CLEAN_COMMENTS_ARRAY, ADD_COMMENT, VOTE_ON_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/comments'

export default function comments(state = {}, action){
	let index = ''
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
			index = Object.keys(state).find((key) => 
				state[key].id === action.comment.id ? key : null)
			return {
				...state,
				[index]: action.comment
			}
		case EDIT_COMMENT :
			index = Object.keys(state).find((key) => 
				state[key].id === action.comment.id ? key : null)
			return {
				...state,
				[index]: action.comment
			}
		case DELETE_COMMENT :
			const newState = { ...state }
			Object.keys(state).forEach((key) => key === action.comment.id ? delete newState[key] : null)
			return {
				...newState,
			}
		default :
			return state
	}
}