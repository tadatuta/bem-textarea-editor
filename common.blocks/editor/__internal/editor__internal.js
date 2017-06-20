modules.define('editor__internal', function(provide) {

(function(exports) {
    // stub escape-string-regexp@1.0.5
    function require() { // eslint-disable-line no-unused-vars
        function escapeStringRegexp(str) {
            var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

            if (typeof str !== 'string') {
                throw new TypeError('Expected a string');
            }

            return str.replace(matchOperatorsRe, '\\$&');
        }

        return escapeStringRegexp;
    }

    /* ../../../node_modules/textarea-editor/build/index.js begin */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formats = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Formats
 */

var formats = exports.formats = {
  // bold text
  bold: {
    prefix: '**',
    suffix: '**'
  },

  // italic text
  italic: {
    prefix: '_',
    suffix: '_'
  },

  // insert link
  link: {
    prefix: {
      value: '[',
      pattern: '\\[',
      antipattern: '\\!\\['
    },
    suffix: {
      value: function value(text) {
        return '](' + prompt('URL:') + ')';
      },
      pattern: '\\]\\(.*?\\)'
    }
  },

  // insert image
  image: {
    prefix: '![',
    suffix: {
      value: function value(text) {
        return '](' + prompt('URL:') + ')';
      },
      pattern: '\\]\\(.*?\\)'
    }
  },

  // insert image
  code: {
    block: true,
    prefix: '```\n',
    suffix: '\n```'
  },

  // insert h1
  header1: {
    prefix: '# '
  },

  // insert h2
  header2: {
    prefix: '## '
  },

  // insert h3
  header3: {
    prefix: '### '
  },

  // insert ordered list
  orderedList: {
    block: true,
    multiline: true,
    prefix: {
      value: function value(line, index) {
        return index + 1 + '. ';
      },
      pattern: '[0-9]+\. '
    }
  },

  // insert unordered list
  unorderedList: {
    block: true,
    multiline: true,
    prefix: '- '
  },

  // insert blockquote
  blockquote: {
    block: true,
    multiline: true,
    prefix: '> '
  }
};

var TextareaEditor = function () {
  /**
   * Constructor
   *
   * @param {Element} el
   */

  function TextareaEditor(el) {
    _classCallCheck(this, TextareaEditor);

    this.el = el;
  }

  /**
   * Set or get range
   *
   * @param {Array} [range]
   * @return {Array|TextareaEditor}
   */

  _createClass(TextareaEditor, [{
    key: 'range',
    value: function range(_range) {
      var el = this.el;
      if (_range == null) return [el.selectionStart, el.selectionEnd];
      this.focus();

      var _range2 = _slicedToArray(_range, 2);

      el.selectionStart = _range2[0];
      el.selectionEnd = _range2[1];

      return this;
    }

    /**
     * Insert text at cursor
     *
     * @param {String} text
     * @return {TextareaEditor}
     */

  }, {
    key: 'insert',
    value: function insert(text) {
      var inserted = true;
      this.el.contentEditable = true;
      this.focus();

      try {
        document.execCommand('insertText', false, text);
      } catch (e) {
        inserted = false;
      }

      this.el.contentEditable = false;

      if (inserted) return this;

      try {
        document.execCommand('ms-beginUndoUnit');
      } catch (e) {}

      var _selection = this.selection();

      var before = _selection.before;
      var after = _selection.after;

      this.el.value = before + text + after;

      try {
        document.execCommand('ms-endUndoUnit');
      } catch (e) {}

      var event = document.createEvent('Event');
      event.initEvent('input', true, true);
      this.el.dispatchEvent(event);
      return this;
    }

    /**
     * Set foucs on the TextareaEditor's element
     *
     * @return {TextareaEditor}
     */

  }, {
    key: 'focus',
    value: function focus() {
      if (document.activeElement !== this.el) this.el.focus();
      return this;
    }

    /**
     * Get selected text
     *
     * @return {Object}
     */

  }, {
    key: 'selection',
    value: function selection() {
      var _range3 = this.range();

      var _range4 = _slicedToArray(_range3, 2);

      var start = _range4[0];
      var end = _range4[1];

      var value = normalizeNewlines(this.el.value);
      return {
        before: value.slice(0, start),
        content: value.slice(start, end),
        after: value.slice(end)
      };
    }

    /**
     * Get format by name
     *
     * @param {String|Object} format
     * @return {Object}
     */

  }, {
    key: 'getFormat',
    value: function getFormat(format) {
      if ((typeof format === 'undefined' ? 'undefined' : _typeof(format)) == 'object') {
        return normalizeFormat(format);
      }

      if (!formats.hasOwnProperty(format)) {
        throw new Error('Invalid format ' + format);
      }

      return normalizeFormat(formats[format]);
    }

    /**
     * Execute command with format
     *
     * @param {String} command
     * @param {String} name - name of format
     * @return {TextareaEditor}
     */

  }, {
    key: 'exec',
    value: function exec(command, name) {
      switch (command) {
        case 'format':
          return this.format(name);
        case 'unformat':
          return this.unformat(name);
        case 'toggle':
          return this.toggle(name);
        default:
          throw new Error('Invalid command ' + command);
      }
    }

    /**
     * Toggle `format` on current selection
     *
     * @param {Object} format
     * @return {TextareaEditor}
     */

  }, {
    key: 'toggle',
    value: function toggle(format) {
      if (this.hasFormat(format)) return this.unformat(format);
      return this.format(format);
    }

    /**
     * Format current selcetion with `format`
     *
     * @param {String} name - name of format
     * @return {TextareaEditor}
     */

  }, {
    key: 'format',
    value: function format(name) {
      var format = this.getFormat(name);
      var prefix = format.prefix;
      var suffix = format.suffix;
      var multiline = format.multiline;

      var _selection2 = this.selection();

      var before = _selection2.before;
      var content = _selection2.content;
      var after = _selection2.after;

      var lines = multiline ? content.split('\n') : [content];

      var _range5 = this.range();

      var _range6 = _slicedToArray(_range5, 2);

      var start = _range6[0];
      var end = _range6[1];

      // format lines

      lines = lines.map(function (line, index) {
        var pval = maybeCall(prefix.value, line, index);
        var sval = maybeCall(suffix.value, line, index);

        if (!multiline || !content.length) {
          start += pval.length;
          end += pval.length;
        } else {
          end += pval.length + sval.length;
        }

        return pval + line + sval;
      });

      var insert = lines.join('\n');

      // newlines before and after block
      if (format.block) {
        var nlb = matchLength(before, /\n+$/);
        var nla = matchLength(after, /^\n+/);

        while (before && nlb < 2) {
          insert = '\n' + insert;
          start++;
          end++;
          nlb++;
        }

        while (after && nla < 2) {
          insert = insert + '\n';
          nla++;
        }
      }

      this.insert(insert);
      this.range([start, end]);
      return this;
    }

    /**
     * Remove given formatting from current selection
     *
     * @param {String} name - name of format
     * @return {TextareaEditor}
     */

  }, {
    key: 'unformat',
    value: function unformat(name) {
      var format = this.getFormat(name);
      var prefix = format.prefix;
      var suffix = format.suffix;
      var multiline = format.multiline;

      var _selection3 = this.selection();

      var before = _selection3.before;
      var content = _selection3.content;
      var after = _selection3.after;

      var lines = multiline ? content.split('\n') : [content];

      var _range7 = this.range();

      var _range8 = _slicedToArray(_range7, 2);

      var start = _range8[0];
      var end = _range8[1];

      // If this is not a multiline format, include prefixes and suffixes just
      // outside the selection.

      if (!multiline && hasSuffix(before, prefix) && hasPrefix(after, suffix)) {
        start -= suffixLength(before, prefix);
        end += prefixLength(after, suffix);
        this.range([start, end]);
        lines = [this.selection().content];
      }

      // remove formatting from lines
      lines = lines.map(function (line) {
        var plen = prefixLength(line, prefix);
        var slen = suffixLength(line, suffix);
        return line.slice(plen, line.length - slen);
      });

      // insert and set selection
      var insert = lines.join('\n');
      this.insert(insert);
      this.range([start, start + insert.length]);

      return this;
    }

    /**
     * Check if current seletion has given format
     *
     * @param {String} name - name of format
     * @return {Boolean}
     */

  }, {
    key: 'hasFormat',
    value: function hasFormat(name) {
      var format = this.getFormat(name);
      var prefix = format.prefix;
      var suffix = format.suffix;
      var multiline = format.multiline;

      var _selection4 = this.selection();

      var before = _selection4.before;
      var content = _selection4.content;
      var after = _selection4.after;

      var lines = content.split('\n');

      // prefix and suffix outside selection
      if (!multiline) {
        return hasSuffix(before, prefix) && hasPrefix(after, suffix) || hasPrefix(content, prefix) && hasSuffix(content, suffix);
      }

      // check which line(s) are formatted
      var formatted = lines.filter(function (line) {
        return hasPrefix(line, prefix) && hasSuffix(line, suffix);
      });

      return formatted.length == lines.length;
    }
  }]);

  return TextareaEditor;
}();

/**
 * Check if given prefix is present
 */

exports.default = TextareaEditor;
function hasPrefix(text, prefix) {
  var exp = new RegExp('^' + prefix.pattern);
  var result = exp.test(text);

  if (prefix.antipattern) {
    var _exp = new RegExp('^' + prefix.antipattern);
    result = result && !_exp.test(text);
  }

  return result;
}

/**
 * Check if given suffix is present
 */

function hasSuffix(text, suffix) {
  var exp = new RegExp(suffix.pattern + '$');
  var result = exp.test(text);

  if (suffix.antipattern) {
    var _exp2 = new RegExp(suffix.antipattern + '$');
    result = result && !_exp2.test(text);
  }

  return result;
}

/**
 * Get length of match
 */

function matchLength(text, exp) {
  var match = text.match(exp);
  return match ? match[0].length : 0;
}

/**
 * Get prefix length
 */

function prefixLength(text, prefix) {
  var exp = new RegExp('^' + prefix.pattern);
  return matchLength(text, exp);
}

/**
 * Check suffix length
 */

function suffixLength(text, suffix) {
  var exp = new RegExp(suffix.pattern + '$');
  return matchLength(text, exp);
}

/**
 * Normalize newlines
 */

function normalizeNewlines(str) {
  return str.replace('\r\n', '\n');
}

/**
 * Normalize format
 */

function normalizeFormat(format) {
  var clone = Object.assign({}, format);
  clone.prefix = normalizePrefixSuffix(format.prefix);
  clone.suffix = normalizePrefixSuffix(format.suffix);
  return clone;
}

/**
 * Normalize prefixes and suffixes
 */

function normalizePrefixSuffix() {
  var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return value;
  return {
    value: value,
    pattern: (0, _escapeStringRegexp2.default)(value)
  };
}

/**
 * Call if function
 */

function maybeCall(value) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof value == 'function' ? value.apply(undefined, args) : value;
}
/* ../../../node_modules/textarea-editor/build/index.js end */


    provide(exports.default);
})({});

});
