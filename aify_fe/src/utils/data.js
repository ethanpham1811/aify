import {generalPostRes, detailedPostRes} from './sanityResObj.js'

/* User queries */
export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`
  return query
}

/* Post queries */
export const postsQuery = (searchTerm) => {
  const filter = searchTerm ? `&& title match '${searchTerm}*' || description match '${searchTerm}*'` : ''
  const query = `*[_type == "post" ${filter}]${generalPostRes}`
  return query
}

export const postByCategoryQuery = (categoryId, searchTerm) => {
  const filter = searchTerm ? `&& (title match '${searchTerm}*' || description match '${searchTerm}*')` : ''
  const query = `*[_type == "post" && category._ref == '${categoryId}' ${filter}]${generalPostRes}`
  console.log(query)
  return query
}

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']${detailedPostRes}`
  return query
}

export const morePostQuery = (post) => {
  console.log(post)
  const query = `*[_type == "post" && category._ref == '${post.category._ref}' && _id != '${post._id}' ]${generalPostRes}`
  return query
}

export const userPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc)${generalPostRes}`
  return query
}

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc)${generalPostRes}`
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
