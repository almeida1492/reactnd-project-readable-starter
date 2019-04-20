import { receivePosts } from '../actions/posts.js'
import { loading } from '../actions/loading.js'
import { getCategories } from '../actions/categories.js'
import { getAllPostsAPI, getCategoriesAPI } from '../helpers/api.js'

import { showLoading, hideLoading } from 'react-redux-loading'

export function init () {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(loading(true))
    return getAllPostsAPI()
    	.then((posts) => getCategoriesAPI()
    		.then((categories) => {
    			dispatch(receivePosts(posts))
    			dispatch(getCategories(categories))
    			dispatch(hideLoading())
    			dispatch(loading(false))
    		}))
  }
}