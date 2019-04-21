import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers/formatDate'
import { connect } from 'react-redux'

class Post extends Component{

	getFormatInfo(info){
		return ` • ${info}`
	}

	render(){
		const { data, handleVoting } = this.props 
		return(
			<div className='Post'>
				<Link to={`/post-details/${data.id}`} className='post-center'>
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
				<div className='post-votes'>
					<p className='vote-button' onClick={(e) => handleVoting(data, 'upVote')}>+</p>
					<p>{data.voteScore}</p>
					<p className='vote-button' onClick={(e) => handleVoting(data, 'downVote')}>-</p>
				</div>
			</div>
		)
	}
}

export default connect()(Post);