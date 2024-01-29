/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
    window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function () {
        var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, d = {
            timestamp: "HBDC", version: "4.8.0 (Full)", revision: "230f715", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: a }, status: "unloaded", basePath: function () {
                var c = window.CKEDITOR_BASEPATH || ""; if (!c) for (var b = document.getElementsByTagName("script"), d = 0; d < b.length; d++) { var f = b[d].src.match(a); if (f) { c = f[1]; break } } -1 == c.indexOf(":/") && "//" != c.slice(0,
                    2) && (c = 0 === c.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + c : location.href.match(/^[^\?]*\/(?:)/)[0] + c); if (!c) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return c
            }(), getUrl: function (a) { -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp); return a },
            domReady: function () {
                function a() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), c()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), c()) } catch (f) { } } function c() { for (var a; a = b.shift();)a() } var b = []; return function (f) {
                    function e() { try { document.documentElement.doScroll("left") } catch (g) { setTimeout(e, 1); return } a() } b.push(f); "complete" === document.readyState && setTimeout(a, 1); if (1 == b.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                        a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) { document.attachEvent("onreadystatechange", a); window.attachEvent("onload", a); f = !1; try { f = !window.frameElement } catch (m) { } document.documentElement.doScroll && f && e() }
                }
            }()
        }, b = window.CKEDITOR_GETURL; if (b) { var c = d.getUrl; d.getUrl = function (a) { return b.call(d, a) || c.call(d, a) } } return d
    }()), CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (a) { var d = CKEDITOR.event.prototype, b; for (b in d) null == a[b] && (a[b] = d[b]) },
        CKEDITOR.event.prototype = function () {
            function a(a) { var h = d(this); return h[a] || (h[a] = new b(a)) } var d = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, b = function (a) { this.name = a; this.listeners = [] }; b.prototype = { getListenerIndex: function (a) { for (var b = 0, d = this.listeners; b < d.length; b++)if (d[b].fn == a) return b; return -1 } }; return {
                define: function (c, b) { var d = a.call(this, c); CKEDITOR.tools.extend(d, b, !0) }, on: function (c, b, d, k, f) {
                    function e(g, a, f, e) {
                        g = {
                            name: c, sender: this, editor: g,
                            data: a, listenerData: k, stop: f, cancel: e, removeListener: m
                        }; return !1 === b.call(d, g) ? !1 : g.data
                    } function m() { n.removeListener(c, b) } var g = a.call(this, c); if (0 > g.getListenerIndex(b)) { g = g.listeners; d || (d = this); isNaN(f) && (f = 10); var n = this; e.fn = b; e.priority = f; for (var p = g.length - 1; 0 <= p; p--)if (g[p].priority <= f) return g.splice(p + 1, 0, e), { removeListener: m }; g.unshift(e) } return { removeListener: m }
                }, once: function () {
                    var a = Array.prototype.slice.call(arguments), b = a[1]; a[1] = function (a) {
                        a.removeListener(); return b.apply(this,
                            arguments)
                    }; return this.on.apply(this, a)
                }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                    var a = 0, b = function () { a = 1 }, l = 0, k = function () { l = 1 }; return function (f, e, m) {
                        var g = d(this)[f]; f = a; var n = l; a = l = 0; if (g) { var p = g.listeners; if (p.length) for (var p = p.slice(0), q, r = 0; r < p.length; r++) { if (g.errorProof) try { q = p[r].call(this, m, e, b, k) } catch (w) { } else q = p[r].call(this, m, e, b, k); !1 === q ? l = 1 : "undefined" != typeof q && (e = q); if (a || l) break } } e =
                            l ? !1 : "undefined" == typeof e ? !0 : e; a = f; l = n; return e
                    }
                }(), fireOnce: function (a, b, l) { b = this.fire(a, b, l); delete d(this)[a]; return b }, removeListener: function (a, b) { var l = d(this)[a]; if (l) { var k = l.getListenerIndex(b); 0 <= k && l.listeners.splice(k, 1) } }, removeAllListeners: function () { var a = d(this), b; for (b in a) delete a[b] }, hasListeners: function (a) { return (a = d(this)[a]) && 0 < a.listeners.length }
            }
        }()), CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire =
            function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, d, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
                var a = navigator.userAgent.toLowerCase(), d = a.match(/edge[ \/](\d+.?\d*)/), b = -1 < a.indexOf("trident/"), b = !(!d && !b), b = {
                    ie: b, edge: !!d, webkit: !b &&
                        -1 < a.indexOf(" applewebkit/"), air: -1 < a.indexOf(" adobeair/"), mac: -1 < a.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < a.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(a), isCustomDomain: function () { if (!this.ie) return !1; var a = document.domain, b = window.location.hostname; return a != b && a != "[" + b + "]" }, secure: "https:" == location.protocol
                }; b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie; b.webkit && (-1 < a.indexOf("chrome") ? b.chrome =
                    !0 : b.safari = !0); var c = 0; b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks); b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split("."), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0)); b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1])); b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); b.version = c; b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit &&
                        534 > c); b.hidpi = 2 <= window.devicePixelRatio; b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c; b.needsNbspFiller = b.ie && 11 > c; b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown"); b.quirks && (b.cssClass += " cke_browser_quirks"); b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version)); b.air && (b.cssClass += " cke_browser_air"); b.iOS && (b.cssClass += " cke_browser_ios"); b.hidpi && (b.cssClass += " cke_hidpi"); return b
            }()), "unloaded" == CKEDITOR.status && function () {
                CKEDITOR.event.implementOn(CKEDITOR);
                CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var a = document.createElement("script"); a.type = "text/javascript"; a.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add = function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () {
                    CKEDITOR.domReady(function () {
                        var a = CKEDITOR.loadFullCore, d = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status =
                            "basic_ready", a && a._load ? a() : d && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * d))
                    })
                })(); CKEDITOR.status = "basic_loaded"
            }(), "use strict", CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: d }) }, CKEDITOR.error = function (a, d) {
                CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log",
                    { type: "error", errorCode: a, additionalData: d })
            }, CKEDITOR.on("log", function (a) { if (window.console && window.console.log) { var d = console[a.data.type] ? a.data.type : "log", b = a.data.errorCode; if (a = a.data.additionalData) console[d]("[CKEDITOR] Error code: " + b + ".", a); else console[d]("[CKEDITOR] Error code: " + b + "."); console[d]("[CKEDITOR] For more information about this error go to https://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_errors-section-" + b) } }, null, null, 999), CKEDITOR.dom = {}, function () {
                var a = [], d = CKEDITOR.env.gecko ?
                    "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", b = /&/g, c = />/g, h = /</g, l = /"/g, k = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, f = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, e = function (a, g) { return "#" == g[0] ? String.fromCharCode(parseInt(g.slice(1), 10)) : f[g] }; CKEDITOR.on("reset", function () { a = [] }); CKEDITOR.tools = {
                        arrayCompare: function (a, g) { if (!a && !g) return !0; if (!a || !g || a.length != g.length) return !1; for (var f = 0; f < a.length; f++)if (a[f] != g[f]) return !1; return !0 }, getIndex: function (a, g) {
                            for (var f =
                                0; f < a.length; ++f)if (g(a[f])) return f; return -1
                        }, clone: function (a) { var g; if (a && a instanceof Array) { g = []; for (var f = 0; f < a.length; f++)g[f] = CKEDITOR.tools.clone(a[f]); return g } if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a; g = new a.constructor; for (f in a) g[f] = CKEDITOR.tools.clone(a[f]); return g }, capitalize: function (a, g) { return a.charAt(0).toUpperCase() + (g ? a.slice(1) : a.slice(1).toLowerCase()) },
                        extend: function (a) { var g = arguments.length, f, e; "boolean" == typeof (f = arguments[g - 1]) ? g-- : "boolean" == typeof (f = arguments[g - 2]) && (e = arguments[g - 1], g -= 2); for (var b = 1; b < g; b++) { var c = arguments[b], h; for (h in c) if (!0 === f || null == a[h]) if (!e || h in e) a[h] = c[h] } return a }, prototypedCopy: function (a) { var g = function () { }; g.prototype = a; return new g }, copy: function (a) { var g = {}, f; for (f in a) g[f] = a[f]; return g }, isArray: function (a) { return "[object Array]" == Object.prototype.toString.call(a) }, isEmpty: function (a) {
                            for (var g in a) if (a.hasOwnProperty(g)) return !1;
                            return !0
                        }, cssVendorPrefix: function (a, g, f) { if (f) return d + a + ":" + g + ";" + a + ":" + g; f = {}; f[a] = g; f[d + a] = g; return f }, cssStyleToDomStyle: function () { var a = document.createElement("div").style, g = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float"; return function (a) { return "float" == a ? g : a.replace(/-./g, function (g) { return g.substr(1).toUpperCase() }) } }(), buildStyleHtml: function (a) {
                            a = [].concat(a); for (var g, f = [], e = 0; e < a.length; e++)if (g = a[e]) /@import|[{}]/.test(g) ? f.push("\x3cstyle\x3e" +
                                g + "\x3c/style\x3e") : f.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + g + '"\x3e'); return f.join("")
                        }, htmlEncode: function (a) { return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(h, "\x26lt;") }, htmlDecode: function (a) { return a.replace(k, e) }, htmlEncodeAttr: function (a) { return CKEDITOR.tools.htmlEncode(a).replace(l, "\x26quot;") }, htmlDecodeAttr: function (a) { return CKEDITOR.tools.htmlDecode(a) }, transformPlainTextToHtml: function (a, g) {
                            var f = g == CKEDITOR.ENTER_BR,
                            e = this.htmlEncode(a.replace(/\r\n/g, "\n")), e = e.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), b = g == CKEDITOR.ENTER_P ? "p" : "div"; if (!f) { var c = /\n{2}/g; if (c.test(e)) var h = "\x3c" + b + "\x3e", d = "\x3c/" + b + "\x3e", e = h + e.replace(c, function () { return d + h }) + d } e = e.replace(/\n/g, "\x3cbr\x3e"); f || (e = e.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + b + "\x3e)"), function (g) { return CKEDITOR.tools.repeat(g, 2) })); e = e.replace(/^ | $/g, "\x26nbsp;"); return e = e.replace(/(>|\s) /g, function (g, a) { return a + "\x26nbsp;" }).replace(/ (?=<)/g,
                                "\x26nbsp;")
                        }, getNextNumber: function () { var a = 0; return function () { return ++a } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () { for (var a = "e", g = 0; 8 > g; g++)a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return a }, override: function (a, g) { var f = g(a); f.prototype = a.prototype; return f }, setTimeout: function (a, g, f, e, b) { b || (b = window); f || (f = b); return b.setTimeout(function () { e ? a.apply(f, [].concat(e)) : a.apply(f) }, g || 0) }, trim: function () {
                            var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                            return function (g) { return g.replace(a, "") }
                        }(), ltrim: function () { var a = /^[ \t\n\r]+/g; return function (g) { return g.replace(a, "") } }(), rtrim: function () { var a = /[ \t\n\r]+$/g; return function (g) { return g.replace(a, "") } }(), indexOf: function (a, g) { if ("function" == typeof g) for (var f = 0, e = a.length; f < e; f++) { if (g(a[f])) return f } else { if (a.indexOf) return a.indexOf(g); f = 0; for (e = a.length; f < e; f++)if (a[f] === g) return f } return -1 }, search: function (a, g) { var f = CKEDITOR.tools.indexOf(a, g); return 0 <= f ? a[f] : null }, bind: function (a,
                            g) { return function () { return a.apply(g, arguments) } }, createClass: function (a) {
                                var g = a.$, f = a.base, e = a.privates || a._, b = a.proto; a = a.statics; !g && (g = function () { f && this.base.apply(this, arguments) }); if (e) var c = g, g = function () { var g = this._ || (this._ = {}), a; for (a in e) { var f = e[a]; g[a] = "function" == typeof f ? CKEDITOR.tools.bind(f, this) : f } c.apply(this, arguments) }; f && (g.prototype = this.prototypedCopy(f.prototype), g.prototype.constructor = g, g.base = f, g.baseProto = f.prototype, g.prototype.base = function () {
                                    this.base = f.prototype.base;
                                    f.apply(this, arguments); this.base = arguments.callee
                                }); b && this.extend(g.prototype, b, !0); a && this.extend(g, a, !0); return g
                            }, addFunction: function (f, g) { return a.push(function () { return f.apply(g || this, arguments) }) - 1 }, removeFunction: function (f) { a[f] = null }, callFunction: function (f) { var g = a[f]; return g && g.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () { var a = /^-?\d+\.?\d*px$/, g; return function (f) { g = CKEDITOR.tools.trim(f + "") + "px"; return a.test(g) ? g : f || "" } }(), convertToPx: function () {
                                var a;
                                return function (g) { a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a)); return /%$/.test(g) ? g : (a.setStyle("width", g), a.$.clientWidth) }
                            }(), repeat: function (a, g) { return Array(g + 1).join(a) }, tryThese: function () { for (var a, g = 0, f = arguments.length; g < f; g++) { var e = arguments[g]; try { a = e(); break } catch (b) { } } return a }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") },
                        defer: function (a) { return function () { var g = arguments, f = this; window.setTimeout(function () { a.apply(f, g) }, 0) } }, normalizeCssText: function (a, g) { var f = [], e, b = CKEDITOR.tools.parseCssText(a, !0, g); for (e in b) f.push(e + ":" + b[e]); f.sort(); return f.length ? f.join(";") + ";" : "" }, convertRgbToHex: function (a) { return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (g, a, f, e) { g = [a, f, e]; for (a = 0; 3 > a; a++)g[a] = ("0" + parseInt(g[a], 10).toString(16)).slice(-2); return "#" + g.join("") }) }, normalizeHex: function (a) {
                            return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi,
                                function (g, a, f, e) { g = a.toLowerCase(); 3 == g.length && (g = g.split(""), g = [g[0], g[0], g[1], g[1], g[2], g[2]].join("")); return "#" + g + e })
                        }, parseCssText: function (a, g, f) {
                            var e = {}; f && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || ""); a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a))); if (!a || ";" == a) return e; a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, f, m) {
                                g && (f = f.toLowerCase(), "font-family" == f && (m = m.replace(/\s*,\s*/g,
                                    ",")), m = CKEDITOR.tools.trim(m)); e[f] = m
                            }); return e
                        }, writeCssText: function (a, g) { var f, e = []; for (f in a) e.push(f + ":" + a[f]); g && e.sort(); return e.join("; ") }, objectCompare: function (a, g, f) { var e; if (!a && !g) return !0; if (!a || !g) return !1; for (e in a) if (a[e] != g[e]) return !1; if (!f) for (e in g) if (a[e] != g[e]) return !1; return !0 }, objectKeys: function (a) { var g = [], f; for (f in a) g.push(f); return g }, convertArrayToObject: function (a, g) { var f = {}; 1 == arguments.length && (g = !0); for (var e = 0, b = a.length; e < b; ++e)f[a[e]] = g; return f }, fixDomain: function () {
                            for (var a; ;)try {
                                a =
                                window.parent.document.domain; break
                            } catch (g) { a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain; if (!a) break; document.domain = a } return !!a
                        }, eventsBuffer: function (a, g, f) { function e() { c = (new Date).getTime(); b = !1; f ? g.call(f) : g() } var b, c = 0; return { input: function () { if (!b) { var g = (new Date).getTime() - c; g < a ? b = setTimeout(e, a - g) : e() } }, reset: function () { b && clearTimeout(b); b = c = 0 } } }, enableHtml5Elements: function (a, g) {
                            for (var f = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
                                e = f.length, b; e--;)b = a.createElement(f[e]), g && a.appendChild(b)
                        }, checkIfAnyArrayItemMatches: function (a, g) { for (var f = 0, e = a.length; f < e; ++f)if (a[f].match(g)) return !0; return !1 }, checkIfAnyObjectPropertyMatches: function (a, g) { for (var f in a) if (f.match(g)) return !0; return !1 }, keystrokeToString: function (a, g) { var f = this.keystrokeToArray(a, g); f.display = f.display.join("+"); f.aria = f.aria.join("+"); return f }, keystrokeToArray: function (a, g) {
                            var f = g & 16711680, e = g & 65535, b = CKEDITOR.env.mac, c = [], h = []; f & CKEDITOR.CTRL && (c.push(b ?
                                "⌘" : a[17]), h.push(b ? a[224] : a[17])); f & CKEDITOR.ALT && (c.push(b ? "⌥" : a[18]), h.push(a[18])); f & CKEDITOR.SHIFT && (c.push(b ? "⇧" : a[16]), h.push(a[16])); e && (a[e] ? (c.push(a[e]), h.push(a[e])) : (c.push(String.fromCharCode(e)), h.push(String.fromCharCode(e)))); return { display: c, aria: h }
                        }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d", getCookie: function (a) {
                            a = a.toLowerCase(); for (var g = document.cookie.split(";"), f, e, b = 0; b < g.length; b++)if (f = g[b].split("\x3d"),
                                e = decodeURIComponent(CKEDITOR.tools.trim(f[0]).toLowerCase()), e === a) return decodeURIComponent(1 < f.length ? f[1] : ""); return null
                        }, setCookie: function (a, g) { document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(g) + ";path\x3d/" }, getCsrfToken: function () {
                            var a = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!a || 40 != a.length) {
                                var a = [], g = ""; if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a); else for (var f = 0; 40 > f; f++)a.push(Math.floor(256 * Math.random()));
                                for (f = 0; f < a.length; f++)var e = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[f] % 36), g = g + (.5 < Math.random() ? e.toUpperCase() : e); a = g; CKEDITOR.tools.setCookie("ckCsrfToken", a)
                            } return a
                        }, escapeCss: function (a) { return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : "" }, getMouseButton: function (a) {
                            var g = (a = a.data) && a.$; return a && g ? CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 4 === g.button ? CKEDITOR.MOUSE_BUTTON_MIDDLE : 1 === g.button ? CKEDITOR.MOUSE_BUTTON_LEFT :
                                CKEDITOR.MOUSE_BUTTON_RIGHT : g.button : !1
                        }, convertHexStringToBytes: function (a) { var g = [], f = a.length / 2, e; for (e = 0; e < f; e++)g.push(parseInt(a.substr(2 * e, 2), 16)); return g }, convertBytesToBase64: function (a) {
                            var g = "", f = a.length, e; for (e = 0; e < f; e += 3) {
                                var b = a.slice(e, e + 3), c = b.length, h = [], d; if (3 > c) for (d = c; 3 > d; d++)b[d] = 0; h[0] = (b[0] & 252) >> 2; h[1] = (b[0] & 3) << 4 | b[1] >> 4; h[2] = (b[1] & 15) << 2 | (b[2] & 192) >> 6; h[3] = b[2] & 63; for (d = 0; 4 > d; d++)g = d <= c ? g + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h[d]) : g +
                                    "\x3d"
                            } return g
                        }, style: {
                            parse: {
                                _colors: {
                                    aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD", blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9",
                                    darkgreen: "#006400", darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF",
                                    gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1",
                                    lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA",
                                    mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399", red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072",
                                    sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFFFFF", whitesmoke: "#F5F5F5", yellow: "#FFFF00", yellowgreen: "#9ACD32"
                                }, _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "),
                                _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/, _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (a) { var g = {}, f = this._findColor(a); f.length && (g.color = f[0], CKEDITOR.tools.array.forEach(f, function (g) { a = a.replace(g, "") })); if (a = CKEDITOR.tools.trim(a)) g.unprocessed = a; return g }, margin: function (a) {
                                    function g(a) {
                                        f.top = e[a[0]]; f.right =
                                            e[a[1]]; f.bottom = e[a[2]]; f.left = e[a[3]]
                                    } var f = {}, e = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"]; switch (e.length) { case 1: g([0, 0, 0, 0]); break; case 2: g([0, 1, 0, 1]); break; case 3: g([0, 1, 2, 1]); break; case 4: g([0, 1, 2, 3]) }return f
                                }, border: function (a) {
                                    var g = {}; a = a.split(/\s+/); CKEDITOR.tools.array.forEach(a, function (a) {
                                        if (!g.color) { var f = CKEDITOR.tools.style.parse._findColor(a); if (f.length) { g.color = f[0]; return } } g.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle,
                                            a) ? !g.width && CKEDITOR.tools.style.parse._widthRegExp.test(a) && (g.width = a) : g.style = a
                                    }); return g
                                }, _findColor: function (a) { var g = [], f = CKEDITOR.tools.array, g = g.concat(a.match(this._rgbaRegExp) || []), g = g.concat(a.match(this._hslaRegExp) || []); return g = g.concat(f.filter(a.split(/\s+/), function (a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors })) }
                            }
                        }, array: {
                            filter: function (a, g, f) { var e = []; this.forEach(a, function (b, c) { g.call(f, b, c, a) && e.push(b) }); return e },
                            forEach: function (a, g, f) { var e = a.length, b; for (b = 0; b < e; b++)g.call(f, a[b], b, a) }, map: function (a, g, f) { for (var e = [], b = 0; b < a.length; b++)e.push(g.call(f, a[b], b, a)); return e }, reduce: function (a, g, f, e) { for (var b = 0; b < a.length; b++)f = g.call(e, f, a[b], b, a); return f }, every: function (a, g, f) { if (!a.length) return !0; g = this.filter(a, g, f); return a.length === g.length }
                        }, object: {
                            findKey: function (a, g) { if ("object" !== typeof a) return null; for (var f in a) if (a[f] === g) return f; return null }, merge: function (a, g) {
                                var f = CKEDITOR.tools, e =
                                    f.clone(a), b = f.clone(g); f.array.forEach(f.objectKeys(b), function (a) { e[a] = "object" === typeof b[a] && "object" === typeof e[a] ? f.object.merge(e[a], b[a]) : b[a] }); return e
                            }
                        }
                    }; CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE = 1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
            }(), CKEDITOR.dtd = function () {
                var a = CKEDITOR.tools.extend, d = function (a, g) {
                    for (var f = CKEDITOR.tools.clone(a), e = 1; e < arguments.length; e++) {
                        g = arguments[e];
                        for (var b in g) delete f[b]
                    } return f
                }, b = {}, c = {}, h = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, l = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, k = {}, f = { "#": 1 }, e = { center: 1, dir: 1, noframes: 1 }; a(b, {
                    a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1,
                    img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1
                }, f, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(c, h, b, e); d = {
                    a: d(b, { a: 1, button: 1 }), abbr: b, address: c, area: k, article: c, aside: c, audio: a({ source: 1, track: 1 }, c), b: b, base: k, bdi: b, bdo: b, blockquote: c, body: c, br: k, button: d(b, { a: 1, button: 1 }), canvas: b, caption: c,
                    cite: b, code: b, col: k, colgroup: { col: 1 }, command: k, datalist: a({ option: 1 }, b), dd: c, del: b, details: a({ summary: 1 }, c), dfn: b, div: c, dl: { dt: 1, dd: 1 }, dt: c, em: b, embed: k, fieldset: a({ legend: 1 }, c), figcaption: c, figure: a({ figcaption: 1 }, c), footer: c, form: c, h1: b, h2: b, h3: b, h4: b, h5: b, h6: b, head: a({ title: 1, base: 1 }, l), header: c, hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, hr: k, html: a({ head: 1, body: 1 }, c, l), i: b, iframe: f, img: k, input: k, ins: b, kbd: b, keygen: k, label: b, legend: b, li: c, link: k, main: c, map: c, mark: b, menu: a({ li: 1 }, c), meta: k, meter: d(b,
                        { meter: 1 }), nav: c, noscript: a({ link: 1, meta: 1, style: 1 }, b), object: a({ param: 1 }, b), ol: { li: 1 }, optgroup: { option: 1 }, option: f, output: b, p: b, param: k, pre: b, progress: d(b, { progress: 1 }), q: b, rp: b, rt: b, ruby: a({ rp: 1, rt: 1 }, b), s: b, samp: b, script: f, section: c, select: { optgroup: 1, option: 1 }, small: b, source: k, span: b, strong: b, style: f, sub: b, summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, b), sup: b, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: c, textarea: f, tfoot: { tr: 1 }, th: c, thead: { tr: 1 }, time: d(b, { time: 1 }), title: f,
                    tr: { th: 1, td: 1 }, track: k, u: b, ul: { li: 1 }, "var": b, video: a({ source: 1, track: 1 }, c), wbr: k, acronym: b, applet: a({ param: 1 }, c), basefont: k, big: b, center: c, dialog: k, dir: { li: 1 }, font: b, isindex: k, noframes: c, strike: b, tt: b
                }; a(d, {
                    $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, h, e), $blockLimit: { article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1 }, $cdata: {
                        script: 1,
                        style: 1
                    }, $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 }, $empty: { area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 }, $inline: b, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: a({ body: 1, head: 1, html: 1 }, d.head), $nonEditable: {
                        applet: 1, audio: 1,
                        button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1
                    }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: { abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1 }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: {
                        caption: 1,
                        col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1
                    }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
                }); return d
            }(), CKEDITOR.dom.event = function (a) { this.$ = a }, CKEDITOR.dom.event.prototype = {
                getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () {
                    var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a +=
                        CKEDITOR.CTRL; this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a
                }, preventDefault: function (a) { var d = this.$; d.preventDefault ? d.preventDefault() : d.returnValue = !1; a && this.stopPropagation() }, stopPropagation: function () { var a = this.$; a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 }, getTarget: function () { var a = this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () {
                    var a = this.getTarget().getDocument().$;
                    return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) }
                }
            }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) }, CKEDITOR.dom.domObject.prototype = function () {
                var a = function (a, b) {
                    return function (c) {
                        "undefined" != typeof CKEDITOR && a.fire(b,
                            new CKEDITOR.dom.event(c))
                    }
                }; return {
                    getPrivate: function () { var a; (a = this.getCustomData("_")) || this.setCustomData("_", a = {}); return a }, on: function (d) { var b = this.getCustomData("_cke_nativeListeners"); b || (b = {}, this.setCustomData("_cke_nativeListeners", b)); b[d] || (b = b[d] = a(this, d), this.$.addEventListener ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + d, b)); return CKEDITOR.event.prototype.on.apply(this, arguments) }, removeListener: function (a) {
                        CKEDITOR.event.prototype.removeListener.apply(this,
                            arguments); if (!this.hasListeners(a)) { var b = this.getCustomData("_cke_nativeListeners"), c = b && b[a]; c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a]) }
                    }, removeAllListeners: function () { var a = this.getCustomData("_cke_nativeListeners"), b; for (b in a) { var c = a[b]; this.$.detachEvent ? this.$.detachEvent("on" + b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1); delete a[b] } CKEDITOR.event.prototype.removeAllListeners.call(this) }
                }
            }(),
        function (a) {
            var d = {}; CKEDITOR.on("reset", function () { d = {} }); a.equals = function (a) { try { return a && a.$ === this.$ } catch (c) { return !1 } }; a.setCustomData = function (a, c) { var h = this.getUniqueId(); (d[h] || (d[h] = {}))[a] = c; return this }; a.getCustomData = function (a) { var c = this.$["data-cke-expando"]; return (c = c && d[c]) && a in c ? c[a] : null }; a.removeCustomData = function (a) { var c = this.$["data-cke-expando"], c = c && d[c], h, l; c && (h = c[a], l = a in c, delete c[a]); return l ? h : null }; a.clearCustomData = function () {
                this.removeAllListeners(); var a =
                    this.$["data-cke-expando"]; a && delete d[a]
            }; a.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(a)
        }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function (a) {
            return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
                "documentFragment" : "domObject"](a) : this
        }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
            appendTo: function (a, d) {
                a.append(this, d);
                return a
            }, clone: function (a, d) {
                function b(c) { c["data-cke-expando"] && (c["data-cke-expando"] = !1); if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) { c = c.childNodes; for (var h = 0; h < c.length; h++)b(c[h]) } } function c(b) {
                    if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) { var h = b.getName(); ":" == h[0] && b.renameNode(h.substring(1)) } if (a) for (h = 0; h <
                            b.getChildCount(); h++)c(b.getChild(h))
                    }
                } var h = this.$.cloneNode(a); b(h); h = new CKEDITOR.dom.node(h); CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(h); return h
            }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a }, insertBefore: function (a) { a.$.parentNode.insertBefore(this.$, a.$); return a }, insertBeforeMe: function (a) {
                this.$.parentNode.insertBefore(a.$,
                    this.$); return a
            }, getAddress: function (a) { for (var d = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) { var h = c.parentNode; h && d.unshift(this.getIndex.call({ $: c }, a)); c = h } return d }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (a) {
                function d(a, f) { var e = f ? a.nextSibling : a.previousSibling; return e && e.nodeType == CKEDITOR.NODE_TEXT ? b(e) ? d(e, f) : e : null } function b(a) { return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE }
                var c = this.$, h = -1, l; if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !d(c) && !d(c, !0)) return -1; do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (l || b(c)) || (h++, l = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling); return h
            }, getNextSourceNode: function (a, d, b) {
                if (b && !b.call) { var c = b; b = function (a) { return !a.equals(c) } } a = !a && this.getFirst && this.getFirst(); var h; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getNext() } for (; !a && (h = (h || this).getParent());) {
                    if (b &&
                        !1 === b(h, !0)) return null; a = h.getNext()
                } return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
            }, getPreviousSourceNode: function (a, d, b) {
                if (b && !b.call) { var c = b; b = function (a) { return !a.equals(c) } } a = !a && this.getLast && this.getLast(); var h; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getPrevious() } for (; !a && (h = (h || this).getParent());) { if (b && !1 === b(h, !0)) return null; a = h.getPrevious() } return !a || b && !1 === b(a) ? null : d && a.type != d ? a.getPreviousSourceNode(!1, d, b) :
                    a
            }, getPrevious: function (a) { var d = this.$, b; do b = (d = d.previousSibling) && 10 != d.nodeType && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b }, getNext: function (a) { var d = this.$, b; do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b }, getParent: function (a) { var d = this.$.parentNode; return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(d) : null }, getParents: function (a) {
                var d = this, b = []; do b[a ? "push" : "unshift"](d); while (d = d.getParent());
                return b
            }, getCommonAncestor: function (a) { if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; var d = this.contains ? this : this.getParent(); do if (d.contains(a)) return d; while (d = d.getParent()); return null }, getPosition: function (a) {
                var d = this.$, b = a.$; if (d.compareDocumentPosition) return d.compareDocumentPosition(b); if (d == b) return CKEDITOR.POSITION_IDENTICAL; if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                    if (d.contains) {
                        if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS +
                            CKEDITOR.POSITION_PRECEDING; if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                    } if ("sourceIndex" in d) return 0 > d.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                } d = this.getAddress(); a = a.getAddress(); for (var b = Math.min(d.length, a.length), c = 0; c < b; c++)if (d[c] != a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return d.length < a.length ? CKEDITOR.POSITION_CONTAINS +
                    CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
            }, getAscendant: function (a, d) { var b = this.$, c, h; d || (b = b.parentNode); "function" == typeof a ? (h = !0, c = a) : (h = !1, c = function (b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a }); for (; b;) { if (c(h ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b); try { b = b.parentNode } catch (l) { b = null } } return null }, hasAscendant: function (a, d) {
                var b = this.$; d || (b = b.parentNode); for (; b;) {
                    if (b.nodeName &&
                        b.nodeName.toLowerCase() == a) return !0; b = b.parentNode
                } return !1
            }, move: function (a, d) { a.append(this.remove(), d) }, remove: function (a) { var d = this.$, b = d.parentNode; if (b) { if (a) for (; a = d.firstChild;)b.insertBefore(d.removeChild(a), d); b.removeChild(d) } return this }, replace: function (a) { this.insertBefore(a); a.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
                for (var a; this.getFirst && (a = this.getFirst());) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        var d = CKEDITOR.tools.ltrim(a.getText()), b = a.getLength(); if (d) d.length <
                            b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue }
                    } break
                }
            }, rtrim: function () { for (var a; this.getLast && (a = this.getLast());) { if (a.type == CKEDITOR.NODE_TEXT) { var d = CKEDITOR.tools.rtrim(a.getText()), b = a.getLength(); if (d) d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break } CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a) }, isReadOnly: function (a) {
                var d =
                    this; this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent()); CKEDITOR.env.edge && d && d.is("textarea", "input") && (a = !0); if (!a && d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable")); for (; d;) { if (d.data("cke-editable")) return !1; if (d.hasAttribute("contenteditable")) return "false" == d.getAttribute("contenteditable"); d = d.getParent() } return !0
            }
        }), CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject,
        CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
            focus: function () { this.$.focus() }, getViewPaneSize: function () { var a = this.$.document, d = "CSS1Compat" == a.compatMode; return { width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } }, getScrollPosition: function () {
                var a = this.$; if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 }; a = a.document; return {
                    x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop ||
                        a.body.scrollTop || 0
                }
            }, getFrame: function () { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
        }), CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
            type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) {
                if (this.$.createStyleSheet) this.$.createStyleSheet(a); else {
                    var d = new CKEDITOR.dom.element("link"); d.setAttributes({
                        rel: "stylesheet", type: "text/css",
                        href: a
                    }); this.getHead().append(d)
                }
            }, appendStyleText: function (a) { if (this.$.createStyleSheet) { var d = this.$.createStyleSheet(""); d.cssText = a } else { var b = new CKEDITOR.dom.element("style", this); b.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(b) } return d || b.$.sheet }, createElement: function (a, d) { var b = new CKEDITOR.dom.element(a, this); d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles)); return b }, createText: function (a) { return new CKEDITOR.dom.text(a, this) }, focus: function () { this.getWindow().focus() },
            getActive: function () { var a; try { a = this.$.activeElement } catch (d) { return null } return new CKEDITOR.dom.element(a) }, getById: function (a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null }, getByAddress: function (a, d) {
                for (var b = this.$.documentElement, c = 0; b && c < a.length; c++) { var h = a[c]; if (d) for (var l = -1, k = 0; k < b.childNodes.length; k++) { var f = b.childNodes[k]; if (!0 !== d || 3 != f.nodeType || !f.previousSibling || 3 != f.previousSibling.nodeType) if (l++, l == h) { b = f; break } } else b = b.childNodes[h] } return b ? new CKEDITOR.dom.node(b) :
                    null
            }, getElementsByTag: function (a, d) { CKEDITOR.env.ie && 8 >= document.documentMode || !d || (a = d + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) }, getHead: function () { var a = this.$.getElementsByTagName("head")[0]; return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0) }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () {
                return new CKEDITOR.dom.window(this.$.parentWindow ||
                    this.$.defaultView)
            }, write: function (a) { this.$.open("text/html", "replace"); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(a); this.$.close() }, find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) }, findOne: function (a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null }, _getHtml5ShivFrag: function () {
                var a = this.getCustomData("html5ShivFrag"); a ||
                    (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a)); return a
            }
        }), CKEDITOR.dom.nodeList = function (a) { this.$ = a }, CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null }, toArray: function () { return CKEDITOR.tools.array.map(this.$, function (a) { return new CKEDITOR.dom.node(a) }) } }, CKEDITOR.dom.element = function (a, d) {
            "string" == typeof a &&
            (a = (d ? d.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a)
        }, CKEDITOR.dom.element.get = function (a) { return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (a, d) { var b = new CKEDITOR.dom.element("div", d); b.setHtml(a); return b.getFirst().remove() }, CKEDITOR.dom.element.setMarker = function (a, d, b, c) {
            var h = d.getCustomData("list_marker_id") ||
                d.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), l = d.getCustomData("list_marker_names") || d.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); a[h] = d; l[b] = 1; return d.setCustomData(b, c)
        }, CKEDITOR.dom.element.clearAllMarkers = function (a) { for (var d in a) CKEDITOR.dom.element.clearMarkers(a, a[d], 1) }, CKEDITOR.dom.element.clearMarkers = function (a, d, b) {
            var c = d.getCustomData("list_marker_names"), h = d.getCustomData("list_marker_id"), l; for (l in c) d.removeCustomData(l);
            d.removeCustomData("list_marker_names"); b && (d.removeCustomData("list_marker_id"), delete a[h])
        }, function () {
            function a(a, e) { return -1 < (" " + a + " ").replace(l, " ").indexOf(" " + e + " ") } function d(a) { var e = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), e = !1); return function () { e || a.removeAttribute("id") } } function b(a, e) { var b = CKEDITOR.tools.escapeCss(a.$.id); return "#" + b + " " + e.split(/,\s*/).join(", #" + b + " ") } function c(a) {
                for (var e = 0, b = 0, g = k[a].length; b < g; b++)e += parseFloat(this.getComputedStyle(k[a][b]) ||
                    0, 10) || 0; return e
            } var h = document.createElement("_").classList, h = "undefined" !== typeof h && null !== String(h.add).match(/\[Native code\]/gi), l = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_ELEMENT, addClass: h ? function (a) { this.$.classList.add(a); return this } : function (f) { var e = this.$.className; e && (a(e, f) || (e += " " + f)); this.$.className = e || f; return this }, removeClass: h ? function (a) { var e = this.$; e.classList.remove(a); e.className || e.removeAttribute("class"); return this } : function (f) {
                    var e =
                        this.getAttribute("class"); e && a(e, f) && ((e = e.replace(new RegExp("(?:^|\\s+)" + f + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", e) : this.removeAttribute("class")); return this
                }, hasClass: function (f) { return a(this.$.className, f) }, append: function (a, e) { "string" == typeof a && (a = this.getDocument().createElement(a)); e ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a }, appendHtml: function (a) {
                    if (this.$.childNodes.length) {
                        var e = new CKEDITOR.dom.element("div", this.getDocument());
                        e.setHtml(a); e.moveChildren(this)
                    } else this.setHtml(a)
                }, appendText: function (a) { null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a)) }, appendBogus: function (a) { if (a || CKEDITOR.env.needsBrFiller) { for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a)) } }, breakParent: function (a,
                    e) { var b = new CKEDITOR.dom.range(this.getDocument()); b.setStartAfter(this); b.setEndAfter(a); var g = b.extractContents(!1, e || !1), c; b.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (b = new CKEDITOR.dom.element("div"); c = g.getFirst();)c.$.style.backgroundColor && (c.$.style.backgroundColor = c.$.style.backgroundColor), b.append(c); b.insertAfter(this); b.remove(!0) } else g.insertAfterNode(this) }, contains: document.compareDocumentPosition ? function (a) {
                        return !!(this.$.compareDocumentPosition(a.$) &
                            16)
                    } : function (a) { var e = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? e.contains(a.getParent().$) : e != a.$ && e.contains(a.$) }, focus: function () { function a() { try { this.$.focus() } catch (f) { } } return function (e) { e ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () {
                        if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0));
                        return a.innerHTML
                    }, getClientRect: function () { var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect()); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) {
                        try { var e = this.$; if (this.getParent()) return e.innerHTML = a; var b = this.getDocument()._getHtml5ShivFrag(); b.appendChild(e); e.innerHTML = a; b.removeChild(e); return a } catch (g) {
                            this.$.innerHTML = ""; e = new CKEDITOR.dom.element("body", this.getDocument()); e.$.innerHTML =
                                a; for (e = e.getChildren(); e.count();)this.append(e.getItem(0)); return a
                        }
                    } : function (a) { return this.$.innerHTML = a }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (e) { this.$[a ? "textContent" : "innerText"] = e } }(), getAttribute: function () {
                        var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                            switch (a) {
                                case "class": a = "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name;
                                case "tabindex": return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                            }return this.$.getAttribute(a, 2)
                        } : a
                    }(), getAttributes: function (a) {
                        var e =
                            {}, b = this.$.attributes, g; a = CKEDITOR.tools.isArray(a) ? a : []; for (g = 0; g < b.length; g++)-1 === CKEDITOR.tools.indexOf(a, b[g].name) && (e[b[g].name] = b[g].value); return e
                    }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) { var e = this.getWindow().$.getComputedStyle(this.$, null); return e ? e.getPropertyValue(a) : "" } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] }, getDtd: function () {
                        var a =
                            CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return a }; return a
                    }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" }, getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () {
                        return this.$.name ||
                            null
                    }, getName: function () { var a = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && 8 >= document.documentMode) { var e = this.$.scopeName; "HTML" != e && (a = e.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName() }, getValue: function () { return this.$.value }, getFirst: function (a) { var e = this.$.firstChild; (e = e && new CKEDITOR.dom.node(e)) && a && !a(e) && (e = e.getNext(a)); return e }, getLast: function (a) { var e = this.$.lastChild; (e = e && new CKEDITOR.dom.node(e)) && a && !a(e) && (e = e.getPrevious(a)); return e }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var e = 0; e < arguments.length; e++)if (arguments[e] == a) return !0; return !1 }, isEditable: function (a) {
                    var e = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[e] || CKEDITOR.dtd.$empty[e] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[e] ||
                        CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
                }, isIdentical: function (a) {
                    var e = this.clone(0, 1); a = a.clone(0, 1); e.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (e.$.isEqualNode) return e.$.style.cssText = CKEDITOR.tools.normalizeCssText(e.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), e.$.isEqualNode(a.$); e = e.getOuterHtml(); a =
                        a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var b = this.getParent(); b.type == CKEDITOR.NODE_ELEMENT && (b = b.clone(), b.setHtml(e), e = b.getHtml(), b.setHtml(a), a = b.getHtml()) } return e == a
                }, isVisible: function () { var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), e, b; a && CKEDITOR.env.webkit && (e = this.getWindow(), !e.equals(CKEDITOR.document.getWindow()) && (b = e.$.frameElement) && (a = (new CKEDITOR.dom.element(b)).isVisible())); return !!a }, isEmptyInlineRemoveable: function () {
                    if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                    for (var a = this.getChildren(), e = 0, b = a.count(); e < b; e++) { var g = a.getItem(e); if (g.type != CKEDITOR.NODE_ELEMENT || !g.data("cke-bookmark")) if (g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText())) return !1 } return !0
                }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
                    for (var a = this.$.attributes, e = 0; e < a.length; e++) {
                        var b = a[e]; switch (b.nodeName) {
                            case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue;
                            default: if (b.specified) return !0
                        }
                    } return !1
                } : function () { var a = this.$.attributes, e = a.length, b = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < e && (2 < e || !b[a[0].nodeName] || 2 == e && !b[a[1].nodeName]) }, hasAttribute: function () {
                    function a(e) {
                        var b = this.$.attributes.getNamedItem(e); if ("input" == this.getName()) switch (e) { case "class": return 0 < this.$.className.length; case "checked": return !!this.$.checked; case "value": return e = this.getAttribute("type"), "checkbox" == e || "radio" == e ? "on" != this.$.value : !!this.$.value }return b ?
                            b.specified : !1
                    } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (e) { return "name" == e ? !!this.$.name : a.call(this, e) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, e) { var b = this.$; a = a.$; if (b != a) { var g; if (e) for (; g = b.lastChild;)a.insertBefore(b.removeChild(g), a.firstChild); else for (; g = b.firstChild;)a.appendChild(b.removeChild(g)) } }, mergeSiblings: function () {
                    function a(e, b, g) {
                        if (b && b.type == CKEDITOR.NODE_ELEMENT) {
                            for (var f =
                                []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable();)if (f.push(b), b = g ? b.getNext() : b.getPrevious(), !b || b.type != CKEDITOR.NODE_ELEMENT) return; if (e.isIdentical(b)) { for (var c = g ? e.getLast() : e.getFirst(); f.length;)f.shift().move(e, !g); b.moveChildren(e, !g); b.remove(); c && c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings() }
                        }
                    } return function (e) { if (!1 === e || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
                }(), show: function () {
                    this.setStyles({
                        display: "",
                        visibility: ""
                    })
                }, setAttribute: function () {
                    var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, c) { "class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) {
                        if ("src" == b && c.match(/^http:\/\//)) try {
                            a.apply(this,
                                arguments)
                        } catch (g) { } else a.apply(this, arguments); return this
                    } : a
                }(), setAttributes: function (a) { for (var b in a) this.setAttribute(b, a[b]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () { var a = function (a) { this.$.removeAttribute(a) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a }(), removeAttributes: function (a) {
                    if (CKEDITOR.tools.isArray(a)) for (var b =
                        0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
                }, removeStyle: function (a) {
                    var b = this.$.style; if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else {
                        var c = ["top", "left", "right", "bottom"], g; "border" == a && (g = ["color", "style", "width"]); for (var b = [], h = 0; h < c.length; h++)if (g) for (var d =
                            0; d < g.length; d++)b.push([a, c[h], g[d]].join("-")); else b.push([a, c[h]].join("-")); for (a = 0; a < b.length; a++)this.removeStyle(b[a])
                    }
                }, setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this }, setStyles: function (a) { for (var b in a) this.setStyle(b, a[b]); return this }, setOpacity: function (a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) }, unselectable: function () {
                    this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                        "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), c = 0, g = b.count(); c < g; c++)a = b.getItem(c), a.setAttribute("unselectable", "on") }
                }, getPositionedAncestor: function () { for (var a = this; "html" != a.getName();) { if ("static" != a.getComputedStyle("position")) return a; a = a.getParent() } return null }, getDocumentPosition: function (a) {
                    var b = 0, c = 0, g = this.getDocument(), h = g.getBody(), d = "BackCompat" == g.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                        8 !== CKEDITOR.env.version : 1)) { var k = this.$.getBoundingClientRect(), l = g.$.documentElement, w = l.clientTop || h.$.clientTop || 0, u = l.clientLeft || h.$.clientLeft || 0, v = !0; CKEDITOR.env.ie && (v = g.getDocumentElement().contains(this), g = g.getBody().contains(this), v = d && g || !d && v); v && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = h.$.scrollLeft || l.scrollLeft, c = h.$.scrollTop || l.scrollTop) : (c = d ? h.$ : l, b = c.scrollLeft, c = c.scrollTop), b = k.left + b - u, c = k.top + c - w) } else for (w = this, u = null; w && "body" != w.getName() &&
                            "html" != w.getName();) { b += w.$.offsetLeft - w.$.scrollLeft; c += w.$.offsetTop - w.$.scrollTop; w.equals(this) || (b += w.$.clientLeft || 0, c += w.$.clientTop || 0); for (; u && !u.equals(w);)b -= u.$.scrollLeft, c -= u.$.scrollTop, u = u.getParent(); u = w; w = (k = w.$.offsetParent) ? new CKEDITOR.dom.element(k) : null } a && (k = this.getWindow(), w = a.getWindow(), !k.equals(w) && k.$.frameElement && (a = (new CKEDITOR.dom.element(k.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                                d || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0); return { x: b, y: c }
                }, scrollIntoView: function (a) { var b = this.getParent(); if (b) { do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) { var c = b.getWindow(); try { var g = c.$.frameElement; g && (b = new CKEDITOR.dom.element(g)) } catch (h) { } } while (b = b.getParent()) } }, scrollIntoParent: function (a, b, c) {
                    var g, h, d, k; function l(g, b) {
                        /body|html/.test(a.getName()) ?
                        a.getWindow().$.scrollBy(g, b) : (a.$.scrollLeft += g, a.$.scrollTop += b)
                    } function w(a, g) { var b = { x: 0, y: 0 }; if (!a.is(v ? "body" : "html")) { var e = a.$.getBoundingClientRect(); b.x = e.left; b.y = e.top } e = a.getWindow(); e.equals(g) || (e = w(CKEDITOR.dom.element.get(e.$.frameElement), g), b.x += e.x, b.y += e.y); return b } function u(a, g) { return parseInt(a.getComputedStyle("margin-" + g) || 0, 10) || 0 } !a && (a = this.getWindow()); d = a.getDocument(); var v = "BackCompat" == d.$.compatMode; a instanceof CKEDITOR.dom.window && (a = v ? d.getBody() : d.getDocumentElement());
                    CKEDITOR.env.webkit && (d = this.getEditor(!1)) && (d._.previousScrollTop = null); d = a.getWindow(); h = w(this, d); var t = w(a, d), B = this.$.offsetHeight; g = this.$.offsetWidth; var x = a.$.clientHeight, y = a.$.clientWidth; d = h.x - u(this, "left") - t.x || 0; k = h.y - u(this, "top") - t.y || 0; g = h.x + g + u(this, "right") - (t.x + y) || 0; h = h.y + B + u(this, "bottom") - (t.y + x) || 0; (0 > k || 0 < h) && l(0, !0 === b ? k : !1 === b ? h : 0 > k ? k : h); c && (0 > d || 0 < g) && l(0 > d ? d : g, 0)
                }, setState: function (a, b, c) {
                    b = b || "cke"; switch (a) {
                        case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b +
                            "_off"); this.removeClass(b + "_disabled"); c && this.setAttribute("aria-pressed", !0); c && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on"); c && this.setAttribute("aria-disabled", !0); c && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
                    }
                },
                getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                    var c = this.$.attributes; b = b || {}; for (var g = 0; g < c.length; g++) { var h = c[g], d = h.nodeName.toLowerCase(), k; if (!(d in b)) if ("checked" == d && (k = this.getAttribute(d))) a.setAttribute(d, k); else if (!CKEDITOR.env.ie || this.hasAttribute(d)) k = this.getAttribute(d), null === k && (k = h.nodeValue), a.setAttribute(d, k) } "" !== this.$.style.cssText &&
                        (a.$.style.cssText = this.$.style.cssText)
                }, renameNode: function (a) { if (this.getName() != a) { var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$); a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$; delete this.getName } }, getChild: function () {
                    function a(b, c) { var g = b.childNodes; if (0 <= c && c < g.length) return g[c] } return function (b) {
                        var c = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && c;)c = a(c,
                            b.shift()); else c = a(c, b); return c ? new CKEDITOR.dom.node(c) : null
                    }
                }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () { function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu", function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() }) }, getDirection: function (a) {
                    return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                        "ltr" : this.getStyle("direction") || this.getAttribute("dir")
                }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) { var b = CKEDITOR.instances, c, g, h; a = a || void 0 === a; for (c in b) if (g = b[c], g.element.equals(this) && g.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (h = g.editable()) && (h.equals(this) || h.contains(this))) return g; return null }, find: function (a) {
                    var c = d(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
                        a))); c(); return a
                }, findOne: function (a) { var c = d(this); a = this.$.querySelector(b(this, a)); c(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, c) { if (!(c || b && this.type != b)) var g = a(this); if (!1 !== g) { c = this.getChildren(); for (var h = 0; h < c.count(); h++)g = c.getItem(h), g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g) } }
            }); var k = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] };
            CKEDITOR.dom.element.prototype.setSize = function (a, b, h) { "number" == typeof b && (!h || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px")) }; CKEDITOR.dom.element.prototype.getSize = function (a, b) { var h = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0; b && (h -= c.call(this, a)); return h }
        }(), CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
            CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () { var a = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") } }, !0, {
                append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1,
            getChildCount: 1, getChild: 1, getChildren: 1
        }), function () {
            function a(a, g) {
                var b = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (b.collapsed) return this.end(), null; b.optimize() } var c, e = b.startContainer; c = b.endContainer; var f = b.startOffset, h = b.endOffset, m, d = this.guard, k = this.type, n = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) {
                    var l = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(), A = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(h) : c.getNext(); this._.guardLTR = function (a,
                        g) { return (!g || !l.equals(a)) && (!A || !a.equals(A)) && (a.type != CKEDITOR.NODE_ELEMENT || !g || !a.equals(b.root)) }
                } if (a && !this._.guardRTL) { var G = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), D = e.type == CKEDITOR.NODE_ELEMENT ? f ? e.getChild(f - 1) : null : e.getPrevious(); this._.guardRTL = function (a, g) { return (!g || !G.equals(a)) && (!D || !a.equals(D)) && (a.type != CKEDITOR.NODE_ELEMENT || !g || !a.equals(b.root)) } } var F = a ? this._.guardRTL : this._.guardLTR; m = d ? function (a, g) { return !1 === F(a, g) ? !1 : d(a, g) } : F; this.current ? c = this.current[n](!1,
                    k, m) : (a ? c.type == CKEDITOR.NODE_ELEMENT && (c = 0 < h ? c.getChild(h - 1) : !1 === m(c, !0) ? null : c.getPreviousSourceNode(!0, k, m)) : (c = e, c.type == CKEDITOR.NODE_ELEMENT && ((c = c.getChild(f)) || (c = !1 === m(e, !0) ? null : e.getNextSourceNode(!0, k, m)))), c && !1 === m(c) && (c = null)); for (; c && !this._.end;) { this.current = c; if (!this.evaluator || !1 !== this.evaluator(c)) { if (!g) return c } else if (g && this.evaluator) return !1; c = c[n](!1, k, m) } this.end(); return this.current = null
            } function d(g) { for (var b, c = null; b = a.call(this, g);)c = b; return c } CKEDITOR.dom.walker =
                CKEDITOR.tools.createClass({ $: function (a) { this.range = a; this._ = {} }, proto: { end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () { return a.call(this, 1) }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return d.call(this) }, lastBackward: function () { return d.call(this, 1) }, reset: function () { delete this.current; this._ = {} } } }); var b = {
                    block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1,
                    "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1
                }, c = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (g) { return !(g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary =
                    function () { return this.blockBoundary({ br: 1 }) }; CKEDITOR.dom.walker.bookmark = function (a, g) { function b(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") } return function (c) { var e, f; e = c && c.type != CKEDITOR.NODE_ELEMENT && (f = c.getParent()) && b(f); e = a ? e : e || b(c); return !!(g ^ e) } }; CKEDITOR.dom.walker.whitespaces = function (a) {
                        return function (g) {
                            var b; g && g.type == CKEDITOR.NODE_TEXT && (b = !CKEDITOR.tools.trim(g.getText()) || CKEDITOR.env.webkit && g.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
                            return !!(a ^ b)
                        }
                    }; CKEDITOR.dom.walker.invisible = function (a) { var g = CKEDITOR.dom.walker.whitespaces(), b = CKEDITOR.env.webkit ? 1 : 0; return function (c) { g(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = c.$.offsetWidth <= b); return !!(a ^ c) } }; CKEDITOR.dom.walker.nodeType = function (a, g) { return function (b) { return !!(g ^ b.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
                        function g(a) { return !l(a) && !k(a) } return function (b) {
                            var c = CKEDITOR.env.needsBrFiller ? b.is && b.is("br") : b.getText && h.test(b.getText()); c && (c = b.getParent(),
                                b = b.getNext(g), c = c.isBlockBoundary() && (!b || b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary())); return !!(a ^ c)
                        }
                    }; CKEDITOR.dom.walker.temp = function (a) { return function (g) { g.type != CKEDITOR.NODE_ELEMENT && (g = g.getParent()); g = g && g.hasAttribute("data-cke-temp"); return !!(a ^ g) } }; var h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, l = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), f = CKEDITOR.dom.walker.temp(), e = function (a) { return k(a) || l(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) };
            CKEDITOR.dom.walker.ignored = function (a) { return function (g) { g = l(g) || k(g) || f(g); return !!(a ^ g) } }; var m = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty = function (a) { return function (g) { for (var b = 0, c = g.getChildCount(); b < c; ++b)if (!m(g.getChild(b))) return !!a; return !a } }; var g = CKEDITOR.dom.walker.empty(), n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var g = {}, b; for (b in a) CKEDITOR.dtd[b]["#"] && (g[b] = 1); return g }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable =
                function (a) { return function (b) { b = m(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && g(b)) ? !0 : !1; return !!(a ^ b) } }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (e(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && h.test(a.getText())) ? a : !1 }
        }(), CKEDITOR.dom.range = function (a) {
            this.endOffset = this.endContainer =
                this.startOffset = this.startContainer = null; this.collapsed = !0; var d = a instanceof CKEDITOR.dom.document; this.document = d ? a : a.getDocument(); this.root = d ? a.getBody() : a
        }, function () {
            function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function d(a, b, c, e, f) {
                function h(a, g, b, c) { var e = b ? a.getPrevious() : a.getNext(); if (c && k) return e; x || c ? g.append(a.clone(!0, f), b) : (a.remove(), l && g.append(a, b)); return e } function m() {
                    var a, g, b, c = Math.min(K.length,
                        E.length); for (a = 0; a < c; a++)if (g = K[a], b = E[a], !g.equals(b)) return a; return a - 1
                } function d() {
                    var b = R - 1, c = F && I && !y.equals(C); b < O - 1 || b < S - 1 || c ? (c ? a.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START) : S == b + 1 && D ? a.moveToPosition(E[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(E[b + 1], CKEDITOR.POSITION_BEFORE_START), e && (b = K[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b),
                        b.mergeSiblings(!1), a.moveToBookmark({ startNode: c }))) : a.collapse(!0)
                } a.optimizeBookmark(); var k = 0 === b, l = 1 == b, x = 2 == b; b = x || l; var y = a.startContainer, C = a.endContainer, z = a.startOffset, A = a.endOffset, G, D, F, I, H, J; if (x && C.type == CKEDITOR.NODE_TEXT && (y.equals(C) || y.type === CKEDITOR.NODE_ELEMENT && y.getFirst().equals(C))) c.append(a.document.createText(C.substring(z, A))); else {
                    C.type == CKEDITOR.NODE_TEXT ? x ? J = !0 : C = C.split(A) : 0 < C.getChildCount() ? A >= C.getChildCount() ? (C = C.getChild(A - 1), D = !0) : C = C.getChild(A) : I = D = !0; y.type ==
                        CKEDITOR.NODE_TEXT ? x ? H = !0 : y.split(z) : 0 < y.getChildCount() ? 0 === z ? (y = y.getChild(z), G = !0) : y = y.getChild(z - 1) : F = G = !0; for (var K = y.getParents(), E = C.getParents(), R = m(), O = K.length - 1, S = E.length - 1, L = c, V, Z, X, da = -1, P = R; P <= O; P++) { Z = K[P]; X = Z.getNext(); for (P != O || Z.equals(E[P]) && O < S ? b && (V = L.append(Z.clone(0, f))) : G ? h(Z, L, !1, F) : H && L.append(a.document.createText(Z.substring(z))); X;) { if (X.equals(E[P])) { da = P; break } X = h(X, L) } L = V } L = c; for (P = R; P <= S; P++)if (c = E[P], X = c.getPrevious(), c.equals(K[P])) b && (L = L.getChild(0)); else {
                            P !=
                            S || c.equals(K[P]) && S < O ? b && (V = L.append(c.clone(0, f))) : D ? h(c, L, !1, I) : J && L.append(a.document.createText(c.substring(0, A))); if (P > da) for (; X;)X = h(X, L, !0); L = V
                        } x || d()
                }
            } function b() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), e = CKEDITOR.dom.walker.bogus(); return function (f) { return c(f) || b(f) ? !0 : e(f) && !a ? a = !0 : f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(l) ? !1 : !0 } } function c(a) {
                var b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(1); return function (e) { return c(e) || b(e) ? !0 : !a && k(e) || e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$removeEmpty) }
            } function h(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && m(a) && (b = a); return e(a) && !(k(a) && a.equals(b)) }) } } var l = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, k = CKEDITOR.dom.walker.bogus(),
                f = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, e = CKEDITOR.dom.walker.editable(), m = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype = {
                    clone: function () { var a = new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a }, collapse: function (a) {
                        a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer),
                            this.startOffset = this.endOffset); this.collapsed = !0
                    }, cloneContents: function (a) { var b = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || d(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b }, deleteContents: function (a) { this.collapsed || d(this, 0, null, a) }, extractContents: function (a, b) { var c = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || d(this, 1, c, a, "undefined" == typeof b ? !0 : b); return c }, createBookmark: function (a) {
                        var b, c, e, f, h = this.collapsed; b = this.document.createElement("span");
                        b.data("cke-bookmark", 1); b.setStyle("display", "none"); b.setHtml("\x26nbsp;"); a && (e = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", e + (h ? "C" : "S"))); h || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", e + "E"), f = this.clone(), f.collapse(), f.insertNode(c)); f = this.clone(); f.collapse(!0); f.insertNode(b); c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? e + (h ? "C" : "S") : b, endNode: a ? e + "E" : c, serializable: a, collapsed: h }
                    }, createBookmark2: function () {
                        function a(g) {
                            var b =
                                g.container, e = g.offset, f; f = b; var h = e; f = f.type != CKEDITOR.NODE_ELEMENT || 0 === h || h == f.getChildCount() ? 0 : f.getChild(h - 1).type == CKEDITOR.NODE_TEXT && f.getChild(h).type == CKEDITOR.NODE_TEXT; f && (b = b.getChild(e - 1), e = b.getLength()); if (b.type == CKEDITOR.NODE_ELEMENT && 0 < e) { a: { for (f = b; e--;)if (h = f.getChild(e).getIndex(!0), 0 <= h) { e = h; break a } e = -1 } e += 1 } if (b.type == CKEDITOR.NODE_TEXT) {
                                    f = b; for (h = 0; (f = f.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;)h += f.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
                                    f = h; b.getText() ? e += f : (h = b.getPrevious(c), f ? (e = f, b = h ? h.getNext() : b.getParent().getFirst()) : (b = b.getParent(), e = h ? h.getIndex(!0) + 1 : 0))
                                } g.container = b; g.offset = e
                        } function b(a, g) { var c = g.getCustomData("cke-fillingChar"); if (c) { var e = a.container; c.equals(e) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = e.getIndex(), a.container = e.getParent())) } } var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (c) {
                            var e = this.collapsed, f = {
                                container: this.startContainer,
                                offset: this.startOffset
                            }, h = { container: this.endContainer, offset: this.endOffset }; c && (a(f), b(f, this.root), e || (a(h), b(h, this.root))); return { start: f.container.getAddress(c), end: e ? null : h.container.getAddress(c), startOffset: f.offset, endOffset: h.offset, normalized: c, collapsed: e, is2: !0 }
                        }
                    }(), moveToBookmark: function (a) {
                        if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, e = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, c); e ? this.setEnd(e, a) : this.collapse(!0) } else b =
                            (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
                    }, getBoundaryNodes: function () {
                        var a = this.startContainer, b = this.endContainer, c = this.startOffset, e = this.endOffset, f; if (a.type == CKEDITOR.NODE_ELEMENT) if (f = a.getChildCount(), f > c) a = a.getChild(c); else if (1 > f) a = a.getPreviousSourceNode(); else {
                            for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a =
                                a.getNextSourceNode() || a
                        } if (b.type == CKEDITOR.NODE_ELEMENT) if (f = b.getChildCount(), f > e) b = b.getChild(e).getPreviousSourceNode(!0); else if (1 > f) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
                    }, getCommonAncestor: function (a, b) {
                        var c = this.startContainer, e = this.endContainer, c = c.equals(e) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) :
                            c : c.getCommonAncestor(e); return b && !c.is ? c.getParent() : c
                    }, optimize: function () { var a = this.startContainer, b = this.startOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a)) }, optimizeBookmark: function () {
                        var a = this.startContainer, b = this.endContainer; a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                        b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
                    }, trim: function (a, b) {
                        var c = this.startContainer, e = this.startOffset, f = this.collapsed; if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) {
                            if (e) if (e >= c.getLength()) e = c.getIndex() + 1, c = c.getParent(); else { var h = c.split(e), e = c.getIndex() + 1, c = c.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(h, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1) } else e = c.getIndex(), c = c.getParent();
                            this.setStart(c, e); if (f) { this.collapse(!0); return }
                        } c = this.endContainer; e = this.endOffset; b || f || !c || c.type != CKEDITOR.NODE_TEXT || (e ? (e >= c.getLength() || c.split(e), e = c.getIndex() + 1) : e = c.getIndex(), c = c.getParent(), this.setEnd(c, e))
                    }, enlarge: function (a, b) {
                        function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var e = new RegExp(/[^\s\ufeff]/); switch (a) {
                            case CKEDITOR.ENLARGE_INLINE: var f = 1; case CKEDITOR.ENLARGE_ELEMENT: var h = function (a, b) {
                                var g = new CKEDITOR.dom.range(d);
                                g.setStart(a, b); g.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); var g = new CKEDITOR.dom.walker(g), c; for (g.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; c = g.next();) { if (c.type != CKEDITOR.NODE_TEXT) return !1; G = c != a ? c.getText() : c.substring(b); if (e.test(G)) return !1 } return !0
                            }; if (this.collapsed) break; var m = this.getCommonAncestor(), d = this.root, k, l, x, y, C, z = !1, A, G; A = this.startContainer; var D = this.startOffset; A.type == CKEDITOR.NODE_TEXT ? (D && (A = !CKEDITOR.tools.trim(A.substring(0, D)).length &&
                                A, z = !!A), A && ((y = A.getPrevious()) || (x = A.getParent()))) : (D && (y = A.getChild(D - 1) || A.getLast()), y || (x = A)); for (x = c(x); x || y;) {
                                    if (x && !y) { !C && x.equals(m) && (C = !0); if (f ? x.isBlockBoundary() : !d.contains(x)) break; z && "inline" == x.getComputedStyle("display") || (z = !1, C ? k = x : this.setStartBefore(x)); y = x.getPrevious() } for (; y;)if (A = !1, y.type == CKEDITOR.NODE_COMMENT) y = y.getPrevious(); else {
                                        if (y.type == CKEDITOR.NODE_TEXT) G = y.getText(), e.test(G) && (y = null), A = /[\s\ufeff]$/.test(G); else if ((y.$.offsetWidth > (CKEDITOR.env.webkit ? 1 :
                                            0) || b && y.is("br")) && !y.data("cke-bookmark")) if (z && CKEDITOR.dtd.$removeEmpty[y.getName()]) { G = y.getText(); if (e.test(G)) y = null; else for (var D = y.$.getElementsByTagName("*"), F = 0, I; I = D[F++];)if (!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) { y = null; break } y && (A = !!G.length) } else y = null; A && (z ? C ? k = x : x && this.setStartBefore(x) : z = !0); if (y) { A = y.getPrevious(); if (!x && !A) { x = y; y = null; break } y = A } else x = null
                                    } x && (x = c(x.getParent()))
                                } A = this.endContainer; D = this.endOffset; x = y = null; C = z = !1; A.type == CKEDITOR.NODE_TEXT ?
                                    CKEDITOR.tools.trim(A.substring(D)).length ? z = !0 : (z = !A.getLength(), D == A.getLength() ? (y = A.getNext()) || (x = A.getParent()) : h(A, D) && (x = A.getParent())) : (y = A.getChild(D)) || (x = A); for (; x || y;) {
                                        if (x && !y) { !C && x.equals(m) && (C = !0); if (f ? x.isBlockBoundary() : !d.contains(x)) break; z && "inline" == x.getComputedStyle("display") || (z = !1, C ? l = x : x && this.setEndAfter(x)); y = x.getNext() } for (; y;) {
                                            A = !1; if (y.type == CKEDITOR.NODE_TEXT) G = y.getText(), h(y, 0) || (y = null), A = /^[\s\ufeff]/.test(G); else if (y.type == CKEDITOR.NODE_ELEMENT) {
                                                if ((0 < y.$.offsetWidth ||
                                                    b && y.is("br")) && !y.data("cke-bookmark")) if (z && CKEDITOR.dtd.$removeEmpty[y.getName()]) { G = y.getText(); if (e.test(G)) y = null; else for (D = y.$.getElementsByTagName("*"), F = 0; I = D[F++];)if (!CKEDITOR.dtd.$removeEmpty[I.nodeName.toLowerCase()]) { y = null; break } y && (A = !!G.length) } else y = null
                                            } else A = 1; A && z && (C ? l = x : this.setEndAfter(x)); if (y) { A = y.getNext(); if (!x && !A) { x = y; y = null; break } y = A } else x = null
                                        } x && (x = c(x.getParent()))
                                    } k && l && (m = k.contains(l) ? l : k, this.setStartBefore(m), this.setEndAfter(m)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: x =
                                        new CKEDITOR.dom.range(this.root); d = this.root; x.setStartAt(d, CKEDITOR.POSITION_AFTER_START); x.setEnd(this.startContainer, this.startOffset); x = new CKEDITOR.dom.walker(x); var H, J, K = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), E = null, R = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (E) { if (E.equals(a)) { E = null; return } } else E = a; else if (E) return; var b = K(a); b || (H = a); return b }, f = function (a) {
                                            var b = R(a); !b && a.is && a.is("br") &&
                                                (J = a); return b
                                        }; x.guard = R; x = x.lastBackward(); H = H || d; this.setStartAt(H, !H.is("br") && (!x && this.checkStartOfBlock() || x && H.contains(x)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { x = this.clone(); x = new CKEDITOR.dom.walker(x); var O = CKEDITOR.dom.walker.whitespaces(), S = CKEDITOR.dom.walker.bookmark(); x.evaluator = function (a) { return !O(a) && !S(a) }; if ((x = x.previous()) && x.type == CKEDITOR.NODE_ELEMENT && x.is("br")) break } x = this.clone(); x.collapse(); x.setEndAt(d,
                                            CKEDITOR.POSITION_BEFORE_END); x = new CKEDITOR.dom.walker(x); x.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? f : R; H = E = J = null; x = x.lastForward(); H = H || d; this.setEndAt(H, !x && this.checkEndOfBlock() || x && H.contains(x) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); J && this.setEndAfter(J)
                        }
                    }, shrink: function (a, b, c) {
                        var e = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0, f = c && c.skipBogus; if (!this.collapsed) {
                            a = a || CKEDITOR.SHRINK_TEXT; var h = this.clone(), m =
                                this.startContainer, d = this.endContainer, k = this.startOffset, l = this.endOffset, x = c = 1; m && m.type == CKEDITOR.NODE_TEXT && (k ? k >= m.getLength() ? h.setStartAfter(m) : (h.setStartBefore(m), c = 0) : h.setStartBefore(m)); d && d.type == CKEDITOR.NODE_TEXT && (l ? l >= d.getLength() ? h.setEndAfter(d) : (h.setEndAfter(d), x = 0) : h.setEndBefore(d)); var h = new CKEDITOR.dom.walker(h), y = CKEDITOR.dom.walker.bookmark(), C = CKEDITOR.dom.walker.bogus(); h.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) };
                            var z; h.guard = function (b, c) { if (f && C(b) || y(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(z) || !1 === e && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; c || b.type != CKEDITOR.NODE_ELEMENT || (z = b); return !0 }; c && (m = h[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(m, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); x && (h.reset(), (h = h[a == CKEDITOR.SHRINK_ELEMENT ?
                                "lastBackward" : "previous"]()) && this.setEndAt(h, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)); return !(!c && !x)
                        }
                    }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, c = b.getChild(this.startOffset); c ? a.insertBefore(c) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) }, moveToRange: function (a) {
                        this.setStart(a.startContainer, a.startOffset);
                        this.setEnd(a.endContainer, a.endOffset)
                    }, selectNodeContents: function (a) { this.setStart(a, 0); this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount()) }, setStart: function (b, c) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset = c; this.endContainer || (this._setEndContainer(b), this.endOffset = c); a(this) }, setEnd: function (b, c) {
                        b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() +
                            1, b = b.getParent()); this._setEndContainer(b); this.endOffset = c; this.startContainer || (this._setStartContainer(b), this.startOffset = c); a(this)
                    }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b, c) {
                        switch (c) {
                            case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0);
                                break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b)
                        }a(this)
                    }, setEndAt: function (b, c) {
                        switch (c) {
                            case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b);
                                break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b)
                        }a(this)
                    }, fixBlock: function (a, b) { var c = this.createBookmark(), e = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(e); e.trim(); this.insertNode(e); var f = e.getBogus(); f && f.remove(); e.appendBogus(); this.moveToBookmark(c); return e }, splitBlock: function (a, b) {
                        var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root), e = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                        f = c.block, h = e.block, m = null; if (!c.blockLimit.equals(e.blockLimit)) return null; "br" != a && (f || (f = this.fixBlock(!0, a), h = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), h || (h = this.fixBlock(!1, a))); c = f && this.checkStartOfBlock(); e = h && this.checkEndOfBlock(); this.deleteContents(); f && f.equals(h) && (e ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END), h = null) : c ? (m = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f,
                            CKEDITOR.POSITION_BEFORE_START), f = null) : (h = this.splitElement(f, b || !1), f.is("ul", "ol") || f.appendBogus())); return { previousBlock: f, nextBlock: h, wasStartOfBlock: c, wasEndOfBlock: e, elementPath: m }
                    }, splitElement: function (a, b) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var c = this.extractContents(!1, b || !1), e = a.clone(!1, b || !1); c.appendTo(e); e.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return e }, removeEmptyBlocksAtEnd: function () {
                        function a(g) {
                            return function (a) {
                                return b(a) ||
                                    c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || g.is("table") && a.is("caption") ? !1 : !0
                            }
                        } var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!1); return function (b) { for (var c = this.createBookmark(), e = this[b ? "endPath" : "startPath"](), f = e.block || e.blockLimit, h; f && !f.equals(e.root) && !f.getFirst(a(f));)h = f.getParent(), this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END), f.remove(1), f = h; this.moveToBookmark(c) }
                    }(), startPath: function () {
                        return new CKEDITOR.dom.elementPath(this.startContainer,
                            this.root)
                    }, endPath: function () { return new CKEDITOR.dom.elementPath(this.endContainer, this.root) }, checkBoundaryOfElement: function (a, b) { var e = b == CKEDITOR.START, f = this.clone(); f.collapse(e); f[e ? "setStartAt" : "setEndAt"](a, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); f = new CKEDITOR.dom.walker(f); f.evaluator = c(e); return f[e ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function () {
                        var a = this.startContainer, c = this.startOffset; CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0,
                            c)), f.test(a) && this.trim(0, 1)); this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer, this.root); c = this.clone(); c.collapse(!0); c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkBackward()
                    }, checkEndOfBlock: function () {
                        var a = this.endContainer, c = this.endOffset; CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), f.test(a) && this.trim(1, 0)); this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer,
                            this.root); c = this.clone(); c.collapse(!1); c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END); a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkForward()
                    }, getPreviousNode: function (a, b, c) { var e = this.clone(); e.collapse(1); e.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START); c = new CKEDITOR.dom.walker(e); c.evaluator = a; c.guard = b; return c.previous() }, getNextNode: function (a, b, c) {
                        var e = this.clone(); e.collapse(); e.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(e);
                        c.evaluator = a; c.guard = b; return c.next()
                    }, checkReadOnly: function () { function a(b, c) { for (; b;) { if (b.type == CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b = b.getParent() } return 1 } return function () { var b = this.startContainer, c = this.endContainer; return !(a(b, c) && a(c, b)) } }(), moveToElementEditablePosition: function (a, b) {
                        if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a,
                            b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0; for (var c = 0; a;) {
                                if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && f.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); c = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1; else if (b && a.is("br") && this.endContainer &&
                                    this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var e = a, h = c, d = void 0; e.type == CKEDITOR.NODE_ELEMENT && e.isEditable(!1) && (d = e[b ? "getLast" : "getFirst"](m)); h || d || (d = e[b ? "getPrevious" : "getNext"](m)); a = d
                            } return !!c
                    }, moveToClosestEditablePosition: function (a, b) {
                        var c, e = 0, f, h, m = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (c = new CKEDITOR.dom.range(this.root),
                            c.moveToPosition(a, m[b ? 0 : 1])) : c = this.clone(); if (a && !a.is(CKEDITOR.dtd.$block)) e = 1; else if (f = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) e = 1, (h = f.type == CKEDITOR.NODE_ELEMENT) && f.is(CKEDITOR.dtd.$block) && "false" == f.getAttribute("contenteditable") ? (c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(f, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && h && f.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(f, 0), c.collapse()) : c.moveToPosition(f, m[b ? 1 : 0]); e && this.moveToRange(c);
                        return !!e
                    }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) }, moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () {
                        var a = this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return c(a) && b(a) }; var e = a.next();
                        a.reset(); return e && e.equals(a.previous()) ? e : null
                    }, getTouchedStartNode: function () { var a = this.startContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a }, getTouchedEndNode: function () { var a = this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a }, getNextEditableNode: h(), getPreviousEditableNode: h(1), _getTableElement: function (a) {
                        a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.startContainer, c =
                            this.endContainer, e = b.getAscendant("table", !0), f = c.getAscendant("table", !0); return CKEDITOR.env.safari && e && c.equals(this.root) ? b.getAscendant(a, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : e && f && (e.equals(f) || e.contains(f) || f.contains(e)) ? b.getAscendant(a, !0) : null
                    }, scrollIntoView: function () {
                        var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, c, e, f = this.clone(); f.optimize(); (e = f.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = f.startContainer.getText(),
                            b = f.startContainer.split(f.startOffset), a.insertAfter(f.startContainer)) : f.insertNode(a); a.scrollIntoView(); e && (f.startContainer.setText(c), b.remove()); a.remove()
                    }, _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a, b) {
                        var c = this.getCommonAncestor(), e = this.getBoundaryNodes(), f = [], h, m, d, k; if (c && c.find) for (m = c.find(a), h = 0; h < m.count(); h++)if (c = m.getItem(h), b || !c.isReadOnly()) d = c.getPosition(e.startNode) & CKEDITOR.POSITION_FOLLOWING ||
                            e.startNode.equals(c), k = c.getPosition(e.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || e.endNode.equals(c), d && k && f.push(c); return f
                    }
                }; CKEDITOR.dom.range.mergeRanges = function (a) {
                    return CKEDITOR.tools.array.reduce(a, function (a, b) {
                        var c = a[a.length - 1], g = !1; b = b.clone(); b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (c) {
                            var e = new CKEDITOR.dom.range(b.root), g = new CKEDITOR.dom.walker(e), f = CKEDITOR.dom.walker.whitespaces(); e.setStart(c.endContainer, c.endOffset); e.setEnd(b.startContainer, b.startOffset);
                            for (e = g.next(); f(e) || b.endContainer.equals(e);)e = g.next(); g = !e
                        } g ? c.setEnd(b.endContainer, b.endOffset) : a.push(b); return a
                    }, [])
                }
        }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict", function () {
            function a(a) {
                1 >
                arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
            } function d(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function b(a, c, e, f) {
                a: { null == f && (f = d(e)); for (var h; h = f.shift();)if (h.getDtd().p) { f = { element: h, remaining: f }; break a } f = null } if (!f) return 0; if ((h = CKEDITOR.filter.instances[f.element.data("cke-filter")]) && !h.check(c)) return b(a, c, e, f.remaining);
                c = new CKEDITOR.dom.range(f.element); c.selectNodeContents(f.element); c = c.createIterator(); c.enlargeBr = a.enlargeBr; c.enforceRealBlocks = a.enforceRealBlocks; c.activeFilter = c.filter = h; a._.nestedEditable = { element: f.element, container: e, remaining: f.remaining, iterator: c }; return 1
            } function c(a, b, c) { if (!b) return !1; a = a.clone(); a.collapse(!c); return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END) } var h = /^[\r\n\t ]+$/, l = CKEDITOR.dom.walker.bookmark(!1, !0), k = CKEDITOR.dom.walker.whitespaces(!0), f = function (a) {
                return l(a) &&
                    k(a)
            }, e = { dd: 1, dt: 1, li: 1 }; a.prototype = {
                getNextParagraph: function (a) {
                    var g, d, k, q, r; a = a || "p"; if (this._.nestedEditable) { if (g = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, g; this.activeFilter = this.filter; if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable = null } if (!this.range.root.getDtd()[a]) return null;
                    if (!this._.started) {
                        var w = this.range.clone(); d = w.startPath(); var u = w.endPath(), v = !w.collapsed && c(w, d.block), t = !w.collapsed && c(w, u.block, 1); w.shrink(CKEDITOR.SHRINK_ELEMENT, !0); v && w.setStartAt(d.block, CKEDITOR.POSITION_BEFORE_END); t && w.setEndAt(u.block, CKEDITOR.POSITION_AFTER_START); d = w.endContainer.hasAscendant("pre", !0) || w.startContainer.hasAscendant("pre", !0); w.enlarge(this.forceBrBreak && !d || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); w.collapsed || (d = new CKEDITOR.dom.walker(w.clone()),
                            u = CKEDITOR.dom.walker.bookmark(!0, !0), d.evaluator = u, this._.nextNode = d.next(), d = new CKEDITOR.dom.walker(w.clone()), d.evaluator = u, d = d.previous(), this._.lastNode = d.getNextSourceNode(!0, null, w.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (u = this.range.clone(), u.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), u.checkEndOfBlock() && (u = new CKEDITOR.dom.elementPath(u.endContainer,
                                u.root), this._.lastNode = (u.block || u.blockLimit).getNextSourceNode(!0))), this._.lastNode && w.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = w.document.createText(""), this._.lastNode.insertAfter(d)), w = null); this._.started = 1; d = w
                    } u = this._.nextNode; w = this._.lastNode; for (this._.nextNode = null; u;) {
                        var v = 0, t = u.hasAscendant("pre"), B = u.type != CKEDITOR.NODE_ELEMENT, x = 0; if (B) u.type == CKEDITOR.NODE_TEXT && h.test(u.getText()) && (B = 0); else {
                            var y = u.getName(); if (CKEDITOR.dtd.$block[y] && "false" == u.getAttribute("contenteditable")) {
                                g =
                                u; b(this, a, g); break
                            } else if (u.isBlockBoundary(this.forceBrBreak && !t && { br: 1 })) { if ("br" == y) B = 1; else if (!d && !u.getChildCount() && "hr" != y) { g = u; k = u.equals(w); break } d && (d.setEndAt(u, CKEDITOR.POSITION_BEFORE_START), "br" != y && (this._.nextNode = u)); v = 1 } else { if (u.getFirst()) { d || (d = this.range.clone(), d.setStartAt(u, CKEDITOR.POSITION_BEFORE_START)); u = u.getFirst(); continue } B = 1 }
                        } B && !d && (d = this.range.clone(), d.setStartAt(u, CKEDITOR.POSITION_BEFORE_START)); k = (!v || B) && u.equals(w); if (d && !v) for (; !u.getNext(f) && !k;) {
                            y =
                            u.getParent(); if (y.isBlockBoundary(this.forceBrBreak && !t && { br: 1 })) { v = 1; B = 0; k || y.equals(w); d.setEndAt(y, CKEDITOR.POSITION_BEFORE_END); break } u = y; B = 1; k = u.equals(w); x = 1
                        } B && d.setEndAt(u, CKEDITOR.POSITION_AFTER_END); u = this._getNextSourceNode(u, x, w); if ((k = !u) || v && d) break
                    } if (!g) {
                        if (!d) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; g = new CKEDITOR.dom.elementPath(d.startContainer, d.root); u = g.blockLimit; v = { div: 1, th: 1, td: 1 }; g = g.block; !g && u && !this.enforceRealBlocks && v[u.getName()] &&
                            d.checkStartOfBlock() && d.checkEndOfBlock() && !u.equals(d.root) ? g = u : !g || this.enforceRealBlocks && g.is(e) ? (g = this.range.document.createElement(a), d.extractContents().appendTo(g), g.trim(), d.insertNode(g), q = r = !0) : "li" != g.getName() ? d.checkStartOfBlock() && d.checkEndOfBlock() || (g = g.clone(!1), d.extractContents().appendTo(g), g.trim(), r = d.splitBlock(), q = !r.wasStartOfBlock, r = !r.wasEndOfBlock, d.insertNode(g)) : k || (this._.nextNode = g.equals(w) ? null : this._getNextSourceNode(d.getBoundaryNodes().endNode, 1, w))
                    } q && (q =
                        g.getPrevious()) && q.type == CKEDITOR.NODE_ELEMENT && ("br" == q.getName() ? q.remove() : q.getLast() && "br" == q.getLast().$.nodeName.toLowerCase() && q.getLast().remove()); r && (q = g.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && "br" == q.getName() && (!CKEDITOR.env.needsBrFiller || q.getPrevious(l) || q.getNext(l)) && q.remove(); this._.nextNode || (this._.nextNode = k || g.equals(w) || !w ? null : this._getNextSourceNode(g, 1, w)); return g
                }, _getNextSourceNode: function (a, b, c) {
                    function e(a) { return !(a.equals(c) || a.equals(f)) } var f = this.range.root;
                    for (a = a.getNextSourceNode(b, null, e); !l(a);)a = a.getNextSourceNode(b, null, e); return a
                }
            }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
        }(), CKEDITOR.command = function (a, d) {
            this.uiItems = []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire("exec") ? !0 : !1 !== d.exec.call(this, a, b) }; this.refresh = function (a, b) {
                if (!this.readOnly && a.readOnly) return !0; if (this.context && !b.isContextFor(this.context) ||
                    !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh", { editor: a, path: b }) ? !0 : d.refresh && !1 !== d.refresh.apply(this, arguments)
            }; var b; this.checkAllowed = function (c) { return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b }; CKEDITOR.tools.extend(this, d, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!d.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
        }, CKEDITOR.command.prototype =
        {
            enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire("state"); return !0 }, toggleState: function () {
                this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
                this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
            }
        }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
            customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"),
            extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
        }, function () {
            function a(a, b, c, g, e) {
                var f, h; a = []; for (f in b) {
                    h = b[f]; h = "boolean" == typeof h ? {} : "function" == typeof h ? { match: h } : F(h); "$" != f.charAt(0) && (h.elements = f); c && (h.featureName = c.toLowerCase()); var d = h; d.elements = k(d.elements, /\s+/) || null; d.propertiesOnly = d.propertiesOnly || !0 === d.elements; var m = /\s*,\s*/, l = void 0; for (l in J) {
                        d[l] = k(d[l],
                            m) || null; var n = d, u = K[l], x = k(d[K[l]], m), y = d[l], E = [], t = !0, p = void 0; x ? t = !1 : x = {}; for (p in y) "!" == p.charAt(0) && (p = p.slice(1), E.push(p), x[p] = !0, t = !1); for (; p = E.pop();)y[p] = y["!" + p], delete y["!" + p]; n[u] = (t ? !1 : x) || null
                    } d.match = d.match || null; g.push(h); a.push(h)
                } b = e.elements; e = e.generic; var z; c = 0; for (g = a.length; c < g; ++c) {
                    f = F(a[c]); h = !0 === f.classes || !0 === f.styles || !0 === f.attributes; d = f; l = u = m = void 0; for (m in J) d[m] = v(d[m]); n = !0; for (l in K) {
                        m = K[l]; u = d[m]; x = []; y = void 0; for (y in u) -1 < y.indexOf("*") ? x.push(new RegExp("^" +
                            y.replace(/\*/g, ".*") + "$")) : x.push(y); u = x; u.length && (d[m] = u, n = !1)
                    } d.nothingRequired = n; d.noProperties = !(d.attributes || d.classes || d.styles); if (!0 === f.elements || null === f.elements) e[h ? "unshift" : "push"](f); else for (z in d = f.elements, delete f.elements, d) if (b[z]) b[z][h ? "unshift" : "push"](f); else b[z] = [f]
                }
            } function d(a, c, g, e) {
                if (!a.match || a.match(c)) if (e || f(a, c)) if (a.propertiesOnly || (g.valid = !0), g.allAttributes || (g.allAttributes = b(a.attributes, c.attributes, g.validAttributes)), g.allStyles || (g.allStyles = b(a.styles,
                    c.styles, g.validStyles)), !g.allClasses) { a = a.classes; c = c.classes; e = g.validClasses; if (a) if (!0 === a) a = !0; else { for (var h = 0, d = c.length, m; h < d; ++h)m = c[h], e[m] || (e[m] = a(m)); a = !1 } else a = !1; g.allClasses = a }
            } function b(a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (var g in b) c[g] || (c[g] = a(g)); return !1 } function c(a, b, c) {
                if (!a.match || a.match(b)) {
                    if (a.noProperties) return !1; c.hadInvalidAttribute = h(a.attributes, b.attributes) || c.hadInvalidAttribute; c.hadInvalidStyle = h(a.styles, b.styles) || c.hadInvalidStyle; a = a.classes;
                    b = b.classes; if (a) { for (var g = !1, e = !0 === a, f = b.length; f--;)if (e || a(b[f])) b.splice(f, 1), g = !0; a = g } else a = !1; c.hadInvalidClass = a || c.hadInvalidClass
                }
            } function h(a, b) { if (!a) return !1; var c = !1, g = !0 === a, e; for (e in b) if (g || a(e)) delete b[e], c = !0; return c } function l(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function k(a, b) {
                if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = I(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ?
                    CKEDITOR.tools.convertArrayToObject(a) : !1; var c = {}, g = 0, e; for (e in a) c[e] = a[e], g++; return g ? c : !1
            } function f(a, b) { if (a.nothingRequired) return !0; var c, g, f, h; if (f = a.requiredClasses) for (h = b.classes, c = 0; c < f.length; ++c)if (g = f[c], "string" == typeof g) { if (-1 == CKEDITOR.tools.indexOf(h, g)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(h, g)) return !1; return e(b.styles, a.requiredStyles) && e(b.attributes, a.requiredAttributes) } function e(a, b) {
                if (!b) return !0; for (var c = 0, g; c < b.length; ++c)if (g = b[c], "string" ==
                    typeof g) { if (!(g in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, g)) return !1; return !0
            } function m(a) { if (!a) return {}; a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test"; return b } function g(a) { var b, c, g, e, f = {}, h = 1; for (a = I(a); b = a.match(E);)(c = b[2]) ? (g = n(c, "styles"), e = n(c, "attrs"), c = n(c, "classes")) : g = e = c = null, f["$" + h++] = { elements: b[1], classes: c, styles: g, attributes: e }, a = a.slice(b[0].length); return f } function n(a, b) { var c = a.match(R[b]); return c ? I(c[1]) : null }
            function p(a) { var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1)); a.classes || (a.classes = c ? c.split(/\s+/) : []) } function q(a, b, g, e) {
                var f = 0, h; e.toHtml && (b.name = b.name.replace(O, "$1")); if (e.doCallbacks && a.elementCallbacks) { a: { h = a.elementCallbacks; for (var m = 0, k = h.length, l; m < k; ++m)if (l = h[m](b)) { h = l; break a } h = void 0 } if (h) return h } if (e.doTransform && (h = a._.transformations[b.name])) { p(b); for (m = 0; m < h.length; ++m)y(a, b, h[m]); w(b) } if (e.doFilter) {
                    a: {
                        m =
                        b.name; k = a._; a = k.allowedRules.elements[m]; h = k.allowedRules.generic; m = k.disallowedRules.elements[m]; k = k.disallowedRules.generic; l = e.skipRequired; var n = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }, x, E; if (a || h) {
                            p(b); if (m) for (x = 0, E = m.length; x < E; ++x)if (!1 === c(m[x], b, n)) { a = null; break a } if (k) for (x = 0, E = k.length; x < E; ++x)c(k[x], b, n); if (a) for (x = 0, E = a.length; x < E; ++x)d(a[x], b, n, l); if (h) for (x =
                                0, E = h.length; x < E; ++x)d(h[x], b, n, l); a = n
                        } else a = null
                    } if (!a || !a.valid) return g.push(b), 1; E = a.validAttributes; var t = a.validStyles; h = a.validClasses; var m = b.attributes, v = b.styles, k = b.classes; l = b.classBackup; var K = b.styleBackup, z, D, C = [], n = [], A = /^data-cke-/; x = !1; delete m.style; delete m["class"]; delete b.classBackup; delete b.styleBackup; if (!a.allAttributes) for (z in m) E[z] || (A.test(z) ? z == (D = z.replace(/^data-cke-saved-/, "")) || E[D] || (delete m[z], x = !0) : (delete m[z], x = !0)); if (!a.allStyles || a.hadInvalidStyle) {
                        for (z in v) a.allStyles ||
                            t[z] ? C.push(z + ":" + v[z]) : x = !0; C.length && (m.style = C.sort().join("; "))
                    } else K && (m.style = K); if (!a.allClasses || a.hadInvalidClass) { for (z = 0; z < k.length; ++z)(a.allClasses || h[k[z]]) && n.push(k[z]); n.length && (m["class"] = n.sort().join(" ")); l && n.length < l.split(/\s+/).length && (x = !0) } else l && (m["class"] = l); x && (f = 1); if (!e.skipFinalValidation && !u(b)) return g.push(b), 1
                } e.toHtml && (b.name = b.name.replace(S, "cke:$1")); return f
            } function r(a) {
                var b = [], c; for (c in a) -1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*")); return b.length ?
                    new RegExp("^(?:" + b.join("|") + ")$") : null
            } function w(a) { var b = a.attributes, c; delete b.style; delete b["class"]; if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c; a.classes.length && (b["class"] = a.classes.sort().join(" ")) } function u(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function v(a) { if (!a) return !1; if (!0 === a) return !0; var b = r(a); return function (c) { return c in a || b && c.match(b) } } function t() { return new CKEDITOR.htmlParser.element("br") }
            function B(a) { return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || D.$block[a.name]) } function x(a, b, c) {
                var g = a.name; if (D.$empty[g] || !a.children.length) "hr" == g && "br" == b ? a.replaceWith(t()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove()); else if (D.$block[g] || "tr" == g) if ("br" == b) a.previous && !B(a.previous) && (b = t(), b.insertBefore(a)), a.next && !B(a.next) && (b = t(), b.insertAfter(a)), a.replaceWithChildren(); else {
                    var g = a.children, e; b: {
                        e = D[b]; for (var f = 0, h = g.length, d; f < h; ++f)if (d = g[f], d.type == CKEDITOR.NODE_ELEMENT &&
                            !e[d.name]) { e = !1; break b } e = !0
                    } if (e) a.name = b, a.attributes = {}, c.push({ check: "parent-down", el: a }); else {
                        e = a.parent; for (var f = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == e.name, m, k, h = g.length; 0 < h;)d = g[--h], f && (d.type == CKEDITOR.NODE_TEXT || d.type == CKEDITOR.NODE_ELEMENT && D.$inline[d.name]) ? (m || (m = new CKEDITOR.htmlParser.element(b), m.insertAfter(a), c.push({ check: "parent-down", el: m })), m.add(d, 0)) : (m = null, k = D[e.name] || D.span, d.insertAfter(a), e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || d.type != CKEDITOR.NODE_ELEMENT ||
                            k[d.name] || c.push({ check: "el-up", el: d })); a.remove()
                    }
                } else g in { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({ check: "it", el: a.parent }), a.replaceWithChildren())
            } function y(a, b, c) { var g, e; for (g = 0; g < c.length; ++g)if (e = c[g], !(e.check && !a.check(e.check, !1) || e.left && !e.left(b))) { e.right(b, L); break } } function C(a, b) {
                var c = b.getDefinition(), g = c.attributes, e = c.styles, f, h, d, m; if (a.name != c.element) return !1; for (f in g) if ("class" == f) for (c = g[f].split(/\s+/), d = a.classes.join("|"); m = c.pop();) { if (-1 == d.indexOf(m)) return !1 } else if (a.attributes[f] !=
                    g[f]) return !1; for (h in e) if (a.styles[h] != e[h]) return !1; return !0
            } function z(a, b) { var c, g; "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? g = a : (c = a[0], g = a[1]); return [{ element: c, left: g, right: function (a, c) { c.transform(a, b) } }] } function A(a) { return function (b) { return C(b, a) } } function G(a) { return function (b, c) { c[a](b) } } var D = CKEDITOR.dtd, F = CKEDITOR.tools.copy, I = CKEDITOR.tools.trim, H = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a) {
                this.allowedContent = []; this.disallowedContent =
                    []; this.elementCallbacks = null; this.disabled = !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; if (a instanceof CKEDITOR.editor) {
                        a = this.editor = a; this.customConfig = !0; var b = a.config.allowedContent; !0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra",
                            1), this.allow(H[a.enterMode] + " " + H[a.shiftEnterMode], "default", 1), this.disallow(a.config.disallowedContent))
                    } else this.customConfig = !1, this.allow(a, "default", 1)
            }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
                allow: function (b, c, e) {
                    if (!l(this, b, e)) return !1; var f, h; if ("string" == typeof b) b = g(b); else if (b instanceof CKEDITOR.style) {
                        if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, e); f = b.getDefinition(); b = {}; e = f.attributes; b[f.element] = f = {
                            styles: f.styles, requiredStyles: f.styles &&
                                CKEDITOR.tools.objectKeys(f.styles)
                        }; e && (e = F(e), f.classes = e["class"] ? e["class"].split(/\s+/) : null, f.requiredClasses = f.classes, delete e["class"], f.attributes = e, f.requiredAttributes = e && CKEDITOR.tools.objectKeys(e))
                    } else if (CKEDITOR.tools.isArray(b)) { for (f = 0; f < b.length; ++f)h = this.allow(b[f], c, e); return h } a(this, b, c, this.allowedContent, this._.allowedRules); return !0
                }, applyTo: function (a, b, c, g) {
                    if (this.disabled) return !1; var e = this, f = [], h = this.editor && this.editor.config.protectedSource, d, m = !1, k = {
                        doFilter: !c,
                        doTransform: !0, doCallbacks: !0, toHtml: b
                    }; a.forEach(function (a) {
                        if (a.type == CKEDITOR.NODE_ELEMENT) { if ("off" == a.attributes["data-cke-filter"]) return !1; if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-")) if (d = q(e, a, f, k), d & 1) m = !0; else if (d & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                            var c; a: {
                                var g = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); c = []; var l, n, u; if (h) for (n = 0; n < h.length; ++n)if ((u = g.match(h[n])) &&
                                    u[0].length == g.length) { c = !0; break a } g = CKEDITOR.htmlParser.fragment.fromHtml(g); 1 == g.children.length && (l = g.children[0]).type == CKEDITOR.NODE_ELEMENT && q(e, l, c, k); c = !c.length
                            } c || f.push(a)
                        }
                    }, null, !0); f.length && (m = !0); var l; a = []; g = H[g || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var n; c = f.pop();)c.type == CKEDITOR.NODE_ELEMENT ? x(c, g, a) : c.remove(); for (; l = a.pop();)if (c = l.el, c.parent) switch (n = D[c.parent.name] || D.span, l.check) {
                        case "it": D.$removeEmpty[c.name] && !c.children.length ? x(c, g, a) : u(c) ||
                            x(c, g, a); break; case "el-up": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || x(c, g, a); break; case "parent-down": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || x(c.parent, g, a)
                    }return m
                }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (b) {
                    if (!l(this, b, !0)) return !1; "string" == typeof b && (b = g(b)); a(this, b, null, this.disallowedContent,
                        this._.disallowedRules); return !0
                }, addContentForms: function (a) { if (!this.disabled && a) { var b, c, g = [], e; for (b = 0; b < a.length && !e; ++b)c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (e = c); if (e) { for (b = 0; b < a.length; ++b)g.push(z(a[b], e)); this.addTransformations(g) } } }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                    if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); this.allow(a.allowedContent,
                        a.name); this.addTransformations(a.contentTransformations); this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
                }, addTransformations: function (a) {
                    var b, c; if (!this.disabled && a) {
                        var g = this._.transformations, e; for (e = 0; e < a.length; ++e) {
                            b = a[e]; var f = void 0, h = void 0, d = void 0, m = void 0, k = void 0, l = void 0; c = []; for (h = 0; h < b.length; ++h)d = b[h], "string" == typeof d ? (d = d.split(/\s*:\s*/), m = d[0], k = null, l = d[1]) : (m = d.check, k = d.left,
                                l = d.right), f || (f = d, f = f.element ? f.element : m ? m.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element), k instanceof CKEDITOR.style && (k = A(k)), c.push({ check: m == f ? null : m, left: k, right: "string" == typeof l ? G(l) : l }); b = f; g[b] || (g[b] = []); g[b].push(c)
                        }
                    }
                }, check: function (a, b, c) {
                    if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var e = a.length; e--;)if (this.check(a[e], b, c)) return !0; return !1 } var f, h; if ("string" == typeof a) {
                        h = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e"; if (h in this._.cachedChecks) return this._.cachedChecks[h];
                        e = g(a).$1; f = e.styles; var d = e.classes; e.name = e.elements; e.classes = d = d ? d.split(/\s*,\s*/) : []; e.styles = m(f); e.attributes = m(e.attributes); e.children = []; d.length && (e.attributes["class"] = d.join(" ")); f && (e.attributes.style = CKEDITOR.tools.writeCssText(e.styles)); f = e
                    } else e = a.getDefinition(), f = e.styles, d = e.attributes || {}, f && !CKEDITOR.tools.isEmpty(f) ? (f = F(f), d.style = CKEDITOR.tools.writeCssText(f, !0)) : f = {}, f = { name: e.element, attributes: d, classes: d["class"] ? d["class"].split(/\s+/) : [], styles: f, children: [] }; var d =
                        CKEDITOR.tools.clone(f), k = [], l; if (!1 !== b && (l = this._.transformations[f.name])) { for (e = 0; e < l.length; ++e)y(this, f, l[e]); w(f) } q(this, d, k, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c }); b = 0 < k.length ? !1 : CKEDITOR.tools.objectCompare(f.attributes, d.attributes, !0) ? !0 : !1; "string" == typeof a && (this._.cachedChecks[h] = b); return b
                }, getAllowedEnterMode: function () {
                    var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, e) {
                        var g = a.slice(),
                        f; if (this.check(H[c])) return c; for (e || (g = g.reverse()); f = g.pop();)if (this.check(f)) return b[f]; return CKEDITOR.ENTER_BR
                    }
                }(), clone: function () { var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent); a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a }, destroy: function () {
                    delete CKEDITOR.filter.instances[this.id];
                    delete this._; delete this.allowedContent; delete this.disallowedContent
                }
            }; var J = { styles: 1, attributes: 1, classes: 1 }, K = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, E = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, R = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, O = /^cke:(object|embed|param)$/, S = /^(object|embed|param)$/, L; L = CKEDITOR.filter.transformationsTools = {
                sizeToStyle: function (a) {
                    this.lengthToStyle(a,
                        "width"); this.lengthToStyle(a, "height")
                }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var e = a.attributes[b]; e && (/^\d+$/.test(e) && (e += "px"), a.styles[c] = e) } delete a.attributes[b] }, lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var e = a.styles[b], g = e && e.match(/^(\d+)(?:\.\d*)?px$/); g ? a.attributes[c] = g[1] : "cke-test" == e && (a.attributes[c] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) {
                    if (!("float" in
                        a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align
                }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] }, splitBorderShorthand: function (a) {
                    function b(e) { a.styles["border-top-width"] = c[e[0]]; a.styles["border-right-width"] = c[e[1]]; a.styles["border-bottom-width"] = c[e[2]]; a.styles["border-left-width"] = c[e[3]] } if (a.styles.border) {
                        var c = a.styles.border.match(/([\.\d]+\w+)/g) ||
                            ["0px"]; switch (c.length) { case 1: a.styles["border-width"] = c[0]; break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }a.styles["border-style"] = a.styles["border-style"] || (a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/) || [])[0]; a.styles["border-style"] || delete a.styles["border-style"]; delete a.styles.border
                    }
                }, listTypeToStyle: function (a) {
                    if (a.attributes.type) switch (a.attributes.type) {
                        case "a": a.styles["list-style-type"] =
                            "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman"; break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type
                    }
                }, splitMarginShorthand: function (a) {
                    function b(e) { a.styles["margin-top"] = c[e[0]]; a.styles["margin-right"] = c[e[1]]; a.styles["margin-bottom"] = c[e[2]]; a.styles["margin-left"] = c[e[3]] } if (a.styles.margin) {
                        var c =
                            a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"]; switch (c.length) { case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }delete a.styles.margin
                    }
                }, matchesStyle: C, transform: function (a, b) {
                    if ("string" == typeof b) a.name = b; else {
                        var c = b.getDefinition(), e = c.styles, g = c.attributes, f, h, d, m; a.name = c.element; for (f in g) if ("class" == f) for (c = a.classes.join("|"), d = g[f].split(/\s+/); m = d.pop();)-1 == c.indexOf(m) && a.classes.push(m); else a.attributes[f] = g[f]; for (h in e) a.styles[h] =
                            e[h]
                    }
                }
            }
        }(), function () {
            CKEDITOR.focusManager = function (a) { if (a.focusManager) return a.focusManager; this.hasFocus = !1; this.currentActive = null; this._ = { editor: a }; return this }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
                focus: function (a) { this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus")) },
                lock: function () { this._.locked = 1 }, unlock: function () { delete this._.locked }, blur: function (a) { function d() { if (this.hasFocus) { this.hasFocus = !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur") } } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); var b = CKEDITOR.focusManager._.blurDelay; a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; d.call(this) }, b, this) } }, add: function (a, d) {
                    var b = a.getCustomData("focusmanager"); if (!b ||
                        b != this) { b && b.remove(a); var b = "focus", c = "blur"; d && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1); var h = { blur: function () { a.equals(this.currentActive) && this.blur() }, focus: function () { this.focus(a) } }; a.on(b, h.focus, this); a.on(c, h.blur, this); d && (CKEDITOR.event.useCapture = 0); a.setCustomData("focusmanager", this); a.setCustomData("focusmanager_handlers", h) }
                }, remove: function (a) {
                    a.removeCustomData("focusmanager"); var d = a.removeCustomData("focusmanager_handlers"); a.removeListener("blur",
                        d.blur); a.removeListener("focus", d.focus)
                }
            }
        }(), CKEDITOR.keystrokeHandler = function (a) { if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes = {}; this._ = { editor: a }; return this }, function () {
            var a, d = function (b) { b = b.data; var h = b.getKeystroke(), d = this.keystrokes[h], k = this._.editor; a = !1 === k.fire("key", { keyCode: h, domEvent: b }); a || (d && (a = !1 !== k.execCommand(d, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[h])); a && b.preventDefault(!0); return !a }, b = function (b) {
                a && (a =
                    !1, b.data.preventDefault(!0))
            }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", d, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this) } }
        }(), function () {
            CKEDITOR.lang = {
                languages: {
                    af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1,
                    "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1
                }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (a, d, b) { a && CKEDITOR.lang.languages[a] || (a = this.detect(d, a)); var c = this; d = function () { c[a].dir = c.rtl[a] ? "rtl" : "ltr"; b(a, c[a]) }; this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), d, this) }, detect: function (a, d) {
                    var b = this.languages; d = d || navigator.userLanguage || navigator.language || a; var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                        h = c[1], c = c[2]; b[h + "-" + c] ? h = h + "-" + c : b[h] || (h = null); CKEDITOR.lang.detect = h ? function () { return h } : function (a) { return a }; return h || a
                }
            }
        }(), CKEDITOR.scriptLoader = function () {
            var a = {}, d = {}; return {
                load: function (b, c, h, l) {
                    var k = "string" == typeof b; k && (b = [b]); h || (h = CKEDITOR); var f = b.length, e = [], m = [], g = function (a) { c && (k ? c.call(h, a) : c.call(h, e, m)) }; if (0 === f) g(!0); else {
                        var n = function (a, b) { (b ? e : m).push(a); 0 >= --f && (l && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), g(b)) }, p = function (b, c) {
                            a[b] = 1; var e = d[b];
                            delete d[b]; for (var g = 0; g < e.length; g++)e[g](b, c)
                        }, q = function (b) {
                            if (a[b]) n(b, !0); else {
                                var e = d[b] || (d[b] = []); e.push(n); if (!(1 < e.length)) {
                                    var g = new CKEDITOR.dom.element("script"); g.setAttributes({ type: "text/javascript", src: b }); c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? g.$.onreadystatechange = function () { if ("loaded" == g.$.readyState || "complete" == g.$.readyState) g.$.onreadystatechange = null, p(b, !0) } : (g.$.onload = function () { setTimeout(function () { p(b, !0) }, 0) }, g.$.onerror = function () {
                                        p(b,
                                            !1)
                                    })); g.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        }; l && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var r = 0; r < f; r++)q(b[r])
                    }
                }, queue: function () { function a() { var b; (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) } var c = []; return function (h, d) { var k = this; c.push({ scriptUrl: h, callback: function () { d && d.apply(this, arguments); c.shift(); a.call(k) } }); 1 == c.length && a.call(this) } }()
            }
        }(), CKEDITOR.resourceManager = function (a, d) {
            this.basePath = a; this.fileName = d; this.registered = {}; this.loaded =
                {}; this.externals = {}; this._ = { waitingList: {} }
        }, CKEDITOR.resourceManager.prototype = {
            add: function (a, d) { if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.'); var b = this.registered[a] = d || {}; b.name = a; b.path = this.getPath(a); CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b); return this.get(a) }, get: function (a) { return this.registered[a] || null }, getPath: function (a) {
                var d = this.externals[a]; return CKEDITOR.getUrl(d && d.dir || this.basePath +
                    a + "/")
            }, getFilePath: function (a) { var d = this.externals[a]; return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + ".js")) }, addExternal: function (a, d, b) { a = a.split(","); for (var c = 0; c < a.length; c++) { var h = a[c]; b || (d = d.replace(/[^\/]+$/, function (a) { b = a; return "" })); this.externals[h] = { dir: d, file: b || this.fileName + ".js" } } }, load: function (a, d, b) {
                CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var c = this.loaded, h = this.registered, l = [], k = {}, f = {}, e = 0; e < a.length; e++) {
                    var m = a[e]; if (m) if (c[m] || h[m]) f[m] = this.get(m);
                    else { var g = this.getFilePath(m); l.push(g); g in k || (k[g] = []); k[g].push(m) }
                } CKEDITOR.scriptLoader.load(l, function (a, e) { if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[e[0]].join(",") + '" was not found at "' + e[0] + '".'); for (var g = 0; g < a.length; g++)for (var h = k[a[g]], m = 0; m < h.length; m++) { var l = h[m]; f[l] = this.get(l); c[l] = 1 } d.call(b, f) }, this)
            }
        }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
            var d =
                {}; return function (b, c, h) {
                    var l = {}, k = function (b) {
                        a.call(this, b, function (a) {
                            CKEDITOR.tools.extend(l, a); var b = [], g; for (g in a) { var f = a[g], p = f && f.requires; if (!d[g]) { if (f.icons) for (var q = f.icons.split(","), r = q.length; r--;)CKEDITOR.skin.addIcon(q[r], f.path + "icons/" + (CKEDITOR.env.hidpi && f.hidpi ? "hidpi/" : "") + q[r] + ".png"); d[g] = 1 } if (p) for (p.split && (p = p.split(",")), f = 0; f < p.length; f++)l[p[f]] || b.push(p[f]) } if (b.length) k.call(this, b); else {
                                for (g in l) f = l[g], f.onLoad && !f.onLoad._called && (!1 === f.onLoad() && delete l[g],
                                    f.onLoad._called = 1); c && c.call(h || window, l)
                            }
                        }, this)
                    }; k.call(this, b)
                }
        }), CKEDITOR.plugins.setLang = function (a, d, b) { var c = this.get(a); a = c.langEntries || (c.langEntries = {}); c = c.lang || (c.lang = []); c.split && (c = c.split(",")); -1 == CKEDITOR.tools.indexOf(c, d) && c.push(d); a[d] = b }, CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this }, CKEDITOR.ui.prototype = {
            add: function (a, d, b) {
                b.name = a.toLowerCase(); var c = this.items[a] = {
                    type: d, command: b.command ||
                        null, args: Array.prototype.slice.call(arguments, 2)
                }; CKEDITOR.tools.extend(c, b)
            }, get: function (a) { return this.instances[a] }, create: function (a) { var d = this.items[a], b = d && this._.handlers[d.type], c = d && d.command && this.editor.getCommand(d.command), b = b && b.create.apply(this, d.args); this.instances[a] = b; c && c.uiItems.push(b); b && !b.type && (b.type = d.type); return b }, addHandler: function (a, d) { this._.handlers[a] = d }, space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) }, spaceId: function (a) {
                return this.editor.id +
                    "_" + a
            }
        }, CKEDITOR.event.implementOn(CKEDITOR.ui), function () {
            function a(a, e, g) {
                CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a); if (void 0 !== e) {
                    if (!(e instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element."); if (!g) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && g == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!b(e, g)) throw Error('The specified element mode is not supported on element: "' +
                        e.getName() + '".'); this.element = e; this.elementMode = g; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
                } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || d(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
                this.on("readOnly", c); this.on("selectionChange", function (a) { l(this, a.data.path) }); this.on("activeFilterChange", function () { l(this, this.elementPath(), !0) }); this.on("mode", c); this.on("instanceReady", function () { this.config.startupFocus && this.focus() }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () { "destroyed" !== this.status ? f(this, a) : CKEDITOR.warn("editor-incorrect-destroy") }, 0, this)
            } function d() { do var a = "editor" + ++r; while (CKEDITOR.instances[a]); return a }
            function b(a, b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function c() { var a = this.commands, b; for (b in a) h(this, a[b]) } function h(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function l(a, b, c) { if (b) { var e, g, f = a.commands; for (g in f) e = f[g], (c || e.contextSensitive) && e.refresh(a, b) } } function k(a) {
                var b = a.config.customConfig; if (!b) return !1;
                var b = CKEDITOR.getUrl(b), c = w[b] || (w[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () { }; k(a) }); return !0
            } function f(a, b) {
                a.on("customConfigLoaded", function () {
                    if (b) { if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config, b, !0); delete a.config.on } c = a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ?
                        a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                    a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); e(a)
                }); b && null != b.customConfig && (a.config.customConfig = b.customConfig); k(a) || a.fireOnce("customConfigLoaded")
            } function e(a) { CKEDITOR.skin.loadPart("editor", function () { m(a) }) } function m(a) {
                CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b,
                    c) { var e = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(c); a.title = "string" == typeof e || !1 === e ? e : [a.lang.editor, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire("langLoaded"); g(a) })
            } function g(a) { a.getStylesSet(function (b) { a.once("loaded", function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); n(a) }) } function n(a) {
                var b = a.config, c = b.plugins, e = b.extraPlugins, g =
                    b.removePlugins; if (e) var f = new RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(f, ""), c = c + ("," + e); if (g) var h = new RegExp("(?:^|,)(?:" + g.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"), c = c.replace(h, ""); CKEDITOR.env.air && (c += ",adobeair"); CKEDITOR.plugins.load(c.split(","), function (c) {
                        var e = [], g = [], f = []; a.plugins = c; for (var d in c) {
                            var m = c[d], k = m.lang, l = null, n = m.requires, x; CKEDITOR.tools.isArray(n) && (n = n.join(",")); if (n && (x = n.match(h))) for (; n = x.pop();)CKEDITOR.error("editor-plugin-required",
                                { plugin: n.replace(",", ""), requiredBy: d }); k && !a.lang[d] && (k.split && (k = k.split(",")), 0 <= CKEDITOR.tools.indexOf(k, a.langCode) ? l = a.langCode : (l = a.langCode.replace(/-.*/, ""), l = l != a.langCode && 0 <= CKEDITOR.tools.indexOf(k, l) ? l : 0 <= CKEDITOR.tools.indexOf(k, "en") ? "en" : k[0]), m.langEntries && m.langEntries[l] ? (a.lang[d] = m.langEntries[l], l = null) : f.push(CKEDITOR.getUrl(m.path + "lang/" + l + ".js"))); g.push(l); e.push(m)
                        } CKEDITOR.scriptLoader.load(f, function () {
                            for (var c = ["beforeInit", "init", "afterInit"], f = 0; f < c.length; f++)for (var h =
                                0; h < e.length; h++) { var d = e[h]; 0 === f && g[h] && d.lang && d.langEntries && (a.lang[d.name] = d.langEntries[g[h]]); if (d[c[f]]) d[c[f]](a) } a.fireOnce("pluginsLoaded"); b.keystrokes && a.setKeystroke(a.config.keystrokes); for (h = 0; h < a.config.blockedKeystrokes.length; h++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[h]] = 1; a.status = "loaded"; a.fireOnce("loaded"); CKEDITOR.fire("instanceLoaded", null, a)
                        })
                    })
            } function p() {
                var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                    var b = this.getData();
                    this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return !0
                } return !1
            } function q(a, b) {
                function c(a) { var b = a.startContainer, e = a.endContainer; return b.is && (b.is("tr") || b.is("td") && b.equals(e) && a.endOffset === b.getChildCount()) ? !0 : !1 } function e(a) { var b = a.startContainer; return b.is("tr") ? a.cloneContents() : b.clone(!0) } for (var g = new CKEDITOR.dom.documentFragment, f, h, d, m = 0; m < a.length; m++) {
                    var k = a[m], l = k.startContainer.getAscendant("tr", !0); c(k) ? (f ||
                        (f = l.getAscendant("table").clone(), f.append(l.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), g.append(f), f = f.findOne("thead, tbody, tfoot")), h && h.equals(l) || (h = l, d = l.clone(), f.append(d)), d.append(e(k))) : g.append(k.cloneContents())
                } return f ? g : b.getHtmlFromRange(a[0])
            } a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var r = 0, w = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                addCommand: function (a, b) {
                    b.name = a.toLowerCase(); var c = new CKEDITOR.command(this, b); this.mode && h(this, c); return this.commands[a] =
                        c
                }, _attachToForm: function () { function a(b) { c.updateElement(); c._.required && !e.getValue() && !1 === c.fire("required") && b.data.preventDefault() } function b(a) { return !!(a && a.call && a.apply) } var c = this, e = c.element, g = new CKEDITOR.dom.element(e.$.form); e.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit = CKEDITOR.tools.override(g.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), c.on("destroy", function () { g.removeListener("submit", a) })) }, destroy: function (a) {
                    this.fire("beforeDestroy");
                    !a && p.call(this); this.editable(null); this.filter && (this.filter.destroy(), delete this.filter); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this)
                }, elementPath: function (a) { if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null }, createRange: function () { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null }, execCommand: function (a,
                    b) { var c = this.getCommand(a), e = { name: a, commandData: b || {}, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", e) && (e.returnValue = c.exec(e.commandData), !c.async && !1 !== this.fire("afterCommandExec", e)) ? e.returnValue : !1 }, getCommand: function (a) { return this.commands[a] }, getData: function (a) {
                        !a && this.fire("beforeGetData"); var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() :
                            ""); b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue
                    }, getSnapshot: function () { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, c) {
                        var e = !0, g = b; b && "object" == typeof b && (c = b.internal, g = b.callback, e = !b.noSnapshot); !c && e && this.fire("saveSnapshot"); if (g || !c) this.once("dataReady", function (a) {
                            !c &&
                            e && this.fire("saveSnapshot"); g && g.call(a.editor)
                        }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a)
                    }, setReadOnly: function (a) { a = null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) }, insertHtml: function (a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) }, insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) {
                        this.fire("insertElement",
                            a)
                    }, getSelectedHtml: function (a) { var b = this.editable(), c = this.getSelection(), c = c && c.getRanges(); if (!b || !c || 0 === c.length) return null; b = q(c, b); return a ? b.getHtml() : b }, extractSelectedHtml: function (a, b) { var c = this.editable(), e = this.getSelection().getRanges(), g = new CKEDITOR.dom.documentFragment, f; if (!c || 0 === e.length) return null; for (f = 0; f < e.length; f++)g.append(c.extractHtmlFromRange(e[f], b)); b || this.getSelection().selectRanges([e[0]]); return a ? g.getHtml() : g }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () {
                        return "ready" ==
                            this.status && this._.previousValue !== this.getSnapshot()
                    }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return p.call(this) }, setKeystroke: function () { for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, e, g = b.length; g--;)c = b[g], e = 0, CKEDITOR.tools.isArray(c) && (e = c[1], c = c[0]), e ? a[c] = e : delete a[c] }, getCommandKeystroke: function (a) {
                        if (a = "string" === typeof a ? this.getCommand(a) : a) {
                            var b = CKEDITOR.tools.object.findKey(this.commands,
                                a), c = this.keystrokeHandler.keystrokes, e; if (a.fakeKeystroke) return a.fakeKeystroke; for (e in c) if (c.hasOwnProperty(e) && c[e] == b) return e
                        } return null
                    }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) { a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0))) }, setActiveEnterMode: function (a,
                        b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") }, showNotification: function (a) { alert(a) }
            })
        }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } },
        function () {
            var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, d = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
                onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (b) {
                    for (var c, h, l = 0, k; c = this._.htmlPartsRegex.exec(b);) {
                        h = c.index; if (h > l) if (l = b.substring(l, h), k) k.push(l); else this.onText(l);
                        l = this._.htmlPartsRegex.lastIndex; if (h = c[1]) if (h = h.toLowerCase(), k && CKEDITOR.dtd.$cdata[h] && (this.onCDATA(k.join("")), k = null), !k) { this.onTagClose(h); continue } if (k) k.push(c[0]); else if (h = c[3]) { if (h = h.toLowerCase(), !/="/.test(h)) { var f = {}, e, m = c[4]; c = !!c[5]; if (m) for (; e = a.exec(m);) { var g = e[1].toLowerCase(); e = e[2] || e[3] || e[4] || ""; f[g] = !e && d[g] ? g : CKEDITOR.tools.htmlDecodeAttr(e) } this.onTagOpen(h, f, c); !k && CKEDITOR.dtd.$cdata[h] && (k = []) } } else if (h = c[2]) this.onComment(h)
                    } if (b.length > l) this.onText(b.substring(l,
                        b.length))
                }
            }
        }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function () { this._ = { output: [] } }, proto: {
                openTag: function (a) { this._.output.push("\x3c", a) }, openTagClose: function (a, d) { d ? this._.output.push(" /\x3e") : this._.output.push("\x3e") }, attribute: function (a, d) { "string" == typeof d && (d = CKEDITOR.tools.htmlEncodeAttr(d)); this._.output.push(" ", a, '\x3d"', d, '"') }, closeTag: function (a) { this._.output.push("\x3c/", a, "\x3e") }, text: function (a) { this._.output.push(a) }, comment: function (a) {
                    this._.output.push("\x3c!--",
                        a, "--\x3e")
                }, write: function (a) { this._.output.push(a) }, reset: function () { this._.output = []; this._.indent = !1 }, getHtml: function (a) { var d = this._.output.join(""); a && this.reset(); return d }
            }
        }), "use strict", function () {
            CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
                remove: function () { var a = this.parent.children, d = CKEDITOR.tools.indexOf(a, this), b = this.previous, c = this.next; b && (b.next = c); c && (c.previous = b); a.splice(d, 1); this.parent = null }, replaceWith: function (a) {
                    var d = this.parent.children,
                    b = CKEDITOR.tools.indexOf(d, this), c = a.previous = this.previous, h = a.next = this.next; c && (c.next = a); h && (h.previous = a); d[b] = a; a.parent = this.parent; this.parent = null
                }, insertAfter: function (a) { var d = a.parent.children, b = CKEDITOR.tools.indexOf(d, a), c = a.next; d.splice(b + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; c && (c.previous = this); this.parent = a.parent }, insertBefore: function (a) {
                    var d = a.parent.children, b = CKEDITOR.tools.indexOf(d, a); d.splice(b, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next =
                        this); a.previous = this; this.parent = a.parent
                }, getAscendant: function (a) { var d = "function" == typeof a ? a : "string" == typeof a ? function (b) { return b.name == a } : function (b) { return b.name in a }, b = this.parent; for (; b && b.type == CKEDITOR.NODE_ELEMENT;) { if (d(b)) return b; b = b.parent } return null }, wrapWith: function (a) { this.replaceWith(a); a.add(this); return a }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (a) { return a || {} }
            }
        }(), "use strict", CKEDITOR.htmlParser.comment =
        function (a) { this.value = a; this._ = { isBlockLike: !1 } }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function (a, d) { var b = this.value; if (!(b = a.onComment(d, b, this))) return this.remove(), !1; if ("string" != typeof b) return this.replaceWith(b), !1; this.value = b; return !0 }, writeHtml: function (a, d) { d && this.filter(d); a.comment(this.value) } }), "use strict", function () {
            CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype =
                CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (a, d) { if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1 }, writeHtml: function (a, d) { d && this.filter(d); a.text(this.value) } })
        }(), "use strict", function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function () { }, writeHtml: function (a) { a.write(this.value) } }) }(), "use strict",
        CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } }, function () {
            function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var d = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), b = { ol: 1, ul: 1 }, c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }), h = {
                ul: "li",
                ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td"
            }; CKEDITOR.htmlParser.fragment.fromHtml = function (l, k, f) {
                function e(a) { var b; if (0 < u.length) for (var c = 0; c < u.length; c++) { var e = u[c], g = e.name, f = CKEDITOR.dtd[g], h = t.name && CKEDITOR.dtd[t.name]; h && !h[g] || a && f && !f[a] && CKEDITOR.dtd[a] ? g == t.name && (n(t, t.parent, 1), c--) : (b || (m(), b = 1), e = e.clone(), e.parent = t, t = e, u.splice(c, 1), c--) } } function m() { for (; v.length;)n(v.shift(), t) } function g(a) {
                    if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
                        var b =
                            a.children.length, c = a.children[b - 1], e; c && c.type == CKEDITOR.NODE_TEXT && ((e = CKEDITOR.tools.rtrim(c.value)) ? c.value = e : a.children.length = b - 1)
                    }
                } function n(b, c, e) { c = c || t || w; var h = t; void 0 === b.previous && (p(c, b) && (t = c, r.onTagOpen(f, {}), b.returnPoint = c = t), g(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (x = !1), "textarea" == b.name && (B = !1)); b.returnPoint ? (t = b.returnPoint, delete b.returnPoint) : t = e ? c : h } function p(a, b) {
                    if ((a == w || "body" == a.name) && f && (!a.name || CKEDITOR.dtd[a.name][f])) {
                        var c, e; return (c = b.attributes &&
                            (e = b.attributes["data-cke-real-element-type"]) ? e : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                } function q(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var r = new CKEDITOR.htmlParser, w = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment, u = [], v = [], t = w, B = "textarea" == w.name, x = "pre" == w.name; r.onTagOpen =
                    function (g, f, h, k) {
                        f = new CKEDITOR.htmlParser.element(g, f); f.isUnknown && h && (f.isEmpty = !0); f.isOptionalClose = k; if (a(f)) u.push(f); else {
                            if ("pre" == g) x = !0; else { if ("br" == g && x) { t.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == g && (B = !0) } if ("br" == g) v.push(f); else {
                                for (; !(k = (h = t.name) ? CKEDITOR.dtd[h] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, f.isUnknown || t.isUnknown || k[g]);)if (t.isOptionalClose) r.onTagClose(h); else if (g in b && h in b) h = t.children, (h = h[h.length - 1]) && "li" == h.name || n(h = new CKEDITOR.htmlParser.element("li"),
                                    t), !f.returnPoint && (f.returnPoint = t), t = h; else if (g in CKEDITOR.dtd.$listItem && !q(g, h)) r.onTagOpen("li" == g ? "ul" : "dl", {}, 0, 1); else if (h in d && !q(g, h)) !f.returnPoint && (f.returnPoint = t), t = t.parent; else if (h in CKEDITOR.dtd.$inline && u.unshift(t), t.parent) n(t, t.parent, 1); else { f.isOrphan = 1; break } e(g); m(); f.parent = t; f.isEmpty ? n(f) : t = f
                            }
                        }
                    }; r.onTagClose = function (a) {
                        for (var b = u.length - 1; 0 <= b; b--)if (a == u[b].name) { u.splice(b, 1); return } for (var c = [], e = [], g = t; g != w && g.name != a;)g._.isBlockLike || e.unshift(g), c.push(g),
                            g = g.returnPoint || g.parent; if (g != w) { for (b = 0; b < c.length; b++) { var h = c[b]; n(h, h.parent) } t = g; g._.isBlockLike && m(); n(g, g.parent); g == t && (t = t.parent); u = u.concat(e) } "body" == a && (f = !1)
                    }; r.onText = function (a) {
                        if (!(t._.hasInlineStarted && !v.length || x || B) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return; var b = t.name, g = b ? CKEDITOR.dtd[b] || (t._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c; if (!B && !g["#"] && b in d) r.onTagOpen(h[b] || ""), r.onText(a); else {
                            m(); e(); x || B || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); a =
                                new CKEDITOR.htmlParser.text(a); if (p(t, a)) this.onTagOpen(f, {}, 0, 1); t.add(a)
                        }
                    }; r.onCDATA = function (a) { t.add(new CKEDITOR.htmlParser.cdata(a)) }; r.onComment = function (a) { m(); e(); t.add(new CKEDITOR.htmlParser.comment(a)) }; r.parse(l); for (m(); t != w;)n(t, t.parent, 1); g(w); return w
            }; CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                    isNaN(b) && (b = this.children.length); var c = 0 < b ? this.children[b - 1] : null; if (c) {
                        if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value),
                            0 === c.value.length)) { this.children.pop(); this.add(a); return } c.next = a
                    } a.previous = c; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
                }, filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) }, filterChildren: function (a, b, c) {
                    if (this.childrenFilteredBy != a.id) {
                        c = this.getFilterContext(c); if (b && !this.parent) a.onRoot(c, this); this.childrenFilteredBy = a.id;
                        for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a, c) && b--
                    }
                }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, c) { var e = this.getFilterContext(); if (c && !this.parent && b) b.onRoot(e, this); b && this.filterChildren(b, !1, e); b = 0; c = this.children; for (e = c.length; b < e; b++)c[b].writeHtml(a) }, forEach: function (a, b, c) {
                    if (!(c || b && this.type != b)) var e = a(this); if (!1 !== e) {
                        c = this.children; for (var h = 0; h < c.length; h++)e = c[h], e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a,
                            b) : b && e.type != b || a(e)
                    }
                }, getFilterContext: function (a) { return a || {} }
            }
        }(), "use strict", function () {
            function a() { this.rules = [] } function d(b, c, h, d) { var k, f; for (k in c) (f = b[k]) || (f = b[k] = new a), f.add(c[k], h, d) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                $: function (b) { this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a; this.attributeNameRules = new a; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a; this.commentRules = new a; this.rootRules = new a; b && this.addRules(b, 10) },
                proto: {
                    addRules: function (a, c) {
                        var h; "number" == typeof c ? h = c : c && "priority" in c && (h = c.priority); "number" != typeof h && (h = 10); "object" != typeof c && (c = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, h, c); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, h, c); a.elements && d(this.elementsRules, a.elements, h, c); a.attributes && d(this.attributesRules, a.attributes, h, c); a.text && this.textRules.add(a.text, h, c); a.comment && this.commentRules.add(a.comment, h, c); a.root && this.rootRules.add(a.root,
                            h, c)
                    }, applyTo: function (a) { a.filter(this) }, onElementName: function (a, c) { return this.elementNameRules.execOnName(a, c) }, onAttributeName: function (a, c) { return this.attributeNameRules.execOnName(a, c) }, onText: function (a, c, h) { return this.textRules.exec(a, c, h) }, onComment: function (a, c, h) { return this.commentRules.exec(a, c, h) }, onRoot: function (a, c) { return this.rootRules.exec(a, c) }, onElement: function (a, c) {
                        for (var h = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], d, k = 0; 3 > k; k++)if (d = h[k]) {
                            d =
                            d.exec(a, c, this); if (!1 === d) return null; if (d && d != c) return this.onNode(a, d); if (c.parent && !c.name) break
                        } return c
                    }, onNode: function (a, c) { var h = c.type; return h == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : h == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : h == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null }, onAttribute: function (a, c, h, d) { return (h = this.attributesRules[h]) ? h.exec(a, d, c, this) : d }
                }
            }); CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype =
            {
                add: function (a, c, h) { this.rules.splice(this.findIndex(c), 0, { value: a, priority: c, options: h }) }, addMany: function (a, c, h) { for (var d = [this.findIndex(c), 0], k = 0, f = a.length; k < f; k++)d.push({ value: a[k], priority: c, options: h }); this.rules.splice.apply(this.rules, d) }, findIndex: function (a) { for (var c = this.rules, h = c.length - 1; 0 <= h && a < c[h].priority;)h--; return h + 1 }, exec: function (a, c) {
                    var h = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment, d = Array.prototype.slice.call(arguments, 1), k = this.rules,
                    f = k.length, e, m, g, n; for (n = 0; n < f; n++)if (h && (e = c.type, m = c.name), g = k[n], !(a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable)) { g = g.value.apply(null, d); if (!1 === g || h && g && (g.name != m || g.type != e)) return g; null != g && (d[0] = c = g) } return c
                }, execOnName: function (a, c) { for (var h = 0, d = this.rules, k = d.length, f; c && h < k; h++)f = d[h], a.nonEditable && !f.options.applyToAll || a.nestedEditable && f.options.excludeNestedEditable || (c = c.replace(f.value[0], f.value[1])); return c }
            }
        }(), function () {
            function a(a,
                e) {
                    function g(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function f(a, e) {
                        return function (f) {
                            if (f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                var h = [], m = b(f), k, x; if (m) for (d(m, 1) && h.push(m); m;)l(m) && (k = c(m)) && d(k) && ((x = c(k)) && !l(x) ? h.push(k) : (g(n).insertAfter(k), k.remove())), m = m.previous; for (m = 0; m < h.length; m++)h[m].remove(); if (h = !a || !1 !== ("function" == typeof e ? e(f) : e)) n || CKEDITOR.env.needsBrFiller || f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ?
                                    n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem) ? (h = b(f), h = !h || "form" == f.name && "input" == h.name) : h = !1 : h = !1; h && f.add(g(a))
                            }
                        }
                    } function d(a, b) {
                        if ((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(u)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller &&
                            n && (!b || a.parent.name in E) || !n && ((c = a.previous) && "br" == c.name || !c || l(c))) ? !0 : !1
                    } var m = { elements: {} }, n = "html" == e, E = CKEDITOR.tools.extend({}, x), p; for (p in E) "#" in t[p] || delete E[p]; for (p in E) m.elements[p] = f(n, a.config.fillEmptyBlocks); m.root = f(n, !1); m.elements.br = function (a) {
                        return function (b) {
                            if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                var e = b.attributes; if ("data-cke-bogus" in e || "data-cke-eol" in e) delete e["data-cke-bogus"]; else {
                                    for (e = b.next; e && h(e);)e = e.next; var f = c(b); !e && l(b.parent) ? k(b.parent,
                                        g(a)) : l(e) && f && !l(f) && g(a).insertBefore(e)
                                }
                            }
                        }
                    }(n); return m
            } function d(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function b(a) { for (a = a.children[a.children.length - 1]; a && h(a);)a = a.previous; return a } function c(a) { for (a = a.previous; a && h(a);)a = a.previous; return a } function h(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] } function l(a) {
                return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
                    x || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
            } function k(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function f(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function e(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function m(a) {
                return a.replace(G, function (a, b, c) {
                    return "\x3c" + b + c.replace(D,
                        function (a, b) { return F.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e"
                })
            } function g(a, b) { return a.replace(b, function (a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + q(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) } function n(a) { return a.replace(J, function (a, b) { return decodeURIComponent(b) }) } function p(a) {
                return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                    function (a) { return "\x3c!--" + v + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
            } function q(a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }) } function r(a, b) { var c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" }) } function w(a, b) {
                var c = [], e = b.config.protectedSource, g = b._.dataStore || (b._.dataStore =
                    { id: 1 }), f = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, e = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(e); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) { return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" }); for (var h = 0; h < e.length; h++)a = a.replace(e[h], function (a) { a = a.replace(f, function (a, b, e) { return c[e] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" }); a = a.replace(f, function (a, b, e) {
                        return "\x3c!--" + v + (b ? "{C}" :
                            "") + encodeURIComponent(c[e]).replace(/--/g, "%2D%2D") + "--\x3e"
                    }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) { return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a, b) { g[g.id] = decodeURIComponent(b); return "{cke_protected_" + g.id++ + "}" }) }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, e, g) { return "\x3c" + c + e + "\x3e" + r(q(g), b) + "\x3c/" + c + "\x3e" })
            } CKEDITOR.htmlDataProcessor = function (b) {
                var c,
                e, f = this; this.editor = b; this.dataFilter = c = new CKEDITOR.htmlParser.filter; this.htmlFilter = e = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; c.addRules(y); c.addRules(C, { applyToAll: !0 }); c.addRules(a(b, "data"), { applyToAll: !0 }); e.addRules(z); e.addRules(A, { applyToAll: !0 }); e.addRules(a(b, "html"), { applyToAll: !0 }); b.on("toHtml", function (a) {
                    a = a.data; var c = a.dataValue, e, c = w(c, b), c = g(c, H), c = m(c), c = g(c, I), c = c.replace(K, "$1cke:$2"), c = c.replace(R, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                        c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2"); e = a.context || b.editable().getName(); var f; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == e && (e = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", f = 1); e = b.document.createElement(e); e.setHtml("a" + c); c = e.getHtml().substr(1); c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""); f && (c = c.replace(/^<pre>|<\/pre>$/gi, "")); c = c.replace(E, "$1$2"); c = n(c); c = q(c); e = !1 === a.fixForBody ? !1 :
                            d(a.enterMode, b.config.autoParagraph); c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, e); e && (f = c, !f.children.length && CKEDITOR.dtd[f.name][e] && (e = new CKEDITOR.htmlParser.element(e), f.add(e))); a.dataValue = c
                }, null, null, 5); b.on("toHtml", function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6); b.on("toHtml", function (a) { a.data.dataValue.filterChildren(f.dataFilter, !0) }, null, null, 10); b.on("toHtml", function (a) {
                    a = a.data; var b = a.dataValue,
                        c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = p(b)
                }, null, null, 15); b.on("toDataFormat", function (a) { var c = a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph)) }, null, null, 5); b.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(f.htmlFilter, !0) }, null, null, 10); b.on("toDataFormat", function (a) {
                    a.data.filter.applyTo(a.data.dataValue,
                        !1, !0)
                }, null, null, 11); b.on("toDataFormat", function (a) { var c = a.data.dataValue, e = f.writer; e.reset(); c.writeChildrenHtml(e); c = e.getHtml(!0); c = q(c); c = r(c, b); a.data.dataValue = c }, null, null, 15)
            }; CKEDITOR.htmlDataProcessor.prototype = {
                toHtml: function (a, b, c, e) {
                    var g = this.editor, f, h, d, m; b && "object" == typeof b ? (f = b.context, c = b.fixForBody, e = b.dontFilter, h = b.filter, d = b.enterMode, m = b.protectedWhitespaces) : f = b; f || null === f || (f = g.editable().getName()); return g.fire("toHtml", {
                        dataValue: a, context: f, fixForBody: c, dontFilter: e,
                        filter: h || g.filter, enterMode: d || g.enterMode, protectedWhitespaces: m
                    }).dataValue
                }, toDataFormat: function (a, b) { var c, e, g; b && (c = b.context, e = b.filter, g = b.enterMode); c || null === c || (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat", { dataValue: a, filter: e || this.editor.filter, context: c, enterMode: g || this.editor.enterMode }).dataValue }
            }; var u = /(?:&nbsp;|\xa0)$/, v = "{cke_protected}", t = CKEDITOR.dtd, B = "caption colgroup col thead tfoot tbody".split(" "), x = CKEDITOR.tools.extend({}, t.$blockLimit,
                t.$block), y = { elements: { input: f, textarea: f } }, C = { attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: { iframe: function (a) { if (a.attributes && a.attributes.src) { var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src } } } }, z = {
                    elements: {
                        embed: function (a) {
                            var b = a.parent; if (b && "object" == b.name) {
                                var c = b.attributes.width, b = b.attributes.height;
                                c && (a.attributes.width = c); b && (a.attributes.height = b)
                            }
                        }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 }
                    }
                }, A = {
                    elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                        $: function (a) { var b = a.attributes; if (b) { if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"], e, g = 0; g < c.length; g++)e = "data-cke-saved-" + c[g], e in b && delete b[c[g]] } return a },
                        table: function (a) { a.children.slice(0).sort(function (a, b) { var c, e; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(B, a.name), e = CKEDITOR.tools.indexOf(B, b.name)); -1 < c && -1 < e && c != e || (c = a.parent ? a.getIndex() : -1, e = b.parent ? b.getIndex() : -1); return c > e ? 1 : -1 }) }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) { "Apple-style-span" == a.attributes["class"] && delete a.name }, html: function (a) { delete a.attributes.contenteditable; delete a.attributes["class"] }, body: function (a) {
                            delete a.attributes.spellcheck;
                            delete a.attributes.contenteditable
                        }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) { var b = a.children[0]; !b && k(a, b = new CKEDITOR.htmlParser.text); b.value = a.attributes["data-cke-title"] || "" }, input: e, textarea: e
                    }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1 } }
                }; CKEDITOR.env.ie && (A.attributes.style = function (a) {
                    return a.replace(/(^|;)([^\:]+)/g,
                        function (a) { return a.toLowerCase() })
                }); var G = /<(a|area|img|input|source)\b([^>]*)>/gi, D = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, F = /^(href|src|name)$/i, I = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, H = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, J = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, K = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, E = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, R = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
        }(),
        "use strict", CKEDITOR.htmlParser.element = function (a, d) { this.name = a; this.attributes = d || {}; this.children = []; var b = a || "", c = b.match(/^cke:(.*)/); c && (b = c[1]); b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b } }, CKEDITOR.htmlParser.cssStyle = function (a) {
            var d = {}; ((a instanceof
                CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, c, h) { "font-family" == c && (h = h.replace(/["']/g, "")); d[c.toLowerCase()] = h }); return { rules: d, populate: function (a) { var c = this.toString(); c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c) }, toString: function () { var a = [], c; for (c in d) d[c] && a.push(c, ":", d[c], ";"); return a.join("") } }
        }, function () {
            function a(a) {
                return function (b) {
                    return b.type ==
                        CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a)
                }
            } var d = function (a, b) { a = a[0]; b = b[0]; return a < b ? -1 : a > b ? 1 : 0 }, b = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_ELEMENT, add: b.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, b) {
                    var d = this, k, f; b = d.getFilterContext(b); if (b.off) return !0; if (!d.parent) a.onRoot(b, d); for (; ;) {
                        k = d.name; if (!(f =
                            a.onElementName(b, k))) return this.remove(), !1; d.name = f; if (!(d = a.onElement(b, d))) return this.remove(), !1; if (d !== this) return this.replaceWith(d), !1; if (d.name == k) break; if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1; if (!d.name) return this.replaceWithChildren(), !1
                    } k = d.attributes; var e, m; for (e in k) { for (f = k[e]; ;)if (m = a.onAttributeName(b, e)) if (m != e) delete k[e], e = m; else break; else { delete k[e]; break } m && (!1 === (f = a.onAttribute(b, d, m, f)) ? delete k[m] : k[m] = f) } d.isEmpty || this.filterChildren(a, !1,
                        b); return !0
                }, filterChildren: b.filterChildren, writeHtml: function (a, b) { b && this.filter(b); var l = this.name, k = [], f = this.attributes, e, m; a.openTag(l, f); for (e in f) k.push([e, f[e]]); a.sortAttributes && k.sort(d); e = 0; for (m = k.length; e < m; e++)f = k[e], a.attribute(f[0], f[1]); a.openTagClose(l, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(l) }, writeChildrenHtml: b.writeChildrenHtml, replaceWithChildren: function () { for (var a = this.children, b = a.length; b;)a[--b].insertAfter(this); this.remove() }, forEach: b.forEach,
                getFirst: function (b) { if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b && (b = a(b)); for (var h = 0, d = this.children.length; h < d; ++h)if (b(this.children[h])) return this.children[h]; return null }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var b = 0, d = a.length; b < d; ++b)a[b].parent = this }, getOuterHtml: function () {
                    var a = new CKEDITOR.htmlParser.basicWriter;
                    this.writeHtml(a); return a.getHtml()
                }, split: function (a) { for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), k = 0; k < b.length; ++k)b[k].parent = d; d.children = b; b[0] && (b[0].previous = null); 0 < a && (this.children[a - 1].next = null); this.parent.add(d, this.getIndex() + 1); return d }, find: function (a, b) {
                    void 0 === b && (b = !1); var d = [], k; for (k = 0; k < this.children.length; k++) {
                        var f = this.children[k]; "function" == typeof a && a(f) ? d.push(f) : "string" == typeof a && f.name === a && d.push(f); b && f.find && (d = d.concat(f.find(a,
                            b)))
                    } return d
                }, addClass: function (a) { if (!this.hasClass(a)) { var b = this.attributes["class"] || ""; this.attributes["class"] = b + (b ? " " : "") + a } }, removeClass: function (a) { var b = this.attributes["class"]; b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]) }, hasClass: function (a) { var b = this.attributes["class"]; return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1 }, getFilterContext: function (a) {
                    var b = []; a || (a = {
                        off: !1,
                        nonEditable: !1, nestedEditable: !1
                    }); a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0); if (b.length) { a = CKEDITOR.tools.copy(a); for (var d = 0; d < b.length; d += 2)a[b[d]] = b[d + 1] } return a
                }
            }, !0)
        }(), function () {
            var a = /{([^}]+)}/g; CKEDITOR.template = function (a) { this.source = String(a) }; CKEDITOR.template.prototype.output =
                function (d, b) { var c = this.source.replace(a, function (a, b) { return void 0 !== d[b] ? d[b] : a }); return b ? b.push(c) : c }
        }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function (a) {
            CKEDITOR.instances[a.name] = a; a.on("focus", function () { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) }); a.on("blur", function () { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) });
            CKEDITOR.fire("instance", null, a)
        }, CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] }, function () { var a = {}; CKEDITOR.addTemplate = function (d, b) { var c = a[d]; if (c) return c; c = { name: d, source: b }; CKEDITOR.fire("template", c); return a[d] = new CKEDITOR.template(c.source) }; CKEDITOR.getTemplate = function (d) { return a[d] } }(), function () { var a = []; CKEDITOR.addCss = function (d) { a.push(d) }; CKEDITOR.getCss = function () { return a.join("\n") } }(), CKEDITOR.on("instanceDestroyed", function () {
            CKEDITOR.tools.isEmpty(this.instances) &&
            CKEDITOR.fire("reset")
        }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function () {
            CKEDITOR.inline = function (a, d) {
                if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; var b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE), c = a.is("textarea") ? a : null; c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' +
                    !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0); b.on("loaded", function () { b.fire("uiReady"); b.editable(a); b.container = a; b.ui.contentsElement = a; b.setData(b.getData(1)); b.resetDirty(); b.fire("contentDom"); b.mode = "wysiwyg"; b.fire("mode"); b.status = "ready"; b.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, b) }, null, null, 1E4); b.on("destroy", function () {
                        c && (b.container.clearCustomData(),
                            b.container.remove(), c.show()); b.element.clearCustomData(); delete b.element
                    }); return b
            }; CKEDITOR.inlineAll = function () { var a, d, b; for (b in CKEDITOR.dtd.$editable) for (var c = CKEDITOR.document.getElementsByTag(b), h = 0, l = c.count(); h < l; h++)a = c.getItem(h), "true" == a.getAttribute("contenteditable") && (d = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", d) && CKEDITOR.inline(a, d.config)) }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
        }(), CKEDITOR.replaceClass = "ckeditor", function () {
            function a(a,
                h, l, k) {
                    if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; var f = new CKEDITOR.editor(h, a, k); k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), f._.required = a.hasAttribute("required"), a.removeAttribute("required")); l && f.setData(l, null, !0); f.on("loaded", function () {
                        b(f); k == CKEDITOR.ELEMENT_MODE_REPLACE && f.config.autoUpdateElement && a.$.form && f._attachToForm();
                        f.setMode(f.config.startupMode, function () { f.resetDirty(); f.status = "ready"; f.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, f) })
                    }); f.on("destroy", d); return f
            } function d() { var a = this.container, b = this.element; a && (a.clearCustomData(), a.remove()); b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element) } function b(a) {
                var b = a.name, d = a.element, k = a.elementMode, f = a.fire("uiSpace", {
                    space: "top",
                    html: ""
                }).html, e = a.fire("uiSpace", { space: "bottom", html: "" }).html, m = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                b = CKEDITOR.dom.element.createFromHtml(m.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: f ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + f + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: e ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + e + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" })); k == CKEDITOR.ELEMENT_MODE_REPLACE ?
                    (d.hide(), b.insertAfter(d)) : d.append(b); a.container = b; a.ui.contentsElement = a.ui.space("contents"); f && a.ui.space("top").unselectable(); e && a.ui.space("bottom").unselectable(); d = a.config.width; k = a.config.height; d && b.setStyle("width", CKEDITOR.tools.cssLength(d)); k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k)); b.disableContextMenu(); CKEDITOR.env.webkit && b.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
            } CKEDITOR.replace = function (b, h) { return a(b, h, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
            CKEDITOR.appendTo = function (b, h, d) { return a(b, h, d, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) { var d = null, k = a[b]; if (k.name || k.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue } else if ("function" == typeof arguments[0] && (d = {}, !1 === arguments[0](k, d))) continue; this.replace(k, d) } } }; CKEDITOR.editor.prototype.addMode = function (a, b) {
                (this._.modes || (this._.modes =
                    {}))[a] = b
            }; CKEDITOR.editor.prototype.setMode = function (a, b) {
                var d = this, k = this._.modes; if (a != d.mode && k && k[a]) {
                    d.fire("beforeSetMode", a); if (d.mode) { var f = d.checkDirty(), k = d._.previousModeData, e, m = 0; d.fire("beforeModeUnload"); d.editable(0); d._.previousMode = d.mode; d._.previousModeData = e = d.getData(1); "source" == d.mode && k == e && (d.fire("lockSnapshot", { forceUpdate: !0 }), m = 1); d.ui.space("contents").setHtml(""); d.mode = "" } else d._.previousModeData = d.getData(1); this._.modes[a](function () {
                        d.mode = a; void 0 !== f && !f &&
                            d.resetDirty(); m ? d.fire("unlockSnapshot") : "wysiwyg" == a && d.fire("saveSnapshot"); setTimeout(function () { d.fire("mode"); b && b.call(d) }, 0)
                    })
                }
            }; CKEDITOR.editor.prototype.resize = function (a, b, d, k) {
                var f = this.container, e = this.ui.space("contents"), m = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; k = k ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : f; k.setSize("width", a, !0); m && (m.style.width = "1%"); var g = (k.$.offsetHeight || 0) - (e.$.clientHeight ||
                    0), f = Math.max(b - (d ? 0 : g), 0); b = d ? b + g : b; e.setStyle("height", f + "px"); m && (m.style.width = "100%"); this.fire("resize", { outerHeight: b, contentsHeight: f, outerWidth: a || k.getSize("width") })
            }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
        }(), CKEDITOR.config.startupMode = "wysiwyg", function () {
            function a(a) {
                var b = a.editor, e = a.data.path, g = e.blockLimit, f = a.data.selection,
                h = f.getRanges()[0], m; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (f = d(f, e)) f.appendBogus(), m = CKEDITOR.env.ie; k(b, e.block, g) && h.collapsed && !h.getCommonAncestor().isReadOnly() && (e = h.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), g = new CKEDITOR.dom.walker(e), g.guard = function (a) { return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !g.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) && (b = h.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller ||
                    (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), m = 1, a.cancel()); m && h.select()
            } function d(a, b) { if (a.isFake) return 0; var e = b.block || b.blockLimit, g = e && e.getLast(c); if (!(!e || !e.isBlockBoundary() || g && g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary() || e.is("pre") || e.getBogus())) return e } function b(a) { var b = a.data.getTarget(); b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault()) } function c(a) {
                return g(a) &&
                    n(a)
            } function h(a, b) { return function (c) { var e = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (e = e && e.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(e) : null) && (b.equals(e) || b.contains(e)) || a.call(this, c) } } function l(a) {
                function b(a) { return function (b, g) { g && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (e = b); if (!(g || !c(b) || a && q(b))) return !1 } } var e, g = a.getRanges()[0]; a = a.root; var f = { table: 1, ul: 1, ol: 1, dl: 1 }; if (g.startPath().contains(f)) {
                    var d = g.clone(); d.collapse(1); d.setStartAt(a,
                        CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(d); a.guard = b(); a.checkBackward(); if (e) return d = g.clone(), d.collapse(), d.setEndAt(e, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(d), a.guard = b(!0), e = !1, a.checkForward(), e
                } return null
            } function k(a, b, c) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable")) } function f(a) {
                return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ?
                    a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
            } function e(a) { var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") }, 0) } function m(a, b, c) { var e = a.getCommonAncestor(b); for (b = a = c ? b : a; (a = a.getParent()) && !e.equals(a) && 1 == a.getChildCount();)b = a; b.remove() } var g, n, p, q, r, w, u, v, t, B; CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element, $: function (a, b) { this.base(b.$ || b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup() }, proto: {
                    focus: function () {
                        var a;
                        if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try {
                            if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) { var b = this.$.scrollTop; this.$.focus(); this.$.scrollTop = b } else this.$.focus();
                            else this.$.setActive()
                        } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    }, on: function (a, b) { var c = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = h(b, this), c[0] = a, c[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, c) }, attachListener: function (a) {
                        !this._.listeners && (this._.listeners = []); var b = Array.prototype.slice.call(arguments,
                            1), b = a.on.apply(a, b); this._.listeners.push(b); return b
                    }, clearListeners: function () { var a = this._.listeners; try { for (; a.length;)a.pop().removeListener() } catch (b) { } }, restoreAttrs: function () { var a = this._.attrChanges, b, c; for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c)) }, attachClass: function (a) { var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a)) }, changeAttr: function (a, b) {
                        var c = this.getAttribute(a);
                        b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
                    }, insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), "text") }, transformPlainTextToHtml: function (a) { var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a, b) }, insertHtml: function (a, b, c) {
                        var g = this.editor; g.focus(); g.fire("saveSnapshot");
                        c || (c = g.getSelection().getRanges()[0]); w(this, b || "html", a, c); c.select(); e(this); this.editor.fire("afterInsertHtml", {})
                    }, insertHtmlIntoRange: function (a, b, c) { w(this, c || "html", a, b); this.editor.fire("afterInsertHtml", { intoRange: b }) }, insertElement: function (a, b) {
                        var g = this.editor; g.focus(); g.fire("saveSnapshot"); var f = g.activeEnterMode, g = g.getSelection(), d = a.getName(), d = CKEDITOR.dtd.$block[d]; b || (b = g.getRanges()[0]); this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), d && ((d =
                            a.getNext(function (a) { return c(a) && !q(a) })) && d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$block) ? d.getDtd()["#"] ? b.moveToElementEditStart(d) : b.moveToElementEditEnd(a) : d || f == CKEDITOR.ENTER_BR || (d = b.fixBlock(!0, f == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(d)))); g.selectRanges([b]); e(this)
                    }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                        var c = this.editor, e = c.config.enterMode, g = a.getName(), f = CKEDITOR.dtd.$block[g]; if (b.checkReadOnly()) return !1;
                        b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? u(b) : b.startContainer.is(CKEDITOR.dtd.$list) && v(b)); var d, h; if (f) for (; (d = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[d.getName()]) && (!h || !h[g]);)d.getName() in CKEDITOR.dtd.span ? b.splitElement(d) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(d), b.collapse(!0), d.remove()) : b.splitBlock(e == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable()); b.insertNode(a); return !0
                    }, setData: function (a,
                        b) { b || (a = this.editor.dataProcessor.toHtml(a)); this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady") }, getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () { this.removeClass("cke_editable"); this.status = "detached"; var a = this.editor; this._.detach(); delete a.document; delete a.window }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) },
                    fixInitialSelection: function () {
                        function a() { var b = c.getDocument().$, e = b.getSelection(), g; a: if (e.anchorNode && e.anchorNode == c.$) g = !0; else { if (CKEDITOR.env.webkit && (g = c.getDocument().getActive()) && g.equals(c) && !e.anchorNode) { g = !0; break a } g = void 0 } g && (g = new CKEDITOR.dom.range(c), g.moveToElementEditStart(c), b = b.createRange(), b.setStart(g.startContainer.$, g.startOffset), b.collapse(!0), e.removeAllRanges(), e.addRange(b)) } function b() {
                            var a = c.getDocument().$, e = a.selection, g = c.getDocument().getActive(); "None" ==
                                e.type && g.equals(c) && (e = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), e.moveToElementEditStart(c), e = e.startContainer, e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), a.moveToElementText(e.$), a.collapse(!0), a.select())
                        } var c = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(), a(); else this.once("focus", function () { a() }, null, null, -999)
                    }, getHtmlFromRange: function (a) {
                        if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
                        a = { doc: this.getDocument(), range: a.clone() }; t.eol.detect(a, this); t.bogus.exclude(a); t.cell.shrink(a); a.fragment = a.range.cloneContents(); t.tree.rebuild(a, this); t.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$)
                    }, extractHtmlFromRange: function (a, b) {
                        var c = B, e = { range: a, doc: a.document }, g = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(), g; a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.table.detectPurge(e); e.bookmark = a.createBookmark(); delete e.range; var f = this.editor.createRange();
                        f.moveToPosition(e.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); e.targetBookmark = f.createBookmark(); c.list.detectMerge(e, this); c.table.detectRanges(e, this); c.block.detectMerge(e, this); e.tableContentsRanges ? (c.table.deleteRanges(e), a.moveToBookmark(e.bookmark), e.range = a) : (a.moveToBookmark(e.bookmark), e.range = a, a.extractContents(c.detectExtractMerge(e))); a.moveToBookmark(e.targetBookmark); a.optimize(); c.fixUneditableRangePosition(a); c.list.merge(e, this); c.table.purge(e, this); c.block.merge(e, this);
                        if (b) { c = a.startPath(); if (e = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var e = c.block.getElementsByTag("span"), f = 0, d; if (e) for (; d = e.getItem(f++);)if (!n(d)) { e = !0; break a } e = !1 } e = !e } e && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), p(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings(); return g
                    }, setup: function () {
                        var a = this.editor; this.attachListener(a, "beforeGetData", function () {
                            var b =
                                this.getData(); this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(r, function (a, b) { return b })); a.setData(b, null, 1)
                        }, this); this.attachListener(a, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(a, "afterSetData", function () { this.setData(a.getData(1)) }, this); this.attachListener(a, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(a, "beforeFocus", function () { var b = a.getSelection(); (b = b && b.getNative()) && "Control" == b.type || this.focus() },
                            this); this.attachListener(a, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(a, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass("cke_editable"); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO ||
                                this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll", function () { a._.previousScrollTop = a.editable().$.scrollTop }, null, null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                                    var e = function () {
                                        var b = a.editable();
                                        null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", e))
                                    }; this.on("scroll", e)
                                } a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () { a.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr("tabindex", a.tabIndex); if (!this.is("textarea")) {
                                    a.document = this.getDocument(); a.window = this.getWindow(); var f = a.document; this.changeAttr("spellcheck",
                                        !a.config.disableNativeSpellChecker); var d = a.config.contentsLangDirection; this.getDirection(1) != d && this.changeAttr("dir", d); var h = CKEDITOR.getCss(); if (h) { var d = f.getHead(), k = d.getCustomData("stylesheet"); k ? h != k.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? k.$.styleSheet.cssText = h : k.setText(h)) : (h = f.appendStyleText(h), h = new CKEDITOR.dom.element(h.ownerNode || h.owningElement), d.setCustomData("stylesheet", h), h.data("cke-temp", 1)) } d = f.getCustomData("stylesheet_ref") || 0; f.setCustomData("stylesheet_ref",
                                            d + 1); this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var n = { 8: 1, 46: 1 }; this.attachListener(a, "key", function (b) {
                                                if (a.readOnly) return !0; var c = b.data.domEvent.getKey(), e; b = a.getSelection(); if (0 !== b.getRanges().length) {
                                                    if (c in n) {
                                                        var f, d = b.getRanges()[0], h = d.startPath(), m, k, p, c = 8 == c; CKEDITOR.env.ie &&
                                                            11 > CKEDITOR.env.version && (f = b.getSelectedElement()) || (f = l(b)) ? (a.fire("saveSnapshot"), d.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove(), d.select(), a.fire("saveSnapshot"), e = 1) : d.collapsed && ((m = h.block) && (p = m[c ? "getPrevious" : "getNext"](g)) && p.type == CKEDITOR.NODE_ELEMENT && p.is("table") && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), d[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && m.remove(), d["moveToElementEdit" + (c ? "End" : "Start")](p), d.select(), a.fire("saveSnapshot"),
                                                                e = 1) : h.blockLimit && h.blockLimit.is("td") && (k = h.blockLimit.getAscendant("table")) && d.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (p = k[c ? "getPrevious" : "getNext"](g)) ? (a.fire("saveSnapshot"), d["moveToElementEdit" + (c ? "End" : "Start")](p), d.checkStartOfBlock() && d.checkEndOfBlock() ? p.remove() : d.select(), a.fire("saveSnapshot"), e = 1) : (k = h.contains(["td", "th", "caption"])) && d.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (e = 1))
                                                    } return !e
                                                }
                                            }); a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller &&
                                                this.attachListener(this, "keyup", function (b) { b.data.getKeystroke() in n && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select()) }); this.attachListener(this, "dblclick", function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire("doubleclick", b) }); CKEDITOR.env.ie && this.attachListener(this, "click", b); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (b) {
                                                    var c = b.data.getTarget(); c.is("img", "hr",
                                                        "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
                                                }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) { (b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) { if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(r, ""))) { var c = a.createRange(); c.moveToElementEditStart(b); c.select(!0) } }); CKEDITOR.env.webkit &&
                                                    (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                                                        if (a.readOnly) return !0; var c = b.data.domEvent.getKey(); if (c in n && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                                            var c = 8 == c, e = b.getRanges()[0]; b = e.startPath(); if (e.collapsed) a: {
                                                                var g = b.block; if (g && e[c ? "checkStartOfBlock" :
                                                                    "checkEndOfBlock"]() && e.moveToClosestEditablePosition(g, !c) && e.collapsed) {
                                                                        if (e.startContainer.type == CKEDITOR.NODE_ELEMENT) { var f = e.startContainer.getChild(e.startOffset - (c ? 1 : 0)); if (f && f.type == CKEDITOR.NODE_ELEMENT && f.is("hr")) { a.fire("saveSnapshot"); f.remove(); b = !0; break a } } e = e.startPath().block; if (!e || e && e.contains(g)) b = void 0; else {
                                                                            a.fire("saveSnapshot"); var d; (d = (c ? e : g).getBogus()) && d.remove(); d = a.getSelection(); f = d.createBookmarks(); (c ? g : e).moveChildren(c ? e : g, !1); b.lastElement.mergeSiblings();
                                                                            m(g, e, !c); d.selectBookmarks(f); b = !0
                                                                        }
                                                                } else b = !1
                                                            } else c = e, d = b.block, e = c.endPath().block, d && e && !d.equals(e) ? (a.fire("saveSnapshot"), (g = d.getBogus()) && g.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), e.getParent() && (e.moveChildren(d, !1), b.lastElement.mergeSiblings(), m(d, e, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1; if (!b) return; a.getSelection().scrollIntoView(); a.fire("saveSnapshot");
                                                            return !1
                                                        }
                                                    }, this, null, 100)
                                }
                    }
                }, _: {
                    detach: function () {
                        this.editor.setData(this.editor.getData(), 0, 1); this.clearListeners(); this.restoreAttrs(); var a; if (a = this.removeCustomData("classes")) for (; a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) { a = this.getDocument(); var b = a.getHead(); if (b.getCustomData("stylesheet")) { var c = a.getCustomData("stylesheet_ref"); --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove()) } } this.editor.fire("contentDomUnload");
                        delete this.editor
                    }
                }
            }); CKEDITOR.editor.prototype.editable = function (a) { var b = this._.editable; if (b && a) return 0; arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null)); return b }; CKEDITOR.on("instanceLoaded", function (b) {
                var c = b.editor; c.on("insertElement", function (a) {
                    a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ?
                        "true" : "1"), a.setAttribute("contentEditable", !1))
                }); c.on("selectionChange", function (b) { if (!c.readOnly) { var e = c.getSelection(); e && !e.isLocked && (e = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !e && c.resetDirty()) } })
            }); CKEDITOR.on("instanceCreated", function (a) {
                var b = a.editor; b.on("mode", function () {
                    var a = b.editable(); if (a && a.isInline()) {
                        var c = b.title; a.changeAttr("role", "textbox"); a.changeAttr("aria-label", c); c && a.changeAttr("title", c); var e = b.fire("ariaEditorHelpLabel", {}).label;
                        if (e && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) { var g = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + e + "\x3c/span\x3e"); c.append(e); a.changeAttr("aria-describedby", g) }
                    }
                })
            }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"); g = CKEDITOR.dom.walker.whitespaces(!0); n = CKEDITOR.dom.walker.bookmark(!1, !0); p = CKEDITOR.dom.walker.empty();
            q = CKEDITOR.dom.walker.bogus(); r = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; w = function () {
                function a(b) { return b.type == CKEDITOR.NODE_ELEMENT } function b(c, e) {
                    var g, f, d, h, m = [], k = e.range.startContainer; g = e.range.startPath(); for (var k = l[k.getName()], n = 0, p = c.getChildren(), u = p.count(), t = -1, v = -1, z = 0, r = g.contains(l.$list); n < u; ++n)g = p.getItem(n), a(g) ? (d = g.getName(), r && d in CKEDITOR.dtd.$list ? m = m.concat(b(g, e)) : (h = !!k[d],
                        "br" != d || !g.data("cke-eol") || n && n != u - 1 || (z = (f = n ? m[n - 1].node : p.getItem(n + 1)) && (!a(f) || !f.is("br")), f = f && a(f) && l.$block[f.getName()]), -1 != t || h || (t = n), h || (v = n), m.push({ isElement: 1, isLineBreak: z, isBlock: g.isBlockBoundary(), hasBlockSibling: f, node: g, name: d, allowed: h }), f = z = 0)) : m.push({ isElement: 0, node: g, allowed: 1 }); -1 < t && (m[t].firstNotAllowed = 1); -1 < v && (m[v].lastNotAllowed = 1); return m
                } function e(b, c) {
                    var g = [], f = b.getChildren(), d = f.count(), h, m = 0, k = l[c], n = !b.is(l.$inline) || b.is("br"); for (n && g.push(" "); m < d; m++)h =
                        f.getItem(m), a(h) && !h.is(k) ? g = g.concat(e(h, c)) : g.push(h); n && g.push(" "); return g
                } function g(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function d(b) { return b && a(b) && (b.is(l.$removeEmpty) || b.is("a") && !b.isBlockBoundary()) } function h(b, c, e, g) {
                    var f = b.clone(), d, m; f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (d = (new CKEDITOR.dom.walker(f)).next()) && a(d) && n[d.getName()] && (m = d.getPrevious()) && a(m) && !m.getParent().equals(b.startContainer) && e.contains(m) && g.contains(d) && d.isIdentical(m) &&
                        (d.moveChildren(m), d.remove(), h(b, c, e, g))
                } function m(b, c) { function e(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 } var g = c.endContainer.getChild(c.endOffset), f = c.endContainer.getChild(c.endOffset - 1); g && e(g, b[b.length - 1]); f && e(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse()) } var l = CKEDITOR.dtd, n = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, p = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, u = CKEDITOR.tools.extend({},
                    l.$inline); delete u.br; return function (n, E, t, v) {
                        var r = n.editor, q = !1; "unfiltered_html" == E && (E = "html", q = !0); if (!v.checkReadOnly()) {
                            var B = (new CKEDITOR.dom.elementPath(v.startContainer, v.root)).blockLimit || v.root; n = { type: E, dontFilter: q, editable: n, editor: r, range: v, blockLimit: B, mergeCandidates: [], zombies: [] }; E = n.range; v = n.mergeCandidates; var w, I; "text" == n.type && E.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (w = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", E.document), E.insertNode(w),
                                E.setStartAfter(w)); q = new CKEDITOR.dom.elementPath(E.startContainer); n.endPath = B = new CKEDITOR.dom.elementPath(E.endContainer); if (!E.collapsed) { var r = B.block || B.blockLimit, da = E.getCommonAncestor(); r && !r.equals(da) && !r.contains(da) && E.checkEndOfBlock() && n.zombies.push(r); E.deleteContents() } for (; (I = g(E)) && a(I) && I.isBlockBoundary() && q.contains(I);)E.moveToPosition(I, CKEDITOR.POSITION_BEFORE_END); h(E, n.blockLimit, q, B); w && (E.setEndBefore(w), E.collapse(), w.remove()); w = E.startPath(); if (r = w.contains(d, !1,
                                    1)) E.splitElement(r), n.inlineStylesRoot = r, n.inlineStylesPeak = w.lastElement; w = E.createBookmark(); (r = w.startNode.getPrevious(c)) && a(r) && d(r) && v.push(r); (r = w.startNode.getNext(c)) && a(r) && d(r) && v.push(r); for (r = w.startNode; (r = r.getParent()) && d(r);)v.push(r); E.moveToBookmark(w); if (w = t) {
                                        w = n.range; if ("text" == n.type && n.inlineStylesRoot) { I = n.inlineStylesPeak; E = I.getDocument().createText("{cke-peak}"); for (v = n.inlineStylesRoot.getParent(); !I.equals(v);)E = E.appendTo(I.clone()), I = I.getParent(); t = E.getOuterHtml().split("{cke-peak}").join(t) } I =
                                            n.blockLimit.getName(); if (/^\s+|\s+$/.test(t) && "span" in CKEDITOR.dtd[I]) { var P = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; t = P + t + P } t = n.editor.dataProcessor.toHtml(t, { context: null, fixForBody: !1, protectedWhitespaces: !!P, dontFilter: n.dontFilter, filter: n.editor.activeFilter, enterMode: n.editor.activeEnterMode }); I = w.document.createElement("body"); I.setHtml(t); P && (I.getFirst().remove(), I.getLast().remove()); if ((P = w.startPath().block) && (1 != P.getChildCount() || !P.getBogus())) a: {
                                                var Q; if (1 ==
                                                    I.getChildCount() && a(Q = I.getFirst()) && Q.is(p) && !Q.hasAttribute("contenteditable")) { P = Q.getElementsByTag("*"); w = 0; for (v = P.count(); w < v; w++)if (E = P.getItem(w), !E.is(u)) break a; Q.moveChildren(Q.getParent(1)); Q.remove() }
                                            } n.dataWrapper = I; w = t
                                    } if (w) {
                                        Q = n.range; w = Q.document; var M; I = n.blockLimit; v = 0; var U, P = [], T, N; t = r = 0; var W, aa; E = Q.startContainer; var q = n.endPath.elements[0], ba, B = q.getPosition(E), da = !!q.getCommonAncestor(E) && B != CKEDITOR.POSITION_IDENTICAL && !(B & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                                        E = b(n.dataWrapper, n); for (m(E, Q); v < E.length; v++) {
                                            B = E[v]; if (M = B.isLineBreak) { M = Q; W = I; var Y = void 0, ca = void 0; B.hasBlockSibling ? M = 1 : (Y = M.startContainer.getAscendant(l.$block, 1)) && Y.is({ div: 1, p: 1 }) ? (ca = Y.getPosition(W), ca == CKEDITOR.POSITION_IDENTICAL || ca == CKEDITOR.POSITION_CONTAINS ? M = 0 : (W = M.splitElement(Y), M.moveToPosition(W, CKEDITOR.POSITION_AFTER_START), M = 1)) : M = 0 } if (M) t = 0 < v; else {
                                                M = Q.startPath(); !B.isBlock && k(n.editor, M.block, M.blockLimit) && (N = f(n.editor)) && (N = w.createElement(N), N.appendBogus(), Q.insertNode(N),
                                                    CKEDITOR.env.needsBrFiller && (U = N.getBogus()) && U.remove(), Q.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END)); if ((M = Q.startPath().block) && !M.equals(T)) { if (U = M.getBogus()) U.remove(), P.push(M); T = M } B.firstNotAllowed && (r = 1); if (r && B.isElement) {
                                                        M = Q.startContainer; for (W = null; M && !l[M.getName()][B.name];) { if (M.equals(I)) { M = null; break } W = M; M = M.getParent() } if (M) W && (aa = Q.splitElement(W), n.zombies.push(aa), n.zombies.push(W)); else {
                                                            W = I.getName(); ba = !v; M = v == E.length - 1; W = e(B.node, W); for (var Y = [], ca = W.length, ea = 0, ia = void 0,
                                                                ja = 0, fa = -1; ea < ca; ea++)ia = W[ea], " " == ia ? (ja || ba && !ea || (Y.push(new CKEDITOR.dom.text(" ")), fa = Y.length), ja = 1) : (Y.push(ia), ja = 0); M && fa == Y.length && Y.pop(); ba = Y
                                                        }
                                                    } if (ba) { for (; M = ba.pop();)Q.insertNode(M); ba = 0 } else Q.insertNode(B.node); B.lastNotAllowed && v < E.length - 1 && ((aa = da ? q : aa) && Q.setEndAt(aa, CKEDITOR.POSITION_AFTER_START), r = 0); Q.collapse()
                                            }
                                        } 1 != E.length ? U = !1 : (U = E[0], U = U.isElement && "false" == U.node.getAttribute("contenteditable")); U && (t = !0, M = E[0].node, Q.setStartAt(M, CKEDITOR.POSITION_BEFORE_START), Q.setEndAt(M,
                                            CKEDITOR.POSITION_AFTER_END)); n.dontMoveCaret = t; n.bogusNeededBlocks = P
                                    } U = n.range; var ga; aa = n.bogusNeededBlocks; for (ba = U.createBookmark(); T = n.zombies.pop();)T.getParent() && (N = U.clone(), N.moveToElementEditStart(T), N.removeEmptyBlocksAtEnd()); if (aa) for (; T = aa.pop();)CKEDITOR.env.needsBrFiller ? T.appendBogus() : T.append(U.document.createText(" ")); for (; T = n.mergeCandidates.pop();)T.mergeSiblings(); U.moveToBookmark(ba); if (!n.dontMoveCaret) {
                                        for (T = g(U); T && a(T) && !T.is(l.$empty);) {
                                            if (T.isBlockBoundary()) U.moveToPosition(T,
                                                CKEDITOR.POSITION_BEFORE_END); else { if (d(T) && T.getHtml().match(/(\s|&nbsp;)$/g)) { ga = null; break } ga = U.clone(); ga.moveToPosition(T, CKEDITOR.POSITION_BEFORE_END) } T = T.getLast(c)
                                        } ga && U.moveToRange(ga)
                                    }
                        }
                    }
            }(); u = function () {
                function a(b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b } function b(a, c, e) {
                    c = a.getDocument().createElement(c); a.append(c,
                        e); return c
                } function c(a) { var b = a.count(), e; for (b; 0 < b--;)e = a.getItem(b), CKEDITOR.tools.trim(e.getHtml()) || (e.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && e.getChildCount() && e.getFirst().remove()) } return function (e) {
                    var g = e.startContainer, f = g.getAscendant("table", 1), d = !1; c(f.getElementsByTag("td")); c(f.getElementsByTag("th")); f = e.clone(); f.setStart(g, 0); f = a(f).lastBackward(); f || (f = e.clone(), f.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), d = !0); f || (f = g); f.is("table") ? (e.setStartAt(f,
                        CKEDITOR.POSITION_BEFORE_START), e.collapse(!0), f.remove()) : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, "tr", d)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" : "td", d)), (g = f.getBogus()) && g.remove(), e.moveToPosition(f, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
                }
            }(); v = function () {
                function a(b) {
                    b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) {
                        return a.type ==
                            CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem)
                    }; return b
                } return function (b) { var c = b.startContainer, e = !1, g; g = b.clone(); g.setStart(c, 0); g = a(g).lastBackward(); g || (g = b.clone(), g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), e = !0); g || (g = c); g.is(CKEDITOR.dtd.$list) ? (b.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), g.remove()) : ((c = g.getBogus()) && c.remove(), b.moveToPosition(g, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select()) }
            }(); t = {
                eol: {
                    detect: function (a,
                        b) { var c = a.range, e = c.clone(), g = c.clone(), f = new CKEDITOR.dom.elementPath(c.startContainer, b), d = new CKEDITOR.dom.elementPath(c.endContainer, b); e.collapse(1); g.collapse(); f.block && e.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1); d.block && g.checkBoundaryOfElement(d.block, CKEDITOR.START) && (c.setEndBefore(d.block), a.appendEolBr = 1) }, fix: function (a, b) {
                            var c = b.getDocument(), e; a.appendEolBr && (e = this.createEolBr(c), a.fragment.append(e)); !a.prependEolBr || e && !e.getPrevious() ||
                                a.fragment.append(this.createEolBr(c), 1)
                        }, createEolBr: function (a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
                }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode; !b || !q(b) || c && c.equals(b) || a.range.setEndBefore(b) } }, tree: {
                    rebuild: function (a, b) {
                        var c = a.range, e = c.getCommonAncestor(), g = new CKEDITOR.dom.elementPath(e, b), f = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), d; e.type == CKEDITOR.NODE_TEXT && (e =
                            e.getParent()); if (g.blockLimit.is({ tr: 1, table: 1 })) { var h = g.contains("table").getParent(); d = function (a) { return !a.equals(h) } } else if (g.block && g.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) { var m = g.contains(CKEDITOR.dtd.$list).getParent(); d = function (a) { return !a.equals(m) } } d || (d = function (a) { return !a.equals(g.block) && !a.equals(g.blockLimit) }); this.rebuildFragment(a, b, e, d)
                    }, rebuildFragment: function (a, b, c, e) {
                        for (var g; c && !c.equals(b) &&
                            e(c);)g = c.clone(0, 1), a.fragment.appendTo(g), a.fragment = g, c = c.getParent()
                    }
                }, cell: { shrink: function (a) { a = a.range; var b = a.startContainer, c = a.endContainer, e = a.startOffset, g = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++e == g && a.shrink(CKEDITOR.SHRINK_TEXT) } }
            }; B = function () {
                function a(b, c) { var e = b.getParent(); if (e.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](e) } function b(c, e, g) { a(e); a(g, 1); for (var f; f = g.getNext();)f.insertAfter(e), e = f; p(c) && c.remove() } function c(a, b) {
                    var e =
                        new CKEDITOR.dom.range(a); e.setStartAfter(b.startNode); e.setEndBefore(b.endNode); return e
                } return {
                    list: {
                        detectMerge: function (a, b) {
                            var e = c(b, a.bookmark), g = e.startPath(), f = e.endPath(), d = g.contains(CKEDITOR.dtd.$list), h = f.contains(CKEDITOR.dtd.$list); a.mergeList = d && h && d.getParent().equals(h.getParent()) && !d.equals(h); a.mergeListItems = g.block && f.block && g.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) e = e.clone(), e.setStartBefore(a.bookmark.startNode),
                                e.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = e.createBookmark()
                        }, merge: function (a, c) {
                            if (a.mergeListBookmark) {
                                var e = a.mergeListBookmark.startNode, g = a.mergeListBookmark.endNode, f = new CKEDITOR.dom.elementPath(e, c), d = new CKEDITOR.dom.elementPath(g, c); if (a.mergeList) { var h = f.contains(CKEDITOR.dtd.$list), m = d.contains(CKEDITOR.dtd.$list); h.equals(m) || (m.moveChildren(h), m.remove()) } a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), d = d.contains(CKEDITOR.dtd.$listItem), f.equals(d) || b(d, e, g));
                                e.remove(); g.remove()
                            }
                        }
                    }, block: {
                        detectMerge: function (a, b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode); c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark() } }, merge: function (a, c) {
                            if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                                var e = a.mergeBlockBookmark.startNode, g = a.mergeBlockBookmark.endNode, f = new CKEDITOR.dom.elementPath(e, c), d = new CKEDITOR.dom.elementPath(g, c), f = f.block, d = d.block; f && d && !f.equals(d) &&
                                    b(d, e, g); e.remove(); g.remove()
                            }
                        }
                    }, table: function () {
                        function a(c) {
                            var g = [], f, d = new CKEDITOR.dom.walker(c), h = c.startPath().contains(e), m = c.endPath().contains(e), k = {}; d.guard = function (a, d) {
                                if (a.type == CKEDITOR.NODE_ELEMENT) { var n = "visited_" + (d ? "out" : "in"); if (a.getCustomData(n)) return; CKEDITOR.dom.element.setMarker(k, a, n, 1) } if (d && h && a.equals(h)) f = c.clone(), f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), g.push(f); else if (!d && m && a.equals(m)) f = c.clone(), f.setStartAt(m, CKEDITOR.POSITION_AFTER_START), g.push(f);
                                else { if (n = !d) n = a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && (!h || b(a, h)) && (!m || b(a, m)); if (!n && (n = d)) if (a.is(e)) var n = h && h.getAscendant("table", !0), l = m && m.getAscendant("table", !0), p = a.getAscendant("table", !0), n = n && n.contains(p) || l && l.contains(p); else n = void 0; n && (f = c.clone(), f.selectNodeContents(a), g.push(f)) }
                            }; d.lastForward(); CKEDITOR.dom.element.clearAllMarkers(k); return g
                        } function b(a, c) {
                            var e = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED, g = a.getPosition(c); return g === CKEDITOR.POSITION_IDENTICAL ?
                                !1 : 0 === (g & e)
                        } var e = { td: 1, th: 1, caption: 1 }; return {
                            detectPurge: function (a) {
                                var b = a.range, c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c), g = 0; c.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && ++g }; c.checkForward(); if (1 < g) {
                                    var c = b.startPath().contains("table"), f = b.endPath().contains("table"); c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark =
                                        b.createBookmark())
                                }
                            }, detectRanges: function (g, f) {
                                var d = c(f, g.bookmark), h = d.clone(), m, k, n = d.getCommonAncestor(); n.is(CKEDITOR.dtd.$tableContent) && !n.is(e) && (n = n.getAscendant("table", !0)); k = n; n = new CKEDITOR.dom.elementPath(d.startContainer, k); k = new CKEDITOR.dom.elementPath(d.endContainer, k); n = n.contains("table"); k = k.contains("table"); if (n || k) n && k && b(n, k) ? (g.tableSurroundingRange = h, h.setStartAt(n, CKEDITOR.POSITION_AFTER_END), h.setEndAt(k, CKEDITOR.POSITION_BEFORE_START), h = d.clone(), h.setEndAt(n, CKEDITOR.POSITION_AFTER_END),
                                    m = d.clone(), m.setStartAt(k, CKEDITOR.POSITION_BEFORE_START), m = a(h).concat(a(m))) : n ? k || (g.tableSurroundingRange = h, h.setStartAt(n, CKEDITOR.POSITION_AFTER_END), d.setEndAt(n, CKEDITOR.POSITION_AFTER_END)) : (g.tableSurroundingRange = h, h.setEndAt(k, CKEDITOR.POSITION_BEFORE_START), d.setStartAt(k, CKEDITOR.POSITION_AFTER_START)), g.tableContentsRanges = m ? m : a(d)
                            }, deleteRanges: function (a) {
                                for (var b; b = a.tableContentsRanges.pop();)b.extractContents(), p(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange &&
                                    a.tableSurroundingRange.extractContents()
                            }, purge: function (a) { if (a.purgeTableBookmark) { var b = a.doc, c = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark); c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START) } }
                        }
                    }(), detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) }, fixUneditableRangePosition: function (a) {
                        a.startContainer.getDtd()["#"] ||
                        a.moveToClosestEditablePosition(null, !0)
                    }, autoParagraph: function (a, b) { var c = b.startPath(), e; k(a, c.block, c.blockLimit) && (e = f(a)) && (e = b.document.createElement(e), e.appendBogus(), b.insertNode(e), b.moveToPosition(e, CKEDITOR.POSITION_AFTER_START)) }
                }
            }()
        }(), function () {
            function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function d(b, c) {
                if (0 === b.length || a(b[0].getEnclosedNode())) return !1; var e, g; if ((e = !c && 1 === b.length) && !(e = b[0].collapsed)) {
                    var f = b[0]; e = f.startContainer.getAscendant({
                        td: 1,
                        th: 1
                    }, !0); var d = f.endContainer.getAscendant({ td: 1, th: 1 }, !0); g = CKEDITOR.tools.trim; e && e.equals(d) && !e.findOne("td, th, tr, tbody, table") ? (f = f.cloneContents(), e = f.getFirst() ? g(f.getFirst().getText()) !== g(e.getText()) : !0) : e = !1
                } if (e) return !1; for (g = 0; g < b.length; g++)if (e = b[g]._getTableElement(), !e) return !1; return !0
            } function b(a) {
                function b(a) { a = a.find("td, th"); var c = [], e; for (e = 0; e < a.count(); e++)c.push(a.getItem(e)); return c } var c = [], e, g; for (g = 0; g < a.length; g++)e = a[g]._getTableElement(), e.is && e.is({
                    td: 1,
                    th: 1
                }) ? c.push(e) : c = c.concat(b(e)); return c
            } function c(a) { a = b(a); var c = "", e = [], g, f; for (f = 0; f < a.length; f++)g && !g.equals(a[f].getAscendant("tr")) ? (c += e.join("\t") + "\n", g = a[f].getAscendant("tr"), e = []) : 0 === f && (g = a[f].getAscendant("tr")), e.push(a[f].getText()); return c += e.join("\t") } function h(a) {
                var b = this.root.editor, e = b.getSelection(1); this.reset(); x = !0; e.root.once("selectionchange", function (a) { a.cancel() }, null, null, 0); e.selectRanges([a[0]]); e = this._.cache; e.ranges = new CKEDITOR.dom.rangeList(a); e.type =
                    CKEDITOR.SELECTION_TEXT; e.selectedElement = a[0]._getTableElement(); e.selectedText = c(a); e.nativeSel = null; this.isFake = 1; this.rev = v++; b._.fakeSelection = this; x = !1; this.root.fire("selectionchange")
            } function l() {
                var b = this._.fakeSelection, c; if (b) {
                    c = this.getSelection(1); var e; if (!(e = !c) && (e = !c.isHidden())) {
                        e = b; var g = c.getRanges(), f = e.getRanges(), h = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0), m = f.length && f[0]._getTableElement() && f[0]._getTableElement().getAscendant("table",
                            !0), k = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"), n = 1 === f.length && f[0]._getTableElement() && f[0]._getTableElement().is("table"); if (a(e.getSelectedElement())) e = !1; else { var l = 1 === g.length && g[0].collapsed, f = d(g, !!CKEDITOR.env.webkit) && d(f); h = h && m ? h.equals(m) || m.contains(h) : !1; h && (l || f) ? (k && !n && e.selectRanges(g), e = !0) : e = !1 } e = !e
                    } e && (b.reset(), b = 0)
                } if (!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return; this.fire("selectionCheck", b); c = this.elementPath();
                c.compare(this._.selectionPreviousPath) || (e = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), CKEDITOR.env.webkit && !e && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", { selection: b, path: c }))
            } function k() { C = !0; y || (f.call(this), y = CKEDITOR.tools.setTimeout(f, 200, this)) } function f() { y = null; C && (CKEDITOR.tools.setTimeout(l, 0, this), C = !1) } function e(a) {
                return z(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ?
                    !0 : !1
            } function m(a) { function b(c, e) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (e ? "End" : "Start")](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; var c = a.startContainer, g = a.getPreviousNode(e, null, c), f = a.getNextNode(e, null, c); return b(g) || b(f, 1) || !(g || f || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1 } function g(a) { n(a, !1); var b = a.getDocument().createText(t); a.setCustomData("cke-fillingChar", b); return b } function n(a, b) {
                var c = a && a.removeCustomData("cke-fillingChar");
                if (c) {
                    if (!1 !== b) { var e = a.getDocument().getSelection().getNative(), g = e && "None" != e.type && e.getRangeAt(0), f = t.length; if (c.getLength() > f && g && g.intersectsNode(c.$)) { var d = [{ node: e.anchorNode, offset: e.anchorOffset }, { node: e.focusNode, offset: e.focusOffset }]; e.anchorNode == c.$ && e.anchorOffset > f && (d[0].offset -= f); e.focusNode == c.$ && e.focusOffset > f && (d[1].offset -= f) } } c.setText(p(c.getText(), 1)); d && (c = a.getDocument().$, e = c.getSelection(), c = c.createRange(), c.setStart(d[0].node, d[0].offset), c.collapse(!0), e.removeAllRanges(),
                        e.addRange(c), e.extend(d[1].node, d[1].offset))
                }
            } function p(a, b) { return b ? a.replace(B, function (a, b) { return b ? " " : "" }) : a.replace(t, "") } function q(a, b) {
                var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(c); var e = a.getSelection(1), g = a.createRange(), f = e.root.on("selectionchange",
                    function (a) { a.cancel() }, null, null, 0); g.setStartAt(c, CKEDITOR.POSITION_AFTER_START); g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e.selectRanges([g]); f.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = c
            } function r(a) {
                var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) {
                    var e = c.data.getKeystroke(); if (b[e]) {
                        var g = a.getSelection().getRanges(), f = g[0]; 1 == g.length && f.collapsed && (e = f[38 > e ? "getPreviousEditableNode" : "getNextEditableNode"]()) && e.type == CKEDITOR.NODE_ELEMENT && "false" == e.getAttribute("contenteditable") &&
                            (a.getSelection().fake(e), c.data.preventDefault(), c.cancel())
                    }
                }
            } function w(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
                        if (c.startContainer.isReadOnly()) for (var e = c.startContainer, g; e && !((g = e.type == CKEDITOR.NODE_ELEMENT) && e.is("body") || !e.isReadOnly());)g && "false" == e.getAttribute("contentEditable") && c.setStartAfter(e), e = e.getParent(); e = c.startContainer; g = c.endContainer; var f = c.startOffset, d = c.endOffset, h = c.clone(); e && e.type == CKEDITOR.NODE_TEXT &&
                            (f >= e.getLength() ? h.setStartAfter(e) : h.setStartBefore(e)); g && g.type == CKEDITOR.NODE_TEXT && (d ? h.setEndAfter(g) : h.setEndBefore(g)); e = new CKEDITOR.dom.walker(h); e.evaluator = function (e) { if (e.type == CKEDITOR.NODE_ELEMENT && e.isReadOnly()) { var g = c.clone(); c.setEndBefore(e); c.collapsed && a.splice(b--, 1); e.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS || (g.setStartAfter(e), g.collapsed || a.splice(b + 1, 0, g)); return !0 } return !1 }; e.next()
                    }
                } return a
            } var u = "function" != typeof window.getSelection, v = 1, t = CKEDITOR.tools.repeat("​",
                7), B = new RegExp(t + "( )?", "g"), x, y, C, z = CKEDITOR.dom.walker.invisible(1), A = function () {
                    function a(b) { return function (a) { var c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]); return !1 } } function b(a) {
                        return function (b) {
                            var c = b.editor, e = c.createRange(), g; (g = e.moveToClosestEditablePosition(b.selected, a)) || (g = e.moveToClosestEditablePosition(b.selected, !a)); g && c.getSelection().selectRanges([e]); c.fire("saveSnapshot"); b.selected.remove(); g || (e.moveToElementEditablePosition(c.editable()),
                                c.getSelection().selectRanges([e])); c.fire("saveSnapshot"); return !1
                        }
                    } var c = a(), e = a(1); return { 37: c, 38: c, 39: e, 40: e, 8: b(), 46: b(1) }
                }(); CKEDITOR.on("instanceCreated", function (a) {
                    function b() { var a = c.getSelection(); a && a.removeAllRanges() } var c = a.editor; c.on("contentDom", function () {
                        function a() { v = new CKEDITOR.dom.selection(c.getSelection()); v.lock() } function b() {
                            f.removeListener("mouseup", b); m.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, c = a.createRange(); "None" != a.type && c.parentElement() &&
                                c.parentElement().ownerDocument == g.$ && c.select()
                        } function e(a) { if (CKEDITOR.env.ie) { var b = (a = a.getRanges()[0]) ? a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && ("false" == a.getAttribute("contenteditable") || "true" == a.getAttribute("contenteditable")) }, !0) : null; return a && "false" == b.getAttribute("contenteditable") && b } } var g = c.document, f = CKEDITOR.document, d = c.editable(), h = g.getBody(), m = g.getDocumentElement(), p = d.isInline(), t, v; CKEDITOR.env.gecko && d.attachListener(d, "focus",
                            function (a) { a.removeListener(); 0 !== t && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == d.$ && (a = c.createRange(), a.moveToElementEditStart(d), a.select()) }, null, null, -2); d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () { t && CKEDITOR.env.webkit && (t = c._.previousActive && c._.previousActive.equals(g.getActive())) && null != c._.previousScrollTop && c._.previousScrollTop != d.$.scrollTop && (d.$.scrollTop = c._.previousScrollTop); c.unlockSelection(t); t = 0 }, null, null, -1); d.attachListener(d,
                                "mousedown", function () { t = 0 }); if (CKEDITOR.env.ie || p) u ? d.attachListener(d, "beforedeactivate", a, null, null, -1) : d.attachListener(c, "selectionCheck", a, null, null, -1), d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function () { c.lockSelection(v); t = 1 }, null, null, -1), d.attachListener(d, "mousedown", function () { t = 0 }); if (CKEDITOR.env.ie && !p) {
                                    var q; d.attachListener(d, "mousedown", function (a) { 2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (q = c.window.getScrollPosition())) });
                                    d.attachListener(d, "mouseup", function (a) { 2 == a.data.$.button && q && (c.document.$.documentElement.scrollLeft = q.x, c.document.$.documentElement.scrollTop = q.y); q = null }); if ("BackCompat" != g.$.compatMode) {
                                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                                            var B, x; m.on("mousedown", function (a) {
                                                function b(a) { a = a.data.$; if (B) { var c = h.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (e) { } B.setEndPoint(0 > x.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c); B.select() } } function c() {
                                                    m.removeListener("mousemove",
                                                        b); f.removeListener("mouseup", c); m.removeListener("mouseup", c); B.select()
                                                } a = a.data; if (a.getTarget().is("html") && a.$.y < m.$.clientHeight && a.$.x < m.$.clientWidth) { B = h.$.createTextRange(); try { B.moveToPoint(a.$.clientX, a.$.clientY) } catch (e) { } x = B.duplicate(); m.on("mousemove", b); f.on("mouseup", c); m.on("mouseup", c) }
                                            })
                                        } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) m.on("mousedown", function (a) { a.data.getTarget().is("html") && (f.on("mouseup", b), m.on("mouseup", b)) })
                                    }
                                } d.attachListener(d, "selectionchange", l,
                                    c); d.attachListener(d, "keyup", k, c); d.attachListener(d, "keydown", function (a) { var b = this.getSelection(1); e(b) && (b.selectElement(e(b)), a.data.preventDefault()) }, c); d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (p && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { var y; d.attachListener(d, "mousedown", function () { y = 1 }); d.attachListener(g.getDocumentElement(), "mouseup", function () { y && k.call(c); y = 0 }) } else d.attachListener(CKEDITOR.env.ie ?
                                        d : g.getDocumentElement(), "mouseup", k, c); CKEDITOR.env.webkit && d.attachListener(g, "keydown", function (a) { switch (a.data.getKey()) { case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: d.hasFocus && n(d) } }, null, null, -1); d.attachListener(d, "keydown", r(c), null, null, -1)
                    }); c.on("setData", function () { c.unlockSelection(); CKEDITOR.env.webkit && b() }); c.on("contentDomUnload", function () { c.unlockSelection() }); if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9); c.on("dataReady", function () {
                        delete c._.fakeSelection;
                        delete c._.hiddenSelectionContainer; c.selectionChange(1)
                    }); c.on("loadSnapshot", function () { var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = c.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove()) }, null, null, 100); c.on("key", function (a) {
                        if ("wysiwyg" == c.mode) {
                            var b = c.getSelection(); if (b.isFake) {
                                var e = A[a.data.keyCode]; if (e) return e({
                                    editor: c, selected: b.getSelectedElement(),
                                    selection: b, keyEvent: a
                                })
                            }
                        }
                    })
                }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
                    var b = a.editor; b.on("selectionChange", function () { var a = b.editable(), c = a.getCustomData("cke-fillingChar"); c && (c.getCustomData("ready") ? (n(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1)) }, null, null, -1); b.on("beforeSetMode", function () { n(b.editable()) }, null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = p(a.data)) }, b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = p(a.data.dataValue) },
                        null, null, 0)
                }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? l : k).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) { return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection =
                    function (a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }; CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE =
                        1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
                            if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var c = a instanceof CKEDITOR.dom.element; this.rev = b ? b.rev : v++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var e, g; if (a) if (a.getRangeAt) e =
                                (g = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer); else { try { g = a.createRange() } catch (f) { } e = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement()) } if (!e || e.type != CKEDITOR.NODE_ELEMENT && e.type != CKEDITOR.NODE_TEXT || !this.root.equals(e) && !this.root.contains(e)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
                        }; var G =
                            { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, { _removeFillingCharSequenceString: p, _createFillingCharSequenceNode: g, FILLING_CHAR_SEQUENCE: t }); CKEDITOR.dom.selection.prototype = {
                                getNative: function () { return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = u ? this.document.$.selection : this.document.getWindow().$.getSelection() }, getType: u ?
                                    function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try { var c = this.getNative(), e = c.type; "Text" == e && (b = CKEDITOR.SELECTION_TEXT); "Control" == e && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT) } catch (g) { } return a.type = b } : function () {
                                        var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) {
                                            var c = c.getRangeAt(0), e = c.startContainer;
                                            e == c.endContainer && 1 == e.nodeType && 1 == c.endOffset - c.startOffset && G[e.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
                                        } return a.type = b
                                    }, getRanges: function () {
                                        var a = u ? function () {
                                            function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() } var b = function (b, c) {
                                                b = b.duplicate(); b.collapse(c); var e = b.parentElement(); if (!e.hasChildNodes()) return { container: e, offset: 0 }; for (var g = e.children, f, d, h = b.duplicate(), m = 0, k = g.length - 1, n = -1, l, p; m <= k;)if (n = Math.floor((m + k) / 2), f = g[n], h.moveToElementText(f),
                                                    l = h.compareEndPoints("StartToStart", b), 0 < l) k = n - 1; else if (0 > l) m = n + 1; else return { container: e, offset: a(f) }; if (-1 == n || n == g.length - 1 && 0 > l) { h.moveToElementText(e); h.setEndPoint("StartToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; g = e.childNodes; if (!h) return f = g[g.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: e, offset: g.length } : { container: f, offset: f.nodeValue.length }; for (e = g.length; 0 < h && 0 < e;)d = g[--e], d.nodeType == CKEDITOR.NODE_TEXT && (p = d, h -= d.nodeValue.length); return { container: p, offset: -h } } h.collapse(0 <
                                                        l ? !0 : !1); h.setEndPoint(0 < l ? "StartToStart" : "EndToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; if (!h) return { container: e, offset: a(f) + (0 < l ? 0 : 1) }; for (; 0 < h;)try { d = f[0 < l ? "previousSibling" : "nextSibling"], d.nodeType == CKEDITOR.NODE_TEXT && (h -= d.nodeValue.length, p = d), f = d } catch (u) { return { container: e, offset: a(f) } } return { container: p, offset: 0 < l ? -h : p.nodeValue.length + h }
                                            }; return function () {
                                                var a = this.getNative(), c = a && a.createRange(), e = this.getType(); if (!a) return []; if (e == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root),
                                                    e = b(c, !0), a.setStart(new CKEDITOR.dom.node(e.container), e.offset), e = b(c), a.setEnd(new CKEDITOR.dom.node(e.container), e.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a]; if (e == CKEDITOR.SELECTION_ELEMENT) {
                                                        for (var e = [], g = 0; g < c.length; g++) {
                                                            for (var f = c.item(g), d = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < d.childNodes.length && d.childNodes[h] != f; h++); a.setStart(new CKEDITOR.dom.node(d), h); a.setEnd(new CKEDITOR.dom.node(d),
                                                                h + 1); e.push(a)
                                                        } return e
                                                    } return []
                                            }
                                        }() : function () { var a = [], b, c = this.getNative(); if (!c) return a; for (var e = 0; e < c.rangeCount; e++) { var g = c.getRangeAt(e); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(g.startContainer), g.startOffset); b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset); a.push(b) } return a }; return function (b) { var c = this._.cache, e = c.ranges; e || (c.ranges = e = new CKEDITOR.dom.rangeList(a.call(this))); return b ? w(new CKEDITOR.dom.rangeList(e.slice())) : e }
                                    }(), getStartElement: function () {
                                        var a =
                                            this._.cache; if (void 0 !== a.startElement) return a.startElement; var b; switch (this.getType()) {
                                                case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0]; if (c) {
                                                    if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                                                        for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                                                        if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer
                                                    } b = b.$
                                                }
                                            }return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                                    }, getSelectedElement: function () {
                                        var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement; var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () {
                                            for (var a = b.getRanges()[0].clone(), c, e, g = 2; g && !((c = a.getEnclosedNode()) &&
                                                c.type == CKEDITOR.NODE_ELEMENT && G[c.getName()] && (e = c)); g--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return e && e.$
                                        }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                                    }, getSelectedText: function () { var a = this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = u ? "Control" == b.type ? "" : b.createRange().text : b.toString(); return a.selectedText = b }, lock: function () {
                                        this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null;
                                        this.isLocked = 1
                                    }, unlock: function (a) { if (this.isLocked) { if (a) var b = this.getSelectedElement(), c = this.getRanges(), e = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d(c) ? h.call(this, c) : e ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c)) } }, reset: function () {
                                        this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) {
                                            delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) {
                                                var c =
                                                    a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !c && a.resetDirty()
                                            } delete a._.hiddenSelectionContainer
                                        } else CKEDITOR.warn("selection-fake-reset"); this.rev = v++
                                    }, selectElement: function (a) { var b = new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b]) }, selectRanges: function (a) {
                                        var b = this.root.editor, c = b && b._.hiddenSelectionContainer; this.reset(); if (c) for (var c = this.root, e, f = 0; f < a.length; ++f)e = a[f], e.endContainer.equals(c) && (e.endOffset = Math.min(e.endOffset,
                                            c.getChildCount())); if (a.length) if (this.isLocked) { var k = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); k && !k.equals(this.root) && k.focus() } else {
                                                var l; a: { var p, t; if (1 == a.length && !(t = a[0]).collapsed && (l = t.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (t = t.clone(), t.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (p = t.getEnclosedNode()) && p.type == CKEDITOR.NODE_ELEMENT && (l = p), "false" == l.getAttribute("contenteditable"))) break a; l = void 0 } if (l) this.fake(l); else if (b && b.plugins.tableselection &&
                                                    CKEDITOR.plugins.tableselection.isSupportedEnvironment && d(a) && !x) h.call(this, a); else {
                                                        if (u) {
                                                            p = CKEDITOR.dom.walker.whitespaces(!0); l = /\ufeff|\u00a0/; t = { table: 1, tbody: 1, tr: 1 }; 1 < a.length && (b = a[a.length - 1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var v, r, q; if ((c = b.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in G && (!c.is("a") || !c.getText())) try { q = c.$.createControlRange(); q.addElement(c.$); q.select(); return } catch (B) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT &&
                                                                b.startContainer.getName() in t || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in t) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; q = b.createBookmark(); t = q.startNode; a || (k = q.endNode); q = b.document.$.body.createTextRange(); q.moveToElementText(t.$); q.moveStart("character", 1); k ? (l = b.document.$.body.createTextRange(), l.moveToElementText(k.$), q.setEndPoint("EndToEnd", l), q.moveEnd("character", -1)) : (v = t.getNext(p), r = t.hasAscendant("pre"), v = !(v && v.getText && v.getText().match(l)) && (r ||
                                                                    !t.hasPrevious() || t.getPrevious().is && t.getPrevious().is("br")), r = b.document.createElement("span"), r.setHtml("\x26#65279;"), r.insertBefore(t), v && b.document.createText("﻿").insertBefore(t)); b.setStartBefore(t); t.remove(); a ? (v ? (q.moveStart("character", -1), q.select(), b.document.$.selection.clear()) : q.select(), b.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START), r.remove()) : (b.setEndBefore(k), k.remove(), q.select())
                                                        } else {
                                                            k = this.getNative(); if (!k) return; this.removeAllRanges(); for (q = 0; q < a.length; q++) {
                                                                if (q <
                                                                    a.length - 1 && (v = a[q], r = a[q + 1], l = v.clone(), l.setStart(v.endContainer, v.endOffset), l.setEnd(r.startContainer, r.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), b = l.getCommonAncestor(), l = l.getEnclosedNode(), b.isReadOnly() || l && l.isReadOnly()))) { r.setStart(v.startContainer, v.startOffset); a.splice(q--, 1); continue } b = a[q]; r = this.document.$.createRange(); b.collapsed && CKEDITOR.env.webkit && m(b) && (l = g(this.root), b.insertNode(l), (v = l.getNext()) && !l.getPrevious() && v.type == CKEDITOR.NODE_ELEMENT && "br" ==
                                                                        v.getName() ? (n(this.root), b.moveToPosition(v, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(l, CKEDITOR.POSITION_AFTER_END)); r.setStart(b.startContainer.$, b.startOffset); try { r.setEnd(b.endContainer.$, b.endOffset) } catch (y) { if (0 <= y.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), r.setEnd(b.endContainer.$, b.endOffset); else throw y; } k.addRange(r)
                                                            }
                                                        } this.reset(); this.root.fire("selectionchange")
                                                }
                                            }
                                    }, fake: function (a, b) {
                                        var c = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
                                        this.reset(); q(c, b); var e = this._.cache, g = new CKEDITOR.dom.range(this.root); g.setStartBefore(a); g.setEndAfter(a); e.ranges = new CKEDITOR.dom.rangeList(g); e.selectedElement = e.startElement = a; e.type = CKEDITOR.SELECTION_ELEMENT; e.selectedText = e.nativeSel = null; this.isFake = 1; this.rev = v++; c._.fakeSelection = this; this.root.fire("selectionchange")
                                    }, isHidden: function () { var a = this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) }, isInTable: function (a) {
                                        return d(this.getRanges(),
                                            a)
                                    }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) { a = this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a }, createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a }, selectBookmarks: function (a) {
                                        for (var b = [], c, e = 0; e < a.length; e++) { var g = new CKEDITOR.dom.range(this.root); g.moveToBookmark(a[e]); b.push(g) } a.isFake && (c = d(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type ==
                                            CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !d(b) ? this.fake(c) : this.selectRanges(b); return this
                                    }, getCommonAncestor: function () { var a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null }, scrollIntoView: function () { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[u ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
                            }
        }(),
        "use strict", CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function () {
            function a(a, b) { for (var c, e; (a = a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) c = a; else if (!e) { var g = a.getAttribute("contentEditable"); "false" == g ? c = a : "true" == g && (e = 1) } return c } function d(a, b, c, e) { return (a.getPosition(b) | e) == e && (!c.childRule || c.childRule(a)) } function b(c) {
                var e = c.document; if (c.collapsed) e = v(this, e), c.insertNode(e), c.moveToPosition(e, CKEDITOR.POSITION_BEFORE_END); else {
                    var g =
                        this.element, f = this._.definition, m, k = f.ignoreReadonly, n = k || f.includeReadonly; null == n && (n = c.root.getCustomData("cke_includeReadonly")); var l = CKEDITOR.dtd[g]; l || (m = !0, l = CKEDITOR.dtd.span); c.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.trim(); var p = c.createBookmark(), u = p.startNode, t = p.endNode, q = u, B; if (!k) { var x = c.getCommonAncestor(), k = a(u, x), x = a(t, x); k && (q = k.getNextSourceNode(!0)); x && (t = x) } for (q.getPosition(t) == CKEDITOR.POSITION_FOLLOWING && (q = 0); q;) {
                            k = !1; if (q.equals(t)) q = null, k = !0; else {
                                var y = q.type == CKEDITOR.NODE_ELEMENT ?
                                    q.getName() : null, x = y && "false" == q.getAttribute("contentEditable"), w = y && q.getAttribute("data-nostyle"); if (y && q.data("cke-bookmark")) { q = q.getNextSourceNode(!0); continue } if (x && n && CKEDITOR.dtd.$block[y]) for (var z = q, A = h(z), C = void 0, G = A.length, ea = 0, z = G && new CKEDITOR.dom.range(z.getDocument()); ea < G; ++ea) { var C = A[ea], D = CKEDITOR.filter.instances[C.data("cke-filter")]; if (D ? D.check(this) : 1) z.selectNodeContents(C), b.call(this, z) } A = y ? !l[y] || w ? 0 : x && !n ? 0 : d(q, t, f, J) : 1; if (A) if (C = q.getParent(), A = f, G = g, ea = m, !C || !(C.getDtd() ||
                                        CKEDITOR.dtd.span)[G] && !ea || A.parentRule && !A.parentRule(C)) k = !0; else { if (B || y && CKEDITOR.dtd.$removeEmpty[y] && (q.getPosition(t) | J) != J || (B = c.clone(), B.setStartBefore(q)), y = q.type, y == CKEDITOR.NODE_TEXT || x || y == CKEDITOR.NODE_ELEMENT && !q.getChildCount()) { for (var y = q, F; (k = !y.getNext(I)) && (F = y.getParent(), l[F.getName()]) && d(F, u, f, K);)y = F; B.setEndAfter(y) } } else k = !0; q = q.getNextSourceNode(w || x)
                            } if (k && B && !B.collapsed) {
                                for (var k = v(this, e), x = k.hasAttributes(), w = B.getCommonAncestor(), y = {}, A = {}, C = {}, G = {}, fa, H, ha; k &&
                                    w;) { if (w.getName() == g) { for (fa in f.attributes) !G[fa] && (ha = w.getAttribute(H)) && (k.getAttribute(fa) == ha ? A[fa] = 1 : G[fa] = 1); for (H in f.styles) !C[H] && (ha = w.getStyle(H)) && (k.getStyle(H) == ha ? y[H] = 1 : C[H] = 1) } w = w.getParent() } for (fa in A) k.removeAttribute(fa); for (H in y) k.removeStyle(H); x && !k.hasAttributes() && (k = null); k ? (B.extractContents().appendTo(k), B.insertNode(k), r.call(this, k), k.mergeSiblings(), CKEDITOR.env.ie || k.$.normalize()) : (k = new CKEDITOR.dom.element("span"), B.extractContents().appendTo(k), B.insertNode(k),
                                        r.call(this, k), k.remove(!0)); B = null
                            }
                        } c.moveToBookmark(p); c.shrink(CKEDITOR.SHRINK_TEXT); c.shrink(CKEDITOR.NODE_ELEMENT, !0)
                }
            } function c(a) {
                function b() {
                    for (var a = new CKEDITOR.dom.elementPath(e.getParent()), c = new CKEDITOR.dom.elementPath(n.getParent()), g = null, f = null, d = 0; d < a.elements.length; d++) { var h = a.elements[d]; if (h == a.block || h == a.blockLimit) break; l.checkElementRemovable(h, !0) && (g = h) } for (d = 0; d < c.elements.length; d++) {
                        h = c.elements[d]; if (h == c.block || h == c.blockLimit) break; l.checkElementRemovable(h, !0) &&
                            (f = h)
                    } f && n.breakParent(f); g && e.breakParent(g)
                } a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); var c = a.createBookmark(), e = c.startNode, g = this._.definition.alwaysRemoveElement; if (a.collapsed) {
                    for (var f = new CKEDITOR.dom.elementPath(e.getParent(), a.root), d, h = 0, m; h < f.elements.length && (m = f.elements[h]) && m != f.block && m != f.blockLimit; h++)if (this.checkElementRemovable(m)) {
                        var k; !g && a.collapsed && (a.checkBoundaryOfElement(m, CKEDITOR.END) || (k = a.checkBoundaryOfElement(m, CKEDITOR.START))) ? (d = m, d.match = k ? "start" : "end") : (m.mergeSiblings(),
                            m.is(this.element) ? q.call(this, m) : w(m, x(this)[m.getName()]))
                    } if (d) { g = e; for (h = 0; ; h++) { m = f.elements[h]; if (m.equals(d)) break; else if (m.match) continue; else m = m.clone(); m.append(g); g = m } g["start" == d.match ? "insertBefore" : "insertAfter"](d) }
                } else {
                    var n = c.endNode, l = this; b(); for (f = e; !f.equals(n);)d = f.getNextSourceNode(), f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f) && (f.getName() == this.element ? q.call(this, f) : w(f, x(this)[f.getName()]), d.type == CKEDITOR.NODE_ELEMENT && d.contains(e) && (b(), d = e.getNext())),
                        f = d
                } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
            } function h(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function l(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && t(a, this) } function k(a) {
                var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                    var b = this._.definition,
                    c = b.attributes; if (c) for (var e in c) a.removeAttribute(e, c[e]); if (b.styles) for (var g in b.styles) b.styles.hasOwnProperty(g) && a.removeStyle(g)
                }
            } function f(a) { var b = a.createBookmark(!0), c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var e, g = a.document, f; e = c.getNextParagraph();)!e.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = v(this, g, e), m(e, f)); a.moveToBookmark(b) } function e(a) {
                var b = a.createBookmark(1), c = a.createIterator();
                c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var e, g; e = c.getNextParagraph();)this.checkElementRemovable(e) && (e.is("pre") ? ((g = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && e.copyAttributes(g), m(e, g)) : q.call(this, e)); a.moveToBookmark(b)
            } function m(a, b) {
                var c = !b; c && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var e = b && b.is("pre"), f = a.is("pre"), d = !e && f; if (e && !f) {
                    f = b; (d = a.getBogus()) && d.remove();
                    d = a.getHtml(); d = n(d, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); d = d.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); d = d.replace(/([ \t\n\r]+|&nbsp;)/g, " "); d = d.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var h = a.getDocument().createElement("div"); h.append(f); f.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e"; f.copyAttributes(h.getFirst()); f = h.getFirst().remove() } else f.setHtml(d); b = f
                } else d ? b = p(c ? [a.getHtml()] : g(a), b) : a.moveChildren(b); b.replace(a); if (e) {
                    var c = b, m; (m = c.getPrevious(H)) && m.type == CKEDITOR.NODE_ELEMENT &&
                        m.is("pre") && (e = n(m.getHtml(), /\n$/, "") + "\n\n" + n(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + e + "\x3c/pre\x3e" : c.setHtml(e), m.remove())
                } else c && u(b)
            } function g(a) { var b = []; n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function n(a, b, c) {
                var e = "", g = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,
                    function (a, b, c) { b && (e = b); c && (g = c); return "" }); return e + a.replace(b, c) + g
            } function p(a, b) {
                var c; 1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var e = 0; e < a.length; e++) {
                    var g = a[e], g = g.replace(/(\r\n|\r)/g, "\n"), g = n(g, /^[ \t]*\n/, ""), g = n(g, /\n$/, ""), g = n(g, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), g = g.replace(/\n/g, "\x3cbr\x3e"), g = g.replace(/[ \t]{2,}/g, function (a) {
                        return CKEDITOR.tools.repeat("\x26nbsp;",
                            a.length - 1) + " "
                    }); if (c) { var f = b.clone(); f.setHtml(g); c.append(f) } else b.setHtml(g)
                } return c || b
            } function q(a, b) {
                var c = this._.definition, e = c.attributes, c = c.styles, g = x(this)[a.getName()], f = CKEDITOR.tools.isEmpty(e) && CKEDITOR.tools.isEmpty(c), d; for (d in e) if ("class" != d && !this._.definition.fullMatch || a.getAttribute(d) == y(d, e[d])) b && "data-" == d.slice(0, 5) || (f = a.hasAttribute(d), a.removeAttribute(d)); for (var h in c) this._.definition.fullMatch && a.getStyle(h) != y(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h));
                w(a, g, A[a.getName()]); f && (this._.definition.alwaysRemoveElement ? u(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? u(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            } function r(a) { for (var b = x(this), c = a.getElementsByTag(this.element), e, g = c.count(); 0 <= --g;)e = c.getItem(g), e.isReadOnly() || q.call(this, e, !0); for (var f in b) if (f != this.element) for (c = a.getElementsByTag(f), g = c.count() - 1; 0 <= g; g--)e = c.getItem(g), e.isReadOnly() || w(e, b[f]) } function w(a,
                b, c) { if (b = b && b.attributes) for (var e = 0; e < b.length; e++) { var g = b[e][0], f; if (f = a.getAttribute(g)) { var d = b[e][1]; (null === d || d.test && d.test(f) || "string" == typeof d && f == d) && a.removeAttribute(g) } } c || u(a) } function u(a, b) {
                    if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(H), e = a.getNext(H); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1); !e || e.type != CKEDITOR.NODE_TEXT && e.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else c = a.getFirst(), e = a.getLast(),
                        a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), e && !c.equals(e) && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings())
                } function v(a, b, c) { var e; e = a.element; "*" == e && (e = "span"); e = new CKEDITOR.dom.element(e, b); c && c.copyAttributes(e); e = t(e, a); b.getCustomData("doc_processing_style") && e.hasAttribute("id") ? e.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return e } function t(a, b) {
                    var c = b._.definition, e = c.attributes, c = CKEDITOR.style.getStyleText(c); if (e) for (var g in e) a.setAttribute(g,
                        e[g]); c && a.setAttribute("style", c); return a
                } function B(a, b) { for (var c in a) a[c] = a[c].replace(F, function (a, c) { return b[c] }) } function x(a) {
                    if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides; if (c) {
                        CKEDITOR.tools.isArray(c) || (c = [c]); for (var e = 0; e < c.length; e++) {
                            var g = c[e], f, d; "string" == typeof g ? f = g.toLowerCase() : (f = g.element ? g.element.toLowerCase() : a.element, d = g.attributes); g = b[f] || (b[f] = {}); if (d) {
                                var g = g.attributes = g.attributes || [], h; for (h in d) g.push([h.toLowerCase(),
                                d[h]])
                            }
                        }
                    } return b
                } function y(a, b, c) { var e = new CKEDITOR.dom.element("span"); e[c ? "setStyle" : "setAttribute"](a, b); return e[c ? "getStyle" : "getAttribute"](a) } function C(a, b) { function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var e in a) if (!(e in b) || c(b[e], e) != c(a[e], e) && "inherit" != a[e] && "inherit" != b[e]) return !1; return !0 } function z(a, b, c) {
                    var e = a.document, g = a.getRanges();
                    b = b ? this.removeFromRange : this.applyToRange; var f, d; if (a.isFake && a.isInTable()) for (f = [], d = 0; d < g.length; d++)f.push(g[d].clone()); for (var h = g.createIterator(); d = h.getNextRange();)b.call(this, d, c); a.selectRanges(f || g); e.removeCustomData("doc_processing_style")
                } var A = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, G = {
                    a: 1, blockquote: 1,
                    embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1
                }, D = /\s*(?:;\s*|$)/, F = /#\((.+?)\)/g, I = CKEDITOR.dom.walker.bookmark(0, 1), H = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                    if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), B(a.attributes, b), B(a.styles,
                        b)); c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (A[c] ? CKEDITOR.STYLE_BLOCK : G[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
                }; CKEDITOR.style.prototype = {
                    apply: function (a) {
                        if (a instanceof CKEDITOR.dom.document) return z.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) {
                            var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode);
                            z.call(this, a.getSelection(), 0, a); this._.enterMode = b
                        }
                    }, remove: function (a) { if (a instanceof CKEDITOR.dom.document) return z.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); z.call(this, a.getSelection(), 1, a); this._.enterMode = b } }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? f : this.type == CKEDITOR.STYLE_OBJECT ? l : null; return this.applyToRange(a) }, removeFromRange: function (a) {
                        this.removeFromRange =
                        this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? e : this.type == CKEDITOR.STYLE_OBJECT ? k : null; return this.removeFromRange(a)
                    }, applyToObject: function (a) { t(a, this) }, checkActive: function (a, b) {
                        switch (this.type) {
                            case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var c = a.elements, e = 0, g; e < c.length; e++)if (g = c[e], this.type != CKEDITOR.STYLE_INLINE || g != a.block && g != a.blockLimit) {
                                if (this.type == CKEDITOR.STYLE_OBJECT) {
                                    var f =
                                        g.getName(); if (!("string" == typeof this.element ? f == this.element : f in this.element)) continue
                                } if (this.checkElementRemovable(g, !0, b)) return !0
                            }
                        }return !1
                    }, checkApplicable: function (a, b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                        var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
                        var e = a.getName(); if ("string" == typeof this.element ? e == this.element : e in this.element) { if (!b && !a.hasAttributes()) return !0; if (e = c._AC) c = e; else { var e = {}, g = 0, f = c.attributes; if (f) for (var d in f) g++, e[d] = f[d]; if (d = CKEDITOR.style.getStyleText(c)) e.style || g++, e.style = d; e._length = g; c = c._AC = e } if (c._length) { for (var h in c) if ("_length" != h) if (e = a.getAttribute(h) || "", "style" == h ? C(c[h], e) : c[h] == e) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0 } return !1
                    }, checkElementRemovable: function (a, b, c) {
                        if (this.checkElementMatch(a,
                            b, c)) return !0; if (b = x(this)[a.getName()]) { var e; if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++)if (e = b[c][0], e = a.getAttribute(e)) { var g = b[c][1]; if (null === g) return !0; if ("string" == typeof g) { if (e == g) return !0 } else if (g.test(e)) return !0 } } return !1
                    }, buildPreview: function (a) {
                        var b = this._.definition, c = [], e = b.element; "bdo" == e && (e = "span"); var c = ["\x3c", e], g = b.attributes; if (g) for (var f in g) c.push(" ", f, '\x3d"', g[f], '"'); (g = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', g, '"'); c.push("\x3e", a || b.name,
                            "\x3c/", e, "\x3e"); return c.join("")
                    }, getDefinition: function () { return this._.definition }
                }; CKEDITOR.style.getStyleText = function (a) { var b = a._ST; if (b) return b; var b = a.styles, c = a.attributes && a.attributes.style || "", e = ""; c.length && (c = c.replace(D, ";")); for (var g in b) { var f = b[g], d = (g + ":" + f).replace(D, ";"); "inherit" == f ? e += d : c += d } c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + e }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.addCustomHandler = function (a) {
                    var b = function (a) {
                        this._ = { definition: a };
                        this.setup && this.setup(a)
                    }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT }, a, !0); return this.customHandlers[a.type] = b
                }; var J = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, K = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
        }(), CKEDITOR.styleCommand = function (a, d) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, d, !0) },
        CKEDITOR.styleCommand.prototype.exec = function (a) { a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style) }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function (a, d, b) { CKEDITOR.stylesSet.addExternal(a, d, ""); CKEDITOR.stylesSet.load(a, b) }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            attachStyleStateChange: function (a,
                d) { var b = this._.styleStateChangeCallbacks; b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function (a) { for (var d = 0; d < b.length; d++) { var l = b[d], k = l.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; l.fn.call(this, k) } })); b.push({ style: a, fn: d }) }, applyStyle: function (a) { a.apply(this) }, removeStyle: function (a) { a.remove(this) }, getStylesSet: function (a) {
                    if (this._.stylesDefinitions) a(this._.stylesDefinitions); else {
                        var d = this, b = d.config.stylesCombo_stylesSet || d.config.stylesSet;
                        if (!1 === b) a(null); else if (b instanceof Array) d._.stylesDefinitions = b, a(b); else { b || (b = "default"); var b = b.split(":"), c = b[0]; CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(c, function (b) { d._.stylesDefinitions = b[c]; a(d._.stylesDefinitions) }) }
                    }
                }
        }), CKEDITOR.dom.comment = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,
            { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }), "use strict", function () {
                var a = {}, d = {}, b; for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1); for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1); CKEDITOR.dom.elementPath = function (b, h) {
                    var l = null, k = null, f = [], e = b, m; h = h || b.getDocument().getBody(); e || (e = h); do if (e.type == CKEDITOR.NODE_ELEMENT) {
                        f.push(e); if (!this.lastElement && (this.lastElement = e, e.is(CKEDITOR.dtd.$object) ||
                            "false" == e.getAttribute("contenteditable"))) continue; if (e.equals(h)) break; if (!k && (m = e.getName(), "true" == e.getAttribute("contenteditable") ? k = e : !l && d[m] && (l = e), a[m])) { if (m = !l && "div" == m) { a: { m = e.getChildren(); for (var g = 0, n = m.count(); g < n; g++) { var p = m.getItem(g); if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) { m = !0; break a } } m = !1 } m = !m } m ? l = e : k = e }
                    } while (e = e.getParent()); k || (k = h); this.block = l; this.blockLimit = k; this.root = h; this.elements = f
                }
            }(), CKEDITOR.dom.elementPath.prototype = {
                compare: function (a) {
                    var d =
                        this.elements; a = a && a.elements; if (!a || d.length != a.length) return !1; for (var b = 0; b < d.length; b++)if (!d[b].equals(a[b])) return !1; return !0
                }, contains: function (a, d, b) {
                    var c = 0, h; "string" == typeof a && (h = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element ? h = function (b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? h = function (b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? h = a : "object" == typeof a && (h = function (b) { return b.getName() in a }); var l = this.elements, k = l.length; d &&
                        (b ? c += 1 : --k); b && (l = Array.prototype.slice.call(l, 0), l.reverse()); for (; c < k; c++)if (h(l[c])) return l[c]; return null
                }, isContextFor: function (a) { var d; return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0 }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
            }, CKEDITOR.dom.text = function (a, d) { "string" == typeof a && (a = (d ? d.$ : document).createTextNode(a)); this.$ = a }, CKEDITOR.dom.text.prototype =
        new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
            type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length }, getText: function () { return this.$.nodeValue }, setText: function (a) { this.$.nodeValue = a }, split: function (a) {
                var d = this.$.parentNode, b = d.childNodes.length, c = this.getLength(), h = this.getDocument(), l = new CKEDITOR.dom.text(this.$.splitText(a), h); d.childNodes.length == b && (a >= c ? (l = h.createText(""), l.insertAfter(this)) : (a = h.createText(""), a.insertAfter(l), a.remove()));
                return l
            }, substring: function (a, d) { return "number" != typeof d ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d) }
        }), function () {
            function a(a, c, d) {
                var l = a.serializable, k = c[d ? "endContainer" : "startContainer"], f = d ? "endOffset" : "startOffset", e = l ? c.document.getById(a.startNode) : a.startNode; a = l ? c.document.getById(a.endNode) : a.endNode; k.equals(e.getPrevious()) ? (c.startOffset = c.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (c.startOffset -= k.getLength(),
                    k = a.getNext()); k.equals(e.getParent()) && c[f]++; k.equals(a.getParent()) && c[f]++; c[d ? "endContainer" : "startContainer"] = k; return c
            } CKEDITOR.dom.rangeList = function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, d) }; var d = {
                createIterator: function () {
                    var a = this, c = CKEDITOR.dom.walker.bookmark(), d = [], l; return {
                        getNextRange: function (k) {
                            l = void 0 === l ? 0 : l + 1; var f = a[l]; if (f && 1 < a.length) {
                                if (!l) for (var e = a.length - 1; 0 <= e; e--)d.unshift(a[e].createBookmark(!0));
                                if (k) for (var m = 0; a[l + m + 1];) { var g = f.document; k = 0; e = g.getById(d[m].endNode); for (g = g.getById(d[m + 1].startNode); ;) { e = e.getNextSourceNode(!1); if (g.equals(e)) k = 1; else if (c(e) || e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) continue; break } if (!k) break; m++ } for (f.moveToBookmark(d.shift()); m--;)e = a[++l], e.moveToBookmark(d.shift()), f.setEnd(e.endContainer, e.endOffset)
                            } return f
                        }
                    }
                }, createBookmarks: function (b) {
                    for (var c = [], d, l = 0; l < this.length; l++) {
                        c.push(d = this[l].createBookmark(b, !0)); for (var k = l + 1; k < this.length; k++)this[k] =
                            a(d, this[k]), this[k] = a(d, this[k], !0)
                    } return c
                }, createBookmarks2: function (a) { for (var c = [], d = 0; d < this.length; d++)c.push(this[d].createBookmark2(a)); return c }, moveToBookmarks: function (a) { for (var c = 0; c < this.length; c++)this[c].moveToBookmark(a[c]) }
            }
        }(), function () {
            function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function d(b) {
                var c = CKEDITOR.skin["ua_" + b], e = CKEDITOR.env; if (c) for (var c = c.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), f = 0,
                    d; f < c.length; f++)if (d = c[f], e.ie && (d.replace(/^ie/, "") == e.version || e.quirks && "iequirks" == d) && (d = "ie"), e[d]) { b += "_" + c[f]; break } return CKEDITOR.getUrl(a() + b + ".css")
            } function b(a, b) { l[a] || (CKEDITOR.document.appendStyleSheet(d(a)), l[a] = 1); b && b() } function c(a) { var b = a.getById(k); b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css")); return b } function h(a, b, c) {
                var e, f, d; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), f = 0; f < b.length; f++)b[f] = b[f].split("{"); for (var h =
                    0; h < a.length; h++)if (CKEDITOR.env.webkit) for (f = 0; f < b.length; f++) { d = b[f][1]; for (e = 0; e < c.length; e++)d = d.replace(c[e][0], c[e][1]); a[h].$.sheet.addRule(b[f][0], d) } else { d = b; for (e = 0; e < c.length; e++)d = d.replace(c[e][0], c[e][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[h].$.styleSheet.cssText += d : a[h].$.innerHTML += d }
            } var l = {}; CKEDITOR.skin = {
                path: a, loadPart: function (c, e) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () { b(c, e) }) : b(c, e) },
                getPath: function (a) { return CKEDITOR.getUrl(d(a)) }, icons: {}, addIcon: function (a, b, c, e) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: e || "16px" }) }, getIconStyle: function (a, b, c, e, f) { var d; a && (a = a.toLowerCase(), b && (d = this.icons[a + "-rtl"]), d || (d = this.icons[a])); a = c || d && d.path || ""; e = e || d && d.offset; f = f || d && d.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + e + "px;background-size:" + f + ";" }
            }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
                { getUiColor: function () { return this.uiColor }, setUiColor: function (a) { var b = c(CKEDITOR.document); return (this.setUiColor = function (a) { this.uiColor = a; var c = CKEDITOR.skin.chameleon, d = "", m = ""; "function" == typeof c && (d = c(this, "editor"), m = c(this, "panel")); a = [[e, a]]; h([b], d, a); h(f, m, a) }).call(this, a) } }); var k = "cke_ui_color", f = [], e = /\$color/g; CKEDITOR.on("instanceLoaded", function (a) {
                    if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                        var b = a.editor; a = function (a) {
                            a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                            if (!a.getById("cke_ui_color")) { a = c(a); f.push(a); var d = b.getUiColor(); d && h([a], CKEDITOR.skin.chameleon(b, "panel"), [[e, d]]) }
                        }; b.on("panelShow", a); b.on("menuShow", a); b.config.uiColor && b.setUiColor(b.config.uiColor)
                    }
                })
        }(), function () {
            if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else {
                var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document); a.appendTo(CKEDITOR.document.getHead());
                try { var d = a.getComputedStyle("border-top-color"), b = a.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !(!d || d != b) } catch (c) { CKEDITOR.env.hc = !1 } a.remove()
            } CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"); CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, d = 0; d < a.length; d++)CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
        }(), CKEDITOR.skin.name =
        "moono-lisa", CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8", CKEDITOR.skin.chameleon = function () {
            var a = function () { return function (a, c) { for (var d = a.match(/[^#]./g), l = 0; 3 > l; l++) { var k = l, f; f = parseInt(d[l], 16); f = ("0" + (0 > c ? 0 | f * (1 + c) : 0 | f + (255 - f) * c).toString(16)).slice(-2); d[k] = f } return "#" + d.join("") } }(), d = {
                editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
                panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
            };
            return function (b, c) { var h = a(b.uiColor, .4), h = { id: "." + b.id, defaultBorder: a(h, -.2), toolbarElementsBorder: a(h, -.25), defaultBackground: h, lightBackground: a(h, .8), darkBackground: a(h, -.15), ckeButtonOn: a(h, .4), ckeResizer: a(h, -.4), ckeColorauto: a(h, .8), dialogBody: a(h, .7), dialogTab: a(h, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: a(h, -.6), menubuttonHover: a(h, .1), menubuttonIcon: a(h, .5), menubuttonIconHover: a(h, .3) }; return d[c].output(h).replace(/\[/g, "{").replace(/\]/g, "}") }
        }(),
        CKEDITOR.plugins.add("dialogui", {
            onLoad: function () {
                var a = function (a) { this._ || (this._ = {}); this._["default"] = this._.initValue = a["default"] || ""; this._.required = a.required || !1; for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]); b.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ }, d = { build: function (a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } }, b = { build: function (a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } }, c = {
                    isChanged: function () {
                        return this.getValue() !=
                            this.getInitValue()
                    }, reset: function (a) { this.setValue(this.getInitValue(), a) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
                }, h = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function (a, b) {
                        this._.domOnChangeRegistered || (a.on("load", function () {
                            this.getInputElement().on("change", function () { a.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                                this)
                        }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                    }
                }, !0), l = /^on([A-Z]\w+)/, k = function (a) { for (var b in a) (l.test(b) || "title" == b || "type" == b) && delete a[b]; return a }, f = function (a) { a = a.data.getKeystroke(); a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function (b, c, g, f) {
                        if (!(4 > arguments.length)) {
                            var d = a.call(this, c); d.labelId = CKEDITOR.tools.getNextId() +
                                "_label"; this._.children = []; var h = { role: c.role || "presentation" }; c.includeLabel && (h["aria-labelledby"] = d.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, c, g, "div", null, h, function () {
                                    var a = [], g = c.required ? " cke_required" : ""; "horizontal" != c.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + d.labelId + '"', d.inputId ? ' for\x3d"' + d.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                                        c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', f.call(this, b, c), "\x3c/div\x3e") : (g = {
                                            type: "hbox", widths: c.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + d.labelId + '" for\x3d"' + d.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e" }, {
                                                type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle +
                                                    '"' : "") + "\x3e" + f.call(this, b, c) + "\x3c/span\x3e"
                                            }]
                                        }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, a)); return a.join("")
                                })
                        }
                    }, textInput: function (b, c, g) {
                        if (!(3 > arguments.length)) {
                            a.call(this, c); var d = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", h = { "class": "cke_dialog_ui_input_" + c.type, id: d, type: c.type }; c.validate && (this.validate = c.validate); c.maxLength && (h.maxlength = c.maxLength); c.size && (h.size = c.size); c.inputStyle && (h.style = c.inputStyle); var k = this, l = !1; b.on("load", function () {
                                k.getInputElement().on("keydown",
                                    function (a) { 13 == a.data.getKeystroke() && (l = !0) }); k.getInputElement().on("keyup", function (a) { 13 == a.data.getKeystroke() && l && (b.getButton("ok") && setTimeout(function () { b.getButton("ok").click() }, 0), l = !1); k.bidi && f.call(k, a) }, null, null, 1E3)
                            }); CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () {
                                var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"']; c.width && a.push('style\x3d"width:' + c.width + '" '); a.push("\x3e\x3cinput "); h["aria-labelledby"] = this._.labelId; this._.required &&
                                    (h["aria-required"] = this._.required); for (var b in h) a.push(b + '\x3d"' + h[b] + '" '); a.push(" /\x3e\x3c/div\x3e"); return a.join("")
                            })
                        }
                    }, textarea: function (b, c, g) {
                        if (!(3 > arguments.length)) {
                            a.call(this, c); var d = this, h = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", k = {}; c.validate && (this.validate = c.validate); k.rows = c.rows || 5; k.cols = c.cols || 20; k["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || ""); "undefined" != typeof c.inputStyle && (k.style = c.inputStyle); c.dir && (k.dir = c.dir); if (d.bidi) b.on("load",
                                function () { d.getInputElement().on("keyup", f) }, d); CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () { k["aria-labelledby"] = this._.labelId; this._.required && (k["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', h, '" '], b; for (b in k) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(k[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(d._["default"]), "\x3c/textarea\x3e\x3c/div\x3e"); return a.join("") })
                        }
                    }, checkbox: function (b,
                        c, g) {
                            if (!(3 > arguments.length)) {
                                var f = a.call(this, c, { "default": !!c["default"] }); c.validate && (this.validate = c.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, c, g, "span", null, null, function () {
                                    var a = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), g = [], d = CKEDITOR.tools.getNextId() + "_label", h = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": d }; k(a); c["default"] && (h.checked = "checked"); "undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
                                    f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, g, "input", null, h); g.push(' \x3clabel id\x3d"', d, '" for\x3d"', h.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e"); return g.join("")
                                })
                            }
                    }, radio: function (b, c, g) {
                        if (!(3 > arguments.length)) {
                            a.call(this, c); this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]); c.validate && (this.validate = c.validate); var f = [], d = this; c.role = "radiogroup"; c.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this,
                                b, c, g, function () {
                                    for (var a = [], g = [], h = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < c.items.length; l++) {
                                        var v = c.items[l], t = void 0 !== v[2] ? v[2] : v[0], B = void 0 !== v[1] ? v[1] : v[0], x = CKEDITOR.tools.getNextId() + "_radio_input", y = x + "_label", x = CKEDITOR.tools.extend({}, c, { id: x, title: null, type: null }, !0), t = CKEDITOR.tools.extend({}, x, { title: t }, !0), C = { type: "radio", "class": "cke_dialog_ui_radio_input", name: h, value: B, "aria-labelledby": y }, z = []; d._["default"] == B && (C.checked = "checked"); k(x); k(t); "undefined" != typeof x.inputStyle &&
                                            (x.style = x.inputStyle); x.keyboardFocusable = !0; f.push(new CKEDITOR.ui.dialog.uiElement(b, x, z, "input", null, C)); z.push(" "); new CKEDITOR.ui.dialog.uiElement(b, t, z, "label", null, { id: y, "for": C.id }, v[0]); a.push(z.join(""))
                                    } new CKEDITOR.ui.dialog.hbox(b, f, a, g); return g.join("")
                                }); this._.children = f
                        }
                    }, button: function (b, c, g) {
                        if (arguments.length) {
                            "function" == typeof c && (c = c(b.getParentEditor())); a.call(this, c, { disabled: c.disabled || !1 }); CKEDITOR.event.implementOn(this); var f = this; b.on("load", function () {
                                var a = this.getElement();
                                (function () { a.on("click", function (a) { f.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) }) })(); a.unselectable()
                            }, this); var d = CKEDITOR.tools.extend({}, c); delete d.style; var h = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, b, d, g, "a", null, { style: c.style, href: "javascript:void(0)", title: c.label, hidefocus: "true", "class": c["class"], role: "button", "aria-labelledby": h }, '\x3cspan id\x3d"' + h + '" class\x3d"cke_dialog_ui_button"\x3e' +
                                CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
                        }
                    }, select: function (b, c, g) {
                        if (!(3 > arguments.length)) {
                            var f = a.call(this, c); c.validate && (this.validate = c.validate); f.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () {
                                var a = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), g = [], d = [], h = { id: f.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId }; g.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                                    c.type, '" role\x3d"presentation"'); c.width && g.push('style\x3d"width:' + c.width + '" '); g.push("\x3e"); void 0 !== c.size && (h.size = c.size); void 0 !== c.multiple && (h.multiple = c.multiple); k(a); for (var l = 0, v; l < c.items.length && (v = c.items[l]); l++)d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== v[1] ? v[1] : v[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(v[0])); "undefined" != typeof a.inputStyle && (a.style = a.inputStyle); f.select = new CKEDITOR.ui.dialog.uiElement(b, a, g, "select", null,
                                        h, d.join("")); g.push("\x3c/div\x3e"); return g.join("")
                            })
                        }
                    }, file: function (b, c, g) {
                        if (!(3 > arguments.length)) {
                            void 0 === c["default"] && (c["default"] = ""); var f = CKEDITOR.tools.extend(a.call(this, c), { definition: c, buttons: [] }); c.validate && (this.validate = c.validate); b.on("load", function () { CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, b, c, g, function () {
                                f.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                                    f.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void(']; a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); a.push(')"\x3e\x3c/iframe\x3e'); return a.join("")
                            })
                        }
                    }, fileButton: function (b, c, g) {
                        var f = this; if (!(3 > arguments.length)) {
                            a.call(this, c); c.validate && (this.validate = c.validate); var d = CKEDITOR.tools.extend({}, c), h = d.onClick; d.className = (d.className ? d.className + " " : "") + "cke_dialog_ui_button"; d.onClick = function (a) {
                                var g =
                                    c["for"]; h && !1 === h.call(this, a) || (b.getContentElement(g[0], g[1]).submit(), this.disable())
                            }; b.on("load", function () { b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(f) }); CKEDITOR.ui.dialog.button.call(this, b, d, g)
                        }
                    }, html: function () {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/; return function (f, d, h) {
                            if (!(3 > arguments.length)) {
                                var k = [], l = d.html; "\x3c" != l.charAt(0) && (l = "\x3cspan\x3e" + l + "\x3c/span\x3e"); var u = d.focus; if (u) {
                                    var v = this.focus; this.focus = function () {
                                        ("function" ==
                                            typeof u ? u : v).call(this); this.fire("focus")
                                    }; d.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0
                                } CKEDITOR.ui.dialog.uiElement.call(this, f, d, k, "span", null, null, ""); k = k.join("").match(a); l = l.match(b) || ["", "", ""]; c.test(l[1]) && (l[1] = l[1].slice(0, -1), l[2] = "/" + l[2]); h.push([l[1], " ", k[1] || "", l[2]].join(""))
                            }
                        }
                    }(), fieldset: function (a, b, c, f, d) {
                        var h = d.label; this._ = { children: b }; CKEDITOR.ui.dialog.uiElement.call(this, a, d, f, "fieldset", null, null, function () {
                            var a = []; h && a.push("\x3clegend" +
                                (d.labelStyle ? ' style\x3d"' + d.labelStyle + '"' : "") + "\x3e" + h + "\x3c/legend\x3e"); for (var b = 0; b < c.length; b++)a.push(c[b]); return a.join("")
                        })
                    }
                }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    setLabel: function (a) { var b = CKEDITOR.document.getById(this._.labelId); 1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a; return this }, getLabel: function () {
                        var a =
                            CKEDITOR.document.getById(this._.labelId); return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText()
                    }, eventProcessors: h
                }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) }, enable: function () { this._.disabled = !1; var a = this.getElement(); a && a.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") }, isVisible: function () { return this.getElement().getFirst().isVisible() },
                    isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (a, b) { this.on("click", function () { b.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() }, accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
                }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                    getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
                    focus: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && b.$.focus() }, 0) }, select: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && (b.$.focus(), b.$.select()) }, 0) }, accessKeyUp: function () { this.select() }, setValue: function (a) { if (this.bidi) { var b = a && a.charAt(0); (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1)); this.setDirectionMarker(b) } a || (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
                    getValue: function () { var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && a) { var b = this.getDirectionMarker(); b && (a = ("ltr" == b ? "‪" : "‫") + a) } return a }, setDirectionMarker: function (a) { var b = this.getInputElement(); a ? b.setAttributes({ dir: a, "data-cke-dir-marker": a }) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"]) }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
                }, c, !0); CKEDITOR.ui.dialog.textarea.prototype =
                    new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function () { return this._.select.getElement() }, add: function (a, b, c) { var f = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), d = this.getInputElement().$; f.$.text = a; f.$.value = void 0 === b || null === b ? a : b; void 0 === c || null === c ? CKEDITOR.env.ie ? d.add(f.$) : d.add(f.$, null) : d.add(f.$, c); return this }, remove: function (a) {
                            this.getInputElement().$.remove(a);
                            return this
                        }, clear: function () { for (var a = this.getInputElement().$; 0 < a.length;)a.remove(0); return this }, keyboardFocusable: !0
                    }, c, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        getInputElement: function () { return this._.checkbox.getElement() }, setValue: function (a, b) { this.getInputElement().$.checked = a; !b && this.fire("change", { value: a }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                            onChange: function (a,
                                b) { if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return h.onChange.apply(this, arguments); a.on("load", function () { var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) }, this) }, this); this.on("change", b); return null }
                        }, keyboardFocusable: !0
                    }, c, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        setValue: function (a, b) {
                            for (var c = this._.children, f, d = 0; d < c.length && (f = c[d]); d++)f.getElement().$.checked =
                                f.getValue() == a; !b && this.fire("change", { value: a })
                        }, getValue: function () { for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked) return a[b].getValue(); return null }, accessKeyUp: function () { var a = this._.children, b; for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) { a[b].getElement().focus(); return } a[0].getElement().focus() }, eventProcessors: {
                            onChange: function (a, b) {
                                if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return h.onChange.apply(this, arguments); a.on("load", function () {
                                    for (var a =
                                        this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                                }, this); this.on("change", b); return null
                            }
                        }
                    }, c, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, c, {
                        getInputElement: function () {
                            var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :
                                this.getElement()
                        }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, f = function (a, b, c, e) { a.on("formLoaded", function () { a.getInputElement().on(c, e, a) }) }, d; for (d in a) if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : f(this, this._.dialog, c[1].toLowerCase(), a[d]); return this }, reset: function () {
                            function a() {
                                c.$.open();
                                var e = ""; f.size && (e = f.size - (CKEDITOR.env.ie ? 7 : 0)); var t = b.frameId + "_input"; c.$.write(['\x3chtml dir\x3d"' + l + '" lang\x3d"' + u + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + l + '" lang\x3d"' + u + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', t, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
                                    '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', t, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < e ? e : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + h + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + k + ")}", "\x3c/script\x3e"].join(""));
                                c.$.close(); for (e = 0; e < d.length; e++)d[e].enable()
                            } var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), f = b.definition, d = b.buttons, h = this.formLoadedNumber, k = this.formUnloadNumber, l = b.dialog._.editor.lang.dir, u = b.dialog._.editor.langCode; h || (h = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), k = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () {
                                CKEDITOR.tools.removeFunction(h);
                                CKEDITOR.tools.removeFunction(k)
                            })); CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                        }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: { onChange: function (a, b) { this._.domOnChangeRegistered || (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", b) } }, keyboardFocusable: !0
                    }, !0); CKEDITOR.ui.dialog.fileButton.prototype =
                        new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", d); CKEDITOR.dialog.addUIElement("password", d); CKEDITOR.dialog.addUIElement("textarea", b); CKEDITOR.dialog.addUIElement("checkbox", b); CKEDITOR.dialog.addUIElement("radio", b); CKEDITOR.dialog.addUIElement("button", b); CKEDITOR.dialog.addUIElement("select", b); CKEDITOR.dialog.addUIElement("file", b); CKEDITOR.dialog.addUIElement("fileButton", b); CKEDITOR.dialog.addUIElement("html",
                            b); CKEDITOR.dialog.addUIElement("fieldset", { build: function (a, b, c) { for (var f = b.children, d, h = [], k = [], l = 0; l < f.length && (d = f[l]); l++) { var u = []; h.push(u); k.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, u)) } return new CKEDITOR.ui.dialog[b.type](a, k, h, c, b) } })
            }
        }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2, function () {
            function a() {
                for (var a = this._.tabIdList.length,
                    b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null
            } function d() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function b(a, b) {
                for (var c = a.$.getElementsByTagName("input"), e = 0, g = c.length; e < g; e++) {
                    var f = new CKEDITOR.dom.element(c[e]);
                    "text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", "")))
                }
            } function c(a, b) { var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b }) } function h() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") }
            function l(a) {
                var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", w).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), c = b.getChild([0, 0, 0, 0, 0]), e = c.getChild(0), g = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c); !CKEDITOR.env.ie || CKEDITOR.env.quirks ||
                    CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); e.unselectable(); g.unselectable(); return { element: b, parts: { dialog: b.getChild(0), title: e, close: g, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]), footer: c.getChild([3, 0, 1, 0]) } }
            } function k(a,
                b, c) { this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute("disabled") && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") }) } function f(a) {
                    function b() { a.layout() } var c = CKEDITOR.document.getWindow(); c.on("resize", b); a.on("hide", function () {
                        c.removeListener("resize",
                            b)
                    })
                } function e(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function m(a) {
                    function b(c) { var k = a.getSize(), m = CKEDITOR.document.getWindow().getViewPaneSize(), l = c.data.$.screenX, n = c.data.$.screenY, t = l - e.x, u = n - e.y; e = { x: l, y: n }; g.x += t; g.y += u; a.move(g.x + h[3] < d ? -h[3] : g.x - h[1] > m.width - k.width - d ? m.width - k.width + ("rtl" == f.lang.dir ? 0 : h[1]) : g.x, g.y + h[0] < d ? -h[0] : g.y - h[2] > m.height - k.height - d ? m.height - k.height + h[2] : g.y, 1); c.data.preventDefault() } function c() {
                        CKEDITOR.document.removeListener("mousemove",
                            b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = z.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) }
                    } var e = null, g = null, f = a.getParentEditor(), d = f.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof d && (d = 20); a.parts.title.on("mousedown", function (f) {
                        e = { x: f.data.$.screenX, y: f.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); g = a.getPosition(); if (CKEDITOR.env.ie6Compat) {
                            var d =
                                z.getChild(0).getFrameDocument(); d.on("mousemove", b); d.on("mouseup", c)
                        } f.data.preventDefault()
                    }, a)
                } function g(a) {
                    function b(c) {
                        var n = "rtl" == f.lang.dir, t = l.width, u = l.height, p = t + (c.data.$.screenX - m.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2), v = u + (c.data.$.screenY - m.y) * (a._.moved ? 1 : 2), B = a._.element.getFirst(), B = n && B.getComputedStyle("right"), r = a.getPosition(); r.y + v > k.height && (v = k.height - r.y); (n ? B : r.x) + p > k.width && (p = k.width - (n ? B : r.x)); if (g == CKEDITOR.DIALOG_RESIZE_WIDTH || g == CKEDITOR.DIALOG_RESIZE_BOTH) t = Math.max(e.minWidth ||
                            0, p - d); if (g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH) u = Math.max(e.minHeight || 0, v - h); a.resize(t, u); a._.moved || a.layout(); c.data.preventDefault()
                    } function c() { CKEDITOR.document.removeListener("mouseup", c); CKEDITOR.document.removeListener("mousemove", b); n && (n.remove(), n = null); if (CKEDITOR.env.ie6Compat) { var a = z.getChild(0).getFrameDocument(); a.removeListener("mouseup", c); a.removeListener("mousemove", b) } } var e = a.definition, g = e.resizable; if (g != CKEDITOR.DIALOG_RESIZE_NONE) {
                        var f = a.getParentEditor(),
                        d, h, k, m, l, n, t = CKEDITOR.tools.addFunction(function (e) {
                            l = a.getSize(); var g = a.parts.contents; g.$.getElementsByTagName("iframe").length && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), g.append(n)); h = l.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)); d = l.width - a.parts.contents.getSize("width", 1); m = { x: e.screenX, y: e.screenY }; k = CKEDITOR.document.getWindow().getViewPaneSize();
                            CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); CKEDITOR.env.ie6Compat && (g = z.getChild(0).getFrameDocument(), g.on("mousemove", b), g.on("mouseup", c)); e.preventDefault && e.preventDefault()
                        }); a.on("load", function () {
                            var b = ""; g == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' + b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) +
                                '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + t + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                        }); f.on("destroy", function () { CKEDITOR.tools.removeFunction(t) })
                    }
                } function n(a) { a.data.preventDefault(1) } function p(a) {
                    var b = CKEDITOR.document.getWindow(), c = a.config, e = CKEDITOR.skinName || a.config.skin, g = c.dialog_backgroundCoverColor || ("moono-lisa" == e ? "black" : "white"), e = c.dialog_backgroundCoverOpacity, f = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(g, e, f), d = C[c]; d ? d.show() :
                        (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + g, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (g = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + g + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), f.push("void((function(){" + encodeURIComponent("document.open();(" +
                            CKEDITOR.tools.fixDomain + ")();document.write( '" + g + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), d = CKEDITOR.dom.element.createFromHtml(f.join("")), d.setOpacity(void 0 !== e ? e : .5), d.on("keydown", n), d.on("keypress", n), d.on("keyup", n), d.appendTo(CKEDITOR.document.getBody()), C[c] = d); a.focusManager.add(d); z = d; a = function () {
                                var a = b.getViewPaneSize();
                                d.setStyles({ width: a.width + "px", height: a.height + "px" })
                            }; var h = function () { var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop; d.setStyles({ left: a.x + "px", top: a.y + "px" }); if (c) { do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog) } }; y = a; b.on("resize", a); a(); CKEDITOR.env.mac && CKEDITOR.env.webkit || d.focus(); if (CKEDITOR.env.ie6Compat) {
                                var k = function () { h(); arguments.callee.prevScrollHandler.apply(this, arguments) }; b.$.setTimeout(function () {
                                    k.prevScrollHandler = window.onscroll || function () { };
                                    window.onscroll = k
                                }, 0); h()
                            }
                } function q(a) { z && (a.focusManager.remove(z), a = CKEDITOR.document.getWindow(), z.hide(), a.removeListener("resize", y), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0), y = null) } var r = CKEDITOR.tools.cssLength, w = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
                    CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
            CKEDITOR.dialog = function (b, e) {
                function f() { var a = A._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function k(a) {
                    var b = A._.focusList; a = a || 0; if (!(1 > b.length)) {
                        var c = A._.currentFocusIndex; A._.tabBarMode && 0 > a && (c = 0); try { b[c].getInputElement().$.blur() } catch (e) { } var g = c, f = 1 < A._.pageCount; do {
                            g += a; if (f && !A._.tabBarMode && (g == b.length || -1 == g)) {
                                A._.tabBarMode = !0; A._.tabs[A._.currentTabId][0].focus();
                                A._.currentFocusIndex = -1; return
                            } g = (g + b.length) % b.length; if (g == c) break
                        } while (a && !b[g].isFocusable()); b[g].focus(); "text" == b[g].type && b[g].select()
                    }
                } function n(c) {
                    if (A == CKEDITOR.dialog._.currentTop) {
                        var e = c.data.getKeystroke(), g = "rtl" == b.lang.dir, f = [37, 38, 39, 40]; q = z = 0; if (9 == e || e == CKEDITOR.SHIFT + 9) k(e == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1; else if (e == CKEDITOR.ALT + 121 && !A._.tabBarMode && 1 < A.getPageCount()) A._.tabBarMode = !0, A._.tabs[A._.currentTabId][0].focus(), A._.currentFocusIndex = -1, q = 1; else if (-1 != CKEDITOR.tools.indexOf(f,
                            e) && A._.tabBarMode) e = -1 != CKEDITOR.tools.indexOf([g ? 39 : 37, 38], e) ? a.call(A) : d.call(A), A.selectPage(e), A._.tabs[e][0].focus(), q = 1; else if (13 != e && 32 != e || !A._.tabBarMode) if (13 == e) e = c.data.getTarget(), e.is("a", "button", "select", "textarea") || e.is("input") && "button" == e.$.type || ((e = this.getButton("ok")) && CKEDITOR.tools.setTimeout(e.click, 0, e), q = 1), z = 1; else if (27 == e) (e = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(e.click, 0, e) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), z = 1; else return; else this.selectPage(this._.currentTabId),
                                this._.tabBarMode = !1, this._.currentFocusIndex = -1, k(1), q = 1; t(c)
                    }
                } function t(a) { q ? a.data.preventDefault(1) : z && a.data.stopPropagation() } var p = CKEDITOR.dialog._.dialogDefinitions[e], v = CKEDITOR.tools.clone(u), B = b.config.dialog_buttonsOrder || "OS", r = b.lang.dir, y = {}, q, z; ("OS" == B && CKEDITOR.env.mac || "rtl" == B && "ltr" == r || "ltr" == B && "rtl" == r) && v.buttons.reverse(); p = CKEDITOR.tools.extend(p(b), v); p = CKEDITOR.tools.clone(p); p = new x(this, p); v = l(b); this._ = {
                    editor: b, element: v.element, name: e, contentSize: { width: 0, height: 0 },
                    size: { width: 0, height: 0 }, contents: {}, buttons: {}, accessKeyMap: {}, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
                }; this.parts = v.parts; CKEDITOR.tools.setTimeout(function () { b.fire("ariaWidget", this.parts.contents) }, 0, this); v = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" }; v["rtl" == r ? "right" : "left"] = 0; this.parts.dialog.setStyles(v); CKEDITOR.event.call(this); this.definition = p = CKEDITOR.fire("dialogDefinition",
                    { name: e, definition: p }, b).definition; if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) { v = b.config.removeDialogTabs.split(";"); for (r = 0; r < v.length; r++)if (B = v[r].split(":"), 2 == B.length) { var w = B[0]; y[w] || (y[w] = []); y[w].push(B[1]) } b._.removeDialogTabs = y } if (b._.removeDialogTabs && (y = b._.removeDialogTabs[e])) for (r = 0; r < y.length; r++)p.removeContents(y[r]); if (p.onLoad) this.on("load", p.onLoad); if (p.onShow) this.on("show", p.onShow); if (p.onHide) this.on("hide", p.onHide); if (p.onOk) this.on("ok", function (a) {
                        b.fire("saveSnapshot");
                        setTimeout(function () { b.fire("saveSnapshot") }, 0); !1 === p.onOk.call(this, a) && (a.data.hide = !1)
                    }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (p.onCancel) this.on("cancel", function (a) { !1 === p.onCancel.call(this, a) && (a.data.hide = !1) }); var A = this, N = function (a) { var b = A._.contents, c = !1, e; for (e in b) for (var g in b[e]) if (c = a.call(this, b[e][g])) return }; this.on("ok", function (a) {
                        N(function (b) {
                            if (b.validate) {
                                var e = b.validate(this), g = "string" == typeof e || !1 === e; g && (a.data.hide = !1, a.stop()); c.call(b, !g, "string" == typeof e ?
                                    e : void 0); return g
                            }
                        })
                    }, this, null, 0); this.on("cancel", function (a) { N(function (c) { if (c.isChanged()) return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = k; var C = this._.element; b.focusManager.add(C, 1); this.on("show", function () { C.on("keydown", n, this); if (CKEDITOR.env.gecko) C.on("keypress", t, this) }); this.on("hide",
                        function () { C.removeListener("keydown", n); CKEDITOR.env.gecko && C.removeListener("keypress", t); N(function (a) { h.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0) }); this.on("show", function () {
                            f(); var a = 1 < A._.pageCount; b.config.dialog_startupFocusTab && a ? (A._.tabBarMode = !0, A._.tabs[A._.currentTabId][0].focus(), A._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1, p.onFocus ?
                                (a = p.onFocus.call(this)) && a.focus() : k(1))
                        }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); m(this); g(this); (new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title); for (r = 0; r < p.contents.length; r++)(y = p.contents[r]) && this.addPage(y); this.parts.tabs.on("click", function (a) {
                            var b = a.data.getTarget(); b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))),
                                this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, k(1)), a.data.preventDefault())
                        }, this); r = []; y = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: p.buttons }, r).getChild(); this.parts.footer.setHtml(r.join("")); for (r = 0; r < y.length; r++)this._.buttons[y[r].id] = y[r]
            }; CKEDITOR.dialog.prototype = {
                destroy: function () { this.hide(); this._.element.remove() }, resize: function () {
                    return function (a, b) {
                        this._.contentSize && this._.contentSize.width ==
                            a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor), this.fire("resize", { width: a, height: b }, this._.editor), this.parts.contents.setStyles({ width: a + "px", height: b + "px" }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = { width: a, height: b })
                    }
                }(), getSize: function () {
                    var a = this._.element.getFirst();
                    return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
                }, move: function (a, b, c) {
                    var e = this._.element.getFirst(), g = "rtl" == this._.editor.lang.dir, f = "fixed" == e.getComputedStyle("position"); CKEDITOR.env.ie && e.setStyle("zoom", "100%"); f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = { x: a, y: b }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), g && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = { top: (0 < b ? b : 0) + "px" },
                        b[g ? "right" : "left"] = (0 < a ? a : 0) + "px", e.setStyles(b), c && (this._.moved = 1))
                }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                    var a = this._.element, b = this.definition; a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody()); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null ===
                        this._.currentTabId && this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex /
                            2), CKEDITOR.dialog._.currentTop = this); a.on("keydown", G); a.on("keyup", D); this._.hasFocus = !1; for (var c in b.contents) if (b.contents[c]) {
                                var a = b.contents[c], e = this._.tabs[a.id], g = a.requiredContent, d = 0; if (e) {
                                    for (var h in this._.contents[a.id]) { var k = this._.contents[a.id][h]; "hbox" != k.type && "vbox" != k.type && k.getInputElement() && (k.requiredContent && !this._.editor.activeFilter.check(k.requiredContent) ? k.disable() : (k.enable(), d++)) } !d || g && !this._.editor.activeFilter.check(g) ? e[0].addClass("cke_dialog_tab_disabled") :
                                        e[0].removeClass("cke_dialog_tab_disabled")
                                }
                            } CKEDITOR.tools.setTimeout(function () { this.layout(); f(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
                }, layout: function () {
                    var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), e =
                        (c.width - b.width) / 2, g = (c.height - b.height) / 2; CKEDITOR.env.ie6Compat || (b.height + (0 < g ? g : 0) > c.height || b.width + (0 < e ? e : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed")); this.move(this._.moved ? this._.position.x : e, this._.moved ? this._.position.y : g)
                }, foreach: function (a) { for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this }, reset: function () { var a = function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this } }(),
                setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]); var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility",
                            "hidden"); for (I(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else q(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10; else {
                                CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", G); a.removeListener("keyup", D); var c = this._.editor;
                                c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0)
                            } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                    }
                }, addPage: function (a) {
                    if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                        for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                            type: "vbox", className: "cke_dialog_page_contents",
                            children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;"
                        }, b), g = this._.contents[a.id] = {}, f = e.getChild(), d = 0; e = f.shift();)e.notAllowed || "hbox" == e.type || "vbox" == e.type || d++, g[e.id] = e, "function" == typeof e.getChild && f.push.apply(f, e.getChild()); d || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); e = CKEDITOR.env; g = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',
                            0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', g, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", g); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++; this._.lastTab = c; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey &&
                                (F(this, this, "CTRL+" + a.accessKey, J, H), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                    }
                }, selectPage: function (a) {
                    if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                        for (var c in this._.tabs) { var e = this._.tabs[c][0], g = this._.tabs[c][1]; c != a && (e.removeClass("cke_dialog_tab_selected"), g.hide()); g.setAttribute("aria-hidden", c != a) } var f = this._.tabs[a]; f[0].addClass("cke_dialog_tab_selected"); CKEDITOR.env.ie6Compat ||
                            CKEDITOR.env.ie7Compat ? (b(f[1]), f[1].show(), setTimeout(function () { b(f[1], 1) }, 0)) : f[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                    }
                }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (b) { var c = this._.tabs[b] && this._.tabs[b][0]; c && 1 != this._.pageCount && c.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), c.hide(), this._.pageCount--, this.updateStyle()) }, showPage: function (a) {
                    if (a =
                        this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
                }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() }, setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() },
                enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a, b) { if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new k(this, a, b)); else { this._.focusList.splice(b, 0, new k(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++ } },
                setState: function (a) {
                    if (this.state != a) {
                        this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) { if (!this.parts.spinner) { var b = this.getParentEditor().lang.dir, c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px"; this.parts.spinner = CKEDITOR.document.createElement("div", c); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1) } this.parts.spinner.show(); this.getButton("ok").disable() } else a ==
                            CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable()); this.fire("state", a)
                    }
                }
            }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
                add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop }, isTabEnabled: function (a, b, c) {
                    a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)",
                        "i")))
                }, okButton: function () { var a = function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                    var a = function (a, b) {
                        b = b || {}; return CKEDITOR.tools.extend({
                            id: "cancel", type: "button", label: a.lang.common.cancel,
                            "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() }
                        }, b, !0)
                    }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a
                }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
            }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
            var u = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }, v = function (a, b, c) { for (var e = 0, g; g = a[e]; e++)if (g.id == b || c && g[c] && (g = v(g[c], b, c))) return g; return null }, t = function (a, b, c, e, g) { if (c) { for (var f = 0, d; d = a[f]; f++) { if (d.id == c) return a.splice(f, 0, b), b; if (e && d[e] && (d = t(d[e], b, c, e, !0))) return d } if (g) return null } a.push(b); return b }, B = function (a, b, c) {
                for (var e = 0, g; g = a[e]; e++) {
                    if (g.id == b) return a.splice(e, 1); if (c && g[c] && (g = B(g[c],
                        b, c))) return g
                } return null
            }, x = function (a, b) { this.dialog = a; for (var c = b.contents, g = 0, f; f = c[g]; g++)c[g] = f && new e(a, f); CKEDITOR.tools.extend(this, b) }; x.prototype = { getContents: function (a) { return v(this.contents, a) }, getButton: function (a) { return v(this.buttons, a) }, addContents: function (a, b) { return t(this.contents, a, b) }, addButton: function (a, b) { return t(this.buttons, a, b) }, removeContents: function (a) { B(this.contents, a) }, removeButton: function (a) { B(this.buttons, a) } }; e.prototype = {
                get: function (a) {
                    return v(this.elements,
                        a, "children")
                }, add: function (a, b) { return t(this.elements, a, b, "children") }, remove: function (a) { B(this.elements, a, "children") }
            }; var y, C = {}, z, A = {}, G = function (a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, g = String.fromCharCode(a.data.$.keyCode); (b = A[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + g]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()) }, D = function (a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey,
                e = a.data.$.shiftKey, g = String.fromCharCode(a.data.$.keyCode); (b = A[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + g]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()))
            }, F = function (a, b, c, e, g) { (A[c] || (A[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: g || a.accessKeyUp, keydown: e || a.accessKeyDown }) }, I = function (a) { for (var b in A) { for (var c = A[b], e = c.length - 1; 0 <= e; e--)c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1); 0 === c.length && delete A[b] } }, H = function (a,
                b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) }, J = function () { }; (function () {
                    CKEDITOR.ui.dialog = {
                        uiElement: function (a, b, c, e, g, f, d) {
                            if (!(4 > arguments.length)) {
                                var h = (e.call ? e(b) : e) || "div", k = ["\x3c", h, " "], m = (g && g.call ? g(b) : g) || {}, l = (f && f.call ? f(b) : f) || {}, n = (d && d.call ? d.call(this, a, b) : d) || "", t = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0); l.id = t; var u = {}; b.type && (u["cke_dialog_ui_" +
                                    b.type] = 1); b.className && (u[b.className] = 1); b.disabled && (u.cke_disabled = 1); for (var p = l["class"] && l["class"].split ? l["class"].split(" ") : [], t = 0; t < p.length; t++)p[t] && (u[p[t]] = 1); p = []; for (t in u) p.push(t); l["class"] = p.join(" "); b.title && (l.title = b.title); u = (b.style || "").split(";"); b.align && (p = b.align, m["margin-left"] = "left" == p ? 0 : "auto", m["margin-right"] = "right" == p ? 0 : "auto"); for (t in m) u.push(t + ":" + m[t]); b.hidden && u.push("display:none"); for (t = u.length - 1; 0 <= t; t--)"" === u[t] && u.splice(t, 1); 0 < u.length && (l.style =
                                        (l.style ? l.style + "; " : "") + u.join("; ")); for (t in l) k.push(t + '\x3d"' + CKEDITOR.tools.htmlEncode(l[t]) + '" '); k.push("\x3e", n, "\x3c/", h, "\x3e"); c.push(k.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (c) { a.call(this, b.setValue.call(this, c)) } })); "function" == typeof b.getValue &&
                                            (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && F(this, a, "CTRL+" + b.accessKey); var v = this; a.on("load", function () {
                                                var b = v.getInputElement(); if (b) {
                                                    var c = v.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus", function () {
                                                        a._.tabBarMode = !1; a._.hasFocus = !0; v.fire("focus");
                                                        c && this.addClass(c)
                                                    }); b.on("blur", function () { v.fire("blur"); c && this.removeClass(c) })
                                                }
                                            }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = v.focusIndex }))
                            }
                        }, hbox: function (a, b, c, e, g) {
                            if (!(4 > arguments.length)) {
                                this._ || (this._ = {}); var f = this._.children = b, d = g && g.widths || null, h = g && g.height || null, k, m = { role: "presentation" }; g && g.align && (m.align = g.align); CKEDITOR.ui.dialog.uiElement.call(this,
                                    a, g || { type: "hbox" }, e, "table", {}, m, function () {
                                        var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (k = 0; k < c.length; k++) {
                                            var b = "cke_dialog_ui_hbox_child", e = []; 0 === k && (b = "cke_dialog_ui_hbox_first"); k == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); d ? d[k] && e.push("width:" + r(d[k])) : e.push("width:" + Math.floor(100 / c.length) + "%"); h && e.push("height:" + r(h)); g && void 0 !== g.padding && e.push("padding:" + r(g.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks &&
                                                f[k].align && e.push("text-align:" + f[k].align); 0 < e.length && a.push('style\x3d"' + e.join("; ") + '" '); a.push("\x3e", c[k], "\x3c/td\x3e")
                                        } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                                    })
                            }
                        }, vbox: function (a, b, c, e, g) {
                            if (!(3 > arguments.length)) {
                                this._ || (this._ = {}); var f = this._.children = b, d = g && g.width || null, h = g && g.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, g || { type: "vbox" }, e, "div", null, { role: "presentation" }, function () {
                                    var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
                                    b.push('style\x3d"'); g && g.expand && b.push("height:100%;"); b.push("width:" + r(d || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(g && g.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var e = 0; e < c.length; e++) {
                                        var k = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); d && k.push("width:" + r(d || "100%")); h ? k.push("height:" + r(h[e])) : g && g.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
                                        g && void 0 !== g.padding && k.push("padding:" + r(g.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && f[e].align && k.push("text-align:" + f[e].align); 0 < k.length && b.push('style\x3d"', k.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                                    } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                                })
                            }
                        }
                    }
                })(); CKEDITOR.ui.dialog.uiElement.prototype = {
                    getElement: function () { return CKEDITOR.document.getById(this.domId) }, getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog },
                    setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire("change", { value: a }); return this }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () { for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this }, focus: function () {
                        this.selectParentTab().getInputElement().focus();
                        return this
                    }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, e = function (a, b, c, e) { b.on("load", function () { a.getInputElement().on(c, e, a) }) }, g; for (g in a) if (c = g.match(b)) this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : e(this, this._.dialog, c[1].toLowerCase(), a[g]); return this }, eventProcessors: { onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) { a.on("show", b, this) }, onHide: function (a, b) { a.on("hide", b, this) } }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { },
                    disable: function () { var a = this.getElement(); this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled") }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() }, isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
                }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                    { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                        var a = {
                            build: function (a, b, c) {
                                for (var e = b.children, g, f = [], d = [], h = 0; h < e.length && (g = e[h]); h++) { var k = []; f.push(k); d.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, k)) } return new CKEDITOR.ui.dialog[b.type](a,
                                    d, f, c, b)
                            }
                        }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
                    })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) }, canUndo: !1, editorFocus: 1 }; (function () {
                        var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, g = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                        f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                            functions: function () {
                                var a = arguments; return function () {
                                    var b = this && this.getValue ? this.getValue() : a[0], c, e = CKEDITOR.VALIDATE_AND, g = [], f; for (f = 0; f < a.length; f++)if ("function" == typeof a[f]) g.push(a[f]); else break; f < a.length && "string" == typeof a[f] && (c = a[f], f++); f < a.length && "number" == typeof a[f] && (e = a[f]); var d = e == CKEDITOR.VALIDATE_AND ? !0 : !1; for (f = 0; f < g.length; f++)d = e == CKEDITOR.VALIDATE_AND ? d &&
                                        g[f](b) : d || g[f](b); return d ? !0 : c
                                }
                            }, regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(c, a) }, cssLength: function (a) { return this.functions(function (a) { return g.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                                return this.functions(function (a) { return f.test(CKEDITOR.tools.trim(a)) },
                                    a)
                            }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                        }; CKEDITOR.on("instanceDestroyed", function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (var c in C) C[c].remove(); C = {} } a = a.editor._.storedDialogs; for (var e in a) a[e].destroy() })
                    })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                        openDialog: function (a, b) {
                            var c = null, e = CKEDITOR.dialog._.dialogDefinitions[a];
                            null === CKEDITOR.dialog._.currentTop && p(this); if ("function" == typeof e) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show(); else {
                                if ("failed" == e) throw q(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); "string" == typeof e && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function () {
                                    "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"); this.openDialog(a,
                                        b)
                                }, this, 0, 1)
                            } CKEDITOR.skin.loadPart("dialog"); return c
                        }
                    })
        }(), CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function (a) { a.on("doubleclick", function (d) { d.data.dialog && a.openDialog(d.data.dialog) }, null, null, 999) } }), function () {
            CKEDITOR.plugins.add("a11yhelp", {
                requires: "dialog", availableLangs: {
                    af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1,
                    ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
                }, init: function (a) {
                    var d = this; a.addCommand("a11yHelp", {
                        exec: function () { var b = a.langCode, b = d.availableLangs[b] ? b : d.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d.path + "dialogs/lang/" + b + ".js"), function () { a.lang.a11yhelp = d.langEntries[b]; a.openDialog("a11yHelp") }) }, modes: { wysiwyg: 1, source: 1 },
                        readOnly: 1, canUndo: !1
                    }); a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"); a.on("ariaEditorHelpLabel", function (b) { b.data.label = a.lang.common.editorHelp })
                }
            })
        }(), CKEDITOR.plugins.add("about", {
            requires: "dialog", init: function (a) {
                var d = a.addCommand("about", new CKEDITOR.dialogCommand("about")); d.modes = { wysiwyg: 1, source: 1 }; d.canUndo = !1; d.readOnly = 1; a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.dlgTitle, command: "about", toolbar: "about" });
                CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
            }
        }), CKEDITOR.plugins.add("basicstyles", {
            init: function (a) {
                var d = 0, b = function (b, f, e, h) { if (h) { h = new CKEDITOR.style(h); var g = c[e]; g.unshift(h); a.attachStyleStateChange(h, function (b) { !a.readOnly && a.getCommand(e).setState(b) }); a.addCommand(e, new CKEDITOR.styleCommand(h, { contentForms: g })); a.ui.addButton && a.ui.addButton(b, { label: f, command: e, toolbar: "basicstyles," + (d += 10) }) } }, c = {
                    bold: ["strong", "b", ["span", function (a) {
                        a = a.styles["font-weight"]; return "bold" ==
                            a || 700 <= +a
                    }]], italic: ["em", "i", ["span", function (a) { return "italic" == a.styles["font-style"] }]], underline: ["u", ["span", function (a) { return "underline" == a.styles["text-decoration"] }]], strike: ["s", "strike", ["span", function (a) { return "line-through" == a.styles["text-decoration"] }]], subscript: ["sub"], superscript: ["sup"]
                }, h = a.config, l = a.lang.basicstyles; b("Bold", l.bold, "bold", h.coreStyles_bold); b("Italic", l.italic, "italic", h.coreStyles_italic); b("Underline", l.underline, "underline", h.coreStyles_underline); b("Strike",
                    l.strike, "strike", h.coreStyles_strike); b("Subscript", l.subscript, "subscript", h.coreStyles_subscript); b("Superscript", l.superscript, "superscript", h.coreStyles_superscript); a.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
            }
        }), CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }, CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }, CKEDITOR.config.coreStyles_underline = { element: "u" }, CKEDITOR.config.coreStyles_strike = {
            element: "s",
            overrides: "strike"
        }, CKEDITOR.config.coreStyles_subscript = { element: "sub" }, CKEDITOR.config.coreStyles_superscript = { element: "sup" }, function () {
            function a(a, b, c, e) {
                if (!a.isReadOnly() && !a.equals(c.editable())) {
                    CKEDITOR.dom.element.setMarker(e, a, "bidi_processed", 1); e = a; for (var f = c.editable(); (e = e.getParent()) && !e.equals(f);)if (e.getCustomData("bidi_processed")) { a.removeStyle("direction"); a.removeAttribute("dir"); return } e = "useComputedState" in c.config ? c.config.useComputedState : 1; (e ? a.getComputedStyle("direction") :
                        a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), e ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir", b), c.forceNextSelectionCheck())
                }
            } function d(a, b, c) {
                var e = a.getCommonAncestor(!1, !0); a = a.clone(); a.enlarge(c == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); if (a.checkBoundaryOfElement(e, CKEDITOR.START) && a.checkBoundaryOfElement(e, CKEDITOR.END)) {
                    for (var f; e && e.type == CKEDITOR.NODE_ELEMENT &&
                        (f = e.getParent()) && 1 == f.getChildCount() && !(e.getName() in b);)e = f; return e.type == CKEDITOR.NODE_ELEMENT && e.getName() in b && e
                }
            } function b(b) {
                return {
                    context: "p", allowedContent: { "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": { propertiesOnly: !0, attributes: "dir" } }, requiredContent: "p[dir]", refresh: function (a, b) {
                        var c = a.config.useComputedState, e, c = void 0 === c || c; if (!c) { e = b.lastElement; for (var g = a.editable(); e && !(e.getName() in k || e.equals(g));) { var f = e.getParent(); if (!f) break; e = f } } e = e || b.block ||
                            b.blockLimit; e.equals(a.editable()) && (g = a.getSelection().getRanges()[0].getEnclosedNode()) && g.type == CKEDITOR.NODE_ELEMENT && (e = g); e && (c = c ? e.getComputedStyle("direction") : e.getStyle("direction") || e.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)); c = (b.block || b.blockLimit || a.editable()).getDirection(1); c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged",
                                c))
                    }, exec: function (c) {
                        var e = c.getSelection(), f = c.config.enterMode, k = e.getRanges(); if (k && k.length) {
                            for (var m = {}, u = e.createBookmarks(), k = k.createIterator(), v, t = 0; v = k.getNextRange(1);) {
                                var B = v.getEnclosedNode(); B && (!B || B.type == CKEDITOR.NODE_ELEMENT && B.getName() in l) || (B = d(v, h, f)); B && a(B, b, c, m); var x = new CKEDITOR.dom.walker(v), y = u[t].startNode, C = u[t++].endNode; x.evaluator = function (a) {
                                    var b = f == CKEDITOR.ENTER_P ? "p" : "div", c; if (c = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in h) {
                                        if (b = a.is(b)) b = (b = a.getParent()) ?
                                            b.type == CKEDITOR.NODE_ELEMENT : !1; c = !(b && a.getParent().is("blockquote"))
                                    } return !!(c && a.getPosition(y) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(C) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                                }; for (; B = x.next();)a(B, b, c, m); v = v.createIterator(); for (v.enlargeBr = f != CKEDITOR.ENTER_BR; B = v.getNextParagraph(f == CKEDITOR.ENTER_P ? "p" : "div");)a(B, b, c, m)
                            } CKEDITOR.dom.element.clearAllMarkers(m); c.forceNextSelectionCheck(); e.selectBookmarks(u); c.focus()
                        }
                    }
                }
            } function c(a) {
                var b =
                    a == f.setAttribute, c = a == f.removeAttribute, e = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/; return function (f, d) { if (!this.isReadOnly()) { var h; if (h = f == (b || c ? "dir" : "direction") || "style" == f && (c || e.test(d))) { a: { h = this; for (var k = h.getDocument().getBody().getParent(); h;) { if (h.equals(k)) { h = !1; break a } h = h.getParent() } h = !0 } h = !h } if (h && (h = this.getDirection(1), k = a.apply(this, arguments), h != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), k } return a.apply(this, arguments) }
            } var h = {
                table: 1, ul: 1, ol: 1, blockquote: 1,
                div: 1
            }, l = {}, k = {}; CKEDITOR.tools.extend(l, h, { tr: 1, p: 1, div: 1, li: 1 }); CKEDITOR.tools.extend(k, l, { td: 1 }); CKEDITOR.plugins.add("bidi", {
                init: function (a) {
                    function c(b, e, f, d, h) { a.addCommand(f, new CKEDITOR.command(a, d)); a.ui.addButton && a.ui.addButton(b, { label: e, command: f, toolbar: "bidi," + h }) } if (!a.blockless) {
                        var e = a.lang.bidi; c("BidiLtr", e.ltr, "bidiltr", b("ltr"), 10); c("BidiRtl", e.rtl, "bidirtl", b("rtl"), 20); a.on("contentDom", function () { a.document.on("dirChanged", function (b) { a.fire("dirChanged", { node: b.data, dir: b.data.getDirection(1) }) }) });
                        a.on("contentDirChanged", function (b) { b = (a.lang.dir != b.data ? "add" : "remove") + "Class"; var c = a.ui.space(a.config.toolbarLocation); if (c) c[b]("cke_mixed_dir_content") })
                    }
                }
            }); for (var f = CKEDITOR.dom.element.prototype, e = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], m = 0; m < e.length; m++)f[e[m]] = CKEDITOR.tools.override(f[e[m]], c)
        }(), function () {
            var a = {
                exec: function (a) {
                    var b = a.getCommand("blockquote").state, c = a.getSelection(), h = c && c.getRanges()[0]; if (h) {
                        var l = c.createBookmarks(); if (CKEDITOR.env.ie) {
                            var k =
                                l[0].startNode, f = l[0].endNode, e; if (k && "blockquote" == k.getParent().getName()) for (e = k; e = e.getNext();)if (e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) { k.move(e, !0); break } if (f && "blockquote" == f.getParent().getName()) for (e = f; e = e.getPrevious();)if (e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) { f.move(e); break }
                        } var m = h.createIterator(); m.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR; if (b == CKEDITOR.TRISTATE_OFF) {
                            for (k = []; b = m.getNextParagraph();)k.push(b); 1 > k.length && (b = a.document.createElement(a.config.enterMode ==
                                CKEDITOR.ENTER_P ? "p" : "div"), f = l.shift(), h.insertNode(b), b.append(new CKEDITOR.dom.text("﻿", a.document)), h.moveToBookmark(f), h.selectNodeContents(b), h.collapse(!0), f = h.createBookmark(), k.push(b), l.unshift(f)); e = k[0].getParent(); h = []; for (f = 0; f < k.length; f++)b = k[f], e = e.getCommonAncestor(b.getParent()); for (b = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; b[e.getName()];)e = e.getParent(); for (f = null; 0 < k.length;) { for (b = k.shift(); !b.getParent().equals(e);)b = b.getParent(); b.equals(f) || h.push(b); f = b } for (; 0 < h.length;)if (b =
                                    h.shift(), "blockquote" == b.getName()) { for (f = new CKEDITOR.dom.documentFragment(a.document); b.getFirst();)f.append(b.getFirst().remove()), k.push(f.getLast()); f.replace(b) } else k.push(b); h = a.document.createElement("blockquote"); for (h.insertBefore(k[0]); 0 < k.length;)b = k.shift(), h.append(b)
                        } else if (b == CKEDITOR.TRISTATE_ON) {
                            f = []; for (e = {}; b = m.getNextParagraph();) {
                                for (k = h = null; b.getParent();) { if ("blockquote" == b.getParent().getName()) { h = b.getParent(); k = b; break } b = b.getParent() } h && k && !k.getCustomData("blockquote_moveout") &&
                                    (f.push(k), CKEDITOR.dom.element.setMarker(e, k, "blockquote_moveout", !0))
                            } CKEDITOR.dom.element.clearAllMarkers(e); b = []; k = []; for (e = {}; 0 < f.length;)m = f.shift(), h = m.getParent(), m.getPrevious() ? m.getNext() ? (m.breakParent(m.getParent()), k.push(m.getNext())) : m.remove().insertAfter(h) : m.remove().insertBefore(h), h.getCustomData("blockquote_processed") || (k.push(h), CKEDITOR.dom.element.setMarker(e, h, "blockquote_processed", !0)), b.push(m); CKEDITOR.dom.element.clearAllMarkers(e); for (f = k.length - 1; 0 <= f; f--) {
                                h = k[f];
                                a: { e = h; for (var m = 0, g = e.getChildCount(), n = void 0; m < g && (n = e.getChild(m)); m++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) { e = !1; break a } e = !0 } e && h.remove()
                            } if (a.config.enterMode == CKEDITOR.ENTER_BR) for (h = !0; b.length;)if (m = b.shift(), "div" == m.getName()) {
                                f = new CKEDITOR.dom.documentFragment(a.document); !h || !m.getPrevious() || m.getPrevious().type == CKEDITOR.NODE_ELEMENT && m.getPrevious().isBlockBoundary() || f.append(a.document.createElement("br")); for (h = m.getNext() && !(m.getNext().type == CKEDITOR.NODE_ELEMENT &&
                                    m.getNext().isBlockBoundary()); m.getFirst();)m.getFirst().remove().appendTo(f); h && f.append(a.document.createElement("br")); f.replace(m); h = !1
                            }
                        } c.selectBookmarks(l); a.focus()
                    }
                }, refresh: function (a, b) { this.setState(a.elementPath(b.block || b.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
            }; CKEDITOR.plugins.add("blockquote", {
                init: function (d) {
                    d.blockless || (d.addCommand("blockquote", a), d.ui.addButton &&
                        d.ui.addButton("Blockquote", { label: d.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" }))
                }
            })
        }(), "use strict", function () {
            function a(a, c) { CKEDITOR.tools.extend(this, c, { editor: a, id: "cke-" + CKEDITOR.tools.getUniqueId(), area: a._.notificationArea }); c.type || (this.type = "info"); this.element = this._createElement(); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element) } function d(a) {
                var c = this; this.editor = a; this.notifications = []; this.element = this._createElement();
                this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this); a.on("destroy", function () { c._removeListeners(); c.element.remove() })
            } CKEDITOR.plugins.add("notification", {
                init: function (a) {
                    function c(a) {
                        var b = new CKEDITOR.dom.element("div"); b.setStyles({ position: "fixed", "margin-left": "-9999px" }); b.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); b.setText(a); CKEDITOR.document.getBody().append(b); setTimeout(function () { b.remove() },
                            100)
                    } a._.notificationArea = new d(a); a.showNotification = function (c, d, k) { var f, e; "progress" == d ? f = k : e = k; c = new CKEDITOR.plugins.notification(a, { message: c, type: d, progress: f, duration: e }); c.show(); return c }; a.on("key", function (d) { if (27 == d.data.keyCode) { var l = a._.notificationArea.notifications; l.length && (c(a.lang.notification.closed), l[l.length - 1].hide(), d.cancel()) } })
                }
            }); a.prototype = {
                show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) },
                update: function (a) {
                    var c = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: a }) && (c = !1); var d = this.element, l = d.findOne(".cke_notification_message"), k = d.findOne(".cke_notification_progress"), f = a.type; d.removeAttribute("role"); a.progress && "progress" != this.type && (f = "progress"); f && (d.removeClass(this._getClass()), d.removeAttribute("aria-label"), this.type = f, d.addClass(this._getClass()), d.setAttribute("aria-label", this.type), "progress" != this.type || k ? "progress" != this.type && k && k.remove() :
                        (k = this._createProgressElement(), k.insertBefore(l))); void 0 !== a.message && (this.message = a.message, l.setHtml(this.message)); void 0 !== a.progress && (this.progress = a.progress, k && k.setStyle("width", this._getPercentageProgress())); c && a.important && (d.setAttribute("role", "alert"), this.isVisible() || this.area.add(this)); this.duration = a.duration; this._hideAfterTimeout()
                }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () {
                    return 0 <= CKEDITOR.tools.indexOf(this.area.notifications,
                        this)
                }, _createElement: function () {
                    var a = this, c, d, l = this.editor.lang.common.close; c = new CKEDITOR.dom.element("div"); c.addClass("cke_notification"); c.addClass(this._getClass()); c.setAttributes({ id: this.id, role: "alert", "aria-label": this.type }); "progress" == this.type && c.append(this._createProgressElement()); d = new CKEDITOR.dom.element("p"); d.addClass("cke_notification_message"); d.setHtml(this.message); c.append(d); d = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' +
                        l + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); c.append(d); d.on("click", function () { a.editor.focus(); a.hide() }); return c
                }, _getClass: function () { return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type }, _createProgressElement: function () { var a = new CKEDITOR.dom.element("span"); a.addClass("cke_notification_progress"); a.setStyle("width", this._getPercentageProgress()); return a }, _getPercentageProgress: function () {
                    return Math.round(100 *
                        (this.progress || 0)) + "%"
                }, _hideAfterTimeout: function () { var a = this, c; this._hideTimeoutId && clearTimeout(this._hideTimeoutId); if ("number" == typeof this.duration) c = this.duration; else if ("info" == this.type || "success" == this.type) c = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; c && (a._hideTimeoutId = setTimeout(function () { a.hide() }, c)) }
            }; d.prototype = {
                add: function (a) {
                    this.notifications.push(a); this.element.append(a.element); 1 == this.element.getChildCount() &&
                        (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout()
                }, remove: function (a) { var c = CKEDITOR.tools.indexOf(this.notifications, a); 0 > c || (this.notifications.splice(c, 1), a.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove())) }, _createElement: function () {
                    var a = this.editor, c = a.config, d = new CKEDITOR.dom.element("div"); d.addClass("cke_notifications_area"); d.setAttribute("id", "cke_notifications_area_" + a.name); d.setStyle("z-index", c.baseFloatZIndex -
                        2); return d
                }, _attachListeners: function () { var a = CKEDITOR.document.getWindow(), c = this.editor; a.on("scroll", this._uiBuffer.input); a.on("resize", this._uiBuffer.input); c.on("change", this._changeBuffer.input); c.on("floatingSpaceLayout", this._layout, this, null, 20); c.on("blur", this._layout, this, null, 20) }, _removeListeners: function () {
                    var a = CKEDITOR.document.getWindow(), c = this.editor; a.removeListener("scroll", this._uiBuffer.input); a.removeListener("resize", this._uiBuffer.input); c.removeListener("change", this._changeBuffer.input);
                    c.removeListener("floatingSpaceLayout", this._layout); c.removeListener("blur", this._layout)
                }, _layout: function () {
                    function a() { c.setStyle("left", v(t + l.width - n - p)) } var c = this.element, d = this.editor, l = d.ui.contentsElement.getClientRect(), k = d.ui.contentsElement.getDocumentPosition(), f, e, m = c.getClientRect(), g, n = this._notificationWidth, p = this._notificationMargin; g = CKEDITOR.document.getWindow(); var q = g.getScrollPosition(), r = g.getViewPaneSize(), w = CKEDITOR.document.getBody(), u = w.getDocumentPosition(), v = CKEDITOR.tools.cssLength;
                    n && p || (g = this.element.getChild(0), n = this._notificationWidth = g.getClientRect().width, p = this._notificationMargin = parseInt(g.getComputedStyle("margin-left"), 10) + parseInt(g.getComputedStyle("margin-right"), 10)); d.toolbar && (f = d.ui.space("top"), e = f.getClientRect()); f && f.isVisible() && e.bottom > l.top && e.bottom < l.bottom - m.height ? c.setStyles({ position: "fixed", top: v(e.bottom) }) : 0 < l.top ? c.setStyles({ position: "absolute", top: v(k.y) }) : k.y + l.height - m.height > q.y ? c.setStyles({ position: "fixed", top: 0 }) : c.setStyles({
                        position: "absolute",
                        top: v(k.y + l.height - m.height)
                    }); var t = "fixed" == c.getStyle("position") ? l.left : "static" != w.getComputedStyle("position") ? k.x - u.x : k.x; l.width < n + p ? k.x + n + p > q.x + r.width ? a() : c.setStyle("left", v(t)) : k.x + n + p > q.x + r.width ? c.setStyle("left", v(t)) : k.x + l.width / 2 + n / 2 + p > q.x + r.width ? c.setStyle("left", v(t - k.x + q.x + r.width - n - p)) : 0 > l.left + l.width - n - p ? a() : 0 > l.left + l.width / 2 - n / 2 ? c.setStyle("left", v(t - k.x + q.x)) : c.setStyle("left", v(t + l.width / 2 - n / 2 - p / 2))
                }
            }; CKEDITOR.plugins.notification = a
        }(), function () {
            var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' +
                (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' +
                    (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'), a = a + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
                    d = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), b = CKEDITOR.addTemplate("button", a); CKEDITOR.plugins.add("button", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } };
            CKEDITOR.ui.button.prototype = {
                render: function (a, h) {
                    function l() { var b = a.mode; b && (b = this.modes[b] ? void 0 !== v[b] ? v[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh()) } var k = CKEDITOR.env, f = this._.id = CKEDITOR.tools.getNextId(), e = "", m = this.command, g, n, p; this._.editor = a; var q = { id: f, button: this, editor: a, focus: function () { CKEDITOR.document.getById(f).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } },
                        r = CKEDITOR.tools.addFunction(function (a) { if (q.onkey) return a = new CKEDITOR.dom.event(a), !1 !== q.onkey(q, a.getKeystroke()) }), w = CKEDITOR.tools.addFunction(function (a) { var b; q.onfocus && (b = !1 !== q.onfocus(q, new CKEDITOR.dom.event(a))); return b }), u = 0; q.clickFn = g = CKEDITOR.tools.addFunction(function () { u && (a.unlockSelection(1), u = 0); q.execute(); k.iOS && a.focus() }); if (this.modes) {
                            var v = {}; a.on("beforeModeUnload", function () { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (v[a.mode] = this._.state) }, this); a.on("activeFilterChange",
                                l, this); a.on("mode", l, this); !this.readOnly && a.on("readOnly", l, this)
                        } else m && (m = a.getCommand(m)) && (m.on("state", function () { this.setState(m.state) }, this), e += m.state == CKEDITOR.TRISTATE_ON ? "on" : m.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); if (this.directional) a.on("contentDirChanged", function (b) {
                            var e = CKEDITOR.document.getById(this._.id), g = e.getFirst(); b = b.data; b != a.lang.dir ? e.addClass("cke_" + b) : e.removeClass("cke_ltr").removeClass("cke_rtl"); g.setAttribute("style", CKEDITOR.skin.getIconStyle(t,
                                "rtl" == b, this.icon, this.iconOffset))
                        }, this); m ? (n = a.getCommandKeystroke(m)) && (p = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, n)) : e += "off"; var t = n = this.name || this.command; this.icon && !/\./.test(this.icon) && (t = this.icon, this.icon = null); e = {
                            id: f, name: n, iconName: t, label: this.label, cls: this.className || "", state: e, ariaDisabled: "disabled" == e ? "true" : "false", title: this.title + (p ? " (" + p.display + ")" : ""), ariaShortcut: p ? a.lang.common.keyboardShortcut + " " + p.aria : "", titleJs: k.gecko && !k.hc ? "" : (this.title ||
                                "").replace("'", ""), hasArrow: this.hasArrow ? "true" : "false", keydownFn: r, focusFn: w, clickFn: g, style: CKEDITOR.skin.getIconStyle(t, "rtl" == a.lang.dir, this.icon, this.iconOffset), arrowHtml: this.hasArrow ? d.output() : ""
                        }; b.output(e, h); if (this.onRender) this.onRender(); return q
                }, setState: function (a) {
                    if (this._.state == a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id); return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"),
                        this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
                }, getState: function () { return this._.state }, toFeature: function (a) {
                    if (this._.feature) return this._.feature; var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature =
                        b
                }
            }; CKEDITOR.ui.prototype.addButton = function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
        }(), function () {
            function a(a) {
                function b() { for (var e = c(), g = CKEDITOR.tools.clone(a.config.toolbarGroups) || d(a), m = 0; m < g.length; m++) { var l = g[m]; if ("/" != l) { "string" == typeof l && (l = g[m] = { name: l }); var w, u = l.groups; if (u) for (var v = 0; v < u.length; v++)w = u[v], (w = e[w]) && f(l, w); (w = e[l.name]) && f(l, w) } } return g } function c() {
                    var b = {}, e, g, f; for (e in a.ui.items) g = a.ui.items[e], f = g.toolbar || "others", f = f.split(","), g = f[0], f = parseInt(f[1] ||
                        -1, 10), b[g] || (b[g] = []), b[g].push({ name: e, order: f }); for (g in b) b[g] = b[g].sort(function (a, b) { return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1 }); return b
                } function f(b, c) { if (c.length) { b.items ? b.items.push(a.ui.create("-")) : b.items = []; for (var e; e = c.shift();)e = "string" == typeof e ? e : e.name, m && -1 != CKEDITOR.tools.indexOf(m, e) || (e = a.ui.create(e)) && a.addFeature(e) && b.items.push(e) } } function e(a) {
                    var b = [], c, e, g; for (c = 0; c < a.length; ++c)e = a[c], g = {}, "/" == e ? b.push(e) : CKEDITOR.tools.isArray(e) ?
                        (f(g, CKEDITOR.tools.clone(e)), b.push(g)) : e.items && (f(g, CKEDITOR.tools.clone(e.items)), g.name = e.name, b.push(g)); return b
                } var m = a.config.removeButtons, m = m && m.split(","), g = a.config.toolbar; "string" == typeof g && (g = a.config["toolbar_" + g]); return a.toolbar = g ? e(g) : b()
            } function d(a) {
                return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/",
                { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
            } var b = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; b.prototype.focus = function () { for (var a = 0, b; b = this.toolbars[a++];)for (var c = 0, f; f = b.items[c++];)if (f.focus) { f.focus(); return } }; var c = {
                modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) {
                    a.toolbox && (a.toolbox.focusCommandExecuted =
                        !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () { a.toolbox.focus() }, 100) : a.toolbox.focus())
                }
            }; CKEDITOR.plugins.add("toolbar", {
                requires: "button", init: function (d) {
                    var l, k = function (a, b) {
                        var c, g = "rtl" == d.lang.dir, n = d.config.toolbarGroupCycling, p = g ? 37 : 39, g = g ? 39 : 37, n = void 0 === n || n; switch (b) {
                            case 9: case CKEDITOR.SHIFT + 9: for (; !c || !c.items.length;)if (c = 9 == b ? (c ? c.next : a.toolbar.next) || d.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) || d.toolbox.toolbars[d.toolbox.toolbars.length - 1], c.items.length) for (a =
                                c.items[l ? c.items.length - 1 : 0]; a && !a.focus;)(a = l ? a.previous : a.next) || (c = 0); a && a.focus(); return !1; case p: c = a; do c = c.next, !c && n && (c = a.toolbar.items[0]); while (c && !c.focus); c ? c.focus() : k(a, 9); return !1; case 40: return a.button && a.button.hasArrow ? a.execute() : k(a, 40 == b ? p : g), !1; case g: case 38: c = a; do c = c.previous, !c && n && (c = a.toolbar.items[a.toolbar.items.length - 1]); while (c && !c.focus); c ? c.focus() : (l = 1, k(a, CKEDITOR.SHIFT + 9), l = 0); return !1; case 27: return d.focus(), !1; case 13: case 32: return a.execute(), !1
                        }return !0
                    };
                    d.on("uiSpace", function (c) {
                        if (c.data.space == d.config.toolbarLocation) {
                            c.removeListener(); d.toolbox = new b; var e = CKEDITOR.tools.getNextId(), m = ['\x3cspan id\x3d"', e, '" class\x3d"cke_voice_label"\x3e', d.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + d.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', e, '" onmousedown\x3d"return false;"\x3e'], e = !1 !== d.config.toolbarStartupExpanded, g, l; d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE &&
                                m.push('\x3cspan class\x3d"cke_toolbox_main"' + (e ? "\x3e" : ' style\x3d"display:none"\x3e')); for (var p = d.toolbox.toolbars, q = a(d), r = q.length, w = 0; w < r; w++) {
                                    var u, v = 0, t, B = q[w], x = "/" !== B && ("/" === q[w + 1] || w == r - 1), y; if (B) if (g && (m.push("\x3c/span\x3e"), l = g = 0), "/" === B) m.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                        y = B.items || B; for (var C = 0; C < y.length; C++) {
                                            var z = y[C], A; if (z) {
                                                var G = function (a) {
                                                    a = a.render(d, m); D = v.items.push(a) - 1; 0 < D && (a.previous = v.items[D - 1], a.previous.next = a); a.toolbar = v; a.onkey =
                                                        k; a.onfocus = function () { d.toolbox.focusCommandExecuted || d.focus() }
                                                }; if (z.type == CKEDITOR.UI_SEPARATOR) l = g && z; else {
                                                    A = !1 !== z.canGroup; if (!v) {
                                                        u = CKEDITOR.tools.getNextId(); v = { id: u, items: [] }; t = B.name && (d.lang.toolbar.toolbarGroups[B.name] || B.name); m.push('\x3cspan id\x3d"', u, '" class\x3d"cke_toolbar' + (x ? ' cke_toolbar_last"' : '"'), t ? ' aria-labelledby\x3d"' + u + '_label"' : "", ' role\x3d"toolbar"\x3e'); t && m.push('\x3cspan id\x3d"', u, '_label" class\x3d"cke_voice_label"\x3e', t, "\x3c/span\x3e"); m.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
                                                        var D = p.push(v) - 1; 0 < D && (v.previous = p[D - 1], v.previous.next = v)
                                                    } A ? g || (m.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), g = 1) : g && (m.push("\x3c/span\x3e"), g = 0); l && (G(l), l = 0); G(z)
                                                }
                                            }
                                        } g && (m.push("\x3c/span\x3e"), l = g = 0); v && m.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                    }
                                } d.config.toolbarCanCollapse && m.push("\x3c/span\x3e"); if (d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                    var F = CKEDITOR.tools.addFunction(function () { d.execCommand("toolbarCollapse") });
                                    d.on("destroy", function () { CKEDITOR.tools.removeFunction(F) }); d.addCommand("toolbarCollapse", {
                                        readOnly: 1, exec: function (a) {
                                            var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), e = a.ui.space("contents"), g = c.getParent(), f = parseInt(e.$.style.height, 10), d = g.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min"); h ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
                                            b.getFirst().setText(h ? "▲" : "◀"); e.setStyle("height", f - (g.$.offsetHeight - d) + "px"); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: e.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                        }, modes: { wysiwyg: 1, source: 1 }
                                    }); d.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); m.push('\x3ca title\x3d"' + (e ? d.lang.toolbar.toolbarCollapse : d.lang.toolbar.toolbarExpand) + '" id\x3d"' + d.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                                    e || m.push(" cke_toolbox_collapser_min"); m.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + F + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                                } m.push("\x3c/span\x3e"); c.data.html += m.join("")
                        }
                    }); d.on("destroy", function () { if (this.toolbox) { var a, b = 0, c, g, d; for (a = this.toolbox.toolbars; b < a.length; b++)for (g = a[b].items, c = 0; c < g.length; c++)d = g[c], d.clickFn && CKEDITOR.tools.removeFunction(d.clickFn), d.keyDownFn && CKEDITOR.tools.removeFunction(d.keyDownFn) } }); d.on("uiReady", function () {
                        var a =
                            d.ui.space("toolbox"); a && d.focusManager.add(a, 1)
                    }); d.addCommand("toolbarFocus", c); d.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); d.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); d.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, b) { b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
                }
            }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, b, c) {
                var f = d(this.editor), e = 0 === b, m = { name: a }; if (c) {
                    if (c = CKEDITOR.tools.search(f, function (a) {
                        return a.name ==
                            c
                    })) { !c.groups && (c.groups = []); if (b && (b = CKEDITOR.tools.indexOf(c.groups, b), 0 <= b)) { c.groups.splice(b + 1, 0, a); return } e ? c.groups.splice(0, 0, a) : c.groups.push(a); return } b = null
                } b && (b = CKEDITOR.tools.indexOf(f, function (a) { return a.name == b })); e ? f.splice(0, 0, a) : "number" == typeof b ? f.splice(b + 1, 0, m) : f.push(a)
            }
        }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", "use strict", function () {
            function a(a, b, c) {
                b.type || (b.type = "auto"); if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
                b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus() }); return a.fire("paste", b)
            } function d(b) {
                function c() {
                    var a = b.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) { var e = function (a) { b.readOnly && "cut" == a.name || A.initPasteDataTransfer(a, b); a.data.preventDefault() }; a.on("copy", e); a.on("cut", e); a.on("cut", function () { b.readOnly || b.extractSelectedHtml() }, null, null, 999) } a.on(A.mainPasteEvent, function (a) {
                        "beforepaste" ==
                        A.mainPasteEvent && G || y(a)
                    }); "beforepaste" == A.mainPasteEvent && (a.on("paste", function (a) { D || (d(), a.data.preventDefault(), y(a), k("paste")) }), a.on("contextmenu", h, null, null, 0), a.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || h() }, null, null, 0)); a.on("beforecut", function () { !G && m(b) }); var f; a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function () { f = setTimeout(function () { C() }, 0) }); b.on("destroy", function () { clearTimeout(f) }); a.on("keyup", C)
                } function e(a) {
                    return {
                        type: a,
                        canUndo: "cut" == a, startDisabled: !0, fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { "cut" == this.type && m(); var a; var c = this.type; if (CKEDITOR.env.ie) a = k(c); else try { a = b.document.$.execCommand(c, !1, null) } catch (e) { a = !1 } a || b.showNotification(b.lang.clipboard[this.type + "Error"]); return a }
                    }
                } function f() {
                    return {
                        canUndo: !1, async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (b, c) {
                            function e(c, d) {
                                d = "undefined" !== typeof d ? d : !0; c ? (c.method = "paste", c.dataTransfer || (c.dataTransfer = A.initPasteDataTransfer()),
                                    a(b, c, d)) : f && b.showNotification(k, "info", b.config.clipboard_notificationDuration); b.fire("afterCommandExec", { name: "paste", command: g, returnValue: !!c })
                            } c = "undefined" !== typeof c && null !== c ? c : {}; var g = this, f = "undefined" !== typeof c.notification ? c.notification : !0, d = c.type, h = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)), k = "string" === typeof f ? f : b.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + h.aria + '"\x3e' + h.display + "\x3c/kbd\x3e"), h = "string" ===
                                typeof c ? c : c.dataValue; d ? b._.nextPasteType = d : delete b._.nextPasteType; "string" === typeof h ? e({ dataValue: h }) : b.getClipboardData(e)
                        }
                    }
                } function d() { D = 1; setTimeout(function () { D = 0 }, 100) } function h() { G = 1; setTimeout(function () { G = 0 }, 10) } function k(a) { var c = b.document, e = c.getBody(), f = !1, d = function () { f = !0 }; e.on(a, d); 7 < CKEDITOR.env.version ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a); e.removeListener(a, d); return f } function m() {
                    if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                        var a = b.getSelection(),
                        c, e, f; a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (e = a.getRanges()[0], f = b.document.createText(""), f.insertBefore(c), e.setStartBefore(f), e.setEndAfter(c), a.selectRanges([e]), setTimeout(function () { c.getParent() && (f.remove(), a.selectElement(c)) }, 0))
                    }
                } function l(a, c) {
                    var e = b.document, f = b.editable(), d = function (a) { a.cancel() }, h; if (!e.getById("cke_pastebin")) {
                        var k = b.getSelection(), m = k.createBookmarks(); CKEDITOR.env.ie && k.root.fire("selectionchange"); var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit &&
                            !f.is("body") || CKEDITOR.env.ie ? "div" : "body", e); n.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var t = 0, e = e.getWindow(); CKEDITOR.env.webkit ? (f.append(n), n.addClass("cke_editable"), f.is("body") || (t = "static" != f.getComputedStyle("position") ? f : CKEDITOR.dom.element.get(f.$.offsetParent), t = t.getDocumentPosition().y)) : f.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(n); n.setStyles({
                                position: "absolute", top: e.getScrollPosition().y - t + 10 + "px", width: "1px", height: Math.max(1, e.getViewPaneSize().height -
                                    20) + "px", overflow: "hidden", margin: 0, padding: 0
                            }); CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (t = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px"); b.on("selectionChange", d, null, null, 0); if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) h = f.once("blur", d, null, null, -100); t && n.focus(); t = new CKEDITOR.dom.range(n); t.selectNodeContents(n); var u = t.select(); CKEDITOR.env.ie &&
                                (h = f.once("blur", function () { b.lockSelection(u) })); var v = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () { CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = v); h && h.removeListener(); CKEDITOR.env.ie && f.focus(); k.selectBookmarks(m); n.remove(); var a; CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") && (n = a); b.removeListener("selectionChange", d); c(n.getHtml()) }, 0)
                    }
                } function B() {
                    if ("paste" == A.mainPasteEvent) return b.fire("beforePaste", {
                        type: "auto",
                        method: "paste"
                    }), !1; b.focus(); d(); var a = b.focusManager; a.lock(); if (b.editable().fire(A.mainPasteEvent) && !k("paste")) return a.unlock(), !1; a.unlock(); return !0
                } function x(a) { if ("wysiwyg" == b.mode) switch (a.data.keyCode) { case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: a = b.editable(); d(); "paste" == A.mainPasteEvent && a.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT + 46: b.fire("saveSnapshot"), setTimeout(function () { b.fire("saveSnapshot") }, 50) } } function y(c) {
                    var e = {
                        type: "auto", method: "paste",
                        dataTransfer: A.initPasteDataTransfer(c)
                    }; e.dataTransfer.cacheData(); var f = !1 !== b.fire("beforePaste", e); f && A.canClipboardApiBeTrusted(e.dataTransfer, b) ? (c.data.preventDefault(), setTimeout(function () { a(b, e) }, 0)) : l(c, function (c) { e.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ""); f && a(b, e) })
                } function C() { if ("wysiwyg" == b.mode) { var a = z("paste"); b.getCommand("cut").setState(z("cut")); b.getCommand("copy").setState(z("copy")); b.getCommand("paste").setState(a); b.fire("pasteState", a) } } function z(a) {
                    if (F &&
                        a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == a) return CKEDITOR.TRISTATE_OFF; a = b.getSelection(); var c = a.getRanges(); return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
                } var A = CKEDITOR.plugins.clipboard, G = 0, D = 0, F = 0; (function () {
                    b.on("key", x); b.on("contentDom", c); b.on("selectionChange", function (a) { F = a.data.selection.getRanges()[0].checkReadOnly(); C() }); b.contextMenu && b.contextMenu.addListener(function (a, b) {
                        F = b.getRanges()[0].checkReadOnly();
                        return { cut: z("cut"), copy: z("copy"), paste: z("paste") }
                    })
                })(); (function () { function a(c, e, f, d, h) { var k = b.lang.clipboard[e]; b.addCommand(e, f); b.ui.addButton && b.ui.addButton(c, { label: k, command: e, toolbar: "clipboard," + d }); b.addMenuItems && b.addMenuItem(e, { label: k, command: e, group: "clipboard", order: h }) } a("Cut", "cut", e("cut"), 10, 1); a("Copy", "copy", e("copy"), 20, 4); a("Paste", "paste", f(), 30, 8) })(); b.getClipboardData = function (a, c) {
                    function e(a) { a.removeListener(); a.cancel(); c(a.data) } c || (c = a, a = null); b.on("paste",
                        e, null, null, 0); !1 === B() && (b.removeListener("paste", e), c(null))
                }
            } function b(a) { if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html"; return "htmlifiedtext" } function c(a, b) {
                function c(a) {
                    return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",
                        ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
                } b = b.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) {
                    return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length +
                        1)
                }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return c(a.length / 4) }) + "\x3c/p\x3e")); return k(a, b)
            } function h() {
                function a() { var b = {}, c; for (c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" != c && (b[c] = 1); return b } var b = {}; return {
                    get: function (c) {
                        return "plain-text" ==
                            c ? b.plainText || (b.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = b.semanticContent) || (c = new CKEDITOR.filter, c.allow({ $1: { elements: a(), attributes: !0, styles: !1, classes: !1 } }), c = b.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null
                    }
                }
            } function l(a, b, c) { b = CKEDITOR.htmlParser.fragment.fromHtml(b); var e = new CKEDITOR.htmlParser.basicWriter; c.applyTo(b, !0, !1, a.activeEnterMode); b.writeHtml(e); return e.getHtml() } function k(a, b) {
                a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) {
                    return CKEDITOR.tools.repeat("\x3cbr\x3e",
                        a.length / 7 * 2)
                }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b
            } function f(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function e(b) {
                var c = CKEDITOR.plugins.clipboard; b.on("contentDom", function () {
                    function e(c, f, d) { f.select(); a(b, { dataTransfer: d, method: "drop" }, 1); d.sourceEditor.fire("saveSnapshot"); d.sourceEditor.editable().extractHtmlFromRange(c); d.sourceEditor.getSelection().selectRanges([c]); d.sourceEditor.fire("saveSnapshot") }
                    function f(e, d) { e.select(); a(b, { dataTransfer: d, method: "drop" }, 1); c.resetDragDataTransfer() } function d(a, c, e) { var f = { $: a.data.$, target: a.data.getTarget() }; c && (f.dragRange = c); e && (f.dropRange = e); !1 === b.fire(a.name, f) && a.data.preventDefault() } function h(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() } var k = b.editable(), m = CKEDITOR.plugins.clipboard.getDropTarget(b), l = b.ui.space("top"), B = b.ui.space("bottom"); c.preventDefaultDropOnElement(l); c.preventDefaultDropOnElement(B);
                    k.attachListener(m, "dragstart", d); k.attachListener(b, "dragstart", c.resetDragDataTransfer, c, null, 1); k.attachListener(b, "dragstart", function (a) { c.initDragDataTransfer(a, b) }, null, null, 2); k.attachListener(b, "dragstart", function () { var a = c.dragRange = b.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c.dragStartContainerChildCount = a ? h(a.startContainer) : null, c.dragEndContainerChildCount = a ? h(a.endContainer) : null) }, null, null, 100); k.attachListener(m, "dragend", d); k.attachListener(b, "dragend",
                        c.initDragDataTransfer, c, null, 1); k.attachListener(b, "dragend", c.resetDragDataTransfer, c, null, 100); k.attachListener(m, "dragover", function (a) { if (CKEDITOR.env.edge) a.data.preventDefault(); else { var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault() } }); k.attachListener(m, "drop", function (a) {
                            if (!a.data.$.defaultPrevented) {
                                a.data.preventDefault(); var e = a.data.getTarget();
                                if (!e.isReadOnly() || e.type == CKEDITOR.NODE_ELEMENT && e.is("html")) { var e = c.getRangeAtDropPosition(a, b), f = c.dragRange; e && d(a, f, e) }
                            }
                        }, null, null, 9999); k.attachListener(b, "drop", c.initDragDataTransfer, c, null, 1); k.attachListener(b, "drop", function (a) { if (a = a.data) { var d = a.dropRange, h = a.dragRange, k = a.dataTransfer; k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () { c.internalDrop(h, d, k, b) }, 0) : k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? e(h, d, k) : f(d, k) } }, null, null, 9999)
                })
            }
            var m; CKEDITOR.plugins.add("clipboard", {
                requires: "notification,toolbar", init: function (a) {
                    var f, k = h(); a.config.forcePasteAsPlainText ? f = "plain-text" : a.config.pasteFilter ? f = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (f = "semantic-content"); a.pasteFilter = k.get(f); d(a); e(a); if (CKEDITOR.env.gecko) {
                        var m = ["image/png", "image/jpeg", "image/gif"], r; a.on("paste", function (b) {
                            var c = b.data, e = c.dataTransfer; if (!c.dataValue && "paste" == c.method && e && 1 == e.getFilesCount() && r != e.id && (e = e.getFile(0),
                                -1 != CKEDITOR.tools.indexOf(m, e.type))) { var f = new FileReader; f.addEventListener("load", function () { b.data.dataValue = '\x3cimg src\x3d"' + f.result + '" /\x3e'; a.fire("paste", b.data) }, !1); f.addEventListener("abort", function () { a.fire("paste", b.data) }, !1); f.addEventListener("error", function () { a.fire("paste", b.data) }, !1); f.readAsDataURL(e); r = c.dataTransfer.id; b.stop() }
                        }, null, null, 1)
                    } a.on("paste", function (b) {
                        b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!b.data.dataValue) {
                            var c =
                                b.data.dataTransfer, e = c.getData("text/html"); if (e) b.data.dataValue = e, b.data.type = "html"; else if (e = c.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(e), b.data.type = "text"
                        }
                    }, null, null, 1); a.on("paste", function (a) {
                        var b = a.data.dataValue, c = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) {
                            return b.replace(/\t/g,
                                "\x26nbsp;\x26nbsp; \x26nbsp;")
                        })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")); if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                            var e, f, g = new CKEDITOR.dom.element("div"); for (g.setHtml(b); 1 == g.getChildCount() && (e = g.getFirst()) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasClass("cke_editable") || e.hasClass("cke_contents"));)g = f = e;
                            f && (b = f.getHtml().replace(/<br>$/i, ""))
                        } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, e) { return e.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + e) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, e) { return e in c ? (a.data.endsWithEOL = 1, "\x3c/" + e + "\x3e") : b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                    }, null, null, 3); a.on("paste", function (e) {
                        e = e.data; var f = a._.nextPasteType || e.type, d = e.dataValue, h, m = a.config.clipboard_defaultContentType ||
                            "html", n = e.dataTransfer.getTransferType(a); h = "html" == f || "html" == e.preSniffing ? "html" : b(d); delete a._.nextPasteType; "htmlifiedtext" == h && (d = c(a.config, d)); "text" == f && "html" == h ? d = l(a, d, k.get("plain-text")) : n == CKEDITOR.DATA_TRANSFER_EXTERNAL && a.pasteFilter && !e.dontFilter && (d = l(a, d, a.pasteFilter)); e.startsWithEOL && (d = '\x3cbr data-cke-eol\x3d"1"\x3e' + d); e.endsWithEOL && (d += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" == f && (f = "html" == h || "html" == m ? "html" : "text"); e.type = f; e.dataValue = d; delete e.preSniffing; delete e.startsWithEOL;
                        delete e.endsWithEOL
                    }, null, null, 6); a.on("paste", function (b) { b = b.data; b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () { a.fire("afterPaste") }, 0)) }, null, null, 1E3)
                }
            }); CKEDITOR.plugins.clipboard = {
                isCustomCopyCutSupported: (!CKEDITOR.env.ie || 16 <= CKEDITOR.env.version) && !CKEDITOR.env.iOS, isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" :
                    "paste", canClipboardApiBeTrusted: function (a, b) { return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1 }, getDropTarget: function (a) { var b = a.editable(); return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document }, fixSplitNodesAfterDrop: function (a, b, c, e) {
                        function f(a,
                            c, e) { var g = a; g.type == CKEDITOR.NODE_TEXT && (g = a.getParent()); if (g.equals(c) && e != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (e = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, e), b.collapse(!0)), !0 } var d = b.startContainer; "number" == typeof e && "number" == typeof c && d.type == CKEDITOR.NODE_ELEMENT && (f(a.startContainer, d, c) || f(a.endContainer, d, e))
                    }, isDropRangeAffectedByDragRange: function (a,
                        b) { var c = b.startContainer, e = b.endOffset; return a.endContainer.equals(c) && a.endOffset <= e || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < e || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < e ? !0 : !1 }, internalDrop: function (b, c, e, f) {
                            var d = CKEDITOR.plugins.clipboard, h = f.editable(), k, m; f.fire("saveSnapshot"); f.fire("lockSnapshot", { dontUpdate: 1 }); CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, c, d.dragStartContainerChildCount, d.dragEndContainerChildCount);
                            (m = this.isDropRangeAffectedByDragRange(b, c)) || (k = b.createBookmark(!1)); d = c.clone().createBookmark(!1); m && (k = b.createBookmark(!1)); b = k.startNode; c = k.endNode; m = d.startNode; c && b.getPosition(m) & CKEDITOR.POSITION_PRECEDING && c.getPosition(m) & CKEDITOR.POSITION_FOLLOWING && m.insertBefore(b); b = f.createRange(); b.moveToBookmark(k); h.extractHtmlFromRange(b, 1); c = f.createRange(); c.moveToBookmark(d); a(f, { dataTransfer: e, method: "drop", range: c }, 1); f.fire("unlockSnapshot")
                        }, getRangeAtDropPosition: function (a, b) {
                            var c =
                                a.data.$, e = c.clientX, f = c.clientY, d = b.getSelection(!0).getRanges()[0], h = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(e, f)) c = b.document.$.caretRangeFromPoint(e, f), h.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), h.collapse(!0); else if (c.rangeParent) h.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), h.collapse(!0); else {
                                    if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && d && b.editable().hasFocus) return d; if (document.body.createTextRange) {
                                        b.focus();
                                        c = b.document.getBody().$.createTextRange(); try {
                                            for (var k = !1, m = 0; 20 > m && !k; m++) { if (!k) try { c.moveToPoint(e, f - m), k = !0 } catch (l) { } if (!k) try { c.moveToPoint(e, f + m), k = !0 } catch (x) { } } if (k) { var y = "cke-temp-" + (new Date).getTime(); c.pasteHTML('\x3cspan id\x3d"' + y + '"\x3e​\x3c/span\x3e'); var C = b.document.getById(y); h.moveToPosition(C, CKEDITOR.POSITION_BEFORE_START); C.remove() } else {
                                                var z = b.document.$.elementFromPoint(e, f), A = new CKEDITOR.dom.element(z), G; if (A.equals(b.editable()) || "html" == A.getName()) return d && d.startContainer &&
                                                    !d.startContainer.equals(b.editable()) ? d : null; G = A.getClientRect(); e < G.left ? h.setStartAt(A, CKEDITOR.POSITION_AFTER_START) : h.setStartAt(A, CKEDITOR.POSITION_BEFORE_END); h.collapse(!0)
                                            }
                                        } catch (D) { return null }
                                    } else return null
                                } return h
                        }, initDragDataTransfer: function (a, b) {
                            var c = a.data.$ ? a.data.$.dataTransfer : null, e = new this.dataTransfer(c, b); "dragstart" === a.name && e.storeId(); c ? this.dragData && e.id == this.dragData.id ? e = this.dragData : this.dragData = e : this.dragData ? e = this.dragData : this.dragData = e; a.data.dataTransfer =
                                e
                        }, resetDragDataTransfer: function () { this.dragData = null }, initPasteDataTransfer: function (a, b) { if (this.isCustomCopyCutSupported) { if (a && a.data && a.data.$) { var c = a.data.$.clipboardData, e = new this.dataTransfer(c, b); "copy" !== a.name && "cut" !== a.name || e.storeId(); this.copyCutData && e.id == this.copyCutData.id ? (e = this.copyCutData, e.$ = c) : this.copyCutData = e; return e } return new this.dataTransfer(null, b) } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b) }, preventDefaultDropOnElement: function (a) {
                            a &&
                            a.on("dragover", f)
                        }
            }; m = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
                a && (this.$ = a); this._ = { metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g, data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a } }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this);
                this.id = this.getData(m); this.id || (this.id = "Text" == m ? "" : "cke-" + CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == m || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
            }; CKEDITOR.DATA_TRANSFER_INTERNAL = 1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function (a, b) {
                    a = this._.normalizeType(a); var c = "text/html" == a && b ? this._.nativeHtmlCache :
                        this._.data[a]; if (void 0 === c || null === c || "" === c) { if (this._.fallbackDataTransfer.isRequired()) c = this._.fallbackDataTransfer.getData(a, b); else try { c = this.$.getData(a) || "" } catch (e) { c = "" } "text/html" != a || b || (c = this._stripHtml(c)) } "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == c.substring(0, 7) && (c = ""); if ("string" === typeof c) var f = c.indexOf("\x3c/html\x3e"), c = -1 !== f ? c.substring(0, f + 7) : c; return c
                }, setData: function (a, b) {
                    a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b),
                        this._.nativeHtmlCache = b) : this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == m && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try { this.$.setData(a, b) } catch (c) { }
                }, storeId: function () { "Text" !== m && this.setData(m, this.id) }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL },
                cacheData: function () {
                    function a(c) { c = b._.normalizeType(c); var e = b.getData(c); "text/html" == c && (b._.nativeHtmlCache = b.getData(c, !0), e = b._stripHtml(e)); e && (b._.data[c] = e) } if (this.$) {
                        var b = this, c, e; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (c = 0; c < this.$.types.length; c++)a(this.$.types[c]) } else a("Text"), a("URL"); e = this._getImageFromClipboard(); if (this.$ && this.$.files || e) {
                            this._.files = []; if (this.$.files && this.$.files.length) for (c = 0; c < this.$.files.length; c++)this._.files.push(this.$.files[c]);
                            0 === this._.files.length && e && this._.files.push(e)
                        }
                    }
                }, getFilesCount: function () { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) { return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0 }, isEmpty: function () {
                    var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.objectKeys(this._.data),
                        function (b) { a[b] = 1 }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (var c = 0; c < this.$.types.length; c++)a[this.$.types[c]] = 1 } else a.Text = 1, a.URL = 1; "Text" != m && (a[m] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0
                }, _getImageFromClipboard: function () { var a; if (this.$ && this.$.items && this.$.items[0]) try { if ((a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) {
                    if (a && a.length) {
                        a = a.replace(this._.metaRegExp, ""); var b = this._.bodyRegExp.exec(a);
                        b && b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, ""))
                    } return a
                }
            }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported = null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
                isRequired: function () {
                    var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null ===
                        a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (c) { } } else return !1; return !a._isCustomMimeTypeSupported
                }, getData: function (a, b) {
                    var c = this._getData(this._customDataFallbackType, !0); if (b) return c; var c = this._extractDataComment(c), e = null, e = a === this._customDataFallbackType ? c.content : c.data && c.data[a] ? c.data[a] : this._getData(a,
                        !0); return null !== e ? e : ""
                }, setData: function (a, b) {
                    var c = a === this._customDataFallbackType; c && (b = this._applyDataComment(b, this._getFallbackTypeData())); var e = b, f = this._dataTransfer.$; try { f.setData(a, e), c && (this._dataTransfer._.nativeHtmlCache = e) } catch (d) {
                        if (this._isUnsupportedMimeTypeError(d)) {
                            c = CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(c._customTypes, a) && c._customTypes.push(a); var c = this._getFallbackTypeContent(), h = this._getFallbackTypeData(); h[a] = e; try {
                                e = this._applyDataComment(c,
                                    h), f.setData(this._customDataFallbackType, e), this._dataTransfer._.nativeHtmlCache = e
                            } catch (k) { e = "" }
                        }
                    } return e
                }, _getData: function (a, b) { var c = this._dataTransfer._.data; if (!b && c[a]) return c[a]; try { return this._dataTransfer.$.getData(a) } catch (e) { return null } }, _getFallbackTypeContent: function () { var a = this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content); return a }, _getFallbackTypeData: function () {
                    var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes,
                    b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, c = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== c[a] ? b[a] = c[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b
                }, _isUnsupportedMimeTypeError: function (a) { return a.message && -1 !== a.message.search(/element not found/gi) }, _extractDataComment: function (a) {
                    var b = { data: null, content: a || "" }; if (a && 16 < a.length) {
                        var c; (c = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && c[1] && (b.data = JSON.parse(decodeURIComponent(c[1])),
                            b.content = a.replace(c[0], ""))
                    } return b
                }, _applyDataComment: function (a, b) { var c = ""; b && CKEDITOR.tools.objectKeys(b).length && (c = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return c + (a && a.length ? a : "") }
            }
        }(), CKEDITOR.config.clipboard_notificationDuration = 1E4, CKEDITOR.plugins.add("panelbutton", {
            requires: "button", onLoad: function () {
                function a(a) {
                    var b = this._; b.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(a), b.on ? b.panel.hide() : b.panel.showBlock(this._.id, this.document.getById(this._.id),
                        4))
                } CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button, $: function (d) { var b = d.panel || {}; delete d.panel; this.base(d); this.document = b.parent && b.parent.getDocument() || CKEDITOR.document; b.block = { attributes: b.attributes }; this.hasArrow = b.toolbarRelated = !0; this.click = a; this._ = { panelDefinition: b } }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.panelButton(a) } } }, proto: {
                        createPanel: function (a) {
                            var b = this._; if (!b.panel) {
                                var c = this._.panelDefinition, h = this._.panelDefinition.block,
                                l = c.parent || CKEDITOR.document.getBody(), k = this._.panel = new CKEDITOR.ui.floatPanel(a, l, c), c = k.addBlock(b.id, h), f = this; k.onShow = function () { f.className && this.element.addClass(f.className + "_panel"); f.setState(CKEDITOR.TRISTATE_ON); b.on = 1; f.editorFocus && a.focus(); if (f.onOpen) f.onOpen() }; k.onHide = function (c) { f.className && this.element.getFirst().removeClass(f.className + "_panel"); f.setState(f.modes && f.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); b.on = 0; if (!c && f.onClose) f.onClose() }; k.onEscape =
                                    function () { k.hide(1); f.document.getById(b.id).focus() }; if (this.onBlock) this.onBlock(k, c); c.onHide = function () { b.on = 0; f.setState(CKEDITOR.TRISTATE_OFF) }
                            }
                        }
                    }
                })
            }, beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
        }), CKEDITOR.UI_PANELBUTTON = "panelbutton", function () {
            CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, b) {
                b && CKEDITOR.tools.extend(this,
                    b); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} }
            }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), d = CKEDITOR.addTemplate("panel-frame",
                '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'), b = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e'); CKEDITOR.ui.panel.prototype = {
                    render: function (c, h) {
                        this.getHolderElement = function () {
                            var a =
                                this._.holder; if (!a) {
                                    if (this.isFramed) {
                                        var a = this.document.getById(this.id + "_frame"), c = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && c.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() }, this)); a.write(b.output(CKEDITOR.tools.extend({ css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" + c + ");" }, l))); a.getWindow().$.CKEDITOR = CKEDITOR;
                                        a.on("keydown", function (a) { var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir"); this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
                                    } else a = this.document.getById(this.id); this._.holder = a
                                } return a
                        }; var l = {
                            editorId: c.id, id: this.id, langCode: c.langCode, dir: c.lang.dir, cls: this.className,
                            frame: "", env: CKEDITOR.env.cssClass, "z-index": c.config.baseFloatZIndex + 1
                        }; if (this.isFramed) { var k = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; l.frame = d.output({ id: this.id + "_frame", src: k }) } k = a.output(l); h && h.push(k); return k
                    }, addBlock: function (a, b) {
                        b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b); this._.currentBlock ||
                            this.showBlock(a); return b
                    }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) { a = this._.blocks[a]; var b = this._.currentBlock, d = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); b && b.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", d); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a }, destroy: function () { this.element && this.element.remove() }
                }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                    $: function (a,
                        b) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); b && CKEDITOR.tools.extend(this, b); this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() }, _: {
                            markItem: function (a) {
                                -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                                    a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                            }, markFirstDisplayed: function (a) { for (var b = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, d = this._.getItems(), k, f, e = d.count() - 1; 0 <= e; e--)if (k = d.getItem(e), k.getAscendant(b) || (f = k, this._.focusIndex = e), "true" == k.getAttribute("aria-selected")) { f = k; this._.focusIndex = e; break } f && (a && a(), CKEDITOR.env.webkit && f.getDocument().getWindow().focus(), f.focus(), this.onMark && this.onMark(f)) },
                            getItems: function () { return this.element.getElementsByTag("a") }
                        }, proto: {
                            show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, b) {
                                var d = this.keys[a]; switch (d) {
                                    case "next": for (var k = this._.focusIndex, d = this.element.getElementsByTag("a"), f; f = d.getItem(++k);)if (f.getAttribute("_cke_focus") && f.$.offsetWidth) { this._.focusIndex = k; f.focus(); break } return f || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a,
                                        1)); case "prev": k = this._.focusIndex; for (d = this.element.getElementsByTag("a"); 0 < k && (f = d.getItem(--k));) { if (f.getAttribute("_cke_focus") && f.$.offsetWidth) { this._.focusIndex = k; f.focus(); break } f = null } return f || b ? !1 : (this._.focusIndex = d.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return k = this._.focusIndex, (f = 0 <= k && this.element.getElementsByTag("a").getItem(k)) && (f.$[d] ? f.$[d]() : f.$["on" + d]()), !1
                                }return !0
                            }
                        }
                })
        }(), CKEDITOR.plugins.add("floatpanel", { requires: "panel" }), function () {
            function a(a,
                c, h, l, k) { k = CKEDITOR.tools.genKey(c.getUniqueId(), h.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", k || ""); var f = d[k]; f || (f = d[k] = new CKEDITOR.ui.panel(c, l), f.element = h.append(CKEDITOR.dom.element.createFromHtml(f.render(a), c)), f.element.setStyles({ display: "none", position: "absolute" })); return f } var d = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                    $: function (b, c, d, l) {
                        function k() { g.hide() } d.forceIFrame = 1; d.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (c = CKEDITOR.document.getById("cke_" +
                            b.name)); var f = c.getDocument(); l = a(b, f, c, d, l || 0); var e = l.element, m = e.getFirst(), g = this; e.disableContextMenu(); this.element = e; this._ = { editor: b, panel: l, parentElement: c, definition: d, document: f, iframe: m, children: [], dir: b.lang.dir, showBlockParams: null }; b.on("mode", k); b.on("resize", k); f.getWindow().on("resize", function () { this.reposition() }, this)
                    }, proto: {
                        addBlock: function (a, c) { return this._.panel.addBlock(a, c) }, addListBlock: function (a, c) { return this._.panel.addListBlock(a, c) }, getBlock: function (a) { return this._.panel.getBlock(a) },
                        showBlock: function (a, c, d, l, k, f) {
                            var e = this._.panel, m = e.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var g = this._.editor.editable(); this._.returnFocus = g.hasFocus ? g : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; var n = this.element, g = this._.iframe, g = CKEDITOR.env.ie && !CKEDITOR.env.edge ? g : new CKEDITOR.dom.window(g.$.contentWindow), p = n.getDocument(), q = this._.parentElement.getPositionedAncestor(), r = c.getDocumentPosition(p), p = q ? q.getDocumentPosition(p) :
                                { x: 0, y: 0 }, w = "rtl" == this._.dir, u = r.x + (l || 0) - p.x, v = r.y + (k || 0) - p.y; !w || 1 != d && 4 != d ? w || 2 != d && 3 != d || (u += c.$.offsetWidth - 1) : u += c.$.offsetWidth; if (3 == d || 4 == d) v += c.$.offsetHeight - 1; this._.panel._.offsetParentId = c.getId(); n.setStyles({ top: v + "px", left: 0, display: "" }); n.setOpacity(0); n.getFirst().removeStyle("width"); this._.editor.focusManager.add(g); this._.blurSet || (CKEDITOR.event.useCapture = !0, g.on("blur", function (a) {
                                    function b() { delete this._.returnFocus; this.hide() } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET &&
                                        this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
                                }, this), g.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (g.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), g.on("touchend", function () { this._.hideTimeout = 0; this.focus() }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1); e.onEscape = CKEDITOR.tools.bind(function (a) {
                                    if (this.onEscape &&
                                        !1 === this.onEscape(a)) return !1
                                }, this); CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.tools.bind(function () {
                                        var a = n; a.removeStyle("width"); if (m.autoSize) {
                                            var b = m.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? m.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width", b + 10 + "px"); b = m.element.$.scrollHeight; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight ||
                                                0) + 3); a.setStyle("height", b + "px"); e._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                        } else a.removeStyle("height"); w && (u -= n.$.offsetWidth); n.setStyle("left", u + "px"); var b = e.element.getWindow(), a = n.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, g = w ? a.right : b.width - a.left, h = w ? b.width - a.right : a.left; w ? g < c && (u = h > c ? u + c : b.width > c ? u - a.left : u - a.right + b.width) : g < c && (u = h > c ? u - c : b.width > c ? u - a.right + b.width : u - a.left); c = a.top; b.height -
                                            a.top < d && (v = c > d ? v - d : b.height > d ? v - a.bottom + b.height : v - a.top); CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(n.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (u = CKEDITOR.env.ie8Compat ? u - 2 * n.getDocument().getDocumentElement().$.scrollLeft : u - (a.$.scrollWidth - a.$.clientWidth))); var a = n.getFirst(), k; (k = a.getCustomData("activePanel")) && k.onHide && k.onHide.call(this, 1); a.setCustomData("activePanel", this); n.setStyles({ top: v + "px", left: u + "px" }); n.setOpacity(1);
                                        f && f()
                                    }, this); e.isLoaded ? a() : e.onLoad = a; CKEDITOR.tools.setTimeout(function () { var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); m.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () { m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed() }, 0) : m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed(); this._.editor.fire("panelShow", this) },
                                        0, this)
                                }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                        }, reposition: function () { var a = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a)) }, focus: function () { if (CKEDITOR.env.webkit) { var a = CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur() } (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() }, blur: function () {
                            var a = this._.iframe.getFrameDocument().getActive(); a && a.is("a") && (this._.lastFocused =
                                a)
                        }, hide: function (a) { if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) { this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus(); delete this._.lastFocused; this._.showBlockParams = null; this._.editor.fire("panelHide", this) } }, allowBlur: function (a) {
                            var c = this._.panel;
                            void 0 !== a && (c.allowBlur = a); return c.allowBlur
                        }, showAsChild: function (a, c, d, l, k, f) { if (this._.activeChild != a || a._.panel._.offsetParentId != d.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(c, d, l, k, f), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () { a.element.getChild(0).$.style.cssText += "" }, 100) }, hideChild: function (a) {
                            var c =
                                this._.activeChild; c && (delete c.onHide, delete this._.activeChild, c.hide(), a && this.focus())
                        }
                    }
                }); CKEDITOR.on("instanceDestroyed", function () { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), c; for (c in d) { var h = d[c]; a ? h.destroy() : h.element.hide() } a && (d = {}) })
        }(), CKEDITOR.plugins.add("colorbutton", {
            requires: "panelbutton,floatpanel", init: function (a) {
                function d(c, e, f, d, q) {
                    var r = new CKEDITOR.style(l["colorButton_" + e + "Style"]), w = CKEDITOR.tools.getNextId() + "_colorBox", u; q = q || {}; a.ui.add(c, CKEDITOR.UI_PANELBUTTON,
                        {
                            label: f, title: f, modes: { wysiwyg: 1 }, editorFocus: 0, toolbar: "colors," + d, allowedContent: r, requiredContent: r, contentTransformations: q.contentTransformations, panel: { css: CKEDITOR.skin.getPath("editor"), attributes: { role: "listbox", "aria-label": k.panelTitle } }, onBlock: function (c, f) {
                                u = f; f.autoSize = !0; f.element.addClass("cke_colorblock"); f.element.setHtml(b(c, e, w)); f.element.getDocument().getBody().setStyle("overflow", "hidden"); CKEDITOR.ui.fire("ready", this); var d = f.keys, h = "rtl" == a.lang.dir; d[h ? 37 : 39] = "next";
                                d[40] = "next"; d[9] = "next"; d[h ? 39 : 37] = "prev"; d[38] = "prev"; d[CKEDITOR.SHIFT + 9] = "prev"; d[32] = "click"
                            }, refresh: function () { a.activeFilter.check(r) || this.setState(CKEDITOR.TRISTATE_DISABLED) }, onOpen: function () {
                                var b = a.getSelection(), c = b && b.getStartElement(), f = a.elementPath(c); if (f) {
                                    c = f.block || f.blockLimit || a.document.getBody(); do f = c && c.getComputedStyle("back" == e ? "background-color" : "color") || "transparent"; while ("back" == e && "transparent" == f && c && (c = c.getParent())); f && "transparent" != f || (f = "#ffffff"); !1 !== l.colorButton_enableAutomatic &&
                                        this._.panel._.iframe.getFrameDocument().getById(w).setStyle("background-color", f); if (c = b && b.getRanges()[0]) {
                                            for (var b = new CKEDITOR.dom.walker(c), d = c.collapsed ? c.startContainer : b.next(), c = ""; d;) { d.type === CKEDITOR.NODE_TEXT && (d = d.getParent()); d = h(d.getComputedStyle("back" == e ? "background-color" : "color")); c = c || d; if (c !== d) { c = ""; break } d = b.next() } b = c; c = u._.getItems(); for (d = 0; d < c.count(); d++) {
                                                var k = c.getItem(d); k.removeAttribute("aria-selected"); b && b == h(k.getAttribute("data-value")) && k.setAttribute("aria-selected",
                                                    !0)
                                            }
                                        } return f
                                }
                            }
                        })
                } function b(b, e, f) {
                    b = []; var d = l.colorButton_colors.split(","), h = l.colorButton_colorsPerRow || 6, r = a.plugins.colordialog && !1 !== l.colorButton_enableMore, w = d.length + (r ? 2 : 1), u = CKEDITOR.tools.addFunction(function (b, e) {
                        function f(b) {
                            a.removeStyle(new CKEDITOR.style(l["colorButton_" + e + "Style"], { color: "inherit" })); var d = l["colorButton_" + e + "Style"]; d.childRule = "back" == e ? function (a) { return c(a) } : function (a) { return !(a.is("a") || a.getElementsByTag("a").count()) || c(a) }; a.focus(); a.applyStyle(new CKEDITOR.style(d,
                                { color: b })); a.fire("saveSnapshot")
                        } a.focus(); a.fire("saveSnapshot"); if ("?" == b) a.getColorFromDialog(function (a) { if (a) return f(a) }); else return f(b)
                    }); !1 !== l.colorButton_enableAutomatic && b.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', k.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', u, ",null,'", e, "');return false;\" href\x3d\"javascript:void('", k.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', w, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd colspan\x3d"' +
                        h + '" align\x3d"center"\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"', f, '"\x3e\x3c/span\x3e', k.auto, "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e"); b.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e'); for (f = 0; f < d.length; f++) {
                            0 === f % h && b.push("\x3c/tr\x3e\x3ctr\x3e"); var v = d[f].split("/"), t = v[0], B = v[1] || t; v[1] || (t = "#" + t.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")); v = a.lang.colorbutton.colors[B] || B; b.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
                                v, '" onclick\x3d"CKEDITOR.tools.callFunction(', u, ",'", t, "','", e, "'); return false;\" href\x3d\"javascript:void('", v, '\')" data-value\x3d"' + B + '" role\x3d"option" aria-posinset\x3d"', f + 2, '" aria-setsize\x3d"', w, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#', B, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
                        } r && b.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d"' + h + '" align\x3d"center"\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', k.more, '" onclick\x3d"CKEDITOR.tools.callFunction(',
                            u, ",'?','", e, "');return false;\" href\x3d\"javascript:void('", k.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', w, '" aria-setsize\x3d"', w, '"\x3e', k.more, "\x3c/a\x3e\x3c/td\x3e"); b.push("\x3c/tr\x3e\x3c/table\x3e"); return b.join("")
                } function c(a) { return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle") } function h(a) { return CKEDITOR.tools.normalizeHex("#" + CKEDITOR.tools.convertRgbToHex(a || "")).replace(/#/g, "") } var l = a.config, k = a.lang.colorbutton; if (!CKEDITOR.env.hc) {
                    d("TextColor",
                        "fore", k.textColorTitle, 10, { contentTransformations: [[{ element: "font", check: "span{color}", left: function (a) { return !!a.attributes.color }, right: function (a) { a.name = "span"; a.attributes.color && (a.styles.color = a.attributes.color); delete a.attributes.color } }]] }); var f = {}, e = a.config.colorButton_normalizeBackground; if (void 0 === e || e) f.contentTransformations = [[{
                            element: "span", left: function (a) {
                                var b = CKEDITOR.tools; if ("span" != a.name || !a.styles || !a.styles.background) return !1; a = b.style.parse.background(a.styles.background);
                                return a.color && 1 === b.objectKeys(a).length
                            }, right: function (b) { var c = (new CKEDITOR.style(a.config.colorButton_backStyle, { color: b.styles.background })).getDefinition(); b.name = c.element; b.styles = c.styles; b.attributes = c.attributes || {}; return b }
                        }]]; d("BGColor", "back", k.bgColorTitle, 20, f)
                }
            }
        }), CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000", CKEDITOR.config.colorButton_foreStyle =
        { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] }, CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } }, CKEDITOR.plugins.colordialog = {
            requires: "dialog", init: function (a) {
                var d = new CKEDITOR.dialogCommand("colordialog"); d.editorFocus = !1; a.addCommand("colordialog", d); CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js"); a.getColorFromDialog = function (b, c) {
                    var d, l, k; d = function (a) {
                        l(this); a = "ok" == a.name ?
                            this.getValueOf("picker", "selectedColor") : null; /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(a) && (a = "#" + a); b.call(c, a)
                    }; l = function (a) { a.removeListener("ok", d); a.removeListener("cancel", d) }; k = function (a) { a.on("ok", d); a.on("cancel", d) }; a.execCommand("colordialog"); if (a._.storedDialogs && a._.storedDialogs.colordialog) k(a._.storedDialogs.colordialog); else CKEDITOR.on("dialogDefinition", function (a) {
                        if ("colordialog" == a.data.name) {
                            var b = a.data.definition; a.removeListener(); b.onLoad = CKEDITOR.tools.override(b.onLoad,
                                function (a) { return function () { k(this); b.onLoad = a; "function" == typeof a && a.call(this) } })
                        }
                    })
                }
            }
        }, CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog), function () {
            function a(a, b, c, d) { var g = new CKEDITOR.dom.walker(a); if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) if (c(a), d) return; for (; a = g.next();)if (a = a.getAscendant(b, !0)) if (c(a), d) break } function d(a, b) { var e = { ul: "ol", ol: "ul" }; return -1 !== c(b, function (b) { return b.element === a || b.element === e[a] }) } function b(a) {
                this.styles =
                null; this.sticky = !1; this.editor = a; this.filter = new CKEDITOR.filter(a.config.copyFormatting_allowRules); !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0); a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules)
            } var c = CKEDITOR.tools.indexOf, h = CKEDITOR.tools.getMouseButton, l = !1; CKEDITOR.plugins.add("copyformatting", {
                lang: "az,de,en,it,ja,nb,nl,oc,pl,pt-br,ru,sv,tr,zh,zh-cn", icons: "copyformatting", hidpi: !0, init: function (a) {
                    var b = CKEDITOR.plugins.copyformatting;
                    b._addScreenReaderContainer(); l || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"), l = !0); a.addContentsCss && a.addContentsCss(this.path + "styles/copyformatting.css"); a.copyFormatting = new b.state(a); a.addCommand("copyFormatting", b.commands.copyFormatting); a.addCommand("applyFormatting", b.commands.applyFormatting); a.ui.addButton("CopyFormatting", { label: a.lang.copyformatting.label, command: "copyFormatting", toolbar: "cleanup,0" }); a.on("contentDom", function () {
                        var b = a.editable(), c = b.isInline() ?
                            b : a.document, f = a.ui.get("CopyFormatting"); b.attachListener(c, "mouseup", function (b) { h(b) === CKEDITOR.MOUSE_BUTTON_LEFT && a.execCommand("applyFormatting") }); b.attachListener(CKEDITOR.document, "mouseup", function (c) { var f = a.getCommand("copyFormatting"); h(c) !== CKEDITOR.MOUSE_BUTTON_LEFT || f.state !== CKEDITOR.TRISTATE_ON || b.contains(c.data.getTarget()) || a.execCommand("copyFormatting") }); f && (c = CKEDITOR.document.getById(f._.id), b.attachListener(c, "dblclick", function () { a.execCommand("copyFormatting", { sticky: !0 }) }),
                                b.attachListener(c, "mouseup", function (a) { a.data.stopPropagation() }))
                    }); a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, "copyFormatting"); a.on("key", function (b) { var c = a.getCommand("copyFormatting"); b = b.data.domEvent; b.getKeystroke && 27 === b.getKeystroke() && c.state === CKEDITOR.TRISTATE_ON && a.execCommand("copyFormatting") }); a.copyFormatting.on("extractFormatting", function (c) {
                        var d = c.data.element; if (d.contains(a.editable()) || d.equals(a.editable())) return c.cancel();
                        d = b._convertElementToStyleDef(d); if (!a.copyFormatting.filter.check(new CKEDITOR.style(d), !0, !0)) return c.cancel(); c.data.styleDef = d
                    }); a.copyFormatting.on("applyFormatting", function (e) {
                        if (!e.data.preventFormatStripping) {
                            var h = e.data.range, g = b._extractStylesFromRange(a, h), l = b._determineContext(h), p, q; if (a.copyFormatting._isContextAllowed(l)) for (q = 0; q < g.length; q++)l = g[q], p = h.createBookmark(), -1 === c(b.preservedElements, l.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? g[q].removeFromRange(e.data.range,
                                e.editor) : g[q].remove(e.editor) : d(l.element, e.data.styles) && b._removeStylesFromElementInRange(h, l.element), h.moveToBookmark(p)
                        }
                    }); a.copyFormatting.on("applyFormatting", function (b) {
                        var c = CKEDITOR.plugins.copyformatting, f = c._determineContext(b.data.range); "list" === f && a.copyFormatting._isContextAllowed("list") ? c._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : "table" === f && a.copyFormatting._isContextAllowed("table") ? c._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed("text") &&
                            c._applyStylesToTextContext(b.editor, b.data.range, b.data.styles)
                    }, null, null, 999)
                }
            }); b.prototype._isContextAllowed = function (a) { var b = this.editor.config.copyFormatting_allowedContexts; return !0 === b || -1 !== c(b, a) }; CKEDITOR.event.implementOn(b.prototype); CKEDITOR.plugins.copyformatting = {
                state: b, inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "), excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"], elementsForInlineTransform: ["li"], excludedElementsFromInlineTransform: ["table", "thead", "tbody",
                    "ul", "ol"], excludedAttributesFromInlineTransform: ["value", "type"], preservedElements: "ul ol li td th tr thead tbody table".split(" "), breakOnElements: ["ul", "ol", "table"], _initialKeystrokePasteCommand: null, commands: {
                        copyFormatting: {
                            exec: function (a, b) {
                                var c = CKEDITOR.plugins.copyformatting, d = a.copyFormatting, g = b ? "keystrokeHandler" == b.from : !1, h = b ? b.sticky || g : !1, l = c._getCursorContainer(a), q = CKEDITOR.document.getDocumentElement(); if (this.state === CKEDITOR.TRISTATE_ON) return d.styles = null, d.sticky = !1, l.removeClass("cke_copyformatting_active"),
                                    q.removeClass("cke_copyformatting_disabled"), q.removeClass("cke_copyformatting_tableresize_cursor"), c._putScreenReaderMessage(a, "canceled"), c._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF); d.styles = c._extractStylesFromElement(a, a.elementPath().lastElement); this.setState(CKEDITOR.TRISTATE_ON); g || (l.addClass("cke_copyformatting_active"), q.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && q.addClass("cke_copyformatting_disabled")); d.sticky = h;
                                c._putScreenReaderMessage(a, "copied"); c._attachPasteKeystrokeHandler(a)
                            }
                        }, applyFormatting: {
                            editorFocus: !1, exec: function (a, b) {
                                var c = a.getCommand("copyFormatting"), d = b ? "keystrokeHandler" == b.from : !1, g = CKEDITOR.plugins.copyformatting, h = a.copyFormatting, l = g._getCursorContainer(a), q = CKEDITOR.document.getDocumentElement(); if (d || c.state === CKEDITOR.TRISTATE_ON) {
                                    if (d && !h.styles) return g._putScreenReaderMessage(a, "failed"), g._detachPasteKeystrokeHandler(a), !1; d = g._applyFormat(a, h.styles); h.sticky || (h.styles =
                                        null, l.removeClass("cke_copyformatting_active"), q.removeClass("cke_copyformatting_disabled"), q.removeClass("cke_copyformatting_tableresize_cursor"), c.setState(CKEDITOR.TRISTATE_OFF), g._detachPasteKeystrokeHandler(a)); g._putScreenReaderMessage(a, d ? "applied" : "canceled")
                                }
                            }
                        }
                    }, _getCursorContainer: function (a) { return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent() }, _convertElementToStyleDef: function (a) {
                        var b = CKEDITOR.tools, c = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes),
                        b = b.parseCssText(a.getAttribute("style"), !0, !0); return { element: a.getName(), type: CKEDITOR.STYLE_INLINE, attributes: c, styles: b }
                    }, _extractStylesFromElement: function (a, b) {
                        var e = {}, d = []; do if (b.type === CKEDITOR.NODE_ELEMENT && !b.hasAttribute("data-cke-bookmark") && (e.element = b, a.copyFormatting.fire("extractFormatting", e, a) && e.styleDef && d.push(new CKEDITOR.style(e.styleDef)), b.getName && -1 !== c(CKEDITOR.plugins.copyformatting.breakOnElements, b.getName()))) break; while ((b = b.getParent()) && b.type === CKEDITOR.NODE_ELEMENT);
                        return d
                    }, _extractStylesFromRange: function (a, b) { for (var c = [], d = new CKEDITOR.dom.walker(b), g; g = d.next();)c = c.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, g)); return c }, _removeStylesFromElementInRange: function (a, b) { for (var e = -1 !== c(["ol", "ul", "table"], b), d = new CKEDITOR.dom.walker(a), g; g = d.next();)if (g = g.getAscendant(b, !0)) if (g.removeAttributes(g.getAttributes()), e) break }, _getSelectedWordOffset: function (a) {
                        function b(a, c) {
                            return a[c ? "getPrevious" : "getNext"](function (a) {
                                return a.type !==
                                    CKEDITOR.NODE_COMMENT
                            })
                        } function e(a) { return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ""), a.replace(/<.*?>/g, "")) : a.getText() } function d(a, g) {
                            var h = a, k = /\s/g, l = "p br ol ul li td th div caption body".split(" "), n = !1, p = !1, r, A; do { for (r = b(h, g); !r && h.getParent();) { h = h.getParent(); if (-1 !== c(l, h.getName())) { p = n = !0; break } r = b(h, g) } if (r && r.getName && -1 !== c(l, r.getName())) { n = !0; break } h = r } while (h && h.getStyle && ("none" == h.getStyle("display") || !h.getText())); for (h || (h = a); h.type !==
                                CKEDITOR.NODE_TEXT;)h = !n || g || p ? h.getChild(0) : h.getChild(h.getChildCount() - 1); for (l = e(h); null != (p = k.exec(l)) && (A = p.index, g);); if ("number" !== typeof A && !n) return d(h, g); if (n) g ? A = 0 : (k = /([\.\b]*$)/, A = (p = k.exec(l)) ? p.index : l.length); else if (g && (A += 1, A > l.length)) return d(h); return { node: h, offset: A }
                        } var g = /\b\w+\b/ig, h, l, q, r, w; q = r = w = a.startContainer; for (h = e(q); null != (l = g.exec(h));)if (l.index + l[0].length >= a.startOffset) return a = l.index, g = l.index + l[0].length, 0 === l.index && (l = d(q, !0), r = l.node, a = l.offset), g >= h.length &&
                            (h = d(q), w = h.node, g = h.offset), { startNode: r, startOffset: a, endNode: w, endOffset: g }; return null
                    }, _filterStyles: function (a) { var b = CKEDITOR.tools.isEmpty, c = [], d, g; for (g = 0; g < a.length; g++)d = a[g]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary, d.element) && (d.element = a[g].element = "span"), "span" === d.element && b(d.attributes) && b(d.styles) || c.push(a[g]); return c }, _determineContext: function (a) {
                        function b(c) {
                            var d = new CKEDITOR.dom.walker(a), f; if (a.startContainer.getAscendant(c,
                                !0) || a.endContainer.getAscendant(c, !0)) return !0; for (; f = d.next();)if (f.getAscendant(c, !0)) return !0
                        } return b({ ul: 1, ol: 1 }) ? "list" : b("table") ? "table" : "text"
                    }, _applyStylesToTextContext: function (a, b, e) {
                        var d = CKEDITOR.plugins.copyformatting, g = d.excludedAttributesFromInlineTransform, h, l; CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([b]); for (h = 0; h < e.length; h++)if (b = e[h], -1 === c(d.excludedElementsFromInlineTransform, b.element)) {
                            if (-1 !== c(d.elementsForInlineTransform, b.element)) for (b.element =
                                b._.definition.element = "span", l = 0; l < g.length; l++)b._.definition.attributes[g[l]] && delete b._.definition.attributes[g[l]]; b.apply(a)
                        }
                    }, _applyStylesToListContext: function (b, c, e) {
                        var d, g, h; for (h = 0; h < e.length; h++)d = e[h], g = c.createBookmark(), "ol" === d.element || "ul" === d.element ? a(c, { ul: 1, ol: 1 }, function (a) { var b = d; a.getName() !== b.element && a.renameNode(b.element); b.applyToObject(a) }, !0) : "li" === d.element ? a(c, "li", function (a) { d.applyToObject(a) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b, c,
                            [d]), c.moveToBookmark(g)
                    }, _applyStylesToTableContext: function (b, d, e) {
                        function h(a, b) { a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b)); b.applyToObject(a) } var g, l, p; for (p = 0; p < e.length; p++)g = e[p], l = d.createBookmark(), -1 !== c(["table", "tr"], g.element) ? a(d, g.element, function (a) { g.applyToObject(a) }) : -1 !== c(["td", "th"], g.element) ? a(d, { td: 1, th: 1 }, function (a) { h(a, g) }) : -1 !== c(["thead", "tbody"], g.element) ? a(d, { thead: 1, tbody: 1 }, function (a) { h(a, g) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b,
                            d, [g]), d.moveToBookmark(l)
                    }, _applyFormat: function (a, b) {
                        var c = a.getSelection().getRanges()[0], d = CKEDITOR.plugins.copyformatting, g, h; if (!c) return !1; if (c.collapsed) { h = a.getSelection().createBookmarks(); if (!(g = d._getSelectedWordOffset(c))) return; c = a.createRange(); c.setStart(g.startNode, g.startOffset); c.setEnd(g.endNode, g.endOffset); c.select() } b = d._filterStyles(b); if (!a.copyFormatting.fire("applyFormatting", { styles: b, range: c, preventFormatStripping: !1 }, a)) return !1; h && a.getSelection().selectBookmarks(h);
                        return !0
                    }, _putScreenReaderMessage: function (a, b) { var c = this._getScreenReaderContainer(); c && c.setText(a.lang.copyformatting.notification[b]) }, _addScreenReaderContainer: function () { if (this._getScreenReaderContainer()) return this._getScreenReaderContainer(); if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0) },
                _getScreenReaderContainer: function () { if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]") }, _attachPasteKeystrokeHandler: function (a) { var b = a.config.copyFormatting_keystrokePaste; b && (this._initialKeystrokePasteCommand = a.keystrokeHandler.keystrokes[b], a.setKeystroke(b, "applyFormatting")) }, _detachPasteKeystrokeHandler: function (a) {
                    var b = a.config.copyFormatting_keystrokePaste; b && a.setKeystroke(b, this._initialKeystrokePasteCommand ||
                        !1)
                }
            }; CKEDITOR.config.copyFormatting_outerCursor = !0; CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}"; CKEDITOR.config.copyFormatting_disallowRules = "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)"; CKEDITOR.config.copyFormatting_allowedContexts = !0; CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67; CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
        }(), CKEDITOR.plugins.add("menu", {
            requires: "floatpanel",
            beforeInit: function (a) { for (var d = a.config.menu_groups.split(","), b = a._.menuGroups = {}, c = a._.menuItems = {}, h = 0; h < d.length; h++)b[d[h]] = h + 1; a.addMenuGroup = function (a, c) { b[a] = c || 100 }; a.addMenuItem = function (a, d) { b[d.group] && (c[a] = new CKEDITOR.menuItem(this, a, d)) }; a.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; a.getMenuItem = function (a) { return c[a] }; a.removeMenuItem = function (a) { delete c[a] } }
        }), function () {
            function a(a) {
                a.sort(function (a, b) {
                    return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order <
                        b.order ? -1 : a.order > b.order ? 1 : 0
                })
            } var d = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (d += ' onkeypress\x3d"return false;"');
            CKEDITOR.env.gecko && (d += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); var d = d + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'), b = CKEDITOR.addTemplate("menuItem", d + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),
                c = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), h = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                    $: function (a, b) {
                        b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var c = CKEDITOR.tools.extend({}, b.panel, {
                            css: [CKEDITOR.skin.getPath("editor")],
                            level: this._.level - 1, block: {}
                        }), e = c.block.attributes = c.attributes || {}; !e.role && (e.role = "menu"); this._.panelDefinition = c
                    }, _: {
                        onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), c = this.editor.elementPath(), e = this._.listeners; this.removeAll(); for (var d = 0; d < e.length; d++) { var g = e[d](b, a, c); if (g) for (var h in g) { var p = this.editor.getMenuItem(h); !p || p.command && !this.editor.getCommand(p.command).state || (p.state = g[h], this.add(p)) } } }, onClick: function (a) {
                            this.hide(); if (a.onClick) a.onClick();
                            else a.command && this.editor.execCommand(a.command)
                        }, onEscape: function (a) { var b = this.parent; b ? b._.panel.hideChild(1) : 27 == a && this.hide(1); return !1 }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                            var b = this._.subMenu, c = this.items[a]; if (c = c.getItems && c.getItems()) {
                                b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var e in c) {
                                    var d =
                                        this.editor.getMenuItem(e); d && (d.state = c[e], b.add(d))
                                } var g = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(g, 2) }, 0)
                            } else this._.panel.hideChild(1)
                        }
                    }, proto: {
                        add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (b, c, d, e) {
                            if (!this.parent && (this._.onShow(), !this.items.length)) return; c = c || ("rtl" == this.editor.lang.dir ? 2 : 1); var h = this.items, g = this.editor, n = this._.panel, p = this._.element;
                            if (!n) {
                                n = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); n.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); n.onShow = function () { n._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; n.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); p = n.addBlock(this.id, this._.panelDefinition.block); p.autoSize = !0; var q = p.keys; q[40] = "next"; q[9] = "next"; q[38] =
                                    "prev"; q[CKEDITOR.SHIFT + 9] = "prev"; q["rtl" == g.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; q[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (q[13] = "mouseup"); p = this._.element = p.element; q = p.getDocument(); q.getBody().setStyle("overflow", "hidden"); q.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) {
                                        clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, g.config.menu_subMenuDelay ||
                                            400, this, [a])
                                    }, this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                            } a(h); for (var q = g.elementPath(), q = ['\x3cdiv class\x3d"cke_menu' + (q && q.direction() != g.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], r = h.length, w = r && h[0].group,
                                u = 0; u < r; u++) { var v = h[u]; w != v.group && (q.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), w = v.group); v.render(this, u, q) } q.push("\x3c/div\x3e"); p.setHtml(q.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(n, this.id, b, c, d, e) : n.showBlock(this.id, b, c, d, e); g.fire("menuShow", [n])
                        }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }
                    }
                }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                    $: function (a,
                        b, c) { CKEDITOR.tools.extend(this, c, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                            render: function (a, d, f) {
                                var e = a.id + String(d), m = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, g = "", n = this.editor, p, q, r = m == CKEDITOR.TRISTATE_ON ? "on" : m == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (g = ' aria-checked\x3d"' + (m == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var w = this.getItems, u =
                                    "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", v = this.name; this.icon && !/\./.test(this.icon) && (v = this.icon); this.command && (p = n.getCommand(this.command), (p = n.getCommandKeystroke(p)) && (q = CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard, p))); a = {
                                        id: e, name: this.name, iconName: v, label: this.label, cls: this.className || "", state: r, hasPopup: w ? "true" : "false", disabled: m == CKEDITOR.TRISTATE_DISABLED, title: this.label + (q ? " (" + q.display + ")" : ""), ariaShortcut: q ? n.lang.common.keyboardShortcut + " " + q.aria :
                                            "", href: "javascript:void('" + (this.label || "").replace("'") + "')", hoverFn: a._.itemOverFn, moveOutFn: a._.itemOutFn, clickFn: a._.itemClickFn, index: d, iconStyle: CKEDITOR.skin.getIconStyle(v, "rtl" == this.editor.lang.dir, v == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: q ? h.output({ shortcut: q.display }) : "", arrowHtml: w ? c.output({ label: u }) : "", role: this.role ? this.role : "menuitem", ariaChecked: g
                                    }; b.output(a, f)
                            }
                        }
                })
        }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
        CKEDITOR.plugins.add("contextmenu", {
            requires: "menu", onLoad: function () {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu, $: function (a) { this.base.call(this, a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options } } }) }, proto: {
                        addTarget: function (a, d) {
                            a.on("contextmenu", function (a) {
                                a = a.data; var c = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!d || !c) {
                                    a.preventDefault(); if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                        var c = this.editor,
                                        k = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); k && "false" == k.getAttribute("contenteditable") && c.getSelection().fake(k)
                                    } var k = a.getTarget().getDocument(), f = a.getTarget().getDocument().getDocumentElement(), c = !k.equals(CKEDITOR.document), k = k.getWindow().getScrollPosition(), e = c ? a.$.clientX : a.$.pageX || k.x + a.$.clientX, m = c ? a.$.clientY : a.$.pageY || k.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(f, null, e, m) }, CKEDITOR.env.ie ?
                                        200 : 0, this)
                                }
                            }, this); if (CKEDITOR.env.webkit) { var b, c = function () { b = 0 }; a.on("keydown", function (a) { b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on("keyup", c); a.on("contextmenu", c) }
                        }, open: function (a, d, b, c) { !1 !== this.editor.config.enableContextMenu && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, d, b, c)) }
                    }
                })
            }, beforeInit: function (a) {
                var d = a.contextMenu = new CKEDITOR.plugins.contextMenu(a); a.on("contentDom", function () {
                    d.addTarget(a.editable(),
                        !1 !== a.config.browserContextMenuOnCtrl)
                }); a.addCommand("contextMenu", { exec: function () { a.contextMenu.open(a.document.getBody()) } }); a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        }), function () {
            function a(a) { var b = this.att; a = a && a.hasAttribute(b) && a.getAttribute(b) || ""; void 0 !== a && this.setValue(a) } function d() {
                for (var a, b = 0; b < arguments.length; b++)if (arguments[b] instanceof CKEDITOR.dom.element) { a = arguments[b]; break } if (a) {
                    var b = this.att, d =
                        this.getValue(); d ? a.setAttribute(b, d) : a.removeAttribute(b, d)
                }
            } var b = { id: 1, dir: 1, classes: 1, styles: 1 }; CKEDITOR.plugins.add("dialogadvtab", {
                requires: "dialog", allowedContent: function (a) { a || (a = b); var d = []; a.id && d.push("id"); a.dir && d.push("dir"); var l = ""; d.length && (l += "[" + d.join(",") + "]"); a.classes && (l += "(*)"); a.styles && (l += "{*}"); return l }, createAdvancedTab: function (c, h, l) {
                    h || (h = b); var k = c.lang.common, f = { id: "advanced", label: k.advancedTab, title: k.advancedTab, elements: [{ type: "vbox", padding: 1, children: [] }] },
                        e = []; if (h.id || h.dir) h.id && e.push({ id: "advId", att: "id", type: "text", requiredContent: l ? l + "[id]" : null, label: k.id, setup: a, commit: d }), h.dir && e.push({ id: "advLangDir", att: "dir", type: "select", requiredContent: l ? l + "[dir]" : null, label: k.langDir, "default": "", style: "width:100%", items: [[k.notSet, ""], [k.langDirLTR, "ltr"], [k.langDirRTL, "rtl"]], setup: a, commit: d }), f.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(e) }); if (h.styles || h.classes) e = [], h.styles && e.push({
                            id: "advStyles", att: "style",
                            type: "text", requiredContent: l ? l + "{cke-xyz}" : null, label: k.styles, "default": "", validate: CKEDITOR.dialog.validate.inlineStyle(k.invalidInlineStyle), onChange: function () { }, getStyle: function (a, b) { var c = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i")); return c ? c[1] : b }, updateStyle: function (a, b) { var e = this.getValue(), d = c.document.createElement("span"); d.setAttribute("style", e); d.setStyle(a, b); e = CKEDITOR.tools.normalizeCssText(d.getAttribute("style")); this.setValue(e, 1) }, setup: a, commit: d
                        }),
                            h.classes && e.push({ type: "hbox", widths: ["45%", "55%"], children: [{ id: "advCSSClasses", att: "class", type: "text", requiredContent: l ? l + "(cke-xyz)" : null, label: k.cssClasses, "default": "", setup: a, commit: d }] }), f.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(e) }); return f
                }
            })
        }(), function () {
            CKEDITOR.plugins.add("div", {
                requires: "dialog", init: function (a) {
                    if (!a.blockless) {
                        var d = a.lang.div, b = "div(*)"; CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
                        a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", { allowedContent: b, requiredContent: "div", contextSensitive: !0, contentTransformations: [["div: alignmentToStyle"]], refresh: function (a, b) { this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } })); a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" })); a.addCommand("removediv", {
                            requiredContent: "div", exec: function (a) {
                                function b(e) {
                                    (e = CKEDITOR.plugins.div.getSurroundDiv(a,
                                        e)) && !e.data("cke-div-added") && (m.push(e), e.data("cke-div-added"))
                                } for (var d = a.getSelection(), k = d && d.getRanges(), f, e = d.createBookmarks(), m = [], g = 0; g < k.length; g++)f = k[g], f.collapsed ? b(d.getStartElement()) : (f = new CKEDITOR.dom.walker(f), f.evaluator = b, f.lastForward()); for (g = 0; g < m.length; g++)m[g].remove(!0); d.selectBookmarks(e)
                            }
                        }); a.ui.addButton && a.ui.addButton("CreateDiv", { label: d.toolbar, command: "creatediv", toolbar: "blocks,50" }); a.addMenuItems && (a.addMenuItems({
                            editdiv: {
                                label: d.edit, command: "editdiv",
                                group: "div", order: 1
                            }, removediv: { label: d.remove, command: "removediv", group: "div", order: 5 }
                        }), a.contextMenu && a.contextMenu.addListener(function (b) { return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } : null })); CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"); CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                    }
                }
            }); CKEDITOR.plugins.div = {
                getSurroundDiv: function (a, d) {
                    var b = a.elementPath(d); return a.elementPath(b.blockLimit).contains(function (a) {
                        return a.is("div") &&
                            !a.isReadOnly()
                    }, 1)
                }
            }
        }(), function () {
            function a(a, b) {
                function k(b) { b = g.list[b]; var c; b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (c = a.createRange(), c.selectNodeContents(b), c = c.select()) : (c = a.getSelection(), c.selectElement(b)); CKEDITOR.env.ie && a.fire("selectionChange", { selection: c, path: new CKEDITOR.dom.elementPath(b) }); a.focus() } function f() { m && m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete g.list } var e = a.ui.spaceId("path"), m, g = a._.elementsPath,
                    n = g.idBase; b.html += '\x3cspan id\x3d"' + e + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + e + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + e + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e'; a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); g.onClick = k; var p = CKEDITOR.tools.addFunction(k), q = CKEDITOR.tools.addFunction(function (b, c) {
                        var e = g.idBase, d; c = new CKEDITOR.dom.event(c);
                        d = "rtl" == a.lang.dir; switch (c.getKeystroke()) { case d ? 39 : 37: case 9: return (d = CKEDITOR.document.getById(e + (b + 1))) || (d = CKEDITOR.document.getById(e + "0")), d.focus(), !1; case d ? 37 : 39: case CKEDITOR.SHIFT + 9: return (d = CKEDITOR.document.getById(e + (b - 1))) || (d = CKEDITOR.document.getById(e + (g.list.length - 1))), d.focus(), !1; case 27: return a.focus(), !1; case 13: case 32: return k(b), !1 }return !0
                    }); a.on("selectionChange", function (b) {
                        for (var d = [], f = g.list = [], k = [], l = g.filters, B = !0, x = b.data.path.elements, y = x.length; y--;) {
                            var C =
                                x[y], z = 0; b = C.data("cke-display-name") ? C.data("cke-display-name") : C.data("cke-real-element-type") ? C.data("cke-real-element-type") : C.getName(); (B = C.hasAttribute("contenteditable") ? "true" == C.getAttribute("contenteditable") : B) || C.hasAttribute("contenteditable") || (z = 1); for (var A = 0; A < l.length; A++) { var G = l[A](C, b); if (!1 === G) { z = 1; break } b = G || b } z || (f.unshift(C), k.unshift(b))
                        } f = f.length; for (l = 0; l < f; l++)b = k[l], B = a.lang.elementspath.eleTitle.replace(/%1/, b), b = c.output({
                            id: n + l, label: B, text: b, jsTitle: "javascript:void('" +
                                b + "')", index: l, keyDownFn: q, clickFn: p
                        }), d.unshift(b); m || (m = CKEDITOR.document.getById(e)); k = m; k.setHtml(d.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); a.fire("elementsPathUpdate", { space: k })
                    }); a.on("readOnly", f); a.on("contentDomUnload", f); a.addCommand("elementsPathFocus", d.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
            } var d = {
                toolbarFocus: {
                    editorFocus: !1, readOnly: 1, exec: function (a) {
                        (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie ||
                            CKEDITOR.env.air)
                    }
                }
            }, b = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var c = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + b + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
            CKEDITOR.plugins.add("elementspath", { init: function (b) { b._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; b.on("uiSpace", function (c) { "bottom" == c.data.space && a(b, c.data) }) } })
        }(), function () {
            function a(a, b, c) { c = a.config.forceEnterMode || c; if ("wysiwyg" == a.mode) { b || (b = a.activeEnterMode); var e = a.elementPath(); e && !e.isContextFor("p") && (b = CKEDITOR.ENTER_BR, c = 1); a.fire("saveSnapshot"); b == CKEDITOR.ENTER_BR ? k(a, b, null, c) : f(a, b, null, c); a.fire("saveSnapshot") } } function d(a) {
                a =
                a.getSelection().getRanges(!0); for (var b = a.length - 1; 0 < b; b--)a[b].deleteContents(); return a[0]
            } function b(a) { var b = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") }, !0); if (a.root.equals(b)) return a; b = new CKEDITOR.dom.range(b); b.moveToRange(a); return b } CKEDITOR.plugins.add("enterkey", {
                init: function (b) {
                    b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b) } }); b.addCommand("shiftEnter", {
                        modes: { wysiwyg: 1 }, editorFocus: !1,
                        exec: function (b) { a(b, b.activeShiftEnterMode, 1) }
                    }); b.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
                }
            }); var c = CKEDITOR.dom.walker.whitespaces(), h = CKEDITOR.dom.walker.bookmark(); CKEDITOR.plugins.enterkey = {
                enterBlock: function (a, f, l, p) {
                    if (l = l || d(a)) {
                        l = b(l); var q = l.document, r = l.checkStartOfBlock(), w = l.checkEndOfBlock(), u = a.elementPath(l.startContainer), v = u.block, t = f == CKEDITOR.ENTER_DIV ? "div" : "p", B; if (r && w) {
                            if (v && (v.is("li") || v.getParent().is("li"))) {
                                v.is("li") || (v = v.getParent()); l = v.getParent();
                                B = l.getParent(); p = !v.hasPrevious(); var x = !v.hasNext(), t = a.getSelection(), y = t.createBookmarks(), r = v.getDirection(1), w = v.getAttribute("class"), C = v.getAttribute("style"), z = B.getDirection(1) != r; a = a.enterMode != CKEDITOR.ENTER_BR || z || C || w; if (B.is("li")) p || x ? (p && x && l.remove(), v[x ? "insertAfter" : "insertBefore"](B)) : v.breakParent(B); else {
                                    if (a) if (u.block.is("li") ? (B = q.createElement(f == CKEDITOR.ENTER_P ? "p" : "div"), z && B.setAttribute("dir", r), C && B.setAttribute("style", C), w && B.setAttribute("class", w), v.moveChildren(B)) :
                                        B = u.block, p || x) B[p ? "insertBefore" : "insertAfter"](l); else v.breakParent(l), B.insertAfter(l); else if (v.appendBogus(!0), p || x) for (; q = v[p ? "getFirst" : "getLast"]();)q[p ? "insertBefore" : "insertAfter"](l); else for (v.breakParent(l); q = v.getLast();)q.insertAfter(l); v.remove()
                                } t.selectBookmarks(y); return
                            } if (v && v.getParent().is("blockquote")) {
                                v.breakParent(v.getParent()); v.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || v.getPrevious().remove(); v.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || v.getNext().remove();
                                l.moveToElementEditStart(v); l.select(); return
                            }
                        } else if (v && v.is("pre") && !w) { k(a, f, l, p); return } if (r = l.splitBlock(t)) {
                            f = r.previousBlock; v = r.nextBlock; u = r.wasStartOfBlock; a = r.wasEndOfBlock; v ? (y = v.getParent(), y.is("li") && (v.breakParent(y), v.move(v.getNext(), 1))) : f && (y = f.getParent()) && y.is("li") && (f.breakParent(y), y = f.getNext(), l.moveToElementEditStart(y), f.move(f.getPrevious())); if (u || a) {
                                if (f) { if (f.is("li") || !e.test(f.getName()) && !f.is("pre")) B = f.clone() } else v && (B = v.clone()); B ? p && !B.is("li") && B.renameNode(t) :
                                    y && y.is("li") ? B = y : (B = q.createElement(t), f && (x = f.getDirection()) && B.setAttribute("dir", x)); if (q = r.elementPath) for (p = 0, t = q.elements.length; p < t; p++) { y = q.elements[p]; if (y.equals(q.block) || y.equals(q.blockLimit)) break; CKEDITOR.dtd.$removeEmpty[y.getName()] && (y = y.clone(), B.moveChildren(y), B.append(y)) } B.appendBogus(); B.getParent() || l.insertNode(B); B.is("li") && B.removeAttribute("value"); !CKEDITOR.env.ie || !u || a && f.getChildCount() || (l.moveToElementEditStart(a ? f : B), l.select()); l.moveToElementEditStart(u && !a ?
                                        v : B)
                            } else v.is("li") && (B = l.clone(), B.selectNodeContents(v), B = new CKEDITOR.dom.walker(B), B.evaluator = function (a) { return !(h(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) }, (y = B.next()) && y.type == CKEDITOR.NODE_ELEMENT && y.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? q.createElement("br") : q.createText(" ")).insertBefore(y)), v && l.moveToElementEditStart(v); l.select(); l.scrollIntoView()
                        }
                    }
                }, enterBr: function (a, b, c, h) {
                    if (c = c || d(a)) {
                        var k = c.document,
                        l = c.checkEndOfBlock(), w = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), u = w.block, v = u && w.block.getName(); h || "li" != v ? (!h && l && e.test(v) ? (l = u.getDirection()) ? (k = k.createElement("div"), k.setAttribute("dir", l), k.insertAfter(u), c.setStart(k, 0)) : (k.createElement("br").insertAfter(u), CKEDITOR.env.gecko && k.createText("").insertAfter(u), c.setStartAt(u.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == v && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ?
                            k.createText("\r") : k.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (k.createText("﻿").insertAfter(a), l && (u || w.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", c.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : f(a, b, c, h)
                    }
                }
            }; var l = CKEDITOR.plugins.enterkey, k = l.enterBr, f = l.enterBlock, e = /^h[1-6]$/
        }(), function () {
            function a(a, b) {
                var c = {}, h = [], l = {
                    nbsp: " ", shy: "­", gt: "\x3e",
                    lt: "\x3c", amp: "\x26", apos: "'", quot: '"'
                }; a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, e) { var d = b ? "\x26" + e + ";" : l[e]; c[d] = b ? l[e] : "\x26" + e + ";"; h.push(d); return "" }); if (!b && a) { a = a.split(","); var k = document.createElement("div"), f; k.innerHTML = "\x26" + a.join(";\x26") + ";"; f = k.innerHTML; k = null; for (k = 0; k < f.length; k++) { var e = f.charAt(k); c[e] = "\x26" + a[k] + ";"; h.push(e) } } c.regex = h.join(b ? "|" : ""); return c
            } CKEDITOR.plugins.add("entities", {
                afterInit: function (d) {
                    function b(a) { return e[a] } function c(a) {
                        return "force" !=
                            h.entities_processNumerical && k[a] ? k[a] : "\x26#" + a.charCodeAt(0) + ";"
                    } var h = d.config; if (d = (d = d.dataProcessor) && d.htmlFilter) {
                        var l = []; !1 !== h.basicEntities && l.push("nbsp,gt,lt,amp"); h.entities && (l.length && l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                            h.entities_latin && l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), h.entities_greek && l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                            h.entities_additional && l.push(h.entities_additional)); var k = a(l.join(",")), f = k.regex ? "[" + k.regex + "]" : "a^"; delete k.regex; h.entities && h.entities_processNumerical && (f = "[^ -~]|" + f); var f = new RegExp(f, "g"), e = a("nbsp,gt,lt,amp,shy", !0), m = new RegExp(e.regex, "g"); d.addRules({ text: function (a) { return a.replace(m, b).replace(f, c) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                    }
                }
            })
        }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0,
        CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            popup: function (a, d, b, c) {
                d = d || "80%"; b = b || "70%"; "string" == typeof d && 1 < d.length && "%" == d.substr(d.length - 1, 1) && (d = parseInt(window.screen.width * parseInt(d, 10) / 100, 10)); "string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10)); 640 > d && (d = 640); 420 > b && (b = 420); var h = parseInt((window.screen.height - b) / 2, 10), l = parseInt((window.screen.width -
                    d) / 2, 10); c = (c || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + d + ",height\x3d" + b + ",top\x3d" + h + ",left\x3d" + l; var k = window.open("", null, c, !0); if (!k) return !1; try { -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (k.moveTo(l, h), k.resizeTo(d, b)), k.focus(), k.location.href = a } catch (f) { window.open(a, null, c, !0) } return !0
            }
        }), function () {
            function a(a, b) {
                var c = []; if (b) for (var d in b) c.push(d +
                    "\x3d" + encodeURIComponent(b[d])); else return a; return a + (-1 != a.indexOf("?") ? "\x26" : "?") + c.join("\x26")
            } function d(a) { a += ""; return a.charAt(0).toUpperCase() + a.substr(1) } function b() {
                var b = this.getDialog(), c = b.getParentEditor(); c._.filebrowserSe = this; var f = c.config["filebrowser" + d(b.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%", b = c.config["filebrowser" + d(b.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%", h = this.filebrowser.params || {}; h.CKEditor = c.name; h.CKEditorFuncNum =
                    c._.filebrowserFn; h.langCode || (h.langCode = c.langCode); h = a(this.filebrowser.url, h); c.popup(h, f, b, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
            } function c() { var a = this.getDialog(); a.getParentEditor()._.filebrowserSe = this; return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1 } function h(b, c, d) {
                var f = d.params || {}; f.CKEditor = b.name; f.CKEditorFuncNum = b._.filebrowserFn; f.langCode ||
                    (f.langCode = b.langCode); c.action = a(d.url, f); c.filebrowser = d
            } function l(a, f, g, k) {
                if (k && k.length) for (var p, q = k.length; q--;)if (p = k[q], "hbox" != p.type && "vbox" != p.type && "fieldset" != p.type || l(a, f, g, p.children), p.filebrowser) if ("string" == typeof p.filebrowser && (p.filebrowser = { action: "fileButton" == p.type ? "QuickUpload" : "Browse", target: p.filebrowser }), "Browse" == p.filebrowser.action) {
                    var r = p.filebrowser.url; void 0 === r && (r = a.config["filebrowser" + d(f) + "BrowseUrl"], void 0 === r && (r = a.config.filebrowserBrowseUrl));
                    r && (p.onClick = b, p.filebrowser.url = r, p.hidden = !1)
                } else if ("QuickUpload" == p.filebrowser.action && p["for"] && (r = p.filebrowser.url, void 0 === r && (r = a.config["filebrowser" + d(f) + "UploadUrl"], void 0 === r && (r = a.config.filebrowserUploadUrl)), r)) {
                    var w = p.onClick; p.onClick = function (a) {
                        var b = a.sender; if (w && !1 === w.call(b, a)) return !1; if (c.call(b, a)) {
                            a = b.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement(); if (b = new CKEDITOR.dom.element(a.$.form)) (a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) :
                                (a = new CKEDITOR.dom.element("input"), a.setAttributes({ name: "ckCsrfToken", type: "hidden" }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken()); return !0
                        } return !1
                    }; p.filebrowser.url = r; p.hidden = !1; h(a, g.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser)
                }
            } function k(a, b, c) { if (-1 !== c.indexOf(";")) { c = c.split(";"); for (var d = 0; d < c.length; d++)if (k(a, b, c[d])) return !0; return !1 } return (a = a.getContents(b).get(c).filebrowser) && a.url } function f(a, b) {
                var c = this._.filebrowserSe.getDialog(), d = this._.filebrowserSe["for"],
                f = this._.filebrowserSe.filebrowser.onSelect; d && c.getContentElement(d[0], d[1]).reset(); if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe)) if (!f || !1 !== f.call(this._.filebrowserSe, a, b)) if ("string" == typeof b && b && alert(b), a && (d = this._.filebrowserSe, c = d.getDialog(), d = d.filebrowser.target || null)) if (d = d.split(":"), f = c.getContentElement(d[0], d[1])) f.setValue(a), c.selectPage(d[0])
            } CKEDITOR.plugins.add("filebrowser", {
                requires: "popup", init: function (a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(f, a);
                    a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) })
                }
            }); CKEDITOR.on("dialogDefinition", function (a) { if (a.editor.plugins.filebrowser) for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)if (c = b.contents[d]) l(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !k(b, c.id, c.filebrowser)) })
        }(), CKEDITOR.plugins.add("find", {
            requires: "dialog", init: function (a) {
                var d = a.addCommand("find", new CKEDITOR.dialogCommand("find")); d.canUndo = !1; d.readOnly = 1; a.addCommand("replace",
                    new CKEDITOR.dialogCommand("replace")).canUndo = !1; a.ui.addButton && (a.ui.addButton("Find", { label: a.lang.find.find, command: "find", toolbar: "find,10" }), a.ui.addButton("Replace", { label: a.lang.find.replace, command: "replace", toolbar: "find,20" })); CKEDITOR.dialog.add("find", this.path + "dialogs/find.js"); CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js")
            }
        }), CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } }, function () {
            function a(a, b) {
                var d = c.exec(a), e = c.exec(b);
                if (d) { if (!d[2] && "px" == e[2]) return e[1]; if ("px" == d[2] && !e[2]) return e[1] + "px" } return b
            } var d = CKEDITOR.htmlParser.cssStyle, b = CKEDITOR.tools.cssLength, c = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, h = {
                elements: {
                    $: function (b) {
                        var c = b.attributes; if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) {
                            var f = (new d(b)).rules; b = c.attributes; var e = f.width, f = f.height; e && (b.width = a(b.width, e)); f && (b.height = a(b.height,
                                f))
                        } return c
                    }
                }
            }; CKEDITOR.plugins.add("fakeobjects", { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(h, { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement = function (a, c, f, e) {
                var h = this.lang.fakeobjects, h = h[f] || h.unknown; c = {
                    "class": c, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: h, title: h, align: a.getAttribute("align") ||
                        ""
                }; CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData); f && (c["data-cke-real-element-type"] = f); e && (c["data-cke-resizable"] = e, f = new d, e = a.getAttribute("width"), a = a.getAttribute("height"), e && (f.rules.width = b(e)), a && (f.rules.height = b(a)), f.populate(c)); return this.document.createElement("img", { attributes: c })
            }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, c, f, e) {
                var h = this.lang.fakeobjects, h = h[f] || h.unknown, g; g = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(g); g = g.getHtml(); c =
                    { "class": c, "data-cke-realelement": encodeURIComponent(g), "data-cke-real-node-type": a.type, alt: h, title: h, align: a.attributes.align || "" }; CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData); f && (c["data-cke-real-element-type"] = f); e && (c["data-cke-resizable"] = e, e = a.attributes, a = new d, f = e.width, e = e.height, void 0 !== f && (a.rules.width = b(f)), void 0 !== e && (a.rules.height = b(e)), a.populate(c)); return new CKEDITOR.htmlParser.element("img", c)
            }; CKEDITOR.editor.prototype.restoreRealElement = function (b) {
                if (b.data("cke-real-node-type") !=
                    CKEDITOR.NODE_ELEMENT) return null; var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document); if (b.data("cke-resizable")) { var d = b.getStyle("width"); b = b.getStyle("height"); d && c.setAttribute("width", a(c.getAttribute("width"), d)); b && c.setAttribute("height", a(c.getAttribute("height"), b)) } return c
            }
        }(), function () {
            function a(a) { a = a.attributes; return "application/x-shockwave-flash" == a.type || b.test(a.src || "") } function d(a, b) {
                return a.createFakeParserElement(b, "cke_flash",
                    "flash", !0)
            } var b = /\.swf(?:$|\?)/i; CKEDITOR.plugins.add("flash", {
                requires: "dialog,fakeobjects", onLoad: function () { CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") }, init: function (a) {
                    var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]"; CKEDITOR.dialog.isTabEnabled(a,
                        "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]"); CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b += ";object[id]{*}; embed[bgcolor]{*}(*)"); a.addCommand("flash", new CKEDITOR.dialogCommand("flash", { allowedContent: b, requiredContent: "embed" })); a.ui.addButton && a.ui.addButton("Flash", { label: a.lang.common.flash, command: "flash", toolbar: "insert,20" }); CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js"); a.addMenuItems && a.addMenuItems({
                            flash: {
                                label: a.lang.flash.properties,
                                command: "flash", group: "flash"
                            }
                        }); a.on("doubleclick", function (a) { var b = a.data.element; b.is("img") && "flash" == b.data("cke-real-element-type") && (a.data.dialog = "flash") }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type")) return { flash: CKEDITOR.TRISTATE_OFF } })
                }, afterInit: function (b) {
                    var h = b.dataProcessor; (h = h && h.dataFilter) && h.addRules({
                        elements: {
                            "cke:object": function (h) {
                                var k = h.attributes; if (!(k.classid && String(k.classid).toLowerCase() ||
                                    a(h))) { for (k = 0; k < h.children.length; k++)if ("cke:embed" == h.children[k].name) { if (!a(h.children[k])) break; return d(b, h) } return null } return d(b, h)
                            }, "cke:embed": function (h) { return a(h) ? d(b, h) : null }
                        }
                    }, 5)
                }
            })
        }(), CKEDITOR.tools.extend(CKEDITOR.config, { flashEmbedTagOnly: !1, flashAddEmbedTag: !0, flashConvertOnEdit: !1 }), function () {
            function a(a) {
                var h = a.config, l = a.fire("uiSpace", { space: "top", html: "" }).html, k = function () {
                    function f(a, c, d) { e.setStyle(c, b(d)); e.setStyle("position", a) } function g(a) {
                        var b = m.getDocumentPosition();
                        switch (a) { case "top": f("absolute", "top", b.y - t - y); break; case "pin": f("fixed", "top", z); break; case "bottom": f("absolute", "top", b.y + (u.height || u.bottom - u.top) + y) }l = a
                    } var l, m, w, u, v, t, B, x = h.floatSpaceDockedOffsetX || 0, y = h.floatSpaceDockedOffsetY || 0, C = h.floatSpacePinnedOffsetX || 0, z = h.floatSpacePinnedOffsetY || 0; return function (f) {
                        if (m = a.editable()) {
                            var n = f && "focus" == f.name; n && e.show(); a.fire("floatingSpaceLayout", { show: n }); e.removeStyle("left"); e.removeStyle("right"); w = e.getClientRect(); u = m.getClientRect();
                            v = d.getViewPaneSize(); t = w.height; B = "pageXOffset" in d.$ ? d.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; l ? (t + y <= u.top ? g("top") : t + y > v.height - u.bottom ? g("pin") : g("bottom"), f = v.width / 2, f = h.floatSpacePreferRight ? "right" : 0 < u.left && u.right < v.width && u.width > w.width ? "rtl" == h.contentsLangDirection ? "right" : "left" : f - u.left > u.right - f ? "left" : "right", w.width > v.width ? (f = "left", n = 0) : (n = "left" == f ? 0 < u.left ? u.left : 0 : u.right < v.width ? v.width - u.right : 0, n + w.width > v.width && (f = "left" == f ? "right" : "left", n = 0)),
                                e.setStyle(f, b(("pin" == l ? C : x) + n + ("pin" == l ? 0 : "left" == f ? B : -B)))) : (l = "pin", g("pin"), k(f))
                        }
                    }
                }(); if (l) {
                    var f = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' :
                        " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), e = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(f.output({ content: l, id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;z-index:" + (h.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.title }))), m = CKEDITOR.tools.eventsBuffer(500, k), g = CKEDITOR.tools.eventsBuffer(100, k); e.unselectable(); e.on("mousedown",
                            function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); a.on("focus", function (b) { k(b); a.on("change", m.input); d.on("scroll", g.input); d.on("resize", g.input) }); a.on("blur", function () { e.hide(); a.removeListener("change", m.input); d.removeListener("scroll", g.input); d.removeListener("resize", g.input) }); a.on("destroy", function () { d.removeListener("scroll", g.input); d.removeListener("resize", g.input); e.clearCustomData(); e.remove() }); a.focusManager.hasFocus && e.show(); a.focusManager.add(e,
                                1)
                }
            } var d = CKEDITOR.document.getWindow(), b = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (b) { b.on("loaded", function () { a(this) }, null, null, 20) } })
        }(), CKEDITOR.plugins.add("listblock", {
            requires: "panel", onLoad: function () {
                var a = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), d = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
                b = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), c = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block, $: function (a, b) {
                        b = b || {}; var c = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0); !c.role &&
                            (c.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", c.role); c = this.keys; c[40] = "next"; c[9] = "next"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (c[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                    }, _: {
                        close: function () { if (this._.started) { var b = a.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(b); delete this._.started } }, getClick: function () {
                            this._.click ||
                            (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click
                        }
                    }, proto: {
                        add: function (a, b, k) {
                            var f = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = f; var e; e = CKEDITOR.tools.htmlEncodeAttr(a).replace(c, "\\'"); a = { id: f, val: e, onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(k || a), text: b || a };
                            this._.pendingList.push(d.output(a))
                        }, startGroup: function (a) { this._.close(); var c = CKEDITOR.tools.getNextId(); this._.groups[a] = c; this._.pendingHtml.push(b.output({ id: c, label: a })) }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) {
                            var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display",
                                "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                        }, hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") }, showAll: function () { var a = this._.items, b = this._.groups, c = this.element.getDocument(), d; for (d in a) c.getById(a[d]).setStyle("display", ""); for (var e in b) a = c.getById(b[e]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display", "") }, mark: function (a) {
                            this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a);
                            b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b)
                        }, markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) { var b = this.element.getDocument(); a = this._.items[a]; var c = b.getById(a); c.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected"); this.onUnmark && this.onUnmark(c) }, unmarkAll: function () {
                            var a = this._.items, b = this.element.getDocument(),
                            c; for (c in a) { var d = a[c]; b.getById(d).removeClass("cke_selected"); b.getById(d + "_option").removeAttribute("aria-selected") } this.onUnmark && this.onUnmark()
                        }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) {
                            this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), c, d = -1; if (a) for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++d);) { if (a.equals(c)) { this._.focusIndex = d; break } } else this.element.focus();
                            c && setTimeout(function () { c.focus() }, 0)
                        }
                    }
                })
            }
        }), CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } }), function () {
            var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ?
                "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' :
                    "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), d = CKEDITOR.addTemplate("combo", a); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                        $: function (a) {
                            CKEDITOR.tools.extend(this,
                                a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel"; a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {} }
                        }, proto: {
                            renderHtml: function (a) { var c = []; this.render(a, c); return c.join("") }, render: function (a, c) {
                                function h() {
                                    if (this.getState() != CKEDITOR.TRISTATE_ON) {
                                        var c =
                                            this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED); this.setState(c); this.setValue(""); c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
                                    }
                                } var l = CKEDITOR.env, k = "cke_" + this.id, f = CKEDITOR.tools.addFunction(function (c) { p && (a.unlockSelection(1), p = 0); m.execute(c) }, this), e = this, m = {
                                    id: k, combo: this, focus: function () { CKEDITOR.document.getById(k).getChild(1).focus() }, execute: function (c) {
                                        var d = e._; if (d.state != CKEDITOR.TRISTATE_DISABLED) if (e.createPanel(a),
                                            d.on) d.panel.hide(); else { e.commit(); var f = e.getValue(); f ? d.list.mark(f) : d.list.unmarkAll(); d.panel.showBlock(e.id, new CKEDITOR.dom.element(c), 4) }
                                    }, clickFn: f
                                }; a.on("activeFilterChange", h, this); a.on("mode", h, this); a.on("selectionChange", h, this); !this.readOnly && a.on("readOnly", h, this); var g = CKEDITOR.tools.addFunction(function (a, b) { a = new CKEDITOR.dom.event(a); var c = a.getKeystroke(); switch (c) { case 13: case 32: case 40: CKEDITOR.tools.callFunction(f, b); break; default: m.onkey(m, c) }a.preventDefault() }), n = CKEDITOR.tools.addFunction(function () {
                                    m.onfocus &&
                                    m.onfocus()
                                }), p = 0; m.keyDownFn = g; l = { id: k, name: this.name || this.command, label: this.label, title: this.title, cls: this.className || "", titleJs: l.gecko && !l.hc ? "" : (this.title || "").replace("'", ""), keydownFn: g, focusFn: n, clickFn: f }; d.output(l, c); if (this.onRender) this.onRender(); return m
                            }, createPanel: function (a) {
                                if (!this._.panel) {
                                    var c = this._.panelDefinition, d = this._.panelDefinition.block, l = c.parent || CKEDITOR.document.getBody(), k = "cke_combopanel__" + this.name, f = new CKEDITOR.ui.floatPanel(a, l, c), c = f.addListBlock(this.id,
                                        d), e = this; f.onShow = function () { this.element.addClass(k); e.setState(CKEDITOR.TRISTATE_ON); e._.on = 1; e.editorFocus && !a.focusManager.hasFocus && a.focus(); if (e.onOpen) e.onOpen() }; f.onHide = function (c) { this.element.removeClass(k); e.setState(e.modes && e.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); e._.on = 0; if (!c && e.onClose) e.onClose() }; f.onEscape = function () { f.hide(1) }; c.onClick = function (a, b) { e.onClick && e.onClick.call(e, a, b); f.hide() }; this._.panel = f; this._.list = c; f.getBlock(this.id).onHide =
                                            function () { e._.on = 0; e.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                                }
                            }, setValue: function (a, c) { this._.value = a; var d = this.document.getById("cke_" + this.id + "_text"); d && (a || c ? d.removeClass("cke_combo_inlinelabel") : (c = this.label, d.addClass("cke_combo_inlinelabel")), d.setText("undefined" != typeof c ? c : a)) }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) }, hideItem: function (a) { this._.list.hideItem(a) }, hideGroup: function (a) { this._.list.hideGroup(a) },
                            showAll: function () { this._.list.showAll() }, add: function (a, c, d) { this._.items[a] = d || a; this._.list.add(a, c, d) }, startGroup: function (a) { this._.list.startGroup(a) }, commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)); this._.committed = 1 }, setState: function (a) {
                                if (this._.state != a) {
                                    var c = this.document.getById("cke_" + this.id); c.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ? c.setAttribute("aria-disabled", !0) : c.removeAttribute("aria-disabled"); this._.state =
                                        a
                                }
                            }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }
                        }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
                    }); CKEDITOR.ui.prototype.addRichCombo = function (a, c) { this.add(a, CKEDITOR.UI_RICHCOMBO, c) }
        }(), function () {
            function a(a, c, h, l, k, f, e, m) {
                var g = a.config, n = new CKEDITOR.style(e),
                p = k.split(";"); k = []; for (var q = {}, r = 0; r < p.length; r++) { var w = p[r]; if (w) { var w = w.split("/"), u = {}, v = p[r] = w[0]; u[h] = k[r] = w[1] || v; q[v] = new CKEDITOR.style(e, u); q[v]._.definition.name = v } else p.splice(r--, 1) } a.ui.addRichCombo(c, {
                    label: l.label, title: l.panelTitle, toolbar: "styles," + m, defaultValue: "cke-default", allowedContent: n, requiredContent: n, contentTransformations: [[{
                        element: "font", check: "span", left: function (a) { return !!a.attributes.size || !!a.attributes.align || !!a.attributes.face }, right: function (a) {
                            var b = " x-small small medium large x-large xx-large 48px".split(" ");
                            a.name = "span"; a.attributes.size && (a.styles["font-size"] = b[a.attributes.size], delete a.attributes.size); a.attributes.align && (a.styles["text-align"] = a.attributes.align, delete a.attributes.align); a.attributes.face && (a.styles["font-family"] = a.attributes.face, delete a.attributes.face)
                        }
                    }]], panel: { css: [CKEDITOR.skin.getPath("editor")].concat(g.contentsCss), multiSelect: !1, attributes: { "aria-label": l.panelTitle } }, init: function () {
                        var c; c = "(" + a.lang.common.optionDefault + ")"; this.startGroup(l.panelTitle); this.add(this.defaultValue,
                            c, c); for (var e = 0; e < p.length; e++)c = p[e], this.add(c, q[c].buildPreview(), c)
                    }, onClick: function (c) {
                        a.focus(); a.fire("saveSnapshot"); var e = this.getValue(), f = q[c], g, h, k, l, m; if (e && c != e) if (g = q[e], e = a.getSelection().getRanges()[0], e.collapsed) {
                            if (h = a.elementPath(), k = h.contains(function (a) { return g.checkElementRemovable(a) })) {
                                l = e.checkBoundaryOfElement(k, CKEDITOR.START); m = e.checkBoundaryOfElement(k, CKEDITOR.END); if (l && m) { for (l = e.createBookmark(); h = k.getFirst();)h.insertBefore(k); k.remove(); e.moveToBookmark(l) } else l ||
                                    m ? e.moveToPosition(k, l ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_END) : (e.splitElement(k), e.moveToPosition(k, CKEDITOR.POSITION_AFTER_END)), d(e, h.elements.slice(), k); a.getSelection().selectRanges([e])
                            }
                        } else a.removeStyle(g); c === this.defaultValue ? g && a.removeStyle(g) : a.applyStyle(f); a.fire("saveSnapshot")
                    }, onRender: function () {
                        a.on("selectionChange", function (c) {
                            var e = this.getValue(); c = c.data.path.elements; for (var d = 0, g; d < c.length; d++) {
                                g = c[d]; for (var h in q) if (q[h].checkElementMatch(g, !0, a)) {
                                    h !=
                                    e && this.setValue(h); return
                                }
                            } this.setValue("", f)
                        }, this)
                    }, refresh: function () { a.activeFilter.check(n) || this.setState(CKEDITOR.TRISTATE_DISABLED) }
                })
            } function d(a, c, h) { var l = c.pop(); if (l) { if (h) return d(a, c, l.equals(h) ? null : h); h = l.clone(); a.insertNode(h); a.moveToPosition(h, CKEDITOR.POSITION_AFTER_START); d(a, c) } } CKEDITOR.plugins.add("font", {
                requires: "richcombo", init: function (b) {
                    var c = b.config; a(b, "Font", "family", b.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30); a(b, "FontSize", "size", b.lang.font.fontSize,
                        c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40)
                }
            })
        }(), CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif", CKEDITOR.config.font_defaultLabel =
        "", CKEDITOR.config.font_style = { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] }, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] }, CKEDITOR.plugins.add("format", {
            requires: "richcombo",
            init: function (a) {
                if (!a.blockless) {
                    for (var d = a.config, b = a.lang.format, c = d.format_tags.split(";"), h = {}, l = 0, k = [], f = 0; f < c.length; f++) { var e = c[f], m = new CKEDITOR.style(d["format_" + e]); if (!a.filter.customConfig || a.filter.check(m)) l++, h[e] = m, h[e]._.enterMode = a.config.enterMode, k.push(m) } 0 !== l && a.ui.addRichCombo("Format", {
                        label: b.label, title: b.panelTitle, toolbar: "styles,20", allowedContent: k, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(d.contentsCss), multiSelect: !1, attributes: { "aria-label": b.panelTitle } },
                        init: function () { this.startGroup(b.panelTitle); for (var a in h) { var c = b["tag_" + a]; this.add(a, h[a].buildPreview(c), c) } }, onClick: function (b) { a.focus(); a.fire("saveSnapshot"); b = h[b]; var c = a.elementPath(); b.checkActive(c, a) || a.applyStyle(b); setTimeout(function () { a.fire("saveSnapshot") }, 0) }, onRender: function () {
                            a.on("selectionChange", function (b) { var c = this.getValue(); b = b.data.path; this.refresh(); for (var e in h) if (h[e].checkActive(b, a)) { e != c && this.setValue(e, a.lang.format["tag_" + e]); return } this.setValue("") },
                                this)
                        }, onOpen: function () { this.showAll(); for (var b in h) a.activeFilter.check(h[b]) || this.hideItem(b) }, refresh: function () { var b = a.elementPath(); if (b) { if (b.isContextFor("p")) for (var c in h) if (a.activeFilter.check(h[c])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                    })
                }
            }
        }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = { element: "p" }, CKEDITOR.config.format_div = { element: "div" }, CKEDITOR.config.format_pre = { element: "pre" }, CKEDITOR.config.format_address = { element: "address" },
        CKEDITOR.config.format_h1 = { element: "h1" }, CKEDITOR.config.format_h2 = { element: "h2" }, CKEDITOR.config.format_h3 = { element: "h3" }, CKEDITOR.config.format_h4 = { element: "h4" }, CKEDITOR.config.format_h5 = { element: "h5" }, CKEDITOR.config.format_h6 = { element: "h6" }, CKEDITOR.plugins.add("forms", {
            requires: "dialog,fakeobjects", onLoad: function () {
                CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"); CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") +
                    ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")
            }, init: function (a) {
                var d = a.lang, b = 0, c = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 }, h = {
                    checkbox: "input[type,name,checked,required]", radio: "input[type,name,checked,required]", textfield: "input[type,name,value,size,maxlength,required]", textarea: "textarea[cols,rows,name,required]", select: "select[name,size,multiple,required]; option[value,selected]", button: "input[type,name,value]",
                    form: "form[action,name,id,enctype,target,method]", hiddenfield: "input[type,name,value]", imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
                }, l = { checkbox: "input", radio: "input", textfield: "input", textarea: "textarea", select: "select", button: "input", form: "form", hiddenfield: "input", imagebutton: "input" }, k = function (c, e, f) {
                    var k = { allowedContent: h[e], requiredContent: l[e] }; "form" == e && (k.context = "form"); a.addCommand(e, new CKEDITOR.dialogCommand(e, k)); a.ui.addButton && a.ui.addButton(c,
                        { label: d.common[c.charAt(0).toLowerCase() + c.slice(1)], command: e, toolbar: "forms," + (b += 10) }); CKEDITOR.dialog.add(e, f)
                }, f = this.path + "dialogs/"; !a.blockless && k("Form", "form", f + "form.js"); k("Checkbox", "checkbox", f + "checkbox.js"); k("Radio", "radio", f + "radio.js"); k("TextField", "textfield", f + "textfield.js"); k("Textarea", "textarea", f + "textarea.js"); k("Select", "select", f + "select.js"); k("Button", "button", f + "button.js"); var e = a.plugins.image; e && !a.plugins.image2 && k("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") +
                    "dialogs/image.js"); k("HiddenField", "hiddenfield", f + "hiddenfield.js"); a.addMenuItems && (k = {
                        checkbox: { label: d.forms.checkboxAndRadio.checkboxTitle, command: "checkbox", group: "checkbox" }, radio: { label: d.forms.checkboxAndRadio.radioTitle, command: "radio", group: "radio" }, textfield: { label: d.forms.textfield.title, command: "textfield", group: "textfield" }, hiddenfield: { label: d.forms.hidden.title, command: "hiddenfield", group: "hiddenfield" }, button: { label: d.forms.button.title, command: "button", group: "button" }, select: {
                            label: d.forms.select.title,
                            command: "select", group: "select"
                        }, textarea: { label: d.forms.textarea.title, command: "textarea", group: "textarea" }
                    }, e && (k.imagebutton = { label: d.image.titleButton, command: "imagebutton", group: "imagebutton" }), !a.blockless && (k.form = { label: d.forms.form.menu, command: "form", group: "form" }), a.addMenuItems(k)); a.contextMenu && (!a.blockless && a.contextMenu.addListener(function (a, b, c) { if ((a = c.contains("form", 1)) && !a.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } }), a.contextMenu.addListener(function (a) {
                        if (a && !a.isReadOnly()) {
                            var b =
                                a.getName(); if ("select" == b) return { select: CKEDITOR.TRISTATE_OFF }; if ("textarea" == b) return { textarea: CKEDITOR.TRISTATE_OFF }; if ("input" == b) { var d = a.getAttribute("type") || "text"; switch (d) { case "button": case "submit": case "reset": return { button: CKEDITOR.TRISTATE_OFF }; case "checkbox": return { checkbox: CKEDITOR.TRISTATE_OFF }; case "radio": return { radio: CKEDITOR.TRISTATE_OFF }; case "image": return e ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null }if (c[d]) return { textfield: CKEDITOR.TRISTATE_OFF } } if ("img" == b && "hiddenfield" ==
                                    a.data("cke-real-element-type")) return { hiddenfield: CKEDITOR.TRISTATE_OFF }
                        }
                    })); a.on("doubleclick", function (b) {
                        var e = b.data.element; if (!a.blockless && e.is("form")) b.data.dialog = "form"; else if (e.is("select")) b.data.dialog = "select"; else if (e.is("textarea")) b.data.dialog = "textarea"; else if (e.is("img") && "hiddenfield" == e.data("cke-real-element-type")) b.data.dialog = "hiddenfield"; else if (e.is("input")) {
                            e = e.getAttribute("type") || "text"; switch (e) {
                                case "button": case "submit": case "reset": b.data.dialog = "button";
                                    break; case "checkbox": b.data.dialog = "checkbox"; break; case "radio": b.data.dialog = "radio"; break; case "image": b.data.dialog = "imagebutton"
                            }c[e] && (b.data.dialog = "textfield")
                        }
                    })
            }, afterInit: function (a) {
                var d = a.dataProcessor, b = d && d.htmlFilter, d = d && d.dataFilter; CKEDITOR.env.ie && b && b.addRules({ elements: { input: function (a) { a = a.attributes; var b = a.type; b || (a.type = "text"); "checkbox" != b && "radio" != b || "on" != a.value || delete a.value } } }, { applyToAll: !0 }); d && d.addRules({
                    elements: {
                        input: function (b) {
                            if ("hidden" == b.attributes.type) return a.createFakeParserElement(b,
                                "cke_hidden", "hiddenfield")
                        }
                    }
                }, { applyToAll: !0 })
            }
        }), function () { var a = { canUndo: !1, exec: function (a) { var b = a.document.createElement("hr"); a.insertElement(b) }, allowedContent: "hr", requiredContent: "hr" }; CKEDITOR.plugins.add("horizontalrule", { init: function (d) { d.blockless || (d.addCommand("horizontalrule", a), d.ui.addButton && d.ui.addButton("HorizontalRule", { label: d.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })) } }) }(), CKEDITOR.plugins.add("htmlwriter", {
            init: function (a) {
                var d = new CKEDITOR.htmlWriter;
                d.forceSimpleAmpersand = a.config.forceSimpleAmpersand; d.indentationChars = a.config.dataIndentationChars || "\t"; a.dataProcessor.writer = d
            }
        }), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
            base: CKEDITOR.htmlParser.basicWriter, $: function () {
                this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var a = CKEDITOR.dtd, d; for (d in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem,
                    a.$tableContent)) this.setRules(d, { indent: !a[d]["#"], breakBeforeOpen: 1, breakBeforeClose: !a[d]["#"], breakAfterClose: 1, needsSpace: d in a.$block && !(d in { li: 1, dt: 1, dd: 1 }) }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
            }, proto: {
                openTag: function (a) {
                    var d = this._.rules[a]; this._.afterCloser && d && d.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ?
                        this.indentation() : d && d.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", a); this._.afterCloser = 0
                }, openTagClose: function (a, d) { var b = this._.rules[a]; d ? (this._.output.push(this.selfClosingEnd), b && b.breakAfterClose && (this._.needsSpace = b.needsSpace)) : (this._.output.push("\x3e"), b && b.indent && (this._.indentation += this.indentationChars)); b && b.breakAfterOpen && this.lineBreak(); "pre" == a && (this._.inPre = 1) }, attribute: function (a, d) {
                    "string" == typeof d && (this.forceSimpleAmpersand &&
                        (d = d.replace(/&amp;/g, "\x26")), d = CKEDITOR.tools.htmlEncodeAttr(d)); this._.output.push(" ", a, '\x3d"', d, '"')
                }, closeTag: function (a) { var d = this._.rules[a]; d && d.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : d && d.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push("\x3c/", a, "\x3e"); "pre" == a && (this._.inPre = 0); d && d.breakAfterClose && (this.lineBreak(), this._.needsSpace = d.needsSpace); this._.afterCloser = 1 }, text: function (a) {
                    this._.indent &&
                    (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a))); this._.output.push(a)
                }, comment: function (a) { this._.indent && this.indentation(); this._.output.push("\x3c!--", a, "--\x3e") }, lineBreak: function () { !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent = 1 }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () {
                    this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser =
                        0; this._.inPre = 0; this._.needsSpace = 0
                }, setRules: function (a, d) { var b = this._.rules[a]; b ? CKEDITOR.tools.extend(b, d, !0) : this._.rules[a] = d }
            }
        }), function () {
            CKEDITOR.plugins.add("iframe", {
                requires: "dialog,fakeobjects", onLoad: function () { CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") }, init: function (a) {
                    var d = a.lang.iframe, b = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
                    a.plugins.dialogadvtab && (b += ";iframe" + a.plugins.dialogadvtab.allowedContent({ id: 1, classes: 1, styles: 1 })); CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js"); a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", { allowedContent: b, requiredContent: "iframe" })); a.ui.addButton && a.ui.addButton("Iframe", { label: d.toolbar, command: "iframe", toolbar: "insert,80" }); a.on("doubleclick", function (a) { var b = a.data.element; b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe") }); a.addMenuItems &&
                        a.addMenuItems({ iframe: { label: d.title, command: "iframe", group: "image" } }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return { iframe: CKEDITOR.TRISTATE_OFF } })
                }, afterInit: function (a) { var d = a.dataProcessor; (d = d && d.dataFilter) && d.addRules({ elements: { iframe: function (b) { return a.createFakeParserElement(b, "cke_iframe", "iframe", !0) } } }) }
            })
        }(), function () {
            function a(a, c) {
                c || (c = a.getSelection().getSelectedElement()); if (c && c.is("img") && !c.data("cke-realelement") &&
                    !c.isReadOnly()) return c
            } function d(a) { var c = a.getStyle("float"); if ("inherit" == c || "none" == c) c = 0; c || (c = a.getAttribute("align")); return c } CKEDITOR.plugins.add("image", {
                requires: "dialog", init: function (b) {
                    if (!b.plugins.image2) {
                        CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var c = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}"; CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (c = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                        b.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: c, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); b.ui.addButton && b.ui.addButton("Image", { label: b.lang.common.image, command: "image", toolbar: "insert,10" }); b.on("doubleclick", function (a) { var b = a.data.element; !b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image") }); b.addMenuItems &&
                            b.addMenuItems({ image: { label: b.lang.image.menu, command: "image", group: "image" } }); b.contextMenu && b.contextMenu.addListener(function (c) { if (a(b, c)) return { image: CKEDITOR.TRISTATE_OFF } })
                    }
                }, afterInit: function (b) {
                    function c(c) {
                        var l = b.getCommand("justify" + c); if (l) {
                            if ("left" == c || "right" == c) l.on("exec", function (k) { var f = a(b), e; f && (e = d(f), e == c ? (f.removeStyle("float"), c == d(f) && f.removeAttribute("align")) : f.setStyle("float", c), k.cancel()) }); l.on("refresh", function (k) {
                                var f = a(b); f && (f = d(f), this.setState(f == c ? CKEDITOR.TRISTATE_ON :
                                    "right" == c || "left" == c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), k.cancel())
                            })
                        }
                    } b.plugins.image2 || (c("left"), c("right"), c("center"), c("block"))
                }
            })
        }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function () {
            function a(a, h) {
                var l, k; h.on("refresh", function (a) { var c = [d], h; for (h in a.data.states) c.push(a.data.states[h]); this.setState(CKEDITOR.tools.search(c, b) ? b : d) }, h, null, 100); h.on("exec", function (b) { l = a.getSelection(); k = l.createBookmarks(1); b.data || (b.data = {}); b.data.done = !1 }, h, null, 0); h.on("exec",
                    function () { a.forceNextSelectionCheck(); l.selectBookmarks(k) }, h, null, 100)
            } var d = CKEDITOR.TRISTATE_DISABLED, b = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
                init: function (b) {
                    var d = CKEDITOR.plugins.indent.genericDefinition; a(b, b.addCommand("indent", new d(!0))); a(b, b.addCommand("outdent", new d)); b.ui.addButton && (b.ui.addButton("Indent", { label: b.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }), b.ui.addButton("Outdent", {
                        label: b.lang.indent.outdent, command: "outdent", directional: !0,
                        toolbar: "indent,10"
                    })); b.on("dirChanged", function (a) {
                        var d = b.createRange(), f = a.data.node; d.setStartBefore(f); d.setEndAfter(f); for (var e = new CKEDITOR.dom.walker(d), h; h = e.next();)if (h.type == CKEDITOR.NODE_ELEMENT) if (!h.equals(f) && h.getDirection()) d.setStartAfter(h), e = new CKEDITOR.dom.walker(d); else {
                            var g = b.config.indentClasses; if (g) for (var n = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], p = 0; p < g.length; p++)h.hasClass(g[p] + n[0]) && (h.removeClass(g[p] + n[0]), h.addClass(g[p] + n[1])); g = h.getStyle("margin-right");
                            n = h.getStyle("margin-left"); g ? h.setStyle("margin-left", g) : h.removeStyle("margin-left"); n ? h.setStyle("margin-right", n) : h.removeStyle("margin-right")
                        }
                    })
                }
            }); CKEDITOR.plugins.indent = {
                genericDefinition: function (a) { this.isIndent = !!a; this.startDisabled = !this.isIndent }, specificDefinition: function (a, b, d) { this.name = b; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!d; this.relatedGlobal = d ? "indent" : "outdent"; this.indentKey = d ? 9 : CKEDITOR.SHIFT + 9; this.database = {} }, registerCommands: function (a,
                    b) { a.on("pluginsLoaded", function () { for (var a in b) (function (a, b) { var c = a.getCommand(b.relatedGlobal), d; for (d in b.jobs) c.on("exec", function (c) { c.data.done || (a.fire("lockSnapshot"), b.execJob(a, d) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database)) }, this, null, d), c.on("refresh", function (c) { c.data.states || (c.data.states = {}); c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path) }, this, null, d); a.addFeature(b) })(this, b[a]) }) }
            }; CKEDITOR.plugins.indent.genericDefinition.prototype =
                { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype = { execJob: function (a, b) { var l = this.jobs[b]; if (l.state != d) return l.exec.call(this, a) }, refreshJob: function (a, b, l) { b = this.jobs[b]; a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, l) : b.state = d; return b.state }, getContext: function (a) { return a.contains(this.context) } }
        }(), function () {
            function a(a, b, c) {
                if (!a.getCustomData("indent_processed")) {
                    var h = this.editor, g = this.isIndent; if (b) {
                        h = a.$.className.match(this.classNameRegex);
                        c = 0; h && (h = h[1], c = CKEDITOR.tools.indexOf(b, h) + 1); if (0 > (c += g ? 1 : -1)) return; c = Math.min(c, b.length); c = Math.max(c, 0); a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, "")); 0 < c && a.addClass(b[c - 1])
                    } else { b = d(a, c); c = parseInt(a.getStyle(b), 10); var l = h.config.indentOffset || 40; isNaN(c) && (c = 0); c += (g ? 1 : -1) * l; if (0 > c) return; c = Math.max(c, 0); c = Math.ceil(c / l) * l; a.setStyle(b, c ? c + (h.config.indentUnit || "px") : ""); "" === a.getAttribute("style") && a.removeAttribute("style") } CKEDITOR.dom.element.setMarker(this.database,
                        a, "indent_processed", 1)
                }
            } function d(a, b) { return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right" } var b = CKEDITOR.dtd.$listItem, c = CKEDITOR.dtd.$list, h = CKEDITOR.TRISTATE_DISABLED, l = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentblock", {
                requires: "indent", init: function (k) {
                    function f() {
                        e.specificDefinition.apply(this, arguments); this.allowedContent = { "div h1 h2 h3 h4 h5 h6 ol p pre ul": { propertiesOnly: !0, styles: m ? null : "margin-left,margin-right", classes: m || null } }; this.contentTransformations =
                            [["div: splitMarginShorthand"], ["h1: splitMarginShorthand"], ["h2: splitMarginShorthand"], ["h3: splitMarginShorthand"], ["h4: splitMarginShorthand"], ["h5: splitMarginShorthand"], ["h6: splitMarginShorthand"], ["ol: splitMarginShorthand"], ["p: splitMarginShorthand"], ["pre: splitMarginShorthand"], ["ul: splitMarginShorthand"]]; this.enterBr && (this.allowedContent.div = !0); this.requiredContent = (this.enterBr ? "div" : "p") + (m ? "(" + m.join(",") + ")" : "{margin-left}"); this.jobs = {
                                20: {
                                    refresh: function (a, c) {
                                        var e = c.block ||
                                            c.blockLimit; if (!e.is(b)) var f = e.getAscendant(b), e = f && c.contains(f) || e; e.is(b) && (e = e.getParent()); if (this.enterBr || this.getContext(c)) { if (m) { var f = m, e = e.$.className.match(this.classNameRegex), k = this.isIndent, f = e ? k ? e[1] != f.slice(-1) : !0 : k; return f ? l : h } return this.isIndent ? l : e ? CKEDITOR[0 >= (parseInt(e.getStyle(d(e)), 10) || 0) ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : h } return h
                                    }, exec: function (b) {
                                        var e = b.getSelection(), e = e && e.getRanges()[0], d; if (d = b.elementPath().contains(c)) a.call(this, d, m); else for (e = e.createIterator(),
                                            b = b.config.enterMode, e.enforceRealBlocks = !0, e.enlargeBr = b != CKEDITOR.ENTER_BR; d = e.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");)d.isReadOnly() || a.call(this, d, m); return !0
                                    }
                                }
                            }
                    } var e = CKEDITOR.plugins.indent, m = k.config.indentClasses; e.registerCommands(k, { indentblock: new f(k, "indentblock", !0), outdentblock: new f(k, "outdentblock") }); CKEDITOR.tools.extend(f.prototype, e.specificDefinition.prototype, {
                        context: { div: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1 }, classNameRegex: m ? new RegExp("(?:^|\\s+)(" +
                            m.join("|") + ")(?\x3d$|\\s)") : null
                    })
                }
            })
        }(), function () {
            function a(a) {
                function c(e) {
                    for (var d = l.startContainer, t = l.endContainer; d && !d.getParent().equals(e);)d = d.getParent(); for (; t && !t.getParent().equals(e);)t = t.getParent(); if (!d || !t) return !1; for (var B = [], r = !1; !r;)d.equals(t) && (r = !0), B.push(d), d = d.getNext(); if (1 > B.length) return !1; d = e.getParents(!0); for (t = 0; t < d.length; t++)if (d[t].getName && k[d[t].getName()]) { e = d[t]; break } for (var d = h.isIndent ? 1 : -1, t = B[0], B = B[B.length - 1], r = CKEDITOR.plugins.list.listToArray(e,
                        g), y = r[B.getCustomData("listarray_index")].indent, t = t.getCustomData("listarray_index"); t <= B.getCustomData("listarray_index"); t++)if (r[t].indent += d, 0 < d) { for (var w = r[t].parent, z = t - 1; 0 <= z; z--)if (r[z].indent === d) { w = r[z].parent; break } r[t].parent = new CKEDITOR.dom.element(w.getName(), w.getDocument()) } for (t = B.getCustomData("listarray_index") + 1; t < r.length && r[t].indent > y; t++)r[t].indent += d; d = CKEDITOR.plugins.list.arrayToList(r, g, null, a.config.enterMode, e.getDirection()); if (!h.isIndent) {
                            var A; if ((A = e.getParent()) &&
                                A.is("li")) for (var B = d.listNode.getChildren(), q = [], D, t = B.count() - 1; 0 <= t; t--)(D = B.getItem(t)) && D.is && D.is("li") && q.push(D)
                        } d && d.listNode.replace(e); if (q && q.length) for (t = 0; t < q.length; t++) { for (D = e = q[t]; (D = D.getNext()) && D.is && D.getName() in k;)CKEDITOR.env.needsNbspFiller && !e.getFirst(b) && e.append(l.document.createText(" ")), e.append(D); e.insertAfter(A) } d && a.fire("contentDomInvalidated"); return !0
                } for (var h = this, g = this.database, k = this.context, l, q = a.getSelection(), q = (q && q.getRanges()).createIterator(); l =
                    q.getNextRange();) {
                        for (var r = l.getCommonAncestor(); r && (r.type != CKEDITOR.NODE_ELEMENT || !k[r.getName()]);) { if (a.editable().equals(r)) { r = !1; break } r = r.getParent() } r || (r = l.startPath().contains(k)) && l.setEndAt(r, CKEDITOR.POSITION_BEFORE_END); if (!r) { var w = l.getEnclosedNode(); w && w.type == CKEDITOR.NODE_ELEMENT && w.getName() in k && (l.setStartAt(w, CKEDITOR.POSITION_AFTER_START), l.setEndAt(w, CKEDITOR.POSITION_BEFORE_END), r = w) } r && l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in k && (w = new CKEDITOR.dom.walker(l),
                            w.evaluator = d, l.startContainer = w.next()); r && l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in k && (w = new CKEDITOR.dom.walker(l), w.evaluator = d, l.endContainer = w.previous()); if (r) return c(r)
                } return 0
            } function d(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") } function b(a) { return c(a) && h(a) } var c = CKEDITOR.dom.walker.whitespaces(!0), h = CKEDITOR.dom.walker.bookmark(!1, !0), l = CKEDITOR.TRISTATE_DISABLED, k = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
                requires: "indent", init: function (b) {
                    function c(b) {
                        d.specificDefinition.apply(this,
                            arguments); this.requiredContent = ["ul", "ol"]; b.on("key", function (a) { var c = b.elementPath(); if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey && c) { var e = this.getContext(c); !e || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, e) || (b.execCommand(this.relatedGlobal), a.cancel()) } }, this); this.jobs[this.isIndent ? 10 : 30] = {
                                refresh: this.isIndent ? function (a, b) { var c = this.getContext(b), e = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c); return c && this.isIndent && !e ? k : l } : function (a,
                                    b) { return !this.getContext(b) || this.isIndent ? l : k }, exec: CKEDITOR.tools.bind(a, this)
                            }
                    } var d = CKEDITOR.plugins.indent; d.registerCommands(b, { indentlist: new c(b, "indentlist", !0), outdentlist: new c(b, "outdentlist") }); CKEDITOR.tools.extend(c.prototype, d.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
                }
            }); CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (a, b, c) { var g = b.contains(d); c || (c = b.contains(a)); return c && g && g.equals(c.getFirst(d)) }
        }(), function () {
            function a(a, b) {
                b =
                void 0 === b || b; var d; if (b) d = a.getComputedStyle("text-align"); else { for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) { d = a.getParent(); if (!d) break; a = d } d = a.getStyle("text-align") || a.getAttribute("align") || "" } d && (d = d.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")); !d && b && (d = "rtl" == a.getComputedStyle("direction") ? "right" : "left"); return d
            } function d(a, b, d) {
                this.editor = a; this.name = b; this.value = d; this.context = "p"; b = a.config.justifyClasses; var k = a.config.enterMode == CKEDITOR.ENTER_P ?
                    "p" : "div"; if (b) { switch (d) { case "left": this.cssClassName = b[0]; break; case "center": this.cssClassName = b[1]; break; case "right": this.cssClassName = b[2]; break; case "justify": this.cssClassName = b[3] }this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?\x3d$|\\s)"); this.requiredContent = k + "(" + this.cssClassName + ")" } else this.requiredContent = k + "{text-align}"; this.allowedContent = {
                        "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                            propertiesOnly: !0, styles: this.cssClassName ? null : "text-align", classes: this.cssClassName ||
                                null
                        }
                    }; a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
            } function b(a) {
                var b = a.editor, d = b.createRange(); d.setStartBefore(a.data.node); d.setEndAfter(a.data.node); for (var k = new CKEDITOR.dom.walker(d), f; f = k.next();)if (f.type == CKEDITOR.NODE_ELEMENT) if (!f.equals(a.data.node) && f.getDirection()) d.setStartAfter(f), k = new CKEDITOR.dom.walker(d); else {
                    var e = b.config.justifyClasses; e && (f.hasClass(e[0]) ? (f.removeClass(e[0]), f.addClass(e[2])) : f.hasClass(e[2]) && (f.removeClass(e[2]), f.addClass(e[0])));
                    e = f.getStyle("text-align"); "left" == e ? f.setStyle("text-align", "right") : "right" == e && f.setStyle("text-align", "left")
                }
            } d.prototype = {
                exec: function (b) {
                    var d = b.getSelection(), l = b.config.enterMode; if (d) {
                        for (var k = d.createBookmarks(), f = d.getRanges(), e = this.cssClassName, m, g, n = b.config.useComputedState, n = void 0 === n || n, p = f.length - 1; 0 <= p; p--)for (m = f[p].createIterator(), m.enlargeBr = l != CKEDITOR.ENTER_BR; g = m.getNextParagraph(l == CKEDITOR.ENTER_P ? "p" : "div");)if (!g.isReadOnly()) {
                            var q = g.getName(), r; r = b.activeFilter.check(q +
                                "{text-align}"); if ((q = b.activeFilter.check(q + "(" + e + ")")) || r) { g.removeAttribute("align"); g.removeStyle("text-align"); var w = e && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex, ""))), u = this.state == CKEDITOR.TRISTATE_OFF && (!n || a(g, !0) != this.value); e && q ? u ? g.addClass(e) : w || g.removeAttribute("class") : u && r && g.setStyle("text-align", this.value) }
                        } b.focus(); b.forceNextSelectionCheck(); d.selectBookmarks(k)
                    }
                }, refresh: function (b, d) {
                    var l = d.block || d.blockLimit, k = l.getName(), f = l.equals(b.editable()),
                    k = this.cssClassName ? b.activeFilter.check(k + "(" + this.cssClassName + ")") : b.activeFilter.check(k + "{text-align}"); f && 1 === d.elements.length ? this.setState(CKEDITOR.TRISTATE_OFF) : !f && k ? this.setState(a(l, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
                }
            }; CKEDITOR.plugins.add("justify", {
                init: function (a) {
                    if (!a.blockless) {
                        var h = new d(a, "justifyleft", "left"), l = new d(a, "justifycenter", "center"), k = new d(a, "justifyright", "right"),
                        f = new d(a, "justifyblock", "justify"); a.addCommand("justifyleft", h); a.addCommand("justifycenter", l); a.addCommand("justifyright", k); a.addCommand("justifyblock", f); a.ui.addButton && (a.ui.addButton("JustifyLeft", { label: a.lang.justify.left, command: "justifyleft", toolbar: "align,10" }), a.ui.addButton("JustifyCenter", { label: a.lang.justify.center, command: "justifycenter", toolbar: "align,20" }), a.ui.addButton("JustifyRight", { label: a.lang.justify.right, command: "justifyright", toolbar: "align,30" }), a.ui.addButton("JustifyBlock",
                            { label: a.lang.justify.block, command: "justifyblock", toolbar: "align,40" })); a.on("dirChanged", b)
                    }
                }
            })
        }(), CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu", onLoad: function () {
                var a = function (a) {
                    var b = this._, c = b.menu; b.state !== CKEDITOR.TRISTATE_DISABLED && (b.on && c ? c.hide() : (b.previousState = b.state, c || (c = b.menu = new CKEDITOR.menu(a, { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.common.options } } }), c.onHide = CKEDITOR.tools.bind(function () {
                        var c = this.command ? a.getCommand(this.command).modes :
                            this.modes; this.setState(!c || c[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED); b.on = 0
                    }, this), this.onMenu && c.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), b.on = 1, setTimeout(function () { c.show(CKEDITOR.document.getById(b.id), 4) }, 0)))
                }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function (d) { delete d.panel; this.base(d); this.hasArrow = !0; this.click = a }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.menuButton(a) } } } })
            }, beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_MENUBUTTON,
                    CKEDITOR.ui.menuButton.handler)
            }
        }), CKEDITOR.UI_MENUBUTTON = "menubutton", "use strict", function () {
            CKEDITOR.plugins.add("language", {
                requires: "menubutton", init: function (a) {
                    var d = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"], b = this, c = a.lang.language, h = {}, l, k, f, e; a.addCommand("language", {
                        allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", contextSensitive: !0, exec: function (a, b) { var c = h["language_" + b]; if (c) a[c.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](c.style) },
                        refresh: function (a) { this.setState(b.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }
                    }); for (e = 0; e < d.length; e++)l = d[e].split(":"), k = l[0], f = "language_" + k, h[f] = { label: l[1], langId: k, group: "language", order: e, ltr: "rtl" != ("" + l[2]).toLowerCase(), onClick: function () { a.execCommand("language", this.langId) }, role: "menuitemcheckbox" }, h[f].style = new CKEDITOR.style({ element: "span", attributes: { lang: k, dir: h[f].ltr ? "ltr" : "rtl" } }); h.language_remove = {
                        label: c.remove, group: "language_remove", state: CKEDITOR.TRISTATE_DISABLED,
                        order: h.length, onClick: function () { var c = b.getCurrentLangElement(a); c && a.execCommand("language", c.getAttribute("lang")) }
                    }; a.addMenuGroup("language", 1); a.addMenuGroup("language_remove"); a.addMenuItems(h); a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                        label: c.button, allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", toolbar: "bidi,30", command: "language", onMenu: function () {
                            var c = {}, e = b.getCurrentLangElement(a), d; for (d in h) c[d] = CKEDITOR.TRISTATE_OFF; c.language_remove = e ? CKEDITOR.TRISTATE_OFF :
                                CKEDITOR.TRISTATE_DISABLED; e && (c["language_" + e.getAttribute("lang")] = CKEDITOR.TRISTATE_ON); return c
                        }
                    }); a.addRemoveFormatFilter && a.addRemoveFormatFilter(function (a) { return !(a.is("span") && a.getAttribute("dir") && a.getAttribute("lang")) })
                }, getCurrentLangElement: function (a) { var d = a.elementPath(); a = d && d.elements; var b; if (d) for (var c = 0; c < a.length; c++)d = a[c], !b && "span" == d.getName() && d.hasAttribute("dir") && d.hasAttribute("lang") && (b = d); return b }
            })
        }(), "use strict", function () {
            function a(a) {
                return a.replace(/'/g,
                    "\\$\x26")
            } function d(a) { for (var b, c = a.length, e = [], d = 0; d < c; d++)b = a.charCodeAt(d), e.push(b); return "String.fromCharCode(" + e.join(",") + ")" } function b(b, c) { var e = b.plugins.link, d = e.compiledProtectionFunction.params, f, g; g = [e.compiledProtectionFunction.name, "("]; for (var h = 0; h < d.length; h++)e = d[h].toLowerCase(), f = c[e], 0 < h && g.push(","), g.push("'", f ? a(encodeURIComponent(c[e])) : "", "'"); g.push(")"); return g.join("") } function c(a) {
                a = a.config.emailProtection || ""; var b; a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/,
                    function (a, c, e) { b.name = c; b.params = []; e.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b
            } CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects", onLoad: function () {
                    function a(b) { return c.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b) } var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" +
                        b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}"; CKEDITOR.addCss(a("ltr") + a("rtl"))
                }, init: function (a) {
                    var b = "a[!href]"; CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)")); CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]")); a.addCommand("link", new CKEDITOR.dialogCommand("link", {
                        allowedContent: b,
                        requiredContent: "a[href]"
                    })); a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); a.addCommand("unlink", new CKEDITOR.unlinkCommand); a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand); a.setKeystroke(CKEDITOR.CTRL + 76, "link"); a.ui.addButton && (a.ui.addButton("Link", { label: a.lang.link.toolbar, command: "link", toolbar: "links,10" }), a.ui.addButton("Unlink", { label: a.lang.link.unlink, command: "unlink", toolbar: "links,20" }), a.ui.addButton("Anchor",
                        { label: a.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })); CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"); CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"); a.on("doubleclick", function (b) { var c = b.data.element.getAscendant({ a: 1, img: 1 }, !0); c && !c.isReadOnly() && (c.is("a") ? (b.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", b.data.link = c) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c) && (b.data.dialog = "anchor")) }, null, null, 0);
                    a.on("doubleclick", function (b) { b.data.dialog in { link: 1, anchor: 1 } && b.data.link && a.getSelection().selectElement(b.data.link) }, null, null, 20); a.addMenuItems && a.addMenuItems({ anchor: { label: a.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 }, removeAnchor: { label: a.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 }, link: { label: a.lang.link.menu, command: "link", group: "link", order: 1 }, unlink: { label: a.lang.link.unlink, command: "unlink", group: "link", order: 5 } }); a.contextMenu && a.contextMenu.addListener(function (b) {
                        if (!b ||
                            b.isReadOnly()) return null; b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b); if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null; var c = {}; b.getAttribute("href") && b.getChildCount() && (c = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); b && b.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF); return c
                    }); this.compiledProtectionFunction = c(a)
                }, afterInit: function (a) {
                    a.dataProcessor.dataFilter.addRules({
                        elements: {
                            a: function (b) {
                                return b.attributes.name ? b.children.length ?
                                    null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null
                            }
                        }
                    }); var b = a._.elementsPath && a._.elementsPath.filters; b && b.push(function (b, c) { if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor" })
                }
            }); var h = /^javascript:/, l = /^mailto:([^?]+)(?:\?(.+))?$/, k = /subject=([^;?:@&=$,\/]*)/i, f = /body=([^;?:@&=$,\/]*)/i, e = /^#(.*)$/, m = /^((?:http|https|ftp|news):\/\/)?(.*)$/, g = /^(_(?:self|top|parent|blank))$/, n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
                p = /^javascript:([^(]+)\(([^)]+)\)$/, q = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/, r = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, w = { id: "advId", dir: "advLangDir", accessKey: "advAccessKey", name: "advName", lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel" }; CKEDITOR.plugins.link = {
                    getSelectedLink: function (a, b) {
                        var c = a.getSelection(), e = c.getSelectedElement(),
                        d = c.getRanges(), f = [], g; if (!b && e && e.is("a")) return e; for (e = 0; e < d.length; e++)if (g = c.getRanges()[e], g.shrink(CKEDITOR.SHRINK_TEXT, !1, { skipBogus: !0 }), (g = a.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) f.push(g); else if (g) return g; return b ? f : null
                    }, getEditorAnchors: function (a) {
                        for (var b = a.editable(), c = b.isInline() && !a.plugins.divarea ? a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), e = [], d = 0, f; f = b.getItem(d++);)(f.data("cke-saved-name") || f.hasAttribute("name")) && e.push({
                            name: f.data("cke-saved-name") ||
                                f.getAttribute("name"), id: f.getAttribute("id")
                        }); for (d = 0; f = c.getItem(d++);)(f = this.tryRestoreFakeAnchor(a, f)) && e.push({ name: f.getAttribute("name"), id: f.getAttribute("id") }); return e
                    }, fakeAnchor: !0, tryRestoreFakeAnchor: function (a, b) { if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) { var c = a.restoreRealElement(b); if (c.data("cke-saved-name")) return c } }, parseLinkAttributes: function (a, b) {
                        var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", d = a.plugins.link.compiledProtectionFunction,
                        x = a.config.emailProtection, y, C = {}; c.match(h) && ("encode" == x ? c = c.replace(n, function (a, b, c) { c = c || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'") }) : x && c.replace(p, function (a, b, c) { if (b == d.name) { C.type = "email"; a = C.email = {}; b = /(^')|('$)/g; c = c.match(/[^,\s]+/g); for (var e = c.length, f, g, h = 0; h < e; h++)f = decodeURIComponent, g = c[h].replace(b, "").replace(/\\'/g, "'"), g = f(g), f = d.params[h].toLowerCase(), a[f] = g; a.address = [a.name, a.domain].join("@") } })); if (!C.type) if (x = c.match(e)) C.type =
                            "anchor", C.anchor = {}, C.anchor.name = C.anchor.id = x[1]; else if (x = c.match(l)) { y = c.match(k); c = c.match(f); C.type = "email"; var z = C.email = {}; z.address = x[1]; y && (z.subject = decodeURIComponent(y[1])); c && (z.body = decodeURIComponent(c[1])) } else c && (y = c.match(m)) && (C.type = "url", C.url = {}, C.url.protocol = y[1], C.url.url = y[2]); if (b) {
                                if (c = b.getAttribute("target")) C.target = { type: c.match(g) ? c : "frame", name: c }; else if (c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(q)) for (C.target = { type: "popup", name: c[1] }; x =
                                    r.exec(c[2]);)"yes" != x[2] && "1" != x[2] || x[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(x[2]) && (C.target[x[1]] = x[2]) : C.target[x[1]] = !0; null !== b.getAttribute("download") && (C.download = !0); var c = {}, A; for (A in w) (x = b.getAttribute(A)) && (c[w[A]] = x); if (A = b.data("cke-saved-name") || c.advName) c.advName = A; CKEDITOR.tools.isEmpty(c) || (C.advanced = c)
                            } return C
                    }, getLinkAttributes: function (c, e) {
                        var f = c.config.emailProtection || "", g = {}; switch (e.type) {
                            case "url": var f = e.url && void 0 !== e.url.protocol ? e.url.protocol : "http://",
                                h = e.url && CKEDITOR.tools.trim(e.url.url) || ""; g["data-cke-saved-href"] = 0 === h.indexOf("/") ? h : f + h; break; case "anchor": f = e.anchor && e.anchor.id; g["data-cke-saved-href"] = "#" + (e.anchor && e.anchor.name || f || ""); break; case "email": var k = e.email, h = k.address; switch (f) {
                                    case "": case "encode": var l = encodeURIComponent(k.subject || ""), m = encodeURIComponent(k.body || ""), k = []; l && k.push("subject\x3d" + l); m && k.push("body\x3d" + m); k = k.length ? "?" + k.join("\x26") : ""; "encode" == f ? (f = ["javascript:void(location.href\x3d'mailto:'+",
                                        d(h)], k && f.push("+'", a(k), "'"), f.push(")")) : f = ["mailto:", h, k]; break; default: f = h.split("@", 2), k.name = f[0], k.domain = f[1], f = ["javascript:", b(c, k)]
                                }g["data-cke-saved-href"] = f.join("")
                        }if (e.target) if ("popup" == e.target.type) {
                            for (var f = ["window.open(this.href, '", e.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), h = n.length, l = function (a) { e.target[a] && n.push(a + "\x3d" + e.target[a]) }, k = 0; k < h; k++)n[k] += e.target[n[k]] ? "\x3dyes" : "\x3dno"; l("width");
                            l("left"); l("height"); l("top"); f.push(n.join(","), "'); return false;"); g["data-cke-pa-onclick"] = f.join("")
                        } else "notSet" != e.target.type && e.target.name && (g.target = e.target.name); e.download && (g.download = ""); if (e.advanced) { for (var r in w) (f = e.advanced[w[r]]) && (g[r] = f); g.name && (g["data-cke-saved-name"] = g.name) } g["data-cke-saved-href"] && (g.href = g["data-cke-saved-href"]); r = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1, download: 1 }; e.advanced && CKEDITOR.tools.extend(r, w); for (var p in g) delete r[p];
                        return { set: g, removed: CKEDITOR.tools.objectKeys(r) }
                    }, showDisplayTextForElement: function (a, b) { var c = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }, e = b.getSelection(); return b.widgets && b.widgets.focused || e && 1 < e.getRanges().length ? !1 : !a || !a.getName || !a.is(c) }
                }; CKEDITOR.unlinkCommand = function () { }; CKEDITOR.unlinkCommand.prototype = {
                    exec: function (a) {
                        if (CKEDITOR.env.ie) {
                            var b = a.getSelection().getRanges()[0], c = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) ||
                                b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0), e; b.collapsed && c && (e = b.createBookmark(), b.selectNodeContents(c), b.select())
                        } c = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); a.removeStyle(c); e && (b.moveToBookmark(e), b.select())
                    }, refresh: function (a, b) { var c = b.lastElement && b.lastElement.getAscendant("a", !0); c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) },
                    contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]", editorFocus: 1
                }; CKEDITOR.removeAnchorCommand = function () { }; CKEDITOR.removeAnchorCommand.prototype = {
                    exec: function (a) {
                        var b = a.getSelection(), c = b.createBookmarks(), e; if (b && (e = b.getSelectedElement()) && (e.getChildCount() ? e.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, e))) e.remove(1); else if (e = CKEDITOR.plugins.link.getSelectedLink(a)) e.hasAttribute("href") ? (e.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), e.removeClass("cke_anchor")) :
                            e.remove(1); b.selectBookmarks(c)
                    }, requiredContent: "a[name]"
                }; CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 })
        }(), function () {
            function a(a, b, c) {
                function e(c) { if (!(!(l = k[c ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(m = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](l) } for (var d = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) {
                    var h =
                        b.contents[g]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", !0))
                } h = null; for (g = 0; g < f.length; g++)h = f[g].getCustomData("listarray_index"), d[h].indent = -1; for (g = h + 1; g < d.length; g++)if (d[g].indent > d[g - 1].indent + 1) { f = d[g - 1].indent + 1 - d[g].indent; for (h = d[g].indent; d[g] && d[g].indent >= h;)d[g].indent += f, g++; g-- } var k = CKEDITOR.plugins.list.arrayToList(d, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, l, m;
                e(!0); e(); k.replace(b.root); a.fire("contentDomInvalidated")
            } function d(a, b) { this.name = a; this.context = this.type = b; this.allowedContent = b + " li"; this.requiredContent = b } function b(a, b, c, e) { for (var d, f; d = a[e ? "getLast" : "getFirst"](q);)(f = d.getDirection(1)) !== b.getDirection(1) && d.setAttribute("dir", f), d.remove(), c ? d[e ? "insertBefore" : "insertAfter"](c) : b.append(d, e) } function c(a) {
                function c(e) {
                    var d = a[e ? "getPrevious" : "getNext"](g); d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName()) && (b(a, d, null, !e), a.remove(),
                        a = d)
                } c(); c(1)
            } function h(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function l(a, e, d) {
                a.fire("saveSnapshot"); d.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); var f = d.extractContents(); e.trim(!1, !0); var h = e.createBookmark(), l = new CKEDITOR.dom.elementPath(e.startContainer), m = l.block, l = l.lastElement.getAscendant("li", 1) || m, p = new CKEDITOR.dom.elementPath(d.startContainer), q = p.contains(CKEDITOR.dtd.$listItem),
                    p = p.contains(CKEDITOR.dtd.$list); m ? (m = m.getBogus()) && m.remove() : p && (m = p.getPrevious(g)) && n(m) && m.remove(); (m = f.getLast()) && m.type == CKEDITOR.NODE_ELEMENT && m.is("br") && m.remove(); (m = e.startContainer.getChild(e.startOffset)) ? f.insertBefore(m) : e.startContainer.append(f); q && (f = k(q)) && (l.contains(q) ? (b(f, q.getParent(), q), f.remove()) : l.append(f)); for (; d.checkStartOfBlock() && d.checkEndOfBlock();) {
                        p = d.startPath(); f = p.block; if (!f) break; f.is("li") && (l = f.getParent(), f.equals(l.getLast(g)) && f.equals(l.getFirst(g)) &&
                            (f = l)); d.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); f.remove()
                    } d = d.clone(); f = a.editable(); d.setEndAt(f, CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = function (a) { return g(a) && !n(a) }; (d = d.next()) && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in CKEDITOR.dtd.$list && c(d); e.moveToBookmark(h); e.select(); a.fire("saveSnapshot")
            } function k(a) { return (a = a.getLast(g)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in f ? a : null } var f = { ol: 1, ul: 1 }, e = CKEDITOR.dom.walker.whitespaces(), m = CKEDITOR.dom.walker.bookmark(),
                g = function (a) { return !(e(a) || m(a)) }, n = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
                    listToArray: function (a, b, c, e, d) {
                        if (!f[a.getName()]) return []; e || (e = 0); c || (c = []); for (var g = 0, h = a.getChildCount(); g < h; g++) {
                            var k = a.getChild(g); k.type == CKEDITOR.NODE_ELEMENT && k.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(k, b, c, e + 1); if ("li" == k.$.nodeName.toLowerCase()) {
                                var l = { parent: a, indent: e, element: k, contents: [] }; d ? l.grandparent = d : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() &&
                                    (l.grandparent = l.grandparent.getParent())); b && CKEDITOR.dom.element.setMarker(b, k, "listarray_index", c.length); c.push(l); for (var m = 0, n = k.getChildCount(), p; m < n; m++)p = k.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && f[p.getName()] ? CKEDITOR.plugins.list.listToArray(p, b, c, e + 1, l.grandparent) : l.contents.push(p)
                            }
                        } return c
                    }, arrayToList: function (a, b, c, e, d) {
                        c || (c = 0); if (!a || a.length < c + 1) return null; for (var h, k = a[c].parent.getDocument(), l = new CKEDITOR.dom.documentFragment(k), n = null, p = c, A = Math.max(a[c].indent, 0), q =
                            null, D, F, I = e == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                                var H = a[p]; h = H.grandparent; D = H.element.getDirection(1); if (H.indent == A) { n && a[p].parent.getName() == n.getName() || (n = a[p].parent.clone(!1, 1), d && n.setAttribute("dir", d), l.append(n)); q = n.append(H.element.clone(0, 1)); D != n.getDirection(1) && q.setAttribute("dir", D); for (h = 0; h < H.contents.length; h++)q.append(H.contents[h].clone(1, 1)); p++ } else if (H.indent == Math.max(A, 0) + 1) H = a[p - 1].element.getDirection(1), p = CKEDITOR.plugins.list.arrayToList(a, null, p, e, H != D ? D : null), !q.getChildCount() &&
                                    CKEDITOR.env.needsNbspFiller && 7 >= k.$.documentMode && q.append(k.createText(" ")), q.append(p.listNode), p = p.nextIndex; else if (-1 == H.indent && !c && h) {
                                        f[h.getName()] ? (q = H.element.clone(!1, !0), D != h.getDirection(1) && q.setAttribute("dir", D)) : q = new CKEDITOR.dom.documentFragment(k); var n = h.getDirection(1) != D, J = H.element, K = J.getAttribute("class"), E = J.getAttribute("style"), R = q.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (e != CKEDITOR.ENTER_BR || n || E || K), O, S = H.contents.length, L; for (h = 0; h < S; h++)if (O = H.contents[h], m(O) &&
                                            1 < S) R ? L = O.clone(1, 1) : q.append(O.clone(1, 1)); else if (O.type == CKEDITOR.NODE_ELEMENT && O.isBlockBoundary()) { n && !O.getDirection() && O.setAttribute("dir", D); F = O; var V = J.getAttribute("style"); V && F.setAttribute("style", V.replace(/([^;])$/, "$1;") + (F.getAttribute("style") || "")); K && O.addClass(K); F = null; L && (q.append(L), L = null); q.append(O.clone(1, 1)) } else R ? (F || (F = k.createElement(I), q.append(F), n && F.setAttribute("dir", D)), E && F.setAttribute("style", E), K && F.setAttribute("class", K), L && (F.append(L), L = null), F.append(O.clone(1,
                                                1))) : q.append(O.clone(1, 1)); L && ((F || q).append(L), L = null); q.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && p != a.length - 1 && (CKEDITOR.env.needsBrFiller && (D = q.getLast()) && D.type == CKEDITOR.NODE_ELEMENT && D.is("br") && D.remove(), (D = q.getLast(g)) && D.type == CKEDITOR.NODE_ELEMENT && D.is(CKEDITOR.dtd.$block) || q.append(k.createElement("br"))); D = q.$.nodeName.toLowerCase(); "div" != D && "p" != D || q.appendBogus(); l.append(q); n = null; p++
                                    } else return null; F = null; if (a.length <= p || Math.max(a[p].indent, 0) < A) break
                        } if (b) for (a = l.getFirst(); a;) {
                            if (a.type ==
                                CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, k = d = e = void 0, e = c.getDirection()))) { for (d = c.getParent(); d && !(k = d.getDirection());)d = d.getParent(); e == k && c.removeAttribute("dir") } a = a.getNextSourceNode()
                        } return { listNode: l, nextIndex: p }
                    }
                }; var p = /^h[1-6]$/, q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); d.prototype = {
                    exec: function (b) {
                        this.refresh(b, b.elementPath()); var e = b.config, d = b.getSelection(), h = d && d.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) {
                            var k =
                                b.editable(); if (k.getFirst(g)) { var l = 1 == h.length && h[0]; (e = l && l.getEnclosedNode()) && e.is && this.type == e.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else e.enterMode == CKEDITOR.ENTER_BR ? k.appendBogus() : h[0].fixBlock(1, e.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), d.selectRanges(h)
                        } for (var e = d.createBookmarks(!0), k = [], m = {}, h = h.createIterator(), n = 0; (l = h.getNextRange()) && ++n;) {
                            var q = l.getBoundaryNodes(), z = q.startNode, A = q.endNode; z.type == CKEDITOR.NODE_ELEMENT && "td" == z.getName() && l.setStartAt(q.startNode, CKEDITOR.POSITION_AFTER_START);
                            A.type == CKEDITOR.NODE_ELEMENT && "td" == A.getName() && l.setEndAt(q.endNode, CKEDITOR.POSITION_BEFORE_END); l = l.createIterator(); for (l.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; q = l.getNextParagraph();)if (!q.getCustomData("list_block")) {
                                CKEDITOR.dom.element.setMarker(m, q, "list_block", 1); for (var G = b.elementPath(q), z = G.elements, A = 0, G = G.blockLimit, D, F = z.length - 1; 0 <= F && (D = z[F]); F--)if (f[D.getName()] && G.contains(D)) {
                                    G.removeCustomData("list_group_object_" + n); (z = D.getCustomData("list_group_object")) ? z.contents.push(q) :
                                        (z = { root: D, contents: [q] }, k.push(z), CKEDITOR.dom.element.setMarker(m, D, "list_group_object", z)); A = 1; break
                                } A || (A = G, A.getCustomData("list_group_object_" + n) ? A.getCustomData("list_group_object_" + n).contents.push(q) : (z = { root: A, contents: [q] }, CKEDITOR.dom.element.setMarker(m, A, "list_group_object_" + n, z), k.push(z)))
                            }
                        } for (D = []; 0 < k.length;)if (z = k.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (f[z.root.getName()]) {
                            h = b; n = z; z = m; l = D; A = CKEDITOR.plugins.list.listToArray(n.root, z); G = []; for (q = 0; q < n.contents.length; q++)F =
                                n.contents[q], (F = F.getAscendant("li", !0)) && !F.getCustomData("list_item_processed") && (G.push(F), CKEDITOR.dom.element.setMarker(z, F, "list_item_processed", !0)); for (var F = n.root.getDocument(), I = void 0, H = void 0, q = 0; q < G.length; q++) { var J = G[q].getCustomData("listarray_index"), I = A[J].parent; I.is(this.type) || (H = F.createElement(this.type), I.copyAttributes(H, { start: 1, type: 1 }), H.removeStyle("list-style-type"), A[J].parent = H) } z = CKEDITOR.plugins.list.arrayToList(A, z, null, h.config.enterMode); A = void 0; G = z.listNode.getChildCount();
                            for (q = 0; q < G && (A = z.listNode.getChild(q)); q++)A.getName() == this.type && l.push(A); z.listNode.replace(n.root); h.fire("contentDomInvalidated")
                        } else {
                            A = b; l = z; q = D; G = l.contents; h = l.root.getDocument(); n = []; 1 == G.length && G[0].equals(l.root) && (z = h.createElement("div"), G[0].moveChildren && G[0].moveChildren(z), G[0].append(z), G[0] = z); l = l.contents[0].getParent(); for (F = 0; F < G.length; F++)l = l.getCommonAncestor(G[F].getParent()); I = A.config.useComputedState; A = z = void 0; I = void 0 === I || I; for (F = 0; F < G.length; F++)for (H = G[F]; J = H.getParent();) {
                                if (J.equals(l)) {
                                    n.push(H);
                                    !A && H.getDirection() && (A = 1); H = H.getDirection(I); null !== z && (z = z && z != H ? null : H); break
                                } H = J
                            } if (!(1 > n.length)) {
                                G = n[n.length - 1].getNext(); F = h.createElement(this.type); q.push(F); for (I = q = void 0; n.length;)q = n.shift(), I = h.createElement("li"), H = q, H.is("pre") || p.test(H.getName()) || "false" == H.getAttribute("contenteditable") ? q.appendTo(I) : (q.copyAttributes(I), z && q.getDirection() && (I.removeStyle("direction"), I.removeAttribute("dir")), q.moveChildren(I), q.remove()), I.appendTo(F); z && A && F.setAttribute("dir", z); G ? F.insertBefore(G) :
                                    F.appendTo(l)
                            }
                        } else this.state == CKEDITOR.TRISTATE_ON && f[z.root.getName()] && a.call(this, b, z, m); for (F = 0; F < D.length; F++)c(D[F]); CKEDITOR.dom.element.clearAllMarkers(m); d.selectBookmarks(e); b.focus()
                    }, refresh: function (a, b) { var c = b.contains(f, 1), e = b.blockLimit || b.root; c && e.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
                }; CKEDITOR.plugins.add("list", {
                    requires: "indentlist", init: function (a) {
                        a.blockless || (a.addCommand("numberedlist",
                            new d("numberedlist", "ol")), a.addCommand("bulletedlist", new d("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), a.ui.addButton("BulletedList", { label: a.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), a.on("key", function (b) {
                                var c = b.data.domEvent.getKey(), e; if ("wysiwyg" == a.mode && c in { 8: 1, 46: 1 }) {
                                    var d = a.getSelection().getRanges()[0], m = d && d.startPath(); if (d && d.collapsed) {
                                        var p =
                                            8 == c, y = a.editable(), q = new CKEDITOR.dom.walker(d.clone()); q.evaluator = function (a) { return g(a) && !n(a) }; q.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; c = d.clone(); if (p) {
                                                var z; (z = m.contains(f)) && d.checkBoundaryOfElement(z, CKEDITOR.START) && (z = z.getParent()) && z.is("li") && (z = k(z)) ? (e = z, z = z.getPrevious(g), c.moveToPosition(z && n(z) ? z : e, CKEDITOR.POSITION_BEFORE_START)) : (q.range.setStartAt(y, CKEDITOR.POSITION_AFTER_START), q.range.setEnd(d.startContainer, d.startOffset), (z = q.previous()) &&
                                                    z.type == CKEDITOR.NODE_ELEMENT && (z.getName() in f || z.is("li")) && (z.is("li") || (q.range.selectNodeContents(z), q.reset(), q.evaluator = h, z = q.previous()), e = z, c.moveToElementEditEnd(e), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (e) l(a, c, d), b.cancel(); else { var A = m.contains(f); A && d.checkBoundaryOfElement(A, CKEDITOR.START) && (e = A.getFirst(g), d.checkBoundaryOfElement(e, CKEDITOR.START) && (z = A.getPrevious(g), k(e) ? z && (d.moveToElementEditEnd(z), d.select()) : a.execCommand("outdent"), b.cancel())) }
                                            } else if (e =
                                                m.contains("li")) {
                                                    if (q.range.setEndAt(y, CKEDITOR.POSITION_BEFORE_END), p = (y = e.getLast(g)) && h(y) ? y : e, m = 0, (z = q.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.getName() in f && z.equals(y) ? (m = 1, z = q.next()) : d.checkBoundaryOfElement(p, CKEDITOR.END) && (m = 2), m && z) {
                                                        d = d.clone(); d.moveToElementEditStart(z); if (1 == m && (c.optimize(), !c.startContainer.equals(e))) { for (e = c.startContainer; e.is(CKEDITOR.dtd.$inline);)A = e, e = e.getParent(); A && c.moveToPosition(A, CKEDITOR.POSITION_AFTER_END) } 2 == m && (c.moveToPosition(c.endPath().block,
                                                            CKEDITOR.POSITION_BEFORE_END), d.endPath().block && d.moveToPosition(d.endPath().block, CKEDITOR.POSITION_AFTER_START)); l(a, c, d); b.cancel()
                                                    }
                                        } else q.range.setEndAt(y, CKEDITOR.POSITION_BEFORE_END), (z = q.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.is(f) && (z = z.getFirst(g), m.block && d.checkStartOfBlock() && d.checkEndOfBlock() ? (m.block.remove(), d.moveToElementEditStart(z), d.select()) : k(z) ? (d.moveToElementEditStart(z), d.select()) : (d = d.clone(), d.moveToElementEditStart(z), l(a, c, d)), b.cancel()); setTimeout(function () { a.selectionChange(1) })
                                    }
                                }
                            }))
                    }
                })
        }(),
        function () {
            CKEDITOR.plugins.liststyle = {
                requires: "dialog,contextmenu", init: function (a) {
                    if (!a.blockless) {
                        var d; d = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]", contentTransformations: [["ol: listTypeToStyle"]] }); d = a.addCommand("numberedListStyle", d); a.addFeature(d); CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js"); d = new CKEDITOR.dialogCommand("bulletedListStyle", {
                            requiredContent: "ul",
                            allowedContent: "ul{list-style-type}", contentTransformations: [["ul: listTypeToStyle"]]
                        }); d = a.addCommand("bulletedListStyle", d); a.addFeature(d); CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"); a.addMenuGroup("list", 108); a.addMenuItems({ numberedlist: { label: a.lang.liststyle.numberedTitle, group: "list", command: "numberedListStyle" }, bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" } }); a.contextMenu.addListener(function (a) {
                            if (!a || a.isReadOnly()) return null;
                            for (; a;) { var c = a.getName(); if ("ol" == c) return { numberedlist: CKEDITOR.TRISTATE_OFF }; if ("ul" == c) return { bulletedlist: CKEDITOR.TRISTATE_OFF }; a = a.getParent() } return null
                        })
                    }
                }
            }; CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
        }(), "use strict", function () {
            function a(a, b, c) { return n(b) && n(c) && c.equals(b.getNext(function (a) { return !(aa(a) || ba(a) || p(a)) })) } function d(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) } function b(a) {
                var b = a.element; if (b && n(b) && (b = b.getAscendant(a.triggers,
                    !0)) && a.editable.contains(b)) { var c = k(b); if ("true" == c.getAttribute("contenteditable")) return b; if (c.is(a.triggers)) return c } return null
            } function c(a, b, c) { x(a, b); x(a, c); a = b.size.bottom; c = c.size.top; return a && c ? 0 | (a + c) / 2 : a || c } function h(a, b, c) { return b = b[c ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !aa(b) || n(b) && !p(b) && !g(a, b) }) } function l(a, b, c) { return a > b && a < c } function k(a, b) {
                if (a.data("cke-editable")) return null; for (b || (a = a.getParent()); a && !a.data("cke-editable");) {
                    if (a.hasAttribute("contenteditable")) return a;
                    a = a.getParent()
                } return null
            } function f(a) {
                var b = a.doc, c = D('\x3cspan contenteditable\x3d"false" style\x3d"' + U + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b), d = CKEDITOR.getUrl(this.path + "images/" + (F.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); A(c, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this }, lineChildren: [A(D('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e',
                        b), { base: U + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (F.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (F.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"] }), A(D(N, b), {
                            base: T + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px",
                                "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
                        }), A(D(N, b), { base: T + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () { x(a, this); var b = a.holdDistance, c = this.size; return c && l(a.mouse.y, c.top - b, c.bottom + b) && l(a.mouse.x, c.left - b, c.right + b) ? !0 : !1 }, place: function () {
                            var b = a.view,
                            c = a.editable, e = a.trigger, d = e.upper, f = e.lower, g = d || f, h = g.getParent(), k = {}; this.trigger = e; d && x(a, d, !0); f && x(a, f, !0); x(a, h, !0); a.inInlineMode && y(a, !0); h.equals(c) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x, k.right = ""); d && f ? k.top = d.size.margin.bottom === f.size.margin.top ? 0 | d.size.bottom + d.size.margin.bottom / 2 : d.size.margin.bottom <
                                f.size.margin.top ? d.size.bottom + d.size.margin.bottom : d.size.bottom + d.size.margin.bottom - f.size.margin.top : d ? f || (k.top = d.size.bottom + d.size.margin.bottom) : k.top = f.size.top - f.size.margin.top; e.is(S) || l(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(S)) : e.is(L) || l(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(L)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top),
                                    this.look(V)); a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left); for (var m in k) k[m] = CKEDITOR.tools.cssLength(k[m]); this.setStyles(k)
                        }, look: function (a) { if (this.oldLook != a) { for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]); this.oldLook = a } }, wrap: new G("span", a.doc)
                }); for (b = c.lineChildren.length; b--;)c.lineChildren[b].appendTo(c); c.look(V); c.appendTo(c.wrap); c.unselectable(); c.lineChildren[0].on("mouseup",
                    function (b) { c.detach(); e(a, function (b) { var c = a.line.trigger; b[c.is(K) ? "insertBefore" : "insertAfter"](c.is(K) ? c.lower : c.upper) }, !0); a.editor.focus(); F.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); b.data.preventDefault(!0) }); c.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = c
            } function e(a, b, c) {
                var e = new CKEDITOR.dom.range(a.doc), d = a.editor, f; F.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(Z) : (f = (f = k(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new G(J[f],
                    a.doc), f.is("br") || a.doc.createText(Z).appendTo(f)); c && d.fire("saveSnapshot"); b(f); e.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); d.getSelection().selectRanges([e]); a.hotNode = f; c && d.fire("saveSnapshot")
            } function m(a, c) {
                return {
                    canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                        function d(b) {
                            var f = F.ie && 9 > F.version ? " " : Z, g = a.hotNode && a.hotNode.getText() == f && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c; e(a, function (e) {
                                g && a.hotNode && a.hotNode.remove(); e[c ? "insertAfter" : "insertBefore"](b); e.setAttributes({
                                    "data-cke-magicline-hot": 1,
                                    "data-cke-magicline-dir": !!c
                                }); a.lastCmdDirection = !!c
                            }); F.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach()
                        } return function (e) {
                            e = e.getSelection().getStartElement(); var f; e = e.getAscendant(Q, 1); if (!w(a, e) && e && !e.equals(a.editable) && !e.contains(a.editable)) {
                                (f = k(e)) && "false" == f.getAttribute("contenteditable") && (e = f); a.element = e; f = h(a, e, !c); var g; n(f) && f.is(a.triggers) && f.is(P) && (!h(a, f, !c) || (g = h(a, f, !c)) && n(g) && g.is(a.triggers)) ? d(f) : (g = b(a, e), n(g) && (h(a, g, !c) ? (e = h(a, g, !c)) &&
                                    n(e) && e.is(a.triggers) && d(g) : d(g)))
                            }
                        }
                    }()
                }
            } function g(a, b) { if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1; var c = a.line; return c.wrap.equals(b) || c.wrap.contains(b) } function n(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ } function p(a) { if (!n(a)) return !1; var b; (b = q(a)) || (n(a) ? (b = { left: 1, right: 1, center: 1 }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1); return b } function q(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] } function r(a, b) {
                return n(b) ? b.is(a.triggers) :
                    null
            } function w(a, b) { if (!b) return !1; for (var c = b.getParents(1), e = c.length; e--;)for (var d = a.tabuList.length; d--;)if (c[e].hasAttribute(a.tabuList[d])) return !0; return !1 } function u(a, b, c) { b = b[c ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(da) }); if (!b) return !1; x(a, b); return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y } function v(a) {
                var b = a.editable, c = a.mouse, e = a.view, f = a.triggerOffset; y(a); var h = c.y > (a.inInlineMode ? e.editable.top + e.editable.height / 2 : Math.min(e.editable.height, e.pane.height) /
                    2), b = b[h ? "getLast" : "getFirst"](function (a) { return !(aa(a) || ba(a)) }); if (!b) return null; g(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function (a) { return !(aa(a) || ba(a)) })); if (!n(b) || p(b) || !r(a, b)) return null; x(a, b); return !h && 0 <= b.size.top && l(c.y, 0, b.size.top + f) ? (a = a.inInlineMode || 0 === e.scroll.y ? S : V, new d([null, b, K, O, a])) : h && b.size.bottom <= e.pane.height && l(c.y, b.size.bottom - f, e.pane.height) ? (a = a.inInlineMode || l(b.size.bottom, e.pane.height - f, e.pane.height) ? L : V, new d([b, null, E, O, a])) : null
            } function t(a) {
                var c =
                    a.mouse, e = a.view, f = a.triggerOffset, g = b(a); if (!g) return null; x(a, g); var f = Math.min(f, 0 | g.size.outerHeight / 2), k = [], m, N; if (l(c.y, g.size.top - 1, g.size.top + f)) N = !1; else if (l(c.y, g.size.bottom - f, g.size.bottom + 1)) N = !0; else return null; if (p(g) || u(a, g, N) || g.getParent().is(X)) return null; var t = h(a, g, !N); if (t) { if (t && t.type == CKEDITOR.NODE_TEXT) return null; if (n(t)) { if (p(t) || !r(a, t) || t.getParent().is(X)) return null; k = [t, g][N ? "reverse" : "concat"]().concat([R, O]) } } else g.equals(a.editable[N ? "getLast" : "getFirst"](a.isRelevant)) ?
                        (y(a), N && l(c.y, g.size.bottom - f, e.pane.height) && l(g.size.bottom, e.pane.height - f, e.pane.height) ? m = L : l(c.y, 0, g.size.top + f) && (m = S)) : m = V, k = [null, g][N ? "reverse" : "concat"]().concat([N ? E : K, O, m, g.equals(a.editable[N ? "getLast" : "getFirst"](a.isRelevant)) ? N ? L : S : V]); return 0 in k ? new d(k) : null
            } function B(a, b, c, e) {
                for (var d = b.getDocumentPosition(), f = {}, g = {}, h = {}, k = {}, l = ca.length; l--;)f[ca[l]] = parseInt(b.getComputedStyle.call(b, "border-" + ca[l] + "-width"), 10) || 0, h[ca[l]] = parseInt(b.getComputedStyle.call(b, "padding-" +
                    ca[l]), 10) || 0, g[ca[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + ca[l]), 10) || 0; c && !e || C(a, e); k.top = d.y - (c ? 0 : a.view.scroll.y); k.left = d.x - (c ? 0 : a.view.scroll.x); k.outerWidth = b.$.offsetWidth; k.outerHeight = b.$.offsetHeight; k.height = k.outerHeight - (h.top + h.bottom + f.top + f.bottom); k.width = k.outerWidth - (h.left + h.right + f.left + f.right); k.bottom = k.top + k.outerHeight; k.right = k.left + k.outerWidth; a.inInlineMode && (k.scroll = { top: b.$.scrollTop, left: b.$.scrollLeft }); return A({ border: f, padding: h, margin: g, ignoreScroll: c },
                        k, !0)
            } function x(a, b, c) { if (!n(b)) return b.size = null; if (!b.size) b.size = {}; else if (b.size.ignoreScroll == c && b.size.date > new Date - M) return null; return A(b.size, B(a, b, c), { date: +new Date }, !0) } function y(a, b) { a.view.editable = B(a, a.editable, b, !0) } function C(a, b) {
                a.view || (a.view = {}); var c = a.view; if (!(!b && c && c.date > new Date - M)) {
                    var e = a.win, c = e.getScrollPosition(), e = e.getViewPaneSize(); A(a.view, {
                        scroll: {
                            x: c.x, y: c.y, width: a.doc.$.documentElement.scrollWidth - e.width, height: a.doc.$.documentElement.scrollHeight -
                                e.height
                        }, pane: { width: e.width, height: e.height, bottom: e.height + c.y }, date: +new Date
                    }, !0)
                }
            } function z(a, b, c, e) { for (var f = e, g = e, h = 0, k = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + h < m && 0 < n.y - h;) { k || (k = b(f, e)); l || (l = b(g, e)); !k && 0 < n.y - h && (f = c(a, { x: n.x, y: n.y - h })); !l && n.y + h < m && (g = c(a, { x: n.x, y: n.y + h })); if (k && l) break; h += 2 } return new d([f, g, null, null]) } CKEDITOR.plugins.add("magicline", {
                init: function (a) {
                    var c = a.config, k = c.magicline_triggerOffset || 30, l = {
                        editor: a, enterMode: c.enterMode, triggerOffset: k, holdDistance: 0 |
                            k * (c.magicline_holdDistance || .5), boxColor: c.magicline_color || "#ff0000", rtl: "rtl" == c.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []), triggers: c.magicline_everywhere ? Q : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    }, N, z, u; l.isRelevant = function (a) { return n(a) && !g(l, a) && !p(a) }; a.on("contentDom", function () {
                        var k = a.editable(), n = a.document, p = a.window; A(l, { editable: k, inInlineMode: k.isInline(), doc: n, win: p, hotNode: null }, !0); l.boundary = l.inInlineMode ? l.editable :
                            l.doc.getDocumentElement(); k.is(H.$inline) || (l.inInlineMode && !q(k) && k.setStyles({ position: "relative", top: null, left: null }), f.call(this, l), C(l), k.attachListener(a, "beforeUndoImage", function () { l.line.detach() }), k.attachListener(a, "beforeGetData", function () { l.line.wrap.getParent() && (l.line.detach(), a.once("getData", function () { l.line.attach() }, null, null, 1E3)) }, null, null, 0), k.attachListener(l.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
                                if ("wysiwyg" == a.mode) if (l.inInlineMode) {
                                    var c = b.data.$.clientX;
                                    b = b.data.$.clientY; C(l); y(l, !0); var e = l.view.editable, d = l.view.scroll; c > e.left - d.x && c < e.right - d.x && b > e.top - d.y && b < e.bottom - d.y || (clearTimeout(u), u = null, l.line.detach())
                                } else clearTimeout(u), u = null, l.line.detach()
                            }), k.attachListener(k, "keyup", function () { l.hiddenMode = 0 }), k.attachListener(k, "keydown", function (b) { if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) { case 2228240: case 16: l.hiddenMode = 1, l.line.detach() } }), k.attachListener(l.inInlineMode ? k : n, "mousemove", function (b) {
                                z = !0; if ("wysiwyg" == a.mode &&
                                    !a.readOnly && !u) { var c = { x: b.data.$.clientX, y: b.data.$.clientY }; u = setTimeout(function () { l.mouse = c; u = l.trigger = null; C(l); z && !l.hiddenMode && a.focusManager.hasFocus && !l.line.mouseNear() && (l.element = W(l, !0)) && ((l.trigger = v(l) || t(l) || Y(l)) && !w(l, l.trigger.upper || l.trigger.lower) ? l.line.attach().place() : (l.trigger = null, l.line.detach()), z = !1) }, 30) }
                            }), k.attachListener(p, "scroll", function () {
                                "wysiwyg" == a.mode && (l.line.detach(), F.webkit && (l.hiddenMode = 1, clearTimeout(N), N = setTimeout(function () {
                                    l.mouseDown || (l.hiddenMode =
                                        0)
                                }, 50)))
                            }), k.attachListener(I ? n : p, "mousedown", function () { "wysiwyg" == a.mode && (l.line.detach(), l.hiddenMode = 1, l.mouseDown = 1) }), k.attachListener(I ? n : p, "mouseup", function () { l.hiddenMode = 0; l.mouseDown = 0 }), a.addCommand("accessPreviousSpace", m(l)), a.addCommand("accessNextSpace", m(l, !0)), a.setKeystroke([[c.magicline_keystrokePrevious, "accessPreviousSpace"], [c.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () {
                                var b, c, e, d; for (d in { p: 1, br: 1, div: 1 }) for (b = a.document.getElementsByTag(d),
                                    e = b.count(); e--;)if ((c = b.getItem(e)).data("cke-magicline-hot")) { l.hotNode = c; l.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 : !1; return }
                            }), this.backdoor = { accessFocusSpace: e, boxTrigger: d, isLine: g, getAscendantTrigger: b, getNonEmptyNeighbour: h, getSize: B, that: l, triggerEdge: t, triggerEditable: v, triggerExpand: Y })
                    }, this)
                }
            }); var A = CKEDITOR.tools.extend, G = CKEDITOR.dom.element, D = G.createFromHtml, F = CKEDITOR.env, I = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, H = CKEDITOR.dtd, J = {}, K = 128, E = 64, R = 32, O = 16, S = 4, L = 2,
                V = 1, Z = " ", X = H.$listItem, da = H.$tableContent, P = A({}, H.$nonEditable, H.$empty), Q = H.$block, M = 100, U = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", T = U + "border-color:transparent;display:block;border-style:solid;", N = "\x3cspan\x3e" + Z + "\x3c/span\x3e"; J[CKEDITOR.ENTER_BR] = "br"; J[CKEDITOR.ENTER_P] = "p"; J[CKEDITOR.ENTER_DIV] = "div"; d.prototype = {
                    set: function (a, b, c) { this.properties = a + b + (c || V); return this }, is: function (a) {
                        return (this.properties &
                            a) == a
                    }
                }; var W = function () { function a(b, c) { var e = b.$.elementFromPoint(c.x, c.y); return e && e.nodeType ? new CKEDITOR.dom.element(e) : null } return function (b, c, e) { if (!b.mouse) return null; var d = b.doc, f = b.line.wrap; e = e || b.mouse; var h = a(d, e); c && g(b, h) && (f.hide(), h = a(d, e), f.show()); return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || F.ie && 9 > F.version && !b.boundary.equals(h) && !b.boundary.contains(h) ? null : h } }(), aa = CKEDITOR.dom.walker.whitespaces(), ba = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), Y = function () {
                    function b(d) {
                        var f =
                            d.element, g, h, k; if (!n(f) || f.contains(d.editable) || f.isReadOnly()) return null; k = z(d, function (a, b) { return !b.equals(a) }, function (a, b) { return W(a, !0, b) }, f); g = k.upper; h = k.lower; if (a(d, g, h)) return k.set(R, 8); if (g && f.contains(g)) for (; !g.getParent().equals(f);)g = g.getParent(); else g = f.getFirst(function (a) { return e(d, a) }); if (h && f.contains(h)) for (; !h.getParent().equals(f);)h = h.getParent(); else h = f.getLast(function (a) { return e(d, a) }); if (!g || !h) return null; x(d, g); x(d, h); if (!l(d.mouse.y, g.size.top, h.size.bottom)) return null;
                        for (var f = Number.MAX_VALUE, m, p, N, t; h && !h.equals(g) && (p = g.getNext(d.isRelevant));)m = Math.abs(c(d, g, p) - d.mouse.y), m < f && (f = m, N = g, t = p), g = p, x(d, g); if (!N || !t || !l(d.mouse.y, N.size.top, t.size.bottom)) return null; k.upper = N; k.lower = t; return k.set(R, 8)
                    } function e(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || ba(b) || p(b) || g(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (c) {
                        var e = b(c), d; if (d = e) {
                            d = e.upper; var f = e.lower; d = !d || !f || p(f) || p(d) || f.equals(d) || d.equals(f) || f.contains(d) || d.contains(f) ?
                                !1 : r(c, d) && r(c, f) && a(c, d, f) ? !0 : !1
                        } return d ? e : null
                    }
                }(), ca = ["top", "left", "right", "bottom"]
        }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52, function () {
            function a(a) { if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return []; for (var b = [], c = ["style", "className"], e = 0; e < c.length; e++) { var d = a.$.elements.namedItem(c[e]); d && (d = new CKEDITOR.dom.element(d), b.push([d, d.nextSibling]), d.remove()) } return b }
            function d(a, b) { if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length) for (var c = b.length - 1; 0 <= c; c--) { var e = b[c][0], d = b[c][1]; d ? e.insertBefore(d) : e.appendTo(a) } } function b(b, c) { var f = a(b), e = {}, h = b.$; c || (e["class"] = h.className || "", h.className = ""); e.inline = h.style.cssText || ""; c || (h.style.cssText = "position: static; overflow: visible"); d(f); return e } function c(b, c) { var f = a(b), e = b.$; "class" in c && (e.className = c["class"]); "inline" in c && (e.style.cssText = c.inline); d(f) } function h(a) {
                if (!a.editable().isInline()) {
                    var b =
                        CKEDITOR.instances, c; for (c in b) { var e = b[c]; "wysiwyg" != e.mode || e.readOnly || (e = e.document.getBody(), e.setAttribute("contentEditable", !1), e.setAttribute("contentEditable", !0)) } a.editable().hasFocus && (a.toolbox.focus(), a.focus())
                }
            } CKEDITOR.plugins.add("maximize", {
                init: function (a) {
                    function d() { var b = m.getViewPaneSize(); a.resize(b.width, b.height, null, !0) } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var f = a.lang, e = CKEDITOR.document, m = e.getWindow(), g, n, p, q = CKEDITOR.TRISTATE_OFF; a.addCommand("maximize",
                            {
                                modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: !1, exec: function () {
                                    var r = a.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }), w = a.ui.space("contents"); if ("wysiwyg" == a.mode) { var u = a.getSelection(); g = u && u.getRanges(); n = m.getScrollPosition() } else { var v = a.editable().$; g = !CKEDITOR.env.ie && [v.selectionStart, v.selectionEnd]; n = [v.scrollLeft, v.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                        m.on("resize", d); p = m.getScrollPosition();
                                        for (u = a.container; u = u.getParent();)u.setCustomData("maximize_saved_styles", b(u)), u.setStyle("z-index", a.config.baseFloatZIndex - 5); w.setCustomData("maximize_saved_styles", b(w, !0)); r.setCustomData("maximize_saved_styles", b(r, !0)); w = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; e.getDocumentElement().setStyles(w); !CKEDITOR.env.gecko && e.getDocumentElement().setStyle("position", "fixed"); CKEDITOR.env.gecko && CKEDITOR.env.quirks || e.getBody().setStyles(w); CKEDITOR.env.ie ? setTimeout(function () {
                                            m.$.scrollTo(0,
                                                0)
                                        }, 0) : m.$.scrollTo(0, 0); r.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); r.$.offsetLeft; r.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); r.addClass("cke_maximized"); d(); w = r.getDocumentPosition(); r.setStyles({ left: -1 * w.x + "px", top: -1 * w.y + "px" }); CKEDITOR.env.gecko && h(a)
                                    } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                        m.removeListener("resize", d); for (var u = [w, r], t = 0; t < u.length; t++)c(u[t], u[t].getCustomData("maximize_saved_styles")), u[t].removeCustomData("maximize_saved_styles");
                                        for (u = a.container; u = u.getParent();)c(u, u.getCustomData("maximize_saved_styles")), u.removeCustomData("maximize_saved_styles"); CKEDITOR.env.ie ? setTimeout(function () { m.$.scrollTo(p.x, p.y) }, 0) : m.$.scrollTo(p.x, p.y); r.removeClass("cke_maximized"); CKEDITOR.env.webkit && (r.setStyle("display", "inline"), setTimeout(function () { r.setStyle("display", "block") }, 0)); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: w.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                    } this.toggleState(); if (u =
                                        this.uiItems[0]) w = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, u = CKEDITOR.document.getById(u._.id), u.getChild(1).setHtml(w), u.setAttribute("title", w), u.setAttribute("href", 'javascript:void("' + w + '");'); "wysiwyg" == a.mode ? g ? (CKEDITOR.env.gecko && h(a), a.getSelection().selectRanges(g), (v = a.getSelection().getStartElement()) && v.scrollIntoView(!0)) : m.$.scrollTo(n.x, n.y) : (g && (v.selectionStart = g[0], v.selectionEnd = g[1]), v.scrollLeft = n[0], v.scrollTop = n[1]); g = n = null; q = this.state; a.fire("maximize",
                                            this.state)
                                }, canUndo: !1
                            }); a.ui.addButton && a.ui.addButton("Maximize", { label: f.maximize.maximize, command: "maximize", toolbar: "tools,10" }); a.on("mode", function () { var b = a.getCommand("maximize"); b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : q) }, null, null, 100)
                    }
                }
            })
        }(), CKEDITOR.plugins.add("newpage", {
            init: function (a) {
                a.addCommand("newpage", {
                    modes: { wysiwyg: 1, source: 1 }, exec: function (a) {
                        var b = this; a.setData(a.config.newpage_html || "", function () {
                            a.focus(); setTimeout(function () {
                                a.fire("afterCommandExec",
                                    { name: "newpage", command: b }); a.selectionChange()
                            }, 200)
                        })
                    }, async: !0
                }); a.ui.addButton && a.ui.addButton("NewPage", { label: a.lang.newpage.toolbar, command: "newpage", toolbar: "document,20" })
            }
        }), "use strict", function () {
            function a(a) { return { "aria-label": a, "class": "cke_pagebreak", contenteditable: "false", "data-cke-display-name": "pagebreak", "data-cke-pagebreak": 1, style: "page-break-after: always", title: a } } CKEDITOR.plugins.add("pagebreak", {
                requires: "fakeobjects", onLoad: function () {
                    var a = ("background:url(" + CKEDITOR.getUrl(this.path +
                        "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g, " !important;"); CKEDITOR.addCss("div.cke_pagebreak{" + a + "}")
                }, init: function (a) {
                    a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton("PageBreak", { label: a.lang.pagebreak.toolbar, command: "pagebreak", toolbar: "insert,70" }), CKEDITOR.env.webkit && a.on("contentDom", function () {
                        a.document.on("click",
                            function (b) { b = b.data.getTarget(); b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b) })
                    }))
                }, afterInit: function (d) {
                    function b(b) { CKEDITOR.tools.extend(b.attributes, a(d.lang.pagebreak.alt), !0); b.children.length = 0 } var c = d.dataProcessor, h = c && c.dataFilter, c = c && c.htmlFilter, l = /page-break-after\s*:\s*always/i, k = /display\s*:\s*none/i; c && c.addRules({
                        attributes: {
                            "class": function (a, b) {
                                var c = a.replace("cke_pagebreak", ""); if (c != a) {
                                    var d = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
                                    b.children.length = 0; b.add(d); d = b.attributes; delete d["aria-label"]; delete d.contenteditable; delete d.title
                                } return c
                            }
                        }
                    }, { applyToAll: !0, priority: 5 }); h && h.addRules({ elements: { div: function (a) { if (a.attributes["data-cke-pagebreak"]) b(a); else if (l.test(a.attributes.style)) { var c = a.children[0]; c && "span" == c.name && k.test(c.attributes.style) && b(a) } } } })
                }
            }); CKEDITOR.plugins.pagebreakCmd = {
                exec: function (d) { var b = d.document.createElement("div", { attributes: a(d.lang.pagebreak.alt) }); d.insertElement(b) }, context: "div",
                allowedContent: { div: { styles: "!page-break-after" }, span: { match: function (a) { return (a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"] }, styles: "display" } }, requiredContent: "div{page-break-after}"
            }
        }(), function () {
            function a(a, b, c) { var h = CKEDITOR.cleanWord; h ? c() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + "filter/default.js"), CKEDITOR.scriptLoader.load(a, c, null, !0)); return !h } CKEDITOR.plugins.add("pastefromword", {
                requires: "clipboard", init: function (d) {
                    function b(a) {
                        var b = CKEDITOR.plugins.pastefromword &&
                            CKEDITOR.plugins.pastefromword.images, c, d = []; if (b && a.editor.filter.check("img[src]") && (c = b.extractTagsFromHtml(a.data.dataValue), 0 !== c.length && (b = b.extractFromRtf(a.data.dataTransfer["text/rtf"]), 0 !== b.length && (CKEDITOR.tools.array.forEach(b, function (a) { d.push(a.type ? "data:" + a.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(a.hex)) : null) }, this), c.length === d.length)))) for (b = 0; b < c.length; b++)0 === c[b].indexOf("file://") && d[b] && (a.data.dataValue = a.data.dataValue.replace(c[b],
                                d[b]))
                    } var c = 0, h = this.path, l = void 0 === d.config.pasteFromWord_inlineImages ? !0 : d.config.pasteFromWord_inlineImages; d.addCommand("pastefromword", { canUndo: !1, async: !0, exec: function (a, b) { c = 1; a.execCommand("paste", { type: "html", notification: b && "undefined" !== typeof b.notification ? b.notification : !0 }) } }); d.ui.addButton && d.ui.addButton("PasteFromWord", { label: d.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" }); d.on("paste", function (b) {
                        var f = b.data, e = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ?
                            f.dataTransfer.getData("text/html", !0) : null, l = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? f.dataTransfer.getData("text/rtf") : null, e = e || f.dataValue, g = { dataValue: e, dataTransfer: { "text/rtf": l } }, l = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, l = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(e) || l.test(e); if (e && (c || l) && (!1 !== d.fire("pasteFromWord", g) || c)) {
                                f.dontFilter = !0; var n = a(d, h, function () {
                                    if (n) d.fire("paste", f); else if (!d.config.pasteFromWordPromptCleanup ||
                                        c || confirm(d.lang.pastefromword.confirmCleanup)) g.dataValue = CKEDITOR.cleanWord(g.dataValue, d), d.fire("afterPasteFromWord", g), f.dataValue = g.dataValue; c = 0
                                }); n && b.cancel()
                            }
                    }, null, null, 3); if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && l) d.on("afterPasteFromWord", b)
                }
            })
        }(), function () {
            var a = {
                canUndo: !1, async: !0, exec: function (a, b) {
                    var c = a.lang, h = CKEDITOR.tools.keystrokeToString(c.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)), l = b && "undefined" !== typeof b.notification ?
                        b.notification : !b || !b.from || "keystrokeHandler" === b.from && CKEDITOR.env.ie, c = l && "string" === typeof l ? l : c.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + h.aria + '"\x3e' + h.display + "\x3c/kbd\x3e"); a.execCommand("paste", { type: "text", notification: l ? c : !1 })
                }
            }; CKEDITOR.plugins.add("pastetext", {
                requires: "clipboard", init: function (d) {
                    var b = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; d.addCommand("pastetext", a); d.setKeystroke(b, "pastetext");
                    d.ui.addButton && d.ui.addButton("PasteText", { label: d.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (d.config.forcePasteAsPlainText) d.on("beforePaste", function (a) { "html" != a.data.type && (a.data.type = "text") }); d.on("pasteState", function (a) { d.getCommand("pastetext").setState(a.data) })
                }
            })
        }(), function () {
            var a, d = {
                modes: { wysiwyg: 1, source: 1 }, canUndo: !1, readOnly: 1, exec: function (b) {
                    var c, d = b.config, l = d.baseHref ? '\x3cbase href\x3d"' + d.baseHref + '"/\x3e' : ""; if (d.fullPage) c = b.getData().replace(/<head>/,
                        "$\x26" + l).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + b.lang.preview.preview); else {
                            var d = "\x3cbody ", k = b.document && b.document.getBody(); k && (k.getAttribute("id") && (d += 'id\x3d"' + k.getAttribute("id") + '" '), k.getAttribute("class") && (d += 'class\x3d"' + k.getAttribute("class") + '" ')); d += "\x3e"; c = b.config.docType + '\x3chtml dir\x3d"' + b.config.contentsLangDirection + '"\x3e\x3chead\x3e' + l + "\x3ctitle\x3e" + b.lang.preview.preview + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(b.config.contentsCss) + "\x3c/head\x3e" +
                                d + b.getData() + "\x3c/body\x3e\x3c/html\x3e"
                    } l = 640; d = 420; k = 80; try { var f = window.screen, l = Math.round(.8 * f.width), d = Math.round(.7 * f.height), k = Math.round(.1 * f.width) } catch (e) { } if (!1 === b.fire("contentPreview", b = { dataValue: c })) return !1; var f = "", m; CKEDITOR.env.ie && (window._cke_htmlToLoad = b.dataValue, m = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )",
                        f = ""); CKEDITOR.env.gecko && (window._cke_htmlToLoad = b.dataValue, f = CKEDITOR.getUrl(a + "preview.html")); f = window.open(f, null, "toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes,width\x3d" + l + ",height\x3d" + d + ",left\x3d" + k); CKEDITOR.env.ie && f && (f.location = m); CKEDITOR.env.ie || CKEDITOR.env.gecko || (m = f.document, m.open(), m.write(b.dataValue), m.close()); return !0
                }
            }; CKEDITOR.plugins.add("preview", {
                init: function (b) {
                    b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a = this.path,
                        b.addCommand("preview", d), b.ui.addButton && b.ui.addButton("Preview", { label: b.lang.preview.preview, command: "preview", toolbar: "document,40" }))
                }
            })
        }(), CKEDITOR.plugins.add("print", { init: function (a) { a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand("print", CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton("Print", { label: a.lang.print.toolbar, command: "print", toolbar: "document,50" })) } }), CKEDITOR.plugins.print = {
            exec: function (a) { CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print") },
            canUndo: !1, readOnly: 1, modes: { wysiwyg: 1 }
        }, CKEDITOR.plugins.add("removeformat", { init: function (a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } }), CKEDITOR.plugins.removeformat = {
            commands: {
                removeformat: {
                    exec: function (a) {
                        for (var d = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$",
                            "i")), b = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), c = CKEDITOR.plugins.removeformat.filter, h = a.getSelection().getRanges(), l = h.createIterator(), k = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, f; f = l.getNextRange();) {
                                f.collapsed || f.enlarge(CKEDITOR.ENLARGE_ELEMENT); var e = f.createBookmark(), m = e.startNode, g = e.endNode, n = function (b) {
                                    for (var e = a.elementPath(b), f = e.elements, g = 1, h; (h = f[g]) && !h.equals(e.block) && !h.equals(e.blockLimit); g++)d.test(h.getName()) &&
                                        c(a, h) && b.breakParent(h)
                                }; n(m); if (g) for (n(g), m = m.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); m && !m.equals(g);)if (m.isReadOnly()) { if (m.getPosition(g) & CKEDITOR.POSITION_CONTAINS) break; m = m.getNext(k) } else n = m.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == m.getName() && m.data("cke-realelement") || !c(a, m) || (d.test(m.getName()) ? m.remove(1) : (m.removeAttributes(b), a.fire("removeFormatCleanup", m))), m = n; f.moveToBookmark(e)
                        } a.forceNextSelectionCheck(); a.getSelection().selectRanges(h)
                    }
                }
            }, filter: function (a,
                d) { for (var b = a._.removeFormatFilters || [], c = 0; c < b.length; c++)if (!1 === b[c](d)) return !1; return !0 }
        }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) }, CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", CKEDITOR.plugins.add("resize",
            {
                init: function (a) {
                    function d(b) { var d = e.width, h = e.height, k = d + (b.data.$.screenX - f.x) * ("rtl" == l ? -1 : 1); b = h + (b.data.$.screenY - f.y); m && (d = Math.max(c.resize_minWidth, Math.min(k, c.resize_maxWidth))); g && (h = Math.max(c.resize_minHeight, Math.min(b, c.resize_maxHeight))); a.resize(m ? d : null, h) } function b() { CKEDITOR.document.removeListener("mousemove", d); CKEDITOR.document.removeListener("mouseup", b); a.document && (a.document.removeListener("mousemove", d), a.document.removeListener("mouseup", b)) } var c = a.config, h = a.ui.spaceId("resizer"),
                        l = a.element ? a.element.getDirection(1) : "ltr"; !c.resize_dir && (c.resize_dir = "vertical"); void 0 === c.resize_maxWidth && (c.resize_maxWidth = 3E3); void 0 === c.resize_maxHeight && (c.resize_maxHeight = 3E3); void 0 === c.resize_minWidth && (c.resize_minWidth = 750); void 0 === c.resize_minHeight && (c.resize_minHeight = 250); if (!1 !== c.resize_enabled) {
                            var k = null, f, e, m = ("both" == c.resize_dir || "horizontal" == c.resize_dir) && c.resize_minWidth != c.resize_maxWidth, g = ("both" == c.resize_dir || "vertical" == c.resize_dir) && c.resize_minHeight !=
                                c.resize_maxHeight, n = CKEDITOR.tools.addFunction(function (g) { k || (k = a.getResizable()); e = { width: k.$.offsetWidth || 0, height: k.$.offsetHeight || 0 }; f = { x: g.screenX, y: g.screenY }; c.resize_minWidth > e.width && (c.resize_minWidth = e.width); c.resize_minHeight > e.height && (c.resize_minHeight = e.height); CKEDITOR.document.on("mousemove", d); CKEDITOR.document.on("mouseup", b); a.document && (a.document.on("mousemove", d), a.document.on("mouseup", b)); g.preventDefault && g.preventDefault() }); a.on("destroy", function () { CKEDITOR.tools.removeFunction(n) });
                            a.on("uiSpace", function (b) { if ("bottom" == b.data.space) { var c = ""; m && !g && (c = " cke_resizer_horizontal"); !m && g && (c = " cke_resizer_vertical"); var e = '\x3cspan id\x3d"' + h + '" class\x3d"cke_resizer' + c + " cke_resizer_" + l + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == l ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == l && "ltr" == c ? b.data.html += e : b.data.html = e + b.data.html } }, a, null, 100); a.on("maximize", function (b) {
                                a.ui.space("resizer")[b.data ==
                                    CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
                            })
                        }
                }
            }), function () { var a = { readOnly: 1, modes: { wysiwyg: 1, source: 1 }, exec: function (a) { if (a.fire("save") && (a = a.element.$.form)) try { a.submit() } catch (b) { a.submit.click && a.submit.click() } } }; CKEDITOR.plugins.add("save", { init: function (d) { d.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (d.addCommand("save", a).startDisabled = !d.element.$.form, d.ui.addButton && d.ui.addButton("Save", { label: d.lang.save.toolbar, command: "save", toolbar: "document,10" })) } }) }(), "use strict", CKEDITOR.plugins.add("scayt",
                {
                    requires: "menubutton,dialog", tabToOpen: null, dialogName: "scaytDialog", onLoad: function (a) { CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime(); "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css"); CKEDITOR.document.appendStyleSheet(this.path + "dialogs/dialog.css") }, init: function (a) {
                        var d = this, b = CKEDITOR.plugins.scayt; this.bindEvents(a); this.parseConfig(a); this.addRule(a); CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path +
                            "dialogs/options.js")); this.addMenuItems(a); var c = a.lang.scayt, h = CKEDITOR.env; a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                                label: c.text_title, title: a.plugins.wsc ? a.lang.wsc.title : c.text_title, modes: { wysiwyg: !(h.ie && (8 > h.version || h.quirks)) }, toolbar: "spellchecker,20", refresh: function () { var c = a.ui.instances.Scayt.getState(); a.scayt && (c = b.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); a.fire("scaytButtonState", c) }, onRender: function () {
                                    var b = this; a.on("scaytButtonState", function (a) {
                                        void 0 !==
                                        typeof a.data && b.setState(a.data)
                                    })
                                }, onMenu: function () {
                                    var c = a.scayt; a.getMenuItem("scaytToggle").label = a.lang.scayt[c && b.state.scayt[a.name] ? "btn_disable" : "btn_enable"]; var d = { scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED };
                                    a.config.scayt_uiTabs[0] || delete d.scaytOptions; a.config.scayt_uiTabs[1] || delete d.scaytLangs; a.config.scayt_uiTabs[2] || delete d.scaytDict; c && !CKEDITOR.plugins.scayt.isNewUdSupported(c) && (delete d.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()); return d
                                }
                            }); a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, c) {
                                var f = a.scayt, e, h; f && (h = f.getSelectionNode()) && (e = d.menuGenerator(a, h), f.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
                                return e
                            }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) { return function () { var c = a.scayt; c && c.hideBanner(); return b.apply(this) } }))
                    }, addMenuItems: function (a) {
                        var d = this, b = CKEDITOR.plugins.scayt; a.addMenuGroup("scaytButton"); for (var c = a.config.scayt_contextMenuItemsOrder.split("|"), h = 0; h < c.length; h++)c[h] = "scayt_" + c[h]; if ((c = ["grayt_description", "grayt_suggest", "grayt_control"].concat(c)) && c.length) for (h = 0; h < c.length; h++)a.addMenuGroup(c[h], h - 10); a.addCommand("scaytToggle",
                            { exec: function (a) { var c = a.scayt; b.state.scayt[a.name] = !b.state.scayt[a.name]; !0 === b.state.scayt[a.name] ? c || b.createScayt(a) : c && b.destroy(a) } }); a.addCommand("scaytAbout", { exec: function (a) { a.scayt.tabToOpen = "about"; a.lockSelection(); a.openDialog(d.dialogName) } }); a.addCommand("scaytOptions", { exec: function (a) { a.scayt.tabToOpen = "options"; a.lockSelection(); a.openDialog(d.dialogName) } }); a.addCommand("scaytLangs", { exec: function (a) { a.scayt.tabToOpen = "langs"; a.lockSelection(); a.openDialog(d.dialogName) } });
                        a.addCommand("scaytDict", { exec: function (a) { a.scayt.tabToOpen = "dictionaries"; a.lockSelection(); a.openDialog(d.dialogName) } }); c = {
                            scaytToggle: { label: a.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle" }, scaytAbout: { label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" }, scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" }, scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" }, scaytDict: {
                                label: a.lang.scayt.btn_dictionaries,
                                group: "scaytButton", command: "scaytDict"
                            }
                        }; a.plugins.wsc && (c.WSC = { label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function () { var b = CKEDITOR.plugins.scayt, c = a.scayt, d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (d = d.replace(/\s/g, "")) ? (c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!") } }); a.addMenuItems(c)
                    }, bindEvents: function (a) {
                        var d = CKEDITOR.plugins.scayt,
                        b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, c = function () { d.destroy(a) }, h = function () { !d.state.scayt[a.name] || a.readOnly || a.scayt || d.createScayt(a) }, l = function () {
                            var c = a.editable(); c.attachListener(c, "focus", function (c) {
                                CKEDITOR.plugins.scayt && !a.scayt && setTimeout(h, 0); c = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt; var d, f; if ((b || c) && a._.savedSelection) {
                                    c = a._.savedSelection.getSelectedElement(); c = !c && a._.savedSelection.getRanges(); for (var k = 0; k < c.length; k++)f = c[k], "string" ===
                                        typeof f.startContainer.$.nodeValue && (d = f.startContainer.getText().length, (d < f.startOffset || d < f.endOffset) && a.unlockSelection(!1))
                                }
                            }, this, null, -10)
                        }, k = function () {
                            b ? a.config.scayt_inlineModeImmediateMarkup ? h() : (a.on("blur", function () { setTimeout(c, 0) }), a.on("focus", h), a.focusManager.hasFocus && h()) : h(); l(); var d = a.editable(); d.attachListener(d, "mousedown", function (b) {
                                b = b.data.getTarget(); var c = a.widgets && a.widgets.getByElement(b); c && (c.wrapper = b.getAscendant(function (a) { return a.hasAttribute("data-cke-widget-wrapper") },
                                    !0))
                            }, this, null, -10)
                        }; a.on("contentDom", k); a.on("beforeCommandExec", function (b) {
                            var c = a.scayt, h = !1, g = !1, k = !0; b.data.name in d.options.disablingCommandExec && "wysiwyg" == a.mode ? c && (d.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !c || ("cut" === b.data.name && (k = !1,
                                g = !0), "language" === b.data.name && (g = h = !0), a.fire("reloadMarkupScayt", { removeOptions: { removeInside: k, forceBookmark: g, language: h }, timeout: 0 }))
                        }); a.on("beforeSetMode", function (b) { if ("source" == b.data) { if (b = a.scayt) d.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED); a.document && a.document.getBody().removeAttribute("_jquid") } }); a.on("afterCommandExec", function (b) { "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () { d.reloadMarkup(a.scayt) }, 250) }); a.on("readOnly",
                            function (b) { var c; b && (c = a.scayt, !0 === b.editor.readOnly ? c && c.fire("removeMarkupInDocument", {}) : c ? d.reloadMarkup(c) : "wysiwyg" == b.editor.mode && !0 === d.state.scayt[b.editor.name] && (d.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON))) }); a.on("beforeDestroy", c); a.on("setData", function () { c(); (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && k() }, this, null, 50); a.on("reloadMarkupScayt", function (b) {
                                var c = b.data && b.data.removeOptions, h = b.data && b.data.timeout, g = b.data && b.data.language,
                                k = a.scayt; k && setTimeout(function () { g && (c.selectionNode = a.plugins.language.getCurrentLangElement(a), c.selectionNode = c.selectionNode && c.selectionNode.$ || null); k.removeMarkupInSelectionNode(c); d.reloadMarkup(k) }, h || 0)
                            }); a.on("insertElement", function () { a.fire("reloadMarkupScayt", { removeOptions: { forceBookmark: !0 } }) }, this, null, 50); a.on("insertHtml", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("insertText", function () {
                                a.scayt && a.scayt.setFocused &&
                                a.scayt.setFocused(!0); a.fire("reloadMarkupScayt")
                            }, this, null, 50); a.on("scaytDialogShown", function (b) { b.data.selectPage(a.scayt.tabToOpen) })
                    }, parseConfig: function (a) {
                        var d = CKEDITOR.plugins.scayt; d.replaceOldOptionsNames(a.config); "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1); d.state.scayt[a.name] = a.config.scayt_autoStartup; "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1); "boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup =
                            !1); d.state.grayt[a.name] = a.config.grayt_autoStartup; a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignoreall|add"); a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"); a.config.scayt_sLang || (a.config.scayt_sLang = "en_US"); if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 5; if (void 0 === a.config.scayt_minWordLength || "number" !=
                                typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 4; if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = ""; if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null; if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
                                    var b = [], c = []; a.config.scayt_uiTabs =
                                        a.config.scayt_uiTabs.split(","); CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) { 1 === Number(a) || 0 === Number(a) ? (c.push(!0), b.push(Number(a))) : c.push(!1) }); null === CKEDITOR.tools.search(c, !1) ? a.config.scayt_uiTabs = b : a.config.scayt_uiTabs = [1, 1, 1]
                                } else a.config.scayt_uiTabs = [1, 1, 1]; "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null); "string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null); "string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort =
                                    null); "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null); a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on"); "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"); "string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-"); "string" !== typeof a.config.scayt_srcUrl && (d = document.location.protocol, d = -1 != d.search(/https?:/) ? d : "http:", a.config.scayt_srcUrl =
                                        d + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js"); "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0); "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; "boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1); "object" !== typeof a.config.scayt_multiLanguageStyles &&
                                            (a.config.scayt_multiLanguageStyles = {}); a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1); a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1); a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1); a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers &&
                                                (a.config.scayt_ignoreWordsWithNumbers = !1); if (a.config.scayt_disableOptionsStorage) {
                                                    var d = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0, h = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "), l = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases",
                                                        "ignore-words-with-numbers"], k = CKEDITOR.tools.search, f = CKEDITOR.tools.indexOf; a.config.scayt_disableOptionsStorage = function (a) { for (var b = [], c = 0; c < a.length; c++) { var d = a[c], p = !!k(a, "options"); if (!k(h, d) || p && k(l, function (a) { if ("lang" === a) return !1 })) return; k(l, d) && l.splice(f(l, d), 1); if ("all" === d || p && k(a, "lang")) return []; "options" === d && (l = ["lang"]) } return b = b.concat(l) }(d)
                                                }
                    }, addRule: function (a) {
                        var d = CKEDITOR.plugins.scayt, b = a.dataProcessor, c = b && b.htmlFilter, h = a._.elementsPath && a._.elementsPath.filters,
                        b = b && b.dataFilter, l = a.addRemoveFormatFilter, k = function (b) { if (a.scayt && (b.hasAttribute(d.options.data_attribute_name) || b.hasAttribute(d.options.problem_grammar_data_attribute))) return !1 }, f = function (b) { var c = !0; a.scayt && (b.hasAttribute(d.options.data_attribute_name) || b.hasAttribute(d.options.problem_grammar_data_attribute)) && (c = !1); return c }; h && h.push(k); b && b.addRules({
                            elements: {
                                span: function (a) {
                                    var b = a.hasClass(d.options.misspelled_word_class) && a.attributes[d.options.data_attribute_name], c = a.hasClass(d.options.problem_grammar_class) &&
                                        a.attributes[d.options.problem_grammar_data_attribute]; d && (b || c) && delete a.name; return a
                                }
                            }
                        }); c && c.addRules({ elements: { span: function (a) { var b = a.hasClass(d.options.misspelled_word_class) && a.attributes[d.options.data_attribute_name], c = a.hasClass(d.options.problem_grammar_class) && a.attributes[d.options.problem_grammar_data_attribute]; d && (b || c) && delete a.name; return a } } }); l && l.call(a, f)
                    }, scaytMenuDefinition: function (a) {
                        var d = this; a = a.scayt; return {
                            scayt: {
                                scayt_ignore: {
                                    label: a.getLocal("btn_ignore"), group: "scayt_control",
                                    order: 1, exec: function (a) { a.scayt.ignoreWord() }
                                }, scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function (a) { a.scayt.ignoreAllWords() } }, scayt_add: { label: a.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function (a) { var c = a.scayt; setTimeout(function () { c.addWordToUserDictionary() }, 10) } }, scayt_option: {
                                    label: a.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function (a) { a.scayt.tabToOpen = "options"; a.lockSelection(); a.openDialog(d.dialogName) },
                                    verification: function (a) { return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 }
                                }, scayt_language: { label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (a) { a.scayt.tabToOpen = "langs"; a.lockSelection(); a.openDialog(d.dialogName) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[1] ? !0 : !1 } }, scayt_dictionary: {
                                    label: a.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) { a.scayt.tabToOpen = "dictionaries"; a.lockSelection(); a.openDialog(d.dialogName) }, verification: function (a) {
                                        return 1 ==
                                            a.config.scayt_uiTabs[2] ? !0 : !1
                                    }
                                }, scayt_about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) { a.scayt.tabToOpen = "about"; a.lockSelection(); a.openDialog(d.dialogName) } }
                            }, grayt: {
                                grayt_problemdescription: { label: "Grammar problem description", group: "grayt_description", order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) { } }, grayt_ignore: { label: a.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function (a) { a.scayt.ignorePhrase() } }, grayt_ignoreall: {
                                    label: a.getLocal("btn_ignoreAll"),
                                    group: "grayt_control", order: 3, exec: function (a) { a.scayt.ignoreAllPhrases() }
                                }
                            }
                        }
                    }, buildSuggestionMenuItems: function (a, d, b) {
                        var c = {}, h = {}, l = b ? "word" : "phrase", k = b ? "startGrammarCheck" : "startSpellCheck", f = a.scayt; if (0 < d.length && "no_any_suggestions" !== d[0]) if (b) for (b = 0; b < d.length; b++) {
                            var e = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_"); a.addCommand(e, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, k)); b < a.config.scayt_maxSuggestions ? (a.addMenuItem(e, {
                                label: d[b], command: e,
                                group: "scayt_suggest", order: b + 1
                            }), c[e] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(e, { label: d[b], command: e, group: "scayt_moresuggest", order: b + 1 }), h[e] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", { label: f.getLocal("btn_moreSuggestions"), group: "scayt_moresuggest", order: 10, getItems: function () { return h } }), c.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
                        } else for (b = 0; b < d.length; b++)e = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_"), a.addCommand(e,
                            this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, k)), a.addMenuItem(e, { label: d[b], command: e, group: "grayt_suggest", order: b + 1 }), c[e] = CKEDITOR.TRISTATE_OFF; else c.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", { exec: function () { } }), a.addMenuItem("no_scayt_suggest", { label: f.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }); return c
                    }, menuGenerator: function (a, d) {
                        var b = a.scayt, c = this.scaytMenuDefinition(a), h =
                            {}, l = a.config.scayt_contextCommands.split("|"), k = d.getAttribute(b.getLangAttribute()) || b.getLang(), f, e, m; f = b.isScaytNode(d); e = b.isGraytNode(d); f ? (c = c.scayt, h = d.getAttribute(b.getScaytNodeAttributeName()), b.fire("getSuggestionsList", { lang: k, word: h }), h = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, f)) : e && (c = c.grayt, h = d.getAttribute(b.getGraytNodeAttributeName()), m = b.getProblemDescriptionText(h, k), c.grayt_problemdescription && m && (c.grayt_problemdescription.label = m), b.fire("getGrammarSuggestionsList",
                                { lang: k, phrase: h }), h = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, f)); if (f && "off" == a.config.scayt_contextCommands) return h; for (var g in c) f && -1 == CKEDITOR.tools.indexOf(l, g.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || e && "grayt_problemdescription" !== g && -1 == CKEDITOR.tools.indexOf(l, g.replace("grayt_", "")) && "all" != a.config.scayt_contextCommands || (h[g] = "undefined" != typeof c[g].state ? c[g].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof c[g].verification || c[g].verification(a) ||
                                    delete h[g], a.addCommand(g, { exec: c[g].exec }), a.addMenuItem(g, { label: a.lang.scayt[c[g].label] || c[g].label, command: g, group: c[g].group, order: c[g].order })); return h
                    }, createCommand: function (a, d, b) { return { exec: function (c) { c = c.scayt; var h = {}; h[d] = a; c.replaceSelectionNode(h); "startGrammarCheck" === b && c.removeMarkupInSelectionNode({ grammarOnly: !0 }); c.fire(b) } } }
                }), CKEDITOR.plugins.scayt = {
                    charsToObserve: [{
                        charName: "cke-fillingChar", charCode: function () {
                            var a = CKEDITOR.version.match(/^\d(\.\d*)*/), a = a && a[0], d; if (a) {
                                d =
                                "4.5.7"; var b, a = a.replace(/\./g, ""); d = d.replace(/\./g, ""); b = a.length - d.length; b = 0 <= b ? b : 0; d = parseInt(a) >= parseInt(d) * Math.pow(10, b)
                            } return d ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
                        }()
                    }], onLoadTimestamp: "", state: { scayt: {}, grayt: {} }, warningCounter: 0, suggestions: [], options: { disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word", misspelled_word_class: "scayt-misspell-word", problem_grammar_data_attribute: "data-grayt-phrase", problem_grammar_class: "gramm-problem" },
                    backCompatibilityMap: { scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath", scayt_customerid: "scayt_customerId" }, alarmCompatibilityMessage: function () {
                        5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
                            this.warningCounter += 1)
                    }, isNewUdSupported: function (a) { return a.getUserDictionary ? !0 : !1 }, reloadMarkup: function (a) { var d; a && (d = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), d && d.ltr && d.rtl && a.fire("startSpellCheck, startGrammarCheck"))) }, replaceOldOptionsNames: function (a) { for (var d in a) d in this.backCompatibilityMap && (a[this.backCompatibilityMap[d]] = a[d], delete a[d]) }, createScayt: function (a) {
                        var d = this, b = CKEDITOR.plugins.scayt; this.loadScaytLibrary(a, function (a) {
                            function h(a) {
                                return new SCAYT.CKSCAYT(a,
                                    function () { }, function () { })
                            } var l = a.window && a.window.getFrame() || a.editable(); if (l) {
                                l = {
                                    lang: a.config.scayt_sLang, container: l.$, customDictionary: a.config.scayt_customDictionaryIds, userDictionaryName: a.config.scayt_userDictionaryName, localization: a.langCode, customer_id: a.config.scayt_customerId, customPunctuation: a.config.scayt_customPunctuation, debug: a.config.scayt_debug, data_attribute_name: d.options.data_attribute_name, misspelled_word_class: d.options.misspelled_word_class, problem_grammar_data_attribute: d.options.problem_grammar_data_attribute,
                                    problem_grammar_class: d.options.problem_grammar_class, "options-to-restore": a.config.scayt_disableOptionsStorage, focused: a.editable().hasFocus, ignoreElementsRegex: a.config.scayt_elementsToIgnore, ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore, minWordLength: a.config.scayt_minWordLength, multiLanguageMode: a.config.scayt_multiLanguageMode, multiLanguageStyles: a.config.scayt_multiLanguageStyles, graytAutoStartup: a.config.grayt_autoStartup, charsToObserve: b.charsToObserve
                                }; a.config.scayt_serviceProtocol &&
                                    (l.service_protocol = a.config.scayt_serviceProtocol); a.config.scayt_serviceHost && (l.service_host = a.config.scayt_serviceHost); a.config.scayt_servicePort && (l.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (l.service_path = a.config.scayt_servicePath); "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (l["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords); "boolean" === typeof a.config.scayt_ignoreDomainNames && (l["ignore-domain-names"] = a.config.scayt_ignoreDomainNames); "boolean" ===
                                        typeof a.config.scayt_ignoreWordsWithMixedCases && (l["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases); "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (l["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers); var k; try { k = h(l) } catch (f) { d.alarmCompatibilityMessage(), delete l.charsToObserve, k = h(l) } k.subscribe("suggestionListSend", function (a) {
                                            for (var b = {}, c = [], d = 0; d < a.suggestionList.length; d++)b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] =
                                                a.suggestionList[d], c.push(a.suggestionList[d])); CKEDITOR.plugins.scayt.suggestions = c
                                        }); k.subscribe("selectionIsChanged", function (b) { a.getSelection().isLocked && a.lockSelection() }); k.subscribe("graytStateChanged", function (e) { b.state.grayt[a.name] = e.state }); k.addMarkupHandler && k.addMarkupHandler(function (b) { var d = a.editable(), f = d.getCustomData(b.charName); f && (f.$ = b.node, d.setCustomData(b.charName, f)) }); a.scayt = k; a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                            } else b.state.scayt[a.name] =
                                !1
                        })
                    }, destroy: function (a) { a.scayt && a.scayt.destroy(); delete a.scayt; a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) }, loadScaytLibrary: function (a, d) { var b, c = function () { CKEDITOR.fireOnce("scaytReady"); a.scayt || "function" === typeof d && d(a) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (b = a.config.scayt_srcUrl + "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(b, function (a) { a && c() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && c() }
                }, CKEDITOR.on("dialogDefinition",
                    function (a) {
                        var d = a.data.name; a = a.data.definition.dialog; if ("scaytDialog" === d) a.on("cancel", function (a) { return !1 }, this, null, -1); if ("checkspell" === d) a.on("cancel", function (a) { a = a.sender && a.sender.getParentEditor(); var c = CKEDITOR.plugins.scayt, d = a.scayt; d && c.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!1); a.unlockSelection() }, this, null, -2); if ("link" === d) a.on("ok", function (a) {
                            var c = a.sender && a.sender.getParentEditor(); c && setTimeout(function () {
                                c.fire("reloadMarkupScayt", {
                                    removeOptions: {
                                        removeInside: !0,
                                        forceBookmark: !0
                                    }, timeout: 0
                                })
                            }, 0)
                        }); if ("replace" === d) a.on("hide", function (a) { a = a.sender && a.sender.getParentEditor(); var c = CKEDITOR.plugins.scayt, d = a.scayt; a && setTimeout(function () { d && (d.fire("removeMarkupInDocument", {}), c.reloadMarkup(d)) }, 0) })
                    }), CKEDITOR.on("scaytReady", function () {
                        if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
                            var a = CKEDITOR.editor.prototype; a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) {
                                return function () {
                                    var c = null, d = this.scayt; if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] &&
                                        this.scayt) { if (c = "ready" == this.status) var l = d.removeMarkupFromString(this.getSnapshot()), d = d.removeMarkupFromString(this._.previousValue), c = c && d !== l } else c = a.call(this); return c
                                }
                            }); a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function (a) { return function () { var c = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = c.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
                        } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
                            var a = CKEDITOR.plugins.undo.Image.prototype,
                            d = "function" == typeof a.equalsContent ? "equalsContent" : "equals"; a[d] = CKEDITOR.tools.override(a[d], function (a) { return function (c) { var d = c.editor.scayt, l = this.contents, k = c.contents, f = null; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[c.editor.name] && c.editor.scayt && (this.contents = d.removeMarkupFromString(l) || "", c.contents = d.removeMarkupFromString(k) || ""); f = a.apply(this, arguments); this.contents = l; c.contents = k; return f } })
                        }
                    }), function () {
                        CKEDITOR.plugins.add("selectall", {
                            init: function (a) {
                                a.addCommand("selectAll",
                                    { modes: { wysiwyg: 1, source: 1 }, exec: function (a) { var b = a.editable(); if (b.is("textarea")) a = b.$, CKEDITOR.env.ie && a.createTextRange ? a.createTextRange().execCommand("SelectAll") : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus(); else { if (b.is("body")) a.document.$.execCommand("SelectAll", !1, null); else { var c = a.createRange(); c.selectNodeContents(b); c.select() } a.forceNextSelectionCheck(); a.selectionChange() } }, canUndo: !1 }); a.ui.addButton && a.ui.addButton("SelectAll", {
                                        label: a.lang.selectall.toolbar, command: "selectAll",
                                        toolbar: "selection,10"
                                    })
                            }
                        })
                    }(), function () {
                        var a = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var b = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass"; a.editable()[b]("cke_show_blocks") } } }; CKEDITOR.plugins.add("showblocks", {
                            onLoad: function () {
                                var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), b, c, h, l, k = CKEDITOR.getUrl(this.path),
                                f = !(CKEDITOR.env.ie && 9 > CKEDITOR.env.version), e = f ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "", m, g; for (b = c = h = l = ""; m = a.pop();)g = a.length ? "," : "", b += ".cke_show_blocks " + m + e + g, h += ".cke_show_blocks.cke_contents_ltr " + m + e + g, l += ".cke_show_blocks.cke_contents_rtl " + m + e + g, c += ".cke_show_blocks " + m + e + "{background-image:url(" + CKEDITOR.getUrl(k + "images/block_" + m + ".png") + ")}"; CKEDITOR.addCss((b + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(c, h + "{background-position:top left;padding-left:8px}",
                                    l + "{background-position:top right;padding-right:8px}")); f || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
                            }, init: function (d) {
                                function b() { c.refresh(d) }
                                if (!d.blockless) { var c = d.addCommand("showblocks", a); c.canUndo = !1; d.config.startupOutlineBlocks && c.setState(CKEDITOR.TRISTATE_ON); d.ui.addButton && d.ui.addButton("ShowBlocks", { label: d.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" }); d.on("mode", function () { c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(d) }); d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (d.on("focus", b), d.on("blur", b)); d.on("contentDom", function () { c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(d) }) }
                            }
                        })
                    }(), function () {
                        var a =
                            { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; a.editable()[b]("cke_show_borders") } } }; CKEDITOR.plugins.add("showborders", {
                                modes: { wysiwyg: 1 }, onLoad: function () {
                                    var a; a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                                        "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(a)
                                }, init: function (d) {
                                    var b = d.addCommand("showborders", a); b.canUndo = !1; !1 !== d.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON); d.on("mode", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(d) }, null, null, 100); d.on("contentDom", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(d) }); d.on("removeFormatCleanup", function (a) {
                                        a = a.data; d.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
                                            0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
                                    })
                                }, afterInit: function (a) {
                                    var b = a.dataProcessor; a = b && b.dataFilter; b = b && b.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; var b = a["class"], d = parseInt(a.border, 10); d && !(0 >= d) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border") } } }); b && b.addRules({
                                        elements: {
                                            table: function (a) {
                                                a = a.attributes; var b = a["class"]; b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                                    ""))
                                            }
                                        }
                                    })
                                }
                            }); CKEDITOR.on("dialogDefinition", function (a) {
                                var b = a.data.name; if ("table" == b || "tableProperties" == b) if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function (a) { return function (b, d) { a.apply(this, arguments); var k = parseInt(this.getValue(), 10); d[!k || 0 >= k ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                                    return function () {
                                        a.apply(this,
                                            arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                                    }
                                }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (b, d) { a.apply(this, arguments); parseInt(d.getAttribute("border"), 10) || d.addClass("cke_show_border") } })
                            })
                    }(), CKEDITOR.plugins.add("smiley", {
                        requires: "dialog", init: function (a) {
                            a.config.smiley_path = a.config.smiley_path || this.path + "images/"; a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" }));
                            a.ui.addButton && a.ui.addButton("Smiley", { label: a.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" }); CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
                        }
                    }), CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "),
        CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"), function () {
            CKEDITOR.plugins.add("sourcearea", {
                init: function (d) {
                    function b() { var a = h && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show(); a && this.focus() } if (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var c =
                            CKEDITOR.plugins.sourcearea; d.addMode("source", function (c) {
                                var h = d.ui.space("contents").getDocument().createElement("textarea"); h.setStyles(CKEDITOR.tools.extend({ width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left" }, CKEDITOR.tools.cssVendorPrefix("tab-size", d.config.sourceAreaTabSize || 4))); h.setAttribute("dir", "ltr"); h.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"); d.ui.space("contents").append(h); h = d.editable(new a(d,
                                    h)); h.setData(d.getData(1)); CKEDITOR.env.ie && (h.attachListener(d, "resize", b, h), h.attachListener(CKEDITOR.document.getWindow(), "resize", b, h), CKEDITOR.tools.setTimeout(b, 0, h)); d.fire("ariaWidget", this); c()
                            }); d.addCommand("source", c.commands.source); d.ui.addButton && d.ui.addButton("Source", { label: d.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); d.on("mode", function () { d.getCommand("source").setState("source" == d.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var h = CKEDITOR.env.ie && 9 ==
                                CKEDITOR.env.version
                    }
                }
            }); var a = CKEDITOR.tools.createClass({ base: CKEDITOR.editable, proto: { setData: function (a) { this.setValue(a); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() }, insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () { a.baseProto.detach.call(this); this.clearCustomData(); this.remove() } } })
        }(), CKEDITOR.plugins.sourcearea = {
            commands: {
                source: {
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    }, editorFocus: !1, readOnly: 1, exec: function (a) { "wysiwyg" == a.mode && a.fire("saveSnapshot"); a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); a.setMode("source" == a.mode ? "wysiwyg" : "source") }, canUndo: !1
                }
            }
        }, CKEDITOR.plugins.add("specialchar", {
            availableLangs: {
                af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1,
                pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
            }, requires: "dialog", init: function (a) {
                var d = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); a.addCommand("specialchar", {
                    exec: function () {
                        var b = a.langCode, b = d.availableLangs[b] ? b : d.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d.path + "dialogs/lang/" + b + ".js"), function () {
                            CKEDITOR.tools.extend(a.lang.specialchar, d.langEntries[b]);
                            a.openDialog("specialchar")
                        })
                    }, modes: { wysiwyg: 1 }, canUndo: !1
                }); a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
            }
        }), CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "),
        function () {
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo", init: function (a) {
                    var d = a.config, b = a.lang.stylescombo, c = {}, h = [], l = []; a.on("stylesSet", function (b) {
                        if (b = b.data.styles) {
                            for (var f, e, m, g = 0, n = b.length; g < n; g++)(f = b[g], a.blockless && f.element in CKEDITOR.dtd.$block || "string" == typeof f.type && !CKEDITOR.style.customHandlers[f.type] || (e = f.name, f = new CKEDITOR.style(f), a.filter.customConfig && !a.filter.check(f))) || (f._name = e, f._.enterMode = d.enterMode, f._.type = m = f.assignedTo || f.type, f._.weight =
                                g + 1E3 * (m == CKEDITOR.STYLE_OBJECT ? 1 : m == CKEDITOR.STYLE_BLOCK ? 2 : 3), c[e] = f, h.push(f), l.push(f)); h.sort(function (a, b) { return a._.weight - b._.weight })
                        }
                    }); a.ui.addRichCombo("Styles", {
                        label: b.label, title: b.panelTitle, toolbar: "styles,10", allowedContent: l, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(d.contentsCss), multiSelect: !0, attributes: { "aria-label": b.panelTitle } }, init: function () {
                            var a, c, e, d, g, l; g = 0; for (l = h.length; g < l; g++)a = h[g], c = a._name, d = a._.type, d != e && (this.startGroup(b["panelTitle" + String(d)]),
                                e = d), this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(), c); this.commit()
                        }, onClick: function (b) { a.focus(); a.fire("saveSnapshot"); b = c[b]; var d = a.elementPath(); if (b.group && b.removeStylesFromSameGroup(a)) a.applyStyle(b); else a[b.checkActive(d, a) ? "removeStyle" : "applyStyle"](b); a.fire("saveSnapshot") }, onRender: function () {
                            a.on("selectionChange", function (b) {
                                var d = this.getValue(); b = b.data.path.elements; for (var e = 0, h = b.length, g; e < h; e++) {
                                    g = b[e]; for (var l in c) if (c[l].checkElementRemovable(g, !0, a)) {
                                        l !=
                                        d && this.setValue(l); return
                                    }
                                } this.setValue("")
                            }, this)
                        }, onOpen: function () {
                            var d = a.getSelection(), d = d.getSelectedElement() || d.getStartElement() || a.editable(), d = a.elementPath(d), f = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var e in c) { var h = c[e], g = h._.type; h.checkApplicable(d, a, a.activeFilter) ? f[g]++ : this.hideItem(e); h.checkActive(d, a) && this.mark(e) } f[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]); f[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
                            f[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                        }, refresh: function () { var b = a.elementPath(); if (b) { for (var d in c) if (c[d].checkApplicable(b, a, a.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () { c = {}; h = [] }
                    })
                }
            })
        }(), function () {
            function a(a) {
                return {
                    editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (b) {
                        if (b.editable().hasFocus) {
                            var c = b.getSelection(), d; if (d = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
                                td: 1,
                                th: 1
                            }, 1)) {
                                var c = b.createRange(), e = CKEDITOR.tools.tryThese(function () { var b = d.getParent().$.cells[d.$.cellIndex + (a ? -1 : 1)]; b.parentNode.parentNode; return b }, function () { var b = d.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)]; return b.cells[a ? b.cells.length - 1 : 0] }); if (e || a) if (e) e = new CKEDITOR.dom.element(e), c.moveToElementEditStart(e), c.checkStartOfBlock() && c.checkEndOfBlock() || c.selectNodeContents(e); else return !0; else {
                                    for (var m = d.getAscendant("table").$, e = d.getParent().$.cells, m =
                                        new CKEDITOR.dom.element(m.insertRow(-1), b.document), g = 0, n = e.length; g < n; g++)m.append((new CKEDITOR.dom.element(e[g], b.document)).clone(!1, !1)).appendBogus(); c.moveToElementEditStart(m)
                                } c.select(!0); return !0
                            }
                        } return !1
                    }
                }
            } var d = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, b = { exec: function (a) { a.container.focusNext(!0, a.tabIndex) } }, c = { exec: function (a) { a.container.focusPrevious(!0, a.tabIndex) } }; CKEDITOR.plugins.add("tab", {
                init: function (h) {
                    for (var l = !1 !== h.config.enableTabKeyTools, k = h.config.tabSpaces || 0,
                        f = ""; k--;)f += " "; if (f) h.on("key", function (a) { 9 == a.data.keyCode && (h.insertText(f), a.cancel()) }); if (l) h.on("key", function (a) { (9 == a.data.keyCode && h.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && h.execCommand("selectPreviousCell")) && a.cancel() }); h.addCommand("blur", CKEDITOR.tools.extend(b, d)); h.addCommand("blurBack", CKEDITOR.tools.extend(c, d)); h.addCommand("selectNextCell", a()); h.addCommand("selectPreviousCell", a(!0))
                }
            })
        }(), CKEDITOR.dom.element.prototype.focusNext = function (a, d) {
            var b =
                void 0 === d ? this.getTabIndex() : d, c, h, l, k, f, e; if (0 >= b) for (f = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); f;) { if (f.isVisible() && 0 === f.getTabIndex()) { l = f; break } f = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (f = this.getDocument().getBody().getFirst(); f = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!c) if (!h && f.equals(this)) { if (h = !0, a) { if (!(f = f.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; c = 1 } } else h && !this.contains(f) && (c = 1); if (f.isVisible() && !(0 > (e = f.getTabIndex()))) {
                        if (c && e == b) {
                            l =
                            f; break
                        } e > b && (!l || !k || e < k) ? (l = f, k = e) : l || 0 !== e || (l = f, k = e)
                    }
                } l && l.focus()
        }, CKEDITOR.dom.element.prototype.focusPrevious = function (a, d) {
            for (var b = void 0 === d ? this.getTabIndex() : d, c, h, l, k = 0, f, e = this.getDocument().getBody().getLast(); e = e.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                if (!c) if (!h && e.equals(this)) { if (h = !0, a) { if (!(e = e.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; c = 1 } } else h && !this.contains(e) && (c = 1); if (e.isVisible() && !(0 > (f = e.getTabIndex()))) if (0 >= b) {
                    if (c && 0 === f) { l = e; break } f > k &&
                        (l = e, k = f)
                } else { if (c && f == b) { l = e; break } f < b && (!l || f > k) && (l = e, k = f) }
            } l && l.focus()
        }, CKEDITOR.plugins.add("table", {
            requires: "dialog", init: function (a) {
                function d(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
                    var b = a.lang.table; a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                        context: "table", allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" +
                            (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                                element: "table", right: function (a) {
                                    if (a.styles) {
                                        var b; if (a.styles.border) b = CKEDITOR.tools.style.parse.border(a.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                            var d = a.styles; d["border-left"] && d["border-left"] === d["border-right"] && d["border-right"] === d["border-top"] &&
                                                d["border-top"] === d["border-bottom"] && (b = CKEDITOR.tools.style.parse.border(d["border-top"]))
                                        } b && b.style && "solid" === b.style && b.width && 0 !== parseFloat(b.width) && (a.attributes.border = 1); "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
                                    }
                                }
                            }]]
                    })); a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", d())); a.addCommand("tableDelete", d({
                        exec: function (a) {
                            var b = a.elementPath().contains("table", 1); if (b) {
                                var d = b.getParent(), k = a.editable(); 1 != d.getChildCount() || d.is("td",
                                    "th") || d.equals(k) || (b = d); a = a.createRange(); a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START); b.remove(); a.select()
                            }
                        }
                    })); a.ui.addButton && a.ui.addButton("Table", { label: b.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); a.addMenuItems && a.addMenuItems({
                        table: { label: b.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: {
                            label: b.deleteTable, command: "tableDelete", group: "table",
                            order: 1
                        }
                    }); a.on("doubleclick", function (a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
                }
            }
        }), function () {
            function a(a, b) {
                function c(a) { return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0 } function e(a) {
                    0 < d.length || a.type != CKEDITOR.NODE_ELEMENT || !r.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(f, a, "selected_cell",
                        !0), d.push(a))
                } var d = [], f = {}; if (!a) return d; for (var g = a.getRanges(), h = 0; h < g.length; h++) { var k = g[h]; if (k.collapsed) (k = k.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && c(k) && d.push(k); else { var k = new CKEDITOR.dom.walker(k), l; for (k.guard = e; l = k.next();)l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({ td: 1, th: 1 }, !0)) && !l.getCustomData("selected_cell") && c(l) && (CKEDITOR.dom.element.setMarker(f, l, "selected_cell", !0), d.push(l)) } } CKEDITOR.dom.element.clearAllMarkers(f); return d
            }
            function d(b, c) {
                for (var e = w(b) ? b : a(b), d = e[0], f = d.getAscendant("table"), d = d.getDocument(), g = e[0].getParent(), h = g.$.rowIndex, e = e[e.length - 1], k = e.getParent().$.rowIndex + e.$.rowSpan - 1, e = new CKEDITOR.dom.element(f.$.rows[k]), h = c ? h : k, g = c ? g : e, e = CKEDITOR.tools.buildTableMap(f), f = e[h], h = c ? e[h - 1] : e[h + 1], e = e[0].length, d = d.createElement("tr"), k = 0; f[k] && k < e; k++) {
                    var l; 1 < f[k].rowSpan && h && f[k] == h[k] ? (l = f[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(), d.append(l),
                        l = l.$); k += l.colSpan - 1
                } c ? d.insertBefore(g) : d.insertAfter(g); return d
            } function b(c) {
                if (c instanceof CKEDITOR.dom.selection) {
                    var e = c.getRanges(), d = a(c), f = d[0].getAscendant("table"), g = CKEDITOR.tools.buildTableMap(f), h = d[0].getParent().$.rowIndex, d = d[d.length - 1], k = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = []; c.reset(); for (c = h; c <= k; c++) {
                        for (var l = g[c], m = new CKEDITOR.dom.element(f.$.rows[c]), n = 0; n < l.length; n++) {
                            var p = new CKEDITOR.dom.element(l[n]), q = p.getParent().$.rowIndex; 1 == p.$.rowSpan ? p.remove() : (--p.$.rowSpan,
                                q == c && (q = g[c + 1], q[n - 1] ? p.insertAfter(new CKEDITOR.dom.element(q[n - 1])) : (new CKEDITOR.dom.element(f.$.rows[c + 1])).append(p, 1))); n += p.$.colSpan - 1
                        } d.push(m)
                    } g = f.$.rows; e[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); h = new CKEDITOR.dom.element(g[k + 1] || (0 < h ? g[h - 1] : null) || f.$.parentNode); for (c = d.length; 0 <= c; c--)b(d[c]); return f.$.parentNode ? h : (e[0].select(), null)
                } c instanceof CKEDITOR.dom.element && (f = c.getAscendant("table"), 1 == f.$.rows.length ? f.remove() : c.remove()); return null
            } function c(a) {
                for (var b =
                    a.getParent().$.cells, c = 0, e = 0; e < b.length; e++) { var d = b[e], c = c + d.colSpan; if (d == a.$) break } return c - 1
            } function h(a, b) { for (var e = b ? Infinity : 0, d = 0; d < a.length; d++) { var f = c(a[d]); if (b ? f < e : f > e) e = f } return e } function l(b, c) {
                for (var e = w(b) ? b : a(b), d = e[0].getAscendant("table"), f = h(e, 1), e = h(e), g = c ? f : e, k = CKEDITOR.tools.buildTableMap(d), d = [], f = [], e = [], l = k.length, m = 0; m < l; m++)d.push(k[m][g]), f.push(c ? k[m][g - 1] : k[m][g + 1]); for (m = 0; m < l; m++)d[m] && (1 < d[m].colSpan && f[m] == d[m] ? (k = d[m], k.colSpan += 1) : (g = new CKEDITOR.dom.element(d[m]),
                    k = g.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[c ? "insertBefore" : "insertAfter"].call(k, g), e.push(k), k = k.$), m += k.rowSpan - 1); return e
            } function k(b) {
                function c(a) {
                    var b, e, d; b = a.getRanges(); if (1 !== b.length) return a; b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a; e = b.endContainer; d = e.getName().toLowerCase(); if ("td" !== d && "th" !== d) return a; for ((d = e.getPrevious()) || (d = e.getParent().getPrevious().getLast()); d.type !== CKEDITOR.NODE_TEXT && "br" !== d.getName().toLowerCase();)if (d = d.getLast(), !d) return a;
                    b.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); return b.select()
                } CKEDITOR.env.webkit && !b.isFake && (b = c(b)); var e = b.getRanges(), d = a(b), f = d[0], g = d[d.length - 1], d = f.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(d), k, l, m = []; b.reset(); var n = 0; for (b = h.length; n < b; n++)for (var p = 0, q = h[n].length; p < q; p++)void 0 === k && h[n][p] == f.$ && (k = p), h[n][p] == g.$ && (l = p); for (n = k; n <= l; n++)for (p = 0; p < h.length; p++)g = h[p], f = new CKEDITOR.dom.element(d.$.rows[p]), g = new CKEDITOR.dom.element(g[n]), g.$ && (1 == g.$.colSpan ? g.remove() : --g.$.colSpan,
                    p += g.$.rowSpan - 1, f.$.cells.length || m.push(f)); k = h[0].length - 1 > l ? new CKEDITOR.dom.element(h[0][l + 1]) : k && -1 !== h[0][k - 1].cellIndex ? new CKEDITOR.dom.element(h[0][k - 1]) : new CKEDITOR.dom.element(d.$.parentNode); m.length == b && (e[0].moveToPosition(d, CKEDITOR.POSITION_AFTER_END), e[0].select(), d.remove()); return k
            } function f(a, b) { var c = a.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (c) { var e = c.clone(); e.appendBogus(); b ? e.insertBefore(c) : e.insertAfter(c) } } function e(b) {
                if (b instanceof CKEDITOR.dom.selection) {
                    var c =
                        b.getRanges(), d = a(b), f = d[0] && d[0].getAscendant("table"), g; a: { var h = 0; g = d.length - 1; for (var k = {}, l, n; l = d[h++];)CKEDITOR.dom.element.setMarker(k, l, "delete_cell", !0); for (h = 0; l = d[h++];)if ((n = l.getPrevious()) && !n.getCustomData("delete_cell") || (n = l.getNext()) && !n.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(k); g = n; break a } CKEDITOR.dom.element.clearAllMarkers(k); h = d[0].getParent(); (h = h.getPrevious()) ? g = h.getLast() : (h = d[g].getParent(), g = (h = h.getNext()) ? h.getChild(0) : null) } b.reset(); for (b =
                            d.length - 1; 0 <= b; b--)e(d[b]); g ? m(g, !0) : f && (c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), c[0].select(), f.remove())
                } else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
            } function m(a, b) { var c = a.getDocument(), e = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (e.focus(), c.focus()); c = new CKEDITOR.dom.range(c); c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0)); c.select(!0) } function g(a, b, c) {
                a = a[b];
                if ("undefined" == typeof c) return a; for (b = 0; a && b < a.length; b++) { if (c.is && a[b] == c.$) return b; if (b == c) return new CKEDITOR.dom.element(a[b]) } return c.is ? -1 : null
            } function n(b, c, e) {
                var d = a(b), f; if ((c ? 1 != d.length : 2 > d.length) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return !1; var h; b = d[0]; f = b.getAscendant("table"); var k = CKEDITOR.tools.buildTableMap(f), l = k.length, m = k[0].length, n = b.getParent().$.rowIndex, p = g(k, n, b); if (c) {
                    var q; try {
                        var r = parseInt(b.getAttribute("rowspan"), 10) || 1;
                        h = parseInt(b.getAttribute("colspan"), 10) || 1; q = k["up" == c ? n - r : "down" == c ? n + r : n]["left" == c ? p - h : "right" == c ? p + h : p]
                    } catch (w) { return !1 } if (!q || b.$ == q) return !1; d["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(q))
                } c = b.getDocument(); var J = n, r = q = 0, K = !e && new CKEDITOR.dom.documentFragment(c), E = 0; for (c = 0; c < d.length; c++) {
                    h = d[c]; var R = h.getParent(), O = h.getFirst(), S = h.$.colSpan, L = h.$.rowSpan, R = R.$.rowIndex, V = g(k, R, h), E = E + S * L, r = Math.max(r, V - p + S); q = Math.max(q, R - n + L); e || (S = h, (L = S.getBogus()) && L.remove(),
                        S.trim(), h.getChildren().count() && (R == J || !O || O.isBlockBoundary && O.isBlockBoundary({ br: 1 }) || (J = K.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !J || J.is && J.is("br") || K.append("br")), h.moveChildren(K)), c ? h.remove() : h.setHtml("")); J = R
                } if (e) return q * r == E; K.moveChildren(b); b.appendBogus(); r >= m ? b.removeAttribute("rowSpan") : b.$.rowSpan = q; q >= l ? b.removeAttribute("colSpan") : b.$.colSpan = r; e = new CKEDITOR.dom.nodeList(f.$.rows); d = e.count(); for (c = d - 1; 0 <= c; c--)f = e.getItem(c), f.$.cells.length || (f.remove(), d++); return b
            }
            function p(b, c) {
                var e = a(b); if (1 < e.length) return !1; if (c) return !0; var e = e[0], d = e.getParent(), f = d.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(f), k = d.$.rowIndex, l = g(h, k, e), m = e.$.rowSpan, n; if (1 < m) { n = Math.ceil(m / 2); for (var m = Math.floor(m / 2), d = k + n, f = new CKEDITOR.dom.element(f.$.rows[d]), h = g(h, d), p, d = e.clone(), k = 0; k < h.length; k++)if (p = h[k], p.parentNode == f.$ && k > l) { d.insertBefore(new CKEDITOR.dom.element(p)); break } else p = null; p || f.append(d) } else for (m = n = 1, f = d.clone(), f.insertAfter(d), f.append(d = e.clone()),
                    p = g(h, k), l = 0; l < p.length; l++)p[l].rowSpan++; d.appendBogus(); e.$.rowSpan = n; d.$.rowSpan = m; 1 == n && e.removeAttribute("rowSpan"); 1 == m && d.removeAttribute("rowSpan"); return d
            } function q(b, c) {
                var e = a(b); if (1 < e.length) return !1; if (c) return !0; var e = e[0], d = e.getParent(), f = d.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(f), h = g(f, d.$.rowIndex, e), k = e.$.colSpan; if (1 < k) d = Math.ceil(k / 2), k = Math.floor(k / 2); else {
                    for (var k = d = 1, l = [], m = 0; m < f.length; m++) { var n = f[m]; l.push(n[h]); 1 < n[h].rowSpan && (m += n[h].rowSpan - 1) } for (f =
                        0; f < l.length; f++)l[f].colSpan++
                } f = e.clone(); f.insertAfter(e); f.appendBogus(); e.$.colSpan = d; f.$.colSpan = k; 1 == d && e.removeAttribute("colSpan"); 1 == k && f.removeAttribute("colSpan"); return f
            } var r = /^(?:td|th)$/, w = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools = {
                requires: "table,dialog,contextmenu", init: function (c) {
                    function g(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function h(a,
                        b) { var e = c.addCommand(a, b); c.addFeature(e) } var r = c.lang.table, w = CKEDITOR.tools.style.parse; h("cellProperties", new CKEDITOR.dialogCommand("cellProperties", g({
                            allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: "table", contentTransformations: [[{ element: "td", left: function (a) { return a.styles.background && w.background(a.styles.background).color }, right: function (a) { a.styles["background-color"] = w.background(a.styles.background).color } },
                            { element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign }, right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign } }], [{ element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) { CKEDITOR.tools.array.forEach(a.children, function (b) { b.name in { td: 1, th: 1 } && (b.attributes["cke-row-height"] = a.styles.height) }); delete a.styles.height } }], [{
                                element: "td", check: "td{height}", left: function (a) {
                                    return (a =
                                        a.attributes) && a["cke-row-height"]
                                }, right: function (a) { a.styles.height = a.attributes["cke-row-height"]; delete a.attributes["cke-row-height"] }
                            }]]
                        }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); h("rowDelete", g({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = b(a)) && m(a) } })); h("rowInsertBefore", g({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); d(b, !0) } })); h("rowInsertAfter", g({
                            requiredContent: "table", exec: function (b) {
                                b = b.getSelection(); b = a(b);
                                d(b)
                            }
                        })); h("columnDelete", g({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = k(a)) && m(a, !0) } })); h("columnInsertBefore", g({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); l(b, !0) } })); h("columnInsertAfter", g({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); l(b) } })); h("cellDelete", g({ requiredContent: "table", exec: function (a) { a = a.getSelection(); e(a) } })); h("cellMerge", g({
                            allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a,
                                b) { b.cell = n(a.getSelection()); m(b.cell, !0) }
                        })); h("cellMergeRight", g({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "right"); m(b.cell, !0) } })); h("cellMergeDown", g({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "down"); m(b.cell, !0) } })); h("cellVerticalSplit", g({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) { m(q(a.getSelection())) } })); h("cellHorizontalSplit",
                            g({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { m(p(a.getSelection())) } })); h("cellInsertBefore", g({ requiredContent: "table", exec: function (a) { a = a.getSelection(); f(a, !0) } })); h("cellInsertAfter", g({ requiredContent: "table", exec: function (a) { a = a.getSelection(); f(a) } })); c.addMenuItems && c.addMenuItems({
                                tablecell: {
                                    label: r.cell.menu, group: "tablecell", order: 1, getItems: function () {
                                        var b = c.getSelection(), e = a(b); return {
                                            tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                            tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: n(b, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: n(b, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: n(b, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: q(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal: p(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_properties: 0 < e.length ? CKEDITOR.TRISTATE_OFF :
                                                CKEDITOR.TRISTATE_DISABLED
                                        }
                                    }
                                }, tablecell_insertBefore: { label: r.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 }, tablecell_insertAfter: { label: r.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: r.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: { label: r.cell.merge, group: "tablecell", command: "cellMerge", order: 16 }, tablecell_merge_right: {
                                    label: r.cell.mergeRight, group: "tablecell", command: "cellMergeRight",
                                    order: 17
                                }, tablecell_merge_down: { label: r.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: { label: r.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: r.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: { label: r.cell.title, group: "tablecellproperties", command: "cellProperties", order: 21 }, tablerow: {
                                    label: r.row.menu, group: "tablerow", order: 1, getItems: function () {
                                        return {
                                            tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                            tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF
                                        }
                                    }
                                }, tablerow_insertBefore: { label: r.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: r.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: { label: r.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 }, tablecolumn: {
                                    label: r.column.menu, group: "tablecolumn", order: 1, getItems: function () {
                                        return {
                                            tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                            tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                                        }
                                    }
                                }, tablecolumn_insertBefore: { label: r.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: r.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: { label: r.column.deleteColumn, group: "tablecolumn", command: "columnDelete", order: 15 }
                            }); c.contextMenu && c.contextMenu.addListener(function (a, b, c) {
                                return (a = c.contains({ td: 1, th: 1 },
                                    1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null
                            })
                }, getCellColIndex: c, insertRow: d, insertColumn: l, getSelectedCells: a
            }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
        }(), CKEDITOR.tools.buildTableMap = function (a, d, b, c, h) {
            a = a.$.rows; b = b || 0; c = "number" === typeof c ? c : a.length - 1; h = "number" === typeof h ? h : -1; var l = -1, k = []; for (d = d || 0; d <= c; d++) {
                l++; !k[l] && (k[l] = []); for (var f = -1, e = b; e <= (-1 === h ? a[d].cells.length - 1 : h); e++) {
                    var m =
                        a[d].cells[e]; if (!m) break; for (f++; k[l][f];)f++; for (var g = isNaN(m.colSpan) ? 1 : m.colSpan, m = isNaN(m.rowSpan) ? 1 : m.rowSpan, n = 0; n < m && !(d + n > c); n++) { k[l + n] || (k[l + n] = []); for (var p = 0; p < g; p++)k[l + n][f + p] = a[d].cells[e] } f += g - 1; if (-1 !== h && f >= h) break
                }
            } return k
        }, function () {
            function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function d(a, b) {
                var c = a.getAscendant("table"), e = b.getAscendant("table"), d = CKEDITOR.tools.buildTableMap(c), f = m(a), g = m(b), h = [], k = {}, l, n; c.contains(e) && (b = b.getAscendant({
                    td: 1,
                    th: 1
                }), g = m(b)); f > g && (c = f, f = g, g = c, c = a, a = b, b = c); for (c = 0; c < d[f].length; c++)if (a.$ === d[f][c]) { l = c; break } for (c = 0; c < d[g].length; c++)if (b.$ === d[g][c]) { n = c; break } l > n && (c = l, l = n, n = c); for (c = f; c <= g; c++)for (f = l; f <= n; f++)e = new CKEDITOR.dom.element(d[c][f]), e.$ && !e.getCustomData("selected_cell") && (h.push(e), CKEDITOR.dom.element.setMarker(k, e, "selected_cell", !0)); CKEDITOR.dom.element.clearAllMarkers(k); return h
            } function b(a) {
                if (a) return a = a.clone(), a.enlarge(CKEDITOR.ENLARGE_ELEMENT), (a = a.getEnclosedNode()) && a.is &&
                    a.is(CKEDITOR.dtd.$tableContent)
            } function c(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function h(a, b) {
                var c = a.editable().find(".cke_table-faked-selection"), e; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor"); for (e = 0; e < c.count(); e++)c.getItem(e).removeClass("cke_table-faked-selection"); 0 < c.count() && c.getItem(0).getAscendant("table").data("cke-table-faked-selection-table", !1); a.fire("unlockSnapshot"); b && (u = { active: !1 },
                    a.getSelection().isInTable() && a.getSelection().reset())
            } function l(a, b) { var c = [], e, d; for (d = 0; d < b.length; d++)e = a.createRange(), e.setStartBefore(b[d]), e.setEndAfter(b[d]), c.push(e); a.getSelection().selectRanges(c) } function k(a) { var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() || (b = d(b.getItem(0), b.getItem(b.count() - 1)), l(a, b)) } function f(b, c, e) {
                var f = t(b.getSelection(!0)); c = c.is("table") ? null : c; var g; (g = u.active && !u.first) && !(g = c) && (g = b.getSelection().getRanges(), g = 1 < f.length || g[0] &&
                    !g[0].collapsed ? !0 : !1); if (g) u.first = c || f[0], u.dirty = c ? !1 : 1 !== f.length; else if (u.active && c && u.first.getAscendant("table").equals(c.getAscendant("table"))) { f = d(u.first, c); if (!u.dirty && 1 === f.length && !a(e.data.getTarget())) return h(b, "mouseup" === e.name); u.dirty = !0; u.last = c; l(b, f) }
            } function e(a) {
                var b = (a = a.editor || a.sender.editor) && a.getSelection(), c = b && b.getRanges() || [], e; if (b && (h(a), b.isInTable() && b.isFake)) {
                    1 === c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (e = c[0]._getTableElement());
                    e = t(b, e); a.fire("lockSnapshot"); for (b = 0; b < e.length; b++)e[b].addClass("cke_table-faked-selection"); 0 < e.length && (a.editable().addClass("cke_table-faked-selection-editor"), e[0].getAscendant("table").data("cke-table-faked-selection-table", "")); a.fire("unlockSnapshot")
                }
            } function m(a) { return a.getAscendant("tr", !0).$.rowIndex } function g(b) {
                function e(a, b) { return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(t) : !1 } function d(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(m.document) }
                function l(a, b, c, f) { return ("mousedown" !== a.name || CKEDITOR.tools.getMouseButton(a) !== CKEDITOR.MOUSE_BUTTON_LEFT && f) && ("mouseup" !== a.name || d(a.data.getTarget()) || e(c, f)) ? !1 : !0 } if (b.data.getTarget().getName && ("mouseup" === b.name || !a(b.data.getTarget()))) {
                    var m = b.editor || b.listenerData.editor, n = m.getSelection(1), p = c(m), q = b.data.getTarget(), r = q && q.getAscendant({ td: 1, th: 1 }, !0), q = q && q.getAscendant("table", !0), t = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; l(b, n, p, q) && h(m, !0); !u.active && "mousedown" ===
                        b.name && CKEDITOR.tools.getMouseButton(b) === CKEDITOR.MOUSE_BUTTON_LEFT && q && (u = { active: !0 }, CKEDITOR.document.on("mouseup", g, null, { editor: m })); (r || q) && f(m, r || q, b); "mouseup" === b.name && (CKEDITOR.tools.getMouseButton(b) === CKEDITOR.MOUSE_BUTTON_LEFT && (d(b.data.getTarget()) || e(p, q)) && k(m), u = { active: !1 }, CKEDITOR.document.removeListener("mouseup", g))
                }
            } function n(a) { var b = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0); b && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault()) } function p(a,
                b) {
                    function c(a) { a.cancel() } var e = a.getSelection(), d = e.createBookmarks(), f = a.document, g = a.createRange(), h = f.getDocumentElement().$, k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, l = a.blockless || CKEDITOR.env.ie ? "span" : "div", m, n, p, q; f.getById("cke_table_copybin") || (m = f.createElement(l), n = f.createElement(l), n.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), m.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right",
                        "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), q = a.on("selectionChange", c, null, null, 0), k && (p = h.scrollTop), g.selectNodeContents(m), g.select(), k && (h.scrollTop = p), setTimeout(function () { n.remove(); e.selectBookmarks(d); q.removeListener(); a.fire("unlockSnapshot"); b && (a.extractSelectedHtml(), a.fire("saveSnapshot")) }, 100))
            } function q(a) { var b = a.editor || a.sender.editor; b.getSelection().isInTable() && p(b, "cut" === a.name) } function r(a) { this._reset(); a && this.setSelectedCells(a) }
            function w(a, b, c) { a.on("beforeCommandExec", function (c) { -1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && (c.data.selectedCells = t(a.getSelection())) }); a.on("afterCommandExec", function (e) { -1 !== CKEDITOR.tools.array.indexOf(b, e.data.name) && c(a, e.data) }) } var u = { active: !1 }, v, t, B, x, y; r.prototype = {}; r.prototype._reset = function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; r.prototype.setSelectedCells = function (a) {
                this._reset(); a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all =
                    a; this.cells.first = a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr")
            }; r.prototype.getTableMap = function () { var a = B(this.cells.first), b; a: { b = this.cells.last; var c = b.getAscendant("table"), e = m(b), c = CKEDITOR.tools.buildTableMap(c), d; for (d = 0; d < c[e].length; d++)if ((new CKEDITOR.dom.element(c[e][d])).equals(b)) { b = d; break a } b = void 0 } return CKEDITOR.tools.buildTableMap(this._getTable(), m(this.rows.first), a, m(this.rows.last), b) }; r.prototype._getTable =
                function () { return this.rows.first.getAscendant("table") }; r.prototype.insertRow = function (a, b, c) { if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var e = this.cells.first.$.cellIndex, d = this.cells.last.$.cellIndex, f = c ? [] : this.cells.all, g, h = 0; h < a; h++)g = x(c ? this.cells.all : f, b), g = CKEDITOR.tools.array.filter(g.find("td, th").toArray(), function (a) { return c ? !0 : a.$.cellIndex >= e && a.$.cellIndex <= d }), f = b ? g.concat(f) : f.concat(g); this.setSelectedCells(f) }; r.prototype.insertColumn = function (a) {
                    function b(a) {
                        a =
                        m(a); return a >= d && a <= f
                    } if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var c = this.cells, e = c.all, d = m(c.first), f = m(c.last), c = 0; c < a; c++)e = e.concat(CKEDITOR.tools.array.filter(y(e), b)); this.setSelectedCells(e)
                }; r.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; r.prototype._arraySortByDOMOrder = function (a) { a.sort(function (a, b) { return a.getPosition(b) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var C = {
                    onPaste: function (a) {
                        function c(a) {
                            return Math.max.apply(null,
                                CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0))
                        } function e(a) { var b = f.createRange(); b.selectNodeContents(a); b.select() } var f = a.editor, g = f.getSelection(), h = t(g), k = this.findTableInPastedContent(f, a.data.dataValue), m = g.isInTable(!0) && this.isBoundarySelection(g), n, p; !h.length || 1 === h.length && !b(g.getRanges()[0]) && !m || m && !k || (h = h[0].getAscendant("table"), n = new r(t(g, h)), f.once("afterPaste", function () {
                            var a; if (p) {
                                a = new CKEDITOR.dom.element(p[0][0]); var b = p[p.length - 1]; a = d(a, new CKEDITOR.dom.element(b[b.length -
                                    1]))
                            } else a = n.cells.all; l(f, a)
                        }), k ? (a.stop(), m ? (n.insertRow(1, 1 === m, !0), g.selectElement(n.rows.first)) : (n.emptyCells(), l(f, n.cells.all)), a = n.getTableMap(), p = CKEDITOR.tools.buildTableMap(k), n.insertRow(p.length - a.length), n.insertColumn(c(p) - c(a)), a = n.getTableMap(), this.pasteTable(n, a, p), f.fire("saveSnapshot"), setTimeout(function () { f.fire("afterPaste") }, 0)) : (e(n.cells.first), f.once("afterPaste", function () { f.fire("lockSnapshot"); n.emptyCells(n.cells.all.slice(1)); l(f, n.cells.all); f.fire("unlockSnapshot") })))
                    },
                    isBoundarySelection: function (a) { a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) { if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2 } return 0 }, findTableInPastedContent: function (a, b) { var c = a.dataProcessor, e = new CKEDITOR.dom.element("body"); c || (c = new CKEDITOR.htmlDataProcessor(a)); e.setHtml(c.toHtml(b), { fixForBody: !1 }); return 1 < e.getChildCount() ? null : e.findOne("table") }, pasteTable: function (a, b, c) {
                        var e, d = B(a.cells.first),
                        f = a._getTable(), g = {}, h, k, l, m; for (l = 0; l < c.length; l++)for (h = new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < c[l].length; m++)if (k = new CKEDITOR.dom.element(c[l][m]), e = b[l] && b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, k && !k.getCustomData("processed")) {
                            if (e && e.getParent()) k.replace(e); else if (0 === m || c[l][m - 1]) (e = 0 !== m ? new CKEDITOR.dom.element(c[l][m - 1]) : null) && h.equals(e.getParent()) ? k.insertAfter(e) : 0 < d ? h.$.cells[d] ? k.insertAfter(new CKEDITOR.dom.element(h.$.cells[d])) : h.append(k) :
                                h.append(k, !0); CKEDITOR.dom.element.setMarker(g, k, "processed", !0)
                        } else k.getCustomData("processed") && e && e.remove(); CKEDITOR.dom.element.clearAllMarkers(g)
                    }
                }; CKEDITOR.plugins.tableselection = {
                    getCellsBetween: d, keyboardIntegration: function (a) {
                        function b(a) { var c = a.getEnclosedNode(); c && c.is({ td: 1, th: 1 }) ? a.getEnclosedNode().setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"), function (a) { a.appendBogus() }) } var c = a.editable(); c.attachListener(c, "keydown", function (a) {
                            function c(b, e) {
                                if (!e.length) return null;
                                var f = a.createRange(), g = CKEDITOR.dom.range.mergeRanges(e); CKEDITOR.tools.array.forEach(g, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var h = g[0].getBoundaryNodes(), k = h.startNode, h = h.endNode; if (k && k.is && k.is(d)) {
                                    for (var l = k.getAscendant("table", !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function (a) { return !k.contains(a) && a.is && a.is("td", "th") }; m && !p(m);)m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l); !m && h && h.is && !h.is("table") && h.getNext() && (m = h.getNext().findOne("td, th"),
                                        n = !0); if (m) f["moveToElementEdit" + (n ? "Start" : "End")](m); else f.setStartBefore(k.getAscendant("table", !0)), f.collapse(!0); g[0].deleteContents(); return [f]
                                } if (k) return f.moveToElementEditablePosition(k), [f]
                            } var e = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }, d = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete d.td; delete d.th; return function (d) {
                                var f = d.data.getKey(), g, h = 37 === f || 38 == f, k, l, m; if (e[f] && (g = a.getSelection()) && g.isInTable() && g.isFake) if (k = g.getRanges(), l = k[0]._getTableElement(), m = k[k.length -
                                    1]._getTableElement(), d.data.preventDefault(), d.cancel(), 8 < f && 46 > f) k[0].moveToElementEditablePosition(h ? l : m, !h), g.selectRanges([k[0]]); else { for (d = 0; d < k.length; d++)b(k[d]); (d = c(l, k)) ? k = d : k[0].moveToElementEditablePosition(l); g.selectRanges(k); a.fire("saveSnapshot") }
                            }
                        }(a), null, null, -1); c.attachListener(c, "keypress", function (c) {
                            var e = a.getSelection(), d = c.data.$.charCode || 13 === c.data.getKey(), f; if (e && e.isInTable() && e.isFake && d && !(c.data.getKeystroke() & CKEDITOR.CTRL)) {
                                c = e.getRanges(); d = c[0].getEnclosedNode().getAscendant({
                                    td: 1,
                                    th: 1
                                }, !0); for (f = 0; f < c.length; f++)b(c[f]); d && (c[0].moveToElementEditablePosition(d), e.selectRanges([c[0]]))
                            }
                        }, null, null, -1)
                    }, isSupportedEnvironment: !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version)
                }; CKEDITOR.plugins.add("tableselection", {
                    requires: "clipboard,tabletools", onLoad: function () { v = CKEDITOR.plugins.tabletools; t = v.getSelectedCells; B = v.getCellColIndex; x = v.insertRow; y = v.insertColumn; CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css") }, init: function (a) {
                        CKEDITOR.plugins.tableselection.isSupportedEnvironment &&
                        (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function () {
                            var b = a.editable(), c = b.isInline() ? b : a.document, d = { editor: a }; b.attachListener(c, "mousedown", g, null, d); b.attachListener(c, "mousemove", g, null, d); b.attachListener(c, "mouseup", g, null, d); b.attachListener(b, "dragstart", n); b.attachListener(a, "selectionCheck", e); CKEDITOR.plugins.tableselection.keyboardIntegration(a); CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b,
                                "cut", q), b.attachListener(b, "copy", q))
                        }), a.on("paste", C.onPaste, C), w(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, b) { l(a, b.selectedCells) }), w(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, b) { l(a, [b.commandData.cell]) }), w(a, ["cellDelete"], function (a) { h(a, !0) }))
                    }
                })
        }(), function () {
            CKEDITOR.plugins.add("templates", {
                requires: "dialog", init: function (a) {
                    CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path +
                        "dialogs/templates.js")); a.addCommand("templates", new CKEDITOR.dialogCommand("templates")); a.ui.addButton && a.ui.addButton("Templates", { label: a.lang.templates.button, command: "templates", toolbar: "doctools,10" })
                }
            }); var a = {}, d = {}; CKEDITOR.addTemplates = function (b, c) { a[b] = c }; CKEDITOR.getTemplates = function (b) { return a[b] }; CKEDITOR.loadTemplates = function (a, c) { for (var h = [], l = 0, k = a.length; l < k; l++)d[a[l]] || (h.push(a[l]), d[a[l]] = 1); h.length ? CKEDITOR.scriptLoader.load(h, c) : setTimeout(c, 0) }
        }(), CKEDITOR.config.templates_files =
        [CKEDITOR.getUrl("plugins/templates/templates/default.js")], CKEDITOR.config.templates_replaceContent = !0, "use strict", function () {
            var a = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], d = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
                init: function (c) {
                    function e(a) { g.enabled && !1 !== a.data.command.canUndo && g.save() } function d() { g.enabled = c.readOnly ? !1 : "wysiwyg" == c.mode; g.onChange() } var g = c.undoManager = new b(c), h = g.editingHandler = new l(g), k = c.addCommand("undo", {
                        exec: function () {
                            g.undo() && (c.selectionChange(),
                                this.fire("afterUndo"))
                        }, startDisabled: !0, canUndo: !1
                    }), q = c.addCommand("redo", { exec: function () { g.redo() && (c.selectionChange(), this.fire("afterRedo")) }, startDisabled: !0, canUndo: !1 }); c.setKeystroke([[a[0], "undo"], [a[1], "redo"], [a[2], "redo"]]); g.onChange = function () { k.setState(g.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); q.setState(g.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) }; c.on("beforeCommandExec", e); c.on("afterCommandExec", e); c.on("saveSnapshot", function (a) {
                        g.save(a.data &&
                            a.data.contentOnly)
                    }); c.on("contentDom", h.attachListeners, h); c.on("instanceReady", function () { c.fire("saveSnapshot") }); c.on("beforeModeUnload", function () { "wysiwyg" == c.mode && g.save(!0) }); c.on("mode", d); c.on("readOnly", d); c.ui.addButton && (c.ui.addButton("Undo", { label: c.lang.undo.undo, command: "undo", toolbar: "undo,10" }), c.ui.addButton("Redo", { label: c.lang.undo.redo, command: "redo", toolbar: "undo,20" })); c.resetUndo = function () { g.reset(); c.fire("saveSnapshot") }; c.on("updateSnapshot", function () {
                        g.currentImage &&
                        g.update()
                    }); c.on("lockSnapshot", function (a) { a = a.data; g.lock(a && a.dontUpdate, a && a.forceUpdate) }); c.on("unlockSnapshot", g.unlock, g)
                }
            }); CKEDITOR.plugins.undo = {}; var b = CKEDITOR.plugins.undo.UndoManager = function (a) { this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit = 25; this.editor = a; this.reset() }; b.prototype = {
                type: function (a, c) {
                    var d = b.getKeyGroup(a), g = this.strokesRecorded[d] + 1; c = c || g >= this.strokesLimit; this.typing || (this.hasUndo =
                        this.typing = !0, this.hasRedo = !1, this.onChange()); c ? (g = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[d] = g; this.previousKeyGroup = d
                }, keyGroupChanged: function (a) { return b.getKeyGroup(a) != this.previousKeyGroup }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () { this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup = -1 }, refreshState: function () {
                    this.hasUndo =
                    !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange()
                }, save: function (a, b, d) {
                    var g = this.editor; if (this.locked || "ready" != g.status || "wysiwyg" != g.mode) return !1; var h = g.editable(); if (!h || "ready" != h.status) return !1; h = this.snapshots; b || (b = new c(g)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== d && g.fire("change"); h.splice(this.index + 1, h.length - this.index - 1); h.length ==
                        this.limit && h.shift(); this.index = h.push(b) - 1; this.currentImage = b; !1 !== d && this.refreshState(); return !0
                }, restoreImage: function (a) {
                    var b = this.editor, c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents); a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState();
                    b.fire("change")
                }, getNextImage: function (a) { var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; 0 <= d; d--) { if (a = b[d], !c.equalsContent(a)) return a.index = d, a } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a)) return a.index = d, a; return null }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () { if (this.undoable()) { this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 },
                redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) { if (!this.locked) { a || (a = new c(this.editor)); for (var b = this.index, d = this.snapshots; 0 < b && this.currentImage.equalsContent(d[b - 1]);)--b; d.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a } }, updateSelection: function (a) {
                    if (!this.snapshots.length) return !1; var b = this.snapshots, c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ?
                        (this.currentImage = b[b.length - 1] = a, !0) : !1
                }, lock: function (a, b) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { var d = null; if (b) d = !0; else { var g = new c(this.editor, !0); this.currentImage && this.currentImage.equalsContent(g) && (d = g) } this.locked = { update: d, level: 1 } } }, unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { var b = new c(this.editor, !0); a.equalsContent(b) || this.update() } } }
            }; b.navigationKeyCodes =
                { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; b.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; b.isNavigationKey = function (a) { return !!b.navigationKeyCodes[a] }; b.getKeyGroup = function (a) { var c = b.keyGroups; return d[a] ? c.FUNCTIONAL : c.PRINTABLE }; b.getOppositeKeyGroup = function (a) { var c = b.keyGroups; return a == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL }; b.ieFunctionalKeysBug = function (a) { return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL }; var c = CKEDITOR.plugins.undo.Image = function (a, b) {
                    this.editor = a; a.fire("beforeUndoImage");
                    var c = a.getSnapshot(); CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, "")); this.contents = c; b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0)); a.fire("afterUndoImage")
                }, h = /\b(?:href|src|name)="[^"]*?"/gi; c.prototype = {
                    equalsContent: function (a) { var b = this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(h, ""), a = a.replace(h, "")); return b != a ? !1 : !0 }, equalsSelection: function (a) {
                        var b = this.bookmarks; a = a.bookmarks; if (b || a) {
                            if (!b ||
                                !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) { var d = b[c], h = a[c]; if (d.startOffset != h.startOffset || d.endOffset != h.endOffset || !CKEDITOR.tools.arrayCompare(d.start, h.start) || !CKEDITOR.tools.arrayCompare(d.end, h.end)) return !1 }
                        } return !0
                    }
                }; var l = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new k; this.lastKeydownImage = null }; l.prototype = {
                    onKeydown: function (d) {
                        var e = d.data.getKey(); if (229 !== e) if (-1 < CKEDITOR.tools.indexOf(a,
                            d.data.getKeystroke())) d.data.preventDefault(); else if (this.keyEventsStack.cleanUp(d), d = this.undoManager, this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e), this.lastKeydownImage = new c(d.editor), b.isNavigationKey(e) || this.undoManager.keyGroupChanged(e)) if (d.strokesRecorded[0] || d.strokesRecorded[1]) d.save(!1, this.lastKeydownImage, !1), d.resetType()
                    }, onInput: function () {
                        if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else {
                            var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0));
                            this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
                        }
                    }, onKeyup: function (a) { var e = this.undoManager; a = a.data.getKey(); var d = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a); if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new c(e.editor, !0)))) if (0 < d) e.type(a); else if (b.isNavigationKey(a)) this.onNavigationKey(!0) },
                    onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new c(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () { this.ignoreInputEvent = !1 }, attachListeners: function () {
                        var a = this.undoManager.editor, c = a.editable(), d = this; c.attachListener(c, "keydown", function (a) { d.onKeydown(a); if (b.ieFunctionalKeysBug(a.data.getKey())) d.onInput() }, null, null, 999); c.attachListener(c, CKEDITOR.env.ie ? "keypress" :
                            "input", d.onInput, d, null, 999); c.attachListener(c, "keyup", d.onKeyup, d, null, 999); c.attachListener(c, "paste", d.ignoreInputEventListener, d, null, 999); c.attachListener(c, "drop", d.ignoreInputEventListener, d, null, 999); a.on("afterPaste", d.activateInputEventListener, d, null, 999); c.attachListener(c.isInline() ? c : a.document.getDocumentElement(), "click", function () { d.onNavigationKey() }, null, null, 999); c.attachListener(this.undoManager.editor, "blur", function () { d.keyEventsStack.remove(9) }, null, null, 999)
                    }
                }; var k = CKEDITOR.plugins.undo.KeyEventsStack =
                    function () { this.stack = [] }; k.prototype = {
                        push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) { if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a) return b; return -1 }, getLast: function (a) { a = this.getLastIndex(a); return -1 != a ? this.stack[a] : null }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) { a = this.getLastIndex(a); -1 != a && this.stack.splice(a, 1) }, resetInputs: function (a) {
                            if ("number" ==
                                typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0
                        }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
                    }
        }(), "use strict", function () {
            function a(a, b) {
                CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, b, !0); this.inline = this.editable.isInline(); this.inline ||
                    (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"]
            } function d(a, b) { CKEDITOR.tools.extend(this, b, { editor: a }, !0) } function b(a, b) {
                var c = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: c, inline: c.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() }, b, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var d = CKEDITOR.tools.bind(this.queryViewport, this),
                    f = CKEDITOR.tools.bind(this.hideVisible, this), k = CKEDITOR.tools.bind(this.removeAll, this); c.attachListener(this.winTop, "resize", d); c.attachListener(this.winTop, "scroll", d); c.attachListener(this.winTop, "resize", f); c.attachListener(this.win, "scroll", f); c.attachListener(this.inline ? c : this.frame, "mouseout", function (a) {
                        var b = a.data.$.clientX; a = a.data.$.clientY; this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width ||
                            0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                    }, this); c.attachListener(a, "resize", d); c.attachListener(a, "mode", k); a.on("destroy", k); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                        lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, l, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                            h, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, h, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                    })
            } function c(a) { var b; if (b = a && a.type == CKEDITOR.NODE_ELEMENT) b = !(k[a.getComputedStyle("float")] || k[a.getAttribute("align")]); return b && !f[a.getComputedStyle("position")] } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE =
                1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; a.prototype = {
                    start: function (a) {
                        var b = this, c = this.editor, d = this.doc, f, h, k, l, u = CKEDITOR.tools.eventsBuffer(50, function () { c.readOnly || "wysiwyg" != c.mode || (b.relations = {}, (h = d.$.elementFromPoint(k, l)) && h.nodeType && (f = new CKEDITOR.dom.element(h), b.traverseSearch(f), isNaN(k + l) || b.pixelSearch(f, k, l), a && a(b.relations, k, l))) }); this.listener = this.editable.attachListener(this.target, "mousemove", function (a) { k = a.data.$.clientX; l = a.data.$.clientY; u.input() });
                        this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { u.reset() })
                    }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () { var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (b) { var c = this.editor.createRange(); c.moveToPosition(this.relations[b.uid].element, a[b.type]); return c } }(), store: function () {
                        function a(b,
                            c, d) { var e = b.getUniqueId(); e in d ? d[e].type |= c : d[e] = { element: b, type: c } } return function (b, d) { var f; d & CKEDITOR.LINEUTILS_AFTER && c(f = b.getNext()) && f.isVisible() && (a(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), d ^= CKEDITOR.LINEUTILS_AFTER); d & CKEDITOR.LINEUTILS_INSIDE && c(f = b.getFirst()) && f.isVisible() && (a(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), d ^= CKEDITOR.LINEUTILS_INSIDE); a(b, d, this.relations) }
                    }(), traverseSearch: function (a) {
                        var b, d, f; do if (f = a.$["data-cke-expando"], !(f && f in this.relations)) {
                            if (a.equals(this.editable)) break;
                            if (c(a)) for (b in this.lookups) (d = this.lookups[b](a)) && this.store(a, d)
                        } while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
                    }, pixelSearch: function () {
                        function a(d, e, f, h, k) { for (var l = 0, u; k(f);) { f += h; if (25 == ++l) break; if (u = this.doc.$.elementFromPoint(e, f)) if (u == d) l = 0; else if (b(d, u) && (l = 0, c(u = new CKEDITOR.dom.element(u)))) return u } } var b = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, b) { return a.contains(b) } : function (a, b) {
                            return !!(a.compareDocumentPosition(b) &
                                16)
                        }; return function (b, d, f) { var h = this.win.getViewPaneSize().height, k = a.call(this, b.$, d, f, -1, function (a) { return 0 < a }); d = a.call(this, b.$, d, f, 1, function (a) { return a < h }); if (k) for (this.traverseSearch(k); !k.getParent().equals(b);)k = k.getParent(); if (d) for (this.traverseSearch(d); !d.getParent().equals(b);)d = d.getParent(); for (; k || d;) { k && (k = k.getNext(c)); if (!k || k.equals(d)) break; this.traverseSearch(k); d && (d = d.getPrevious(c)); if (!d || d.equals(k)) break; this.traverseSearch(d) } }
                    }(), greedySearch: function () {
                        this.relations =
                        {}; for (var a = this.editable.getElementsByTag("*"), b = 0, d, f, h; d = a.getItem(b++);)if (!d.equals(this.editable) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasAttribute("contenteditable") || !d.isReadOnly()) && c(d) && d.isVisible()) for (h in this.lookups) (f = this.lookups[h](d)) && this.store(d, f); return this.relations
                    }
                }; d.prototype = {
                    locate: function () {
                        function a(b, d) {
                            var e = b.element[d === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return e && c(e) ? (b.siblingRect = e.getClientRect(), d == CKEDITOR.LINEUTILS_BEFORE ? (b.siblingRect.bottom +
                                b.elementRect.top) / 2 : (b.elementRect.bottom + b.siblingRect.top) / 2) : d == CKEDITOR.LINEUTILS_BEFORE ? b.elementRect.top : b.elementRect.bottom
                        } return function (b) {
                            var c; this.locations = {}; for (var d in b) c = b[d], c.elementRect = c.element.getClientRect(), c.type & CKEDITOR.LINEUTILS_BEFORE && this.store(d, CKEDITOR.LINEUTILS_BEFORE, a(c, CKEDITOR.LINEUTILS_BEFORE)), c.type & CKEDITOR.LINEUTILS_AFTER && this.store(d, CKEDITOR.LINEUTILS_AFTER, a(c, CKEDITOR.LINEUTILS_AFTER)), c.type & CKEDITOR.LINEUTILS_INSIDE && this.store(d, CKEDITOR.LINEUTILS_INSIDE,
                                (c.elementRect.top + c.elementRect.bottom) / 2); return this.locations
                        }
                    }(), sort: function () { var a, b, c, d; return function (f, h) { a = this.locations; b = []; for (var k in a) for (var l in a[k]) if (c = Math.abs(f - a[k][l]), b.length) { for (d = 0; d < b.length; d++)if (c < b[d].dist) { b.splice(d, 0, { uid: +k, type: l, dist: c }); break } d == b.length && b.push({ uid: +k, type: l, dist: c }) } else b.push({ uid: +k, type: l, dist: c }); return "undefined" != typeof h ? b.slice(0, h) : b } }(), store: function (a, b, c) {
                        this.locations[a] || (this.locations[a] = {}); this.locations[a][b] =
                            c
                    }
                }; var h = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, l = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; b.prototype = {
                    removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) { var b = a.getUniqueId(); a.hide(); this.hidden[b] = a; delete this.visible[b] }, showLine: function (a) {
                        var b =
                            a.getUniqueId(); a.show(); this.visible[b] = a; delete this.hidden[b]
                    }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, b) {
                        var c, d, f; if (c = this.getStyle(a.uid, a.type)) {
                            for (f in this.visible) if (this.visible[f].getCustomData("hash") !== this.hash) { d = this.visible[f]; break } if (!d) for (f in this.hidden) if (this.hidden[f].getCustomData("hash") !== this.hash) { this.showLine(d = this.hidden[f]); break } d || this.showLine(d = this.addLine()); d.setCustomData("hash", this.hash);
                            this.visible[d.getUniqueId()] = d; d.setStyles(c); b && b(d)
                        }
                    }, getStyle: function (a, b) {
                        var c = this.relations[a], d = this.locations[a][b], f = {}; f.width = c.siblingRect ? Math.max(c.siblingRect.width, c.elementRect.width) : c.elementRect.width; f.top = this.inline ? d + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + d; if (f.top - this.winTopScroll.y < this.rect.top || f.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ? f.left = c.elementRect.left - this.rect.relativeX : (0 < c.elementRect.left ? f.left =
                            this.rect.left + c.elementRect.left : (f.width += c.elementRect.left, f.left = this.rect.left), 0 < (c = f.left + f.width - (this.rect.left + this.winPane.width)) && (f.width -= c)); f.left += this.winTopScroll.x; for (var h in f) f[h] = CKEDITOR.tools.cssLength(f[h]); return f
                    }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, b) { this.relations = a; this.locations = b; this.hash = Math.random() }, cleanup: function () {
                        var a, b; for (b in this.visible) a = this.visible[b],
                            a.getCustomData("hash") !== this.hash && this.hideLine(a)
                    }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                        a = a.getClientRect(); var b = this.container.getDocumentPosition(), c = this.container.getComputedStyle("position"); a.relativeX = a.relativeY = 0; "static" != c && (a.relativeY = b.y, a.relativeX = b.x, a.top -= a.relativeY,
                            a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
                    }
                }; var k = { left: 1, right: 1, center: 1 }, f = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: a, locator: d, liner: b }
        }(), function () {
            function a(a) { return a.getName && !a.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
                init: function (a) {
                    if (CKEDITOR.env.webkit) {
                        var b = CKEDITOR.plugins.widgetselection; a.on("contentDom", function (a) {
                            a = a.editor; var d = a.document, l = a.editable(); l.attachListener(d, "keydown", function (a) {
                                var c =
                                    a.data.$; 65 == a.data.getKey() && (CKEDITOR.env.mac && c.metaKey || !CKEDITOR.env.mac && c.ctrlKey) && CKEDITOR.tools.setTimeout(function () { b.addFillers(l) || b.removeFillers(l) }, 0)
                            }, null, null, -1); a.on("selectionCheck", function (a) { b.removeFillers(a.editor.editable()) }); a.on("paste", function (a) { a.data.dataValue = b.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && b.addSelectAllIntegration(a)
                        })
                    }
                }
            }); CKEDITOR.plugins.widgetselection = {
                startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit",
                fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (d) { var b = d.editor; if (!this.isWholeContentSelected(d) && 0 < d.getChildCount()) { var c = d.getFirst(a), h = d.getLast(a); c && c.type == CKEDITOR.NODE_ELEMENT && !c.isEditable() && (this.startFiller = this.createFiller(), d.append(this.startFiller, 1)); h && h.type == CKEDITOR.NODE_ELEMENT && !h.isEditable() && (this.endFiller = this.createFiller(!0), d.append(this.endFiller, 0)); if (this.hasFiller(d)) return b = b.createRange(), b.selectNodeContents(d), b.select(), !0 } return !1 },
                removeFillers: function (a) { if (this.hasFiller(a) && !this.isWholeContentSelected(a)) { var b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), c = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && b && this.startFiller.equals(b) ? this.removeFiller(this.startFiller, a) : this.startFiller = b; this.endFiller && c && this.endFiller.equals(c) ? this.removeFiller(this.endFiller, a) : this.endFiller = c } }, cleanPasteData: function (a) {
                    a && a.length && (a = a.replace(this.createFillerRegex(),
                        "").replace(this.createFillerRegex(!0), "")); return a
                }, isWholeContentSelected: function (a) { var b = a.editor.getSelection().getRanges()[0]; return !b || b && b.collapsed ? !1 : (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(b && a && b.startContainer && b.endContainer && 0 === b.startOffset && b.endOffset === a.getChildCount() && b.startContainer.equals(a) && b.endContainer.equals(a))) }, hasFiller: function (a) { return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (a) {
                    var b = new CKEDITOR.dom.element(this.fillerTagName);
                    b.setHtml(this.fillerContent); b.setAttribute(this.fillerAttribute, a ? "end" : "start"); b.setAttribute("data-cke-temp", 1); b.setStyles({ display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0, overflow: "hidden" }); return b
                }, removeFiller: function (a, b) {
                    if (a) {
                        var c = b.editor, h = b.editor.getSelection().getRanges()[0].startPath(), l = c.createRange(), k, f; h.contains(a) && (k = a.getHtml(), f = !0); h = "start" == a.getAttribute(this.fillerAttribute); a.remove(); k && 0 < k.length &&
                            k != this.fillerContent ? (b.insertHtmlIntoRange(k, c.getSelection().getRanges()[0]), l.setStartAt(b.getChild(b.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), c.getSelection().selectRanges([l])) : f && (h ? l.setStartAt(b.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : l.setEndAt(b.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), b.editor.getSelection().selectRanges([l]))
                    }
                }, createFillerRegex: function (a) {
                    var b = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi,
                        "\x3e[^\x3c]*\x3c"); return new RegExp((a ? "" : "^") + b + (a ? "$" : ""))
                }, addSelectAllIntegration: function (a) { var b = this; a.editable().attachListener(a, "beforeCommandExec", function (c) { var h = a.editable(); "selectAll" == c.data.name && h && b.addFillers(h) }, null, null, 9999) }
            }
        }(), "use strict", function () {
            function a(a) {
                this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; G(this); A(this); this.on("checkWidgets",
                    k); this.editor.on("contentDomInvalidated", this.checkWidgets, this); z(this); x(this); y(this); B(this); C(this)
            } function d(a, b, c, e, f) {
                var g = a.editor; CKEDITOR.tools.extend(this, e, {
                    editor: g, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({}, "function" == typeof e.defaults ? e.defaults() : e.defaults), dataReady: !1, inited: !1, ready: !1, edit: d.prototype.edit, focusedEditable: null, definition: e, repository: a, draggable: !1 !== e.draggable, _: {
                        downcastFn: e.downcast && "string" == typeof e.downcast ?
                            e.downcasts[e.downcast] : e.downcast
                    }
                }, !0); a.fire("instanceCreated", this); da(this, e); this.init && this.init(); this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); f && this.setData(f); this.data.classes || this.setData("classes", this.getClasses()); this.dataReady = !0; Q(this); this.fire("data", this.data); this.isInited() && g.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
            } function b(a, b, c) {
                CKEDITOR.dom.element.call(this, b.$); this.editor = a;
                this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
            } function c(a, b) {
                a.addCommand(b.name, {
                    exec: function (a, c) {
                        function d() { a.widgets.finalizeCreation(h) } var e = a.widgets.focused; if (e && e.name == b.name) e.edit(); else if (b.insert) b.insert(); else if (b.template) {
                            var e = "function" == typeof b.defaults ?
                                b.defaults() : b.defaults, e = CKEDITOR.dom.element.createFromHtml(b.template.output(e)), f, g = a.widgets.wrapElement(e, b.name), h = new CKEDITOR.dom.documentFragment(g.getDocument()); h.append(g); (f = a.widgets.initOn(e, b, c && c.startupData)) ? (e = f.once("edit", function (b) { if (b.data.dialog) f.once("dialog", function (b) { b = b.data; var c, e; c = b.once("ok", d, null, null, 20); e = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(f, !0) }); b.once("hide", function () { c.removeListener(); e.removeListener() }) }); else d() },
                                    null, null, 999), f.edit(), e.removeListener()) : d()
                        }
                    }, allowedContent: b.allowedContent, requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
                })
            } function h(a, b) {
                function c(a, d) { var e = b.upcast.split(","), f, g; for (g = 0; g < e.length; g++)if (f = e[g], f === a.name) return b.upcasts[f].call(this, a, d); return !1 } function d(b, c, e) {
                    var f = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > e }); 0 > f && (f = a._.upcasts.length); a._.upcasts.splice(f, 0, [CKEDITOR.tools.bind(b,
                        c), c.name, e])
                } var e = b.upcast, f = b.upcastPriority || 10; e && ("string" == typeof e ? d(c, b, f) : d(e, b, f))
            } function l(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } } function k(a) {
                a = a.data; if ("wysiwyg" == this.editor.mode) {
                    var b = this.editor.editable(), c = this.instances, e, f, g, h; if (b) {
                        for (e in c) c[e].isReady() && !b.contains(c[e].wrapper) && this.destroy(c[e], !0); if (a && a.initOnlyNew) c = this.initOnAll(); else {
                            var k = b.find(".cke_widget_wrapper"),
                            c = []; e = 0; for (f = k.count(); e < f; e++) { g = k.getItem(e); if (h = !this.getByElement(g, !0)) { a: { h = w; for (var l = g; l = l.getParent();)if (h(l)) { h = !0; break a } h = !1 } h = !h } h && b.contains(g) && (g.addClass("cke_widget_new"), c.push(this.initOn(g.getFirst(d.isDomWidgetElement)))) }
                        } a && a.focusInited && 1 == c.length && c[0].focus()
                    }
                }
            } function f(a) {
                if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) {
                    var b = e(a), c = m(a), d = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] = 1, b.value = b.value.replace(/^\s/g,
                        "\x26nbsp;"), d = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] = 1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), d = !0); d && (a.attributes["data-cke-widget-white-space"] = 1)
                }
            } function e(a) { return a.find(function (a) { return 3 === a.type }, !0).shift() } function m(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function g(a, b, c) {
                if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d = {}); a = d[b]; a || (a = c.allowedContent ?
                    new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent)); return a
            } function n(a) {
                var b = [], c = a._.upcasts, e = a._.upcastCallbacks; return {
                    toBeWrapped: b, iterator: function (a) {
                        var f, g, h, k, l; if ("data-cke-widget-wrapper" in a.attributes) return (a = a.getFirst(d.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (l = c.length) {
                            if (a.attributes["data-cke-widget-upcasted"]) return !1; k = 0; for (f = e.length; k < f; ++k)if (!1 ===
                                e[k](a)) return; for (k = 0; k < l; ++k)if (f = c[k], h = {}, g = f[0](a, h)) return g instanceof CKEDITOR.htmlParser.element && (a = g), a.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(h)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, f[1]]), !1
                        }
                    }
                }
            } function p(a, b) { return { tabindex: -1, contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "") } } function q(a, b, c) {
                if (a.type == CKEDITOR.NODE_ELEMENT) {
                    var d =
                        CKEDITOR.dtd[a.name]; if (d && !d[c.name]) { var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length || d.remove(); return q(e, b, c) }
                } a.add(c, b)
            } function r(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function w(a) { return a.hasAttribute("data-cke-temp") } function u(a, b, c, d) {
                var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable = b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"),
                    d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"), b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot")
            } function v(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function t(a, b) { return CKEDITOR.tools.trim(b) } function B(a) {
                var b = a.editor,
                c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) { var e = c.data.target; d.isDomDragHandler(e) && (e = a.getByElement(e), c.data.dataTransfer.setData("cke/widget-id", e.id), b.focus(), e.focus()) }); b.on("drop", function (c) {
                    var d = c.data.dataTransfer, e = d.getData("cke/widget-id"), f = d.getTransferType(b), d = b.createRange(); "" !== e && f === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c.cancel() : "" !== e && f == CKEDITOR.DATA_TRANSFER_INTERNAL && (e = a.instances[e]) && (d.setStartBefore(e.wrapper), d.setEndAfter(e.wrapper), c.data.dragRange =
                        d, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, c.data.dataTransfer.setData("text/html", b.editable().getHtmlFromRange(d).getHtml()), b.widgets.destroy(e, !0))
                }); b.on("contentDom", function () {
                    var e = b.editable(); CKEDITOR.tools.extend(a, {
                        finder: new c.finder(b, {
                            lookups: {
                                "default": function (b) {
                                    if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !d.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) {
                                        var c = d.getNestedEditable(e,
                                            b); if (c) { b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent; if (c && b && !c.check(b)) return } return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER
                                    }
                                }
                            }
                        }), locator: new c.locator(b), liner: new c.liner(b, { lineStyle: { cursor: "move !important", "border-top-color": "#666" }, tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" } })
                    }, !0)
                })
            } function x(a) {
                var b = a.editor; b.on("contentDom", function () {
                    var c = b.editable(),
                    e = c.isInline() ? c : b.document, f, g; c.attachListener(e, "mousedown", function (c) { var e = c.data.getTarget(); f = e instanceof CKEDITOR.dom.element ? a.getByElement(e) : null; g = 0; f && (f.inline && e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("data-cke-widget-drag-handler") ? (g = 1, a.focused != f && b.getSelection().removeAllRanges()) : d.getNestedEditable(f.wrapper, e) ? f = null : (c.data.preventDefault(), CKEDITOR.env.ie || f.focus())) }); c.attachListener(e, "mouseup", function () { g && f && f.wrapper && (g = 0, f.focus()) }); CKEDITOR.env.ie && c.attachListener(e,
                        "mouseup", function () { setTimeout(function () { f && f.wrapper && c.contains(f.wrapper) && (f.focus(), f = null) }) })
                }); b.on("doubleclick", function (b) { var c = a.getByElement(b.data.element); if (c && !d.getNestedEditable(c.wrapper, b.data.element)) return c.fire("doubleclick", { element: b.data.element }) }, null, null, 1)
            } function y(a) {
                a.editor.on("key", function (b) {
                    var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(),
                        d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 == c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed && d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e
                }, null, null, 1)
            } function C(a) { function b(c) { a.focused && H(a.focused, "cut" == c.name) } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) }) } function z(a) {
                var b =
                    a.editor; b.on("selectionCheck", function () { a.fire("checkSelection") }); a.on("checkSelection", a.checkSelection, a); b.on("selectionChange", function (c) { var e = (c = d.getNestedEditable(b.editable(), c.data.selection.getStartElement())) && a.getByElement(c), f = a.widgetHoldingFocusedEditable; f ? f === e && f.focusedEditable.equals(c) || (u(a, f, null), e && c && u(a, e, c)) : e && c && u(a, e, c) }); b.on("dataReady", function () { D(a).commit() }); b.on("blur", function () { var b; (b = a.focused) && l(a, b); (b = a.widgetHoldingFocusedEditable) && u(a, b, null) })
            }
            function A(a) {
                var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                    var f = CKEDITOR.tools.getNextNumber(), g = []; b.data.downcastingSessionId = f; c[f] = g; b.data.dataValue.forEach(function (b) {
                        var c = b.attributes, f; if ("data-cke-widget-white-space" in c) { f = e(b); var h = m(b); f.parent.attributes["data-cke-white-space-first"] && (f.value = f.value.replace(/^&nbsp;/g, " ")); h.parent.attributes["data-cke-white-space-last"] && (h.value = h.value.replace(/&nbsp;$/g, " ")) } if ("data-cke-widget-id" in c) {
                            if (c = a.instances[c["data-cke-widget-id"]]) f =
                                b.getFirst(d.isParserWidgetElement), g.push({ wrapper: b, element: f, widget: c, editables: {} }), "1" != f.attributes["data-cke-widget-keep-attr"] && delete f.attributes["data-widget"]
                        } else if ("data-cke-widget-editable" in c) return g[g.length - 1].editables[c["data-cke-widget-editable"]] = b, !1
                    }, CKEDITOR.NODE_ELEMENT, !0)
                }, null, null, 8); b.on("toDataFormat", function (a) {
                    if (a.data.downcastingSessionId) {
                        a = c[a.data.downcastingSessionId]; for (var b, d, e, f, g, h; b = a.shift();) {
                            d = b.widget; e = b.element; f = d._.downcastFn && d._.downcastFn.call(d,
                                e); for (h in b.editables) g = b.editables[h], delete g.attributes.contenteditable, g.setHtml(d.editables[h].getData()); f || (f = e); b.wrapper.replaceWith(f)
                        }
                    }
                }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
            } function G(a) {
                var b = a.editor, c, e; b.on("toHtml", function (b) {
                    var e = n(a), f; for (b.data.dataValue.forEach(e.iterator, CKEDITOR.NODE_ELEMENT, !0); f = e.toBeWrapped.pop();) {
                        var g = f[0], h = g.parent; h.type == CKEDITOR.NODE_ELEMENT && h.attributes["data-cke-widget-wrapper"] && h.replaceWith(g); a.wrapElement(f[0],
                            f[1])
                    } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length && d.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && d.isParserWidgetWrapper(b.data.dataValue.children[0])
                }, null, null, 8); b.on("dataReady", function () {
                    if (e) for (var c = b.editable().find(".cke_widget_wrapper"), f, g, h = 0, k = c.count(); h < k; ++h)f = c.getItem(h), g = f.getFirst(d.isDomWidgetElement), g.type == CKEDITOR.NODE_ELEMENT && g.data("widget") ? (g.replace(f), a.wrapElement(g)) : f.remove(); e = 0; a.destroyAll(!0);
                    a.initOnAll()
                }); b.on("loadSnapshot", function (b) { /data-cke-widget/.test(b.data) && (e = 1); a.destroyAll(!0) }, null, null, 9); b.on("paste", function (a) { a = a.data; a.dataValue = a.dataValue.replace(U, t); a.range && (a = d.getNestedEditable(b.editable(), a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a) }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
            }
            function D(a) {
                var b = a.selected, c = [], d = b.slice(0), e = null; return {
                    select: function (a) { 0 > CKEDITOR.tools.indexOf(b, a) && c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this }, focus: function (a) { e = a; return this }, commit: function () {
                        var f = a.focused !== e, g, h; a.editor.fire("lockSnapshot"); for (f && (g = a.focused) && l(a, g); g = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (h = g.editor.checkDirty(), g.setSelected(!1), !h && g.editor.resetDirty()); f && e && (h = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused",
                            { widget: e }), e.setFocused(!0), !h && a.editor.resetDirty()); for (; g = c.pop();)b.push(g), g.setSelected(!0); a.editor.fire("unlockSnapshot")
                    }
                }
            } function F(a, b, c) { var d = 0; b = J(b); var e = a.data.classes || {}, f; if (b) { for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1); d && a.setData("classes", e) } } function I(a) { a.cancel() } function H(a, b) {
                var c = a.editor, d = c.document, e = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version; if (!d.getById("cke_copybin")) {
                    var f = !c.blockless && !CKEDITOR.env.ie || e ? "div" :
                        "span", e = d.createElement(f), g = d.createElement(f), f = CKEDITOR.env.ie && 9 > CKEDITOR.env.version; g.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); e.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); e.setStyle("ltr" == c.config.contentsLangDirection ? "left" : "right", "-5000px"); var h = c.createRange(); h.setStartBefore(a.wrapper); h.setEndAfter(a.wrapper); e.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + c.editable().getHtmlFromRange(h).getHtml() + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e');
                    c.fire("saveSnapshot"); c.fire("lockSnapshot"); g.append(e); c.editable().append(g); var k = c.on("selectionChange", I, null, null, 0), l = a.repository.on("checkSelection", I, null, null, 0); if (f) var m = d.getDocumentElement().$, n = m.scrollTop; h = c.createRange(); h.selectNodeContents(e); h.select(); f && (m.scrollTop = n); setTimeout(function () { b || a.focus(); g.remove(); k.removeListener(); l.removeListener(); c.fire("unlockSnapshot"); b && (a.repository.del(a), c.fire("saveSnapshot")) }, 100)
                }
            } function J(a) {
                return (a = (a = a.getDefinition().attributes) &&
                    a["class"]) ? a.split(/\s+/) : null
            } function K() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function E() { CKEDITOR.env.gecko && this.editor.unlockSelection(); CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1)) } function R(a) {
                var b = null; a.on("data", function () {
                    var a = this.data.classes, c; if (b != a) {
                        for (c in b) a && a[c] || this.removeClass(c); for (c in a) this.addClass(c);
                        b = a
                    }
                })
            } function O(a) { a.on("data", function () { if (a.wrapper) { var b = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role", "region"); a.wrapper.setAttribute("aria-label", b) } }, null, null, 9999) } function S(a) {
                if (a.draggable) {
                    var b = a.editor, c = a.wrapper.getLast(d.isDomDragHandlerContainer), e; c ? e = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({
                        "class": "cke_reset cke_widget_drag_handler_container",
                        style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png)"
                    }), e = new CKEDITOR.dom.element("img", b.document), e.setAttributes({ "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1", src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation" }), a.inline && e.setAttribute("draggable", "true"), c.append(e), a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() }); a.wrapper.on("mouseenter",
                        a.updateDragHandlerPosition, a); setTimeout(function () { a.on("data", a.updateDragHandlerPosition, a) }, 50); if (!a.inline && (e.on("mousedown", L, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) e.on("dragstart", function (a) { a.data.preventDefault(!0) }); a.dragHandlerContainer = c
                }
            } function L(a) {
                function b() {
                    var c; for (p.reset(); c = h.pop();)c.removeListener(); var d = k; c = a.sender; var e = this.repository.finder, f = this.repository.liner, g = this.editor, l = this.editor.editable(); CKEDITOR.tools.isEmpty(f.visible) || (d = e.getRange(d[0]),
                        this.focus(), g.fire("drop", { dropRange: d, target: d.startContainer })); l.removeClass("cke_widget_dragging"); f.hideVisible(); g.fire("dragend", { target: c })
                } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                    var c = this.repository.finder, d = this.repository.locator, e = this.repository.liner, f = this.editor, g = f.editable(), h = [], k = [], l, m; this.repository._.draggedWidget = this; var n = c.greedySearch(), p = CKEDITOR.tools.eventsBuffer(50, function () {
                        l = d.locate(n); k = d.sort(m, 1); k.length && (e.prepare(n, l), e.placeLine(k[0]),
                            e.cleanup())
                    }); g.addClass("cke_widget_dragging"); h.push(g.on("mousemove", function (a) { m = a.data.$.clientY; p.input() })); f.fire("dragstart", { target: a.sender }); h.push(f.document.once("mouseup", b, this)); g.isInline() || h.push(CKEDITOR.document.once("mouseup", b, this))
                }
            } function V(a) { var b, c, d = a.editables; a.editables = {}; if (a.editables) for (b in d) c = d[b], a.initEditable(b, "string" == typeof c ? { selector: c } : c) } function Z(a) {
                if (a.mask) {
                    var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img",
                        a.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_mask" }), a.wrapper.append(b)); a.mask = b
                }
            } function X(a) { if (a.parts) { var b = {}, c, d; for (d in a.parts) c = a.wrapper.findOne(a.parts[d]), b[d] = c; a.parts = b } } function da(a, b) {
                P(a); X(a); V(a); Z(a); S(a); R(a); O(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart", function (b) { var c = b.data.getTarget(); d.getNestedEditable(a, c) || a.inline && d.isDomDragHandler(c) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new");
                a.element.addClass("cke_widget_element"); a.on("key", function (b) { b = b.data.keyCode; if (13 == b) a.edit(); else { if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) { H(a, b == CKEDITOR.CTRL + 88); return } if (b in T || CKEDITOR.CTRL & b || CKEDITOR.ALT & b) return } return !1 }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
            } function P(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function Q(a) {
                a.element.data("cke-widget-data",
                    encodeURIComponent(JSON.stringify(a.data)))
            } function M() {
                function a() { } function b(a, c, d) { return d && this.checkElement(a) ? (a = d.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } var c = {}; CKEDITOR.style.addCustomHandler({
                    type: "widget", setup: function (a) { this.widget = a.widget; if (this.group = "string" == typeof a.group ? [a.group] : a.group) { a = this.widget; var b; c[a] || (c[a] = {}); for (var d = 0, e = this.group.length; d < e; d++)b = this.group[d], c[a][b] || (c[a][b] = []), c[a][b].push(this) } }, apply: function (a) {
                        var b; a instanceof
                            CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this))
                    }, remove: function (a) { a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && a.widgets.focused.removeStyle(this) }, removeStylesFromSameGroup: function (a) {
                        var b, d, e = !1; if (!(a instanceof CKEDITOR.editor)) return !1; d = a.elementPath(); if (this.checkApplicable(d, a)) for (var f = 0, g = this.group.length; f < g; f++) {
                            b = c[this.widget][this.group[f]]; for (var h = 0; h <
                                b.length; h++)b[h] !== this && b[h].checkActive(d, a) && (a.widgets.focused.removeStyle(b[h]), e = !0)
                        } return e
                    }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) { return b instanceof CKEDITOR.editor ? this.checkElement(a.lastElement) : !1 }, checkElementMatch: b, checkElementRemovable: b, checkElement: function (a) { return d.isDomWidgetWrapper(a) ? (a = a.getFirst(d.isDomWidgetElement)) && a.data("widget") == this.widget : !1 }, buildPreview: function (a) { return a || this._.definition.name },
                    toAllowedContentRules: function (a) { if (!a) return null; a = a.widgets.registered[this.widget]; var b, c = {}; if (!a) return null; if (a.styleableElements) { b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 }; return c } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null }, getClassesArray: function () { var a = this._.definition.attributes && this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null }, applyToRange: a, removeFromRange: a,
                    applyToObject: a
                })
            } CKEDITOR.plugins.add("widget", {
                requires: "lineutils,clipboard,widgetselection", onLoad: function () {
                    void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid yellow;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid yellow}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #ace}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}"),
                        M())
                }, beforeInit: function (b) { void 0 !== CKEDITOR.document.$.querySelectorAll && (b.widgets = new a(b)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); v(a) } }
            }); a.prototype = {
                MIN_SELECTION_CHECK_INTERVAL: 500, add: function (a, b) {
                    b = CKEDITOR.tools.prototypedCopy(b); b.name = a; b._ = b._ || {}; this.editor.fire("widgetDefinition",
                        b); b.template && (b.template = new CKEDITOR.template(b.template)); c(this.editor, b); h(this, b); return this.registered[a] = b
                }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) }, checkSelection: function () {
                    var a = this.editor.getSelection(), b = a.getSelectedElement(), c = D(this), e; if (b && (e = this.getByElement(b, !0))) return c.focus(e).select(e).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = d.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b));
                    c.commit()
                }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) { if (this.focused === a) { var b = a.editor, c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c]) } a.wrapper.remove(); this.destroy(a, !0) }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && u(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a,
                    b) { var c, d, e = this.instances; if (b && !a) { d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f), !0)) && this.destroy(c) } else for (d in e) c = e[d], this.destroy(c, a) }, finalizeCreation: function (a) { (a = a.getFirst()) && d.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () {
                        function a(c) { return c.is(b) && c.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, c) {
                            if (!b) return null;
                            var d = a(b); if (!c && !d) { var e = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(e) && !(d = a(b))) } return this.instances[d] || null
                        }
                    }(), initOn: function (a, b, c) { b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")]; if (!b) return null; var e = this.wrapElement(a, b.name); return e ? e.hasClass("cke_widget_new") ? (a = new d(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null }, initOnAll: function (a) {
                        a = (a || this.editor.editable()).find(".cke_widget_new");
                        for (var b = [], c, e = a.count(); e--;)(c = this.initOn(a.getItem(e).getFirst(d.isDomWidgetElement))) && b.push(c); return b
                    }, onWidget: function (a) { var b = Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) { var d = this.instances[c]; d.name == a && d.on.apply(d, b) } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) }) }, parseElementClasses: function (a) {
                        if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ?
                            c : null
                    }, wrapElement: function (a, b) {
                        var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                            b = b || a.data("widget"); d = this.registered[b]; if (!d) return null; if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c; a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = r(d, a.getName())) && f(a); c = new CKEDITOR.dom.element(e ? "span" : "div"); c.setAttributes(p(e, b)); c.data("cke-display-name", d.pathName ? d.pathName : a.getName());
                            a.getParent(!0) && c.replace(a); a.appendTo(c)
                        } else if (a instanceof CKEDITOR.htmlParser.element) {
                            b = b || a.attributes["data-widget"]; d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = r(d, a.name)) && f(a); c = new CKEDITOR.htmlParser.element(e ? "span" : "div", p(e, b)); c.attributes["data-cke-display-name"] =
                                d.pathName ? d.pathName : a.name; d = a.parent; var g; d && (g = a.getIndex(), a.remove()); c.add(a); d && q(d, g, c)
                        } return c
                    }, _tests_createEditableFilter: g
            }; CKEDITOR.event.implementOn(a.prototype); d.prototype = {
                addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(d.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { F(this, a, 1) }, checkStyleActive: function (a) { a = J(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                    this.fire("destroy"); if (this.editables) for (var b in this.editables) this.destroyEditable(b,
                        a); a || ("0" == this.element.data("cke-widget-keep-attr") && this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
                }, destroyEditable: function (a, b) {
                    var c = this.editables[a]; c.removeListener("focus", E); c.removeListener("blur", K); this.editor.focusManager.remove(c); b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"),
                        c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
                }, edit: function () {
                    var a = { dialog: this.dialog }, b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) {
                        var c, d; !1 !== b.fire("dialog", a) && (c = a.on("show", function () { a.setupContent(b) }), d = a.on("ok", function () {
                            var c, d = b.on("data", function (a) { c = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b);
                            d.removeListener(); c && (b.fire("data", b.data), b.editor.fire("saveSnapshot"))
                        }), a.once("hide", function () { c.removeListener(); d.removeListener() }))
                    }); return !0
                }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) }, hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, c) {
                    var d = this._findOneNotNested(c.selector); return d && d.is(CKEDITOR.dtd.$editable) ? (d = new b(this.editor, d, { filter: g.call(this.repository, this.name, a, c) }), this.editables[a] =
                        d, d.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": d.enterMode }), d.filter && d.data("cke-filter", d.filter.id), d.addClass("cke_widget_editable"), d.removeClass("cke_widget_editable_focused"), c.pathName && d.data("cke-display-name", c.pathName), this.editor.focusManager.add(d), d.on("focus", E, this), CKEDITOR.env.ie && d.on("blur", K, this), d._.initialSetData = !0, d.setData(d.getHtml()), !0) : !1
                }, _findOneNotNested: function (a) {
                    a = this.wrapper.find(a); for (var b, c, e = 0; e < a.count(); e++)if (b =
                        a.getItem(e), c = b.getAscendant(d.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null
                }, isInited: function () { return !(!this.wrapper || !this.inited) }, isReady: function () { return this.isInited() && this.ready }, focus: function () { var a = this.editor.getSelection(); if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus() }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(d.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) {
                    F(this,
                        a, 0)
                }, setData: function (a, b) { var c = this.data, d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (Q(this), this.fire("data", c)); return this }, setFocused: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused"); this.fire(a ? "focus" : "blur"); return this }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                    var a =
                        this.editor, b = this.element.$, c = this._.dragHandlerOffset, b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px", display: "block" }), a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
                }
            }; CKEDITOR.event.implementOn(d.prototype); d.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : d.isDomNestedEditable(b) ? b : d.getNestedEditable(a, b.getParent()) }; d.isDomDragHandler = function (a) {
                return a.type ==
                    CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler")
            }; d.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; d.isDomNestedEditable = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable") }; d.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; d.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") };
            d.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; d.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] }; d.isParserWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; d.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
                setData: function (a) {
                    this._.initialSetData ||
                    this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this)
                }, getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
            }); var U = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
                T = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; CKEDITOR.plugins.widget = d; d.repository = a; d.nestedEditable = b
        }(), "use strict", function () {
            function a(a) { this.editor = a; this.loaders = [] } function d(a, c, d) {
                var f = a.config.fileTools_defaultFileName; this.editor = a; this.lang = a.lang; "string" === typeof c ? (this.data = c, this.file = b(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = c, this.total = this.file.size, this.loaded = 0); d ? this.fileName = d : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"),
                    f && (a[0] = f), this.fileName = a.join(".")); this.uploaded = 0; this.responseData = this.uploadTotal = null; this.status = "created"; this.abort = function () { this.changeStatus("abort") }
            } function b(a) { var b = a.match(c)[1]; a = a.replace(c, ""); a = atob(a); var d = [], f, e, m, g; for (f = 0; f < a.length; f += 512) { e = a.slice(f, f + 512); m = Array(e.length); for (g = 0; g < e.length; g++)m[g] = e.charCodeAt(g); e = new Uint8Array(m); d.push(e) } return new Blob(d, { type: b }) } CKEDITOR.plugins.add("filetools", {
                beforeInit: function (b) {
                    b.uploadRepository = new a(b); b.on("fileUploadRequest",
                        function (a) { var b = a.data.fileLoader; b.xhr.open("POST", b.uploadUrl, !0); a.data.requestData.upload = { file: b.file, name: b.fileName } }, null, null, 5); b.on("fileUploadRequest", function (a) { var b = a.data.fileLoader, c = new FormData; a = a.data.requestData; for (var d in a) { var h = a[d]; "object" === typeof h && h.file ? c.append(d, h.file, h.name) : c.append(d, h) } c.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()); b.xhr.send(c) }, null, null, 999); b.on("fileUploadResponse", function (a) {
                            var b = a.data.fileLoader, c = b.xhr, d = a.data; try {
                                var h =
                                    JSON.parse(c.responseText); h.error && h.error.message && (d.message = h.error.message); if (h.uploaded) for (var g in h) d[g] = h[g]; else a.cancel()
                            } catch (n) { d.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", { responseText: c.responseText }), a.cancel() }
                        }, null, null, 999)
                }
            }); a.prototype = {
                create: function (a, b) { var c = this.loaders.length, f = new d(this.editor, a, b); f.id = c; this.loaders[c] = f; this.fire("instanceCreated", f); return f }, isFinished: function () {
                    for (var a = 0; a < this.loaders.length; ++a)if (!this.loaders[a].isFinished()) return !1;
                    return !0
                }
            }; d.prototype = {
                loadAndUpload: function (a, b) { var c = this; this.once("loaded", function (d) { d.cancel(); c.once("update", function (a) { a.cancel() }, null, null, 0); c.upload(a, b) }, null, null, 0); this.load() }, load: function () {
                    var a = this, b = this.reader = new FileReader; a.changeStatus("loading"); this.abort = function () { a.reader.abort() }; b.onabort = function () { a.changeStatus("abort") }; b.onerror = function () { a.message = a.lang.filetools.loadError; a.changeStatus("error") }; b.onprogress = function (b) { a.loaded = b.loaded; a.update() };
                    b.onload = function () { a.loaded = a.total; a.data = b.result; a.changeStatus("loaded") }; b.readAsDataURL(this.file)
                }, upload: function (a, b) { var c = b || {}; a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", { fileLoader: this, requestData: c }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error")) }, attachRequestListeners: function () {
                    function a() {
                        "error" != c.status && (c.message = c.lang.filetools.networkError,
                            c.changeStatus("error"))
                    } function b() { "abort" != c.status && c.changeStatus("abort") } var c = this, d = this.xhr; c.abort = function () { d.abort(); b() }; d.onerror = a; d.onabort = b; d.upload ? (d.upload.onprogress = function (a) { a.lengthComputable && (c.uploadTotal || (c.uploadTotal = a.total), c.uploaded = a.loaded, c.update()) }, d.upload.onerror = a, d.upload.onabort = b) : (c.uploadTotal = c.total, c.update()); d.onload = function () {
                        c.update(); if ("abort" != c.status) if (c.uploaded = c.uploadTotal, 200 > d.status || 299 < d.status) c.message = c.lang.filetools["httpError" +
                            d.status], c.message || (c.message = c.lang.filetools.httpError.replace("%1", d.status)), c.changeStatus("error"); else { for (var a = { fileLoader: c }, b = ["message", "fileName", "url"], g = c.editor.fire("fileUploadResponse", a), h = 0; h < b.length; h++) { var l = b[h]; "string" === typeof a[l] && (c[l] = a[l]) } c.responseData = a; delete c.responseData.fileLoader; !1 === g ? c.changeStatus("error") : c.changeStatus("uploaded") }
                    }
                }, changeStatus: function (a) {
                    this.status = a; if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () { };
                    this.fire(a); this.update()
                }, update: function () { this.fire("update") }, isFinished: function () { return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/) }
            }; CKEDITOR.event.implementOn(a.prototype); CKEDITOR.event.implementOn(d.prototype); var c = /^data:(\S*?);base64,/; CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                uploadRepository: a, fileLoader: d, getUploadUrl: function (a, b) {
                    var c = CKEDITOR.tools.capitalize; return b && a[b + "UploadUrl"] ? a[b + "UploadUrl"] : a.uploadUrl ? a.uploadUrl :
                        b && a["filebrowser" + c(b, 1) + "UploadUrl"] ? a["filebrowser" + c(b, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl + "\x26responseType\x3djson" : null
                }, isTypeSupported: function (a, b) { return !!a.type.match(b) }
            })
        }(), function () {
            function a(a, c, d) { this.editor = a; this.notification = null; this._message = new CKEDITOR.template(c); this._singularMessage = d ? new CKEDITOR.template(d) : null; this._tasks = []; this._doneTasks = this._doneWeights = this._totalWeights = 0 } function d(a) {
                this._weight = a || 1;
                this._doneWeight = 0; this._isCanceled = !1
            } CKEDITOR.plugins.add("notificationaggregator", { requires: "notification" }); a.prototype = {
                createTask: function (a) { a = a || {}; var c = !this.notification, d; c && (this.notification = this._createNotification()); d = this._addTask(a); d.on("updated", this._onTaskUpdate, this); d.on("done", this._onTaskDone, this); d.on("canceled", function () { this._removeTask(d) }, this); this.update(); c && this.notification.show(); return d }, update: function () { this._updateNotification(); this.isFinished() && this.fire("finished") },
                getPercentage: function () { return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights }, isFinished: function () { return this.getDoneTaskCount() === this.getTaskCount() }, getTaskCount: function () { return this._tasks.length }, getDoneTaskCount: function () { return this._doneTasks }, _updateNotification: function () { this.notification.update({ message: this._getNotificationMessage(), progress: this.getPercentage() }) }, _getNotificationMessage: function () {
                    var a = this.getTaskCount(), c = {
                        current: this.getDoneTaskCount(), max: a,
                        percentage: Math.round(100 * this.getPercentage())
                    }; return (1 == a && this._singularMessage ? this._singularMessage : this._message).output(c)
                }, _createNotification: function () { return new CKEDITOR.plugins.notification(this.editor, { type: "progress" }) }, _addTask: function (a) { a = new d(a.weight); this._tasks.push(a); this._totalWeights += a._weight; return a }, _removeTask: function (a) {
                    var c = CKEDITOR.tools.indexOf(this._tasks, a); -1 !== c && (a._doneWeight && (this._doneWeights -= a._doneWeight), this._totalWeights -= a._weight, this._tasks.splice(c,
                        1), this.update())
                }, _onTaskUpdate: function (a) { this._doneWeights += a.data; this.update() }, _onTaskDone: function () { this._doneTasks += 1; this.update() }
            }; CKEDITOR.event.implementOn(a.prototype); d.prototype = {
                done: function () { this.update(this._weight) }, update: function (a) { if (!this.isDone() && !this.isCanceled()) { a = Math.min(this._weight, a); var c = a - this._doneWeight; this._doneWeight = a; this.fire("updated", c); this.isDone() && this.fire("done") } }, cancel: function () { this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled")) },
                isDone: function () { return this._weight === this._doneWeight }, isCanceled: function () { return this._isCanceled }
            }; CKEDITOR.event.implementOn(d.prototype); CKEDITOR.plugins.notificationAggregator = a; CKEDITOR.plugins.notificationAggregator.task = d
        }(), "use strict", function () {
            CKEDITOR.plugins.add("uploadwidget", { requires: "widget,clipboard,filetools,notificationaggregator", init: function (a) { a.filter.allow("*[!data-widget,!data-cke-upload-id]") } }); CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools,
                {
                    addUploadWidget: function (a, d, b) {
                        var c = CKEDITOR.fileTools, h = a.uploadRepository, l = b.supportedTypes ? 10 : 20; if (b.fileToElement) a.on("paste", function (b) {
                            b = b.data; var f = a.widgets.registered[d], e = b.dataTransfer, l = e.getFilesCount(), g = f.loadMethod || "loadAndUpload", n, p; if (!b.dataValue && l) for (p = 0; p < l; p++)if (n = e.getFile(p), !f.supportedTypes || c.isTypeSupported(n, f.supportedTypes)) {
                                var q = f.fileToElement(n); n = h.create(n); q && (n[g](f.uploadUrl, f.additionalRequestParameters), CKEDITOR.fileTools.markElement(q, d, n.id),
                                    "loadAndUpload" != g && "upload" != g || f.skipNotifications || CKEDITOR.fileTools.bindNotifications(a, n), b.dataValue += q.getOuterHtml())
                            }
                        }, null, null, l); CKEDITOR.tools.extend(b, {
                            downcast: function () { return new CKEDITOR.htmlParser.text("") }, init: function () {
                                var b = this, c = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"), d = h.loaders[c], l = CKEDITOR.tools.capitalize, g, n; d.on("update", function (h) {
                                    if (b.wrapper && b.wrapper.getParent()) {
                                        a.fire("lockSnapshot"); h = "on" + l(d.status); if ("function" !== typeof b[h] ||
                                            !1 !== b[h](d)) n = "cke_upload_" + d.status, b.wrapper && n != g && (g && b.wrapper.removeClass(g), b.wrapper.addClass(n), g = n), "error" != d.status && "abort" != d.status || a.widgets.del(b); a.fire("unlockSnapshot")
                                    } else a.editable().find('[data-cke-upload-id\x3d"' + c + '"]').count() || d.abort(), h.removeListener()
                                }); d.update()
                            }, replaceWith: function (b, c) {
                                if ("" === b.trim()) a.widgets.del(this); else {
                                    var d = this == a.widgets.focused, h = a.editable(), g = a.createRange(), l, p; d || (p = a.getSelection().createBookmarks()); g.setStartBefore(this.wrapper);
                                    g.setEndAfter(this.wrapper); d && (l = g.createBookmark()); h.insertHtmlIntoRange(b, g, c); a.widgets.checkWidgets({ initOnlyNew: !0 }); a.widgets.destroy(this, !0); d ? (g.moveToBookmark(l), g.select()) : a.getSelection().selectBookmarks(p)
                                }
                            }
                        }); a.widgets.add(d, b)
                    }, markElement: function (a, d, b) { a.setAttributes({ "data-cke-upload-id": b, "data-widget": d }) }, bindNotifications: function (a, d) {
                        function b() {
                            c = a._.uploadWidgetNotificaionAggregator; if (!c || c.isFinished()) c = a._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(a,
                                a.lang.uploadwidget.uploadMany, a.lang.uploadwidget.uploadOne), c.once("finished", function () { var b = c.getTaskCount(); 0 === b ? c.notification.hide() : c.notification.update({ message: 1 == b ? a.lang.uploadwidget.doneOne : a.lang.uploadwidget.doneMany.replace("%1", b), type: "success", important: 1 }) })
                        } var c, h = null; d.on("update", function () { !h && d.uploadTotal && (b(), h = c.createTask({ weight: d.uploadTotal })); h && "uploading" == d.status && h.update(d.uploaded) }); d.on("uploaded", function () { h && h.done() }); d.on("error", function () {
                            h &&
                            h.cancel(); a.showNotification(d.message, "warning")
                        }); d.on("abort", function () { h && h.cancel(); a.showNotification(a.lang.uploadwidget.abort, "info") })
                    }
                })
        }(), "use strict", function () {
            function a(a) { 9 >= a && (a = "0" + a); return String(a) } function d(c) { var d = new Date, d = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]; b += 1; return "image-" + CKEDITOR.tools.array.map(d, a).join("") + "-" + b + "." + c } var b = 0; CKEDITOR.plugins.add("uploadimage", {
                requires: "uploadwidget", onLoad: function () { CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}") },
                init: function (a) {
                    if (CKEDITOR.plugins.clipboard.isFileApiSupported) {
                        var b = CKEDITOR.fileTools, l = b.getUploadUrl(a.config, "image"); l && (b.addUploadWidget(a, "uploadimage", {
                            supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: l, fileToElement: function () { var a = new CKEDITOR.dom.element("img"); a.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d"); return a }, parts: { img: "img" }, onUploading: function (a) { this.parts.img.setAttribute("src", a.data) },
                            onUploaded: function (a) { var b = this.parts.img.$; this.replaceWith('\x3cimg src\x3d"' + a.url + '" width\x3d"' + (a.responseData.width || b.naturalWidth) + '" height\x3d"' + (a.responseData.height || b.naturalHeight) + '"\x3e') }
                        }), a.on("paste", function (k) {
                            if (k.data.dataValue.match(/<img[\s\S]+data:/i)) {
                                k = k.data; var f = document.implementation.createHTMLDocument(""), f = new CKEDITOR.dom.element(f.body), e, m, g; f.data("cke-editable", 1); f.appendHtml(k.dataValue); e = f.find("img"); for (g = 0; g < e.count(); g++) {
                                    m = e.getItem(g); var n = m.getAttribute("src"),
                                        p = n && "data:" == n.substring(0, 5), q = null === m.data("cke-realelement"); p && q && !m.data("cke-upload-id") && !m.isReadOnly(1) && (p = (p = n.match(/image\/([a-z]+?);/i)) && p[1] || "jpg", n = a.uploadRepository.create(n, d(p)), n.upload(l), b.markElement(m, "uploadimage", n.id), b.bindNotifications(a, n))
                                } k.dataValue = f.getHtml()
                            }
                        }))
                    }
                }
            })
        }(), CKEDITOR.plugins.add("wsc", {
            requires: "dialog", parseApi: function (a) {
                a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function () { }; a.config.wsc_onClose = "function" ===
                    typeof a.config.wsc_onClose ? a.config.wsc_onClose : function () { }
            }, parseConfig: function (a) {
                a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk"; a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || ""; a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || ""; a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript ||
                    CKEDITOR.config.wsc_customLoaderScript; a.config.wsc_interfaceLang = a.config.wsc_interfaceLang; CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell"; CKEDITOR.config.wsc_version = "v4.3.0-master-d769233"; CKEDITOR.config.wsc_removeGlobalVariable = !0
            }, onLoad: function (a) { "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css") }, init: function (a) {
                var d = CKEDITOR.env; this.parseConfig(a); this.parseApi(a); a.addCommand("checkspell",
                    new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(d.ie && (8 > d.version || d.quirks)) }; "undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", { label: a.lang.wsc.toolbar, click: function (a) { var c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (c = c.replace(/\s/g, "")) ? a.execCommand("checkspell") : alert("Nothing to check!") }, toolbar: "spellchecker,10" });
                CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
            }
        }), function () {
            function a(a) {
                function b(a) {
                    var c = !1; g.attachListener(g, "keydown", function () { var b = f.getBody().getElementsByTag(a); if (!c) { for (var d = 0; d < b.count(); d++)b.getItem(d).setCustomData("retain", !0); c = !0 } }, null, null, 1); g.attachListener(g, "keyup", function () {
                        var b = f.getElementsByTag(a); c && (1 == b.count() && !b.getItem(0).getCustomData("retain") &&
                            CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1), c = !1)
                    })
                } var c = this.editor, f = a.document, e = f.body, m = f.getElementById("cke_actscrpt"); m && m.parentNode.removeChild(m); (m = f.getElementById("cke_shimscrpt")) && m.parentNode.removeChild(m); (m = f.getElementById("cke_basetagscrpt")) && m.parentNode.removeChild(m); e.contentEditable = !0; CKEDITOR.env.ie && (e.hideFocus = !0, e.disabled = !0, e.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = e; f = new CKEDITOR.dom.document(f); this.setup();
                this.fixInitialSelection(); var g = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && f.getDocumentElement().addClass(f.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && c.enterMode != CKEDITOR.ENTER_DIV && b("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) f.getDocumentElement().on("mousedown", function (a) { a.data.getTarget().is("html") && setTimeout(function () { c.editable().focus() }) }); d(c); try {
                    c.document.$.execCommand("2D-position",
                        !1, !0)
                } catch (n) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function (a) { var b = a.data.getKeystroke(); if (33 == b || 34 == b) if (CKEDITOR.env.ie) setTimeout(function () { c.getSelection().scrollIntoView() }, 0); else if (c.window.$.innerHeight > this.$.offsetHeight) { var d = c.createRange(); d[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this); d.select(); a.data.preventDefault() } }); CKEDITOR.env.ie && this.attachListener(f, "blur", function () { try { f.$.selection.empty() } catch (a) { } });
                CKEDITOR.env.iOS && this.attachListener(f, "touchend", function () { a.focus() }); e = c.document.getElementsByTag("title").getItem(0); e.data("cke-title", e.getText()); CKEDITOR.env.ie && (c.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () { "unloaded" == this.status && (this.status = "ready"); c.fire("contentDom"); this._.isPendingFocus && (c.focus(), this._.isPendingFocus = !1); setTimeout(function () { c.fire("dataReady") }, 0) }, 0, this)
            } function d(a) {
                function b() {
                    var d; a.editable().attachListener(a, "selectionChange",
                        function () { var b = a.getSelection().getSelectedElement(); b && (d && (d.detachEvent("onresizestart", c), d = null), b.$.attachEvent("onresizestart", c), d = b.$) })
                } function c(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try { var d = a.document.$; d.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing); d.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles) } catch (e) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
            } function b() {
                var a = []; if (8 <= CKEDITOR.document.$.documentMode) {
                    a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
                    var b = [], c; for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable\x3dfalse]"); a.push(b.join(",") + "{display:inline-block}")
                } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")); a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
            } var c; CKEDITOR.plugins.add("wysiwygarea", {
                init: function (a) {
                    a.config.fullPage && a.addFeature({
                        allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                        requiredContent: "body"
                    }); a.addMode("wysiwyg", function (b) {
                        function d(f) { f && f.removeListener(); a.editable(new c(a, e.$.contentWindow.document.body)); a.setData(a.getData(1), b) } var f = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", f = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(f) + "}())" : "", e = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + f + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
                        e.setStyles({ width: "100%", height: "100%" }); e.addClass("cke_wysiwyg_frame").addClass("cke_reset"); f = a.ui.space("contents"); f.append(e); var m = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (m) e.on("load", d); var g = a.title, n = a.fire("ariaEditorHelpLabel", {}).label; g && (CKEDITOR.env.ie && n && (g += ", " + n), e.setAttribute("title", g)); if (n) {
                            var g = CKEDITOR.tools.getNextId(), p = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e"); f.append(p, 1); e.setAttribute("aria-describedby",
                                g)
                        } a.on("beforeModeUnload", function (a) { a.removeListener(); p && p.remove() }); e.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" }); !m && d(); a.fire("ariaWidget", e)
                    })
                }
            }); CKEDITOR.editor.prototype.addContentsCss = function (a) { var b = this.config, c = b.contentsCss; CKEDITOR.tools.isArray(c) || (b.contentsCss = c ? [c] : []); b.contentsCss.push(a) }; c = CKEDITOR.tools.createClass({
                $: function () {
                    this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (b) {
                        CKEDITOR.tools.setTimeout(a,
                            0, this, b)
                    }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title")
                }, base: CKEDITOR.editable, proto: {
                    setData: function (a, c) {
                        var d = this.editor; if (c) this.setHtml(a), this.fixInitialSelection(), d.fire("dataReady"); else {
                            this._.isLoadingData = !0; d._.dataStore = { id: 1 }; var f = d.config, e = f.fullPage, m = f.docType, g = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); e || (g += CKEDITOR.tools.buildStyleHtml(d.config.contentsCss)); var n = f.baseHref ? '\x3cbase href\x3d"' +
                                f.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; e && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) { d.docType = m = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { d.xmlDeclaration = a; return "" })); a = d.dataProcessor.toHtml(a); e ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"),
                                    n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a = m + a) : a = f.docType + '\x3chtml dir\x3d"' + f.contentsLangDirection + '" lang\x3d"' + (f.contentsLanguage || d.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + g + "\x3c/head\x3e\x3cbody" + (f.bodyId ? ' id\x3d"' + f.bodyId + '"' : "") + (f.bodyClass ? ' class\x3d"' + f.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version &&
                                        (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e"))); f = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (f += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
                            n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (f += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e'); a = a.replace(/(?=\s*<\/(:?head)>)/, f); this.clearCustomData(); this.clearListeners(); d.fire("contentDomUnload"); var p = this.getDocument(); try { p.write(a) } catch (q) { setTimeout(function () { p.write(a) }, 0) }
                        }
                    }, getData: function (a) {
                        if (a) return this.getHtml(); a = this.editor; var b = a.config, c = b.fullPage, d = c && a.docType, e = c && a.xmlDeclaration,
                            m = this.getDocument(), c = c ? m.getDocumentElement().getOuterHtml() : m.getBody().getHtml(); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, "")); c = a.dataProcessor.toDataFormat(c); e && (c = e + "\n" + c); d && (c = d + "\n" + c); return c
                    }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this) }, detach: function () {
                        var a = this.editor, b = a.document, d; try { d = a.window.getFrame() } catch (f) { } c.baseProto.detach.call(this); this.clearCustomData(); b.getDocumentElement().clearCustomData();
                        CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); d && d.getParent() ? (d.clearCustomData(), (a = d.removeCustomData("onResize")) && a.removeListener(), d.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                    }
                }
            })
        }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,lineutils,widgetselection,widget,filetools,notificationaggregator,uploadwidget,uploadimage,wsc,wysiwygarea",
        CKEDITOR.config.skin = "moono-lisa", function () {
            var a = function (a, b) { var c = CKEDITOR.getUrl("plugins/" + b); a = a.split(","); for (var h = 0; h < a.length; h++)CKEDITOR.skin.icons[a[h]] = { path: c, offset: -a[++h], bgsize: a[++h] } }; CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,embed,552,,embedsemantic,576,,find-rtl,600,,find,624,,replace,648,,flash,672,,button,696,,checkbox,720,,form,744,,hiddenfield,768,,imagebutton,792,,radio,816,,select-rtl,840,,select,864,,textarea-rtl,888,,textarea,912,,textfield-rtl,936,,textfield,960,,horizontalrule,984,,iframe,1008,,image,1032,,indent-rtl,1056,,indent,1080,,outdent-rtl,1104,,outdent,1128,,justifyblock,1152,,justifycenter,1176,,justifyleft,1200,,justifyright,1224,,language,1248,,anchor-rtl,1272,,anchor,1296,,link,1320,,unlink,1344,,bulletedlist-rtl,1368,,bulletedlist,1392,,numberedlist-rtl,1416,,numberedlist,1440,,mathjax,1464,,maximize,1488,,newpage-rtl,1512,,newpage,1536,,pagebreak-rtl,1560,,pagebreak,1584,,pastefromword-rtl,1608,,pastefromword,1632,,pastetext-rtl,1656,,pastetext,1680,,placeholder,1704,,preview-rtl,1728,,preview,1752,,print,1776,,removeformat,1800,,save,1824,,scayt,1848,,selectall,1872,,showblocks-rtl,1896,,showblocks,1920,,smiley,1944,,source-rtl,1968,,source,1992,,sourcedialog-rtl,2016,,sourcedialog,2040,,specialchar,2064,,table,2088,,templates-rtl,2112,,templates,2136,,uicolor,2160,,redo-rtl,2184,,redo,2208,,undo-rtl,2232,,undo,2256,,simplebox,4560,auto,spellchecker,2304,",
                "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,embed,552,auto,embedsemantic,576,auto,find-rtl,600,auto,find,624,auto,replace,648,auto,flash,672,auto,button,696,auto,checkbox,720,auto,form,744,auto,hiddenfield,768,auto,imagebutton,792,auto,radio,816,auto,select-rtl,840,auto,select,864,auto,textarea-rtl,888,auto,textarea,912,auto,textfield-rtl,936,auto,textfield,960,auto,horizontalrule,984,auto,iframe,1008,auto,image,1032,auto,indent-rtl,1056,auto,indent,1080,auto,outdent-rtl,1104,auto,outdent,1128,auto,justifyblock,1152,auto,justifycenter,1176,auto,justifyleft,1200,auto,justifyright,1224,auto,language,1248,auto,anchor-rtl,1272,auto,anchor,1296,auto,link,1320,auto,unlink,1344,auto,bulletedlist-rtl,1368,auto,bulletedlist,1392,auto,numberedlist-rtl,1416,auto,numberedlist,1440,auto,mathjax,1464,auto,maximize,1488,auto,newpage-rtl,1512,auto,newpage,1536,auto,pagebreak-rtl,1560,auto,pagebreak,1584,auto,pastefromword-rtl,1608,auto,pastefromword,1632,auto,pastetext-rtl,1656,auto,pastetext,1680,auto,placeholder,1704,auto,preview-rtl,1728,auto,preview,1752,auto,print,1776,auto,removeformat,1800,auto,save,1824,auto,scayt,1848,auto,selectall,1872,auto,showblocks-rtl,1896,auto,showblocks,1920,auto,smiley,1944,auto,source-rtl,1968,auto,source,1992,auto,sourcedialog-rtl,2016,auto,sourcedialog,2040,auto,specialchar,2064,auto,table,2088,auto,templates-rtl,2112,auto,templates,2136,auto,uicolor,2160,auto,redo-rtl,2184,auto,redo,2208,auto,undo-rtl,2232,auto,undo,2256,auto,simplebox,2280,auto,spellchecker,2304,auto",
                    "icons.png")
        }())
})();