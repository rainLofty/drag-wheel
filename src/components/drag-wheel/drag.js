  //获取相关CSS属性 (兼容性考虑)
  function getCss(o, key) {
      // getComputedStyle是为了兼容FF浏览器
      return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
  };

  //拖拽的实现 target 拖拽的控件 callback 回调方法
  function doMouseDrag(selector, callback) {
      if(!selector){
          return;
      }
      let target = document.querySelector(selector);
       if(!target){
          return;
      }
      // 参数列表
      var params = {
          // position:relative left偏移值
          left: 0,
          // position:relative top偏移值
          top: 0,
          // 记录鼠标相对于视口的坐标位置
          currentX: 0,
          currentY: 0,

          // 控件距离document顶部的距离 (包括滚动卷起)
          rectLeft: 0,
          // 控件距离document左部的距离 (包括滚动卷起)
          rectTop: 0,
          // 控件右边距离视口右部距离
          rectRight: 0
      };

      // 如果该控件默认是static定位(即没有设置定位属性) 此时只设置left和top属性无法进行偏移
      // 则将其定位属性改成relative属性, 相对于自身位置进行位移
      if (getCss(target, "position") === "static") {
          target.style.position = "relative";
      }

      // 首先获取目标元素的left、top属性值
      if (getCss(target, "left") !== "auto") {
          params.left = getCss(target, "left");
      }
      if (getCss(target, "top") !== "auto") {
          params.top = getCss(target, "top");
      }
      // target.style.cursor="pointer";

      // 监听控件拖动事件
      target.onmousedown = function (event) {
          target.style.transition = '0s';
          // 记录当前的位置数据
          params.rectLeft = target.getBoundingClientRect().left + document.body.scrollLeft;
          params.rectTop = target.getBoundingClientRect().top + document.body.scrollTop;
          // params.rectTop = target.getBoundingClientRect().top;

          params.rectRight = document.documentElement.clientWidth - target.getBoundingClientRect().right;

          /*为了阻止拖动浏览器中元素时发生默认事件，
          例如拖动图片时会出现一个新窗口显示该图片，下面代码可以阻止这种事件发生
          */
          if (event.preventDefault) {
              event.preventDefault();
          } else {
              event.returnValue = false;
          }

          var e = event;
          // 记录当前鼠标距离视口的坐标x,y
          params.currentX = e.clientX;
          params.currentY = e.clientY;

          // 使用document的原因是 去除滑动卡克的情况
          document.onmousemove = function (event) {
              var e = event ? event : window.event;
              // 获取到当前鼠标的位置
              var nowX = e.clientX,
                  nowY = e.clientY;
              // 获取当前鼠标移动的距离，即当前鼠标位置减去初始位置
              var disX = nowX - params.currentX,
                  disY = nowY - params.currentY;
              // 将元素的位置更新，parsenInt为了将属性值变为数字类型
              // console.log(disX, disY)
              // 往左移动的距离大于 控件 距离左边的距离
              if (disX < 0 && Math.abs(disX) > params.rectLeft) {
                  disX = -params.rectLeft;
              }
              if (disY < 0 && Math.abs(disY) > params.rectTop) {
                  disY = -params.rectTop;
              }
              // 往右移动的距离大于边界值
              if (disX > 0 && disX > params.rectRight) {
                  disX = params.rectRight;
              }
              // console.log(params.rectLeft, params.rectTop, params.rectRight)
              target.style.left = parseInt(params.left) + disX + "px";
              target.style.top = parseInt(params.top) + disY + "px";
          } // end onmousemove

          // 防止鼠标移出窗口的时候 回来的时候还可以移动
          document.onmouseup = function () {
              // console.log('document mouseup')
              document.onmousemove = null;
              document.onmouseup = null;
              // params.flag = false;
              // 当鼠标松开时再次更新元素的位置 更新参数params
              if (getCss(target, "left") !== "auto") {
                  params.left = getCss(target, "left");
              }
              if (getCss(target, "top") !== "auto") {
                  params.top = getCss(target, "top");
              }
          }
      };

  };
  //滚轮缩放
  function doMouseResize(pSelector, imgSelector) {
      if (!pSelector) {
          return;
      }
      if (!imgSelector) {
          return;
      }
      let pDom = document.querySelector(pSelector);
      let imgDom = document.querySelector(imgSelector);
      if (!pDom) {
          return;
      }
      if (!imgDom) {
          return;
      }
      let scale = 1;
      pDom.onmousewheel = function (e) {
          e.preventDefault();
          e = e || window.event;
          var direct = 0; //方向
          if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件            
              direct = e.wheelDelta >= 0 ? 1 : -1;
          } else if (e.detail) { //Firefox滑轮事件
              direct = e.detail > 0 >= 0 ? 1 : -1;
          }
          scale += direct * 0.1;
          if (scale <= 0.01) {
              scale = 0.01;
          }
          imgDom.style.transform = 'scale(' + scale + ')';
          imgDom.style.transition = '0.1s';
      }
  }

  export {
      doMouseDrag, //拖动元素
      doMouseResize,//滚轮缩放
  }
/* 调用方法
import { doMouseDrag,doMouseResize } from "./drag";
doMouseDrag('.moveDom')//拖动的元素类名或者id名
doMouseResize('.drag-wheel-canvas','.moveDom')//滚动区域元素的类名或id名，缩放元素的类名或id名
*/