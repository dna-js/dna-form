/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: mikey.zhaopeng
<<<<<<< HEAD
 * @Last Modified time: 2019-05-25 13:05:54
=======
 * @Last Modified time: 2019-05-05 14:30:57
>>>>>>> ref
 * @Desc: Field_Input field, write this for a sample
 */
import React from "react";
import IField from "../IField";
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class FieldRadio extends IField {
  constructor(options){
    super(options);
  }

  render(){
<<<<<<< HEAD
    return <RadioGroup {...this.filterProps()} value={this.props.value}>
=======
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
    return <RadioGroup {...this.filterProps()} value={this.state.value}>
>>>>>>> ref
      {
        this.props.dataMap.map((item) => <Radio value={item.key}>{item.value}</Radio>)
      }
      </RadioGroup>
    
  }

  fieldChange = (value) => {
    if (value && value.target) {
      this.props.fieldChange(this.props, value.target.value, value.target.value);
    }
  }
}
