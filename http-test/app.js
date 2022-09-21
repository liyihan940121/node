const http = require('http')
const qs = require('qs')

// get
// const server = http.createServer((req, res) => {
//   console.info('method:', req.method) // GET
//   const url = req.url
//   console.info('url:', url)
//   req.query = qs.parse(url.split('?')[1])
//   console.info('query:', req.query)
//   console.info('query2:', qs.stringify(req.query))
//   res.end(
//     JSON.stringify(req.query) //要返回字符串
//   )
//   //qs.stringify是把obj转换为url的形式，以&拼接，带=
//   //JSON.stringify是把对象转换为字符串
// })

//post
// const server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     // req 数据格式
//     console.info('req content-type:', req.headers)
//     console.info('req content-type:', req.headers['content-type'])
//     // 接收数据
//     let postData = ''
//     req.on('data', chunk => {
//       postData += chunk.toString()
//     })
//     req.on('end', () => {
//       console.info('postData:', postData)
//       res.end('hello world !')
//     })
//   }
// })

//综合
  const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const query = qs.parse(url.split('?')[1])

    //设置返回格式为 JSON
    res.setHeader('Content-type', 'application/json')

    //返回的数据
    const resData = {
      method,
      url,
      path,
      query
    }

    if(method === 'GET') {
      res.end(
        JSON.stringify(resData)
      )
    }
    if(method === 'POST') {
      let postData = ''
      req.on('data', chunk => {
        postData += chunk.toString()
      })
      req.on('end', () => {
        resData.postData = postData
        //返回
        res.end(
          JSON.stringify(resData)
        )
      })
    }
  })

server.listen(8000)
console.info('ok')