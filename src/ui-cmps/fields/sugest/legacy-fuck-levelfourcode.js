/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-03-12 14:21:53 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-03-12 14:46:42
 */

import Sugest from "./index";
import { observer } from 'mobx-react';

@observer
class FieldSelect extends Sugest {
  constructor() {
    super();
  }

  fieldChange = (originValue)=>{
    if (originValue === undefined) {
      this.props.fieldChange(this.props, originValue, originValue);
      return;
    }
    this.props.fieldChange(this.props, originValue.key, originValue);
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'levelFour'}) , originValue.label, originValue);
  }
}
 
export default FieldSelect;