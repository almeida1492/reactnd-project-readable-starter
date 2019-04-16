import React, { Component } from 'react'

import Post from './Post.js'
import PostList from './PostList.js'

class PostDetails extends Component{

	render(){
		return(
			<div>
				<Post/>
				<h2>Respostas</h2>
				<PostList/>
			</div>
		)
	}
}

export default PostDetails;