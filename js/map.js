function checkVisitedLinks() {
  let keys = ['2', '3', '4', '5'];
  let visited = keys.flatMap(key => {
  // localStorageから取得してJSONに変換。無ければ空配列
    return JSON.parse(localStorage.getItem(key) || '[]');
  });
  // まず全部非表示
  document.querySelectorAll('#item-link a').forEach(a => a.style.display = 'none');

  // 「真っ白な部屋」は常に表示
  const firstRoom = document.querySelector('#item-link a[href="./1.html"]');
  if (firstRoom) firstRoom.style.display = 'inline';

  // visited に入っているリンクは全部表示
  visited.forEach(link => {
    const aTag = document.querySelector(`#item-link a[href="${link}"]`);
    if (aTag) aTag.style.display = 'inline';
  });
  /*
  // 3. 特定の一か所だけ消す
  const firstRoom404 = document.querySelector('#item-link a[href="./404.html"]');
  if (firstRoom404) firstRoom404.style.display = 'none';
  */
}

// クリックイベントは一度だけ追加
if (!window.visitedEventAdded) {
  document.querySelectorAll('#item-link a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      let visited = JSON.parse(localStorage.getItem('visited') || '[]');
      if (!visited.includes(href)) {
        visited.push(href);
        localStorage.setItem('visited', JSON.stringify(visited));
      }
      checkVisitedLinks(); // クリック後に表示更新
    });
  });
  window.visitedEventAdded = true;
}