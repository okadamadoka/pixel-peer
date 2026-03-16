// ページ読み込み時に呼び出す
//window.addEventListener("DOMContentLoaded", hideCollectedItemAndArrows);
let collected = JSON.parse(localStorage.getItem("collectedItems")) || [];
let played = JSON.parse(localStorage.getItem("played_sounds") || "[]");
let solved = JSON.parse(localStorage.getItem("puzzleSolved") || "[]");

const directions = ["north", "east", "south", "west"];
let currentDirectionIndex = 0;
// ---------------------------
// 現在表示中のエリア管理（貼るだけでOK）
// ---------------------------

// currentArea に「今見てるキー」を保存する
// 例: "north", "east", "doa"（拡大画面の id をそのままキーにする想定）
let currentArea = directions[0];
// 表示モードのフラグ（通常: "room", 拡大: "zoom"）
let currentMode = "room";

// getAreaName() は currentArea を返す。null のときは directions から fallback
/**
 * 今の部屋番号を聞きに行く関数
 */
function getAreaName() {
  if (currentArea) return currentArea;

  // 既存の directions を使っているなら fallback を返す（今まではこれだけだった）
  if (typeof directions !== "undefined" && Array.isArray(directions)) {
    return directions[currentDirectionIndex] || directions[0];
  }

  return null;
}
// スタックを追加
let areaStack = []; // 部屋・ズーム履歴

// 「通常の部屋」に入る（呼ぶだけで currentArea が更新され、items 再描画）
function enterArea(areaKey) {
    currentMode = "room";
    // 今の状態を積む
    areaStack.push({ area: currentArea, mode: currentMode });
    currentArea = areaKey;
    console.log("[enterArea] 現在のエリアを更新:", currentArea, "mode:", currentMode);
    loadItemsFromRoom(getAreaName());
}

// 「拡大（zoom）」に入る（zoom の key をセット。zoomBox のキーと一致させる）
function enterZoom(zoomKey) {
    currentMode = "zoom";
    // 今の状態を積む
    areaStack.push({ area: currentArea, mode: currentMode });
    currentArea = zoomKey;
    console.log("[enterZoom] 拡大表示へ:", currentArea, "mode:", currentMode);
    loadItemsFromRoom(getAreaName());
}

// 戻る処理
function goBack() {
    if(areaStack.length > 0) {
        const prev = areaStack.pop(); // 一つ前の状態を取り出す
        currentArea = prev.area;
        currentMode = prev.mode;
        console.log("[goBack] 戻る処理:", currentArea, "mode:", currentMode);
        loadItemsFromRoom(getAreaName());
    } else {
        console.log("[goBack] これ以上戻れません");
    }
}
//矢印を出すか出さないか
function updateArrows() {
  if (currentMode === "room") {
    arrowLeft.style.display = "block";
    arrowRight.style.display = "block";
    arrowBottom.style.display = "none";
  } else if (currentMode === "zoom") {
    arrowLeft.style.display = "none";
    arrowRight.style.display = "none";
    arrowBottom.style.display = "block";
  }
}

// ---------------------------
// ヒント：既存コードの修正点（メモ）
// ---------------------------
// - 既に `const areaName = getAreaName();` のように一度だけ取得している書き方がある場合は削除。
//   代わりに必要なタイミングで `getAreaName()` を直接呼ぶ形にする。
// - 部屋移動やズームを行う関数（ボタン・クリックハンドラ等）では
//   enterArea("north") / enterZoom("doa") を呼ぶようにする。
// - loadItemsFromRoom(getAreaName()) を呼ぶと、現在の currentArea を元に描画するようになる。
// ---------------------------

const gameContainer = document.getElementById('game-container');
const arrowTop = document.querySelector('.arrow-top');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const arrowBottom = document.querySelector('.arrow-bottom');

let currentIndex = 0;
let items = [];
let itemDivs = [];
let gameMode = "normal";    // normal / zoom
let zoomTarget = null;      // 拡大表示するアイテムデータ

// アイテム一覧を生成して表示（外部データを使う）＋背景設定
/**
 * 背景+アイテムの描写
 */
function loadItemsFromRoom(areaName) {
  // 🔍 まず通常の部屋を探す
  let room = box[areaName];

  // 🔍 なければ zoomBox から探す（拡大画面）
  if (!room) room = zoomBox[areaName];
  if (!room) return; // どっちにもないとき

  items = room["items"];
  const backgroundImage = room["background"];

  // 拾ったアイテムリストを復元
  let collected = JSON.parse(localStorage.getItem("collectedItems")) || [];
  let played = JSON.parse(localStorage.getItem("played_sounds") || "[]");
  let solved = JSON.parse(localStorage.getItem("puzzleSolved") || "[]")

  const collectedItemsData = items.filter(i => collected.includes(i.item));
  console.log("拾ったことのあるアイテムの詳細:", collectedItemsData);

  // 前の内容をリセット
  gameContainer.innerHTML = '';
  itemDivs = [];
  currentIndex = 0;

  // 🔁 背景を設定する（backgroundImage がある場合）
  if (backgroundImage) {
    gameContainer.style.backgroundImage = `url("${backgroundImage}")`;
    //gameContainer.style.backgroundSize = 'cover';
    gameContainer.style.backgroundPosition = 'center';
    gameContainer.style.imageRendering = 'pixelated';
  } else {
    // 背景が無い部屋は白などのデフォルトを出す
    gameContainer.style.backgroundImage = 'none';
  };

  // アイテム再描画！
  items.forEach(el => {
    if (collected.includes(el.item)) return;
    const img = document.createElement('img');
    // 🔒 非表示アイテムはスキップ
    if (el.hidden) return;
    
    // ★ 謎解き済みなら branch を強制変更
    if (solved.includes(el.item)) {
      el.branch = "04";
    }
    //★ 使用済みなら img2、未使用なら img
    if ((played.includes(el.item) || solved.includes(el.item)) && el.img2) {
      img.src = el.img2;
    } else {
      img.src = el.img;
    }

    img.className = 'item';
    img.dataset.item = el.item;
    img.style.userSelect = 'none';
    img.style.left = `${el.x}px`;
    img.style.top = `${el.y}px`;
    img.style.width = `${el.width}px`;
    img.style.height = `${el.height}px`;
    img.style.cursor = "pointer";

    gameContainer.appendChild(img);
    itemDivs.push(img);
  });

  updateArrows();
  attachItemEvents();
}

/**
 * アイテムの処理
 */
function attachItemEvents() {
  itemDivs.forEach(div => {
    
    div.addEventListener('click', () => {
      const itemName = div.dataset.item;
      const clicked = items.find(i => i.item === itemName);

      if (!clicked) return;

      // ------------------------------------------------------
      // 🌟 先に action を実行！（branch 変更などをここで先にやる）
      // ------------------------------------------------------
      const action = box[clicked.item];
      if (action) action(clicked);

      // ------------------------------------------------------
      // 🌟 action の結果を利用して branch 分岐処理を実行！
      // ------------------------------------------------------


      switch (clicked.branch) {

        /*
          case "00":  // スマホを拾う
          closedhone(clicked, div);
          Smartphoneget(clicked, div);
          break;
        */
        case "01":  // 拾う
          handlePickUp(clicked, div);
          showItemAction(clicked);
          break;

        case "02":  
          showItemAction(clicked);
          break;

        case "03":
          const success = handleUse(clicked);

          showItemAction(clicked); // ← 成功・失敗どっちでも出す

          if (success) {
            if (!played.includes(clicked.item)) {
              played.push(clicked.item);
              localStorage.setItem("played_sounds", JSON.stringify(played));
            }
          }
          break;

        case "04":  // 拡大
          if (!clicked.zoomId) {
            return;
          }
          // ① 今の状態をスタックに保存
          areaStack.push({ area: currentArea, mode: currentMode });

          // ② currentArea と currentMode を更新
          currentArea = clicked.zoomId;
          currentMode = "zoom";
          console.log("🔍 拡大画面 → " + clicked.zoomId);

          // ③ アイテム再描写
          loadItemsFromRoom(clicked.zoomId);

          // ④ 矢印表示
          arrowLeft.style.display = "none";
          arrowRight.style.display = "none";
          arrowBottom.style.display = "block"; // 戻るだけ表示
          break;

        case "05":
          console.log(`使用: ${clicked.item}`);
          showItemAction(clicked);
          window.location.replace(clicked.url);
          break;

        case "06":
          showTenKey(result => {
            // itemActions が設定した答えを参照
            if (result === clicked.answer) {
              if (!solved.includes(clicked.item)) {
                solved.push(clicked.item);
                localStorage.setItem("puzzleSolved", JSON.stringify(solved));
              }
                showItemAction(clicked); // ← ここだけ！
                // itemActions で定義した onOpen があれば実行
                if (clicked.successBranch) {
                  clicked.branch = clicked.successBranch;
                  playSuccessSound(clicked);
                }
            } else {
                showItemAction(clicked);
              }
          });
          break;

        case "07":
          break;
      }
      
    });
  });
}

/**
 * アイテム使用後の描写処理
 */
function useItem(itemName) {
  let played = JSON.parse(localStorage.getItem("played_sounds") || "[]");

  if (!played.includes(itemName)) {
    played.push(itemName);
    localStorage.setItem("played_sounds", JSON.stringify(played));
  }
}

/**
 * 左右の矢印のイベントセット
 */
function setupNavigation() {
  arrowLeft.addEventListener('click', () => {
    currentDirectionIndex = (currentDirectionIndex - 1 + directions.length) % directions.length;

    currentArea = directions[currentDirectionIndex];  // ★更新！
    loadItemsFromRoom(currentArea);                   // ★その部屋を描く！
  });

  arrowRight.addEventListener('click', () => {
    currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;

    currentArea = directions[currentDirectionIndex];  // ★更新！
    loadItemsFromRoom(currentArea);                   // ★その部屋を描く！
  });
}

/**
 * 拡大切り替え(戻る)
 */
arrowBottom.addEventListener('click', () => {
  //🔙 元の方向へ戻る
  if(areaStack.length > 0){
    const prev = areaStack.pop();
    currentArea = prev.area;
    currentMode = prev.mode;
    loadItemsFromRoom(getAreaName()); // ←ここで画面再描写
  }
});

// 初期化
setupNavigation();
loadItemsFromRoom(getAreaName());  // 最初に表示する部屋と方向