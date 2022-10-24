const { 
  login
} = require('../controller/user')
const {
  set
} = require('../db/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
  const method = req.method // GET POST
  console.info(req.session,"req.sessiontop")
  // 登录
  if(method === 'POST' && req.path === '/api/user/login') {
      const { username, password } = req.body
      const result = login(username, password)
      return result.then(data => {
        if(data.username) {
          //设置session
          req.session.username = data.username
          req.session.realname = data.realname

          //同步到redia
          set(req.sessionId, req.session) //只要登录成功就会赋值，因为初次登录时，session是{}

          console.info(req.session,"req.session111")
          return new SuccessModel()
        }
        return new ErrorModel('登录失败')
      })
  }

  //登录验证的测试
  if(method === 'GET' && req.path === '/api/user/login-test') { 
    console.info(req.session,"req.session")
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('登录失败'))
  }
}

module.exports = handleUserRouter