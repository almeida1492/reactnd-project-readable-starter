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
		if (pathname === `/post-details/${data.id}`) {
			return false
		}
		return true
	}

	render(){
		const { data, handleVoting } = this.props 
		return(
			<div className='Post'>
				<div className='post-center'>
					<Link to={`/post-details/${data.id}`} className={this.isClickable() ? '' : 'disable-link'}>
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
						<Link to={this.props.postType === 'post' ? `/edit-post/${data.id}` : `/edit-comment/${data.id}`}>
							<img 
								src='https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_1280.png'
								alt='Edit'
								className='post-button'/>
						</Link>
						<img 
							src='https://cdn.pixabay.com/photo/2016/10/10/01/49/delete-1727486_1280.png'
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