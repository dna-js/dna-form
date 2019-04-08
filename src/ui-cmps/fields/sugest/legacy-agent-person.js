/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-01-13 15:54:03 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-13 20:42:27
 * @Desc: 临时组件——经办人组件，因为数据源不是key - value的形式，因此写了一个单独的组件来兼容
 */

import React from 'react';
import { Select } from 'antd';
import Sugest from './index';
const Option = Select.Option;
import { observer } from 'mobx-react';

@observer
class AgentSelect extends Sugest {
  constructor() {
    super();
  }

  renderOptions = () => {
    // 后端可能返回空key的数据，antd不支持，需要过滤掉
    return this.state.dataMap.map(ele => {
      return <Option key={ele.ucId}>{ele.ucName}</Option>;
    });
  }

  fieldChange = (originValue)=>{
    // console.log(this.state.dataMap) 
    const targetData = this.state.dataMap.find(x=>x.ucId == originValue.key);
    if (originValue === undefined) {
      this.props.fieldChange(this.props, originValue, originValue);
      return;
    }
    // 计算出后端需要的值: 分单选和多选
    let value = this.getExportValue(originValue);
    // assignerNameCode
    this.props.fieldChange(this.props, targetData.ucId, originValue);
    // assignerName
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: this.props.fieldKey.replace('Code', '')}), targetData.ucName, originValue);
    // teamCode
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'teamCode'}), targetData.teamCode, originValue);
    // team
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'team'}), targetData.teamName, originValue);
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
 
export default AgentSelect;