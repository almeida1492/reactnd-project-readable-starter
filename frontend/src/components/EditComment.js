import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getCommentAPI, editCommentAPI } from '../helpers/api'

class EditComment extends Component{
	state = {
		body: '',
		toHome: false,
	}

	componentDidMount(){
		const { params } = this.props
		getCommentAPI(params.id)
			.then((comment) => this.setState({ body: comment.body }))
	}

	handleBodyChange = (e) => {
	    const body = e.target.value
	    this.setState(() => ({ body }))
  	}

  	handleSubmit = (e) => {
	    e.preventDefault()
	    const { body } = this.state
	    const { params } = this.props
	    const editedComment = {
	    	timestamp: Date.now(),
	    	body,
	    }

	    editCommentAPI(params.id, editedComment)

	    this.setState({ 
			body: '',
			toHome: true,
	    })
	}

	render(){
		const { body, toHome } = this.state
		if (toHome === true) {
			return <Redirect to={`/`} />
	    }
		return (
			<div className='new-post'>
				<h3>Edit Comment</h3>
				<form className='new-post-form' onSubmit={this.handleSubmit}>
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

export default connect()(EditComment);