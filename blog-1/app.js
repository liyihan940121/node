const qs = require('qs')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if(!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
    //设置返回格式， JSON
    res.setHeader('Content-type', 'application/json')
    
    //获取path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = qs.parse(url.split('?')[1])

    //处理blog数据
    getPostData(req).then(postData => {
      req.body = postData //后续所有的路由都可以通过req.body拿到postData
       // 处理blog路由
      const blogData = handleBlogRouter(req, res)
      if(blogData) {
        res.end(
          JSON.stringify(blogData)
        )
        return
      }

      //处理user路由
      const userData = handleUserRouter(req, res) 
      if(userData) {
        res.end(
          JSON.stringify(userData)
        )
        return
      }

      // 未命中路由，返回404
      res.writeHead(404, {'Content-type':'text/plain'})
      res.write('404 Not Found\n')
      res.end()
    })
}

module.exports = serverHandle


// const serverHandle = (req, res) => {
//     //设置返回格式， JSON
//     res.setHeader('Content-type', 'application/json')

//     const resData = {
//       name:'caiji111',
//       site:'emmmm',
//       env: process.env.NODE_ENV // process是node提供的全局变量
//     }
//     res.end(
//       JSON.stringify(resData) //json格式的字符串
//     )
// }

// module.exports = serverHandle