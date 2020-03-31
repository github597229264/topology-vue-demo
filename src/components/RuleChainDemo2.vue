<template>
  <el-container>
    <el-aside width="200px">
      <el-collapse v-modal="activeNames">
        <el-collapse-item v-for="(t,index) in tools" :name="index+1" :key="'item'+`${index}`">
          <template slot="title">
            <i class="header-icon el-icon-info"></i>
            {{ t.group }}
          </template>
          <div class="widget" v-for="(tc,index) in t.children" :key="'widget'+index" :draggable="tc.data"  @dragstart="onDrag($event, tc)">
            <div class="leftRectangle" v-show="tc.type == 0 || tc.type == 2"></div>
            <div class="mainText">
              <i class="header-icon el-icon-plus"></i>
              {{ tc.name }}
            </div>
            <div class="rightRectangle" v-show="tc.type == 1 || tc.type == 2"></div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main>
      <div class="canvas" id="topo-canvas"></div>
    </el-main>
  </el-container>


</template>

<script>
  // 1. 导入绘画引擎
  import {Topology} from 'topology-core';
  import {Node} from 'topology-core/models/node';
  import {Line} from 'topology-core/models/line';
  import {Tools, canvasRegister} from '../../services/canvas.js';

  export default {
    name: "RuleChainDemo",
    data() {
      return {
        tools: Tools,
        activeNames: ['0'],
        canvas: {},
        canvasOptions: {
          rotateCursor: '/img/rotate.cur'
        },
        props: {
          node: null,
          line: null,
          nodes: null,
          multi: false,
          locked: false
        },
        contextmenu: {
          left: null,
          top: null,
          bottom: null
        }
      }
    },
    computed: {
      event() {
        return this.$store.state.event.event
      }
    },
    watch: {
      event(curVal) {
        if (this['handle_' + curVal.name]) {
          this['handle_' + curVal.name](curVal.data)
        }
      },
      $route(val) {
        this.open()
      }
    },
    created() {
      canvasRegister()
      if (process.client) {
        document.onclick = event => {
          this.contextmenu = {
            left: null,
            top: null,
            bottom: null
          }
        }
      }
    },
    mounted() {
      // 2. 创建画布
      // 其中，第一个参数'topo-canvas'表示canvas所在的父dom元素id，通常为<div class="canvas" id="topo-canvas"></div>；
      // 第二个参数{}表示画布选项，这里表示全部使用默认值。具体选项请参考后面的api文档。
      var canvas = new Topology('topo-canvas', {});
      // 3. 渲染图形
      // 空白数据图形数据，可以来自于官网下载的json
      //const json = {nodes:[], lines:[]};
      const json = {
        "nodes": [
          {
          "id": "dbbcd550",
          "name": "rectangle",
          "tags": [],
          "rect": {
            "x": 20,
            "y": 171,
            "width": 200,
            "height": 50,
            "center": {
              "x": 678,
              "y": 196
            },
            "ex": 778,
            "ey": 221
          },
          "lineWidth": 1,
          "rotate": 0,
          "offsetRotate": 0,
          "globalAlpha": 1,
          "dash": 0,
          "strokeStyle": "",
          "fillStyle": "",
          "font": {
            "color": "",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 12,
            "lineHeight": 1.5,
            "fontStyle": "normal",
            "fontWeight": "normal",
            "textAlign": "center",
            "textBaseline": "middle",
            "background": ""
          },
          "animateStart": 0,
          "animateCycleIndex": 0,
          "lineDashOffset": 0,
          "text": "产品管理系统",
          "textOffsetX": 0,
          "textOffsetY": 0,
          "animateType": "",
          "data": "",
          "zRotate": 0,
          "anchors": [
            {
            "x": 578,
            "y": 196,
            "direction": 4
          }, {
            "x": 678,
            "y": 171,
            "direction": 1
          }, {
            "x": 778,
            "y": 196,
            "direction": 2
          }, {
            "x": 678,
            "y": 221,
            "direction": 3
          }
          ],
          "rotatedAnchors": [
            {
            "x": 578,
            "y": 196,
            "direction": 4
          }, {
            "x": 678,
            "y": 171,
            "direction": 1
          }, {
            "x": 778,
            "y": 196,
            "direction": 2
          }, {
            "x": 678,
            "y": 221,
            "direction": 3
          }],
          "animateDuration": 0,
          "animateFrames": [],
          "borderRadius": 0.1,
          "icon": "",
          "iconFamily": "topology",
          "iconSize": 0,
          "iconColor": "#2f54eb",
          "imageAlign": "left",
          "bkType": 0,
          "gradientAngle": 0,
          "gradientRadius": 0.01,
          "paddingTop": 10,
          "paddingBottom": 10,
          "paddingLeft": 10,
          "paddingRight": 10,
          "paddingLeftNum": 10,
          "paddingRightNum": 10,
          "paddingTopNum": 10,
          "paddingBottomNum": 10,
          "textRect": {
            "x": 588,
            "y": 203.5,
            "width": 180,
            "height": 7.5,
            "center": {
              "x": 678,
              "y": 207.25
            },
            "ex": 768,
            "ey": 211
          },
          "fullTextRect": {
            "x": 588,
            "y": 181,
            "width": 180,
            "height": 30,
            "center": {
              "x": 678,
              "y": 196
            },
            "ex": 768,
            "ey": 211
          },
          "iconRect": {
            "x": 588,
            "y": 181,
            "width": 180,
            "height": 17.5,
            "center": {
              "x": 678,
              "y": 189.75
            },
            "ex": 768,
            "ey": 198.5
          },
          "fullIconRect": {
            "x": 588,
            "y": 181,
            "width": 180,
            "height": 30,
            "center": {
              "x": 678,
              "y": 196
            },
            "ex": 768,
            "ey": 211
          }
        }
        ]
      };
      canvas.open(json);

      // 4. 如果json发送变化，重绘
      canvas.render();
      this.activeNames = ['0'];
    },
    methods:{
      async open() {
        if (!this.$route.query.id) {
          return
        }
        const data = await this.$axios.$get(
          '/api/topology/' + this.$route.query.id
        )
        if (data && data.id) {
          this.canvas.open(data.data)
        }
      },

      onDrag(event, node) {
        event.dataTransfer.setData('Text', JSON.stringify(node.data))
      },

      onMessage(event, data) {
        console.log('onMessage:', event, data)
        switch (event) {
          case 'node':
          case 'addNode':
            this.props = {
              node: data,
              line: null,
              multi: false,
              nodes: null,
              locked: data.locked
            }
            break
          case 'line':
          case 'addLine':
            this.props = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked
            }
            break
          case 'multi':
            this.props = {
              node: null,
              line: null,
              multi: true,
              nodes: data.nodes.length > 1 ? data.nodes : null,
              locked: this.getLocked(data)
            }
            break
          case 'space':
            this.props = {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: false
            }
            break
          case 'moveOut':
            break
          case 'moveNodes':
          case 'resizeNodes':
            if (data.length > 1) {
              this.props = {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: this.getLocked({ nodes: data })
              }
            } else {
              this.props = {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: false
              }
            }
            break
          case 'resize':
          case 'scale':
          case 'locked':
            if (this.canvas && this.canvas.data) {
              this.$store.commit('canvas/data', {
                scale: this.canvas.data.scale || 1,
                lineName: this.canvas.data.lineName,
                fromArrowType: this.canvas.data.fromArrowType,
                toArrowType: this.canvas.data.toArrowType,
                fromArrowlockedType: this.canvas.data.locked
              })
            }
            break
        }
      },

      getLocked(data) {
        let locked = true
        if (data.nodes && data.nodes.length) {
          for (const item of data.nodes) {
            if (!item.locked) {
              locked = false
              break
            }
          }
        }
        if (locked && data.lines) {
          for (const item of data.lines) {
            if (!item.locked) {
              locked = false
              break
            }
          }
        }

        return locked
      },

      onUpdateProps(node) {
        // 如果是node属性改变，需要传入node，重新计算node相关属性值
        // 如果是line属性改变，无需传参
        this.canvas.updateProps(node)
      },

      handle_new(data) {
        this.canvas.open({ nodes: [], lines: [] })
      },

      handle_open(data) {
        this.handle_replace(data)
      },

      handle_replace(data) {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = event => {
          const elem = event.srcElement || event.target
          if (elem.files && elem.files[0]) {
            const name = elem.files[0].name.replace('.json', '')
            const reader = new FileReader()
            reader.onload = e => {
              const text = e.target.result + ''
              try {
                const data = JSON.parse(text)
                if (
                  data &&
                  Array.isArray(data.nodes) &&
                  Array.isArray(data.lines)
                ) {
                  this.canvas.open(data)
                }
              } catch (e) {
                return false
              }
            }
            reader.readAsText(elem.files[0])
          }
        }
        input.click()
      },

      handle_save(data) {
        FileSaver.saveAs(
          new Blob([JSON.stringify(this.canvas.data)], {
            type: 'text/plain;charset=utf-8'
          }),
          `le5le.topology.json`
        )
      },

      handle_savePng(data) {
        this.canvas.saveAsImage('le5le.topology.png')
      },

      handle_saveSvg(data) {
        const ctx = new C2S(
          this.canvas.canvas.width + 200,
          this.canvas.canvas.height + 200
        )
        for (const item of this.canvas.data.nodes) {
          item.render(ctx)
        }

        for (const item of this.canvas.data.lines) {
          item.render(ctx)
        }

        let mySerializedSVG = ctx.getSerializedSvg()
        mySerializedSVG = mySerializedSVG.replace(
          '<defs/>',
          `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
        )

        mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x')

        const urlObject = window.URL || window
        const export_blob = new Blob([mySerializedSVG])
        const url = urlObject.createObjectURL(export_blob)

        const a = document.createElement('a')
        a.setAttribute('download', 'le5le.topology.svg')
        a.setAttribute('href', url)
        const evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, true)
        a.dispatchEvent(evt)
      },

      handle_undo(data) {
        this.canvas.undo()
      },

      handle_redo(data) {
        this.canvas.redo()
      },

      handle_copy(data) {
        this.canvas.copy()
      },

      handle_cut(data) {
        this.canvas.cut()
      },

      handle_parse(data) {
        this.canvas.parse()
      },

      handle_state(data) {
        this.canvas.data[data.key] = data.value
        this.$store.commit('canvas/data', {
          scale: this.canvas.data.scale || 1,
          lineName: this.canvas.data.lineName,
          fromArrowType: this.canvas.data.fromArrowType,
          toArrowType: this.canvas.data.toArrowType,
          fromArrowlockedType: this.canvas.data.locked
        })
      },

      onContextMenu(event) {
        event.preventDefault()
        event.stopPropagation()

        if (event.clientY + 360 < document.body.clientHeight) {
          this.contextmenu = {
            left: event.clientX + 'px',
            top: event.clientY + 'px'
          }
        } else {
          this.contextmenu = {
            left: event.clientX + 'px',
            bottom: document.body.clientHeight - event.clientY + 'px'
          }
        }
      }
    }
  }
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

      .el-collapse {
        .el-collapse-item {
          i{
            margin-left: 15px;
            margin-right: 10px;
          }
          .widget {
            margin: 6px auto 6px;
            position: relative;
            z-index: 1;
            border-radius: 8px;
            outline: none;
            width: 150px;

            .leftRectangle {
              position: absolute;
              top: 11px;
              left: -5px;
              z-index: 0;
              width: 10px;
              height: 10px;
              border: solid 1px #777;
              border-radius: 4px;
              background-color: #f8f8f8;
            }

            .rightRectangle {
              position: absolute;
              top: 11px;
              right: -5px;
              z-index: 0;
              width: 10px;
              height: 10px;
              border: solid 1px #777;
              border-radius: 4px;
              background-color: #f8f8f8;
            }

            .mainText {
              background-color: #f1e861;
              flex-direction: row;
              min-width: 150px;
              max-width: 150px;
              height: 32px;
              min-height: 32px;
              max-height: 32px;
              padding: 5px 10px;
              font-size: 12px;
              line-height: 16px;
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

      .canvas {
        flex: 1;
        width: initial;
        height: 100%;
        position: relative;
        overflow: auto;
        background: #fff;
      }
    }
  }
</style>
