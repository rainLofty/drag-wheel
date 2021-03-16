<template>
  <div id="app">
    <drag-wheel></drag-wheel>
  </div>
</template>
<script>
import dragWheel from "./components/drag-wheel/index";
export default {
  components: {
    dragWheel,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="less">
body,
html,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body {
  height: 2000px;
}
img,
.box {
  width: 100%;
  height: 100%;
}
</style>
