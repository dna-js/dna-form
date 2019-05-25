/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:00:31
 */

import React from 'react';
import AbstractField from '../IField';
import { Checkbox } from 'antd';

export default class FieldCheckbox extends AbstractField {
  constructor() {
    super();
  }

  render() {
    return (
      <Checkbox {...this.filterProps()} value={this.props.value} >{this.props.dataMap[0].value}</Checkbox>
    );
  }
}