import { 
	getAllPostsAPI, 
	getPostAPI, 
	savePostAPI, 
	voteOnPostAPI, 
	getPostsByCategoryAPI, 
	editPostAPI,
	deletePostAPI 
} from '../helpers/api.js'

import { formatElements } from '../helpers/formatElements'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export function receivePosts(posts){
	return {
		type: RECEIVE_POSTS,
		posts: formatElements(posts),
	}
}

export function receivePostsThunk(){
	return (dispatch) => {
		return getAllPostsAPI().then((posts) => {
			dispatch(receivePosts(posts))
		})
	}
}

function receivePost(post){
	return {
		type: RECEIVE_POST,
		post,
	}
}

export function receivePostThunk(id){
	return (dispatch) => {
		return getPostAPI(id).then((post) => dispatch(receivePost(post)))
	}
}

function addPost(post){
	return{
		type: ADD_POST,
		post,
	}
}

export function addPostThunk(newPost){
	return (dispatch) => {
		return savePostAPI(newPost).then((post) => dispatch(addPost(post)))
	}
}

function voteOnPost(post){
	return {
		type: VOTE_ON_POST,
		post,
	}
}

export function voteOnPostThunk(data, vote){
	return (dispatch) => {
		return voteOnPostAPI(data, vote).then((post) => dispatch(voteOnPost(post)))
	}
}

function getPostsByCategory(posts){
	return {
		type: GET_POSTS_BY_CATEGORY,
		posts: formatElements(posts),
	}
}

export function getPostsByCategoryThunk(category){
	return (dispatch) => {	
		return getPostsByCategoryAPI(category).then((posts) => {
			dispatch(getPostsByCategory(posts))
		})
	}
}

export function editPost(post){
	return {
		type: EDIT_POST,
		post,
	}
}

export function editPostThunk(id, post){
	return (dispatch) => {
		return editPostAPI(id, post).then((editedPost) => dispatch(editPost(editedPost)))
	}
}

export function deletePost(post){
	return {
		type: DELETE_POST,
		post
	}
}

export function deletePostThunk(id){
	return (dispatch) => {
		return deletePostAPI(id).then((post) => dispatch(deletePost(post)))
	}
}