/*
 * @Author: lianglongfei001@lianjia.com
 * @Date: 2018-11-08 11:15:24
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-25 01:16:35
 * @Desc: form region, feild的容器
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
const FormItem = Form.Item;
import Fields from "../fields";
// 数据模块
import { observer } from 'mobx-react';
import './index.scss';

@observer
class DnaFormRegion extends Component {
  constructor(options) {
    super(options);
    this.state = {
      status: 'edit'
    };
  }

  render() {
    let className = [this.props.className, this.props._meta.layout].join(' ');
    const {header} = this.props;
    console.log('key---->key---->', this.props.key)
    return <div className="form-region">
      {
        header.visible ? <div className='region-header'>
        <p className="region-title">{this.props.header.title}</p>
      </div>: null  
      }
      <Form className={className} >
        {this.createFields()}
      </Form>
    </div>;
  }

  /**
   * 生成field
   */
  createFields() {
    const { localFormData, fields, formData, reloadingDataMap} = this.props;
    return fields.filter(x=>x._meta.visible).map((x, index) => {
      let Cmp = Fields.getDefFromField(x);
      return <FormItem
            {...this._derivedFieldProp(x, index)}
          >
            <Cmp {...x} 
              Field = {x}
              fieldChange={this.props.setFieldValue} 
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
    const { validationRules, validationResults } = this.props;
    let itemProps = {
      label: field.fieldName,
      key: index
    };

    // 如果 验证规则中存在必填
    if ((validationRules[field.fieldKey]||[]).find(field => field.required)) {
      itemProps.required = true;
    }
    
    // 验证失败msg
    if (validationResults[field.fieldKey]) {
      itemProps.help = validationResults[field.fieldKey][0].message;
      itemProps.validateStatus = 'error';
    }

    return itemProps;
  }
}

DnaFormRegion.defaultProps = {
  className: 'dna-abstract-form-layout-flow'
};

DnaFormRegion.propTypes = {
  setFieldValue: PropTypes.func
};

export {DnaFormRegion as default};