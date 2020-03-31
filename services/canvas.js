import { registerNode } from 'topology-core/middles';

import {
  inputControl,//形状
  inputControlAnchors,//锚点
  inputControlIconRect,//图片
  inputControlTextRect,//文字

  ruleChainControl,//形状
  ruleChainControlAnchors,//锚点
  ruleChainControlIconRect,//图片
  ruleChainControlTextRect,//文字

  checkExistenceFields,//形状
  checkExistenceFieldsAnchors,//锚点
  checkExistenceFieldsIconRect,//图片
  checkExistenceFieldsTextRect,//文字

  customerAttributes,//形状
  customerAttributesAnchors,//锚点
  customerAttributesIconRect,//图片
  customerAttributesTextRect,//文字
} from '../lib';//自定义图形库

export function canvasRegister() {
  //rule-chain
  registerNode(
    'checkExistenceFields',
    checkExistenceFields,
    checkExistenceFieldsAnchors,
    checkExistenceFieldsIconRect,
    checkExistenceFieldsTextRect
  )
  registerNode(
    'ruleChainControl',
    ruleChainControl,
    ruleChainControlAnchors,
    ruleChainControlIconRect,
    ruleChainControlTextRect
  )
  registerNode(
    'inputControl',
    inputControl,
    inputControlAnchors,
    inputControlIconRect,
    inputControlTextRect
  )
  registerNode(
    'customerAttributes',
    customerAttributes,
    customerAttributesAnchors,
    customerAttributesIconRect,
    customerAttributesTextRect
  )
}

export const Tools = [
  {
    group: '开始控件',
    icon: '\ueedc',
    children: [
      {
        name: 'input',
        type:1,//控件连接点 0：仅有左侧连接点；1：仅有右侧连接点；2两侧都有连接点
        icon: '\ueedc',
        strokeStyle : '#777777',
        data: {
          text: 'input',
          textMaxLine:1,//最多显示一行，超出省略
          fillStyle:"#A3EAA9",
          rect: {
            width: 210,
            height: 60
          },
          font:{
            color:"black",
            textAlign:"left",
          },
          icon: '\ueedc',
          iconSize:18,
          iconColor: '#6A6A6A',
          iconFamily: "iconfont",
          imageWidth:20,
          imageHeight:20,
          imageAlign:'left',
          borderRadius: 0.25,
          name: 'inputControl',

          rectInParent: {
            x: 0,
            y: 0,
            width: 210,
            height: 30,
            rotate: 0
          }
        }
      }
    ]
  },
  {
    group: '滤波器',
    icon: '\ue60b',
    children: [
      {
        name: 'check existence fields',
        type:2,//控件连接点 0：仅有左侧连接点；1：仅有右侧连接点；2两侧都有连接点
        data: {
          text: '滤波器--左右锚点',
          textMaxLine:1,//最多显示一行，超出省略
          fillStyle:'#F1E861',
          rect: {
            width: 210,
            height: 60
          },
          icon:'\ue60b',
          iconSize:18,
          iconColor: '#6A6A6A',
          iconFamily: "iconfont",
          imageWidth:20,
          imageHeight:20,
          imageAlign:'left',
          borderRadius: 0.25,
          name: 'checkExistenceFields',
          paddingTop: 5,
          paddingBottom: 10,
          rectInParent: {
            x: 0,
            y: 0,
            width: 210,
            height: 30,
            rotate: 0
          },
          font:{
            color:"black",
            textAlign:"left"
          },
          children: [
            {
              text: 'check existence fields',
              textMaxLine:1,//最多显示一行，超出省略
              font:{
                textAlign:"left",
              },
              paddingLeft: 0,
              textOffsetX: -40,
              borderRadius: 0.25,
              name: 'checkExistenceFields',
              strokeStyle: 'transparent',
              rectInParent: {
                x: 40,
                y: 0,
                width: 170,
                height: 30,
                rotate: 0
              }
            }
          ]
        }
      }
    ]
  },
  {
    group: '属性集',
    icon: '\ue638',
    children: [
      {
        name: 'customer Attributes',
        type:2,//控件连接点 0：仅有左侧连接点；1：仅有右侧连接点；2两侧都有连接点
        data: {
          text: '属性集-左右锚点',
          textMaxLine:1,//最多显示一行，超出省略
          fillStyle:"#CDF14E",
          rect: {
            width: 210,
            height: 60
          },
          icon: '\ue638',
          iconSize:18,
          iconColor: '#6A6A6A',
          iconFamily: "iconfont",
          imageWidth:20,
          imageHeight:20,
          imageAlign:'left',
          borderRadius: 0.25,
          name: 'customerAttributes',
          paddingTop: 5,
          paddingBottom: 10,
          rectInParent: {
            x: 0,
            y: 0,
            width: 210,
            height: 30,
            rotate: 0
          },
          font:{
            color:"black",
            textAlign:"left"
          },
          children: [
            {
              text: 'customerAttributes',
              font:{
                textAlign:"left",
              },
              textOffsetX: -40,
              borderRadius: 0.25,
              name: 'checkExistenceFields',
              strokeStyle: 'transparent',
              rectInParent: {
                x: 40,
                y: 0,
                width: 100,
                height: 30,
                rotate: 0
              }
            }
          ]
        }
      }
    ]
  },
  {
    group: '规则链',
    icon: '\ue62a',
    children: [
      {
        name: 'rule chain',//控件区显示名称
        type:0,//控件连接点 0：仅有左侧连接点；1：仅有右侧连接点；2两侧都有连接点
        data: {
          text: '属性集-左右锚点',//画布上控件右下半部分，显示控件别名
          textMaxLine:1,//最多显示一行，超出省略
          fillStyle:'#D6C4F1',
          rect: {
            width: 210,
            height: 60
          },
          icon: '\ue62a',
          iconSize:18,
          iconColor: '#6A6A6A',
          iconFamily: "iconfont",
          imageWidth:20,
          imageHeight:20,
          imageAlign:'left',
          borderRadius: 0.25,
          name: 'ruleChainControl',//指向自定义控件名称
          paddingTop: 5,
          paddingBottom: 10,
          rectInParent: {
            x: 0,
            y: 0,
            width: 210,
            height: 30,
            rotate: 0
          },
          font:{
            color:"black",
            textAlign:"left"
          },
          children: [
            {
              text: 'rule chain',//画布上控件右上半部分，显示控件名称
              font:{
                textAlign:"left",
              },
              textOffsetX: -40,
              borderRadius: 0.25,
              name: 'ruleChainControl',//指向自定义控件名称
              strokeStyle: 'transparent',
              rectInParent: {
                x: 40,
                y: 0,
                width: 100,
                height: 30,
                rotate: 0
              }
            }
          ]
        }
      }
    ]
  }
]
