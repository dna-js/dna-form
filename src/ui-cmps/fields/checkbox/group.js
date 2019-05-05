/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-05 14:29:20
 */

import React from 'react';
import IField from '../IField';
import { Checkbox } from 'antd';

export default class FieldCheckboxGroup extends IField {
  constructor(options) {
    super(options);
  }

  static getDerivedStateFromProps(props, state){
    let val = props.value || undefined;
    if (typeof val == 'string') {
      val = val.split(',');
    }
    return {
      value: val
    };
  }

  render() {
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
    const options = this.props.dataMap.map((item) => {
      return {
        ...item,
        label: item.key,
      };
    });

    return (
      <Checkbox.Group options={options} {...this.filterProps()} value={this.state.value}/>
    );
  }
}