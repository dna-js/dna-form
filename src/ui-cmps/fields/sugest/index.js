/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 19:04:38 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-05 15:37:31
 * @Desc select的输入和输出按照antd来
 */
import React from 'react';
import IField from "../IField";
import { Select } from 'antd';
const Option = Select.Option;
import { observer } from 'mobx-react';

@observer
class FieldSelect extends IField {
  constructor(options) {
    super(options);
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
    if (this.props._meta.status === 'detail') {
      return this.renderPureText()
    }
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

  // sug的value存在数据形式
  getText = () => {
    let {formData, fieldKey} = this.props;
    let val = formData[fieldKey], value = '';
    const { dataMap } = this.state;

    if (dataMap && dataMap.length) {
      value = (dataMap.find(x=>x.key === val)||{}).value;
    }
    return value;
  }
}
 
export default FieldSelect;