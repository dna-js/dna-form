/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 17:40:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 14:05:41
 * @Desc: 异步级联选择, 业务逻辑较重，慎重开发
 */

import React from "react";
import IField from '../IField';
import { Cascader } from 'antd';
import { ctxReplace } from "ctx-replace";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import Ctx from '@ctx';

/**
 * 从formData中提取级联组件的值
 * @param {*} props 
 */
function derivingValueUnderCascaderKeys(props){
  const formData = props.formData,
        cascaderKeys = props._meta.cascaderKeys,
        value = [];
  //TODO: 如果第一个值为空，则清空后续的值
  if (!formData[cascaderKeys[0]]) {
    return value;
  }

  cascaderKeys.forEach(x => {
    if (formData[x] !== '' && formData[x]) {
      value.push(formData[x])
    }
  })

  return value;
}

@observer
export default class FieldCascader extends IField {
  constructor(options) {
    super(options);
    this.state = { 
      cascaderKeys: this.props._meta.cascaderKeys
    };
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({value: derivingValueUnderCascaderKeys(nextProps)})
  }
  // 不可删除，覆盖原始load datamap的逻辑
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // 在组件不可用时，value值由空变成了有，说明业务数据初次到达，则需要对节点进行展开
    // TODO: 逻辑过于复杂
    if (this.props._meta.status === 'detail') {
      let value = this.state.value;
      (async ()=>{
        let children = this.props.localDataMap;
        for(let i = 0; i < value.length - 1; i++) {
          if (!children) {
            return;
          }
          let level = i;
          let node = children.find(x=>x.value === value[i]);
          if (!node) {
            return;
          }
          let res = await this.expandNode(node, level+1);
          children = res;
        }
      })()
    }
  }

  /**
   * 展开指定节点
   */
  expandNode = (node, level, addtionalCtx={}) => {
    if (node.children) {
      return;
    }
    const {_meta, formData, dataMap} = this.props;
    let isLeaf = false;
    // 最后一层节点都是叶子
    if (level + 1 === _meta.cascaderKeys.length) {
      isLeaf = true;
    }

    let rs = ctxReplace.getUrlFromUrlObj(dataMap[level], Object.assign({}, formData, addtionalCtx));

    return new Promise((resolve, reject)=>{
      Ctx.silentRequest.get(rs.url)
      .then(res => {
        res = res || [];
        res = res.map(x => {
          return {
            value: x.key,
            label: x.value,
            isLeaf: isLeaf
          };
        });
        runInAction(async ()=>{
          node.children = res;
          node.loading = false;
          this.setState({dataMap: [...this.props.localDataMap]}, ()=>{resolve(node.children)});
        })
      })
    })
  }
  
  loadData = async (selectedOptions) => {
    // level 从0开始
    let level = selectedOptions.length - 1,
        { _meta } = this.props;
    // 选择值的最后一个节点需要展开
    const targetNode = selectedOptions[level];

    runInAction(()=>{
      targetNode.loading = true;
    })
    
    // 递归已选值ctx
    let len = level + 1, innerCtx = {};
    while(len--) {
      innerCtx[_meta.cascaderKeys[len]] = selectedOptions[len].value
    }

    let children = await this.expandNode(targetNode, level + 1, innerCtx);
  }
  
  fieldChange = (valmoment, valstring) =>{
    const { cascaderKeys } = this.state;
    
    // 分裂成多个
    valmoment.forEach((t, index) => {
      let opt = Object.assign({}, this.props, {fieldKey: cascaderKeys[index]});
      this.props.fieldChange(opt, t, t);
    });
  }
  
  render(){
    return <Cascader
      {...this.filterProps()}
      options={this.state.localDataMap}
      loadData={this.loadData}
      placeholder={'点击筛选'}
      expandTrigger='hover'
      value={this.state.value}
    />;
  }
}
