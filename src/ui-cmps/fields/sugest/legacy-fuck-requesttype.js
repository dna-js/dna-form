/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-01-13 15:54:03 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:08:01
 * @Desc: 屎一样的数据设计之 服务台工单 请求类型
 */

import React from 'react';
import { Select } from 'antd';
import Sugest from './index';
import { observer } from 'mobx-react';

@observer
class FuckRuqustType extends Sugest {
  constructor() {
    super();
  }

  fieldChange = (originValue)=>{
    if (originValue === undefined) {
      this.props.fieldChange(this.props, originValue, originValue);
      return;
    }
    let value = this.getExportValue(originValue);
    this.props.fieldChange(this.props, value, originValue);
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: this.props.fieldKey+'Name'}), originValue.label, originValue);
  }

  render() {
    return (
      <Select {...this.filterProps()} 
          value={this.props.value}
          labelInValue
          showSearch={true} 
          allowClear={true}
          optionFilterProp="children"
        >
        {this.renderOptions()}
      </Select>
    );
  }
}
 
export default FuckRuqustType;