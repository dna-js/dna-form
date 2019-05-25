/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-08 17:06:23 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:05:10
 * @Desc: 历史坑的对应过渡组件
 *        时间区间组件，后端对应着两个字段，前端在展示上使用的是一个组件，所以要求能返回成两个字段
 *        区间两个键值存放在_meta.cascaderKeys中
 */

import { DatePicker } from 'antd';
import React from "react";
import IField from "../IField";
const { RangePicker } = DatePicker;
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

export default class LegacyDateTimePicker extends IField {
  constructor(options){
    super(options);
    this.state = {
      cascaderKeys: this.props._meta.cascaderKeys
    };
  }

  render(){
    // 从props计算出本组件合适的值
    let { cascaderKeys } = this.props._meta;
    let formData = this.props.formData;
    let value = [formData[cascaderKeys[0]], formData[cascaderKeys[1]]].map(x => {return x?moment(x):x});

    let obj = {value: value};
    if (this.props._meta.showTime) {
      obj.showTime = true;
    }
    return <LocaleProvider locale={zh_CN}
      ><RangePicker {...obj} {...this.filterProps()} style={{width: '100%'}}/>
    </LocaleProvider>;
  }

  fieldChange = (valmoment, valstring) => {
    const { cascaderKeys } = this.state;
    this.props.fieldChange(this.props, valstring, valmoment);
    const formStr = this.props._meta.showTime ? 'YYYY-MM-DD HH:mm:ss': 'YYYY-MM-DD'

    // 以级联key来进行重置，因为清空datepicker时 valmoment为空
    cascaderKeys.forEach((key, index) => {
      let t = valmoment[index] ? valmoment[index].format(formStr):'';
      let opt = Object.assign({}, this.props, {fieldKey: key});
      this.props.fieldChange(opt, t, t);
    })
  }
}
