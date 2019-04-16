/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 17:40:10 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-04 15:13:43
 * @Desc: 级联选择
 */

import React from "react";
import AbstractField from "../abstract-field";
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hanzhou'
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}


export default class FieldInput extends AbstractField {
  constructor(options){
    super(options);
  }

  render(){
    return <Cascader options={options} onChange={onChange} changeOnSelect />;
  }
}
