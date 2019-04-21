import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { objectToArray } from '../helpers/objectToArray.js'
import { connect } from 'react-redux'
import { editPostThunk } from '../actions/posts'

class EditPost extends Component{
	state = {
		title: this.getPost()[0].title,
		body: this.getPost()[0].body,
		toHome: false,
	}

	getPost(){
		const { params, posts } = this.props
		return posts.filter((post) => post.id === params.id)
	}

	handleBodyChange = (e) => {
	    const body = e.target.value
	    this.setState(() => ({ body }))
  	}

  	handleTitleChange = (e) => {
	    const title = e.target.value
	    this.setState(() => ({ title }))
  	}

  	handleSubmit = (e) => {
	    e.preventDefault()
	    const { title, body } = this.state
	    const { dispatch } = this.props
	    const actualPost = this.getPost()[0]
	    const editedPost = {
	    	title,
	    	body,
	    }

	    dispatch(editPostThunk(actualPost.id, editedPost))

	    this.setState({ 
			title: '',
			body: '',
			toHome: true,
	    })
	}

	render(){
		const { body, title, toHome } = this.state
		if (toHome === true) {
			return <Redirect to={'/'} />
	    }
		return (
			<div className='new-post'>
				<h3>Edit Post</h3>
				<form className='new-post-form' onSubmit={this.handleSubmit}>
					<textarea
						placeholder='Title...'
						value={title}
						onChange={this.handleTitleChange}
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

function mapStateToProps({ posts }){
  return {
    posts: objectToArray(posts),
  }
}

export default connect(mapStateToProps)(EditPost);