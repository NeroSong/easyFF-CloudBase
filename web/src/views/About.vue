<template>
  <div class="about">
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="3"
        ><div class="title-area">
          <a>使用说明</a>
        </div></el-col
      >
    </el-row>
    <div class="row-main">
      <p style="font-size:1.1rem;">
        <span> <strong>easyFF</strong> </span>
        是基于 FFmpeg 的简单短视频处理服务 + 后台管理 工具。
      </p>
      <p>
        成功部署后，应能在「规则配置」页面的基本信息中，看到当前环境ID和云函数名称。
      </p>
      <p>
        <span class="bgt">使用流程：</span>
      </p>
      <p style="margin-left:20px;">
        1. 部署成功后，在规则右端的操作栏中点击测试 <br />
        2. 上传原始文件（测试可用test目录下的文件） <br />
        3. 云函数处理完成后返回生成文件，点击下载查看 <br />
        4. 如无问题则说明成功，可按照相关参数在各个客户端SDK调用 <br />
      </p>
      <!-- <p>
        <span class="bgt">企业微信提醒：</span>
      </p>
      <p style="margin-left:20px;">
        需绑定 WebHook 地址，成功后会收到一条提醒。 <br />
        后续当调用发生异常，处理失败时会自动发送通知。
      </p> -->
      <p>
        easyFF 目前还在较为初级的预览版，欢迎访问我们的
        <a href="https://github.com/NeroSong/easyFF-CloudBase" target="_blank">
          GitHub仓库</a
        >，期待您的建议和反馈 :)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {},
  created() {},
  data() {
    return {}
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

.bgt {
  background-color: #e0ffff;
  font-weight: bold;
}
</style>
