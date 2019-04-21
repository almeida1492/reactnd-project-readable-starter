import { getAllCommentsAPI, saveCommentAPI, voteOnCommentAPI, editCommentAPI, deleteCommentAPI } from '../helpers/api'
import { formatElements } from '../helpers/formatElements'

export const GET_COMMENTS = 'GET_COMMENTS'
export const CLEAN_COMMENTS_ARRAY = 'CLEAN_COMMENTS_ARRAY'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const GET_COMMENT = 'GET_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

function getAllComments(comments){
	return {
		type: GET_COMMENTS,
		comments: formatElements(comments),
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

function addComment(comment){
	return {
		type: ADD_COMMENT,
		comment,
	}
}

export function addCommentThunk(newComment){
	return (dispatch) => {
		saveCommentAPI(newComment).then((comment) => dispatch(addComment(comment)))
	}
}

export function voteOnComment(comment){
	return {
		type: VOTE_ON_COMMENT,
		comment,
	}
}

export function voteOnCommentThunk(data, vote){
	return (dispatch) => {
		voteOnCommentAPI(data, vote).then((comment) => dispatch(voteOnComment(comment)))
	}
}

function editComment(comment){
	return {
		type: EDIT_COMMENT,
		comment,
	}
}

export function editCommentThunk(id, comment){
	return (dispatch) => {
		return editCommentAPI(id, comment).then((editedComment) => dispatch(editComment(editedComment)))
	}
}

function deleteComment(comment){
	return {
		type: DELETE_COMMENT,
		comment,
	}
}

export function deleteCommentThunk(id){
	return (dispatch) => {
		return deleteCommentAPI(id).then((comment) => dispatch(deleteComment(comment)))
	}
}
