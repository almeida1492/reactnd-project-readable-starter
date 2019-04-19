import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Root from './Root.js'
import PostDetails from './PostDetails.js'
import NewPost from './NewPost.js'
import { init } from '../actions/init.js'

import { getAllPostsAPI, getCategoriesAPI, getCategoryPostsAPI } from '../helpers/api.js'

class App extends Component {
  constructor(props){
    super(props)
    this.filterByCategory = this.filterByCategory.bind(this);
  }

  state = {
    categories: [ { name: 'all', path: 'all' }, 
                  { name: 'redux', path: 'redux' }, 
                  { name: 'react', path: 'react' }, 
                  { name: 'udacity', path: 'udacity' } ],
  }

  componentDidMount(){
    // getCategoriesAPI().then((categories) => this.setState(() => ({ categories: categories })))
    this.props.dispatch(init())

  }

  getCategoryPaths(){
    const { categories } = this.state
    return categories.map((category) => `/${category.name}`)
  }

  filterByCategory(category){
    category === 'all' 
      ? getAllPostsAPI().then((posts) => this.setState(() => ({ posts: posts })))
      : getCategoryPostsAPI(category).then((posts) => this.setState(() => ({ posts: posts })))
  }

  render() {
    const { categories } = this.state
    
    return (      
    	<Router>
        <Fragment>
          <LoadingBar/>
          <Route exact path='/' render={() => <Redirect to='/all'/>}/>
          <Route exact path={this.getCategoryPaths()} render={() => (
            <Root categories={categories} filter={this.filterByCategory}/>
          )}/>
          <Route exact path='/post-details/:id' render={(query) => (
            <PostDetails params={query.match.params}/>
          )}/>
          <Route exact path='/new' render={() => (
            <NewPost categories={categories}/>
          )}/>
        </Fragment>
    	</Router>
    );
  }
}

function mapStateToProps ({ posts }){
  return {
    posts
  }
}

export default connect(mapStateToProps)(App);
