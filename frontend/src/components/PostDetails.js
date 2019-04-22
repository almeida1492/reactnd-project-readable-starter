import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post.js'
import PostList from './PostList.js'
import { getAllCommentsThunk, addCommentThunk, voteOnCommentThunk } from '../actions/comments'
import { voteOnPostThunk } from '../actions/posts'
import { getPostThunk } from '../actions/postInEvidence'
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
		dispatch(getPostThunk(params.id))
		dispatch(getAllCommentsThunk(params.id))
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
	    const { dispatch, params, postInEvidence } = this.props
	    const newComment = {
	    	timestamp: Date.now(),
	    	parentId: postInEvidence.id,
	    	id: uuid.v4(),
	    	body,
	    	author,
	    }

	    dispatch(addCommentThunk(newComment))
	    dispatch(getPostThunk(params.id))

	    this.setState({ 
	    	author: '',
			body: '',
	    })
	}

	render(){
		const { postInEvidence, comments } = this.props
		const { body, author } = this.state
		return(
			<div className='PostDetails'>
				{Object.keys(postInEvidence).length === 0 
					? <h3>Ops... I think this post might have been deleted :(</h3>
					: <div>
						<h3>Post details</h3>
						<Post data={postInEvidence} handleVoting={this.handlePostVoting} postType='post'/>
						<h4>{comments.length === 0 ? 'There are no comments yet!' : 'Comments'}</h4>
						<PostList 
							posts={comments} 
							handleVoting={this.handleCommentVoting} 
							postType='comment'/>
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
					</div>}
			</div>
		)
	}
}

function mapStateToProps({ postInEvidence, comments }){
	return {
		postInEvidence,
		comments: objectToArray(comments),
	}
}

export default connect(mapStateToProps)(PostDetails);