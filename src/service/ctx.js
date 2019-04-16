/*
 * @Author: magmaliang@gmail.com 
 * @Date: 2019-04-08 17:31:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-16 16:23:07
 * @Desc: set config
 */

class Ctx {
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

const ctx = new Ctx();

export default ctx;


