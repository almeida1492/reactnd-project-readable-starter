import { getCategoryPostsAPI } from '../helpers/api.js'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'

export function getCategories(categories){
	return {
		type: GET_CATEGORIES,
		categories,
	}
}

function getCategoryPosts(posts){
	return {
		type: GET_CATEGORY_POSTS,
		posts,
	}
}

export function getCategoryPostsThunk(category){
	return (dispatch) => {	
		return getCategoryPostsAPI(category).then((posts) => dispatch(getCategoryPosts(posts)))
	}
}


