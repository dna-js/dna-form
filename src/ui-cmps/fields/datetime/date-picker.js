/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-08 17:06:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 14:01:39
 */

import { DatePicker } from 'antd';
import React from "react";
import IField from "../IField";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


export default class FieldInput extends IField {
  constructor(options){
    super(options);
  }

  render(){
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
    let obj = {value: this.props.value};
    if (!this.props._meta.showTime) {
      obj.showTime = true;
    }
    return <LocaleProvider locale={zh_CN}>
      <DatePicker {...obj} {...this.filterProps()} style={{width: '100%'}}/>
    </LocaleProvider>;
  }

  fieldChange = (valmoment) => {
    this.props.fieldChange(this.props, valmoment.format('YYYY-MM-DD HH:mm:ss'), valmoment);
  }
}
