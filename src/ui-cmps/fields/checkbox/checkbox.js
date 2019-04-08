/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-03 18:29:13
 */

import React from 'react';
import AbstractField from '../abstract-field';
import { Checkbox } from 'antd';

export default class FieldCheckbox extends AbstractField {
  constructor() {
    super();
  }

  render() {
    return (
      <Checkbox {...this.filterProps()} value={this.state.value} >{this.props.dataMap[0].value}</Checkbox>
    );
  }
}