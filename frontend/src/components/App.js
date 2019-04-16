import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Root from './Root.js'
import PostDetails from './PostDetails.js'
import NewPost from './NewPost.js'

import { getAll, getCategories, getPost, getComments, getCategoryPosts } from '../helpers/api.js'

class App extends Component {
  constructor(props){
    super(props)
    this.filterByCategory = this.filterByCategory.bind(this);
  }

  state = {
    categories: [],
    posts: []
  }

  componentDidMount(){
    getCategories().then((categories) => this.setState(() => ({ categories: categories })))
    getAll().then((posts) => this.setState(() => ({ posts: posts })))
    // getPost('8xf0y6ziyjabvozdd253nd').then((post) => console.log(post))
    // getComments('8xf0y6ziyjabvozdd253nd').then((comments) => console.log(comments))
    // getCategoryPosts('react').then((posts) => console.log(posts))
  }

  getCategoryPaths(){
    const { categories } = this.state
    return categories.map((category) => `/${category.name}`)
  }

  filterByCategory(category){
    category === 'all' 
      ? getAll().then((posts) => this.setState(() => ({ posts: posts })))
      : getCategoryPosts(category).then((posts) => this.setState(() => ({ posts: posts })))
  }

  render() {
    const { categories, posts } = this.state
    return (      
    	<Router>
        <Route exact path='/' render={() => <Redirect to='/all'/>}/>
    		<Route exact path={this.getCategoryPaths()} render={() => (
          <Root categories={categories} posts={posts} filter={this.filterByCategory}/>
        )}/>
    		<Route exact path='/post-details/:id' render={(query) => (
          <PostDetails params={query.match.params}/>
        )}/>
    		<Route exact path='/new' component={NewPost}/>
    	</Router>
    );
  }
}

export default App;
