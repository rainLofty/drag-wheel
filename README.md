# 使用鼠标拖拽滚轮缩放

注意：拖动的元素一定要定位

```html
 <div class="drag-wheel-canvas">
    <div class="moveDom">
      <img src="@/assets/2.jpg" alt="" />
    </div>
  </div>
```
```js
import { doMouseDrag, doMouseResize } from "./drag";
mounted() {
    //参数：拖动的元素类名或者id名
    doMouseDrag(".moveDom");
    //参数1：滚动区域元素的类名或id名，参数2：缩放元素的类名或id名
    doMouseResize(".drag-wheel-canvas", ".moveDom");
},
```