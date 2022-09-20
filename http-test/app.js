const http = require('http')
const qs = require('qs')

const server = http.createServer((req, res) => {
  console.info('method:', req.method) // GET
  const url = req.url
  console.info('url:', url)
  req.query = qs.parse(url.split('?')[1])
  console.info('query:', req.query)
  console.info('query2:', qs.stringify(req.query))
  res.end(
    JSON.stringify(req.query) //要返回字符串
  )
  //qs.stringify是把obj转换为url的形式，以&拼接，带=
  //JSON.stringify是把对象转换为字符串
})

server.listen(8000)
console.info('ok')