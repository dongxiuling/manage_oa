<template>
  <div class="list">
    <div>
      <el-page-header @back="$router.back()" content="考试分类"></el-page-header>
      <el-divider></el-divider>
      <!-- <el-button
        class="add_btn"
        size="medium"
        type="primary"
        @click="$router.push('/exam/cateEdit')"
      >+ 添加分类</el-button> -->
    </div>
    <el-table border :data="cateData" style="width: 100%">
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.dictSort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column class="handle_row" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="GoExcises(scope.row)">添加考试题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getCategory } from "@/api/tool/category.js";
export default {
  data() {
    return {
      cateData: [],
      listLoading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getCategory({
        pageNum: 1,
        pageSize: 5,
        dictType: "sys_module_name"
      }).then(res => {
        this.cateData = res.rows;
      });
    },
    GoExcises(_data) {
      this.$router.push({path:"/exam/excises/",query:{cateId:_data.dictCode}})
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  padding: 20px;
}
.add_btn {
  float: right;
  margin-bottom: 10px;
}
.pages {
  float: right;
}
</style>