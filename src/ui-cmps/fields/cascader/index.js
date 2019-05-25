/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 17:40:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-05 12:38:49
 * @Desc: 级联选择
 */

import React from "react";
import IField from "../IField";
import { Cascader } from 'antd';

const options = [];

function onChange(value) {
  console.log(value);
}


export default class FieldInput extends IField {
  constructor(options){
    super(options);
  }

  render(){
    return <Cascader options={options} onChange={onChange} changeOnSelect />;
  }
}
