/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-28 12:24:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 17:40:54
 * @desc： 基础form组件
 */

import React from 'react';
import PropTypes from "prop-types";
import { pick } from 'lodash';
import BaseForm from '../abstract-class/base-form';
import DnaFormRegion from '../form-region';
import { observer } from 'mobx-react';
import './index.scss';


@observer
class DnaForm extends BaseForm {
  constructor(options){
    super(options);
  }

  componentDidMount(){
    this.tryFetchData();
  }

  render() {
    const { localFormData, validationRules, validationResults, formData, reloadingDataMap } = this.state.formModel;
    return (<div 
      className={this.props.className}>
      {this.state.formModel.regions.map((region, index) => {
        return <DnaFormRegion
          {...region}
          key={index}
          localFormData={localFormData}
          formData={formData}
          setFieldValue={this.setFieldValue}
          outerCtx={this.props.outerCtx}
          validationResults = {validationResults}
          validationRules = {validationRules}
          reloadingDataMap = {reloadingDataMap}
        ></DnaFormRegion>
      })}
    </div>);
  }

  getFormMeta(){
    return {formContext: pick(this.props, ['_meta', '_type'])}; 
  }

  /**
   * 表单处于编辑状态及传入了数据的id，则开始获取表单的数据，并入到field的default value中
   */
  tryFetchData(){
    // 非编辑态，不需要获取表单数据
    if (this.state.status !== 'edit') {
      return;
    }
    // 没有id，也不获取
    if (!this.props.id) {
      return;
    }
    
    // let rs = getUrlFromUrlObj(this.props.fetchUrl, {id: this.props.id});
    // // 请在request中统一处理异常
    // sysHttp.get(rs.url).then(res => {
    //   this.state.formModel.setFormData(res);
    //   this.state.formModel.setLocalFormData(res);
    // });
  }
}

DnaForm.defaultProps = {
  className: 'dna-basic-form',
  onFormDataChange: ()=>{}
};

DnaForm.propTypes = {
  // 点击取消按钮时回调
  buttonCancel: PropTypes.func,
  saveSuccessed: PropTypes.func,
  saveFailed: PropTypes.func
};

export {DnaForm as default};