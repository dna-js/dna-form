/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:45:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-06 20:15:05
 * @desc: fields map exports
 * @Todo:
 *    [ ]增加对连续性Field的自洽能力
 */


import React from "react";

// 抽象组件
import IField from './IField';

// 标准组件
import Input from "./input";
import Checkbox from "./checkbox";
import Sugest from "./sugest";
import Datetime from "./datetime/date-picker";
import RangePicker from "./datetime/range-picker";
import AsyncSug from "./sugest/async-search-sugest";
import Cascaser from "./cascader";
import AsyncCascaser from "./cascader/async-cascader";
import Radio from "./radio";

class NullType extends React.Component{
  constructor(options){
    super(options);
  }
  render(){
    return <div> cmp {this.props._type} is not defined</div>;
  }
}

const map = {
  Field_Input: Input,
  Field_Checkbox: Checkbox.Group,
  Field_Sug: Sugest,
  Field_Datetime: Datetime,
  Field_RangePicker: RangePicker,
  Field_AsyncSug: AsyncSug, // 异步 select
  Field_Cascaser: Cascaser,
  Field_AsyncCascaser: AsyncCascaser, // 异步级联
  Field_Radio: Radio,
};

export default {
  getDef(type){
    return map[type] || NullType;
  },
  getDefFromField (field) {
    let {_type: type} = field;
    return map[type] || NullType;
  },
  /**
   * 
   * @param {*} cmps {type: '', cmp: react_component}
   */
  install(cmps){
    Object.assign(map, cmps);
  },
  IField,
  Input,
  Checkbox,
  Sugest,
  AsyncSug,
  Datetime,
  RangePicker,
  Cascaser,
  AsyncCascaser,
  Radio
};