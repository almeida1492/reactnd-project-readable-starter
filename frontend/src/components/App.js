import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Root from './Root.js'
import PostDetails from './PostDetails'
import NewPost from './NewPost'
import EditPost from './EditPost'
import EditComment from './EditComment'
import { init } from '../actions/init'
import { objectToArray } from '../helpers/objectToArray.js'

class App extends Component {

  componentDidMount(){
    this.props.init()
  }

  getCategoryPaths(){
    const { categories } = this.props
    return categories.map((category) => `/${category.name === 'all' ? '' : category.name}`)
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
                  <Route exact path={this.getCategoryPaths()} render={() => (
                    <Root/>
                  )}/>
                  <Route exact path='/:category/:id' render={(query) => (
                    <PostDetails params={query.match.params}/>
                  )}/>
                  <Route path='/new' render={() => (
                    <NewPost/>
                  )}/>
                  <Route path='/edit-post/:category/:id' render={(query) => (
                    <EditPost params={query.match.params}/>
                  )}/>
                  <Route path='/edit-comment/:parentId/:id' render={(query) => (
                    <EditComment params={query.match.params}/>
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

function mapDispatchToProps(dispatch){
  return {
    init: () => dispatch(init())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
