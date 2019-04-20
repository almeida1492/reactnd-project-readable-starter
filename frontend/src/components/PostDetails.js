import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post.js'
import PostList from './PostList.js'
import { getAllCommentsThunk, cleanCommentsArray } from '../actions/comments'
import { objectToArray } from '../helpers/objectToArray.js'

class PostDetails extends Component{

	componentDidMount(){
		const { params, dispatch } = this.props
		dispatch(getAllCommentsThunk(params.id))
	}

	componentWillUnmount(){
		const { dispatch } = this.props
		dispatch(cleanCommentsArray())
	}

	getPost(){
		const { params, posts } = this.props
		return posts.filter((post) => post.id === params.id)
	}

	render(){
		const { comments } = this.props
		const data = this.getPost()[0]
		return(
			<div className='PostDetails'>
				<h3>Post details</h3>
				<Post data={data}/>
				<h4>Answers</h4>
				<PostList posts={comments}/>
			</div>
		)
	}
}

function mapStateToProps({ posts, comments }){
	return {
		posts: objectToArray(posts),
		comments: objectToArray(comments),
	}
}

export default connect(mapStateToProps)(PostDetails);