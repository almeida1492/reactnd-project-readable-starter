import React, { Component } from 'react'
import Post from './Post.js'

class PostList extends Component{
	constructor(props){
		super(props)
		this.BY_DATE = 'BY_DATE'
		this.BY_VOTES = 'BY_VOTES'

		this.getSortedPosts = this.getSortedPosts.bind(this);
		this.switchSortType = this.switchSortType.bind(this);
	}

	state = {
		sort: this.BY_DATE,
	}

	switchSortType(type){
		type === this.BY_DATE 
			? this.setState({ sort: this.BY_DATE })
			: this.setState({ sort: this.BY_VOTES })
	}

	getSortedPosts(){
		const { posts } = this.props
		const postsClone = [...posts]

		this.state.sort === this.BY_DATE 
			? postsClone.sort((a, b) => b.timestamp - a.timestamp)
			: postsClone.sort((a, b) => b.voteScore - a.voteScore)

		return postsClone
	}

	render(){
		const { handleVoting, postType } = this.props
		const sortedPosts = this.getSortedPosts()
		return(
			<div>
				{sortedPosts.length === 0 
					? null
					: <div className='filter'>
						<ul>
							<li onClick={() => this.switchSortType(this.BY_DATE)}>by date</li>
							<li onClick={() => this.switchSortType(this.BY_VOTES)}>by votes</li>
						</ul>
					</div>}
				<ul className='PostList'>
					{sortedPosts.map((post) => (
						<li key={post.id}>
							<Post data={post} handleVoting={handleVoting} postType={postType}/>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default PostList;