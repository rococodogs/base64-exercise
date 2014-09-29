var tape   = require('tape')
  , base64 = require('./index')
    ;

tape('encodes string into base64', function(t) {
    t.equal(base64.encode('dark dungeons'), 'ZGFyayBkdW5nZW9ucw==');
    t.equal(base64.encode('dark dungeons\n'), 'ZGFyayBkdW5nZW9ucwo=');
    t.end();
});

tape('decodes string from base64', function(t) {
    t.equal(base64.decode('ZGFyayBkdW5nZW9ucw=='), 'dark dungeons');
    t.equal(base64.decode('ZGFyayBkdW5nZW9ucwo='), 'dark dungeons\n');
    t.end();
});