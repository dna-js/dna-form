/*
 * @Author: magmaliang@gmail.com 
 * @Date: 2019-04-08 17:31:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 17:52:20
 * @Desc: set config
 */

class FormConfig {
   request = {
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
 }

const formConfig = new FormConfig();

export default formConfig;


