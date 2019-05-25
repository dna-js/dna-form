import { cloneDeep } from 'lodash';

/**
 * form stadard dsl tpl
 */
class Form {
  _type = 'Form';
  regions = [];
  _meta = {
    "status": 'create'
  };
  // 默认值
  _defaultFormData = {}

  extentions = {
    datasourceFormat: {}
  }

  constructor(options){
    Object.assign(this, options)
  }
}

function getDetailForm(formStruct) {
  let struct = cloneDeep(formStruct);
  struct._meta.status = 'detail';
  struct.regions.forEach(r => {
    r.fields.forEach(f => {
      f._meta.status = 'detail';
    })
  })
  return struct;
}


export default {
  Form,
  getDetailForm
}