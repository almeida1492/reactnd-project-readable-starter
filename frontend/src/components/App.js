import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Root from './Root.js'
import PostDetails from './PostDetails.js'
import NewPost from './NewPost.js'
import { init } from '../actions/init.js'
import { objectToArray } from '../helpers/objectToArray.js'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(init())
  }

  getCategoryPaths(){
    const { categories } = this.props
    return categories.map((category) => `/${category.name}`)
  }

  render() {
    return (      
    	<Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            {this.props.loading === true 
              ? null
              : <div>
                  <Route exact path='/' render={() => <Redirect to='/all'/>}/>
                  <Route exact path={this.getCategoryPaths()} render={() => (
                    <Root/>
                  )}/>
                  <Route exact path='/post-details/:id' render={(query) => (
                    <PostDetails params={query.match.params}/>
                  )}/>
                  <Route exact path='/new' render={() => (
                    <NewPost/>
                  )}/>
                </div>}
          </div>
        </Fragment>
    	</Router>
    );
  }
}

function mapStateToProps ({ loading, categories }){
  return {
    categories: objectToArray(categories),
    loading,
  }
}

export default connect(mapStateToProps)(App);
