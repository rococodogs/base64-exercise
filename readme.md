base64 encoding + decoding
==========================

exercise working through Nicholas Zakas' great article [Computer science in JavaScript: Base64 encoding](http://www.nczonline.net/blog/2009/12/08/computer-science-in-javascript-base64-encoding/) to learn how Base64 works. not encluded: the pages of pen + paper translating that preceded this.

usage
-----
```javascript
var Base64 = require('./');

console.log(Base64.encode('dark dungeons'));
// ZGFyayBkdW5nZW9ucw==

console.log(Base64.decode('ZGFyayBkdW5nZW9ucw=='));
// 'dark dungeons'
```