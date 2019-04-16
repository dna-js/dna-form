/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-12-14 14:29:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 17:20:40
 * @Desc: eslint规则，因为babel-loader生成的代码, 部分不符合eslint的规范，所以关闭了一部分
 */

module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
	},
	 "globals": {
    "$": true,
    "process": true,
    "dirname": true,
  },
	"parser": "babel-eslint",
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
			"legacyDecorators": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"no-console": "off",
		"no-multi-spaces": "error",
		"no-unused-vars": "off", // react中不适用
		"no-constant-condition": "off",
		"no-fallthrough": "off",
		// "keyword-spacing": ["error", { "before": true} ], // 不生效，先注释
		// "indent": [
		// 	"error",
		// 	2
		// ],
		"linebreak-style": [
			"error",
			"unix"
		],
		// "quotes": [
		// 	"error",
		// 	"single"
		// ],
		"semi": [0],
		"no-unexpected-multiline": 0,
		"no-class-assign": 0,
	}
};