/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-12 17:40:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 17:56:27
 * @Desc: 异步级联选择, 业务逻辑较重，慎重开发
 */

import React from "react";
import AbstractField from "../abstract-field";
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

  cascaderKeys.forEach(x => {
    if (formData[x] !== '' && formData[x]) {
      value.push(formData[x])
    }
  })

  return value;
}

@observer
export default class FieldCascader extends AbstractField {
  constructor(options) {
    super(options);
    this.state = { 
      cascaderKeys: this.props._meta.cascaderKeys
    };
  }

  static getDerivedStateFromProps(props, state) {
    // 收集级联数据
    return {
      value: derivingValueUnderCascaderKeys(props),
      dataMap: props.localDataMap,
      _meta: props._meta
    };
  }
  // 不可删除，覆盖原始load datamap的逻辑
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // 在组件不可用时，value值由空变成了有，说明业务数据初次到达，则需要对节点进行展开
    // TODO: 逻辑过于复杂
    if (this.props._meta.enable === false) {
      let value = this.state.value;
      (async ()=>{
        let children = this.state.dataMap;
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
   * 展开指定节点的后代,level从0开始
   */
  expandChildren = (level, addtionalCtx = {}) => {
    const {_meta, formData, dataMap} = this.props;
    let isLeaf = false;
    // 最后一层节点都是叶子
    if (level + 1 === _meta.cascaderKeys.length) {
      isLeaf = true;
    }

    let rs = ctxReplace.getUrlFromUrlObj(dataMap[level], Object.assign({}, formData, addtionalCtx));

    return new Promise((resolve, reject)=>{
      Ctx.request.get(rs.url)
      .then(res => {
        res = res || [];
        res = res.map(x => {
          return {
            value: x.key,
            label: x.value,
            isLeaf: isLeaf
          };
        });

        resolve(res);
      })
      // 展开失败则当前节点变成leaf
      .catch(e => {
        resolve([])
      })
    })
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
      Ctx.request.get(rs.url)
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
          this.setState({dataMap: [...this.state.dataMap]}, ()=>{resolve(node.children)});
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
    while(--len) {
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
      options={this.state.dataMap}
      loadData={this.loadData}
      placeholder={'点击筛选'}
      changeOnSelect
      value={this.state.value}
    />;
  }
}
