// 优化的轮播图脚本
window.onload = function () {
  // 轮播图图片路径
  const images = [
    'images/banner1.png',
    'images/banner2.png',
    'images/banner3.png'
  ];
  const img = document.getElementById('carousel-img');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let index = 0;
  let timer = null;
  let isTransitioning = false; // 防止快速点击导致的问题

  // 预加载图片以确保显示质量
  function preloadImages() {
    images.forEach(src => {
      const preloadImg = new Image();
      preloadImg.src = src;
      
      // 监听图片加载情况
      preloadImg.onload = function() {
        console.log(`图片已加载: ${src}, 尺寸: ${this.width}x${this.height}`);
      };
      
      preloadImg.onerror = function() {
        console.error(`图片加载失败: ${src}`);
      };
    });
  }

  // 显示指定索引的图片，添加平滑过渡
  function showImage(i) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // 添加淡出效果
    img.classList.add('fade');
    
    // 等待淡出完成后更换图片
    setTimeout(() => {
      img.src = images[i];
      
      // 更新活动点
      dots.forEach(dot => dot.classList.remove('active'));
      dots[i].classList.add('active');
      
      // 图片加载完成后淡入
      img.onload = function() {
        img.classList.remove('fade');
        isTransitioning = false;
      };
      
      index = i;
    }, 500);
  }

  // 显示下一张图片
  function showNextImage() {
    let nextIndex = (index + 1) % images.length;
    showImage(nextIndex);
  }
  
  // 显示上一张图片
  function showPrevImage() {
    let prevIndex = (index - 1 + images.length) % images.length;
    showImage(prevIndex);
  }

  // 启动自动播放
  function startAutoPlay() {
    stopAutoPlay(); // 确保没有多个计时器同时运行
    timer = setInterval(showNextImage, 4000); // 增加时间间隔
  }

  // 停止自动播放
  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // 为轮播点添加点击事件
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const dotIndex = parseInt(dot.dataset.index);
      if (index !== dotIndex) { // 仅当点击不同的点时才切换
        stopAutoPlay();
        showImage(dotIndex);
        startAutoPlay();
      }
    });
  });
  
  // 添加左右按钮事件监听
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      showPrevImage();
      startAutoPlay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      showNextImage();
      startAutoPlay();
    });
  }
  
  // 鼠标悬停在轮播图上时暂停自动播放
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // 处理图片加载错误
  img.onerror = function() {
    console.error(`轮播图图片加载失败: ${this.src}`);
    // 加载失败时显示备用图片或下一张
    this.src = 'images/disc.png'; // 可以设置一个备用图片
    isTransitioning = false;
  };

  // 初始化
  preloadImages();
  showImage(0);
  startAutoPlay();
};