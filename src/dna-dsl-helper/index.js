
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

export default {
  Form
}