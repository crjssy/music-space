// player.js
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const songFile = urlParams.get('song') || 'song1.mp3';
  
    document.getElementById("audio-source").src = 'music/' + songFile;
    document.getElementById("audio").load();
    document.getElementById("song-name").textContent = songFile.replace('.mp3', '');
  };
  