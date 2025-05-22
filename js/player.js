window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const songFile = urlParams.get('song') || 'song1.mp3';
  const audio = document.getElementById('audio');
  const disc = document.getElementById('disc');

  // 设置歌曲路径并加载
  audio.src = 'music/' + songFile;
  audio.load();

  // 设置歌曲名称
  document.getElementById("song-name").textContent = songFile.replace('.mp3', '');

  // 控制唱片旋转动画
  audio.addEventListener('play', () => {
    disc.style.animationPlayState = 'running';
  });

  audio.addEventListener('pause', () => {
    disc.style.animationPlayState = 'paused';
  });

  audio.addEventListener('ended', () => {
    disc.style.animationPlayState = 'paused'; // 播放结束后停止旋转
  });
};
