<template>
  <div class="app-container">
    <el-row>
      <!-- 左侧分类导航 start -->
      <el-col :span="3">
        <h5 class="left-title">流程类别</h5>
        <el-tabs @tab-click="changeType" tab-position="left" style="height: 200px;">
          <el-tab-pane
            v-for="item in processType.list"
            :key="item.dictLabel"
            :label="item.dictLabel"
          ></el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 左侧分类导航 end -->
      <el-col :span="21">
        <div class="right-content">
          <!-- 顶部按钮区域 star -->
          <div class="btn-bar">
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-plus" size="mini">新增模版</el-button>
              </el-col>
            </el-row>
            <div class="status-btn">
              <el-radio-group size="mini" @change="changeStatus" v-model="linkStatus">
                <el-radio-button label="1">开启</el-radio-button>
                <el-radio-button label="0">未开启</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <!-- 顶部按钮区域 end -->
          <!-- <el-tabs v-model="activeTab" type="card" @tab-click="tabChangeHandle">
            <el-tab-pane label="使用中的" :name="0"></el-tab-pane>
            <el-tab-pane label="未使用的" :name="1"></el-tab-pane>
          </el-tabs>-->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="创建日期" width="180"></el-table-column>
            <el-table-column prop="name" label="模版名称" width="260"></el-table-column>
            <el-table-column label="模版状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDeleted"
                  :active-value="1"
                  :inactive-value="0"
                  :active-text="scope.row.isDeleted?'开启':'未开启'"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="mini" icon="el-icon-edit">修改</el-button>
                <el-button type="text" size="mini" icon="el-icon-search">详情</el-button>
                <el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getType } from "@/api/process/link";
export default {
  data() {
    return {
      linkStatus:"1",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          isDeleted: 0
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          isDeleted: 0
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          isDeleted: 0
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          isDeleted: 0
        }
      ],
      activeTab: 0,
      processType: {
        //流程分类列表
        list: [],
        now: {}
      }
    };
  },
  created() {
    this.getWorkFollowType();
  },
  methods: {
    //切换模版状态
    changeStatus() {
      
    },
    //切换分类
    changeType(tab) {
      let thisIndex = tab.index;
      this.processType.now = this.processType.list[thisIndex];
    },
    //获取流程分类
    getWorkFollowType() {
      let querySting = {
        pageNum: 1,
        pageSize: 10,
        dictType: "flow_type"
      };
      getType(querySting).then(res => {
        this.processType.list = res.rows;
        this.changeType({ index: 0 });
      });
    },
    //重置查询
    resetSearch() {},
    //删除环节
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该环节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("删除");
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.left-title {
  margin: 10px 25px;
}
.btn-bar {
  position: relative;
}
.status-btn {
  position: absolute;
  right: 0;
  top: 0;
}
</style>