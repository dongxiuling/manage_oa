<template>
  <div class="content">
    <el-row :gutter="20">
      <!-- 左侧树型菜单 -->
      <el-col :span="8">
        <div class="left-tree">
          <el-tree
            :data="deptList"
            :props="defaultProps"
            :expand-on-click-node="false"
            ref="tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!-- 右侧表格列表 -->
      <el-col :span="16">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="checkUser"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="userId" label="用户编号" width="120"></el-table-column>
          <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
          <el-table-column prop="nickName" label="用户昵称" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listUser } from "@/api/system/user";
import { treeselect } from "@/api/system/dept";
export default {
  data() {
    return {
      deptList: undefined,
      userList: [],
      loading:false,
      total:0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getTreeselect();
  },
  methods: {
    //选中人员
    checkUser(val){
      this.$emit("checkUser",val)
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getList();
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.deptList = response.data;
      });
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(
        response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    }
  }
};
</script>
<style scoped>
.left-tree {
  height: 300px;
  overflow: scroll;
}
</style>