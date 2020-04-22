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
                <el-button @click="addHandle" type="primary" icon="el-icon-plus" size="mini">新增模板</el-button>
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

          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="templateName" label="模板名称" width="150"></el-table-column>
            <el-table-column prop="describtion" label="模板描述" width="200"></el-table-column>
            <el-table-column label="模板状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-value="1"
                  inactive-value="0"
                  :active-text="scope.row.status=='1'?'开启':'未开启'"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="模板环节">
              <template slot-scope="scope">
                <el-button @click="setLinkHandle" v-if="!scope.row.flowNodes" type="text" size="mini" icon="el-icon-edit">环节设置</el-button>
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
    <!-- 添加模板弹框 -->
    <el-dialog title="添加模板" :visible.sync="addTempDoalog">
      <div class="add-form">
        <el-form ref="form" :model="addParams" label-width="80px">
          <el-form-item label="模板名称">
            <el-input placeholder="请输入模板名称" v-model="addParams.templateName"></el-input>
          </el-form-item>
          <el-form-item label="模板描述">
            <el-input placeholder="请输入模板描述" type="textarea" v-model="addParams.describtion"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTempDoalog = false">取 消</el-button>
        <el-button type="primary" @click="addTempHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 配置模板环节弹框 -->
    <link-dialog @checkList="getCheckLinks" :showDialog.sync="linkDialog" :dataType="processType.now.dictValue" />
  </div>
</template>

<script>
import linkDialog from "./components/linkDialog.vue";
import { getType } from "@/api/process/link";
import { addTemp,getTemp } from "@/api/process/temp";
export default {
  data() {
    return {
      linkStatus: "1",
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
      queryParams:{
        //查询模板参数
        templateName:"",
        flowType:"",
        status:"1"
      },
      addParams: {
        //添加模板参数
        templateName: "",
        describtion: "",
        flowNodes: [],
        flowType: "",
        status: "1"
      },
      addTempDoalog: false, //是否显示添加模板弹框
      linkDialog: false, //是否显示配置模板环节弹框
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
  components: {
    linkDialog
  },
  watch: {
    "processType.now": function(val) {
      this.addParams.flowType = val.dictValue;
      this.queryParams.flowType = val.dictValue;
    }
  },
  methods: {

    //设置环节按钮
    setLinkHandle(){
      this.linkDialog = true;
    },
    //获取选中环节列表
    getCheckLinks(arr){
      console.log(arr);
    },
    //添加模板按钮
    addHandle() {
      this.addTempDoalog = true;
    },
    //添加模板事件
    addTempHandle() {
      let thisParms = this.addParams;
      addTemp(thisParms).then((res)=>{
        console.log(res);
        this.addTempDoalog = false
      })
    },

    //切换模板状态
    changeStatus() {},
    //切换分类
    changeType(tab) {
      let thisIndex = tab.index;
      this.processType.now = this.processType.list[thisIndex];
      this.queryTempHandle();
    },
    
    //获取模板列表
    queryTempHandle(){
      let thisParms = this.queryParams;
      getTemp(thisParms).then((res)=>{
        console.log(res);
        this.tableData = res.data;
      })
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
.add-form {
  width: 80%;
  margin: 0 auto;
}
</style>