import { combineReducers } from 'redux'
import posts from './posts.js'
import categories from './categories.js'
import loading from './loading.js'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  posts,
  categories,
  loading,
  loadingBar: loadingBarReducer,
})