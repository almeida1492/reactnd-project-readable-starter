const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((res) => res.json())
    .then((data) => data.categories)

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then((res) => res.json())
    .then((posts) => posts)

export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then((res) => res.json())
    .then((posts) => posts)

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then((res) => res.json())
    .then((post) => post)

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then((res) => res.json())
    .then((comments) => comments)