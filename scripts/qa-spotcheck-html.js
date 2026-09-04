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
  const routes = [
    '/uk/buy-instagram-comments',
    '/uk/buy-tiktok-followers',
    '/ca/buy-facebook-page-likes',
    '/us/buy-instagram-likes',
    '/au/buy-tiktok-views',
  ];
  for (const route of routes) {
    const html = await get('http://localhost:3000' + route);
    const imgTags = [...html.matchAll(/<img[^>]+>/gi)].length;
    const nextImg = (html.match(/_next\/image/g) || []).length;
    const maxW = (html.match(/max-w-\[30rem\]/g) || []).length;
    const objectCover = (html.match(/object-cover/g) || []).length;
    const sharedOld = (html.match(/illustrations\/(shared|sections)\//g) || []).length;
    const markets = (html.match(/illustrations\/markets\//g) || []).length;
    const wrongPlat =
      route.includes('instagram')
        ? (html.match(/markets\/[a-z]+\/(tiktok|facebook)-/g) || []).length
        : route.includes('tiktok')
          ? (html.match(/markets\/[a-z]+\/(instagram|facebook)-/g) || []).length
          : (html.match(/markets\/[a-z]+\/(instagram|tiktok)-/g) || []).length;
    console.log(
      route,
      JSON.stringify({ imgTags, nextImg, maxW30: maxW, objectCover, sharedOld, markets, wrongPlat }),
    );
  }
})();
