// JavaScript 代码可以放在这里，例如实现轮播图、滚动动画等

// 示例：简单的轮播图功能
const slider = document.querySelector('.background-image');
const images = slider.querySelectorAll('img');
let currentIndex = 0;

function showNextImage() {
  images[currentIndex].style.opacity = 0;
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.opacity = 1;
}

if (images.length > 0) {
  images[0].style.opacity = 1; // 初始显示第一张图片
  setInterval(showNextImage, 5000); // 每隔 5 秒切换图片
}
