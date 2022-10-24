const redis = require('redis') //v4
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

//连接数据库，启动之后立刻执行
!(async function() {
  await redisClient.connect()
  .then(()=> console.info('redis connect success!'))
  .catch(console.error)
})()


//set
async function set(key, val) {
  let objVal
  if(typeof val === 'object') {
    objVal = JSON.stringify(val) //value需是字符串
  }else {
    objVal = val
  }
  await redisClient.set(key, objVal)
}

async function get(key) {
  try {
    let val = await redisClient.get(key)
    
    if (val === null) return val

    try {
      val = JSON.parse(val) //尝试转换为js对象
    }catch (err) {

    }
    return val
  } catch (err) {
    throw err
  }
}

module.exports = {
  set,
  get
}