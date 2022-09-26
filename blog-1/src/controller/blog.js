// 只关心数据
const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1664112941854,
      author: 'caijiA'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1664112980268,
      author: 'caijiB'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1664112941854,
    author: 'caijiA'
  }
}

const newBlog = (blogData = {}) => {
  //blogData 是一个博客对象，包含title content 属性
  // console.info('blogData', blogData)
  return {
    id: 3 //表示新建博客，插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  //id 就是要更新博客的 id
  //blogData 是一个博客对象，包含title content 属性
  // console.info('updateBlog', id, blogData)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}