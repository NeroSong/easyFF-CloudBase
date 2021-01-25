<template>
  <div class="rules">
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="3"
        ><div class="title-area">
          <a>规则配置</a>
        </div></el-col
      >
    </el-row>
    <el-row type="flex" class="row-main row-bg" justify="start">
      <el-col :span="24">
        <el-tabs v-model="tab">
          <el-tab-pane label="基本信息" name="info">
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <span class="text-main-pre">Env-ID：</span>
                <span>{{ envID }}</span>
                <el-button
                  plain
                  size="small"
                  style="margin-left:20px;"
                  type="success"
                  @click="copyEnv"
                  >复制</el-button
                >
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row type="flex" align="middle">
                <span class="text-main-pre">云函数名称：</span>
                <span>esayFF-ffmpeg</span>
                <el-button
                  plain
                  size="small"
                  style="margin-left:20px;"
                  type="success"
                  @click="copyFn"
                  >复制</el-button
                >
              </el-row>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-main row-bg" justify="start">
      <el-col :span="24">
        <el-tabs v-model="tab">
          <el-tab-pane label="转换规则" name="info">
            <div class="row-bg">
              通过其它 SDK
              调用云函数时，按下表确认可选参数，即可实现音视频处理。
              <p>
                必选参数：pid，指定处理规则；path，待处理音视频文件的云储存位置。
              </p>
            </div>
            <!-- <el-row type="flex">
              <el-col>
                <el-button
                  style="margin: 0 10px 0 0;"
                  icon="el-icon-plus"
                  type="primary"
                  size="mini"
                  plain
                  round
                  @click="dialogAdd = true"
                  >新增</el-button
                >
              </el-col>
            </el-row> -->
            <el-table
              :data="tableData"
              border
              stripe
              tooltip-effect="dark"
              row-style="height:0;"
              cell-style="padding: 6px 0;"
              highlight-current-row
              :default-sort="{ prop: 'createdDate', order: 'descending' }"
              style="width: 100%; margin: 10px 0;"
              v-loading="tableLoading"
            >
              <el-table-column prop="pid" label="pid" width="70">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="200">
              </el-table-column>
              <el-table-column prop="para" label="参数示例" width="100">
              </el-table-column>
              <el-table-column prop="note" label="说明"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="70">
                <template slot-scope="scope">
                  <el-button
                    @click="checkFF(scope.row.pid)"
                    type="text"
                    size="small"
                    >测试</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="row-bg">
              <p>
                调用成功后返回参数：ret和msg。ret为0，则msg为生成文件云端位置，否则msg为错误提示。
              </p>
              <p>后续会增加自定义 FFmpeg 命令功能。</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      title="测试转换规则"
      width="600px"
      :visible.sync="dialogCheck"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-row style="margin-bottom: 10px;" type="flex" justify="start">
        <el-col style="width:70px; margin-top: 5px;">类型：</el-col>
        <el-col style="width:80%;">
          <el-row type="flex" justify="start" style="margin-top: 5px;">
            {{ cuType }}
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col style="width:70px; margin-top: 5px;">说明：</el-col>
        <el-col style="width:80%;">
          <el-row
            type="flex"
            justify="start"
            style="margin-top: 5px; text-align: left;"
          >
            {{ cuAbout }}
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;" v-show="showParaAdd">
        <el-col style="width:70px; margin-top: 5px;">参数：</el-col>
        <el-col style="width:80%;">
          <el-input clearable size="small" v-model="paraAdd"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;" type="flex" justify="start">
        <el-col style="width:70px; margin-top: 5px;">path：</el-col>
        <el-col style="width:80%;">
          <el-input clearable size="small" v-model="path"></el-input>
        </el-col>
      </el-row>
      <el-row
        style="margin-bottom: 10px;"
        type="flex"
        v-show="showP2"
        justify="start"
      >
        <el-col style="width:70px; margin-top: 5px;">p2：</el-col>
        <el-col style="width:80%;">
          <el-input clearable size="small" v-model="p2"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        在当前环境的
        <a
          href="https://console.cloud.tencent.com/tcb/storage/index?envId=nero-lib-1gxdadxufcb31d0b&rid=4&tabId=file"
          target="_blank"
        >
          云储存控制台</a
        >
        中，上传原文件，粘贴 fileID 至 path 及 p2
      </el-row>
      <span slot="footer">
        <el-row type="flex" justify="end">
          <span>
            <el-button size="medium" @click="dialogCheck = false"
              >取 消</el-button
            >
            <el-button
              size="medium"
              :loading="btnLoading"
              type="primary"
              @click="gotoFF"
              >确 定</el-button
            >
          </span>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog
      title="转换结果"
      width="500px"
      :visible.sync="dialogAns"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-row style="margin-bottom: 10px;" type="flex" justify="start">
        转换完成，结果如下。
      </el-row>

      <el-row style="margin-bottom: 10px;" type="flex" justify="start">
        {{ ffAns }}
      </el-row>

      <el-row
        style="margin-bottom: 10px;"
        type="flex"
        v-if="showAnsDown"
        justify="start"
      >
        <el-button
          size="small"
          :loading="downLoading"
          @click="downFile"
          type="success"
          >下载文件</el-button
        >
      </el-row>

      <span slot="footer">
        <el-row type="flex" justify="end">
          <span>
            <el-button size="medium" type="primary" @click="dialogAns = false"
              >确 定</el-button
            >
          </span>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Rules",
  components: {},
  data() {
    return {
      tab: "info",
      envID: "test-id-666688880000",
      //   tableData:[],
      tableData: [
        {
          pid: 1001,
          type: "视频指定位置截图",
          para: "t: 5",
          paraAdd: "5",
          note: "参数为：需要截图的时间点t。以秒为单位，默认为第5秒截图",
        },
        {
          pid: 1002,
          type: "视频截取片段",
          para: "t: 0, len: 10",
          paraAdd: "0,10",
          note:
            "参数为：截取片段的开始时间t，持续时间len。默认为0秒开始，截取10秒",
        },
        {
          pid: 1003,
          type: "短视频转为Gif图",
          para: "无",
          paraAdd: "",
          note: "无需额外参数",
        },
        {
          pid: 1004,
          type: "视频添加文字水印",
          para: "s: '水印'",
          paraAdd: "水印",
          note: "参数为：水印字符串s。默认为“水印”二字",
        },
        {
          pid: 1005,
          type: "视频添加图片水印",
          para: "p2: 'aa.jpg'",
          paraAdd: "",
          note: "参数为：水印图片在云端的地址p2。在使用本规则时为必选参数。",
        },
        {
          pid: 1006,
          type: "视频消音",
          para: "无",
          paraAdd: "",
          note: "无需额外参数",
        },
        {
          pid: 1007,
          type: "视频添加Bgm",
          para: "p2: 'xx.mp3'",
          paraAdd: "",
          note: "参数为：背景音乐在云端的地址p2。在使用本规则时为必选参数。",
        },
        {
          pid: 1008,
          type: "获取视频Bgm",
          para: "无",
          paraAdd: "",
          note: "无需额外参数",
        },
        {
          pid: 1009,
          type: "音乐转为封面视频",
          para: "p2: 'yy.jpg'",
          paraAdd: "",
          note: "参数为作为视频的封面图片p2。在使用本规则时为必选参数。",
        },
      ],
      dialogCheck: false,
      dialogAns: false,
      currentPos: 1001,
      paraAdd: "",
      cuType: "",
      cuAbout: "",
      showParaAdd: true,
      showP2: false,
      ffAns: { ret: "0", msg: "aaa/bbb/ccc.mp4" },
      showAnsDown: true,
      tableLoading: false,
      btnLoading: false,
      downLoading: false,
      path: "",
      p2: "",
      fnName: "test",
    }
  },

  created() {},

  methods: {
    checkFF(p) {
      let id = this.tableData.findIndex((i) => i.pid == p)
      console.log(id)
      this.currentPos = p
      this.cuType = this.tableData[id].type
      this.cuAbout = this.tableData[id].note
      this.paraAdd = this.tableData[id].paraAdd
      if (this.tableData[id].para == "无") {
        this.showParaAdd = false
      } else {
        this.showParaAdd = true
      }
      if (this.tableData[id].para.substr(0, 2) == "p2") {
        this.showParaAdd = false
        this.showP2 = true
      } else {
        this.showP2 = false
      }

      this.dialogCheck = true
    },
    async gotoFF() {
      this.btnLoading = true

      switch (this.currentPos) {
        case 1001: {
          if (this.path.length < 1 || this.paraAdd.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1001, path: this.path, t: this.paraAdd }
            this.callFn(data)
          }
          break
        }

        case 1002: {
          if (this.path.length < 1 || this.paraAdd.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let tmp = this.paraAdd.trim()
            tmp = tmp.replace("，", ",")
            let t = tmp.split(",")[0].trim()
            let l = tmp.split(",")[1].trim()
            console.log(t, l)
            let data = { pid: 1002, path: this.path, t: t, len: l }
            this.callFn(data)
          }
          break
        }

        case 1003: {
          if (this.path.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1003, path: this.path }
            this.callFn(data)
          }
          break
        }

        case 1004: {
          if (this.path.length < 1 || this.paraAdd.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1004, path: this.path, s: this.paraAdd }
            this.callFn(data)
          }
          break
        }

        case 1005: {
          if (this.path.length < 1 || this.p2.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1005, path: this.path, p2: this.p2 }
            this.callFn(data)
          }
          break
        }

        case 1006: {
          if (this.path.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1006, path: this.path }
            this.callFn(data)
          }
          break
        }

        case 1007: {
          if (this.path.length < 1 || this.p2.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1007, path: this.path, p2: this.p2 }
            this.callFn(data)
          }
          break
        }

        case 1008: {
          if (this.path.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1008, path: this.path }
            this.callFn(data)
          }
          break
        }

        case 1009: {
          if (this.path.length < 1 || this.p2.length < 1) {
            this.$notify({
              title: "错误",
              message: "请填入正确的参数",
              type: "warning",
            })
          } else {
            let data = { pid: 1009, path: this.path, p2: this.p2 }
            this.callFn(data)
          }
          break
        }

        default:
          break
      }
    },

    callFn(d) {
      this.$cloudbase
        .callFunction({
          name: this.fnName,
          data: d,
        })
        .then((res) => {
          this.btnLoading = false
          this.ffAns = res.result
          if (res.result.ret == 0) {
            this.showAnsDown = true
          } else {
            this.showAnsDown = false
          }
          this.dialogAns = true
          this.dialogCheck = false
          console.log(res.result)
        })
        .catch((e) => {
          this.$notify.error({
            title: "错误",
            message: e,
          })
          this.btnLoading = false
          console.log(e)
        })
    },

    downFile() {
      this.downLoading = true
      this.$cloudbase
        .downloadFile({
          fileID: this.ffAns.msg,
        })
        .then(() => {
          this.downLoading = false
        })
        .catch((e) => {
          this.$notify.error({
            title: "错误",
            message: e,
          })
          this.downLoading = false
        })
    },
    copyEnv() {
      this.$copyText(this.envID).then(
        (e) => {
          this.$notify({
            title: "成功",
            message: "复制成功",
            type: "success",
          })
          console.log(e)
        },
        function(e) {
          this.$notify({
            title: "警告",
            message: "复制失败，请手动复制",
            type: "warning",
          })
          console.log(e)
        }
      )
    },
    copyFn() {
      this.$copyText("esayFF-ffmpeg").then(
        (e) => {
          this.$notify({
            title: "成功",
            message: "复制成功",
            type: "success",
          })
          console.log(e)
        },
        function(e) {
          this.$notify({
            title: "警告",
            message: "复制失败，请手动复制",
            type: "warning",
          })
          console.log(e)
        }
      )
    },
  },
}
</script>

<style lang="less" scoped>
.row-bg {
  margin-bottom: 16px;
}

.title-area {
  background-color: white;
  text-align: center;
  padding: 10px;
  font-size: 1.1rem;
  #a {
    font-weight: bolder;
  }
}

.row-main {
  background-color: white;
  padding: 10px;
  font-size: 1rem;
  text-align: left;
}

.text-main-pre {
  color: grey;
}
</style>
