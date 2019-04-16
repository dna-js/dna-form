/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 17:47:06
 * @Desc: 质效平台关联业务组件
 */

import React from "react";
import AbstractField from "../abstract-field";
import { Button } from "antd";
import { observer } from 'mobx-react';
import { ctxReplace} from "ctx-replace";

@observer
export default class FieldInput extends AbstractField {
  constructor(options){
    super(options);
    this.state = {
      jumpUrl : ''
    }
  }

  render(){
    return !this.state.value ? <Button {...this.filterProps()} type="primary">
      <a href={this.getJumpUrl()} target="_blank">{this.props.fieldName}</a>
    </Button>: <span>{this.state.value}</span>
  }

  getJumpUrl = () => {
    const {dataMap, formData} = this.props;
    let rs = ctxReplace.getUrlFromUrlObj(dataMap[0], formData);
    return rs.url
  }

  // 不能删除，覆盖父组件默认逻辑
  componentDidMount(){}
}
