! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.sqlFormatter = t() : e.sqlFormatter = t()
}(this, function() {
    return function(e) {
        function t(n) {
            if (E[n]) return E[n].exports;
            var r = E[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }
        var E = {};
        return t.m = e, t.c = E, t.p = "", t(0)
    }([function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.__esModule = !0;
        var r = E(24),
            o = n(r),
            T = E(25),
            R = n(T),
            N = E(26),
            i = n(N),
            A = E(27),
            I = n(A);
        t.default = {
            format: function(e, t) {
                switch (t = t || {}, t.language) {
                    case "db2":
                        return new o.default(t).format(e);
                    case "n1ql":
                        return new R.default(t).format(e);
                    case "pl/sql":
                        return new i.default(t).format(e);
                    case "sql":
                    case void 0:
                        return new I.default(t).format(e);
                    default:
                        throw Error("Unsupported SQL dialect: " + t.language)
                }
            }
        }, e.exports = t.default
    }, function(e, t, E) {
        var n = E(12),
            r = "object" == typeof self && self && self.Object === Object && self,
            o = n || r || Function("return this")();
        e.exports = o
    }, function(e, t, E) {
        function n(e) {
            return null == e ? void 0 === e ? N : R : i && i in Object(e) ? o(e) : T(e)
        }
        var r = E(9),
            o = E(48),
            T = E(57),
            R = "[object Null]",
            N = "[object Undefined]",
            i = r ? r.toStringTag : void 0;
        e.exports = n
    }, function(e, t, E) {
        function n(e, t) {
            var E = o(e, t);
            return r(E) ? E : void 0
        }
        var r = E(39),
            o = E(50);
        e.exports = n
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(74),
            T = n(o),
            R = E(8),
            N = n(R),
            i = E(21),
            A = n(i),
            I = E(22),
            O = n(I),
            u = E(23),
            S = n(u),
            a = function() {
                function e(t, E) {
                    r(this, e), this.cfg = t || {}, this.indentation = new A.default(this.cfg.indent), this.inlineBlock = new O.default, this.params = new S.default(this.cfg.params), this.tokenizer = E, this.previousReservedWord = {}, this.tokens = [], this.index = 0
                }
                return e.prototype.format = function(e) {
                    this.tokens = this.tokenizer.tokenize(e);
                    var t = this.getFormattedQueryFromTokens();
                    return t.trim()
                }, e.prototype.getFormattedQueryFromTokens = function() {
                    var e = this,
                        t = "";
                    return this.tokens.forEach(function(E, n) {
                        e.index = n, E.type === N.default.WHITESPACE || (E.type === N.default.LINE_COMMENT ? t = e.formatLineComment(E, t) : E.type === N.default.BLOCK_COMMENT ? t = e.formatBlockComment(E, t) : E.type === N.default.RESERVED_TOPLEVEL ? (t = e.formatToplevelReservedWord(E, t), e.previousReservedWord = E) : E.type === N.default.RESERVED_NEWLINE ? (t = e.formatNewlineReservedWord(E, t), e.previousReservedWord = E) : E.type === N.default.RESERVED ? (t = e.formatWithSpaces(E, t), e.previousReservedWord = E) : t = E.type === N.default.OPEN_PAREN ? e.formatOpeningParentheses(E, t) : E.type === N.default.CLOSE_PAREN ? e.formatClosingParentheses(E, t) : E.type === N.default.PLACEHOLDER ? e.formatPlaceholder(E, t) : "," === E.value ? e.formatComma(E, t) : ":" === E.value ? e.formatWithSpaceAfter(E, t) : "." === E.value ? e.formatWithoutSpaces(E, t) : ";" === E.value ? e.formatQuerySeparator(E, t) : e.formatWithSpaces(E, t))
                    }), t
                }, e.prototype.formatLineComment = function(e, t) {
                    return this.addNewline(t + e.value)
                }, e.prototype.formatBlockComment = function(e, t) {
                    return this.addNewline(this.addNewline(t) + this.indentComment(e.value))
                }, e.prototype.indentComment = function(e) {
                    return e.replace(/\n/g, "\n" + this.indentation.getIndent())
                }, e.prototype.formatToplevelReservedWord = function(e, t) {
                    return this.indentation.decreaseTopLevel(), t = this.addNewline(t), this.indentation.increaseToplevel(), t += this.equalizeWhitespace(e.value), this.addNewline(t)
                }, e.prototype.formatNewlineReservedWord = function(e, t) {
                    return this.addNewline(t) + this.equalizeWhitespace(e.value) + " "
                }, e.prototype.equalizeWhitespace = function(e) {
                    return e.replace(/\s+/g, " ")
                }, e.prototype.formatOpeningParentheses = function(e, t) {
                    var E = [N.default.WHITESPACE, N.default.OPEN_PAREN, N.default.LINE_COMMENT];
                    return E.includes(this.previousToken().type) || (t = (0, T.default)(t)), t += e.value, this.inlineBlock.beginIfPossible(this.tokens, this.index), this.inlineBlock.isActive() || (this.indentation.increaseBlockLevel(), t = this.addNewline(t)), t
                }, e.prototype.formatClosingParentheses = function(e, t) {
                    return this.inlineBlock.isActive() ? (this.inlineBlock.end(), this.formatWithSpaceAfter(e, t)) : (this.indentation.decreaseBlockLevel(), this.formatWithSpaces(e, this.addNewline(t)))
                }, e.prototype.formatPlaceholder = function(e, t) {
                    return t + this.params.get(e) + " "
                }, e.prototype.formatComma = function(e, t) {
                    return t = this.trimTrailingWhitespace(t) + e.value + " ", this.inlineBlock.isActive() ? t : /^LIMIT$/i.test(this.previousReservedWord.value) ? t : this.addNewline(t)
                }, e.prototype.formatWithSpaceAfter = function(e, t) {
                    return this.trimTrailingWhitespace(t) + e.value + " "
                }, e.prototype.formatWithoutSpaces = function(e, t) {
                    return this.trimTrailingWhitespace(t) + e.value
                }, e.prototype.formatWithSpaces = function(e, t) {
                    return t + e.value + " "
                }, e.prototype.formatQuerySeparator = function(e, t) {
                    return this.trimTrailingWhitespace(t) + e.value + "\n"
                }, e.prototype.addNewline = function(e) {
                    return (0, T.default)(e) + "\n" + this.indentation.getIndent()
                }, e.prototype.trimTrailingWhitespace = function(e) {
                    return this.previousNonWhitespaceToken().type === N.default.LINE_COMMENT ? (0, T.default)(e) + "\n" : (0, T.default)(e)
                }, e.prototype.previousNonWhitespaceToken = function() {
                    for (var e = 1; this.previousToken(e).type === N.default.WHITESPACE;) e++;
                    return this.previousToken(e)
                }, e.prototype.previousToken = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    return this.tokens[this.index - e] || {}
                }, e
            }();
        t.default = a, e.exports = t.default
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(66),
            T = n(o),
            R = E(63),
            N = n(R),
            i = E(8),
            A = n(i),
            I = function() {
                function e(t) {
                    r(this, e), this.WHITESPACE_REGEX = /^(\s+)/, this.NUMBER_REGEX = /^((-\s*)?[0-9]+(\.[0-9]+)?|0x[0-9a-fA-F]+|0b[01]+)\b/, this.OPERATOR_REGEX = /^(!=|<>|==|<=|>=|!<|!>|\|\||::|->>|->|~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|.)/, this.BLOCK_COMMENT_REGEX = /^(\/\*[^]*?(?:\*\/|$))/, this.LINE_COMMENT_REGEX = this.createLineCommentRegex(t.lineCommentTypes), this.RESERVED_TOPLEVEL_REGEX = this.createReservedWordRegex(t.reservedToplevelWords), this.RESERVED_NEWLINE_REGEX = this.createReservedWordRegex(t.reservedNewlineWords), this.RESERVED_PLAIN_REGEX = this.createReservedWordRegex(t.reservedWords), this.WORD_REGEX = this.createWordRegex(t.specialWordChars), this.STRING_REGEX = this.createStringRegex(t.stringTypes), this.OPEN_PAREN_REGEX = this.createParenRegex(t.openParens), this.CLOSE_PAREN_REGEX = this.createParenRegex(t.closeParens), this.INDEXED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(t.indexedPlaceholderTypes, "[0-9]*"), this.IDENT_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(t.namedPlaceholderTypes, "[a-zA-Z0-9._$]+"), this.STRING_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(t.namedPlaceholderTypes, this.createStringPattern(t.stringTypes))
                }
                return e.prototype.createLineCommentRegex = function(e) {
                    return RegExp("^((?:" + e.map(function(e) {
                        return (0, N.default)(e)
                    }).join("|") + ").*?(?:\n|$))")
                }, e.prototype.createReservedWordRegex = function(e) {
                    var t = e.join("|").replace(/ /g, "\\s+");
                    return RegExp("^(" + t + ")\\b", "i")
                }, e.prototype.createWordRegex = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return RegExp("^([\\w" + e.join("") + "]+)")
                }, e.prototype.createStringRegex = function(e) {
                    return RegExp("^(" + this.createStringPattern(e) + ")")
                }, e.prototype.createStringPattern = function(e) {
                    var t = {
                        "``": "((`[^`]*($|`))+)",
                        "[]": "((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)",
                        '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
                        "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
                        "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)"
                    };
                    return e.map(function(e) {
                        return t[e]
                    }).join("|")
                }, e.prototype.createParenRegex = function(e) {
                    var t = this;
                    return RegExp("^(" + e.map(function(e) {
                        return t.escapeParen(e)
                    }).join("|") + ")", "i")
                }, e.prototype.escapeParen = function(e) {
                    return 1 === e.length ? (0, N.default)(e) : "\\b" + e + "\\b"
                }, e.prototype.createPlaceholderRegex = function(e, t) {
                    if ((0, T.default)(e)) return !1;
                    var E = e.map(N.default).join("|");
                    return RegExp("^((?:" + E + ")(?:" + t + "))")
                }, e.prototype.tokenize = function(e) {
                    for (var t = [], E = void 0; e.length;) E = this.getNextToken(e, E), e = e.substring(E.value.length), t.push(E);
                    return t
                }, e.prototype.getNextToken = function(e, t) {
                    return this.getWhitespaceToken(e) || this.getCommentToken(e) || this.getStringToken(e) || this.getOpenParenToken(e) || this.getCloseParenToken(e) || this.getPlaceholderToken(e) || this.getNumberToken(e) || this.getReservedWordToken(e, t) || this.getWordToken(e) || this.getOperatorToken(e)
                }, e.prototype.getWhitespaceToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.WHITESPACE,
                        regex: this.WHITESPACE_REGEX
                    })
                }, e.prototype.getCommentToken = function(e) {
                    return this.getLineCommentToken(e) || this.getBlockCommentToken(e)
                }, e.prototype.getLineCommentToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.LINE_COMMENT,
                        regex: this.LINE_COMMENT_REGEX
                    })
                }, e.prototype.getBlockCommentToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.BLOCK_COMMENT,
                        regex: this.BLOCK_COMMENT_REGEX
                    })
                }, e.prototype.getStringToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.STRING,
                        regex: this.STRING_REGEX
                    })
                }, e.prototype.getOpenParenToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.OPEN_PAREN,
                        regex: this.OPEN_PAREN_REGEX
                    })
                }, e.prototype.getCloseParenToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.CLOSE_PAREN,
                        regex: this.CLOSE_PAREN_REGEX
                    })
                }, e.prototype.getPlaceholderToken = function(e) {
                    return this.getIdentNamedPlaceholderToken(e) || this.getStringNamedPlaceholderToken(e) || this.getIndexedPlaceholderToken(e)
                }, e.prototype.getIdentNamedPlaceholderToken = function(e) {
                    return this.getPlaceholderTokenWithKey({
                        input: e,
                        regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
                        parseKey: function(e) {
                            return e.slice(1)
                        }
                    })
                }, e.prototype.getStringNamedPlaceholderToken = function(e) {
                    var t = this;
                    return this.getPlaceholderTokenWithKey({
                        input: e,
                        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
                        parseKey: function(e) {
                            return t.getEscapedPlaceholderKey({
                                key: e.slice(2, -1),
                                quoteChar: e.slice(-1)
                            })
                        }
                    })
                }, e.prototype.getIndexedPlaceholderToken = function(e) {
                    return this.getPlaceholderTokenWithKey({
                        input: e,
                        regex: this.INDEXED_PLACEHOLDER_REGEX,
                        parseKey: function(e) {
                            return e.slice(1)
                        }
                    })
                }, e.prototype.getPlaceholderTokenWithKey = function(e) {
                    var t = e.input,
                        E = e.regex,
                        n = e.parseKey,
                        r = this.getTokenOnFirstMatch({
                            input: t,
                            regex: E,
                            type: A.default.PLACEHOLDER
                        });
                    return r && (r.key = n(r.value)), r
                }, e.prototype.getEscapedPlaceholderKey = function(e) {
                    var t = e.key,
                        E = e.quoteChar;
                    return t.replace(RegExp((0, N.default)("\\") + E, "g"), E)
                }, e.prototype.getNumberToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.NUMBER,
                        regex: this.NUMBER_REGEX
                    })
                }, e.prototype.getOperatorToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.OPERATOR,
                        regex: this.OPERATOR_REGEX
                    })
                }, e.prototype.getReservedWordToken = function(e, t) {
                    if (!t || !t.value || "." !== t.value) return this.getToplevelReservedToken(e) || this.getNewlineReservedToken(e) || this.getPlainReservedToken(e)
                }, e.prototype.getToplevelReservedToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.RESERVED_TOPLEVEL,
                        regex: this.RESERVED_TOPLEVEL_REGEX
                    })
                }, e.prototype.getNewlineReservedToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.RESERVED_NEWLINE,
                        regex: this.RESERVED_NEWLINE_REGEX
                    })
                }, e.prototype.getPlainReservedToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.RESERVED,
                        regex: this.RESERVED_PLAIN_REGEX
                    })
                }, e.prototype.getWordToken = function(e) {
                    return this.getTokenOnFirstMatch({
                        input: e,
                        type: A.default.WORD,
                        regex: this.WORD_REGEX
                    })
                }, e.prototype.getTokenOnFirstMatch = function(e) {
                    var t = e.input,
                        E = e.type,
                        n = e.regex,
                        r = t.match(n);
                    if (r) return {
                        type: E,
                        value: r[1]
                    }
                }, e
            }();
        t.default = I, e.exports = t.default
    }, function(e, t) {
        function E(e) {
            var t = typeof e;
            return null != e && ("object" == t || "function" == t)
        }
        e.exports = E
    }, function(e, t) {
        function E(e) {
            return null != e && "object" == typeof e
        }
        e.exports = E
    }, function(e, t) {
        "use strict";
        t.__esModule = !0, t.default = {
            WHITESPACE: "whitespace",
            WORD: "word",
            STRING: "string",
            RESERVED: "reserved",
            RESERVED_TOPLEVEL: "reserved-toplevel",
            RESERVED_NEWLINE: "reserved-newline",
            OPERATOR: "operator",
            OPEN_PAREN: "open-paren",
            CLOSE_PAREN: "close-paren",
            LINE_COMMENT: "line-comment",
            BLOCK_COMMENT: "block-comment",
            NUMBER: "number",
            PLACEHOLDER: "placeholder"
        }, e.exports = t.default
    }, function(e, t, E) {
        var n = E(1),
            r = n.Symbol;
        e.exports = r
    }, function(e, t, E) {
        function n(e) {
            return null == e ? "" : r(e)
        }
        var r = E(11);
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            if ("string" == typeof e) return e;
            if (T(e)) return o(e, n) + "";
            if (R(e)) return A ? A.call(e) : "";
            var t = e + "";
            return "0" == t && 1 / e == -N ? "-0" : t
        }
        var r = E(9),
            o = E(33),
            T = E(15),
            R = E(19),
            N = 1 / 0,
            i = r ? r.prototype : void 0,
            A = i ? i.toString : void 0;
        e.exports = n
    }, function(e, t) {
        (function(t) {
            var E = "object" == typeof t && t && t.Object === Object && t;
            e.exports = E
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        function E(e) {
            var t = e && e.constructor,
                E = "function" == typeof t && t.prototype || n;
            return e === E
        }
        var n = Object.prototype;
        e.exports = E
    }, function(e, t) {
        function E(e) {
            if (null != e) {
                try {
                    return r.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }
        var n = Function.prototype,
            r = n.toString;
        e.exports = E
    }, function(e, t) {
        var E = Array.isArray;
        e.exports = E
    }, function(e, t, E) {
        function n(e) {
            return null != e && o(e.length) && !r(e)
        }
        var r = E(17),
            o = E(18);
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            if (!o(e)) return !1;
            var t = r(e);
            return t == R || t == N || t == T || t == i
        }
        var r = E(2),
            o = E(6),
            T = "[object AsyncFunction]",
            R = "[object Function]",
            N = "[object GeneratorFunction]",
            i = "[object Proxy]";
        e.exports = n
    }, function(e, t) {
        function E(e) {
            return "number" == typeof e && e > -1 && e % 1 == 0 && n >= e
        }
        var n = 9007199254740991;
        e.exports = E
    }, function(e, t, E) {
        function n(e) {
            return "symbol" == typeof e || o(e) && r(e) == T
        }
        var r = E(2),
            o = E(7),
            T = "[object Symbol]";
        e.exports = n
    }, function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(69),
            T = n(o),
            R = E(68),
            N = n(R),
            i = "top-level",
            A = "block-level",
            I = function() {
                function e(t) {
                    r(this, e), this.indent = t || "  ", this.indentTypes = []
                }
                return e.prototype.getIndent = function() {
                    return (0, T.default)(this.indent, this.indentTypes.length)
                }, e.prototype.increaseToplevel = function() {
                    this.indentTypes.push(i)
                }, e.prototype.increaseBlockLevel = function() {
                    this.indentTypes.push(A)
                }, e.prototype.decreaseTopLevel = function() {
                    (0, N.default)(this.indentTypes) === i && this.indentTypes.pop()
                }, e.prototype.decreaseBlockLevel = function() {
                    for (; this.indentTypes.length > 0;) {
                        var e = this.indentTypes.pop();
                        if (e !== i) break
                    }
                }, e
            }();
        t.default = I, e.exports = t.default
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(8),
            T = n(o),
            R = 50,
            N = function() {
                function e() {
                    r(this, e), this.level = 0
                }
                return e.prototype.beginIfPossible = function(e, t) {
                    0 === this.level && this.isInlineBlock(e, t) ? this.level = 1 : this.level > 0 ? this.level++ : this.level = 0
                }, e.prototype.end = function() {
                    this.level--
                }, e.prototype.isActive = function() {
                    return this.level > 0
                }, e.prototype.isInlineBlock = function(e, t) {
                    for (var E = 0, n = 0, r = t; e.length > r; r++) {
                        var o = e[r];
                        if (E += o.value.length, E > R) return !1;
                        if (o.type === T.default.OPEN_PAREN) n++;
                        else if (o.type === T.default.CLOSE_PAREN && (n--, 0 === n)) return !0;
                        if (this.isForbiddenToken(o)) return !1
                    }
                    return !1
                }, e.prototype.isForbiddenToken = function(e) {
                    var t = e.type,
                        E = e.value;
                    return t === T.default.RESERVED_TOPLEVEL || t === T.default.RESERVED_NEWLINE || t === T.default.COMMENT || t === T.default.BLOCK_COMMENT || ";" === E
                }, e
            }();
        t.default = N, e.exports = t.default
    }, function(e, t) {
        "use strict";

        function E(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var n = function() {
            function e(t) {
                E(this, e), this.params = t, this.index = 0
            }
            return e.prototype.get = function(e) {
                var t = e.key,
                    E = e.value;
                return this.params ? t ? this.params[t] : this.params[this.index++] : E
            }, e
        }();
        t.default = n, e.exports = t.default
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(4),
            T = n(o),
            R = E(5),
            N = n(R),
            i = ["ABS", "ACTIVATE", "ALIAS", "ALL", "ALLOCATE", "ALLOW", "ALTER", "ANY", "ARE", "ARRAY", "AS", "ASC", "ASENSITIVE", "ASSOCIATE", "ASUTIME", "ASYMMETRIC", "AT", "ATOMIC", "ATTRIBUTES", "AUDIT", "AUTHORIZATION", "AUX", "AUXILIARY", "AVG", "BEFORE", "BEGIN", "BETWEEN", "BIGINT", "BINARY", "BLOB", "BOOLEAN", "BOTH", "BUFFERPOOL", "BY", "CACHE", "CALL", "CALLED", "CAPTURE", "CARDINALITY", "CASCADED", "CASE", "CAST", "CCSID", "CEIL", "CEILING", "CHAR", "CHARACTER", "CHARACTER_LENGTH", "CHAR_LENGTH", "CHECK", "CLOB", "CLONE", "CLOSE", "CLUSTER", "COALESCE", "COLLATE", "COLLECT", "COLLECTION", "COLLID", "COLUMN", "COMMENT", "COMMIT", "CONCAT", "CONDITION", "CONNECT", "CONNECTION", "CONSTRAINT", "CONTAINS", "CONTINUE", "CONVERT", "CORR", "CORRESPONDING", "COUNT", "COUNT_BIG", "COVAR_POP", "COVAR_SAMP", "CREATE", "CROSS", "CUBE", "CUME_DIST", "CURRENT", "CURRENT_DATE", "CURRENT_DEFAULT_TRANSFORM_GROUP", "CURRENT_LC_CTYPE", "CURRENT_PATH", "CURRENT_ROLE", "CURRENT_SCHEMA", "CURRENT_SERVER", "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_TIMEZONE", "CURRENT_TRANSFORM_GROUP_FOR_TYPE", "CURRENT_USER", "CURSOR", "CYCLE", "DATA", "DATABASE", "DATAPARTITIONNAME", "DATAPARTITIONNUM", "DATE", "DAY", "DAYS", "DB2GENERAL", "DB2GENRL", "DB2SQL", "DBINFO", "DBPARTITIONNAME", "DBPARTITIONNUM", "DEALLOCATE", "DEC", "DECIMAL", "DECLARE", "DEFAULT", "DEFAULTS", "DEFINITION", "DELETE", "DENSERANK", "DENSE_RANK", "DEREF", "DESCRIBE", "DESCRIPTOR", "DETERMINISTIC", "DIAGNOSTICS", "DISABLE", "DISALLOW", "DISCONNECT", "DISTINCT", "DO", "DOCUMENT", "DOUBLE", "DROP", "DSSIZE", "DYNAMIC", "EACH", "EDITPROC", "ELEMENT", "ELSE", "ELSEIF", "ENABLE", "ENCODING", "ENCRYPTION", "END", "END-EXEC", "ENDING", "ERASE", "ESCAPE", "EVERY", "EXCEPTION", "EXCLUDING", "EXCLUSIVE", "EXEC", "EXECUTE", "EXISTS", "EXIT", "EXP", "EXPLAIN", "EXTENDED", "EXTERNAL", "EXTRACT", "FALSE", "FENCED", "FETCH", "FIELDPROC", "FILE", "FILTER", "FINAL", "FIRST", "FLOAT", "FLOOR", "FOR", "FOREIGN", "FREE", "FULL", "FUNCTION", "FUSION", "GENERAL", "GENERATED", "GET", "GLOBAL", "GOTO", "GRANT", "GRAPHIC", "GROUP", "GROUPING", "HANDLER", "HASH", "HASHED_VALUE", "HINT", "HOLD", "HOUR", "HOURS", "IDENTITY", "IF", "IMMEDIATE", "IN", "INCLUDING", "INCLUSIVE", "INCREMENT", "INDEX", "INDICATOR", "INDICATORS", "INF", "INFINITY", "INHERIT", "INNER", "INOUT", "INSENSITIVE", "INSERT", "INT", "INTEGER", "INTEGRITY", "INTERSECTION", "INTERVAL", "INTO", "IS", "ISOBID", "ISOLATION", "ITERATE", "JAR", "JAVA", "KEEP", "KEY", "LABEL", "LANGUAGE", "LARGE", "LATERAL", "LC_CTYPE", "LEADING", "LEAVE", "LEFT", "LIKE", "LINKTYPE", "LN", "LOCAL", "LOCALDATE", "LOCALE", "LOCALTIME", "LOCALTIMESTAMP", "LOCATOR", "LOCATORS", "LOCK", "LOCKMAX", "LOCKSIZE", "LONG", "LOOP", "LOWER", "MAINTAINED", "MATCH", "MATERIALIZED", "MAX", "MAXVALUE", "MEMBER", "MERGE", "METHOD", "MICROSECOND", "MICROSECONDS", "MIN", "MINUTE", "MINUTES", "MINVALUE", "MOD", "MODE", "MODIFIES", "MODULE", "MONTH", "MONTHS", "MULTISET", "NAN", "NATIONAL", "NATURAL", "NCHAR", "NCLOB", "NEW", "NEW_TABLE", "NEXTVAL", "NO", "NOCACHE", "NOCYCLE", "NODENAME", "NODENUMBER", "NOMAXVALUE", "NOMINVALUE", "NONE", "NOORDER", "NORMALIZE", "NORMALIZED", "NOT", "NULL", "NULLIF", "NULLS", "NUMERIC", "NUMPARTS", "OBID", "OCTET_LENGTH", "OF", "OFFSET", "OLD", "OLD_TABLE", "ON", "ONLY", "OPEN", "OPTIMIZATION", "OPTIMIZE", "OPTION", "ORDER", "OUT", "OUTER", "OVER", "OVERLAPS", "OVERLAY", "OVERRIDING", "PACKAGE", "PADDED", "PAGESIZE", "PARAMETER", "PART", "PARTITION", "PARTITIONED", "PARTITIONING", "PARTITIONS", "PASSWORD", "PATH", "PERCENTILE_CONT", "PERCENTILE_DISC", "PERCENT_RANK", "PIECESIZE", "PLAN", "POSITION", "POWER", "PRECISION", "PREPARE", "PREVVAL", "PRIMARY", "PRIQTY", "PRIVILEGES", "PROCEDURE", "PROGRAM", "PSID", "PUBLIC", "QUERY", "QUERYNO", "RANGE", "RANK", "READ", "READS", "REAL", "RECOVERY", "RECURSIVE", "REF", "REFERENCES", "REFERENCING", "REFRESH", "REGR_AVGX", "REGR_AVGY", "REGR_COUNT", "REGR_INTERCEPT", "REGR_R2", "REGR_SLOPE", "REGR_SXX", "REGR_SXY", "REGR_SYY", "RELEASE", "RENAME", "REPEAT", "RESET", "RESIGNAL", "RESTART", "RESTRICT", "RESULT", "RESULT_SET_LOCATOR", "RETURN", "RETURNS", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "ROLLUP", "ROUND_CEILING", "ROUND_DOWN", "ROUND_FLOOR", "ROUND_HALF_DOWN", "ROUND_HALF_EVEN", "ROUND_HALF_UP", "ROUND_UP", "ROUTINE", "ROW", "ROWNUMBER", "ROWS", "ROWSET", "ROW_NUMBER", "RRN", "RUN", "SAVEPOINT", "SCHEMA", "SCOPE", "SCRATCHPAD", "SCROLL", "SEARCH", "SECOND", "SECONDS", "SECQTY", "SECURITY", "SENSITIVE", "SEQUENCE", "SESSION", "SESSION_USER", "SIGNAL", "SIMILAR", "SIMPLE", "SMALLINT", "SNAN", "SOME", "SOURCE", "SPECIFIC", "SPECIFICTYPE", "SQL", "SQLEXCEPTION", "SQLID", "SQLSTATE", "SQLWARNING", "SQRT", "STACKED", "STANDARD", "START", "STARTING", "STATEMENT", "STATIC", "STATMENT", "STAY", "STDDEV_POP", "STDDEV_SAMP", "STOGROUP", "STORES", "STYLE", "SUBMULTISET", "SUBSTRING", "SUM", "SUMMARY", "SYMMETRIC", "SYNONYM", "SYSFUN", "SYSIBM", "SYSPROC", "SYSTEM", "SYSTEM_USER", "TABLE", "TABLESAMPLE", "TABLESPACE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TO", "TRAILING", "TRANSACTION", "TRANSLATE", "TRANSLATION", "TREAT", "TRIGGER", "TRIM", "TRUE", "TRUNCATE", "TYPE", "UESCAPE", "UNDO", "UNIQUE", "UNKNOWN", "UNNEST", "UNTIL", "UPPER", "USAGE", "USER", "USING", "VALIDPROC", "VALUE", "VARCHAR", "VARIABLE", "VARIANT", "VARYING", "VAR_POP", "VAR_SAMP", "VCAT", "VERSION", "VIEW", "VOLATILE", "VOLUMES", "WHEN", "WHENEVER", "WHILE", "WIDTH_BUCKET", "WINDOW", "WITH", "WITHIN", "WITHOUT", "WLM", "WRITE", "XMLELEMENT", "XMLEXISTS", "XMLNAMESPACES", "YEAR", "YEARS"],
            A = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INTERSECT", "LIMIT", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UPDATE", "VALUES", "WHERE"],
            I = ["AND", "CROSS JOIN", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN"],
            O = void 0,
            u = function() {
                function e(t) {
                    r(this, e), this.cfg = t
                }
                return e.prototype.format = function(e) {
                    return O || (O = new N.default({
                        reservedWords: i,
                        reservedToplevelWords: A,
                        reservedNewlineWords: I,
                        stringTypes: ['""', "''", "``", "[]"],
                        openParens: ["("],
                        closeParens: [")"],
                        indexedPlaceholderTypes: ["?"],
                        namedPlaceholderTypes: [":"],
                        lineCommentTypes: ["--"],
                        specialWordChars: ["#", "@"]
                    })), new T.default(this.cfg, O).format(e)
                }, e
            }();
        t.default = u, e.exports = t.default
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(4),
            T = n(o),
            R = E(5),
            N = n(R),
            i = ["ALL", "ALTER", "ANALYZE", "AND", "ANY", "ARRAY", "AS", "ASC", "BEGIN", "BETWEEN", "BINARY", "BOOLEAN", "BREAK", "BUCKET", "BUILD", "BY", "CALL", "CASE", "CAST", "CLUSTER", "COLLATE", "COLLECTION", "COMMIT", "CONNECT", "CONTINUE", "CORRELATE", "COVER", "CREATE", "DATABASE", "DATASET", "DATASTORE", "DECLARE", "DECREMENT", "DELETE", "DERIVED", "DESC", "DESCRIBE", "DISTINCT", "DO", "DROP", "EACH", "ELEMENT", "ELSE", "END", "EVERY", "EXCEPT", "EXCLUDE", "EXECUTE", "EXISTS", "EXPLAIN", "FALSE", "FETCH", "FIRST", "FLATTEN", "FOR", "FORCE", "FROM", "FUNCTION", "GRANT", "GROUP", "GSI", "HAVING", "IF", "IGNORE", "ILIKE", "IN", "INCLUDE", "INCREMENT", "INDEX", "INFER", "INLINE", "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "KEYS", "KEYSPACE", "KNOWN", "LAST", "LEFT", "LET", "LETTING", "LIKE", "LIMIT", "LSM", "MAP", "MAPPING", "MATCHED", "MATERIALIZED", "MERGE", "MINUS", "MISSING", "NAMESPACE", "NEST", "NOT", "NULL", "NUMBER", "OBJECT", "OFFSET", "ON", "OPTION", "OR", "ORDER", "OUTER", "OVER", "PARSE", "PARTITION", "PASSWORD", "PATH", "POOL", "PREPARE", "PRIMARY", "PRIVATE", "PRIVILEGE", "PROCEDURE", "PUBLIC", "RAW", "REALM", "REDUCE", "RENAME", "RETURN", "RETURNING", "REVOKE", "RIGHT", "ROLE", "ROLLBACK", "SATISFIES", "SCHEMA", "SELECT", "SELF", "SEMI", "SET", "SHOW", "SOME", "START", "STATISTICS", "STRING", "SYSTEM", "THEN", "TO", "TRANSACTION", "TRIGGER", "TRUE", "TRUNCATE", "UNDER", "UNION", "UNIQUE", "UNKNOWN", "UNNEST", "UNSET", "UPDATE", "UPSERT", "USE", "USER", "USING", "VALIDATE", "VALUE", "VALUED", "VALUES", "VIA", "VIEW", "WHEN", "WHERE", "WHILE", "WITH", "WITHIN", "WORK", "XOR"],
            A = ["DELETE FROM", "EXCEPT ALL", "EXCEPT", "EXPLAIN DELETE FROM", "EXPLAIN UPDATE", "EXPLAIN UPSERT", "FROM", "GROUP BY", "HAVING", "INFER", "INSERT INTO", "INTERSECT ALL", "INTERSECT", "LET", "LIMIT", "MERGE", "NEST", "ORDER BY", "PREPARE", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UNNEST", "UPDATE", "UPSERT", "USE KEYS", "VALUES", "WHERE"],
            I = ["AND", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "XOR"],
            O = void 0,
            u = function() {
                function e(t) {
                    r(this, e), this.cfg = t
                }
                return e.prototype.format = function(e) {
                    return O || (O = new N.default({
                        reservedWords: i,
                        reservedToplevelWords: A,
                        reservedNewlineWords: I,
                        stringTypes: ['""', "''", "``"],
                        openParens: ["(", "[", "{"],
                        closeParens: [")", "]", "}"],
                        namedPlaceholderTypes: ["$"],
                        lineCommentTypes: ["#", "--"]
                    })), new T.default(this.cfg, O).format(e)
                }, e
            }();
        t.default = u, e.exports = t.default
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(4),
            T = n(o),
            R = E(5),
            N = n(R),
            i = ["A", "ACCESSIBLE", "AGENT", "AGGREGATE", "ALL", "ALTER", "ANY", "ARRAY", "AS", "ASC", "AT", "ATTRIBUTE", "AUTHID", "AVG", "BETWEEN", "BFILE_BASE", "BINARY_INTEGER", "BINARY", "BLOB_BASE", "BLOCK", "BODY", "BOOLEAN", "BOTH", "BOUND", "BULK", "BY", "BYTE", "C", "CALL", "CALLING", "CASCADE", "CASE", "CHAR_BASE", "CHAR", "CHARACTER", "CHARSET", "CHARSETFORM", "CHARSETID", "CHECK", "CLOB_BASE", "CLONE", "CLOSE", "CLUSTER", "CLUSTERS", "COALESCE", "COLAUTH", "COLLECT", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPILED", "COMPRESS", "CONNECT", "CONSTANT", "CONSTRUCTOR", "CONTEXT", "CONTINUE", "CONVERT", "COUNT", "CRASH", "CREATE", "CREDENTIAL", "CURRENT", "CURRVAL", "CURSOR", "CUSTOMDATUM", "DANGLING", "DATA", "DATE_BASE", "DATE", "DAY", "DECIMAL", "DEFAULT", "DEFINE", "DELETE", "DESC", "DETERMINISTIC", "DIRECTORY", "DISTINCT", "DO", "DOUBLE", "DROP", "DURATION", "ELEMENT", "ELSIF", "EMPTY", "ESCAPE", "EXCEPTIONS", "EXCLUSIVE", "EXECUTE", "EXISTS", "EXIT", "EXTENDS", "EXTERNAL", "EXTRACT", "FALSE", "FETCH", "FINAL", "FIRST", "FIXED", "FLOAT", "FOR", "FORALL", "FORCE", "FROM", "FUNCTION", "GENERAL", "GOTO", "GRANT", "GROUP", "HASH", "HEAP", "HIDDEN", "HOUR", "IDENTIFIED", "IF", "IMMEDIATE", "IN", "INCLUDING", "INDEX", "INDEXES", "INDICATOR", "INDICES", "INFINITE", "INSTANTIABLE", "INT", "INTEGER", "INTERFACE", "INTERVAL", "INTO", "INVALIDATE", "IS", "ISOLATION", "JAVA", "LANGUAGE", "LARGE", "LEADING", "LENGTH", "LEVEL", "LIBRARY", "LIKE", "LIKE2", "LIKE4", "LIKEC", "LIMITED", "LOCAL", "LOCK", "LONG", "MAP", "MAX", "MAXLEN", "MEMBER", "MERGE", "MIN", "MINUS", "MINUTE", "MLSLABEL", "MOD", "MODE", "MONTH", "MULTISET", "NAME", "NAN", "NATIONAL", "NATIVE", "NATURAL", "NATURALN", "NCHAR", "NEW", "NEXTVAL", "NOCOMPRESS", "NOCOPY", "NOT", "NOWAIT", "NULL", "NULLIF", "NUMBER_BASE", "NUMBER", "OBJECT", "OCICOLL", "OCIDATE", "OCIDATETIME", "OCIDURATION", "OCIINTERVAL", "OCILOBLOCATOR", "OCINUMBER", "OCIRAW", "OCIREF", "OCIREFCURSOR", "OCIROWID", "OCISTRING", "OCITYPE", "OF", "OLD", "ON", "ONLY", "OPAQUE", "OPEN", "OPERATOR", "OPTION", "ORACLE", "ORADATA", "ORDER", "ORGANIZATION", "ORLANY", "ORLVARY", "OTHERS", "OUT", "OVERLAPS", "OVERRIDING", "PACKAGE", "PARALLEL_ENABLE", "PARAMETER", "PARAMETERS", "PARENT", "PARTITION", "PASCAL", "PCTFREE", "PIPE", "PIPELINED", "PLS_INTEGER", "PLUGGABLE", "POSITIVE", "POSITIVEN", "PRAGMA", "PRECISION", "PRIOR", "PRIVATE", "PROCEDURE", "PUBLIC", "RAISE", "RANGE", "RAW", "READ", "REAL", "RECORD", "REF", "REFERENCE", "RELEASE", "RELIES_ON", "REM", "REMAINDER", "RENAME", "RESOURCE", "RESULT_CACHE", "RESULT", "RETURN", "RETURNING", "REVERSE", "REVOKE", "ROLLBACK", "ROW", "ROWID", "ROWNUM", "ROWTYPE", "SAMPLE", "SAVE", "SAVEPOINT", "SB1", "SB2", "SB4", "SECOND", "SEGMENT", "SELF", "SEPARATE", "SEQUENCE", "SERIALIZABLE", "SHARE", "SHORT", "SIZE_T", "SIZE", "SMALLINT", "SOME", "SPACE", "SPARSE", "SQL", "SQLCODE", "SQLDATA", "SQLERRM", "SQLNAME", "SQLSTATE", "STANDARD", "START", "STATIC", "STDDEV", "STORED", "STRING", "STRUCT", "STYLE", "SUBMULTISET", "SUBPARTITION", "SUBSTITUTABLE", "SUBTYPE", "SUCCESSFUL", "SUM", "SYNONYM", "SYSDATE", "TABAUTH", "TABLE", "TDO", "THE", "THEN", "TIME", "TIMESTAMP", "TIMEZONE_ABBR", "TIMEZONE_HOUR", "TIMEZONE_MINUTE", "TIMEZONE_REGION", "TO", "TRAILING", "TRANSACTION", "TRANSACTIONAL", "TRIGGER", "TRUE", "TRUSTED", "TYPE", "UB1", "UB2", "UB4", "UID", "UNDER", "UNIQUE", "UNPLUG", "UNSIGNED", "UNTRUSTED", "USE", "USER", "USING", "VALIDATE", "VALIST", "VALUE", "VARCHAR", "VARCHAR2", "VARIABLE", "VARIANCE", "VARRAY", "VARYING", "VIEW", "VIEWS", "VOID", "WHENEVER", "WHILE", "WITH", "WORK", "WRAPPED", "WRITE", "YEAR", "ZONE"],
            A = ["ADD", "ALTER COLUMN", "ALTER TABLE", "BEGIN", "CONNECT BY", "DECLARE", "DELETE FROM", "DELETE", "END", "EXCEPT", "EXCEPTION", "FETCH FIRST", "FROM", "GROUP BY", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "LOOP", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "START WITH", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"],
            I = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "END", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"],
            O = void 0,
            u = function() {
                function e(t) {
                    r(this, e), this.cfg = t
                }
                return e.prototype.format = function(e) {
                    return O || (O = new N.default({
                        reservedWords: i,
                        reservedToplevelWords: A,
                        reservedNewlineWords: I,
                        stringTypes: ['""', "N''", "''", "``"],
                        openParens: ["(", "CASE"],
                        closeParens: [")", "END"],
                        indexedPlaceholderTypes: ["?"],
                        namedPlaceholderTypes: [":"],
                        lineCommentTypes: ["--"],
                        specialWordChars: ["_", "$", "#", ".", "@"]
                    })), new T.default(this.cfg, O).format(e)
                }, e
            }();
        t.default = u, e.exports = t.default
    }, function(e, t, E) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        t.__esModule = !0;
        var o = E(4),
            T = n(o),
            R = E(5),
            N = n(R),
            i = ["ACCESSIBLE", "ACTION", "AGAINST", "AGGREGATE", "ALGORITHM", "ALL", "ALTER", "ANALYSE", "ANALYZE", "AS", "ASC", "AUTOCOMMIT", "AUTO_INCREMENT", "BACKUP", "BEGIN", "BETWEEN", "BINLOG", "BOTH", "CASCADE", "CASE", "CHANGE", "CHANGED", "CHARACTER SET", "CHARSET", "CHECK", "CHECKSUM", "COLLATE", "COLLATION", "COLUMN", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED", "COMPRESSED", "CONCURRENT", "CONSTRAINT", "CONTAINS", "CONVERT", "CREATE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DATABASES", "DAY", "DAY_HOUR", "DAY_MINUTE", "DAY_SECOND", "DEFAULT", "DEFINER", "DELAYED", "DELETE", "DESC", "DESCRIBE", "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV", "DO", "DROP", "DUMPFILE", "DUPLICATE", "DYNAMIC", "ELSE", "ENCLOSED", "END", "ENGINE", "ENGINES", "ENGINE_TYPE", "ESCAPE", "ESCAPED", "EVENTS", "EXEC", "EXECUTE", "EXISTS", "EXPLAIN", "EXTENDED", "FAST", "FETCH", "FIELDS", "FILE", "FIRST", "FIXED", "FLUSH", "FOR", "FORCE", "FOREIGN", "FULL", "FULLTEXT", "FUNCTION", "GLOBAL", "GRANT", "GRANTS", "GROUP_CONCAT", "HEAP", "HIGH_PRIORITY", "HOSTS", "HOUR", "HOUR_MINUTE", "HOUR_SECOND", "IDENTIFIED", "IF", "IFNULL", "IGNORE", "IN", "INDEX", "INDEXES", "INFILE", "INSERT", "INSERT_ID", "INSERT_METHOD", "INTERVAL", "INTO", "INVOKER", "IS", "ISOLATION", "KEY", "KEYS", "KILL", "LAST_INSERT_ID", "LEADING", "LEVEL", "LIKE", "LINEAR", "LINES", "LOAD", "LOCAL", "LOCK", "LOCKS", "LOGS", "LOW_PRIORITY", "MARIA", "MASTER", "MASTER_CONNECT_RETRY", "MASTER_HOST", "MASTER_LOG_FILE", "MATCH", "MAX_CONNECTIONS_PER_HOUR", "MAX_QUERIES_PER_HOUR", "MAX_ROWS", "MAX_UPDATES_PER_HOUR", "MAX_USER_CONNECTIONS", "MEDIUM", "MERGE", "MINUTE", "MINUTE_SECOND", "MIN_ROWS", "MODE", "MODIFY", "MONTH", "MRG_MYISAM", "MYISAM", "NAMES", "NATURAL", "NOT", "NOW()", "NULL", "OFFSET", "ON DELETE", "ON UPDATE", "ON", "ONLY", "OPEN", "OPTIMIZE", "OPTION", "OPTIONALLY", "OUTFILE", "PACK_KEYS", "PAGE", "PARTIAL", "PARTITION", "PARTITIONS", "PASSWORD", "PRIMARY", "PRIVILEGES", "PROCEDURE", "PROCESS", "PROCESSLIST", "PURGE", "QUICK", "RAID0", "RAID_CHUNKS", "RAID_CHUNKSIZE", "RAID_TYPE", "RANGE", "READ", "READ_ONLY", "READ_WRITE", "REFERENCES", "REGEXP", "RELOAD", "RENAME", "REPAIR", "REPEATABLE", "REPLACE", "REPLICATION", "RESET", "RESTORE", "RESTRICT", "RETURN", "RETURNS", "REVOKE", "RLIKE", "ROLLBACK", "ROW", "ROWS", "ROW_FORMAT", "SECOND", "SECURITY", "SEPARATOR", "SERIALIZABLE", "SESSION", "SHARE", "SHOW", "SHUTDOWN", "SLAVE", "SONAME", "SOUNDS", "SQL", "SQL_AUTO_IS_NULL", "SQL_BIG_RESULT", "SQL_BIG_SELECTS", "SQL_BIG_TABLES", "SQL_BUFFER_RESULT", "SQL_CACHE", "SQL_CALC_FOUND_ROWS", "SQL_LOG_BIN", "SQL_LOG_OFF", "SQL_LOG_UPDATE", "SQL_LOW_PRIORITY_UPDATES", "SQL_MAX_JOIN_SIZE", "SQL_NO_CACHE", "SQL_QUOTE_SHOW_CREATE", "SQL_SAFE_UPDATES", "SQL_SELECT_LIMIT", "SQL_SLAVE_SKIP_COUNTER", "SQL_SMALL_RESULT", "SQL_WARNINGS", "START", "STARTING", "STATUS", "STOP", "STORAGE", "STRAIGHT_JOIN", "STRING", "STRIPED", "SUPER", "TABLE", "TABLES", "TEMPORARY", "TERMINATED", "THEN", "TO", "TRAILING", "TRANSACTIONAL", "TRUE", "TRUNCATE", "TYPE", "TYPES", "UNCOMMITTED", "UNIQUE", "UNLOCK", "UNSIGNED", "USAGE", "USE", "USING", "VARIABLES", "VIEW", "WHEN", "WITH", "WORK", "WRITE", "YEAR_MONTH"],
            A = ["ADD", "AFTER", "ALTER COLUMN", "ALTER TABLE", "DELETE FROM", "EXCEPT", "FETCH FIRST", "FROM", "GROUP BY", "GO", "HAVING", "INSERT INTO", "INSERT", "INTERSECT", "LIMIT", "MODIFY", "ORDER BY", "SELECT", "SET CURRENT SCHEMA", "SET SCHEMA", "SET", "UNION ALL", "UNION", "UPDATE", "VALUES", "WHERE"],
            I = ["AND", "CROSS APPLY", "CROSS JOIN", "ELSE", "INNER JOIN", "JOIN", "LEFT JOIN", "LEFT OUTER JOIN", "OR", "OUTER APPLY", "OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "WHEN", "XOR"],
            O = void 0,
            u = function() {
                function e(t) {
                    r(this, e), this.cfg = t
                }
                return e.prototype.format = function(e) {
                    return O || (O = new N.default({
                        reservedWords: i,
                        reservedToplevelWords: A,
                        reservedNewlineWords: I,
                        stringTypes: ['""', "N''", "''", "``", "[]"],
                        openParens: ["(", "CASE"],
                        closeParens: [")", "END"],
                        indexedPlaceholderTypes: ["?"],
                        namedPlaceholderTypes: ["@", ":"],
                        lineCommentTypes: ["#", "--"]
                    })), new T.default(this.cfg, O).format(e)
                }, e
            }();
        t.default = u, e.exports = t.default
    }, function(e, t, E) {
        var n = E(3),
            r = E(1),
            o = n(r, "DataView");
        e.exports = o
    }, function(e, t, E) {
        var n = E(3),
            r = E(1),
            o = n(r, "Map");
        e.exports = o
    }, function(e, t, E) {
        var n = E(3),
            r = E(1),
            o = n(r, "Promise");
        e.exports = o
    }, function(e, t, E) {
        var n = E(3),
            r = E(1),
            o = n(r, "Set");
        e.exports = o
    }, function(e, t, E) {
        var n = E(3),
            r = E(1),
            o = n(r, "WeakMap");
        e.exports = o
    }, function(e, t) {
        function E(e, t) {
            for (var E = -1, n = null == e ? 0 : e.length, r = Array(n); ++E < n;) r[E] = t(e[E], E, e);
            return r
        }
        e.exports = E
    }, function(e, t) {
        function E(e) {
            return e.split("")
        }
        e.exports = E
    }, function(e, t) {
        function E(e, t, E, n) {
            for (var r = e.length, o = E + (n ? 1 : -1); n ? o-- : ++o < r;)
                if (t(e[o], o, e)) return o;
            return -1
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e, t, E) {
            return t === t ? T(e, t, E) : r(e, o, E)
        }
        var r = E(35),
            o = E(38),
            T = E(59);
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            return o(e) && r(e) == T
        }
        var r = E(2),
            o = E(7),
            T = "[object Arguments]";
        e.exports = n
    }, function(e, t) {
        function E(e) {
            return e !== e
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e) {
            if (!T(e) || o(e)) return !1;
            var t = r(e) ? S : i;
            return t.test(R(e))
        }
        var r = E(17),
            o = E(54),
            T = E(6),
            R = E(14),
            N = /[\\^$.*+?()[\]{}|]/g,
            i = /^\[object .+?Constructor\]$/,
            A = Function.prototype,
            I = Object.prototype,
            O = A.toString,
            u = I.hasOwnProperty,
            S = RegExp("^" + O.call(u).replace(N, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            return T(e) && o(e.length) && !!y[r(e)]
        }
        var r = E(2),
            o = E(18),
            T = E(7),
            R = "[object Arguments]",
            N = "[object Array]",
            i = "[object Boolean]",
            A = "[object Date]",
            I = "[object Error]",
            O = "[object Function]",
            u = "[object Map]",
            S = "[object Number]",
            a = "[object Object]",
            s = "[object RegExp]",
            L = "[object Set]",
            c = "[object String]",
            C = "[object WeakMap]",
            f = "[object ArrayBuffer]",
            p = "[object DataView]",
            l = "[object Float32Array]",
            d = "[object Float64Array]",
            P = "[object Int8Array]",
            D = "[object Int16Array]",
            U = "[object Int32Array]",
            M = "[object Uint8Array]",
            h = "[object Uint8ClampedArray]",
            _ = "[object Uint16Array]",
            v = "[object Uint32Array]",
            y = {};
        y[l] = y[d] = y[P] = y[D] = y[U] = y[M] = y[h] = y[_] = y[v] = !0, y[R] = y[N] = y[f] = y[i] = y[p] = y[A] = y[I] = y[O] = y[u] = y[S] = y[a] = y[s] = y[L] = y[c] = y[C] = !1, e.exports = n
    }, function(e, t, E) {
        function n(e) {
            if (!r(e)) return o(e);
            var t = [];
            for (var E in Object(e)) R.call(e, E) && "constructor" != E && t.push(E);
            return t
        }
        var r = E(13),
            o = E(55),
            T = Object.prototype,
            R = T.hasOwnProperty;
        e.exports = n
    }, function(e, t) {
        function E(e, t) {
            var E = "";
            if (!e || 1 > t || t > n) return E;
            do t % 2 && (E += e), t = r(t / 2), t && (e += e); while (t);
            return E
        }
        var n = 9007199254740991,
            r = Math.floor;
        e.exports = E
    }, function(e, t) {
        function E(e, t, E) {
            var n = -1,
                r = e.length;
            0 > t && (t = -t > r ? 0 : r + t), E = E > r ? r : E, 0 > E && (E += r), r = t > E ? 0 : E - t >>> 0, t >>>= 0;
            for (var o = Array(r); ++n < r;) o[n] = e[n + t];
            return o
        }
        e.exports = E
    }, function(e, t) {
        function E(e) {
            return function(t) {
                return e(t)
            }
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e, t, E) {
            var n = e.length;
            return E = void 0 === E ? n : E, t || n > E ? r(e, t, E) : e
        }
        var r = E(43);
        e.exports = n
    }, function(e, t, E) {
        function n(e, t) {
            for (var E = e.length; E-- && r(t, e[E], 0) > -1;);
            return E
        }
        var r = E(36);
        e.exports = n
    }, function(e, t, E) {
        var n = E(1),
            r = n["__core-js_shared__"];
        e.exports = r
    }, function(e, t, E) {
        function n(e) {
            var t = T.call(e, N),
                E = e[N];
            try {
                e[N] = void 0;
                var n = !0
            } catch (e) {}
            var r = R.call(e);
            return n && (t ? e[N] = E : delete e[N]), r
        }
        var r = E(9),
            o = Object.prototype,
            T = o.hasOwnProperty,
            R = o.toString,
            N = r ? r.toStringTag : void 0;
        e.exports = n
    }, function(e, t, E) {
        var n = E(28),
            r = E(29),
            o = E(30),
            T = E(31),
            R = E(32),
            N = E(2),
            i = E(14),
            A = "[object Map]",
            I = "[object Object]",
            O = "[object Promise]",
            u = "[object Set]",
            S = "[object WeakMap]",
            a = "[object DataView]",
            s = i(n),
            L = i(r),
            c = i(o),
            C = i(T),
            f = i(R),
            p = N;
        (n && p(new n(new ArrayBuffer(1))) != a || r && p(new r) != A || o && p(o.resolve()) != O || T && p(new T) != u || R && p(new R) != S) && (p = function(e) {
            var t = N(e),
                E = t == I ? e.constructor : void 0,
                n = E ? i(E) : "";
            if (n) switch (n) {
                case s:
                    return a;
                case L:
                    return A;
                case c:
                    return O;
                case C:
                    return u;
                case f:
                    return S
            }
            return t
        }), e.exports = p
    }, function(e, t) {
        function E(e, t) {
            return null == e ? void 0 : e[t]
        }
        e.exports = E
    }, function(e, t) {
        function E(e) {
            return A.test(e)
        }
        var n = "\\ud800-\\udfff",
            r = "\\u0300-\\u036f",
            o = "\\ufe20-\\ufe2f",
            T = "\\u20d0-\\u20ff",
            R = r + o + T,
            N = "\\ufe0e\\ufe0f",
            i = "\\u200d",
            A = RegExp("[" + i + n + R + N + "]");
        e.exports = E
    }, function(e, t) {
        function E(e, t) {
            var E = typeof e;
            return t = null == t ? n : t, !!t && ("number" == E || "symbol" != E && r.test(e)) && e > -1 && e % 1 == 0 && t > e
        }
        var n = 9007199254740991,
            r = /^(?:0|[1-9]\d*)$/;
        e.exports = E
    }, function(e, t, E) {
        function n(e, t, E) {
            if (!R(E)) return !1;
            var n = typeof t;
            return !!("number" == n ? o(E) && T(t, E.length) : "string" == n && t in E) && r(E[t], e)
        }
        var r = E(62),
            o = E(16),
            T = E(52),
            R = E(6);
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            return !!o && o in e
        }
        var r = E(47),
            o = function() {
                var e = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }();
        e.exports = n
    }, function(e, t, E) {
        var n = E(58),
            r = n(Object.keys, Object);
        e.exports = r
    }, function(e, t, E) {
        (function(e) {
            var n = E(12),
                r = "object" == typeof t && t && !t.nodeType && t,
                o = r && "object" == typeof e && e && !e.nodeType && e,
                T = o && o.exports === r,
                R = T && n.process,
                N = function() {
                    try {
                        var e = o && o.require && o.require("util").types;
                        return e ? e : R && R.binding && R.binding("util")
                    } catch (e) {}
                }();
            e.exports = N
        }).call(t, E(20)(e))
    }, function(e, t) {
        function E(e) {
            return r.call(e)
        }
        var n = Object.prototype,
            r = n.toString;
        e.exports = E
    }, function(e, t) {
        function E(e, t) {
            return function(E) {
                return e(t(E))
            }
        }
        e.exports = E
    }, function(e, t) {
        function E(e, t, E) {
            for (var n = E - 1, r = e.length; ++n < r;)
                if (e[n] === t) return n;
            return -1
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e) {
            return o(e) ? T(e) : r(e)
        }
        var r = E(34),
            o = E(51),
            T = E(61);
        e.exports = n
    }, function(e, t) {
        function E(e) {
            return e.match(l) || []
        }
        var n = "\\ud800-\\udfff",
            r = "\\u0300-\\u036f",
            o = "\\ufe20-\\ufe2f",
            T = "\\u20d0-\\u20ff",
            R = r + o + T,
            N = "\\ufe0e\\ufe0f",
            i = "[" + n + "]",
            A = "[" + R + "]",
            I = "\\ud83c[\\udffb-\\udfff]",
            O = "(?:" + A + "|" + I + ")",
            u = "[^" + n + "]",
            S = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            a = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            s = "\\u200d",
            L = O + "?",
            c = "[" + N + "]?",
            C = "(?:" + s + "(?:" + [u, S, a].join("|") + ")" + c + L + ")*",
            f = c + L + C,
            p = "(?:" + [u + A + "?", A, S, a, i].join("|") + ")",
            l = RegExp(I + "(?=" + I + ")|" + p + f, "g");
        e.exports = E
    }, function(e, t) {
        function E(e, t) {
            return e === t || e !== e && t !== t
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e) {
            return e = r(e), e && T.test(e) ? e.replace(o, "\\$&") : e
        }
        var r = E(10),
            o = /[\\^$.*+?()[\]{}|]/g,
            T = RegExp(o.source);
        e.exports = n
    }, function(e, t, E) {
        var n = E(37),
            r = E(7),
            o = Object.prototype,
            T = o.hasOwnProperty,
            R = o.propertyIsEnumerable,
            N = n(function() {
                return arguments
            }()) ? n : function(e) {
                return r(e) && T.call(e, "callee") && !R.call(e, "callee")
            };
        e.exports = N
    }, function(e, t, E) {
        (function(e) {
            var n = E(1),
                r = E(70),
                o = "object" == typeof t && t && !t.nodeType && t,
                T = o && "object" == typeof e && e && !e.nodeType && e,
                R = T && T.exports === o,
                N = R ? n.Buffer : void 0,
                i = N ? N.isBuffer : void 0,
                A = i || r;
            e.exports = A
        }).call(t, E(20)(e))
    }, function(e, t, E) {
        function n(e) {
            if (null == e) return !0;
            if (N(e) && (R(e) || "string" == typeof e || "function" == typeof e.splice || i(e) || I(e) || T(e))) return !e.length;
            var t = o(e);
            if (t == O || t == u) return !e.size;
            if (A(e)) return !r(e).length;
            for (var E in e)
                if (a.call(e, E)) return !1;
            return !0
        }
        var r = E(41),
            o = E(49),
            T = E(64),
            R = E(15),
            N = E(16),
            i = E(65),
            A = E(13),
            I = E(67),
            O = "[object Map]",
            u = "[object Set]",
            S = Object.prototype,
            a = S.hasOwnProperty;
        e.exports = n
    }, function(e, t, E) {
        var n = E(40),
            r = E(44),
            o = E(56),
            T = o && o.isTypedArray,
            R = T ? r(T) : n;
        e.exports = R
    }, function(e, t) {
        function E(e) {
            var t = null == e ? 0 : e.length;
            return t ? e[t - 1] : void 0
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e, t, E) {
            return t = (E ? o(e, t, E) : void 0 === t) ? 1 : T(t), r(R(e), t)
        }
        var r = E(42),
            o = E(53),
            T = E(72),
            R = E(10);
        e.exports = n
    }, function(e, t) {
        function E() {
            return !1
        }
        e.exports = E
    }, function(e, t, E) {
        function n(e) {
            if (!e) return 0 === e ? e : 0;
            if (e = r(e), e === o || e === -o) {
                var t = 0 > e ? -1 : 1;
                return t * T
            }
            return e === e ? e : 0
        }
        var r = E(73),
            o = 1 / 0,
            T = 1.7976931348623157e308;
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            var t = r(e),
                E = t % 1;
            return t === t ? E ? t - E : t : 0
        }
        var r = E(71);
        e.exports = n
    }, function(e, t, E) {
        function n(e) {
            if ("number" == typeof e) return e;
            if (o(e)) return T;
            if (r(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = r(t) ? t + "" : t
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(R, "");
            var E = i.test(e);
            return E || A.test(e) ? I(e.slice(2), E ? 2 : 8) : N.test(e) ? T : +e
        }
        var r = E(6),
            o = E(19),
            T = NaN,
            R = /^\s+|\s+$/g,
            N = /^[-+]0x[0-9a-f]+$/i,
            i = /^0b[01]+$/i,
            A = /^0o[0-7]+$/i,
            I = parseInt;
        e.exports = n
    }, function(e, t, E) {
        function n(e, t, E) {
            if (e = N(e), e && (E || void 0 === t)) return e.replace(i, "");
            if (!e || !(t = r(t))) return e;
            var n = R(e),
                A = T(n, R(t)) + 1;
            return o(n, 0, A).join("")
        }
        var r = E(11),
            o = E(45),
            T = E(46),
            R = E(60),
            N = E(10),
            i = /\s+$/;
        e.exports = n
    }])
});