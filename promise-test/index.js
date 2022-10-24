const fs = require('fs') // node原生自带的，操作文件
const path = require('path') // 操作文件路径

// //callback 方式获取一个文件的内容
// function getFileContent(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', fileName) // __dirname 是全局变量，是当前文件的目录，resolve拼接文件名，找出绝对路径
//   fs.readFile(fullFileName, (err, data) => { //读取文件内容，二进制
//     if(err) {
//       console.error(err)
//       return
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

// //测试 callback-hell
// getFileContent('a.json', (aData)=>{
//   // 此处是个闭包
//   console.info('a', aData)
//   getFileContent(aData.next, bData => {
//     console.info('b', bData)
//     getFileContent(bData.next, cData => {
//       console.info('c', cData)
//     })
//   })
// })


// 用promise 获取文件内容
function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName) // __dirname 是全局变量，是当前文件的目录，resolve拼接文件名，找出绝对路径
      fs.readFile(fullFileName, (err, data) => { //读取文件内容，二进制
        if(err) {
          reject(err)
          return
        }
        resolve(
          JSON.parse(data.toString())
        )
      })
  })
  return promise
}

getFileContent('a.json').then(aData => {
  console.info('a', aData)
  return getFileContent(aData.next)
}).then(bData => {
  console.info('b', bData)
  return getFileContent(bData.next)
}).then(cData => {
  console.info('c', cData)
  // return getFileContent(cData.next)
})

// 更简单的async await
