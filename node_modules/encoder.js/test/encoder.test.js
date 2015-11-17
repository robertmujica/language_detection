var assert = require('assert');
var encoder = require('../encoder.js');

describe('#encodeHTML', function() {
	it('should encode < to &lt;', function() {
		var input = '100<200';
		var encoded = encoder.encodeHTML(input);
		assert.strictEqual(encoded, '100&lt;200');
	});

	it('should encode > to &gt;', function() {
		var input = '200>100';
		var encoded = encoder.encodeHTML(input);
		assert.strictEqual(encoded, '200&gt;100');
	});

	it('should encode withe space to &nbsp;', function() {
		var input = 'one two three';
		var encoded = encoder.encodeHTML(input);
		assert.strictEqual(encoded, 'one&nbsp;two&nbsp;three');
	});

	it('should encode & to &amp;', function() {
		var input = 'A&B';
		var encoded = encoder.encodeHTML(input);
		assert.strictEqual(encoded, 'A&amp;B');
	});

	it('should encode \' to &#39;', function() {
		var input = 'Hello\'';
		var encoded = encoder.encodeHTML(input);
		assert.strictEqual(encoded, 'Hello&#39;');
	});

	it('should encode " to &quot;', function() {
		var input = '"Hello"';
		var encoded = encoder.encodeHTML(input);
		assert.strictEqual(encoded, '&quot;Hello&quot;');
	});
});

describe('#decodeHTML', function() {
	it('should decode &lt; to <', function() {
		var input = '100&lt;200';
		var decoded = encoder.decodeHTML(input);
		assert.strictEqual(decoded, '100<200');
	});

	it('should decode &gt; to >', function() {
		var input = '200&gt;100';
		var decoded = encoder.decodeHTML(input);
		assert.strictEqual(decoded, '200>100');
	});

	it('should decode &nbsp; to white space', function() {
		var input = 'one&nbsp;two&nbsp;three';
		var decoded = encoder.decodeHTML(input);
		assert.strictEqual(decoded, 'one two three');
	});

	it('should decoded &amp; to &', function() {
		var input = 'A&amp;B';
		var decoded = encoder.decodeHTML(input);
		assert.strictEqual(decoded, 'A&B');
	});

	it('should decode &#39; to \'', function() {
		var input = 'Hello&#39;';
		var decoded = encoder.decodeHTML(input);
		assert.strictEqual(decoded, 'Hello\'');
	});

	it('should decode &#quot; to "', function() {
		var input = '&quot;Hello&quot;';
		var decoded = encoder.decodeHTML(input);
		assert.strictEqual(decoded, '"Hello"');
	});
});

describe('#encodeHTMLAttr', function() {
	it('should encode < to &lt;', function() {
		var input = '100<200';
		var encoded = encoder.encodeHTMLAttr(input);
		assert.strictEqual(encoded, '100&lt;200');
	});

	it('should not encode > to &gt;', function() {
		var input = '200>100';
		var encoded = encoder.encodeHTMLAttr(input);
		assert.strictEqual(encoded, '200>100');
	});

	it('should not encode withe space to &nbsp;', function() {
		var input = 'one two three';
		var encoded = encoder.encodeHTMLAttr(input);
		assert.strictEqual(encoded, 'one two three');
	});

	it('should encode & to &amp;', function() {
		var input = 'A&B';
		var encoded = encoder.encodeHTMLAttr(input);
		assert.strictEqual(encoded, 'A&amp;B');
	});

	it('should encode \' to &#39;', function() {
		var input = 'Hello\'';
		var encoded = encoder.encodeHTMLAttr(input);
		assert.strictEqual(encoded, 'Hello&#39;');
	});

	it('should encode " to &quot;', function() {
		var input = '"Hello"';
		var encoded = encoder.encodeHTMLAttr(input);
		assert.strictEqual(encoded, '&quot;Hello&quot;');
	});
});

describe('xmlEncode', function() {
	it('should encode \' to &apos;.', function() {
		var input = '\'',
			encoded = encoder.xmlEncode(input);

		assert.strictEqual(encoded, '&apos;');
	});
});

describe('#encodeURI', function() {
	it('should encode white space to %20', function() {
		var input = 'http://www.example.com/abc 123';
		var encoded = encoder.encodeURI(input);
		assert.strictEqual(encoded, 'http://www.example.com/abc%20123');
	});
});

describe('#decodeURI', function() {
	it('should decode %20 to white space', function() {
		var input = 'http://www.example.com/abc%20123';
		var decoded = encoder.decodeURI(input);
		assert.strictEqual(decoded, 'http://www.example.com/abc 123');
	});
});

describe('#encodeURIComponent', function() {
	it('should encode : to %3A', function() {
		var input = ':';
		var encoded = encoder.encodeURIComponent(input);
		assert.strictEqual(encoded, '%3A');
	});

	it('should encode / to %2F', function() {
		var input = '//';
		var encoded = encoder.encodeURIComponent(input);
		assert.strictEqual(encoded, '%2F%2F');
	});
});

describe('#decodeURIComponent', function() {
	it('should decode %3A to :', function() {
		var input = '%3A';
		var decoded = encoder.decodeURIComponent(input);
		assert.strictEqual(decoded, ':');
	});

	it('should encode %2F to /', function() {
		var input = '%2F%2F';
		var decoded = encoder.decodeURIComponent(input);
		assert.strictEqual(decoded, '//');
	});
});

describe('#encodeJavaScript', function() {
	it('should escape special characters.', function() {
		var input = '\r\t"\n\b\f',
			encoded = encoder.encodeJavaScript(input);

		assert.strictEqual(encoded, '\\r\\t\\"\\n\\b\\f');
	});

	it('should encode character #133, #8232 and #8233.', function() {
		var input = String.fromCharCode(133) + String.fromCharCode(8232) + String.fromCharCode(8233),
			encoded = encoder.encodeJavaScript(input);

		assert.strictEqual(encoded, '\\u0085\\u2028\\u2029');
	});

	it('should encode any control chracter.', function() {
		var input = String.fromCharCode(0) + String.fromCharCode(16) + String.fromCharCode(31),
			encoded = encoder.encodeJavaScript(input);

		assert.strictEqual(encoded, '\\u0000\\u0010\\u001f');
	});

	it('should not encode non-control characters.', function() {
		var input = String.fromCharCode(32),
			encoded = encoder.encodeJavaScript(input);

		assert.strictEqual(encoded, ' ');
	})
});

describe('#base64Encode', function() {
	it('should encode text to base64 string.', function() {
		var input = 'Hello World!',
			encoded = encoder.base64Encode(input);

		assert.strictEqual(encoded, "SGVsbG8gV29ybGQh");
	});
});

describe('#base64Decode', function() {
	it('should decode base64 string to text.', function() {
		var input = 'SGVsbG8gV29ybGQh',
			encoded = encoder.base64Decode(input);

		assert.strictEqual(encoded, "Hello World!");
	});
});