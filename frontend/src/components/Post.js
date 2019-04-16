import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Post extends Component{

	render(){
		const { data } = this.props 
		return(
			<Link to={`/post-details/${data.id}`} query={{ data }}>
				<div className='Post'>
					<h3>{data.title}</h3>
					<p>{data.body}</p>
				</div>
			</Link>
		)
	}
}

export default Post;