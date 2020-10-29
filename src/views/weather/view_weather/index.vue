<template>
  <div>
    <div id="img"></div>
    <div id="wea">
      <h1>实时天气</h1>
      <el-button
        type="success"
        icon="el-icon-refresh"
        circle
        id="shuaxin"
      ></el-button>
      <div class="location">哈尔滨市</div>
      <div id="t">{{ weather.t }}</div>
      <div class="qita">{{ weather.state }}</div>

      <div class="qita">风向：{{ weather.windd }}</div>
      <div class="qita">风力：{{ weather.windp }}</div>
      <div class="qita">能见度：{{ weather.seeing }}</div>

      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: "哈尔滨市",
      weather: {
        seeing: "3千米", //能见度
        state: "多云转晴", //天气状态
        t: "23°C", //温度
        windp: "5级", //风力
        windd: "东南风", //风向
        value: "",
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
#img {
  width: 100%;
  height: 500px;
  background-color: aqua;
  position: absolute;
  z-index: -1;
}
.location {
  font-size: 25px;
}
#wea {
  margin-top: 30px;
  margin-left: 200px;
}
#t {
  font-size: 100px;
}
#shuaxin {
  margin-left: 500px;
}
.qita{
    font-size: 20px;
    margin-top: 15px;
}
</style>