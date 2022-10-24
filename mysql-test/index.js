const mysql = require('mysql')

//创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lyh931210',
  port: '3306',
  database: 'myblog'
})

//开始连接
con.connect()

//执行 sql 语句
// const sql = `update users set realname='李四2' where username='lisi';`
// const sql = `select * from users;`
const sql = `insert into blogs(title,content,createtime,author)values('title3','content3',1664555637978,'lisi333');`
con.query(sql, (err, result) => {
  if(err) {
    console.error(err)
    return
  }
  console.info(result)
})

//关闭连接
con.end()