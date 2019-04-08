/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-27 17:57:35 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-03-26 18:12:20
 * @desc 抽象类组件，对field组件的通用行为进行统一管理
 * 所有field组件都是受控组件
 * todo: [ ]将数据源的刷新发到model中去
 */

import React, { Component } from "react";
import { pick } from 'lodash';
import { observer } from 'mobx-react';

@observer
export default class AbstractField extends Component {
  constructor(options) {
    super(options);
  }

  state = {
    dataMap: []
  }

  // value的属性都是非受控的
  static getDerivedStateFromProps(props, state){
    return {
      value: props.value,
      dataMap: props.localDataMap,
      _meta: props._meta
    };
  }

  fieldChange = (value)=> {
    this.props.fieldChange(this.props, value, value);
  }

  componentDidMount() {
    this.setDataMap();
  }

  setDataMap = (ctx = {}) => {
    let _field = {
      dataMap: this.props.dataMap,
      localDataMap: this.props.localDataMap,
      _type: this.props._type,
      fieldKey: this.props.fieldKey
    }
    this.props.reloadingDataMap(_field, ctx, this.props.formCtx);
  }

  /**
   * get props for antd-cmps from this.props
   * @param {*} defalutValue 
   */
  filterProps() {
    let opts = Object.assign({}, pick(this.props, ['id', '_type', 'xactions']), {
      onChange: this.fieldChange
    });

    if (this.props._meta.multi === true) {
      opts.mode = 'multiple';
    }

    opts.disabled = this.props._meta.enable === false;
    return opts;
  }

  getExportValue = (originValue) => {
    if (originValue === undefined) {
      return originValue;
    }
    // 计算出后端需要的值: 分单选和多选
    let value = '';
    if (!Array.isArray(originValue)) {
      originValue = [originValue];
    }
    if (this.props._meta.getText) {
      value = originValue.map(x=>x.label).join(',');
    } else {
      value = originValue.map(x=>x.key).join(',');
    }

    return value;
  }
}
