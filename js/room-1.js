const box = {
  north: {
    background: "../img/white.png",
    items: [
      {
      item: "ドア",
      img: "../img/door_closed.png",
      img2: "../img/door_open_b.png",
      x: 160,
      y: 70,
      width: 160,
      height: 288,
      branch:"03",
      url: "./2.html",

      needItem: "カギ",//使用できるアイテム
      successBranch: "05",//変わった後の内部番号

      successSound: "../mp3/door_open.mp3",//アイテム使用
      failSound: "../mp3/rock.mp3",//アイテム未所持
      
      //メッセージ
      text: "開かない…",
      text2: "開いた",

      dolphin: "開いていませんね…？\n…カギを探しましょうか",
      dolphin2: "開きました！",
      },
      /*
      {
      item: "スマホ",
      img: "../img/item_hone.png",
      x: 70,
      y: 90,
      width: 128,
      height: 64,
      branch:"00",
      text: "スマホを拾った"
      },
      */
    ],
  },
  east: {
    background: "../img/white.png",
    items: [
    
    ],
  },
  south: {
    background: "../img/white.png",
    items: [
      {
      item: "あな？",
      img: "../img/cursor_1.png",
      img2: "../img/cursor_2.png",
      x: 330,
      y: 180,
      width: 32,
      height: 64,
      branch:"03",

      needItem: "カーソル",
      successBranch: "03",

      successSound: "../mp3/door_open.mp3",//アイテム使用
      revealItem: "カギ",//出てくるアイテム

      text: "変な穴…",
      text2: "ピッタリはまってる…",

      dolphin: "あな…ですね？",
      dolphin2: "ピッタリです！",
      },
      {
        item: "カギ",
        img: "../img/key.png",
        x: 200,
        y: 380,
        width: 64,
        height: 32,
        branch: "01",
        hidden: true,//見えないときに使う

        text: "カギを拾った",

        dolphin: "カギです！カギ！",
      }
    ],
  },
  west: {
    background: "../img/white.png",
    items: [
      {
      item: "カーソル",
      img: "../img/cursor.png",
      x: 480,
      y: 380,
      width: 64,
      height: 32,
      branch:"01",

      text: "なんだろこれ…",

      dolphin: "カーソル…ですかね？",
      },
    ],
  },
};