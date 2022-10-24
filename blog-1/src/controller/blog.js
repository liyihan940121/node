// 只关心数据
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` // 此处1=1是占位使用，兼容查询条件不存在时, eg：xxx.html?a=1&k1=v1&k2=v2&k3=v3 结构统一，可以忽略前面的问号
  if(author) {
    sql += `and author='${author}' `
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // console.info(sql,"sqlsqlsql")
  //返回promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0] //返回的是一个数组，取一条，返回对象
  })
}

const newBlog = (blogData = {}) => {
  //blogData 是一个博客对象，包含title content, author 属性
  // console.info('blogData', blogData)
  // return {
  //   id: 3 //表示新建博客，插入到数据表里面的id
  // }

  const { title, content, author } = blogData
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}');
  `
  return exec(sql).then(insertData => {
    // console.info('insertData is', insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  //id 就是要更新博客的 id
  //blogData 是一个博客对象，包含title content 属性
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id};
  `
  return exec(sql).then(updateData => {
    if(updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  //id 就是要删除博客的id //实际工作中考虑软删除，考虑数据的可恢复性
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(delData => {
    if(delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}