<!--  -->
<template>
  <div>
    <el-form :model="weather" ref="form" label-width="200px" id="form">
      <el-form-item label="能见度">
        <el-input v-model="weather.seeing" />
        <el-select v-model="weather.value" placeholder="请选择">
          <el-option
            v-for="item in weather.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="天气情况">
        <el-input v-model="weather.state" />
      </el-form-item>
      <el-form-item label="温度">
        <el-input v-model="weather.t" />
      </el-form-item>
      <el-form-item label="风力">
        <el-input v-model="weather.windp" />
      </el-form-item>
      <el-form-item label="风向">
        <el-input v-model="weather.windd" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini" @click="save()">保存</el-button>
        <el-button type="danger" size="mini">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weather: {
        seeing: "",
        state: "",
        t: "",
        windp: "",
        windd: "",
        options: [
          {
            value: "1",
            label: "米",
          },
          {
            value: "2",
            label: "千米",
          },
        ],
        value: "",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    save() {
        
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#form {
  margin-top: 50px;
  margin-right: 200px;
}
</style>