<template>
</template>

<script>
import THREE from "../../utils/three";

let SEPARATION = 80,
  AMOUNTX = 40,
  AMOUNTY = 60;

let container;
//three的三要素
// 1.scene(场景): 场景中包含了所有的3D对象数据
// 2.camera(相机): 相机有位置（position）,旋转（rotation）和视野属性（field of view）
// 3.renderer(渲染器): 决定场景中的一个物体在照相机的视角看来是什么样子
let camera, scene, renderer;

let particles,
  particle,
  count = 0;

let mouseX = 0,
  mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = 375;
export default {
  data() {
    return {
      step: 20
    };
  },
  methods: {
    //定义粒子绘制函数
    particleRender(context) {
      //获取canvas上下文的引用
      context.beginPath();
      context.arc(0, 0, 0.8, 0, Math.PI * 2, true);
      //设置原型填充
      context.fill();
    },
    init() {
      container = document.createElement("div");
      var getbannerId = document.getElementById('banner_threed');
      getbannerId.appendChild(container);
      // PerspectiveCamera(deg,size,origin,origin)
      // 1.这是一个角度，越大，则表示虚拟的相机镜片越宽。
      // 2.第二个参数是输出的宽和高之比。这个值必须与CanvasRenderer相一致.
      // 3.同4
      // 4.相机只能看见一定范围之内的物体，这个范围是由near和far来确定的，在这里分别为1和4000。因而任何比1近的物体或者比4000远的物体是不会被渲染的。
      camera = new THREE.THREE.PerspectiveCamera(
        2500,
        window.innerWidth / 400,
        1000,
        4000
      );
      // 调整banner 3D 包裹画布层样式
      container.style.cssText =
        "position:absolute;bottom:0px;left:0;cursor:pointer;opacity:0.9;z-index:1;width:100%;height:384px;overflow:hidden;";
      // 特效深度
      camera.position.z = 2000;
      // 将相机加入场景中
      scene = new THREE.THREE.Scene();

      particles = new Array();
      // 画小圆点
      // var material = new THREE.THREE.ParticleCanvasMaterial({
      //   // 小点颜色
      //   color: 0x47fbff,
      //   program: this.particleRender
      // });
      // 设置点点连线
      // var geometry = new THREE.THREE.Geometry();
      var i = 0;
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          var nowcolor = ix % this.step;
          var material = new THREE.THREE.ParticleCanvasMaterial({
            // 小点颜色
            color: this.gradientColor("#47fbff", "#ff1cae", this.step)[
              nowcolor
            ],
            program: this.particleRender
          });
          particle = particles[i++] = new THREE.THREE.Particle(material);
          particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
          particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
          // 将其放大一点
          // particle.scale.x = particle.scale.y = 10;
          // particle =new THREE.THREE.ParticleCanvasMaterial({
          //   color: 0x871f78
          // })
          scene.add(particle);
          // geometry.vertices.push(particle.position);
        }
      }
      // line
      // var line = new THREE.THREE.Line(
      //   geometry,
      //   new THREE.THREE.LineBasicMaterial({ color: 0xe1e1e1, opacity: 0.2 })
      // );
      // scene.add(line);
      // 渲染器
      renderer = new THREE.THREE.CanvasRenderer();
      // 渲染画布大小
      renderer.setSize(window.innerWidth, 375);
      container.appendChild(renderer.domElement);
      // 加入鼠标移动监听器（mousemove listener）来追踪鼠标位置
      getbannerId.addEventListener("mousemove", this.onDocumentMouseMove, false);
      // 事件兼容
      // document.addEventListener("touchstart", this.onDocumentTouchStart, false);
      // document.addEventListener("touchmove",this. onDocumentTouchMove, false);
      //画布重置大小位置/canmer相机会形变（暂时注释）
      window.addEventListener("resize", this.onWindowResize, false);
    },
    // 渐变色差
    gradientColor(startColor, endColor, steps) {
      var startRGB = this.globalFun.colorMethods.colorRgb(startColor); //转换为rgb数组模式
      var startR = startRGB[0];
      var startG = startRGB[1];
      var startB = startRGB[2];

      var endRGB = this.globalFun.colorMethods.colorRgb(endColor);
      var endR = endRGB[0];
      var endG = endRGB[1];
      var endB = endRGB[2];

      var sR = (endR - startR) / steps; //总差值
      var sG = (endG - startG) / steps;
      var sB = (endB - startB) / steps;

      var colorArr = [];
      for (var i = 0; i < steps; i++) {
        //计算每一步的hex值
        var hex = this.globalFun.colorMethods.colorHex(
          "rgb(" +
            parseInt(sR * i + startR) +
            "," +
            parseInt(sG * i + startG) +
            "," +
            parseInt(sB * i + startB) +
            ")"
        );
        colorArr.push(hex);
      }
      return colorArr;
    },
    onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = 375;
      // 从新设置纵横比（会形变）
      // camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, 375);
    },
    // 鼠标横向移动翻转
    onDocumentMouseMove(event) {
      // mousemove事件 设置获取坐标
      mouseX = event.clientX - windowHalfX;
      // 暂不需要上下翻转
      // mouseY = event.clientY - windowHalfY;
    },
    // 暂不做兼容
    // onDocumentTouchStart(event) {
    //   if (event.touches.length === 1) {
    //     event.preventDefault();
    //     mouseX = event.touches[0].pageX - windowHalfX;
    //     mouseY = event.touches[0].pageY - windowHalfY;
    //   }
    // },
    // onDocumentTouchMove(event) {
    //   if (event.touches.length === 1) {
    //     event.preventDefault();

    //     mouseX = event.touches[0].pageX - windowHalfX;
    //     mouseY = event.touches[0].pageY - windowHalfY;
    //   }
    // },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      // 暂不需要上下翻转
      // camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 200 +
            Math.sin((iy + count) * 0.5) * 50;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iy + count) * 0.5) + 1) * 2;
        }
      }
      renderer.render(scene, camera);
      // 跳动起伏速度
      count += 0.1;
    },
    // 重复渲染清空
    initScene() {
      scene = new THREE.THREE.Scene();
      // // 渲染器
      // renderer = new THREE.THREE.CanvasRenderer();
      // // 渲染画布大小
      // renderer.setSize(0, 0);
    }
  },
  mounted() {
    // 重新加载清空画布一次
    this.initScene();
    this.init();
    this.animate();
  },
  beforeDestroy() {
    // 摧毁前清空一次
    this.initScene();
  }
};
</script>
<style lang="scss" scoped="scoped">
</style>
