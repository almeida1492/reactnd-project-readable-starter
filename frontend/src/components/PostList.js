import React, { Component } from 'react'
import Post from './Post.js'

class PostList extends Component{

	render(){
		const { posts } = this.props
		return(
			<ul className='PostList'>
				{posts.map((post) => (
					<li key={post.id}>
						<Post data={post}/>
					</li>
				))}
			</ul>
		)
	}
}

export default PostList;