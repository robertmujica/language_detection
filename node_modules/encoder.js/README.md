encoder.js
=======

An encoding library in JavaScript

[![build status](https://travis-ci.org/liushuping/encoder.js.svg)](https://travis-ci.org/liushuping/encoder.js.svg)

## HTML encode and decode
HTML encode an input string
```javascript
var encoder = require('encoder.js');
var input = '100 > 200 is incorrect';
var encoded = encoder.encodeHTML(input); //100&nbsp;&gt;&nbsp;200&nbsp;is&nbsp;incorrect
```

HTML decode an input string
```javascript
var encoder = require('encoder.js');
var intput = '100 &gt; 200 is incorrect';
var decoded = encoder.decodeHTML(input); //100 > 200 is incorrect
```

## HTML attribute encode and decode
HTML attribute encode an input string, this method only encode 4 characters: `&`, `<`, `'` and `"`
```javascript
var encoder = require('encoder.js');
var input = '100<200';
var encoded = encoder.encodeHTMLAttr(input); //100&lt;200

// but '>' will be not encoded
input = '200>100';
encoded = encoder.encodeHTMLAttr(input); //200>100
```
To decode HTML attribute, use `encoder.decodeHTML`

## JavaScript encode and decode
Characters `'\r\t"\n\b\f'` will be escaped to `'\\r\\t\\"\\n\\b\\f'`
```javascript
var input = '\r\t"\n\b\f';
var encoded = encoder.encodeJavaScript(input); //\r\t\"\n\b\f
```
Any control character (code < 0x20) will be encoded
```javascript
var input = String.fromCharCode(0) + String.fromCharCode(16) + String.fromCharCode(31);
var encoded = encoder.encodeJavaScript(input); //\u0000\u0010\u001f
```
Characters #133, #8232 and #8233 will be encoded
```javascript
var input = String.fromCharCode(133) + String.fromCharCode(8232) + String.fromCharCode(8233);
var encoded = encoder.encodeJavaScript(input); //\u0085\u2028\u2029
```

## XML encode and decode
XML encode has the same behavior as HTML encode except XML encode converts `'` into `&apos;`
```javascript
var input = '\'';
var encoded = encoder.xmlEncode(input); //&apos;
```

## URI encode and decode
URI encode an input string
```javascript
var encoder = require('./encoder.js');
var input = 'http://www.example.com/abc 123';
var encoded = encoder.encodeURI(input); //http://www.example.com/abc%20123
```

URI decode an input string
```javascript
var encoder = require('./encoder.js');
var input = 'http://www.example.com/abc%20123';
var decoded = encoder.decodeURI(input); //http://www.example.com/abc 123
```

## Base64 encode and decode
Base64 encode a string
```javascript
var input = 'Hello World!';
var encoded = encoder.base64Encode(input); //"SGVsbG8gV29ybGQh"
```
Decode a base64 string
```javascript
var input = 'SGVsbG8gV29ybGQh';
var encoded = encoder.base64Decode(input); //"Hello World!"
```

## Test
Make sure `mocha` is installed globally
```
npm install mocha -g
```
Run `npm test` to run unit test

## Dependencies

## License
MIT