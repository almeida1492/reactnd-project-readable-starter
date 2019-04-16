import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Root from './Root.js'
import PostDetails from './PostDetails.js'
import NewPost from './NewPost.js'

class App extends Component {
  render() {
    return (
    	<Router>
    		<Route path='/' exact component={Root}/>
    		<Route path='/post-details/:id' component={PostDetails}/>
    		<Route path='/new' component={NewPost}/>
    	</Router>
    );
  }
}

export default App;
