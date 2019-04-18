/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-03-11 18:25:32
 * @Desc: Field_Input field, write this for a sample
 */
import React from "react";
import AbstractField from "../IField";
import { Input } from "antd";
import { observer } from 'mobx-react';

@observer
export default class FieldInput extends AbstractField {
  constructor(options){
    super(options);
  }

  render(){
    const {attr = {}} =this.props._meta;
    return <Input 
      {...this.filterProps()} 
      {...attr} value={this.state.value}
      style={attr.width?{width:attr.width}:null}
      placeholder = {this.props._meta.placeholder}
    />;
  }

  fieldChange = (value) => {
    if (value && value.target) {
      this.props.fieldChange(this.props, value.target.value, value.target.value);
    }
  }
}
