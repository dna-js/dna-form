/*
 * @Author: lianglongfei001@lianjia.com
 * @Date: 2018-08-31 17:06:52
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-01-05 16:58:00
 */

 /**
  * 从对象obj中获取keysStr位置的对象，不存在则返回undefined
  * @param {*} obj
  * @param {*} keysStr
  */
export function getKey(obj, keysStr) {
  let keys = keysStr.split('.');
  while(keys.length) {
    let key = keys.shift();
    if (obj === undefined) {
      return obj;
    }
    obj = obj[key];
  }
  return obj;
}

/**
 * 格式化fields数组，主要用于添加默认值
 * @param {*} fields
 */
export function filterFields(fields = [], parentContext = {}){
  // 补全默认值
  fields.forEach(x=>{
     x._meta = Object.assign({
       visible: true,
       enable: true,
       status: parentContext.status,
       extendValue: true
     }, x._meta);

     x._dataMap = x.dataMap;
     x._id = x._id || x.fieldKey; // id 默认为key
     x.dataMapPhase = false;

     // 如果是展示状态的组件，则直接转化为disable-field
     if (x._meta.enable === false) {
       x._originType = x._type;
       x._type = 'Field_DisabledField';
     }
  });


  let visibleFields = fields.filter(x => x._meta.visible);

  console.log(visibleFields.map(x=>x._id));

  return visibleFields;
}

/**
 * 搜索表单数据的格式化
 * @param {*} fields
 * @param {*} parentContext
 */
export function searchFieldFormat(fields = [], parentContext) {
  // 1.起止时间的合并：数据上起止时间用...Start, ...End来组成区间，但是是分开的，antd使用timerange来管理起止时间
  fields.forEach(x => {
    if (x._type === 'Field_Datetime') {
      if (x.fieldKey.endsWith('Start') || x.fieldKey.endsWith('From')) {
        x.fieldKey = x.fieldKey.replace('Start', '').replace('From', '');
        x._type = 'Field_RangePicker';
      } else {
        x._type = null;
      }
    }
  });

  fields = fields.filter(x => x._type);

  return filterFields(fields, parentContext);
}

// 搜索表单数据格式化
export function searchFormDataManager(fields, formData = {}) {
  this.fields = fields || [];
  this.formData = formData;
}

Object.assign(searchFormDataManager.prototype, {
  fieldFormat(parentContext) {
    // 1.起止时间的合并：数据上起止时间用...Start, ...End来组成区间，但是是分开的，antd使用timerange来管理起止时间
    this.fields.forEach(x => {
      if (x._type === 'Field_Datetime') {
        if (x.fieldKey.endsWith('Start') || x.fieldKey.endsWith('From')) {
          x.fieldKey = x.fieldKey.replace('Start', '').replace('From', '');
          x._type = 'Field_RangePicker';
        } else {
          x._type = null;
        }
      }
    });

    let flds = this.fields.filter(x => x._type);
    return filterFields(flds, parentContext);
  },
  
  getFormData(fieldInfo, value) {
    const { fieldKey } = fieldInfo;
    // 将 range-picker 恢复成后端需要的双字段
    if (fieldInfo._type === 'Field_RangePicker') {
      value = value.map(x=>{
        return x.format("YYYY-MM-DD");
      });
      this.formData[fieldKey+'Start'] = value[0] || '';
      this.formData[fieldKey+'End'] = value[1] || '';
      // 异步级联数据展开为后端数据
    } else if(fieldInfo._type === 'Field_AsyncCascaser'){
      // 数据置空逻辑
      if (value.length === 0) {
        value = [...fieldInfo._meta.cascaderKeys].fill('');
      }
      value.forEach((x, index) => {
        let key = fieldInfo._meta.cascaderKeys[index];
        this.formData[key] = x;
      });
    } else {
      // 等重构
      if (value && Object.keys(value).includes('key')) {
        value = value.key;
      }
      this.formData[fieldKey] = value || '';
    }

    return this.formData;
  }
});

