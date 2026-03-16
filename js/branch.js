/**
 * スマホ専用の登録
 *
 * @param {string} clicked - 一回取得したものをはじいた後のアイテム
 * @param {string} div - itemDivs div - 情報は連想配列から
 * @returns {void}
 */
function Smartphoneget(clicked, div) {
  const itemp3 = new Audio("../mp3/item.mp3");
  itemp3.load();

  // 画面から削除
  div.remove();
  itemp3.play();

  console.log(`${clicked.item} を追加しました！`);

  // スマホ向けにアイテムを保存
  localStorage.setItem("smartphoneItem", clicked.item);

  // 拾ったアイテム記録
  let collected = JSON.parse(localStorage.getItem("collectedItems")) || [];
  collected.push(clicked.item);
  localStorage.setItem("collectedItems", JSON.stringify(collected));
  hideCollectedItemAndArrows();
}
/**
 * 01アイテムのインベントリ用登録
 *
 * @param {string} clicked - 一回取得したものをはじいた後のアイテム
 * @param {string} div - itemDivs div - 情報は連想配列から
 */
function handlePickUp(clicked, div) {
  const itemp3 = new Audio("../mp3/item.mp3");
  itemp3.load();

  let added = false;

  for (let row = 0; row < inventory.length; row++) {
    for (let col = 0; col < inventory[row].length; col++) {
      if (inventory[row][col] === "") {

        // 画面から削除
        div.remove();
        itemp3.play();

        // インベントリに追加
        inventory[row][col] = clicked.item;
        added = true;

        console.log(`スロット[${row}][${col}] に ${clicked.item} を追加しました！`);

        // 保存
        localStorage.setItem("inventory", JSON.stringify(inventory));
        updateView();

        // 拾ったアイテム記録
        let collected = JSON.parse(localStorage.getItem("collectedItems")) || [];
        collected.push(clicked.item);
        localStorage.setItem("collectedItems", JSON.stringify(collected));

        break;
      }
    }
    if (added) break;
  }

  if (!added) {
    console.log("⚠️ インベントリがいっぱい！");
  }
}
// ＊正しくは使用したアイテムの保存 ↓
/**
 * 使用できるアイテム
 * 
 * @param {string} itemName - 対応するアイテム名（01のアイテム）
 */
function removeItemFromInventory(itemName) {
  // flatten
  let flatInventory = inventory.flat();

  // itemName を削除
  flatInventory = flatInventory.filter(i => i !== itemName);

  // 空スロット補充
  while (flatInventory.length < inventory.length * inventory[0].length) {
    flatInventory.push("");
  }

  // 二次元に戻す
  let rows = inventory.length;
  let cols = inventory[0].length;
  inventory = [];
  for (let r = 0; r < rows; r++) {
    inventory.push(flatInventory.slice(r * cols, (r + 1) * cols));
  }

  // ローカル保存＆画面更新
  localStorage.setItem("inventory", JSON.stringify(inventory));
  updateView();
}

//メッセージを消去
function clearAllMessages() {
  // 中央メッセージを消す
  document.querySelectorAll(".center-message").forEach(msg => {
    msg.remove();
  });
}

  // 吹き出し
function showCenterMessage(text) {
  loadItemsFromRoom(getAreaName());
  clearAllMessages(); // ★ 先に消す！
  const msg = document.createElement("div");
  msg.className = "center-message";
  msg.textContent = text;
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("fade-out");
    setTimeout(() => msg.remove(), 600);
  }, 1800);
}

//メッセージ用
function showActionMessage(messages) {
  let played = JSON.parse(localStorage.getItem("played_sounds") || "[]");
  let solved = JSON.parse(localStorage.getItem("puzzleSolved") || "[]");

  const isPlayed = played.includes(messages.item); // ← ここ重要！！
  const issolved = solved.includes(messages.item); // ← ここ重要！！
  
  let message;

    switch (messages.branch) {
    
    case "00":
    case "01":
    case "02":
      message =  messages.text;
    break;

    case "03":
      message = isPlayed ? messages.text2 : messages.text;
    break;

    case "05":
        message = messages.text2;
      //保険のかけ方
      //message = message ?? messages.text ?? messages.dolphin;
    break;

    case "06":
        message = issolved ? messages.text2 : messages.text;
      break;
  }

  if (!message) return;
    showCenterMessage(message);
}
function showItemAction(clicked) {
  showActionMessage(clicked);
}

/**
 * 指定されたアイテムのサウンドを初回のみ再生
 *
 * @param {string} item - 再生対象となるアイテム名
 * @returns {void}
 */
function playSoundOnce(item) {
    // 配列を取り出す（なかったら空配列）
    let played = JSON.parse(localStorage.getItem("played_sounds") || "[]");

    // すでに鳴らしたアイテムは無視
    if (played.includes(item)) {

        // 配列に追加
        played.push(item);

        // 保存しなおす
        localStorage.setItem("played_sounds", JSON.stringify(played));
        return;
    }

}

function showTenKey(callback) {

  let old = document.querySelector(".tenkey-modal");
  if (old) old.remove();

  // モーダル背景
  const modal = document.createElement("div");
  modal.className = "tenkey-modal";

  // 中身
  const panel = document.createElement("div");
  panel.className = "tenkey-panel";
  modal.appendChild(panel);

  const display = document.createElement("div");
  display.className = "tenkey-display";
  display.textContent = "";
  panel.appendChild(display);

  // ⭐ 数字 + 特殊キーまとめ
  const keys = [
    "1","2","3",
    "4","5","6",
    "7","8","9",
    "0",
    { type: "del", label: "消す" },
    { type: "ok", label: "  決定" }
  ];

  const container = document.createElement("div");
  container.className = "tenkey-buttons";
  panel.appendChild(container);

  keys.forEach(k => {
    const btn = document.createElement("button");
    btn.className = "tenkey-btn";

    // 数字キー
    if (typeof k === "string") {
      btn.textContent = k;

      btn.onclick = () => {
        if (display.textContent.length < 4)
          display.textContent += k;
      };

    } else {
      // 特殊キー
      btn.textContent = k.label;

      if (k.type === "del") {
        btn.onclick = () => {
          display.textContent = display.textContent.slice(0, -1);
        };
      }

      if (k.type === "ok") {
        btn.onclick = () => {
          const result = display.textContent;
          modal.remove();
          callback(result);
        };
      }
    }

    container.appendChild(btn);
  });
  
  // ⭐ 背景クリックで閉じる（モーダル式）
  modal.onclick = e => {
    if (e.target === modal) modal.remove();
  };

  document.body.appendChild(modal);
}


function playFailSound(item) {
  if (!item.failSound) return;

  const audio = new Audio(item.failSound);
  audio.load();
  audio.play();
}
function playSuccessSound(item) {
  if (!item.successSound) return;

  playSoundOnce(item.successSound);
}
function handleUse(item) {
  const collected = JSON.parse(localStorage.getItem("collectedItems")) || [];

  if (item.needItem && !collected.includes(item.needItem)) {
    playFailSound(item);
    return false; // ← 成功してない
  }

  if (item.needItem) {
    removeItemFromInventory(item.needItem);
  }

  if (item.revealItem) {
    const room = box[getAreaName()] || zoomBox[getAreaName()];
    const target = room.items.find(i => i.item === item.revealItem);
    if (target) target.hidden = false;
  }

  if (item.successBranch) {
    item.branch = item.successBranch;
  }

  useItem(item.item);
  loadItemsFromRoom(getAreaName());

  if (item.successSound) {
    playSuccessSound(item);
  }

  return true; // ← 成功！
}