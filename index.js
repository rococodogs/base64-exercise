var Base64 = {}
  , characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
               + 'abcdefghijklmnopqrstuvwxyz'
               + '0123456789'
               + '+/'
    ;

function base64_encode(str) {
    var i = 0
      , len = str.length
      , out = []
      , whichbyte, prev, curr, b
        ;

    while ( i < len ) {
        whichbyte = i % 3;
        curr = str.charCodeAt(i);

        switch(whichbyte) {
            // AAAAAAAA-BBBBBBBB-CCCCCCCC
            // into
            // AAAAAA-AABBBB-BBBBCC-CCCCCC

            case 0:
                // AAAAAAAA
                // into
                //   AAAAAA
                b = curr >> 2;
                out.push(characters.charAt(b));
                break;

            case 1:
                // AAAAAAAA-BBBBBBBB
                // into
                // AABBBB
                b = ((prev & 0x03) << 4) | (curr >> 4);
                out.push(characters.charAt(b));
                break;

            case 2:
                // BBBBBBBB-CCCCCCCC
                // into
                // BBBBCC
                // and
                // CCCCCCCC into CCCCCC
                // (since we don't have a next case)
                b = ((prev & 0x0f) << 2) | (curr >> 6);
                out.push(characters.charAt(b));

                // 0x3f in binary: 0011111111
                b = (curr & 0x3f);
                out.push(characters.charAt(b));
                break;
        }

        prev = curr;
        i++;
    }

    if ( whichbyte === 0 ) {
        b = (prev & 0x03) << 4;
        out.push(characters.charAt(b));
        out.push('==');
    } else if ( whichbyte === 1 ) {
        b = (prev & 0x0f) << 2;
        out.push(characters.charAt(b));
        out.push('=');
    }

    return out.join('');
}

function base64_decode(str) {
    var i = 0
      , len = str.length
      , out = []
      , whichbyte, prev, curr, b
      , str = str.replace(/=/g, '')
        ;

    while ( i < len ) {
        // 4 groups of 6 == 3 groups of 8
        whichbyte = i % 4;
        curr = characters.indexOf(str.charAt(i));

        // getting empty characters at the end? this will skip and continue
        if ( !str.charAt(i) ) { i++; continue; }

        switch(whichbyte) {
            // working with:
            // AAAAAA-AABBBB-BBBBCC-CCCCCC
            // into
            // AAAAAAAA-BBBBBBBB-CCCCCCCC

            case 0:
                // AAAAAA, need more!
                break;

            case 1: 
                //  AAAAAA -> AAAAAA -> AAAAAA00
                //  AABBBB -> 0000AA -> 000000AA
                b = (prev << 2) | (curr >> 4);
                out.push(String.fromCharCode(b));
                break;

            case 2:
                // for AABBBB, apply 0x0f (binary 00001111), to ensure A bytes that were pushed
                // aren't there any more
                // AABBBB -> AABBBB0000 -> BBBB0000
                // BBBBCC -> 000000BBBB -> 0000BBBB
                b = ((prev & 0x0f) << 4) | (curr >> 2);
                out.push(String.fromCharCode(b));
                break;

            case 3:
                // again, we need to clear out the lingering B bytes, so we'll
                // apply a 0x03 (binary 00000011) so that only the last two 
                // bits remain
                b = ((prev & 0x03) << 6) | (curr);
                out.push(String.fromCharCode(b));
                break;
        }

        prev = curr;
        i++;
    }

    return out.join('');
}


module.exports.encode = base64_encode;
module.exports.decode = base64_decode;