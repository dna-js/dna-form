/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:45:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-18 11:55:38
 * @desc: fields map exports
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

// 屎一样的数据混乱业务组件，重点革命推动后端修改
import LegacyDateRange from './datetime/legacy-datetime-range';
import FuckRuqustType from './sugest/legacy-fuck-requesttype';
import FuckRuqustType2 from './sugest/legacy-fuck-rerquesttype2';
import FuckLevelfourcode from './sugest/legacy-fuck-levelfourcode';
import FuckQestion from './cascader/legacy-fuck-question';

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
  Field_LegacyDateRange: LegacyDateRange, // 业务逻辑组件，将要移除
  Field_FuckRuqustType: FuckRuqustType,// 业务过滤组件：一级问题分类
  Field_FuckRuqustType2: FuckRuqustType2,// 业务过滤组件：二级问题分类
  Field_AsyncSug: AsyncSug, // 异步 select
  Field_Cascaser: Cascaser,
  Field_AsyncCascaser: AsyncCascaser, // 异步级联
  Field_FuckQestion: FuckQestion, // 业务组件： 服务台工单中的问题分类
  Field_FuckLevelfourcode: FuckLevelfourcode, // 业务组件： 问题分类二组件
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