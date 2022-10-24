const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//统一执行 sql 的函数
function exec(sql) {
  // 这里使用promise是保证在调用exec函数的时候，一定可以拿到数据，不然还要传回调函数进来接收数据
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if(err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

//这里没有end是因为 con只会创建一次，重复引用就行，类似单例模式

module.exports = {
  exec
}