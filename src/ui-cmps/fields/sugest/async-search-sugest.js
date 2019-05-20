/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 14:18:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-20 14:33:01
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
    dataMap: []
  }

  fetchOptions = (value) => {
    this.setState({fetching: true});
    this.setDataMap({[this.props.fieldKey]: value});
  }

  render() {
    const { fetching, dataMap } = this.state;
    return (
      <Select
        {...this.filterProps()}
        showSearch
        labelInValue
        allowClear
        defaultActiveFirstOption={false}
        value={this.state.value}
        placeholder="输入进行检索"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchOptions}
        style={{ width: '100%' }}
      >
        {dataMap.map(d => <Option key={d.key}>{d.value}</Option>)}
      </Select>
    );
  }
}
