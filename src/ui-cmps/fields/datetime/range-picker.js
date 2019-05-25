/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-08 17:06:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:05:27
 */

import { DatePicker } from 'antd';
import React from "react";
import IField from "../IField";
const { RangePicker } = DatePicker;
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


export default class FieldInput extends IField {
  constructor(options){
    super(options);
  }

  render(){
    let obj = {value: this.props.value};
    if (this.props._meta.showTime) {
      obj.showTime = true;
    }

    return <LocaleProvider locale={zh_CN}>
      <RangePicker {...obj} {...this.filterProps()} style={{width: '100%'}}/>
    </LocaleProvider>;
    
  }

  fieldChange = (valmoment) => {
    this.props.fieldChange(this.props, valmoment.format('YYYY-MM-DD HH:mm:ss'), valmoment);
  }
}
