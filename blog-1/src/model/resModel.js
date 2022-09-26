class BaseModel {
  // 一个BaseModel 里有一个data属性和message属性
  constructor(_data, _message) { // 这里也可以不带_，此处带是为了测试使用
    if(typeof data === 'string' ) {
      this.message = _data
      _data = null
      _message = null
    }
    if(_data) {
      this.data = _data
    }
    if(_message) {
      this.message = _message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message) // 执行super是表示执行了一遍父类的constructor
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}