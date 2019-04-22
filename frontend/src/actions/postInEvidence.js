import { getPostAPI } from '../helpers/api'

export const GET_POST = 'GET_POST'

export function getPost(post){
	return {
		type: GET_POST,
		post,
	}
}

export function getPostThunk(id){
	return (dispatch) => {
		return getPostAPI(id).then((post) => dispatch(getPost(post)))
	}
}