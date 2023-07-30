export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'categoryName',
      type: 'string',
      title: 'CategoryName',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      option: {
        hotspot: true,
      },
    },
  ],
}
