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

          <el-table v-loading="loading" :data="tableData" style="width: 100%">
            <el-table-column prop="templateName" label="模板名称" width="150"></el-table-column>
            <el-table-column prop="describtion" label="模板描述" width="200"></el-table-column>
            <el-table-column label="模板状态">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  @change="switchHandle(scope.row)"
                  active-value="1"
                  inactive-value="0"
                  :active-text="scope.row.status=='1'?'开启':'未开启'"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="模板环节">
              <template slot-scope="scope">
                <el-button
                  @click="setLinkHandle(scope.row)"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                >环节设置</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="editBtnHandle(scope.row)" type="text" size="mini" icon="el-icon-edit">修改</el-button>
                <el-button @click="detailTemp(scope.row.id)" type="text" size="mini" icon="el-icon-search">详情</el-button>
                <el-button
                  @click="deleteHandle(scope.row.id)"
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 添加模板弹框 -->
    <el-dialog title="添加模板" :visible.sync="addTempDoalog">
      <div class="add-form">
        <el-alert v-if="!isUpdate" center :closable="false" style="margin-bottom:20px" title="添加模板提示" type="info" description="新建模板默认为未开启状态，在模板配置完成后开启即可！" show-icon></el-alert>
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
        <el-button v-if="isUpdate" type="primary" @click="editTempHandle">修改</el-button>
        <el-button v-else type="primary" @click="addTempHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 配置模板环节弹框 -->
    <link-dialog
      @checkList="getCheckLinks"
      :editData="editFlowNodes"
      :showDialog.sync="linkDialog"
      :dataType="processType.now.dictValue"
    />
    <!-- 模板详情弹框 -->
    <temp-detail :tempid="tempDetailId" :showDialog.sync="detailDialog"/>
  </div>
</template>

<script>
import linkDialog from "./components/linkDialog.vue";
import tempDetail from "./components/tempDetail.vue";
import { getType } from "@/api/process/link";
import { addTemp, getTemp, updateTemp, deleteTemp } from "@/api/process/temp";
export default {
  data() {
    return {
      loading:false,
      linkStatus: "1",
      tableData: [],
      queryParams: {
        //查询模板参数
        templateName: "",
        flowType: "",
        status: "1"
      },
      addParams: {
        //添加模板参数
        templateName: "",
        describtion: "",
        flowNodes: [],
        flowType: "",
        status: "0"
      },
      tempDetailId:undefined,//获取模板详情id
      isUpdate:false,//添加弹框是否为修改状态
      checkItem: undefined, //当前选中项
      addTempDoalog: false, //是否显示添加模板弹框
      editFlowNodes:[],//修改环节列表
      linkDialog: false, //是否显示配置模板环节弹框
      detailDialog:false,//是否显示查看模板详情弹框
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
    linkDialog,
    tempDetail
  },
  watch: {
    "processType.now": function(val) {
      this.addParams.flowType = val.dictValue;
      this.queryParams.flowType = val.dictValue;
    }
  },
  methods: {
    //查看详情页面
    detailTemp(id){
      this.detailDialog = true;
      this.tempDetailId = id;
    },
    //模板开启状态
    switchHandle(item) {
      this.checkItem = item;
      let thisParams = {
        ...item
      };
      updateTemp(thisParams).then(res => {
        console.log(res);
      });
    },
    //设置环节按钮
    setLinkHandle(item) {
      if(item.flowNodes && item.flowNodes.length>0){
        this.editFlowNodes = item.flowNodes;
        console.log(item.flowNodes)
      }else{
        this.editFlowNodes = [];
      }
      this.checkItem = item;
      this.linkDialog = true;
    },
    //获取选中环节列表
    getCheckLinks(arr) {
      let thisParams = { ...this.checkItem };
      thisParams.flowNodes = [...arr];

      updateTemp(thisParams).then(res => {
        console.log(res);
      });
    },
    //添加模板按钮
    addHandle() {
      this.addParams.templateName = "";
      this.addParams.describtion = "";
      this.isUpdate = false;
      this.addTempDoalog = true;
    },
    //添加模板事件
    addTempHandle() {
      let thisParms = this.addParams;
      addTemp(thisParms).then(res => {
        console.log(res);
        this.addTempDoalog = false;
      });
    },

    //切换模板状态
    changeStatus(val) {
      this.queryParams.status = val;
      this.queryTempHandle();
    },
    //切换分类
    changeType(tab) {
      let thisIndex = tab.index;
      this.processType.now = this.processType.list[thisIndex];
      this.queryTempHandle();
    },

    //获取模板列表
    queryTempHandle() {
      this.loading = true;
      let thisParms = this.queryParams;
      getTemp(thisParms).then(res => {
        this.tableData = res.data;
        this.loading = false;
      });
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
    //修改按钮事件
    editBtnHandle(item){
      this.checkItem = item;
      this.addParams.templateName = item.templateName;
      this.addParams.describtion = item.describtion;
      this.isUpdate = true;
      this.addTempDoalog = true;
    },
    //修改当前模板
    editTempHandle(){
      let thisParams = {...this.checkItem};
      thisParams.templateName = this.addParams.templateName;
      thisParams.describtion = this.addParams.describtion;
      updateTemp(thisParams).then((res)=>{
        this.addTempDoalog = false;
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        this.queryTempHandle();
      })
    },
    //删除模板
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTemp({ id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.queryTempHandle();
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