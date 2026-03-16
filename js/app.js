// 読み込み
let saved = JSON.parse(localStorage.getItem("inventory") || "[]");
// データをオブジェクトで管理（連想配列的に）
const map = [
  {
    name: "真っ白な部屋",
    link: "./1.html",
    img: "1"
  },
  {
    name: "撮影現場",
    link: "./2.html",
    img: "2"
  },
  {
    name: "家？",
    link: "./3.html",
    img: "3"
  },
  {
    name: "深海",
    link: "./4.html",
    img: "4"
  },
  {
    name: "図書館",
    link: "./5.html",
    img: "5"
  },
];

let inventory = saved.length > 0 ? saved : [
  ["" ,"" ],
  ["" ,"" ],
  ["" ,"" ],
  ["" ,"" ],
];

const dolphinData = [
  {
      img: "../img/iruka.gif",
      dialogs: [
      "非常口のある扉の先が\n目的地です！",
      "どうしてこんなにも…\n鍵がかかってるんです…？",
      "大丈夫ですよ！\nお家はすぐですから！"
      ]
  },
];

const keys = [
  {
    text:"マップ",
    key:['2', '3', '4', '5','404'],
  },
  {
    text:"インベントリ",
    key:['inventory'],
  },
  {
    text:"入手履歴",
    key:['collectedItems'],
  },
  {
    text:"mp3",
    key:['played_sounds'],
  },
  {
    text:"キーパッド",
    key:['puzzleSolved'],
  },
    {
    text:"スマホ以外の全部",
    key:['2', '3', '4', '5','404','inventory','collectedItems','played_sounds','puzzleSolved'],
  },
];
const reset = [
  {
    text:"最初から始める",
  },
];
const youso = [
  /*
  {
      name: "イルカ",
      data: dolphinData
  },
  
  {
      name: "マップ",
      data: map
  },
  */
  {
      name: "インベントリ",
      data: inventory
  },
  /*
  {
      name: "デバッグ用",
      data: keys
  },
  */
  {
      name: "リセット",
      data: reset
  },
  //{ name: "カメラ", data: loor },
];