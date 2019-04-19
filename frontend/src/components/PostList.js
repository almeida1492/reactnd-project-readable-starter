import React, { Component } from 'react'
import { connect } from 'react-redux'
import { objectToArray } from '../helpers/objectToArray.js'

import Post from './Post.js'

class PostList extends Component{

	render(){
		const { posts } = this.props
		return(
			<ul className='PostList'>
				{posts.map((post) => (
					<li key={post.id}>
						<Post data={post}/>
					</li>
				))}
			</ul>
		)
	}
}

function mapStateToProps ({ posts }){
  return {
    posts: objectToArray(posts)
  }
}

export default connect(mapStateToProps)(PostList);