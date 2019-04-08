/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-01-13 20:10:56 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-02-27 18:01:57
 * @Desc 任务工单中级联问题选择：屎一样的逻辑，屎一样的API丢到前端
 */

import { observer } from 'mobx-react';
import FieldCascader from './async-cascader';

@observer
export default class FuckQuesionCascader extends FieldCascader {
  constructor(options) {
    super(options);
  }

  fieldChange = (valString, valObject) =>{
    const { cascaderKeys } = this.state;
    cascaderKeys.forEach((key, index) => {
      let t = valObject[index];
      t = t || {value: undefined, label: undefined};

      let opt1 = Object.assign({}, this.props, {fieldKey: key});
      this.props.fieldChange(opt1, t.value, t.value);

      let opt2 = Object.assign({}, this.props, {fieldKey: key.replace('Code', '')});
      this.props.fieldChange(opt2, t.label, t.label);
    })
  }
}