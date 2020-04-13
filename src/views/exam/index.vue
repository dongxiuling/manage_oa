<template>
  <div class="list">
    <div>
      <el-page-header @back="$router.back()" content="考试分类"></el-page-header>
      <el-divider></el-divider>
      <el-button
        class="add_btn"
        size="medium"
        type="primary"
        @click="$router.push('/exam/cateEdit')"
      >+ 添加分类</el-button>
    </div>
    <el-table border :data="cateData" style="width: 100%">
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.cateId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column class="handle_row" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push('/exam/cateEdit')" >编辑</el-button>
          <el-button size="mini" type="danger" >删除</el-button>
          <el-button size="mini" @click="GoExcises(scope.row)">添加考试题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      cateData: [
          {
              cateId:1,
              cateName:'司法考试'
          }
      ],
      listLoading: true
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    // getData() {
    //   // getCategory().then(res => {
    //   //   console.log(res);
    //   //   this.listLoading = false;
    //   //   this.PrimaryCourseData = res.data;
    //   // });
    //   getPath().then(res => {
    //     console.log(res);
    //     this.listLoading = false
    //     if (res.errno * 1 === 101) {
    //       this.SeconderyCourseData = res.data;
    //     } else {
    //       this.$message.error(res.errmsg);
    //     }
    //   });
    // },
    // handleAdd(list, primarylist, number) {
    //   this.$router.push({
    //     name: `SecondDetails`,
    //     params: {
    //       list,
    //       primarylist,
    //       number: 0
    //     },
    //     query: {
    //       pathId: -1,
    //       cateId: -1
    //     }
    //   });
    // },
    // handleEdit(index, obj, primarylist, number) {
    //   this.$router.push({
    //     name: `SecondDetails`,
    //     params: {
    //       obj,
    //       primarylist,
    //       number: 1
    //     },
    //     query: {
    //       pathId: obj.pathId,
    //       cateId: obj.cateId
    //     }
    //   });
    // },
    // handleDelete(index, obj) {
    //   this.listLoading = true;
    //   delPathById({
    //     pathId: obj.pathId
    //   }).then(res => {
    //     this.listLoading = false;
    //     if (res.errno == 101) {
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       });
    //       getPath().then(res => {
    //         if (res.errno * 1 === 101) {
    //           this.SeconderyCourseData = res.data;
    //         } else {
    //           this.$message.error(res.errmsg);
    //         }
    //       });
    //     } else {
    //       this.$message.error(res.errmsg);
    //     }
    //   });
    // },
    // GoExcises(_data) {
    //   this.$router.push(`/classify/secondExcises/${_data.pathId}`)
    // }
  }
};
</script>
<style lang="scss" scoped>
.list{
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