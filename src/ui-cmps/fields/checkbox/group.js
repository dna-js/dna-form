/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-08-01 18:32:03
 */

import React from 'react';
import IField from '../IField';
import { Checkbox } from 'antd';

export default class FieldCheckboxGroup extends IField {
  constructor(options) {
    super(options);
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