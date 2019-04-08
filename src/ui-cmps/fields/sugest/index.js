/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 19:04:38 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-04-02 17:02:54
 * @Desc select的输入和输出按照antd来
 */
import React from 'react';
import AbstractField from "../abstract-field";
import { Select } from 'antd';
const Option = Select.Option;
import { observer } from 'mobx-react';

@observer
class FieldSelect extends AbstractField {
  constructor() {
    super();
  }

  static getDerivedStateFromProps(props, state){
    let val = props.value || undefined;
    if (typeof val == 'string') {
      val = {key: val};
    }
   
    return {
      value: val,
      dataMap: props.localDataMap,
      _meta: props._meta
    };
  }

  fieldChange = (originValue)=>{
    if (originValue === undefined) {
      this.props.fieldChange(this.props, originValue, originValue);
      return;
    }
    // 计算出后端需要的值: 分单选和多选
    let value = this.getExportValue(originValue);
    this.props.fieldChange(this.props, value, originValue);
  }
  

  renderOptions = () => {
    // 后端可能返回空key的数据，antd不支持，需要过滤掉
    return this.state.dataMap.filter(x => {
      return x.key !== '';
    }).map(ele => {
      return <Option key={ele.key}>{ele.value}</Option>;
    });
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
 
export default FieldSelect;