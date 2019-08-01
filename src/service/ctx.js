/*
 * @Author: magmaliang@gmail.com 
 * @Date: 2019-04-08 17:31:45 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-08-01 18:14:57
 * @Desc: set config
 */


class Ctx {
  debug = false
  request = {
    get: ()=>{
      console.warn('请求配置未设置')
    },
    post: ()=>{
    console.warn('请求配置未设置')
    }
  }

  silentRequest = {
    get: ()=>{
      console.warn('请求配置未设置')
    },
    post: ()=>{
     console.warn('请求配置未设置')
    }
  }

  constructor(options){
    Object.assign(this, options)
  }

  setRequest = (request) => {
    this.request = request;
  }

  setSilentRequest = (request) => {
    this.silentRequest = request;
  }
}

Ctx.prototype.log = () =>{
  if (this.debug) {
    console.log.apply(null, arguments)
  }
}

const ctx = new Ctx();
window._dlog = ctx.log;

export default ctx;


