/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-01-13 15:54:03 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-29 20:33:45
 * @Desc: 屎一样的数据设计之 服务台工单 二级请求类型
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
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: this.props.fieldKey.replace('Code', '')}), originValue.label, originValue);
  }

  render() {
    return (
      <Select {...this.filterProps()} 
          value={this.state.value}
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