import { receivePosts } from '../actions/posts.js'
import { getAllPostsAPI } from '../helpers/api.js'

import { showLoading, hideLoading } from 'react-redux-loading'

export function init () {
  return (dispatch) => {
    dispatch(showLoading())
    return getAllPostsAPI()
      .then((posts) => {
        dispatch(receivePosts(posts))
        dispatch(hideLoading())})
  }
}