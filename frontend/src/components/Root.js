import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css'
import { objectToArray } from '../helpers/objectToArray.js'
import { receivePostsThunk, getPostsByCategoryThunk } from '../actions/posts'
import PostList from './PostList.js'

class Root extends Component{

	filterByCategory(category){
		const { dispatch } = this.props
	    category === 'all' 
	      ? dispatch(receivePostsThunk())
	      : dispatch(getPostsByCategoryThunk(category))
  	}

	render(){
		const { categories, posts } = this.props
		return(
			<div className='Root'>
				<h1>Readable</h1>
				<div id='menu'>
					<ul>
						{categories.map((category) => 
							<Link to={`/${category.name}`} key={category.name}>
								<li onClick={() => this.filterByCategory(category.name)}>
									{category.name}
								</li>
							</Link>
						)}
					</ul>
				</div>
				<p>Posts</p>
				<PostList posts={posts} handleVote={this.handlePostVoting}/>
				<Link to={`/new`}>
					<button className='add-btn'>Add</button>
				</Link>
			</div>
		)
	}
}

function mapStateToProps ({ categories, posts }){
  return {
    categories: objectToArray(categories),
    posts: objectToArray(posts),
  }
}

export default connect(mapStateToProps)(Root);