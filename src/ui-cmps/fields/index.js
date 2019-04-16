/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:45:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-16 15:20:14
 * @desc: fields map exports
 */
import React from "react";

// 标准组件
import FieldInput from "./input";
import FieldCheckbox from "./checkbox";
import FieldSugest from "./sugest";
// import GroupTree from "./group-tree";
// import DisabledField from "./common-disabled-field";
import Datetime from "./datetime/date-picker";
import RangePicker from "./datetime/range-picker";
import AsyncSug from "./sugest/async-search-sugest";
import Cascaser from "./cascader";
import AsyncCascaser from "./cascader/async-cascader";
// import Editor from "./editor";
// import Envidence from "./envidence";
import FieldRadio from "./radio";
import FieldLink from "./field-link";

// 屎一样的数据混乱业务组件，重点革命推动后端修改
import LegacyDateRange from './datetime/legacy-datetime-range';
import FuckRuqustType from './sugest/legacy-fuck-requesttype';
import FuckRuqustType2 from './sugest/legacy-fuck-rerquesttype2';
import FuckLevelfourcode from './sugest/legacy-fuck-levelfourcode';

// import AgentSelect from './sugest/legacy-agent-person';
import FuckQestion from './cascader/legacy-fuck-question';
import UserGroupStaffSelect from './custom-usergroup-staff-select';

class NullType extends React.Component{
  constructor(options){
    super(options);
  }
  render(){
    return <div> component {this.props._type} is not defined</div>;
  }
}

const map = {
  Field_Input: FieldInput,
  // Field_GroupTree: GroupTree,
  Field_Checkbox: FieldCheckbox.Group,
  Field_Sug: FieldSugest,
  // Field_DisabledField: DisabledField,
  Field_Datetime: Datetime,
  Field_RangePicker: RangePicker,
  Field_LegacyDateRange: LegacyDateRange, // 业务逻辑组件，将要移除
  // Field_AgentSelect: AgentSelect, // 业务逻辑组件：经办人
  Field_FuckRuqustType: FuckRuqustType,// 业务过滤组件：一级问题分类
  Field_FuckRuqustType2: FuckRuqustType2,// 业务过滤组件：二级问题分类
  Field_AsyncSug: AsyncSug, // 异步 select
  Field_Cascaser: Cascaser,
  Field_AsyncCascaser: AsyncCascaser, // 异步级联
  Field_FuckQestion: FuckQestion, // 业务组件： 服务台工单中的问题分类
  Field_FuckLevelfourcode: FuckLevelfourcode, // 业务组件： 问题分类二组件
  // Field_Editor: Editor,
  // Field_Envidence: Envidence,
  Field_Radio: FieldRadio,
  Field_Link: FieldLink,
  Field_CustomUsergroupStaffSelect: UserGroupStaffSelect
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
   * @param {string} type 
   * @param {cmp} cmp 
   * warnning: maybe overwrite old type
   */
  install(type, cmp){
    map[type] = cmp;
  }
};