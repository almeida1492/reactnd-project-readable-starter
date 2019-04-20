import { getAllCommentsAPI } from '../helpers/api'

export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAN_COMMENTS_ARRAY = 'CLEAN_COMMENTS_ARRAY'

function getAllComments(comments){
	return {
		type: GET_COMMENTS,
		comments,
	}
}

export function getAllCommentsThunk(id){
	return (dispatch) => {
		getAllCommentsAPI(id).then((comments) => dispatch(getAllComments(comments)))
	}
}

export function cleanCommentsArray(){
	return {
		type: CLEAN_COMMENTS_ARRAY,
		comments: {},
	}
}