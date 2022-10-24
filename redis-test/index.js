const redis = require ('redis')

!(async function () {
  
  //创建客户端
  const redisClient = redis.createClient(6379, '127.0.0.1')

  //连接
  await redisClient.connect()
      .then(()=> console.info('redis connect success!'))
      .catch(console.error)
  
  //set
  await redisClient.set('name', 'zhang333')

  //get
  const name = await redisClient.get('name')
  console.log(name, 'name')

  //推出
  redisClient.quit()
  
})()
