/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:02:02
 */

import React from 'react';
import AbstractField from '../IField';
import { Checkbox } from 'antd';

export default class FieldCheckboxGroup extends AbstractField {
  constructor() {
    super();
  }

  render() {
    const options = this.props.dataMap.map((item) => {
      return {
        ...item,
        label: item.key,
      };
    });

    // 计算value
    let val = this.props.value || undefined;
    if (typeof val == 'string') {
      val = val.split(',');
    }

    return (
      <Checkbox.Group options={options} {...this.filterProps()} value={val}/>
    );
  }
}