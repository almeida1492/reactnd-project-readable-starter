import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PostList from './PostList.js'

class Root extends Component{

	render(){
		return(
			<div>
				<h1>Categories</h1>
				<p>Posts</p>
				<PostList/>
				<Link to={`/new`}>
					<button/>
				</Link>
			</div>
		)
	}
}

export default Root;