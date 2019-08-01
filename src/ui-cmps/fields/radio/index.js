/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-08-01 18:34:08
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
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
    return <RadioGroup {...this.filterProps()} value={this.props.value}>
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