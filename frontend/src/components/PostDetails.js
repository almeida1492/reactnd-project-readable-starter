import React, { Component } from 'react'

import Post from './Post.js'
import PostList from './PostList.js'
import { getPostAPI, getAllCommentsAPI } from '../helpers/api.js'

class PostDetails extends Component{
	state = {
		post: {},
		comments: [],
	}

	componentDidMount(){
		const { params } = this.props

		getPostAPI(params.id).then((post) => 
			getAllCommentsAPI(params.id).then((comments) => 
				this.setState({ post, comments })))
	}

	render(){
		const { post, comments } = this.state
		return(
			<div className='PostDetails'>
				<h3>Post detail</h3>
				<Post data={post}/>
				<h4>Answers</h4>
				<PostList posts={comments}/>
			</div>
		)
	}
}

export default PostDetails;