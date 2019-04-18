/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-03 18:30:03
 */

import React from 'react';
import AbstractField from '../IField';
import { Checkbox } from 'antd';

export default class FieldCheckboxGroup extends AbstractField {
  constructor() {
    super();
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