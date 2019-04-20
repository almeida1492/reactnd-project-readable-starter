import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../helpers/formatDate'
import { connect } from 'react-redux'
import { voteOnPostAPI } from '../helpers/api'
import { voteOnPostThunk } from '../actions/posts'

class Post extends Component{
	state = {
		voteScore: undefined,
	}

	handleVote(vote){
		const { data, dispatch } = this.props
		// voteOnPostAPI(data, vote).then((post) => this.setState({ voteScore: post.voteScore }))
		dispatch(voteOnPostThunk(data, vote))
	}

	render(){
		const { data } = this.props 
		const { voteScore } = this.state
		return(
			<div className='Post'>
				<Link to={`/post-details/${data.id}`} className='post-center'>
					<div>
						<p className='post-title'>{data.title}</p>
						<p className='post-body'>{data.body}</p>
						<p className='post-info'>{`${data.author} • ${data.category} • ${formatDate(data.timestamp)}`}</p>
					</div>
				</Link>
				<div className='post-votes'>
					<p className='vote-button' onClick={(e) => this.handleVote('upVote')}>+</p>
					<p>{data.voteScore}</p>
					<p className='vote-button' onClick={(e) => this.handleVote('downVote')}>-</p>
				</div>
			</div>
		)
	}
}

export default connect()(Post);