
//只管路由相关的
const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog, 
  delBlog 
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id || ''

  // 获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData) // class不能当普通函数调用，必须用new关键字创建一个实例，这里如 const success = new SuccessModel()
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 新建一篇博客
  if(method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)
    const author = 'zhangsan' 
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update') {
      const result = updateBlog(id, req.body)
      return result.then(val => {
        if(val) {
          return new SuccessModel()
        }else {
          return new ErrorModel('error')
        }
      })
  }

  // 删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan'
    const result = delBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('error delete')
      }
    })
  }


}
module.exports = handleBlogRouter