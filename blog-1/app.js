const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')



const serverHandle = (req, res) => {
    //设置返回格式， JSON
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]

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

    // 为命中路由，返回404
    res.writeHead(404, {'Content-type':'text/plain'})
    res.write('404 Not Found\n')
    res.end()
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