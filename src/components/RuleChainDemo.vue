<template>
  <el-container>
    <el-aside width="226px">
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(t,index) in tools" :name="index+1" :key="'item'+`${index}`">
          <template slot="title">
            <i class="header-icon leftIcon iconfont">{{t.icon}}</i>
            {{ t.group }}
          </template>
          <div class="widget" v-for="(tc,index) in t.children" :key="'widget'+index" :draggable="tc.data"
               @dragstart="onDrag($event, tc)">
            <div class="leftRectangle" v-show="tc.type == 0 || tc.type == 2"></div>
            <div class="mainText" :style="'background-color:'+tc.data.fillStyle+';'">
              <i class="header-icon iconfont">{{tc.data.icon}}</i>
              {{ tc.name}}
            </div>
            <div class="rightRectangle" v-show="tc.type == 1 || tc.type == 2"></div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-button @click="saveCanvas()">保存绘画</el-button>
    </el-aside>
    <el-main>
      <div class="canvas" id="topo-canvas"></div>
      <tab :data="nodeData" :tab="tab"></tab>
    </el-main>
  </el-container>
</template>

<script>
  // 1. 导入绘画引擎
  import {Topology} from "topology-core";
  import {Node} from "topology-core/models/node";
  import {Line} from "topology-core/models/line";
  // import curve from 'topology-core/middles/curve'
  import {Tools, canvasRegister} from "../../services/canvas.js";
  import tab from "./tab.vue";

  export default {
    name: "RuleChainDemo",
    components: {
      tab
    },
    data() {
      return {
        tools: Tools,
        activeNames: ["0"],
        ruleChainId: "061ef600-6831-11ea-a56e-fd5e0ea8fd27",//规则链id 上一界面传递的值
        noPassControl: ["inputControl", "ruleChainControl"],//筛选掉的控件集合
        canvas: {},
        canvasOptions: {
          rotateCursor: "/img/rotate.cur",
          activeColor: "red",//选中层颜色
          hoverColor: "green",//活动层颜色
          hideInput: true,//是否禁止双击节点文字，出现文字输入框
          hideRotateCP: true,//是否隐藏节点旋转控制点
          hideSizeCP: true,//是否隐藏节点大小控制点
          disableEmptyLine: true//是否禁止连线终点为空（未连接到节点）
        },
        nodeData: null,//双击后传递的节点的数据
        tab: false,//控制弹框出现  true弹框出现  false弹框隐藏
      };
    },
    created() {
      //2. 注册图形库
      canvasRegister();
    },
    mounted() {

      this.canvasOptions.on = this.onMessage;
      // 3. 创建画布
      // 其中，第一个参数'topo-canvas'表示canvas所在的父dom元素id，通常为<div class="canvas" id="topo-canvas"></div>；
      // 第二个参数{}表示画布选项，这里表示全部使用默认值。具体选项请参考后面的api文档。
      this.canvas = new Topology("topo-canvas", this.canvasOptions);
      // 4. 渲染图形
      let sourceData = {
        "firstNodeIndex": 0,
        "ruleChainId": {
          "entityType": "RULE_CHAIN",
          "id": "061ef600-6831-11ea-a56e-fd5e0ea8fd27"
        },
        "nodes": [
          {
            "id": {
              "entityType": "RULE_NODE",
              "id": "db594b9a"
            },
            "type": "checkExistenceFields",
            "name": "滤波器--左右锚点",
            "createdTime": 1585296835227,
            "debugMode": false,
            "additionalInfo": {
              "layoutX": 404,
              "layoutY": 223,
              "description": ""
            },
            "configuration": {}
          },
          {
            "id": {
              "entityType": "RULE_NODE",
              "id": "e59d3a8d"
            },
            "type": "customerAttributes",
            "name": "属性集-左右锚点",
            "createdTime": 1585296835227,
            "debugMode": false,
            "additionalInfo": {
              "layoutX": 731,
              "layoutY": 309,
              "description": ""
            },
            "configuration": {}
          },
          {
            "id": {
              "entityType": "RULE_NODE",
              "id": "2dc75a47"
            },
            "type": "customerAttributes",
            "name": "属性集-左右锚点",
            "createdTime": 1585296835227,
            "debugMode": false,
            "additionalInfo": {
              "layoutX": 754,
              "layoutY": 145,
              "description": ""
            },
            "configuration": {}
          }
        ],
        "connections": [
          {
            "fromIndex": 0,
            "toIndex": 1,
            "type": "连线22"
          },
          {
            "fromIndex": 0,
            "toIndex": 2,
            "type": "连线11"
          }
        ],
        "ruleChainConnections": [
          {
            "fromIndex": 1,
            "targetRuleChainId": {
              "entityType": "RULE_CHAIN",
              "id": "e09a68b6"
            },
            "additionalInfo": {
              "layoutX": 1083,
              "layoutY": 336,
              "ruleChainNodeId": "rule-chain-node-2"
            },
            "type": "结束连线2"
          },
          {
            "fromIndex": 1,
            "targetRuleChainId": {
              "entityType": "RULE_CHAIN",
              "id": "f96f9c99"
            },
            "additionalInfo": {
              "layoutX": 1083,
              "layoutY": 193,
              "ruleChainNodeId": "rule-chain-node-1"
            },
            "type": "结束连线1"
          }
        ]
      };
      let oShowData = this.showCanvasByData(sourceData);
      console.log(oShowData);
      this.canvas.open(oShowData);
      // setTimeout(() => {
      //   this.canvas.data.lines.forEach((item, index) => {
      //     item.name = "curve";
      //     item.calcControlPoints();
      //   });
      //   console.log(this.canvas.data)
      //   this.canvas.updateProps();
      // }, 3000);

      //5. 如果json发送变化，重绘
      this.canvas.render();


    },
    methods: {
      /**
       * 监听控件拖动事件
       */
      onDrag(event, node) {
        event.dataTransfer.setData("Text", JSON.stringify(node.data));
      },
      /**
       *监听双击事件
       **/
      onMessage(event, data) {
        if (event == "dblclick") {
          console.log(data)
          this.tab = true;
          if (data.node) {
            this.nodeData = data.node;
          } else {
            this.nodeData = data.line;
            console.log(data.line);
          }
        } else {
          this.tab = false;
        }
      },
      aside1_hide() {
        this.$refs.aside1.style.left = "-200px";
        this.left_show = false;
      },
      /**
       * 保存canvas绘制的图形
       */
      saveCanvas() {
        console.log(this.canvas);
        let aNodes = this.canvas.data.nodes;
        let aLines = this.canvas.data.lines;
        let aNode = [];
        let aLeftAnchorNode = [];//仅有左锚点的控件
        let aRightAnchorNode = [];//仅有右锚点的控件
        let aLine = [];//连接集合
        let aRuleChainConnection = [];//规则链关系
        let iFirstNodeIndex = null;//与仅有右锚点起始控件相连的控件在aNode数组中的index
        aNodes.forEach((item, index) => {
          if (item.name == this.noPassControl[0]) {
            let oNode = {
              "id": {
                "entityType": "RULE_NODE",
                "id": item.id
              },
              "type": item.name,
              "name": item.text,
              "createdTime": new Date().getTime(),
              "debugMode": false,
              "additionalInfo": {
                "layoutX": item.rect.x,
                "layoutY": item.rect.y,
                "description": ""
              },
              "configuration": {}
            };
            aRightAnchorNode.push(oNode);
          } else if (item.name == this.noPassControl[1]) {
            let oNode = {
              "id": {
                "entityType": "RULE_NODE",
                "id": item.id
              },
              "type": item.name,
              "name": item.text,
              "createdTime": new Date().getTime(),
              "debugMode": false,
              "additionalInfo": {
                "layoutX": item.rect.x,
                "layoutY": item.rect.y,
                "description": ""
              },
              "configuration": {}
            };
            aLeftAnchorNode.push(oNode);
          } else {
            let oNode = {
              "id": {
                "entityType": "RULE_NODE",
                "id": item.id
              },
              "type": item.name,
              "name": item.text,
              "createdTime": new Date().getTime(),
              "debugMode": false,
              "additionalInfo": {
                "layoutX": item.rect.x,
                "layoutY": item.rect.y,
                "description": ""
              },
              "configuration": {}
            };
            aNode.push(oNode);
          }
        });
        aLines.forEach(function (item, index) {
          //查找到的结束空间下标
          let iEndNodeIndex = aLeftAnchorNode.findIndex(function (oItem) {
            if (oItem.id.id == item.to.id) {
              return oItem.id.id;
            }
          });
          //已右锚点为起点的连线
          if (item.from.id == aRightAnchorNode[0].id.id) {
            //获取第一个与起始控件相连的控件在nodes中的下标
            iFirstNodeIndex = aNode.findIndex(function (oItem) {
              if (oItem.id.id == item.to.id) {
                return oItem.id.id;
              }
            });
          } else if (iEndNodeIndex != -1) {//已左锚点为结束点的连线
            let iFromIndex = aNode.findIndex(function (oItem) {
              if (oItem.id.id == item.from.id) {
                return oItem.id.id;
              }
            });
            //规则链关系
            let oRuleChainConnection = {
              fromIndex: iFromIndex,
              targetRuleChainId: {
                entityType: "RULE_CHAIN",
                id: aLeftAnchorNode[iEndNodeIndex].id.id
              },
              additionalInfo: {
                layoutX: aLeftAnchorNode[iEndNodeIndex].additionalInfo.layoutX,
                layoutY: aLeftAnchorNode[iEndNodeIndex].additionalInfo.layoutY,
                ruleChainNodeId: "rule-chain-node-" + (iEndNodeIndex + 1)
              },
              type: item.text
            };
            aRuleChainConnection.push(oRuleChainConnection);
          } else {//已正常的左右都有锚点的控件作为起止点的连线
            let iFromIndex = aNode.findIndex(function (oItem) {
              if (oItem.id.id == item.from.id) {
                return oItem.id.id;
              }
            });
            let iToIndex = aNode.findIndex(function (oItem) {
              if (oItem.id.id == item.to.id) {
                return oItem.id.id;
              }
            });
            let oLine = {
              "fromIndex": iFromIndex,
              "toIndex": iToIndex,
              "type": item.text
            };
            aLine.push(oLine);//连接关系
          }
        });
        let oSaveCanvas = {
          firstNodeIndex: iFirstNodeIndex,//第一个与起始控件相连的控件在nodes中的下标
          ruleChainId: {
            "entityType": "RULE_CHAIN",
            "id": this.ruleChainId//规则链id
          },
          nodes: aNode, //所有控件集合
          connections: aLine,//控件连接关系
          ruleChainConnections: aRuleChainConnection//规则链连接关系
        };
        console.log(oSaveCanvas);
      },
      /**
       * 按照数据回显图形
       * @param data
       */
      showCanvasByData(data) {
        //input控件默认图标和背景色
        let oControl = {
          data: {
            fillStyle: "#A3EAA9",
            icon: "\ueedc"
          }
        };
        for (let aList = 0; aList < this.tools.length; aList++) {
          for (let t = 0; t < this.tools[aList].children.length; t++) {
            if (this.tools[aList].children[t].data.name == "inputControl") {
              oControl = this.tools[aList].children[t];
              break;
            }
          }
        }
        //默认添加开始控件
        let aNodes = [
          {
            "id": 202003241159,
            "name": "inputControl",
            "tags": [],
            "rect": {
              "x": 55,
              "y": 176,
              "width": 210,
              "height": 60,
            },
            "font": {
              "color": "black",
              "textAlign": "left",
            },
            "borderRadius": 0.25,
            "text": "inputControl",
            "textMaxLine": 1,//最多显示一行，超出省略
            "fillStyle": oControl.data.fillStyle,
            "icon": oControl.data.icon,
            "iconSize": 18,
            "iconColor": "#6A6A6A",
            "iconFamily": "iconfont",
            "imageWidth": 20,
            "imageHeight": 20,
            "imageAlign": "left",
            "rectInParent": {
              "x": 0,
              "y": 0,
              "width": 210,
              "height": 30,
              "rotate": 0
            }
          }];
        let aLines = [];
        let aRuleChain= [
          {
            "id": {"entityType": "RULE_CHAIN", "id": "f96f9c99"},
            "createdTime": 1584331354388,
            "additionalInfo": null,
            "tenantId": {"entityType": "ruleChainControl", "id": "f752bc20-673a-11ea-a56e-fd5e0ea8fd27"},
            "name": "Root Rule Chain",
            "firstRuleNodeId": {"entityType": "RULE_NODE", "id": "f75eca10-673a-11ea-a56e-fd5e0ea8fd27"},
            "root": true,
            "debugMode": false,
            "configuration": null
          },
          {
            "id": {"entityType": "RULE_CHAIN", "id": "e09a68b6"},
            "createdTime": 1584518144734,
            "additionalInfo": null,
            "tenantId": {"entityType": "ruleChainControl", "id": "f752bc20-673a-11ea-a56e-fd5e0ea8fd27"},
            "name": "test22",
            "firstRuleNodeId": {"entityType": "RULE_NODE", "id": "20733df0-68ee-11ea-a56e-fd5e0ea8fd27"},
            "root": false,
            "debugMode": false,
            "configuration": null
          }
        ];//规则链数据
        data.nodes.forEach((item, index) => {
          //默认控件图标和背景色
          let oControl = {
            data: {
              fillStyle: "#ccc",
              icon: "\ue608"
            }
          };
          for (let aList = 0; aList < this.tools.length; aList++) {
            for (let t = 0; t < this.tools[aList].children.length; t++) {
              if (this.tools[aList].children[t].data.name == item.type) {
                oControl = this.tools[aList].children[t];
                break;
              }
            }
          }
          let oNode = {
            "id": item.id.id,
            "name": item.type,
            "tags": [],
            "rect": {
              "x": item.additionalInfo.layoutX,
              "y": item.additionalInfo.layoutY,
              "width": 210,
              "height": 60,
            },
            "borderRadius": 0.25,
            "text": item.name,
            "textMaxLine": 1,//最多显示一行，超出省略
            "fillStyle": oControl.data.fillStyle,
            "icon": oControl.data.icon,
            "iconSize": 18,
            "iconColor": "#6A6A6A",
            "iconFamily": "iconfont",
            "imageWidth": 20,
            "imageHeight": 20,
            "imageAlign": "left",
            "paddingTop": 5,
            "paddingBottom": 10,
            "rectInParent": {
              "x": 0,
              "y": 0,
              "width": 210,
              "height": 30,
              "rotate": 0
            },
            "font": {
              "color": "black",
              "textAlign": "left"
            },
            "children": [
              {
                "text": item.type,
                "font": {
                  "textAlign": "left",
                },
                "textOffsetX": -40,
                "borderRadius": 0.25,
                "name": "ruleChainControl",
                "strokeStyle": "transparent",
                "rectInParent": {
                  "x": 40,
                  "y": 0,
                  "width": 100,
                  "height": 30,
                  "rotate": 0
                }
              }
            ]
          };
          aNodes.push(oNode);
        });
        data.connections.forEach(function (item, index) {
          let oLine = {
            "id": new Date().getTime(),
            "name": "curve",
            "controlPoints": [
              {
                "x": data.nodes[item.fromIndex].additionalInfo.layoutX + 240,
                "y": data.nodes[item.fromIndex].additionalInfo.layoutY + 30,
                "id": data.nodes[item.fromIndex].id.id,
                "anchorIndex": 1
              },
              {
                "x": data.nodes[item.toIndex].additionalInfo.layoutX-30,
                "y": data.nodes[item.toIndex].additionalInfo.layoutY + 30,
                "id": data.nodes[item.toIndex].id.id,
                "anchorIndex": 0
              }
            ],
            "from": {
              "x": data.nodes[item.fromIndex].additionalInfo.layoutX + 210,
              "y": data.nodes[item.fromIndex].additionalInfo.layoutY + 30,
              "id": data.nodes[item.fromIndex].id.id,
              "anchorIndex": 1,
            },
            "to": {
              "x": data.nodes[item.toIndex].additionalInfo.layoutX,
              "y": data.nodes[item.toIndex].additionalInfo.layoutY + 30,
              "id": data.nodes[item.toIndex].id.id,
              "anchorIndex": 0,
            },
            "fromArrow": "",
            "text": item.type,
            "toArrow": "triangleSolid" //三角箭头
          };
          aLines.push(oLine);
        });
        aRuleChain.forEach((item, index) => {
          //规则链控件默认图标和背景色
          let oControl = {
            data: {
              fillStyle: "#D6C4F1",
              icon: "\ue62a"
            }
          };
          for (let aList = 0; aList < this.tools.length; aList++) {
            for (let t = 0; t < this.tools[aList].children.length; t++) {
              if (this.tools[aList].children[t].data.name == item.type) {
                oControl = this.tools[aList].children[t];
                break;
              }
            }
          }
          let oNode = {
            "id": item.id.id,
            "name": item.tenantId.entityType,
            "fillStyle": "#D6C4F1",
            "tags": [],
            "rect": {
              "x": 0,
              "y": 0,
              "width": 210,
              "height": 60,
            },
            "borderRadius": 0.25,
            "text": item.name,
            "textMaxLine": 1,//最多显示一行，超出省略
            "fillStyle": oControl.data.fillStyle,
            "icon": oControl.data.icon,
            "iconSize": 18,
            "iconColor": "#6A6A6A",
            "iconFamily": "iconfont",
            "imageWidth": 20,
            "imageHeight": 20,
            "imageAlign": "left",
            "paddingTop": 5,
            "paddingBottom": 10,
            "rectInParent": {
              "x": 0,
              "y": 0,
              "width": 210,
              "height": 30,
              "rotate": 0
            },
            "font": {
              "color": "black",
              "textAlign": "left"
            },
            "children": [
              {
                "text": item.tenantId.entityType,
                "font": {
                  "textAlign": "left",
                },
                "textOffsetX": -40,
                "borderRadius": 0.25,
                "name": "ruleChainControl",
                "strokeStyle": "transparent",
                "rectInParent": {
                  "x": 40,
                  "y": 0,
                  "width": 100,
                  "height": 30,
                  "rotate": 0
                }
              }
            ]
          };
          aNodes.push(oNode);
        });
        data.ruleChainConnections.forEach(function (item, index) {
          let iIndex = aNodes.findIndex(function (item2, index2) {
            if (item.targetRuleChainId.id == item2.id) {
              item2.rect.x = item.additionalInfo.layoutX;
              item2.rect.y = item.additionalInfo.layoutY;
              return item2.id;
            }
          });
          let oLine = {
            "id": item.additionalInfo.ruleChainNodeId,
            "name": "curve",
            "controlPoints": [
              {
              "x": data.nodes[item.fromIndex].additionalInfo.layoutX + 240,
              "y": data.nodes[item.fromIndex].additionalInfo.layoutY + 30,
              "id": data.nodes[item.fromIndex].id.id,
              "anchorIndex": 1
              },
              {
                "x": aNodes[iIndex].rect.x - 40,
                "y": aNodes[iIndex].rect.y + 30,
                "id": aNodes[iIndex].id,
                "anchorIndex": 0
              }
            ],
            "from": {
              "x": data.nodes[item.fromIndex].additionalInfo.layoutX + 210,
              "y": data.nodes[item.fromIndex].additionalInfo.layoutY + 30,
              "id": data.nodes[item.fromIndex].id.id,
              "anchorIndex": 1
            },
            "to": {
              "x": aNodes[iIndex].rect.x,
              "y": aNodes[iIndex].rect.y + 30,
              "id": aNodes[iIndex].id,
              "anchorIndex": 0
            },
            "fromArrow": "",
            "text": item.type,
            "toArrow": "triangleSolid" //三角箭头
          };
          // this.canvas.updateProps()

          aLines.push(oLine);
        });
        //添加开始控件和第一个控件的连接线
        aLines.push({
          "id": new Date().getTime(),
          "name": "curve",
          "controlPoints": [
            {
              "x": aNodes[0].rect.x + 240,
              "y": aNodes[0].rect.y + 30,
              "id": aNodes[0].id,
              "anchorIndex": 0
            },
            {
              "x": aNodes[data.firstNodeIndex + 1].rect.x-30,
              "y": aNodes[data.firstNodeIndex + 1].rect.y + 30,
              "id": aNodes[data.firstNodeIndex + 1].id,
              "anchorIndex": 0
            }
          ],
          "from": {
            "x": aNodes[0].rect.x + 210,
            "y": aNodes[0].rect.y + 30,
            "id": aNodes[0].id,
            "anchorIndex": 0
          },
          "to": {
            "x": aNodes[data.firstNodeIndex + 1].rect.x,
            "y": aNodes[data.firstNodeIndex + 1].rect.y + 30,
            "id": aNodes[data.firstNodeIndex + 1].id,
            "anchorIndex": 0
          },
          "fromArrow": "",
          "text": "",
          "toArrow": "triangleSolid" //三角箭头
        });
        let oShowData = {
          "nodes": aNodes,
          "lines": aLines,
          // "lineName": "curve",
          "fromArrowType": "",
          "toArrowType": "triangleSolid",
          "scaleState": 1,
          "locked": 0
        };
        return oShowData;
      },

    }
  };
</script>

<style lang="scss" scoped>
  .el-container {
    width: 100%;
    height: 100vh;

    .el-aside {
      height: 100%;
      background-color: #f8f8f8;
      border-right: 1px solid #d9d9d9;
      overflow-y: auto;

      .el-button {
        margin-top: 30px;
      }

      .el-collapse {
        .el-collapse-item {
          .leftIcon {
            margin-left: 15px;
            margin-right: 10px;
          }

          .widget {
            margin: 6px auto 6px;
            position: relative;
            z-index: 1;
            border-radius: 8px;
            outline: none;
            width: 180px;

            .leftRectangle {
              position: absolute;
              top: 16px;
              left: -6px;
              z-index: 0;
              width: 12px;
              height: 12px;
              border: solid 1px #777;
              border-radius: 4px;
              background-color: #f8f8f8;
            }

            .rightRectangle {
              position: absolute;
              top: 16px;
              right: -6px;
              z-index: 0;
              width: 12px;
              height: 12px;
              border: solid 1px #777;
              border-radius: 4px;
              background-color: #f8f8f8;
            }

            .mainText {
              text-align: left;

              flex-direction: row;
              min-width: 180px;
              max-width: 180px;
              height: 44px;
              min-height: 44px;
              max-height: 44px;
              font-size: 12px;
              line-height: 41px;
              padding-left: 12px;
              padding-right: 12px;
              color: #333;
              pointer-events: none;
              border: solid 1px #777;
              border-radius: 5px;
            }
          }
        }
      }

    }

    .el-main {
      height: 100%;
      padding: 0;

      .canvas {
        flex: 1;
        width: initial;
        height: 100%;
        position: relative;
        overflow: auto;
        background-size: 25px 25px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, .1) 1px, transparent 1px);
        background-color: transparent;
      }
    }
  }
</style>
