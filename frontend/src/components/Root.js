import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

import PostList from './PostList.js'

class Root extends Component{

	render(){
		const { categories, posts, filter } = this.props
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
				<PostList posts={posts} handleVote={this.handlePostVoting}/>
				<Link to={`/new`}>
					<button className='add-btn'>Add</button>
				</Link>
			</div>
		)
	}
}

export default Root;