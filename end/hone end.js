let cIndex = 0;

// 表示を更新する関数
function updateView() {
  const nameElem = document.getElementById('item-name');
  const linkElem = document.getElementById('item-link');
  const textdiv = document.getElementById('dolphinTalk');
  const back = document.querySelector('.phoneScreen');
  const reset = document.querySelector('.hone-reset');
  
  // 一回クリア
  linkElem.innerHTML = '';
  linkElem.classList.remove("kari","dolphin","map");
  let inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
  //const inventory = savedInventory;  // ← これが大事！変数に入れる
  back.style.backgroundImage = 'url("../img/background.png")';


  // 現在のカテゴリを取得
  const current = youso[cIndex];
  nameElem.textContent = current.name;
  nameElem.classList.add("fixed");
  //linkElem.classList.add(""); あとでセットクラスを入れる

  let isTalking = false;
  // カテゴリごとに表示方法を変える
  if (current.name === "イルカ") {
  // 画像出力
    current.data.forEach(el => {
      const img = document.createElement('img');
      img.src = el.img;
      linkElem.classList.add("kari");
      //textdiv.classList.add("windou");
      img.classList.add("dolphin");
      const dolphinp3 = new Audio("../mp3/piko.mp3");
      img.style.imageRendering = 'pixelated';

      img.addEventListener("click", () => {
        if (isTalking) return; // ロック中は無視
        clearAllMessages(); // ★ 先に消す！
        isTalking = true;

        //const text = pickDialogSmart(el);//乱数は上の関数を使用

        textdiv.textContent = text;
        textdiv.innerHTML = text.replace(/\n/g, "<br>");
        textdiv.style.display = "block";
        dolphinp3.play();
        
        setTimeout(() => {
          textdiv.style.display = "none"; 
          isTalking = false; // 解錠！
        }, 1500); // 秒数固定
      });

      linkElem.appendChild(img);
      back.appendChild(textdiv);
    });
  }
  else if (current.name === "マップ") {
    // 🗺️ マップは画像とaタグいっぱい
    current.data.forEach(el => {
      back.style.backgroundImage = 'url("../img/background.png")';
      const a = document.createElement('a');
      a.classList.add("map");
      a.textContent = el.name;
      a.href = el.link;
      linkElem.appendChild(a);
      linkElem.appendChild(document.createElement('br'));
      checkVisitedLinks();
    });
  } 
  else if (current.name === "インベントリ") {
      inventory.forEach(el => {
        back.style.backgroundImage = 'url("../img/background.png")';
        const line = document.createElement('div');
        line.textContent = el.join('  ');
        linkElem.appendChild(line);
      });
  }
  else if (current.name === "デバッグ用") {
    current.data.forEach(el => {
      back.style.backgroundImage = 'url("../img/background.png")';
      const textdiv = document.createElement('div');
      textdiv.textContent = el.text;
      textdiv.style.cursor = 'pointer';
      linkElem.appendChild(textdiv);
      textdiv.addEventListener("click", () => {
        el.key.forEach(k => {
          localStorage.removeItem(k);
        });
        console.log(`${el.text}を消しちゃった…(´・ω・｀)`);
      });
    });
  }
  else if (current.name === "リセット") {
    current.data.forEach(el => {
      back.style.backgroundImage = 'url("../img/background.png")';
      const textdiv = document.createElement('div');
      textdiv.textContent = el.text;
      textdiv.style.cursor = 'pointer';
      linkElem.appendChild(textdiv);
      textdiv.addEventListener("click", () => {
        localStorage.clear();
        window.location.replace('../index.html')
      });
    });
  }
}
  // 矢印クリックでインデックスを前後に
document.querySelector('.hone-reset').addEventListener('click', () => {
  cIndex = (cIndex + 1) % youso.length;
  updateView();
});
function button1(){
  const nexIndex = (cIndex + 1) % youso.length;
  reset.textContent = youso[nexIndex];
}
updateView();
button1();