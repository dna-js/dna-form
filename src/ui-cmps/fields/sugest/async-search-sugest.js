/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 14:18:14 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-08-01 22:29:09
 * @Desc: 异步搜索sug, input变化触发搜索引起dataMap发生变化
 */
import React from "react";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import Sugest from './index';
const Option = Select.Option;
import { observer } from 'mobx-react';

@observer
export default class AsyncSugest extends Sugest {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchOptions = debounce(this.fetchOptions, 300);
  }

  state = {
    fetching: false,
  }

  fetchOptions = (value) => {
    this.setState({fetching: true});
    this.setDataMap({[this.props.fieldKey]: value});
  }

  render() {
    return (
      <Select
        {...this.filterProps()}
        showSearch
        labelInValue
        allowClear
        defaultActiveFirstOption={false}
        value={this.getValueFromProps()}
        placeholder="输入进行检索"
        notFoundContent={null}
        filterOption={false}
        onSearch={this.fetchOptions}
        style={{ width: '100%' }}
      >
        {this.props.localDataMap.map(d => <Option key={d.key}>{d.value}</Option>)}
      </Select>
    );
  }
}