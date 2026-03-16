const message = document.getElementById("message");
const button = document.getElementById("backButton");

// 少し表示してからフェードアウト
setTimeout(() => {
  message.classList.add("fadeout");
}, 2000);

// ボタン表示
setTimeout(() => {
  button.classList.add("show");
}, 3000);

// ボタンクリックでトップへ戻る
button.addEventListener("click", () => {
  // ローカルストレージ全消去
  localStorage.clear();

  window.location.href = "../index.html";
});
