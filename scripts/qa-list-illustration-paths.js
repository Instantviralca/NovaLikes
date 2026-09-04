const http = require('http');

function get(url) {
  return new Promise((res, rej) => {
    http.get(url, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => res(d));
    }).on('error', rej);
  });
}

(async () => {
  const html = await get('http://localhost:3000/uk/buy-instagram-comments');
  const all = [...html.matchAll(/\/assets\/images\/illustrations\/[A-Za-z0-9_\-\/.]+/g)].map((m) =>
    m[0].split('?')[0],
  );
  const uniq = [...new Set(all)];
  const markets = uniq.filter((u) => u.includes('/markets/'));
  const other = uniq.filter((u) => !u.includes('/markets/'));
  console.log('markets', markets.length);
  console.log('other');
  other.forEach((o) => console.log(o));
})();
