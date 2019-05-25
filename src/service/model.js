/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-12-21 15:38:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-25 13:41:10
 * @Desc：表单核心数据逻辑
 * @TODOS: 
 *      [ ] form初始化完成事件
 *      [ ] 独立各Field的初始化
 *      [ ] 增加form init ready的时间节点
 */
import { observable, action, runInAction, _isComputingDerivation, when } from 'mobx';
import { formatRules, validating } from './validator';
import { cloneDeep, pick, merge, omit, clone} from "lodash";
import Ctx from '@ctx';
import { ctxReplace } from "ctx-replace";
import fieldsXActionHandler from "./x-action";

// 表单字段的数据定义
class Field {
  // === 交互开关 ====
  @observable immediatlyValidate = false; // valuechange时立即验证
  @observable formDataLegal = false; // formdata 是否通过了验证，是合法的数据
  
  // === 业务数据 ====
  @observable dataMap = []; // 原始值
  @observable localDataMap = []; // 转化之后的值
  @observable _meta = {
    status: 'detail',
    enable: true,
    visible: true,
    multi: false,
    getText: false // select等类型返回数据时是否获取text值
  };
  
  @observable fieldName;
  @observable fieldKey;
  @observable defaultValue;
  @observable _id;
  @observable cache = {};

  setValue = () => {}
  
  constructor(options) {
    this.init(options);
    when(() => this.localDataMap.length > 0, () => {
      if (this._meta.firstSelect) {
        this.setValue(this.localDataMap[0].key, this.localDataMap[0])
      }
    })
  }
  
  @action init = (options) => {
    // 默认_id
    if (!('_id' in options)) {
      options._id = options.fieldKey;
    }
    // 我知道这段代码看起来很奇怪，但是lodash的merge是索引级merge，对数组进行索引级merge会引发mobx巨量警告
    merge(this, omit(options, ['dataMap', 'localDataMap']));
    merge(this._meta, options._meta);
    this.dataMap = options.dataMap;
    if (options.localDataMap) {
      this.localDataMap.replace(options.localDataMap)
    }

    // 初始数据源是对象数组, 则直接设置localDataMap
    if (this.dataMap.length > 0 && typeof this.dataMap[0] == 'object') {
      this.localDataMap = this.dataMap;
    }
  }
  
  @action enable = () => {
    this._meta.enable = true;
  }
  
  @action disable = () => {
    this._meta.enable = false;
  }

  @action detail = () => {
    this._meta.status = 'detail';
  }
  
  @action antiDetail = (status = 'create') => {
    this._meta.status = 'status';
  }

  // 缓存操作
  @action setCache = (cache = {}) => {
    Object.assign(this.cache, cache)
  }

  @action getCache = (keys) => {
    if (!keys) {
      return this.cache;
    }

    return pick(this.cache, keys)
  }
}

// form区块，只负责展示区块，不包含表单功能
// field的格式化由form完成
class Region {
  @observable fields = [];
  @observable header = {};
  @observable _meta = {
    layout: 'triple'
  };
  
  constructor(regionDefinition) {
    this.init(regionDefinition);
  }
  
  @action init(regionDefinition) {
    Object.assign(this, regionDefinition);
  }
}

/**
 * 表单的数据定义
 */
class FormModel {
  @observable validationRules = {};
  @observable validationResults = {};
  @observable fields = [];
  @observable regions = [];
  @observable formData = {}; // 对外使用的数据
  @observable localFormData = {}; // 组件使用的数据
  @observable _defaultFormData = {}; //默认数据
  @observable _meta = {
    immediatlyValidate: false, // 字段值变化时即时验证，为false时则需要提交时触发
    status: 'create',
  };
  @observable outerCtx = {};

  @observable extentions = {
    datasourceFormat: {}
  };
  
  constructor(formDefinition) {
    this.init(formDefinition);
  }

  /**
   * 重置form，将form的配置和字段恢复到初始化时的状态
   */
  @action reset(){
    this._meta.immediatlyValidate = false;
    this.resetFormData();
  }
  
  /**
   * 支持fields 和 regions, 仅有fields时会创建一个无头的region
   * @param {*} formDefinition
   */
  @action init(formDefinition) {
    this.outerCtx = formDefinition.outerCtx || {};
    
    const {regions=[], _meta } = formDefinition;

    // 创建form
    const createField = (field) => {
      return new Field(Object.assign({}, field, {
        setValue: (value, localValue) => { this.setFieldValue(field, value, localValue)}
      }))
    }
    
    // 初始化_meta
    this._meta = Object.assign({}, this._meta, _meta)
    
    // 解析regions
    regions.forEach(region => {
      let regionFields = [];
      // 生成fields
      region.fields.forEach(field => {
        let fieldIns = createField(field);
        regionFields.push(fieldIns);
        this.fields.push(fieldIns);
      });
      
      //生成 region
      let regionDefinition = Object.assign({}, region, {
        fields: regionFields,
        ctx: this.outerCtx
      })
      
      this.regions.push(new Region(regionDefinition));
    })
    
    // 生成验证信息
    this.collectValidators();

    // 扩展: TODO
    this.extentions = formDefinition.extentions || {datasourceFormat: {}};
    if (formDefinition._defaultFormData) {
      this._defaultFormData = formDefinition._defaultFormData;
    }

    // 生成默认值
    this.derivingDefaultData();
  }
  
  /**
   * 设置antd组件使用的数据
   */
  @action setLocalFormData = (state)=>{
    Object.assign(this.localFormData, state);
  }

  /**
   * 设置默认值，将会和已有的默认值合并
   */
  @action setDefaultFormData = (data) => {
    this._defaultFormData = Object.assign({}, this._defaultFormData, data);
  }
  /**
   * 恢复页面的数据为 frozenData
   * 使用场景：页面编辑后取消，需要恢复数据
   */
  @action recoverFormdata = () => {
    this.setFormData(this.frozenData);
  }

  /**
   * 设置表单数据，会激发联动
   */
  @action setFormData = (state) => {
    const fieldKeys = Object.keys(state);
    // 如果开启了立即验证，每次保存formData时开启验证
    if (this._meta.immediatlyValidate) {
      validating(state, pick(this.validationRules, fieldKeys))
        .then(res => {
          runInAction(() => {
            fieldKeys.forEach(x=>{
              this.validationResults[x] = null;
              // TODO: 性能
              this.validationResults = cloneDeep(this.validationResults);
            });
          });
        })
        .catch(err => {
          runInAction(() => {
            this.validationResults = Object.assign({}, this.validationResults, err);
          });
        });
    }
    
    fieldKeys.forEach(key => {
      let target = Object.assign({}, this.fields.find(x => {
        return x.fieldKey === key || (x._meta.cascaderKeys && x._meta.cascaderKeys.indexOf(key) > -1)
      }), {fieldKey: key});
      
      this.setFieldValue(target, state[key], state[key]);
    })
  }
  
  
  @action doValidate = async () => {
    // 执行过一次集体验证后，开启立即验证
    this._meta.immediatlyValidate = true;
    
    try {
      await validating(this.formData, this.validationRules);
      runInAction(() => {
        this.formDataLegal = true;
      });
      return true;
    } catch (error) {
      runInAction(()=>{
        this.formDataLegal = false;
        this.validationResults = error;
      });
      
      return false;
    }
  }
  
  // 将当前model的状态推到终态：完成自检（完成验证等操作）
  async tryGetSolidState() {
    return await this.doValidate();
  }
  
  /**
   * 收集validator规则
   */
  @action collectValidators = () => {
    this.fields
      .filter(x => x.validationRules)
      .forEach(x => {
        this.validationRules[x.fieldKey] = formatRules(x.validationRules, x.fieldName);
      });
  }
  
  @action derivingDefaultData = () => {
    if (this._meta.status === 'edit') {
      return;
    }
    // 清空上一次的值
    this.formData = clone(this._defaultFormData);
    this.localFormData = clone(this._defaultFormData);
  }
  
  /**
   * 恢复到默认值
   * todo: [] merge模式，将用户输入数据与默认数据合并
   */
  @action resetFormData = (formData) => {
    // 如果没有传值进入则直接从定义数据中获取默认值
    if (!formData) {
      this.derivingDefaultData();
    } else {
      this.formData = cloneDeep(formData);
      this.localFormData = cloneDeep(formData);
    }
  }
  
  /**
   * 刷新目标field的数据源（DataMap）
   */
  @action reloadingDataMap = (field, ctx={}, callback) => {
    field = this.fields.find(x => x._id === field.fieldKey);
    
    if (!field) {return;}
    const { dataMap, _meta } = field;
    const { formData, outerCtx } = this;
    // 如果原始数据源中存在url，则请求
    if (dataMap.length > 0 && (typeof dataMap[0] == 'string')) {
      // 排除空值
      let tmp = Object.assign({}, formData, ctx), rctx={};
      Object.keys(tmp).forEach(key => {
        if (![undefined, ''].includes(tmp[key])) {
          rctx[key] = tmp[key];
        }
      })
      let rs = ctxReplace.getUrl({
        urlObj: dataMap[0],
        ctx: rctx,
        pctx: outerCtx
      });
      // TODO: 优化此开关结构
      if (_meta.dataMapUrlStrictMatch) {
        if (!rs.fillSuccess) {
          runInAction(() => {
            field.localDataMap = [];
            callback && callback([]);
          })
          return
        }
      }

      Ctx.silentRequest.get(rs.url).then(res => {
        // 如果字段中存在对数据源格式化的方法，则调用
        if (this.extentions.datasourceFormat[field.fieldKey]) {
          res = this.extentions.datasourceFormat[field.fieldKey](res);
        }
        
        // 扩展map逻辑
        if (field._meta.dataSourceMap) {
          const {key, value} = field._meta.dataSourceMap;
          res = res.map(x => {
            return {
              value: x[value],
              key: x[key]
            }
          })
        }
        
        runInAction(() => {
          field.localDataMap = res || [];
          callback && callback(res);
        })
      });
    } else {
      callback && callback(field.localDataMap||[]);
    }
  }

  transfer2Detail = () => {
    this.fields.forEach(x => {
      x.detail()
    })
  }

  transfer2AntiDetail = (status) => {
    this.fields.forEach(x => {
      x.antiDetail(status)
    })
  }
  
  @action setFieldValue = (fieldInfo, value, localValue) => {
    let fieldKey = fieldInfo.fieldKey;
    
    // antd清空时返回undefined, 后端空数据标记为''
    if (typeof value === 'undefined') {
      value = '';
    }

    // 如果需要设置的值和上一次的值一样，则什么都不做
    if (this.formData[fieldKey] == value) {
      return;
    }
    
    // console.log(`[fieldchange]==>${fieldInfo.fieldKey}: ${this.formData[fieldKey]}=>${value}`)
    
    this.formData[fieldKey] = value;
    this.localFormData[fieldKey] = localValue;


    if (this._meta.immediatlyValidate) {
      // 实时验证
      validating({[fieldKey]: value}, {[fieldKey]: this.validationRules[fieldKey]})
      .then(res => {
        runInAction(() => {
          this.validationResults[fieldKey] = null;
          // TODO: 性能问题
          this.validationResults = cloneDeep(this.validationResults);
        });
      })
      .catch(err => {
        runInAction(() => {
          this.validationResults = Object.assign({}, this.validationResults, err);
        });
      });
    }
    
    // x-actions 处理联动逻辑
    if (fieldInfo.xactions) {
      let matchedAction = fieldInfo.xactions.filter(x => x.source.action === 'valueChange');
      if (matchedAction && matchedAction.length > 0) {
        fieldsXActionHandler(this.fields, {
          fieldInfo,
          action: matchedAction,
          eventName: 'valueChange',
          value
        }, this);
      }
    }
  }
}


export {
  FormModel
};