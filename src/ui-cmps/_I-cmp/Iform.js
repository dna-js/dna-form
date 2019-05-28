/*
 * @Author: lianglongfei001@lianjia.com
 * @Date: 2018-11-08 11:15:24
 * @Last Modified by: magmaliang@gmail.com
 * @Last Modified time: 2019-05-28 15:50:33
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
import { pick, omit } from 'lodash';

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
class IForm extends Component {
  constructor(options) {
    super(options);
    if (options.formModel) {
      console.warn('there is formModel whthin options in  constructor');
    }

    // 如果外层传递了formModel则使用外层的formModel
    this.state = {};
    this.createFormModel(options);
    this.props.onFormDataChange(this.state.formModel.formData);
  }

  createFormModel(options){
    this.state.formModel = new FormModel(omit(options, ['formModel']));
    // 暴露数据实例
    if (this.props.deriveServiceModel) {
      this.props.deriveServiceModel(this.state.formModel);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.createFormModel(nextProps);
    this.setState({});
  }

  getFormMeta() {
    return {formContext: pick(this.props, ['_meta', '_type'])};
  }

  /**
   * 变更某个field的值
   */
  setFieldValue = (fieldInfo, value, localValue) => {
    this.state.formModel.setFieldValue(fieldInfo, value, localValue)
    this.setState({}, () => {
      this.props.onFormDataChange(this.state.formModel.formData);
    });
  }

  componentDidMount = () => {
    this.props.formMounted && this.props.formMounted(this.state.formModel.formData);
  }

  componentWillUnmount(){
    console.log('释放formmodel')
    this.setState({formModel: null})
  }
}

IForm.defaultProps = {
  className: 'dna-abstract-form-layout-flow',
  onFormDataChange: ()=>{}
};

IForm.propTypes = {
  // 点击取消按钮时回调
  buttonCancel: PropTypes.func,
  // formdata 数据更改时触发
  onFormDataChange: PropTypes.func,
  // 组件装载完成时调用
  formMounted: PropTypes.func,
  // 返回数据实例，数据模块装载完成时自动调用
  deriveServiceModel: PropTypes.func
};

export {IForm as default};