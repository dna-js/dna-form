import React, { Component } from "react";
import { render } from "react-dom";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import "antd/dist/antd.css";
import 'codemirror/lib/codemirror.css'

// 设置form内部的请求类
import request from './utils/request';
import { Ctx } from '@';
Ctx.setRequest(request);
Ctx.setSilentRequest(request);

import BasicForm from './basic-form';

class TabContainer extends Component {
  constructor(options){
    super(options);
    this.state = {
      activeKey: '1'
    }
  }

  onChange = (key)=>{
    this.setState({activeKey: key});
  }

  render(){
    return <Tabs
        hideAdd
        activeKey={this.state.activeKey}
        className="dna-tabs"
        onChange={this.onChange}
      >
        <TabPane tab='basic-form' key='1'><BasicForm></BasicForm> </TabPane>
      </Tabs>
  }
}

render(<div className="demo-container">
   <TabContainer/>
</div>, document.getElementById('app'))