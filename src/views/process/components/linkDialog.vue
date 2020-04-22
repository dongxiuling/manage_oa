<!-- 模版添加弹框组件 -->
<template>
  <el-dialog title="请为模版选择相应环节" :visible.sync="outerVisible">
    <div class="content">
      <el-table
        v-loading="loading"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNo" label="序号" width="180"></el-table-column>
        <el-table-column prop="nodeName" label="环节名称" width="180"></el-table-column>
        <el-table-column label="签批人">
          <template slot-scope="scope">
            <span v-if="scope.row.isSign == '0'">无</span>
            <el-button
              v-else-if="scope.row.isSign == '1' && !scope.row.approveName"
              @click="setApprove(scope.row.id)"
              size="mini"
              type="text"
              icon="el-icon-edit"
            >设置签批人</el-button>
            <el-button
              v-else-if="scope.row.isSign == '1' && scope.row.approveName"
              @click="setApprove(scope.row.id)"
              size="mini"
              type="text"
              icon="el-icon-edit"
            >{{scope.row.approveName}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 内部弹框 选择人员 -->
    <el-dialog width="30%" title="选择签批人" :visible.sync="innerVisible" append-to-body>
      <div class="userTree">
        <!-- 用户树形菜单 -->
        <el-tree ref="tree" node-key="id" :default-expand-all="true" :props="props" :check-strictly="true" :data="userList" show-checkbox @check-change="checkUserHandle"></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button @click="setUserHandle" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button @click="submitLinkHandle" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryLink } from "@/api/process/link";
import { getUser } from "@/api/process/temp";
export default {
  data() {
    return {
      props: {
        children: "children",
        label: "label"
      },
      userList: [], //用户数据
      tableData: [], //数据列表
      linkQueryParams: {
        //查询参数
        flowType: "",
        status: "1",
        nodeName: ""
      },
      checkLinkList:[],//选中环节列表
      checkUser:{},//选中的人员
      activeLine: undefined, //当前选中行（对应设置签批人项）
      loading: false, //数据加载动画
      outerVisible: false, //控制外层边框显示隐藏
      innerVisible: false //控制内层边框显示隐藏
    };
  },
  /**
   * props
   * showDialog:控制添加模版弹框是否显示
   * dataType:获取环节类型
   */
  props: ["showDialog", "dataType"],
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //获取环节列表
    queryLinks() {
      let thisDataArr = [];
      this.loading = true;
      queryLink(this.linkQueryParams).then(res => {
        thisDataArr = res.data.map(item => {
          return {
            approveId: undefined,
            approveName: undefined,
            nodeId: item.id,
            nodeName: item.nodeName,
            orderNo: item.orderNo,
            isSign:item.isSign
          };
        });
        
        this.tableData = thisDataArr;
        this.loading = false;
      });
    },
    //设置签批人按钮
    setApprove(id) {
      this.activeLine = id;
      this.innerVisible = true;
      if(!this.userList.length){
        this.getUserHandle();
      }
    },
    //获取人员列表
    getUserHandle(){
      getUser().then((res)=>{
        this.userList = res.data
      })
    },
    //选取人员事件
    checkUserHandle(val,checkThis){
      if(checkThis){
        this.$refs.tree.setCheckedKeys([]);
        this.$refs.tree.setCheckedKeys([val.id]);
        this.checkUser = {...val}
      }
    },
    //选取人员确认按钮事件
    setUserHandle(){
      let dataArr = []
      dataArr = this.tableData.map((item)=>{
        if(item.id == this.activeLine){
          item.approveId=this.checkUser.id;
          item.approveName=this.checkUser.label;
        }
        return item
      })
      this.tableData = dataArr;
      console.log(dataArr);
      this.innerVisible = false;
    },
    //选择环节
    handleSelectionChange(val) {
      this.checkLinkList = val;
    },
    //提交选中环节列表
    submitLinkHandle(){
      if(!this.checkLinkList.length){
        this.$emit("checkList",this.checkLinkList)
        this.outerVisible = false;
      }else{
        this.$message.error('请选择环节！');
      }
    }
  },
  watch: {
    showDialog(val) {
      this.outerVisible = val;
      if (val) {
        this.queryLinks();
      }
    },
    outerVisible(val) {
      this.$emit("update:showDialog", val);
    },
    dataType(val) {
      this.linkQueryParams.flowType = val;
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>