import React, { Component } from 'react'

import Post from './Post.js'
import PostList from './PostList.js'
import { getPost, getComments } from '../helpers/api.js'

class PostDetails extends Component{
	state = {
		post: {},
		comments: []
	}

	componentDidMount(){
		const { params } = this.props
		getPost(params.id).then((post) => this.setState({ post: post }))
		getComments(params.id).then((comments) => this.setState({ comments: comments }))
	}

	render(){
		const { post, comments } = this.state
		return(
			<div className='PostDetails'>
				<Post data={post}/>
				<h2>Answers</h2>
				<PostList posts={comments}/>
			</div>
		)
	}
}

export default PostDetails;