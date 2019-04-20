import { getAllPostsAPI, getPostAPI, savePostAPI, voteOnPostAPI, getPostsByCategoryAPI } from '../helpers/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'

export function receivePosts(posts){
	console.log(posts)
	return {
		type: RECEIVE_POSTS,
		posts,
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
		posts,
	}
}

export function getPostsByCategoryThunk(category){
	return (dispatch) => {	
		return getPostsByCategoryAPI(category).then((posts) => {
			dispatch(getPostsByCategory(posts))
		})
	}
}