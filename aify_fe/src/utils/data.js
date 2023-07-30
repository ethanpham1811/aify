import {generalPostRes, detailedPostRes} from './sanityResObj.js'

/* User queries */
export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`
  return query
}

/* Post queries */
export const feedQuery = `*[_type == "post"] | order(_createdAt desc)${generalPostRes}`

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']${detailedPostRes}`
  return query
}

export const morePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]${generalPostRes}`
  return query
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || description match '${searchTerm}*']${generalPostRes}`
  return query
}

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc)${generalPostRes}`
  return query
}

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc)${generalPostRes}`
  return query
}

export const postByCategoryQuery = (categoryId) => {
  const query = `*[_type == "post" && category._ref == '${categoryId}']${generalPostRes}`
  return query
}

/* Category queries */
export const categoriesQuery = `*[_type == "category"] | order(categoryName asc){
  image{
    asset->{
      url
    }
  },
  _id,
  categoryName,
}`
