import { combineReducers } from 'redux'
import posts from './posts.js'
import postInEvidence from './postInEvidence'
import categories from './categories.js'
import comments from './comments.js'
import loading from './loading.js'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  posts,
  postInEvidence,
  categories,
  comments,
  loading,
  loadingBar: loadingBarReducer,
})