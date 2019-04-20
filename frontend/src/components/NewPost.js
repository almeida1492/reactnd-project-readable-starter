import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import uuid from 'uuid';
import { objectToArray } from '../helpers/objectToArray.js'
import { connect } from 'react-redux'
import { savePostAPI } from '../helpers/api.js'
import { addPostThunk } from '../actions/posts'

class NewPost extends Component{
	state = {
		author: '',
		title: '',
		body: '',
		category: 'all',
		toHome: false,
	}

	handleAuthorChange = (e) => {
	    const author = e.target.value
	    this.setState(() => ({ author }))
  	}

	handleBodyChange = (e) => {
	    const body = e.target.value
	    this.setState(() => ({ body }))
  	}

  	handleTitleChange = (e) => {
	    const title = e.target.value
	    this.setState(() => ({ title }))
  	}

  	handleSpinnerChange = (e) => {
  		const category = e.target.value
	    this.setState(() => ({ category }))
  	}

  	handleSubmit = (e) => {
	    e.preventDefault()
	    const { author, title, body, category  } = this.state
	    const { dispatch } = this.props
	    const newPost = {
	    	id: uuid.v4(),
	    	timestamp: Date.now(),
	    	title,
	    	body,
	    	author,
	    	category
	    }

	    dispatch(addPostThunk(newPost))

	    this.setState({ 
	    	author: '',
			title: '',
			body: '',
			category: 'all', 
			toHome: true,
	    })

	  //   savePostAPI(newPost).then(this.setState({ 
	  //   	author: '',
			// title: '',
			// body: '',
			// category: 'all', 
			// toHome: true,
	  //   }))
	}

	render(){
		const { author, body, title, category, toHome } = this.state
		const { categories } = this.props

		if (toHome === true) {
			return <Redirect to='/all' />
	    }

		return(
			<div className='new-post'>
				<h3>New Post</h3>
				<form className='new-post-form' onSubmit={this.handleSubmit}>
					<textarea
						placeholder='Author...'
						value={author}
						onChange={this.handleAuthorChange}
						className='text-area'
					/>
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
					<select className='spinner' value={category} onChange={this.handleSpinnerChange} >
						{categories.map((category) => 
							<option key={category.path} value={category.path}>{category.name}</option>	
						)}
					</select>
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

function mapStateToProps({ categories }){
  return {
    categories: objectToArray(categories),
  }
}

export default connect(mapStateToProps)(NewPost);