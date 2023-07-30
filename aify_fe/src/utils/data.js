export const categories = [
  {
    name: 'cars',
    image: ''
  },
  {
    name: 'fitness',
    image: ''
  },
  {
    name: 'wallpaper',
    image: ''
  },
  {
    name: 'websites',
    image: ''
  },
  {
    name: 'photo',
    image: ''
  },
  {
    name: 'food',
    image: ''
  },
  {
    name: 'nature',
    image: ''
  },
  {
    name: 'art',
    image: ''
  },
  {
    name: 'travel',
    image: ''
  },
  {
    name: 'quotes',
    image: ''
  },
  {
    name: 'cats',
    image: ''
  },
  {
    name: 'dogs',
    image: ''
  },
  {
    name: 'others',
    image: ''
  }
]

export const feedQuery = `*[_type == "post"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`
  return query
}

export const morePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`
  return query
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`
  return query
}

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`
  return query
}

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`
  return query
}

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`
  return query
}
