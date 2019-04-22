import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { formatDate } from '../helpers/formatDate'
import { connect } from 'react-redux'
import { deletePostThunk } from '../actions/posts'
import { deleteCommentThunk } from '../actions/comments'

class Post extends Component{
	constructor(props){
		super(props)
		this.deletePost = this.deletePost.bind(this)
		this.isClickable = this.isClickable.bind(this)
	}

	deletePost(){
		const { dispatch, data, postType, location } = this.props

		switch (postType){
			case 'post' :
				if (location.pathname === `/post-details/${data.id}`) {
					this.props.history.push('/')
				}
				return dispatch(deletePostThunk(data.id))
			case 'comment' :
			 	return dispatch(deleteCommentThunk(data))
			default : 
		}
	}

	getFormatInfo(info){
		return ` • ${info}`
	}

	isClickable(){
		const { pathname } = this.props.location
		const { postType, data } = this.props
		
		if (postType === 'comment') {
			return false
		}
		if (pathname === `/${data.category}/${data.id}`) {
			return false
		}
		return true
	}

	render(){
		const { data, handleVoting } = this.props 
		return(
			<div className='Post'>
				<div className='post-center'>
					<Link to={`/${data.category}/${data.id}`} className={this.isClickable() ? '' : 'disable-link'}>
						<div>
							<p className='post-title'>{data.title}</p>
							<p className='post-body'>{data.body}</p>
							<p className='post-info'>{
								`${data.author} 
								${data.category === undefined 
									? '' 
									: this.getFormatInfo(data.category)}
								${this.getFormatInfo(formatDate(data.timestamp))}`
							}
							</p>
							<p className='post-info'>
								{data.commentCount === undefined 
									? '' 
									: data.commentCount + ' comments'}
							</p>
						</div>
					</Link>
				</div>
				
				<div className='post-right'>
					<div className='post-votes'>
						<p className='vote-button' onClick={(e) => handleVoting(data, 'upVote')}>+</p>
						<p>{data.voteScore}</p>
						<p className='vote-button' onClick={(e) => handleVoting(data, 'downVote')}>-</p>
					</div>
					<div className='post-button-container'>
						<Link to={this.props.postType === 'post' ? `/edit-post/${data.category}/${data.id}` : `/edit-comment/${data.parentId}/${data.id}`}>
							<img 
								src='data:image/png;base64,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'
								alt='Edit'
								className='post-button'/>
						</Link>
						<img 
							src='data:image/png;base64,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'
							alt='Delete'
							onClick={this.deletePost}
							className='post-button'/>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connect()(Post));