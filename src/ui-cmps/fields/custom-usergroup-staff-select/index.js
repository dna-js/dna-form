/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-03-04 17:37:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 17:51:21
 * @Desc: 工单中，工作组-人选择组件，业务组件，需要回写到业务中，暂时写在通用组件里
 *  TODOS:
 *      []选择人后，反选组织
 *      [done]detail界面数据回显
 */

import React from "react";
import AbstractField from "../abstract-field";
import { Select } from "antd";
import { observer } from 'mobx-react';
import FormConfig from '@config';

import './index.scss';

const { Option } = Select;

@observer
export default class UsergroupStaffSelect extends AbstractField {
  constructor(options){
    super(options);
    this.state = {
      staffOption: [],
      commonOption: {
        showSearch: true,
        allowClear: true,
        optionFilterProp: 'children',
        labelInValue: true
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    let val = props.value || undefined, staff;
    if (typeof val == 'string') {
      val = {key: val};
    }

    // 计算经办人的值
    if (val && props.formData.assignerUcid) {
      staff = {key: [val.key, props.formData.assignerUcid].join('__')}
    }
    
    return {
      value: val,
      dataMap: props.localDataMap,
      _meta: props._meta,
      staff: staff,
      staffOption: props.cache.staffOption || []
    };
  }

  render() {
    let disabled = this.props._meta.enable === false;
    return <div className="custom-usergroup-staff-select">
      <Select 
        value={this.state.value}
        {...this.state.commonOption}
        disabled={disabled}
        onChange={this.setWorkgroup}
        className="custom-workgroup-select"
        placeholder="选择工作组"
      >
        {this.renderWorkgroupOption()}
      </Select>
      <span>-</span>
      <Select 
        value={this.state.staff}
        {...this.state.commonOption}
        disabled={disabled}
        onSearch={this.searchStaff}
        onChange={this.setStaff}
        onFocus={this.searchStaff}
        className="custom-staff-select"
        placeholder="经办人"
        >
        {this.renderStaffOption()}
      </Select>
    </div>;
  }
  
  renderWorkgroupOption = () => {
    return this.state.dataMap.filter(x => {
      return x.key !== '';
    }).map(ele => {
      return <Option key={ele.key}>{ele.value}</Option>;
    });
  }

  renderStaffOption = () => {
    return this.state.staffOption.map(ele => {
      let ucid = ele.teamCode + '__' + ele.ucId;
      let eleTxt = ele.ucName + `(${ele.teamName})`;
      return <Option key={ucid}>{eleTxt}</Option>;
    });
  }

  setWorkgroup = (value, clearStaff = true) => {
    let {key, label} = (value || {});
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'teamCode'}), key, value);
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'team'}), label, value);
    setTimeout(() => {
      this.searchStaff()
    }, 0);

    clearStaff && this.setStaff()
  }

  setStaff = (value) => {
    let {key, label} = (value || {});
    if (key) {
      key = key.split('__')[1];
    }
    
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'assignerUcid'}), key, value);
    // TODO: 兼容后端技术债
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'assignerNameCode'}), key, value);
    this.props.fieldChange(Object.assign({}, this.props, {fieldKey: 'assignerName'}), label, value);

    if (!value) {
      this.setState({staff: undefined})
      return;
    }
    
    // 反写工作组：此时禁止清空staff
    let fullStaffInfo = this.state.staffOption.find(x => [x.teamCode, x.ucId].join('__') === value.key);
    fullStaffInfo && this.setWorkgroup({key: fullStaffInfo.teamCode, label: fullStaffInfo.teamName}, false)
  }

  searchStaff = (val) => {
    let workgroup = this.state.value || {};
    let url = [`/web/fe/resource/systemConfigServiceImpl/getAllUserByCity?project=helpDesk`,
        `cityCode=${this.props.formData.cityCode||''}`,
        `team=${workgroup.label||''}`,
        `teamCode=${workgroup.key||''}`,
        `keyword=${val||''}`
    ].join('&');

    FormConfig.request.get(url).then(res => {
      this.state.staffOption = res;
      this.props.Field.setCache({staffOption: res})
      this.setState({})
    })
  }

  searchStaffOnFocus = () => {
    this.searchStaff()
  }

  // 详情里搜索人员datasource
  componentDidUpdate(){
    if (this.props._meta.enable === false && this.state.staffOption.length === 0 && this.state.staff !== undefined) {
      this.searchStaff()
    }
  }
}
