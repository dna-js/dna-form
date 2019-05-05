/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-28 12:24:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-05 16:18:37
 * @desc：form 输出物
 */
import IForm from './ui-cmps/abstract-class/abs-form';
import DnaBasicForm from './ui-cmps/basic-form';
import { FormModel } from './service/model';
import Fields from './ui-cmps/fields';
const { IField } = Fields;

import Ctx from '@ctx';

// -----数据生成助手----
import DslHelper from './dna-dsl-helper';

export {
  // Ctx用于设置Form使用环境上下文
  Ctx,
  IForm,
  IField,
  // UI 组件
  DnaBasicForm,
  FormModel,
  Fields,
  // 数据生成助手
  DslHelper,
};