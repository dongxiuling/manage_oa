<template>
  <div class="app-container">
    <el-row>
      <!-- 左侧分类导航 start -->
      <el-col :span="4">
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
      <el-col :span="20">
        <div class="right-content">
          <!-- 搜索表单 start -->
          <el-form ref="queryForm" :model="queryParams" :inline="true">
            <el-form-item label="环节名称:" prop="roleName">
              <el-input
                placeholder="请输入环节名称"
                v-model="queryParams.nodeName"
                clearable
                size="small"
              />
            </el-form-item>
            <!-- <el-form-item label="是否开启:" prop="status">
              <el-switch
                v-model="queryParams.status"
                active-text="是"
                active-value="1"
                inactive-text="否"
                inactive-value="0"
              ></el-switch>
            </el-form-item> -->
            <el-form-item>
              <el-button @click="queryLinks" type="primary" icon="el-icon-search" size="mini">搜索</el-button>
              <el-button @click="resetSearch" type="default" icon="el-icon-refresh" size="mini">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- 搜索表单 end -->

          <!-- 按钮组 start -->
          <div class="btn-bar">
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  @click="dialogHandle(1)"
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                >新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  @click="moveHandle({type:'up'})"
                  type="warning"
                  plain
                  icon="el-icon-top"
                  size="mini"
                >上移</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  @click="moveHandle({type:'down'})"
                  type="warning"
                  plain
                  icon="el-icon-bottom"
                  size="mini"
                >下移</el-button>
              </el-col>
              <!-- <el-col :span="1.5">
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </el-col> -->
            </el-row>
            <div class="status-btn">
            <el-radio-group size="mini" @change="changeStatus" v-model="linkStatus">
              <el-radio-button label="1">开启</el-radio-button>
              <el-radio-button label="0">未开启</el-radio-button>
            </el-radio-group>
            </div>
          </div>
          <!-- 按钮组 end -->

          <!-- 表格列表 start -->
          <el-table
            v-loading="dataLoading"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :default-sort = "{prop: 'orderNo', order: 'ascending'}"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderNo" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="nodeName" label="环节名称" width="180"></el-table-column>
            <el-table-column label="环节状态" width="180">
              <template slot-scope="scope">
                <el-switch
                  @change="switchHandle(scope.row,{type:'status'})"
                  v-model="scope.row.status"
                  active-value="1"
                  inactive-value="0"
                  :active-text="scope.row.status?'开启':'未开启'"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="签批按钮">
              <template slot-scope="scope">
                <el-switch
                  @change="switchHandle(scope.row,{type:'isSign'})"
                  v-model="scope.row.isSign"
                  :active-value="1"
                  :inactive-value="0"
                  size="mini"
                  :active-text="scope.row.isSign?'开启':'未开启'"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="dialogHandle(0,scope.row)"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改</el-button>
                <!-- <el-button size="mini" type="text" icon="el-icon-search">详情</el-button> -->
                <el-button
                  @click="deleteHandle(scope.row.id)"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格列表 end -->
        </div>
      </el-col>
    </el-row>

    <!-- 新增/修改环节弹框 start-->
    <el-dialog title="添加环节" :visible.sync="dialogAdd" width="40%">
      <el-row>
        <el-col :span="20">
          <el-form :model="addForm">
            <el-form-item label="所属类别" :label-width="formLabelWidth">
              <el-input v-model="addForm.type" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="环节名称" :label-width="formLabelWidth">
              <el-input placeholder="请输入环节名称" v-model="addForm.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button v-if="isUpdate" type="primary" @click="updateHandle({type:'nodeName'})">修改</el-button>
        <el-button v-else type="primary" @click="addHandle">添加</el-button>
      </div>
    </el-dialog>
    <!-- 新增/修改环节弹框 end-->
  </div>
</template>

<script>
import {
  getType,
  addLink,
  queryLink,
  updateLink,
  delLink,
  setDown,
  setUp
} from "@/api/process/link";
export default {
  data() {
    return {
      queryParams: {
        //查询条件
        flowType: "",
        status: "1",
        nodeName: ""
      },
      processType: {
        //流程分类列表
        list: [],
        now: {}
      },
      searchForm: {
        //搜索表单value值
        searchText: "",
        isSign: false,
        status: false
      },
      dataLoading:false,//列表加载状态
      linkStatus: "1", //环节列表状态
      selectionItem: [], //复选框选中项目
      checkItem: {}, //当前被选中项
      dialogAdd: false, //添加/修改环节弹框显示状态
      isUpdate: false, //弹出框是否为修改
      formLabelWidth: "120px",
      addForm: {
        //添加环节弹框表单内容
        name: "",
        type: "",
        typeId: 0
      },
      tableData: []
    };
  },
  created() {
    this.getWorkFollowType();
  },
  methods: {
    //显示弹框按钮事件
    dialogHandle(type, obj) {
      if (obj) {
        this.checkItem = { ...obj };
      }
      this.isUpdate = false;
      if (type == 0) {
        this.isUpdate = true;
      }
      this.dialogAdd = true;
    },
    //重置查询
    resetSearch() {
      this.queryParams.nodeName = "";
      this.queryParams.status = 0;
      this.queryParams.isSign = 0;
      this.queryLinks();
    },
    //切换分类
    changeType(tab) {
      let thisIndex = tab.index;
      this.processType.now = this.processType.list[thisIndex];
      this.queryLinks();
    },
    //列表中switch 切换事件
    switchHandle(item, type) {
      this.checkItem = item;
      this.updateHandle(type);
    },
    //复选框选中事件
    handleSelectionChange(val) {
      this.selectionItem = val;
    },
    //切换显示状态(开启 未开启)
    changeStatus(val){
      this.queryParams.status = val;
      this.queryLinks();
    },
    //移动环节顺序
    moveHandle({ type }) {
      let thisId = this.selectionItem[0].id
      let requestFun = null;
      if (type == "up") {
        requestFun = setUp;
      } else {
        requestFun = setDown;
      }
      console.log(this.selectionItem);
      requestFun({id:thisId}).then((res)=>{
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.queryLinks();
      })
    },
    //删除环节
    deleteHandle(id) {
      this.$confirm("此操作将永久删除该环节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLink({ id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.queryLinks();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改环节
    updateHandle(obj) {
      let thisParams = {
        flowType:this.checkItem.flowType,
        id:this.checkItem.id,
        isSign:this.checkItem.isSign,
        nodeName:this.checkItem.nodeName,
        status:this.checkItem.status,
        orderNo:this.checkItem.orderNo
      }
      if (obj.type == "nodeName") {
        thisParams.nodeName = this.addForm.name;
      }
      updateLink(thisParams).then((res)=>{
        console.log(res);
      })
    },
    //新增环节
    addHandle() {
      let params = {
        flowType: this.addForm.typeId,
        isDeleted: 0,
        isSign: 0,
        nodeName: this.addForm.name,
        orderNo: this.tableData.length+1,
        status: 1
      };
      addLink(params).then(res => {
        this.dialogAdd = false;
        this.addForm.name = "";
        this.queryLinks();
        this.$message({ type: "success", message: "添加成功!" });
      });
    },
    //查询环节
    queryLinks() {
      this.dataLoading = true;
      queryLink(this.queryParams).then(res => {
        this.tableData = res.data;
        this.dataLoading = false;
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
        this.queryLinks();
      });
    }
  },
  watch: {
    "processType.now": function(val) {
      this.addForm.type = val.dictLabel;
      this.addForm.typeId = val.dictValue;
      this.queryParams.flowType = val.dictValue;
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