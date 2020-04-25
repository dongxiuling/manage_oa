<!-- 模板详情弹框 -->
<template>
  <div>
    <el-dialog title="模板详情" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <div v-loading="loading" class="dialog-content">
        <el-form ref="form" label-width="80px">
          <el-form-item label="模板名称:">{{tempData.templateName}}</el-form-item>
          <el-form-item label="模板描述:">{{tempData.describtion}}</el-form-item>
        </el-form>
        <el-divider content-position="center">流程步骤</el-divider>
        <div class="alert-info" v-if="!tempData.flowNodes || tempData.flowNodes.length == 0">
          <el-alert :closable="false" title="还没有配置相关流程" type="info" center show-icon></el-alert>
        </div>
        <div v-else>
          <el-steps direction="vertical">
            <el-step
              v-for="item in tempData.flowNodes"
              :key="item.nodeId"
              status="process"
              :title="item.nodeName"
              :description="'签批人'+(item.approveName?item.approveName:'无')"
            ></el-step>
          </el-steps>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleClose">关 闭</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getItem } from "@/api/process/temp";
export default {
  data() {
    return {
      dialogVisible: false,
      tempData: {},
      loading: false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  props: ["tempid", "showDialog"],
  methods: {
    //弹框关闭
    handleClose(){
      this.$emit("update:showDialog",false)
    },
    //获取模板详情信息
    getData(id) {
      this.loading = true;
      getItem({ id }).then(res => {
        this.tempData = res.data;
        this.loading = false;
      });
    }
  },
  watch: {
    showDialog(val) {
      this.dialogVisible = val;
      if (val) {
        this.getData(this.tempid);
      }
    }
  }
};
</script>
<style scoped>
.alert-info{
  margin-bottom: 20px;
}
</style>