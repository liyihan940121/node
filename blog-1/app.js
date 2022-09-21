const serverHandle = (req, res) => {
    //设置返回格式， JSON
    res.setHeader('Content-type', 'application/json')

    const resData = {
      name:'caiji111',
      site:'emmmm',
      env: process.env.NODE_ENV // process是node提供的全局变量
    }
    res.end(
      JSON.stringify(resData) //json格式的字符串
    )
}

module.exports = serverHandle