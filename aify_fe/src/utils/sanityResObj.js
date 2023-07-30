export const generalPostRes = `{
  image{asset->{url}},
  _id, url, category,
  postedBy->{
    _id, userName, image
  },
  save[]{
    _key,
    postedBy->{
      _id, userName, image
    },
  },
}`

export const detailedPostRes = `{
  image{asset->{url}},
  _id, url, category,
  postedBy->{
    _id, userName, image
  },
  save[]{
    _key,
    postedBy->{
      _id, userName, image
    },
  },
  comments[]{
    _key,comment,
    postedBy->{
      _id, userName, image
    },
  },
  title, description, 
}`
