<template>
  <div class="monitor">
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="3"
        ><div class="title-area">
          <a>监控提醒</a>
        </div></el-col
      >
    </el-row>
    <el-row type="flex" class="row-main row-bg" justify="start">
      <el-col :span="24">
        <el-tabs v-model="tab">
          <el-tab-pane label="企业微信群机器人" name="info">
            <el-row class="row-bg">
              是否开启： <el-switch v-model="notifyQywx"> </el-switch>
            </el-row>
            <div class="row-bg">
              绑定地址成功后，如调用时生成失败会发送通知提醒。
            </div>
            <el-col :span="18">
              <el-row type="flex">
                <el-input size="medium" clear v-model="inputSearchCallback">
                  <template slot="prepend">WebHook地址：</template>
                </el-input>
                <span style="width: 10px;"></span>
                <el-button type="primary" size="medium"> 绑定</el-button>
              </el-row>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Monitor",
  components: {},
  created() {},
  data() {
    return {
      tab: "info",
      notifyQywx: true,
    }
  },
  methods: {},
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
</style>
