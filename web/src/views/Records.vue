<template>
  <div class="records">
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="3"
        ><div class="title-area">
          <a>调用记录</a>
        </div></el-col
      >
    </el-row>
    <el-row
      style="background-color:white; padding:10px; font-size: 10pt;"
      type="flex"
      align="middle"
      class="row-bg"
    >
      <span>
        云函数调用总次数：
      </span>
      <el-tag type="success">
        <b> {{ allCount }}</b>
      </el-tag>
      <span style="width: 20px;"></span>
      <span>
        今日调用次数：
      </span>
      <el-tag type="success">
        <b> {{ todayCount }}</b>
      </el-tag>
      <span style="width: 20px;"></span>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-table
        :data="tableData"
        border
        stripe
        tooltip-effect="dark"
        row-style="height:0;"
        cell-style="padding: 6px 0;"
        highlight-current-row
        :default-sort="{ prop: 'createdDate', order: 'descending' }"
        style="width: 100%; margin: 0 0 10px 0;"
        v-loading="tableLoading"
      >
        <el-table-column prop="date" label="调用日期" width="160">
        </el-table-column>
        <el-table-column prop="type" label="运行结果" width="100">
        </el-table-column>
        <el-table-column prop="date" label="规则pid" width="80">
        </el-table-column>
        <el-table-column prop="date" label="规则类型" width="300">
        </el-table-column>
        <el-table-column prop="para" label="运行时长" width="100">
        </el-table-column>
        <el-table-column prop="file" label="生成文件"> </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col style="text-align: right;">
        <el-pagination
          background
          @size-change="getCallbacks"
          @current-change="getCallbacks"
          :current-page.sync="callbackCurrentPage"
          :total="callbackPieces"
          :page-size="callbackPageSize"
          layout="total, sizes, prev, pager, next"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Records",
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
</style>
