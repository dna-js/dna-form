/* 
 * @Author: magmaliang@gmail.com 
 * @Date: 2019-05-28 14:35:08 
 * @Last Modified by: magmaliang@gmail.com
 * @Last Modified time: 2019-05-28 16:02:52
 * @Desc:  mock data for example
*/

import Mock from "mockjs";

Mock.mock('/saveForm',{
    'code':'1',
    'msg':"done",
})

Mock.mock('/updateForm',{
  'code':'1',
  'msg':"done",
})

Mock.mock('/getTypes',[{
  'value': '类型1',
  'key': 1
},{
  'value': '类型2',
  'key': 2
},{
  'value': '类型3',
  'key': 3
},{
  'value': 'xasxs',
  'key': 4
}])

Mock.mock('/getGender',[{
  'value': '男',
  'key': 1
},{
  'value': '女',
  'key': 2
},{
  'value': '未知',
  'key': 3
}])



import axios from 'axios';


export default {
  get: (url) => {
    return new Promise((resolve, rej) => {
      axios.get(url).then((res)=>{
        resolve(res.data);
      })
    })
  }
}