import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Post extends Component{

	render(){
		return(
			<Link to={`/post-details/:id`}>
				<div>
					<p>This is a post</p>
				</div>
			</Link>
		)
	}
}

export default Post;