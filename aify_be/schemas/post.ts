export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
    },
    {
      name: 'url',
      type: 'string',
      title: 'Url',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      option: {
        hotspot: true,
      },
    },
    {
      name: 'userId',
      type: 'string',
      title: 'UserId',
    },
    {
      name: 'postedBy',
      type: 'postedBy',
      title: 'PostedBy',
    },
    {
      name: 'save',
      type: 'array',
      title: 'Save',
      of: [{type: 'save'}],
    },
    {
      name: 'comment',
      type: 'array',
      title: 'Comment',
      of: [{type: 'comment'}],
    },
  ],
}
