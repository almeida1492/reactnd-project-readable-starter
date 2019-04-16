import { getAll, add } from '../api-server/posts.js'

export const ADD_POST = 'ADD_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(posts){
	return {
		type: RECEIVE_POSTS,
		posts,
	}
}

export function receivePostsThunk(token){
	return (dispatch) => {
		return getAll(token).then((posts) => dispatch(receivePosts(posts)))
	}
}

function addPost(post){
	return{
		type: ADD_POST,
		post,
	}
}

//addPost thunk
export function addPostThunk(newPost){
	return (dispatch) => {
		return add(token, newPost).then((post) => dispatch(addPost(post)))
	}
}