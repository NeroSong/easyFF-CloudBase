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
              此处建立的规则，通过云函数对相应pid的调用即可实现音视频处理。
            </div>
            <el-row type="flex">
              <el-col>
                <el-button
                  style="margin: 0 10px 0 0;"
                  icon="el-icon-plus"
                  type="primary"
                  size="mini"
                  plain
                  round
                  @click="newRule"
                  >新增</el-button
                >
              </el-col>
            </el-row>
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
              <el-table-column prop="type" label="类型" width="300">
              </el-table-column>
              <el-table-column prop="para" label="参数" width="100">
              </el-table-column>
              <el-table-column prop="file" label="所需文件" width="100">
              </el-table-column>
              <el-table-column prop="note" label="说明"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="editRow(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                  <el-button
                    @click="checkRow(scope.row)"
                    type="text"
                    size="small"
                    >调用</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Rules",
  components: {},
  created() {},
  data() {
    return {
      tab: "info",
      envID: "test-id-666688880000",
      //   tableData:[],
      tableData: [
        {
          pid: 1001,
          type: 1,
          para: 1,
          file: 2,
          note: "about",
        },
      ],
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

.text-main-pre {
  color: grey;
}
</style>
