/*
 * @Author: lianglongfei001@lianjia.com
 * @Date: 2018-11-08 11:15:24
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-28 14:24:03
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

    // 暴露数据实例
    if (this.props.deriveServiceModel) {
      this.props.deriveServiceModel(this.state.formModel);
    }

    this.props.onFormDataChange(this.state.formModel.formData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.formModel) {
      return {
        formModel: props.formModel
      }
    }
    return {};
  }

  render() {
    return null;
  }

  getFormMeta() {
    return {formContext: pick(this.props, ['_meta', '_type'])};
  }

  _derivedFieldProp = (field, index) => {
    const { validationRules, validationResults } = this.state.formModel;
    let itemProps = {
      label: field.fieldName,
      key: index
    };

    // 如果 验证规则中存在必填
    if ((validationRules[field.fieldKey]||[]).find(field => field.required)) {
      itemProps.required = true;
    }
    
    // 验证失败msg
    if (validationResults[field.fieldKey]) {
      itemProps.help = validationResults[field.fieldKey][0].message;
      itemProps.validateStatus = 'error';
    }

    return itemProps;
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

BaseForm.defaultProps = {
  className: 'dna-abstract-form-layout-flow',
  onFormDataChange: ()=>{}
};

BaseForm.propTypes = {
  // 点击取消按钮时回调
  buttonCancel: PropTypes.func,
  // formdata 数据更改时触发
  onFormDataChange: PropTypes.func,
  // 组件装载完成时调用
  formMounted: PropTypes.func,
  // 返回数据实例，数据模块装载完成时自动调用
  deriveServiceModel: PropTypes.func
};

export {BaseForm as default};