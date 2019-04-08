/*
 * @Author: lianglongfei001@lianjia.com
 * @Date: 2018-11-08 11:15:24
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-03-21 16:44:11
 * @Desc: 搜索态表单
 *        1）search form 的 datamap 延迟到field中获取，因为传递了引用类型的formData(慎用！！！)
 * @Todos: 
 *        [1] 默认值处理
 *        [ ] layout支持
 *        [1] 支持返回key or value的选项
 *        [ ] form-region 支持
 */

import BaseForm from '../abstract-class/base-form';
import PropTypes from "prop-types";
import './index.scss';

// 数据模块
import { observer } from 'mobx-react';

@observer
class DnaSearchForm extends BaseForm {
  constructor(options) {
    super(options);
  }
}

DnaSearchForm.defaultProps = {
  className: 'ant-search-form-layout-flow',
  onFormDataChange: ()=>{}
};

DnaSearchForm.propTypes = {
  // 点击取消按钮时回调
  buttonCancel: PropTypes.func,
  // formdata 数据更改时触发
  onFormDataChange: PropTypes.func,
  // 组件装载完成时调用
  formMounted: PropTypes.func
};

export {DnaSearchForm as default};





