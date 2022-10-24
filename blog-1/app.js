const qs = require('qs')
const { set, get } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


//获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return(d.toGMTString())
}

// // session数据 全局的
// const SESSION_DATA = {}

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

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2
    cookieStr.split(';').forEach(item => {
      if(!item) {
        return
      }
      const arr = item.split('=')
      const key = arr[0]
      const val = arr[1]
      req.cookie[key] = val
    });
    
    // // 解析 session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    
    // // console.info(userId,"userId")
    // // return
    // // console.info(SESSION_DATA,"SESSION_DATA[userId]")
    
    // if(userId) {
    //   if(!SESSION_DATA[userId]) {
    //     console.info(11111)
    //     SESSION_DATA[userId] = {}
    //   }
    // } else {
    //   needSetCookie = true
    //   userId =`${Date.now()}_${Math.random()}`
    //   SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]


    // console.info(req.session,"req.sessionsessionsessionsession")
    // console.info(SESSION_DATA,"SESSION_DATA")

    // 解析 session 使用redis
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId) {
      needSetCookie = true
      userId = `${Date.now()}_${Math.random()}`
      //初始化redis中的session值
      set(userId, {})
    }
    //获取session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
      if(sessionData == null) {
        //初始化 redis 中的 session 值
        set(req.sessionId, {})
        //设置session
        req.session = {}
      } else {
        //设置session
        req.session = sessionData
      }
      console.info(req.session, 'req.session')
      
      //处理post data 
      return getPostData(req)
    }).then(postData => {
      req.body = postData //后续所有的路由都可以通过req.body拿到postData
       // 处理blog路由
      // const blogData = handleBlogRouter(req, res)
      // if(blogData) {
      //   res.end(
      //     JSON.stringify(blogData)
      //   )
      //   return
      // }
      const blogResult = handleBlogRouter(req, res)
      if(blogResult) {
        blogResult.then(blogData => {
          if(needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          res.end(
            JSON.stringify(blogData)
          )
        })
        return
      }


      //处理user路由
      // const userData = handleUserRouter(req, res) 
      // if(userData) {
      //   res.end(
      //     JSON.stringify(userData)
      //   )
      //   return
      // }
      const userResult = handleUserRouter(req, res)
      if(userResult) {
        userResult.then(userData => {
          if(needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          console.info(userId,"userId")
          res.end(
            JSON.stringify(userData)
          )
        })
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