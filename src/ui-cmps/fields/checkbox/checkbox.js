/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:52:31
 */

import React from 'react';
import IField from '../IField';
import { Checkbox } from 'antd';

export default class FieldCheckbox extends IField {
  constructor(options) {
    super(options);
  }

  render() {
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
    return (
      <Checkbox {...this.filterProps()} value={this.props.value} >{this.props.dataMap[0].value}</Checkbox>
    );
  }
}