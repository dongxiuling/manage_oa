<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true">
      <el-form-item label="环节名称" prop="roleName">
        <el-input placeholder="请输入环节名称" clearable size="small" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择" clearable size="small" >
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效" prop="status">
        <el-select placeholder="请选择" clearable size="small" >
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-top" size="mini">上移</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-bottom" size="mini">下移</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </el-col>
    </el-row>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="name" label="环节名称" width="120"></el-table-column>
      <el-table-column label="环节状态" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-text="scope.row.status?'开启':'未开启'"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="流程分类"></el-table-column>
      <el-table-column label="签批按钮">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" size="mini" :active-text="scope.row.status?'开启':'未开启'"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="text" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-search">详情</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "王小虎",
          status: false,
          category:'车辆'
        },
        {
          id: "2",
          name: "王小虎",
          status: true,
          category:'考试'
        },
        {
          id: "3",
          name: "王小虎",
          status: true,
          category:'车辆'
        },
        {
          id: "4",
          name: "王小虎",
          status: false,
          category:'车辆'
        },
        {
          id: "5",
          name: "王小虎",
          status: false,
          category:'车辆'
        },
        {
          id: "6",
          name: "王小虎",
          status: false,
          category:'车辆'
        },
        {
          id: "7",
          name: "王小虎",
          status: false,
          category:'车辆'
        }
      ]
    };
  }
};
</script>