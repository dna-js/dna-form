/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 14:01:30
 * @Desc: Field_Input field, write this for a sample
 */
import React from "react";
import IField from "../IField";
import { Input } from "antd";
import { observer } from 'mobx-react';

@observer
export default class FieldInput extends IField {
  constructor(options){
    super(options);
  }

  render(){
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
    const {attr = {}} =this.props._meta;
    return <Input 
      {...this.filterProps()} 
      {...attr} value={this.props.value}
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
