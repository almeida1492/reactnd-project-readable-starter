import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post.js'
import PostList from './PostList.js'
import { getAllCommentsThunk, cleanCommentsArray, addCommentThunk, voteOnCommentThunk } from '../actions/comments'
import { voteOnPostThunk } from '../actions/posts'
import { objectToArray } from '../helpers/objectToArray.js'
import uuid from 'uuid';

class PostDetails extends Component{
	constructor(props){
		super(props);
		this.handlePostVoting = this.handlePostVoting.bind(this);
		this.handleCommentVoting = this.handleCommentVoting.bind(this);
	}

	state = {
		author: '',
		body: '',
	}

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

	handleAuthorChange = (e) => {
	    const author = e.target.value
	    this.setState(() => ({ author }))
  	}

	handleBodyChange = (e) => {
	    const body = e.target.value
	    this.setState(() => ({ body }))
  	}

  	handlePostVoting(data, vote){
		const { dispatch } = this.props
		dispatch(voteOnPostThunk(data, vote))
	}

	handleCommentVoting(data, vote){
		const { dispatch } = this.props
		dispatch(voteOnCommentThunk(data, vote))
	}

  	handleSubmit = (e) => {
	    e.preventDefault()
	    const { author, body } = this.state
	    const { dispatch } = this.props
	    const newComment = {
	    	timestamp: Date.now(),
	    	parentId: this.getPost()[0].id,
	    	id: uuid.v4(),
	    	body,
	    	author,
	    }

	    dispatch(addCommentThunk(newComment))

	    this.setState({ 
	    	author: '',
			body: '',
	    })
	}

	render(){
		const { comments } = this.props
		const data = this.getPost()[0]
		const { body, author } = this.state
		return(
			<div className='PostDetails'>
				<h3>Post details</h3>
				<Post data={data} handleVoting={this.handlePostVoting}/>
				<h4>{comments.length === 0 ? 'There are no comments yet!' : 'Comments'}</h4>
				<PostList posts={comments} handleVoting={this.handleCommentVoting}/>
				<form className='new-post-form' onSubmit={this.handleSubmit}>
					<textarea
						placeholder='Author...'
						value={author}
						onChange={this.handleAuthorChange}
						className='text-area'
					/>
					<textarea 
						placeholder='Type here...'
						value={body}
						onChange={this.handleBodyChange}
						className='body-area'
					/>
					<button
			            type='submit'
			            className='btn'
			            disabled={body === ''}>
							Submit
			        </button>
				</form>
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