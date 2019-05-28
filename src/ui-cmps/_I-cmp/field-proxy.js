/* 
 * @Author: magmaliang@gmail.com 
 * @Date: 2019-05-28 11:48:33 
 * @Last Modified by: magmaliang@gmail.com
 * @Last Modified time: 2019-05-28 12:28:39
 * @Desc:  HOC for Field
*/
import React, { Component } from 'react';

const FieldProxy = Field => {
  return class extends Component {
    render(){
      return <Field {...this.props} ></Field>
    }
  }
}

export default FieldProxy
