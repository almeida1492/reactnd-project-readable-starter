const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export const getCategoriesAPI = () =>
  fetch(`${api}/categories`, { headers })
    .then((res) => res.json())
    .then((data) => data.categories)

export const getAllPostsAPI = () =>
  fetch(`${api}/posts`, { headers })
    .then((res) => res.json())
    .then((posts) => posts)

export const getPostsByCategoryAPI = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then((res) => res.json())
    .then((posts) => posts)

export const getPostAPI = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then((res) => res.json())
    .then((post) => post)

export const savePostAPI = (post) =>
  fetch(`${api}/posts`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
    .then(data => console.log(data))

export const voteOnPostAPI = (post, vote) =>
  fetch(`${api}/posts/${post.id}`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json())
    .then((data) => data)

export const editPostAPI = (id, post) =>
  fetch(`${api}/posts/${id}`, { 
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const deletePostAPI = (id) =>
  fetch(`${api}/posts/${id}`, { 
    method: 'DELETE',
    headers: { ...headers }
  }).then(res => res.json())

export const getAllCommentsAPI = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then((res) => res.json())
    .then((comments) => comments)
    .catch((error) => console.log(error))

export const getCommentAPI = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then((res) => res.json())
    .then((comment) => comment)

export const saveCommentAPI = (comment) =>
  fetch(`${api}/comments`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const voteOnCommentAPI = (comment, vote) =>
  fetch(`${api}/comments/${comment.id}`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json())
    .then((data) => data)
    .catch((error) => console.log(error))

export const editCommentAPI = (id, comment) =>
  fetch(`${api}/comments/${id}`, { 
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const deleteCommentAPI = (id) =>
  fetch(`${api}/comments/${id}`, { 
    method: 'DELETE',
    headers: { ...headers }
  }).then(res => res.json())