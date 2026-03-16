const box = {
  north: {
    background: "../img/shooting_site_bg.png",
    items: [
      {
      item: "部屋",
      img: "../img/shooting_site.png",
      x: 120,
      y: 80,
      width: 480,
      height: 352,
      branch:"02",

      text: "なにこれ…",

      dolphin: "…？\nこんなのありましたっけ…？",
      },
      {
      item: "紙",
      img: "../img/paper.png",
      x: 320,
      y: 350,
      width: 32,
      height: 32,
      branch:"04",
      zoomId: "tips",
      },
    ],
  },
  east: {
    background: "../img/shooting_site_bg2.png",
    items: [
      {
      item: "ドア2",
      img: "../img/door2_closed.png",
      x: 300,
      y: 70,
      width: 160,
      height: 288,
      branch:"04",
      zoomId: "work",
      },
    ],
  },
  south: {
    background: "../img/shooting_site_bg4.png",
    items: [
      {
      item:"引き出し",
      img:"../img/drawer.png",
      img2:"../img/drawer2.png",
      x: 130,
      y: 220,
      width: 128,
      height: 192,
      branch:"06",
      zoomId: "caster",

      answer: "1230",//番号
      successBranch: "04",//変更後の値

      text: "開いてない…",
      text2: "開いた",

      dolphin: "４桁…ですね…？",
      dolphin2: "開きました！",

      successSound: "../mp3/door_open.mp3",
      },
      {
      item: "ドア1",
      img: "../img/door_open_w.png",
      x: 420,
      y: 70,
      width: 160,
      height: 288,
      branch:"05",
      url: "./1.html",
      },
    ],
  },
  west: {
    background: "../img/shooting_site_bg3.png",
    items: [
      {
      item: "ドア2",
      img: "../img/door2_closed.png",
      img2: "../img/door2_open.png",
      x: 240,
      y: 70,
      width: 160,
      height: 288,
      branch:"03",
      url: "../end/end.html",

      needItem: "長めのカギ",//使用できるアイテム
      successBranch: "05",//変わった後の内部番号

      successSound: "../mp3/door_open.mp3",//アイテム使用
      failSound: "../mp3/rock.mp3",//アイテム未所持

      //メッセージ
      text: "開かない…",
      text2: "開いた",

      dolphin: "ここも開いてないですか…？",
      dolphin2: "開きました！",
      },
      {
      item: "部屋",
      img: "../img/EXIT.png",
      x: 400,
      y: 100,
      width: 64,
      height: 32,
      branch:"02",

      text: "出口…？",

      dolphin: "ここです！ここ！",
      },
      {
      item: "リモコン",
      img: "../img/rimocon.png",
      x: 480,
      y: 340,
      width: 32,
      height: 32,
      branch:"01",
      
      text: "リモコンを拾った",
      dolphin: "電池は入ってます…\nすぐに使えます！",
      },
    ],
  },
};

const zoomBox = {
  caster: {
    background: "../img/drawer_background.png",
    items: [
      {
      item: "長めのカギ",
      img: "../img/key.png",
      x: 320,
      y:300,
      width: 96,
      height: 32,
      branch: "01",

      text: "長めのカギを拾った",

      dolphin: "このカギです！",
      },
    ]
  },
  caster2:{
    background: "../img/drawer_background.png",
    items: [

    ]
  },
  work: {
    background: "../img/shooting_site_bg4.png",
    items: [
      {
        item: "デスク",
        img: "../img/desk.png",
        x: 325,
        y: 250,
        width: 256,
        height: 160,
        branch: "04",

        zoomId: "caster2",
      },
      {
        item: "テレビ",
        img: "../img/tv.png",
        img2: "../img/tv1.png",
        x: 150,
        y: 100,
        width: 256,
        height: 160,
        branch: "03",
        needItem: "リモコン",

        successSound: "../mp3/door_open.mp3",//アイテム使用

        text: "電源に手が届かない…",
        text2: "ついた",

        dolphin: "ついてませんね…",
        dolphin2: "つきました！",

        successSound: "../mp3/door_open.mp3",//アイテム使用
      }
    ]
  },
  tips: {
    background: "../img/tips.png",
    items: [

    ]
  }
};