<template>
  <div class="drag-wheel-canvas">
    <div class="moveDom">
      <img src="@/assets/2.jpg" alt="" />
    </div>
  </div>
</template>
<script>
import { doMouseDrag, doMouseResize } from "./drag";
export default {
  data() {
    return {};
  },
  mounted() {
    doMouseDrag(".moveDom");
    doMouseResize(".drag-wheel-canvas", ".moveDom");
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.drag-wheel-canvas {
  width: 1200px;
  height: 600px;
  cursor: move;
  box-sizing: border-box;
  position: relative;
  border: 5px solid #ccc;
  margin: 20px;
  padding: 20px;
  overflow: hidden;

  .moveDom {
    width: 300px;
    height: 300px;
    position: absolute;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>