/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-28 12:24:11 
 * @Last Modified by: mikey.zhaopeng
<<<<<<< HEAD
 * @Last Modified time: 2019-04-28 14:24:08
=======
 * @Last Modified time: 2019-05-26 01:39:43
>>>>>>> demotion_base_on_ref
 * @desc： 基础form组件
 */

import React from 'react';
import PropTypes from "prop-types";
import { pick } from 'lodash';
import AbsForm from '../abstract-class/abs-form';
import { observer } from 'mobx-react';
import Fields from "../fields";
import { Form } from "antd";
const FormItem = Form.Item;
import './index.scss';

@observer
class DnaForm extends AbsForm {
  constructor(options){
    super(options);
  }

  render() {
    return (<div 
      className={this.props.className}>
      {this.state.formModel.regions.map((region, index) => {
        let className = [region._meta.layout].join(' ');
        const {header, fields} = region;
        return <div className="form-region" key={index}>
          {
            header.visible ? <div className='region-header'>
            <p className="region-title">{header.title}</p>
          </div>: null  
          }
          <Form className={className} >
            {this.renderFields(fields)}
          </Form>
        </div>;
      })}
    </div>);
  }

  getFormMeta(){
    return {formContext: pick(this.props, ['_meta', '_type'])}; 
  }

  renderFields = (fields) => {
    const { localFormData, formData, reloadingDataMap} = this.state.formModel;
    return fields.filter(x=>x._meta.visible).map((x, index) => {
      let Cmp = Fields.getDefFromField(x);
      return <FormItem
            {...this._derivedFieldProp(x, index)}
            className={x._type}
          >
            <Cmp {...x} 
              Field = {x}
              fieldChange={this.setFieldValue} 
              value={localFormData[x.fieldKey]} 
              formCtx={this.props.outerCtx}
              formData={formData}
              reloadingDataMap={reloadingDataMap}
              key={index}
            />
          </FormItem>;
    });
  }

  _derivedFieldProp = (field, index) => {
    const { validationRules, validationResults } = this.state.formModel;
    let itemProps = {
      label: field.fieldName,
      key: index
    };

    // 如果 验证规则中存在必填
    if ((validationRules[field.fieldKey]||[]).find(field => field.required)) {
      itemProps.required = true;
<<<<<<< HEAD
    }
    
    // 验证失败msg
    if (validationResults[field.fieldKey]) {
      itemProps.help = validationResults[field.fieldKey][0].message;
      itemProps.validateStatus = 'error';
    }

    return itemProps;
  }

  /**
   * 表单处于编辑状态及传入了数据的id，则开始获取表单的数据，并入到field的default value中
   */
  tryFetchData(){
    // 非编辑态，不需要获取表单数据
    if (this.state.status !== 'edit') {
      return;
=======
>>>>>>> demotion_base_on_ref
    }
    
    // 验证失败msg
    if (validationResults[field.fieldKey]) {
      itemProps.help = validationResults[field.fieldKey][0].message;
      itemProps.validateStatus = 'error';
    }

    return itemProps;
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