function Encoder() {}

Encoder.prototype.encodeHTML = function(str) {
  var encoded = this.encodeHTMLAttr(str);
  encoded = encoded.replace(/>/g, '&gt;');
  encoded = encoded.replace(/ /g, '&nbsp;');

  return encoded;
};

Encoder.prototype.decodeHTML = function(str) {
  var decoded = '';

  if (str === undefined || str.length === 0) {
    return decoded;
  }

  decoded = str.replace(/&amp;/g, '&');
  decoded = decoded.replace(/&lt;/g, '<');
  decoded = decoded.replace(/&#39;/g, '\'');
  decoded = decoded.replace(/&quot;/g, '"');
  decoded = decoded.replace(/&gt;/g, '>');
  decoded = decoded.replace(/&nbsp;/g, ' ');

  return decoded;
};

Encoder.prototype.encodeHTMLAttr = function(str) {
  var encoded = '';

  if (str === undefined || str.length === 0) {
    return encoded;
  }

  encoded = str.replace(/&/g, '&amp;');
  encoded = encoded.replace(/</g, '&lt;');
  encoded = encoded.replace(/\'/g, '&#39;');
  encoded = encoded.replace(/"/g, '&quot;');

  return encoded;
};

Encoder.prototype.encodeJavaScript = function(str) {
  function dec2hex(i) {
    var val = i.toString(16);
    if (i >= 0 && i <= 15) {
      return "\\u000" + val;
    } else if (i >= 16 && i <= 255) {
      return "\\u00" + val;
    } else if (i >= 256 && i <= 4095) {
      return "\\u0" + val;
    } else if (i >= 4096 && i <= 65535) {
      return "\\u" + val;
    }
  }

  function convert(c, code) {
    switch (code) {
      case 13:
        return '\\r';
      case 9:
        return '\\t';
      case 34:
        return '\\\"';
      case 92:
        return '\\\\';
      case 10:
        return '\\n';
      case 8:
        return '\\b';
      case 12:
        return '\\f';
      case 133:
        return '\\u0085';
      case 8232:
        return '\\u2028';
      case 8233:
        return '\\u2029';
      default:
        if (code >= 0x20) return c;
        return dec2hex(code);
    }
  }

  var i, encoded = '';
  for (i = 0; i < str.length; ++i) {
    encoded += convert(str[i], str.charCodeAt(i));
  }

  return encoded;
};

Encoder.prototype.encodeURI = function(str) {
  return encodeURI(str);
};

Encoder.prototype.decodeURI = function(str) {
  return decodeURI(str);
};

Encoder.prototype.encodeURIComponent = function(str) {
  return encodeURIComponent(str);
};

Encoder.prototype.decodeURIComponent = function(str) {
  return decodeURIComponent(str);
};

Encoder.prototype.xmlEncode = function(str) {
  var encoded = this.encodeHTML(str);
  return encoded.replace(/&#39;/g, '&apos;');
};

Encoder.prototype.xmlDecode = function(str) {
  //TODO
};

Encoder.prototype.encodeJSON = function(str) {
  //TODO
};

Encoder.prototype.decodeJSON = function(str) {
  //TODO
};

Encoder.prototype.percentageEncode = function(str) {
  //TODO;
};

Encoder.prototype.percentageDecode = function(str) {
  //TODO
};

Encoder.prototype.quotedEncode = function(str) {
  //TODO
};

Encoder.prototype.quotedDecode = function(str) {
  //TODO
};

Encoder.prototype.base64Encode = function(str) {
  if (global.btoa instanceof Function) return btoa(str);
  if (global.Buffer instanceof Function) return new Buffer(str).toString('base64');
};

Encoder.prototype.base64Decode = function(str) {
  if (global.atob instanceof Function) return atob(str);
  if (global.Buffer instanceof Function) return new Buffer(str, 'base64').toString();
};

module.exports = new Encoder();