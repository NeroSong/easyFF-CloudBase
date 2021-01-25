<template>
  <div class="home">
    <el-container>
      <el-aside width="180px">
        <div style="margin-top:20px;">
          <img
            height="36px"
            style="vertical-align:middle;"
            src="@/assets/logo.png"
          />
        </div>
        <div id="toptitle">
          easyFF
        </div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical"
          background-color="#1F293D"
          text-color="#ffffff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :router="true"
        >
          <el-menu-item index="/rules">
            <i class="el-icon-menu"></i>
            <span slot="title">规则配置</span>
          </el-menu-item>
          <el-menu-item index="/records">
            <i class="el-icon-s-order"></i>
            <span slot="title">调用记录</span>
          </el-menu-item>
          <!-- <el-menu-item index="/monitor">
            <i class="el-icon-message-solid"></i>
            <span slot="title">监控提醒</span>
          </el-menu-item> -->
          <el-menu-item index="/about">
            <i class="el-icon-info"></i>
            <span slot="title">使用说明</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  created() {
    this.annoyLogin()
  },
  data() {
    return {}
  },
  methods: {
    async annoyLogin() {
      const auth = this.$cloudbase.auth({ persistence: "local" })
      const lgState = await auth.getLoginState()
      if (lgState) {
        console.log("has been Login")
      } else {
        console.log("Not Login, now go to login")
        try {
          await auth.anonymousAuthProvider().signIn()
        } catch (error) {
          this.$notify.error({
            title: "错误",
            message: "匿名登录失败，" + error,
          })
        }
      }
    },
  },
}
</script>

<style type="css">
html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}

html {
  font-size: 14px;
}
</style>

<style lang="less" scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #1f293d;
  color: #333;
  text-align: center;
  // line-height: 200px;
}

.el-menu-vertical {
  text-align: left;
  border: 1px solid #1f293d;
  margin-left: 10px;
  // background-color: #1f293d;
}

.el-main {
  padding: 16px;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

#toptitle {
  color: white;
  font-size: 1.5rem;
  margin: 10px 0;
  font-weight: bolder;
}
</style>
