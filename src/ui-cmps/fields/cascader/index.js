/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 17:40:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-18 11:56:17
 * @Desc: 级联选择
 */

import React from "react";
import AbstractField from "../IField";
import { Cascader } from 'antd';

const options = [];

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
