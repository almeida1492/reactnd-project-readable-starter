import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css'
import { objectToArray } from '../helpers/objectToArray.js'

import PostList from './PostList.js'

class Root extends Component{

	render(){
		const { categories, filter } = this.props
		return(
			<div className='Root'>
				<h1>Readable</h1>
				<div id='menu'>
					<ul>
						{categories.map((category) => 
							<Link to={`/${category.name}`} key={category.name}>
								<li onClick={() => filter(category.name)}>
									{category.name} 
								</li>
							</Link>
						)}
					</ul>
				</div>
				<p>Posts</p>
				<PostList handleVote={this.handlePostVoting}/>
				<Link to={`/new`}>
					<button className='add-btn'>Add</button>
				</Link>
			</div>
		)
	}
}

function mapStateToProps ({ categories }){
  return {
    categories: objectToArray(categories),
  }
}

export default connect(mapStateToProps)(Root);