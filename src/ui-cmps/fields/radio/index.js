/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-03 16:29:41
 * @Desc: Field_Input field, write this for a sample
 */
import React from "react";
import AbstractField from "../abstract-field";
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class FieldRadio extends AbstractField {
  constructor(options){
    super(options);
  }

  render(){
    return <RadioGroup {...this.filterProps()} value={this.state.value}>
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
