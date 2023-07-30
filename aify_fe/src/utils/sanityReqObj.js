export const createPostRequestObj = (imgId, userId, title, description, url, category) => {
  return {
    _type: 'post',
    title,
    description,
    url,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imgId
      }
    },
    userId: userId,
    postedBy: {
      _type: 'postedBy',
      _ref: userId
    },
    category: {
      _type: 'category',
      _ref: category
    }
  }
}
