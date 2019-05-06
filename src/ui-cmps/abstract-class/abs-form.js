/*
 * @Author: lianglongfei001@lianjia.com
 * @Date: 2018-11-08 11:15:24
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-06 10:24:35
 * @Desc: base form， 处理form的通用逻辑:
 *        [1] 生成数据model
 *        [2] 生成Field
 *        [3] 验证
 * @Todos: 
 *        [ ] layout支持
 *        [done] form-region 支持
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { pick } from 'lodash';

 /**
  * 从对象obj中获取keysStr位置的对象，不存在则返回undefined
  * @param {*} obj
  * @param {*} keysStr
  */
 export function getKey(obj, keysStr) {
  let keys = keysStr.split('.');
  while(keys.length) {
    let key = keys.shift();
    if (obj === undefined) {
      return obj;
    }
    obj = obj[key];
  }
  return obj;
}

// 数据模块
import { FormModel } from '../../service/model';
import { observer } from 'mobx-react';

@observer
class BaseForm extends Component {
  constructor(options) {
    super(options);
    // 如果外层传递了formModel则使用外层的formModel
    this.state = {
      formModel: new FormModel(options),
      status: getKey(options, '_meta.status')
    }

    // // 暴露数据实例
    // if (this.props.deriveServiceModel) {
    //   this.props.deriveServiceModel(this.state.formModel);
    // }

    this.props.onFormDataChange(this.state.formModel.formData);
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.formModel) {
  //     return {
  //       formModel: props.formModel
  //     }
  //   }
  //   return {};
  // }


  getFormMeta() {
    return {formContext: pick(this.props, ['_meta', '_type'])};
  }
}

BaseForm.defaultProps = {
  className: 'dna-abstract-form-layout-flow',
  onFormDataChange: ()=>{}
};

BaseForm.propTypes = {
  onFormDataChange: PropTypes.func,
  deriveServiceModel: PropTypes.func
};

export {BaseForm as default};