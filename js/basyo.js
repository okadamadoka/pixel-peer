function resizeContainer() {
  //const baseWidth = 1750;//720
  //const baseHeight = 900;//540
  const baseWidth = 720;
  const baseHeight = 540;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;
  const scale = Math.min(scaleX, scaleY); // 縦横比保持

  const container = document.getElementById('game-container');
  container.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizeContainer);
window.addEventListener('load', resizeContainer);