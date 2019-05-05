/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-11-21 17:01:52 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-05 15:50:12
 * @Desc: field 之间的联动action 模块
 *  核心理念：基于数据的联动，不引入UI行为
 */

/**
 * check if then action should trigger
 * @param {*} action 
 * @param {*} evt : dna event
 */
function shouldTrigger(action, evt) {
  let { source } = action;
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
  enable: function (target, formDataDefinition) {
    target.enable();
  },
  disable: function (target, formDataDefinition) {
    target.disable();
  },

  // 刷新target的数据源
  resetDataMap: async function (target, formDataDefinition) {
    formDataDefinition.reloadingDataMap(target)
    // 清空值，重获数据源都伴随着清空值(只有编辑态时才触发清空)
    // TODO: bug，对于散射生成的值需要清空所有散射
    if (target._meta.enable === true && target._meta.status !== 'detail') {
      formDataDefinition.setFormData({[target.fieldKey]: ''})
    }
  },
  // 设置值
  setValue: function (target, value, formDataDefinition) {
    formDataDefinition.setFormData({[target.fieldKey]: value});
  },

  // 使必填
  makeRequired: function (target, formDataDefinition) {
    let req = target.validationRules.find(x => x.type === 'required');

    if (!req) {
      target.validationRules.push({
        type: 'required'
      })
    }
    formDataDefinition.collectValidators()
  },
  // 解除必填
  relieveRequired: function (target, formDataDefinition) {
    let reqIndex = target.validationRules.findIndex(x => x.type === 'required');
    if (reqIndex !== -1) {
      target.validationRules.splice(reqIndex, 1)
    }
    formDataDefinition.collectValidators()
  }
};

/**
 * 
 * @param {*} fields : form的所有fields
 * @param {*} event : 源事件
 */
export default function fieldsXActionHandler(fields, event, formDataDefinition) {
  event.action.forEach(singleAction => {
    if (shouldTrigger(singleAction, event)) {
      // TODO： ACTION要做成异步队列，使连续触发时不会导致顺序错乱
      singleAction.target.forEach(element => {
        // target是 formModel中的Field实例
        let target = formDataDefinition.fields.find(x => x._id === element._cmp);
        if (!target) {
          console.warn(`cannot find target cmp(id): ${element._cmp}`);
        } else {
          xactionDealMap[element.action](target, formDataDefinition);
        }
      });
    }
  });

  return fields;
}