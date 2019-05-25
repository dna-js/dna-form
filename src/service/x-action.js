/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-21 17:01:52 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 23:33:48
 * @Desc: field 之间的联动action 模块
 */

/**
 * check if then action should trigger
 * @param {*} action 
 * @param {*} evt : dna event
 */
function shouldTrigger(action, evt) {
  let {
    source
  } = action;
  if (source.action !== evt.eventName) {
    return false;
  }
  // if evt is a field value-change event,then check the trigger
  if (evt.eventName === 'valueChange' && source.trigger) {
    let foo = new Function("value", 'return ' + source.trigger);
    return foo(evt.value);
  }

  return true;
}

/**
 * action list
 */
const xactionDealMap = {
  // 可见不可见
  visible: function (target) {
    target._meta.visible = true;
  },
  unVisible: function (target) {
    target._meta.visible = false;
  },

  // 是否可编辑
  enable: function (target, dataModel) {
    target.enable();
  },
  disable: function (target, dataModel) {
    target.disable();
  },

  // 刷新target的数据源
  resetDataMap: async function (target, dataModel) {
    dataModel.reloadingDataMap(target);
    // 清空值，重获数据源都伴随着清空值(只有编辑态时才触发清空)
    if (target._meta.enable === true && target._meta.status !== 'detail') {
      let data = {};
      let {cascaderKeys} = target._meta;
      if (cascaderKeys) {
        cascaderKeys.forEach(key => {data[key] = ''});
      } else {
        data[target.fieldKey] = '';
      };
      
      dataModel.setFormData(data);
    }
  },

  // 使必填
  makeRequired: function (target, dataModel) {
    let req = target.validationRules.find(x => x.type === 'required');
    if (!req) {
      target.validationRules.push({
        type: 'required'
      })
    }
    dataModel.collectValidators()
  },
  // 解除必填
  relieveRequired: function (target, dataModel) {
    let reqIndex = target.validationRules.findIndex(x => x.type === 'required');
    if (reqIndex !== -1) {
      target.validationRules.splice(reqIndex, 1)
    }
    dataModel.collectValidators()
  }
};

export default function fieldsXActionHandler(fields, event, dataModel) {
  event.action.forEach(singleAction => {
    if (shouldTrigger(singleAction, event)) {
      // TODO： ACTION要做成异步队列，使连续触发时不会导致顺序错乱
      singleAction.target.forEach(element => {
        // target是 formModel中的Field实例
        let target = dataModel.fields.find(x => x._id === element._cmp);
        if (!target) {
          console.warn(`cannot find target cmp(id): ${element._cmp}`);
        } else {
          xactionDealMap[element.action](target, dataModel);
        }
      });
    }
  });

  return fields;
}