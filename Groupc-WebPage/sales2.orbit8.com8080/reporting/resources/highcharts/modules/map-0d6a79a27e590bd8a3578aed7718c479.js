/*
 Highmaps JS v8.1.0 (2020-05-05)

 Highmaps as a plugin for Highcharts or Highstock.

 (c) 2011-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d) {
    "object" === typeof module && module.exports ? (d["default"] = d, module.exports = d) : "function" === typeof define && define.amd ? define("highcharts/modules/map", ["highcharts"], function(v) {
        d(v);
        d.Highcharts = v;
        return d
    }) : d("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(d) {
    function v(c, p, d, f) {
        c.hasOwnProperty(p) || (c[p] = f.apply(null, d))
    }
    d = d ? d._modules : {};
    v(d, "parts-map/MapAxis.js", [d["parts/Axis.js"], d["parts/Utilities.js"]], function(c, p) {
        var d = p.addEvent,
            f = p.pick,
            B = function() {
                return function(c) {
                    this.axis =
                        c
                }
            }();
        p = function() {
            function c() {}
            c.compose = function(c) {
                c.keepProps.push("mapAxis");
                d(c, "init", function() {
                    this.mapAxis || (this.mapAxis = new B(this))
                });
                d(c, "getSeriesExtremes", function() {
                    if (this.mapAxis) {
                        var c = [];
                        this.isXAxis && (this.series.forEach(function(f, t) {
                            f.useMapGeometry && (c[t] = f.xData, f.xData = [])
                        }), this.mapAxis.seriesXData = c)
                    }
                });
                d(c, "afterGetSeriesExtremes", function() {
                    if (this.mapAxis) {
                        var c = this.mapAxis.seriesXData || [],
                            d;
                        if (this.isXAxis) {
                            var t = f(this.dataMin, Number.MAX_VALUE);
                            var a = f(this.dataMax, -Number.MAX_VALUE);
                            this.series.forEach(function(n, g) {
                                n.useMapGeometry && (t = Math.min(t, f(n.minX, t)), a = Math.max(a, f(n.maxX, a)), n.xData = c[g], d = !0)
                            });
                            d && (this.dataMin = t, this.dataMax = a);
                            this.mapAxis.seriesXData = void 0
                        }
                    }
                });
                d(c, "afterSetAxisTranslation", function() {
                    if (this.mapAxis) {
                        var c = this.chart,
                            f = c.plotWidth / c.plotHeight;
                        c = c.xAxis[0];
                        var d;
                        "yAxis" === this.coll && "undefined" !== typeof c.transA && this.series.forEach(function(a) {
                            a.preserveAspectRatio && (d = !0)
                        });
                        if (d && (this.transA = c.transA = Math.min(this.transA,
                                c.transA), f /= (c.max - c.min) / (this.max - this.min), f = 1 > f ? this : c, c = (f.max - f.min) * f.transA, f.mapAxis.pixelPadding = f.len - c, f.minPixelPadding = f.mapAxis.pixelPadding / 2, c = f.mapAxis.fixTo)) {
                            c = c[1] - f.toValue(c[0], !0);
                            c *= f.transA;
                            if (Math.abs(c) > f.minPixelPadding || f.min === f.dataMin && f.max === f.dataMax) c = 0;
                            f.minPixelPadding -= c
                        }
                    }
                });
                d(c, "render", function() {
                    this.mapAxis && (this.mapAxis.fixTo = void 0)
                })
            };
            return c
        }();
        p.compose(c);
        return p
    });
    v(d, "parts-map/ColorSeriesMixin.js", [d["parts/Globals.js"]], function(c) {
        c.colorPointMixin = {
            setVisible: function(c) {
                var d = this,
                    f = c ? "show" : "hide";
                d.visible = d.options.visible = !!c;
                ["graphic", "dataLabel"].forEach(function(c) {
                    if (d[c]) d[c][f]()
                })
            }
        };
        c.colorSeriesMixin = {
            optionalAxis: "colorAxis",
            colorAxis: 0,
            translateColors: function() {
                var c = this,
                    d = this.options.nullColor,
                    f = this.colorAxis,
                    B = this.colorKey;
                (this.data.length ? this.data : this.points).forEach(function(p) {
                    var y = p.getNestedProperty(B);
                    if (y = p.options.color || (p.isNull || null === p.value ? d : f && "undefined" !== typeof y ? f.toColor(y, p) : p.color || c.color)) p.color =
                        y
                })
            }
        }
    });
    v(d, "parts-map/ColorAxis.js", [d["parts/Axis.js"], d["parts/Color.js"], d["parts/Globals.js"], d["parts/Legend.js"], d["mixins/legend-symbol.js"], d["parts/Point.js"], d["parts/Utilities.js"]], function(c, d, q, f, B, y, w) {
        var p = this && this.__extends || function() {
                var b = function(m, e) {
                    b = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(b, m) {
                        b.__proto__ = m
                    } || function(b, m) {
                        for (var e in m) m.hasOwnProperty(e) && (b[e] = m[e])
                    };
                    return b(m, e)
                };
                return function(m, e) {
                    function a() {
                        this.constructor = m
                    }
                    b(m, e);
                    m.prototype = null === e ? Object.create(e) : (a.prototype = e.prototype, new a)
                }
            }(),
            r = d.parse;
        d = w.addEvent;
        var t = w.erase,
            a = w.extend,
            n = w.Fx,
            g = w.isNumber,
            k = w.merge,
            u = w.pick,
            A = w.splat;
        "";
        w = q.Chart;
        var l = q.Series,
            h = q.colorPointMixin,
            b = q.noop;
        a(l.prototype, q.colorSeriesMixin);
        a(y.prototype, h);
        w.prototype.collectionsWithUpdate.push("colorAxis");
        w.prototype.collectionsWithInit.colorAxis = [w.prototype.addColorAxis];
        var m = function(m) {
            function e(b, e) {
                var a = m.call(this, b, e) || this;
                a.beforePadding = !1;
                a.chart = void 0;
                a.coll =
                    "colorAxis";
                a.dataClasses = void 0;
                a.legendItem = void 0;
                a.legendItems = void 0;
                a.name = "";
                a.options = void 0;
                a.stops = void 0;
                a.visible = !0;
                a.init(b, e);
                return a
            }
            p(e, m);
            e.buildOptions = function(b, e, m) {
                b = b.options.legend || {};
                var a = m.layout ? "vertical" !== m.layout : "vertical" !== b.layout;
                return k(e, {
                    side: a ? 2 : 1,
                    reversed: !a
                }, m, {
                    opposite: !a,
                    showEmpty: !1,
                    title: null,
                    visible: b.enabled && (m ? !1 !== m.visible : !0)
                })
            };
            e.prototype.init = function(b, a) {
                var x = e.buildOptions(b, e.defaultOptions, a);
                this.coll = "colorAxis";
                m.prototype.init.call(this,
                    b, x);
                a.dataClasses && this.initDataClasses(a);
                this.initStops();
                this.horiz = !x.opposite;
                this.zoomEnabled = !1
            };
            e.prototype.initDataClasses = function(b) {
                var e = this.chart,
                    m, a = 0,
                    x = e.options.chart.colorCount,
                    h = this.options,
                    g = b.dataClasses.length;
                this.dataClasses = m = [];
                this.legendItems = [];
                b.dataClasses.forEach(function(b, z) {
                    b = k(b);
                    m.push(b);
                    if (e.styledMode || !b.color) "category" === h.dataClassColor ? (e.styledMode || (z = e.options.colors, x = z.length, b.color = z[a]), b.colorIndex = a, a++, a === x && (a = 0)) : b.color = r(h.minColor).tweenTo(r(h.maxColor),
                        2 > g ? .5 : z / (g - 1))
                })
            };
            e.prototype.hasData = function() {
                return !!(this.tickPositions || []).length
            };
            e.prototype.setTickPositions = function() {
                if (!this.dataClasses) return m.prototype.setTickPositions.call(this)
            };
            e.prototype.initStops = function() {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                this.stops.forEach(function(b) {
                    b.color = r(b[1])
                })
            };
            e.prototype.setOptions = function(b) {
                m.prototype.setOptions.call(this, b);
                this.options.crosshair = this.options.marker
            };
            e.prototype.setAxisSize =
                function() {
                    var b = this.legendSymbol,
                        m = this.chart,
                        a = m.options.legend || {},
                        h, g;
                    b ? (this.left = a = b.attr("x"), this.top = h = b.attr("y"), this.width = g = b.attr("width"), this.height = b = b.attr("height"), this.right = m.chartWidth - a - g, this.bottom = m.chartHeight - h - b, this.len = this.horiz ? g : b, this.pos = this.horiz ? a : h) : this.len = (this.horiz ? a.symbolWidth : a.symbolHeight) || e.defaultLegendLength
                };
            e.prototype.normalizedValue = function(b) {
                this.logarithmic && (b = this.logarithmic.log2lin(b));
                return 1 - (this.max - b) / (this.max - this.min || 1)
            };
            e.prototype.toColor = function(b, m) {
                var e = this.dataClasses,
                    a = this.stops,
                    h;
                if (e)
                    for (h = e.length; h--;) {
                        var z = e[h];
                        var x = z.from;
                        a = z.to;
                        if (("undefined" === typeof x || b >= x) && ("undefined" === typeof a || b <= a)) {
                            var g = z.color;
                            m && (m.dataClass = h, m.colorIndex = z.colorIndex);
                            break
                        }
                    } else {
                        b = this.normalizedValue(b);
                        for (h = a.length; h-- && !(b > a[h][0]););
                        x = a[h] || a[h + 1];
                        a = a[h + 1] || x;
                        b = 1 - (a[0] - b) / (a[0] - x[0] || 1);
                        g = x.color.tweenTo(a.color, b)
                    }
                return g
            };
            e.prototype.getOffset = function() {
                var b = this.legendGroup,
                    e = this.chart.axisOffset[this.side];
                b && (this.axisParent = b, m.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = e)
            };
            e.prototype.setLegendColor = function() {
                var b = this.reversed,
                    e = b ? 1 : 0;
                b = b ? 0 : 1;
                e = this.horiz ? [e, 0, b, 0] : [0, b, 0, e];
                this.legendColor = {
                    linearGradient: {
                        x1: e[0],
                        y1: e[1],
                        x2: e[2],
                        y2: e[3]
                    },
                    stops: this.stops
                }
            };
            e.prototype.drawLegendSymbol = function(b, m) {
                var a = b.padding,
                    h = b.options,
                    g = this.horiz,
                    z = u(h.symbolWidth, g ? e.defaultLegendLength : 12),
                    x = u(h.symbolHeight,
                        g ? 12 : e.defaultLegendLength),
                    c = u(h.labelPadding, g ? 16 : 30);
                h = u(h.itemDistance, 10);
                this.setLegendColor();
                m.legendSymbol = this.chart.renderer.rect(0, b.baseline - 11, z, x).attr({
                    zIndex: 1
                }).add(m.legendGroup);
                this.legendItemWidth = z + a + (g ? h : c);
                this.legendItemHeight = x + a + (g ? c : 0)
            };
            e.prototype.setState = function(b) {
                this.series.forEach(function(e) {
                    e.setState(b)
                })
            };
            e.prototype.setVisible = function() {};
            e.prototype.getSeriesExtremes = function() {
                var b = this.series,
                    e = b.length,
                    m;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; e--;) {
                    var a =
                        b[e];
                    var h = a.colorKey = u(a.options.colorKey, a.colorKey, a.pointValKey, a.zoneAxis, "y");
                    var g = a.pointArrayMap;
                    var c = a[h + "Min"] && a[h + "Max"];
                    if (a[h + "Data"]) var n = a[h + "Data"];
                    else if (g) {
                        n = [];
                        g = g.indexOf(h);
                        var k = a.yData;
                        if (0 <= g && k)
                            for (m = 0; m < k.length; m++) n.push(u(k[m][g], k[m]))
                    } else n = a.yData;
                    c ? (a.minColorValue = a[h + "Min"], a.maxColorValue = a[h + "Max"]) : (n = l.prototype.getExtremes.call(a, n), a.minColorValue = n.dataMin, a.maxColorValue = n.dataMax);
                    "undefined" !== typeof a.minColorValue && (this.dataMin = Math.min(this.dataMin,
                        a.minColorValue), this.dataMax = Math.max(this.dataMax, a.maxColorValue));
                    c || l.prototype.applyExtremes.call(a)
                }
            };
            e.prototype.drawCrosshair = function(b, e) {
                var a = e && e.plotX,
                    h = e && e.plotY,
                    g = this.pos,
                    x = this.len;
                if (e) {
                    var c = this.toPixels(e.getNestedProperty(e.series.colorKey));
                    c < g ? c = g - 2 : c > g + x && (c = g + x + 2);
                    e.plotX = c;
                    e.plotY = this.len - c;
                    m.prototype.drawCrosshair.call(this, b, e);
                    e.plotX = a;
                    e.plotY = h;
                    this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),
                        this.cross.addedToColorAxis = !0, !this.chart.styledMode && this.crosshair && this.cross.attr({
                            fill: this.crosshair.color
                        }))
                }
            };
            e.prototype.getPlotLinePath = function(b) {
                var e = b.translatedValue;
                return g(e) ? this.horiz ? [
                    ["M", e - 4, this.top - 6],
                    ["L", e + 4, this.top - 6],
                    ["L", e, this.top],
                    ["Z"]
                ] : [
                    ["M", this.left, e],
                    ["L", this.left - 6, e + 6],
                    ["L", this.left - 6, e - 6],
                    ["Z"]
                ] : m.prototype.getPlotLinePath.call(this, b)
            };
            e.prototype.update = function(b, a) {
                var h = this.chart,
                    g = h.legend,
                    c = e.buildOptions(h, {}, b);
                this.series.forEach(function(b) {
                    b.isDirtyData = !0
                });
                (b.dataClasses && g.allItems || this.dataClasses) && this.destroyItems();
                h.options[this.coll] = k(this.userOptions, c);
                m.prototype.update.call(this, c, a);
                this.legendItem && (this.setLegendColor(), g.colorizeItem(this, !0))
            };
            e.prototype.destroyItems = function() {
                var b = this.chart;
                this.legendItem ? b.legend.destroyItem(this) : this.legendItems && this.legendItems.forEach(function(e) {
                    b.legend.destroyItem(e)
                });
                b.isDirtyLegend = !0
            };
            e.prototype.remove = function(b) {
                this.destroyItems();
                m.prototype.remove.call(this, b)
            };
            e.prototype.getDataClassLegendSymbols =
                function() {
                    var e = this,
                        m = e.chart,
                        h = e.legendItems,
                        g = m.options.legend,
                        c = g.valueDecimals,
                        n = g.valueSuffix || "",
                        k;
                    h.length || e.dataClasses.forEach(function(g, x) {
                        var z = !0,
                            l = g.from,
                            f = g.to,
                            D = m.numberFormatter;
                        k = "";
                        "undefined" === typeof l ? k = "< " : "undefined" === typeof f && (k = "> ");
                        "undefined" !== typeof l && (k += D(l, c) + n);
                        "undefined" !== typeof l && "undefined" !== typeof f && (k += " - ");
                        "undefined" !== typeof f && (k += D(f, c) + n);
                        h.push(a({
                            chart: m,
                            name: k,
                            options: {},
                            drawLegendSymbol: B.drawRectangle,
                            visible: !0,
                            setState: b,
                            isDataClass: !0,
                            setVisible: function() {
                                z = e.visible = !z;
                                e.series.forEach(function(b) {
                                    b.points.forEach(function(b) {
                                        b.dataClass === x && b.setVisible(z)
                                    })
                                });
                                m.legend.colorizeItem(this, z)
                            }
                        }, g))
                    });
                    return h
                };
            e.defaultLegendLength = 200;
            e.defaultOptions = {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            };
            e.keepProps = ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"];
            return e
        }(c);
        Array.prototype.push.apply(c.keepProps, m.keepProps);
        q.ColorAxis = m;
        ["fill", "stroke"].forEach(function(b) {
            n.prototype[b + "Setter"] = function() {
                this.elem.attr(b, r(this.start).tweenTo(r(this.end), this.pos), null, !0)
            }
        });
        d(w, "afterGetAxes", function() {
            var b = this,
                a = b.options;
            this.colorAxis = [];
            a.colorAxis && (a.colorAxis = A(a.colorAxis), a.colorAxis.forEach(function(e, a) {
                e.index = a;
                new m(b, e)
            }))
        });
        d(l, "bindAxes",
            function() {
                var b = this.axisTypes;
                b ? -1 === b.indexOf("colorAxis") && b.push("colorAxis") : this.axisTypes = ["colorAxis"]
            });
        d(f, "afterGetAllItems", function(b) {
            var e = [],
                a, m;
            (this.chart.colorAxis || []).forEach(function(m) {
                (a = m.options) && a.showInLegend && (a.dataClasses && a.visible ? e = e.concat(m.getDataClassLegendSymbols()) : a.visible && e.push(m), m.series.forEach(function(e) {
                    if (!e.options.showInLegend || a.dataClasses) "point" === e.options.legendType ? e.points.forEach(function(e) {
                        t(b.allItems, e)
                    }) : t(b.allItems, e)
                }))
            });
            for (m =
                e.length; m--;) b.allItems.unshift(e[m])
        });
        d(f, "afterColorizeItem", function(b) {
            b.visible && b.item.legendColor && b.item.legendSymbol.attr({
                fill: b.item.legendColor
            })
        });
        d(f, "afterUpdate", function() {
            var b = this.chart.colorAxis;
            b && b.forEach(function(b, e, a) {
                b.update({}, a)
            })
        });
        d(l, "afterTranslate", function() {
            (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
        });
        return m
    });
    v(d, "parts-map/ColorMapSeriesMixin.js", [d["parts/Globals.js"], d["parts/Point.js"], d["parts/Utilities.js"]],
        function(c, d, q) {
            var f = q.defined;
            q = c.noop;
            var B = c.seriesTypes;
            c.colorMapPointMixin = {
                dataLabelOnNull: !0,
                isValid: function() {
                    return null !== this.value && Infinity !== this.value && -Infinity !== this.value
                },
                setState: function(c) {
                    d.prototype.setState.call(this, c);
                    this.graphic && this.graphic.attr({
                        zIndex: "hover" === c ? 1 : 0
                    })
                }
            };
            c.colorMapSeriesMixin = {
                pointArrayMap: ["value"],
                axisTypes: ["xAxis", "yAxis", "colorAxis"],
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                getSymbol: q,
                parallelArrays: ["x", "y", "value"],
                colorKey: "value",
                pointAttribs: B.column.prototype.pointAttribs,
                colorAttribs: function(c) {
                    var d = {};
                    f(c.color) && (d[this.colorProp || "fill"] = c.color);
                    return d
                }
            }
        });
    v(d, "parts-map/MapNavigation.js", [d["parts/Globals.js"], d["parts/Utilities.js"]], function(c, d) {
        function p(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }

        function f(a) {
            this.init(a)
        }
        var B = d.addEvent,
            y = d.extend,
            w = d.merge,
            C = d.objectEach,
            r = d.pick;
        d = c.Chart;
        var t = c.doc;
        f.prototype.init = function(a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        f.prototype.update = function(a) {
            var c = this.chart,
                g = c.options.mapNavigation,
                k, d, f, l, h, b = function(b) {
                    this.handler.call(c, b);
                    p(b)
                },
                m = c.mapNavButtons;
            a && (g = c.options.mapNavigation = w(c.options.mapNavigation, a));
            for (; m.length;) m.pop().destroy();
            r(g.enableButtons, g.enabled) && !c.renderer.forExport && C(g.buttons, function(e, a) {
                k = w(g.buttonOptions, e);
                c.styledMode || (d = k.theme, d.style = w(k.theme.style, k.style), l = (f = d.states) && f.hover, h = f && f.select);
                e = c.renderer.button(k.text, 0, 0, b, d, l, h, 0, "zoomIn" ===
                    a ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + {
                    zoomIn: "zoom-in",
                    zoomOut: "zoom-out"
                }[a]).attr({
                    width: k.width,
                    height: k.height,
                    title: c.options.lang[a],
                    padding: k.padding,
                    zIndex: 5
                }).add();
                e.handler = k.onclick;
                B(e.element, "dblclick", p);
                m.push(e);
                var n = k,
                    z = B(c, "load", function() {
                        e.align(y(n, {
                            width: e.width,
                            height: 2 * e.height
                        }), null, n.alignTo);
                        z()
                    })
            });
            this.updateEvents(g)
        };
        f.prototype.updateEvents = function(a) {
            var c = this.chart;
            r(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ?
                this.unbindDblClick = this.unbindDblClick || B(c.container, "dblclick", function(a) {
                    c.pointer.onContainerDblClick(a)
                }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            r(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || B(c.container, "undefined" === typeof t.onmousewheel ? "DOMMouseScroll" : "mousewheel", function(a) {
                c.pointer.onContainerMouseWheel(a);
                p(a);
                return !1
            }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        y(d.prototype, {
            fitToBox: function(a,
                c) {
                [
                    ["x", "width"],
                    ["y", "height"]
                ].forEach(function(g) {
                    var k = g[0];
                    g = g[1];
                    a[k] + a[g] > c[k] + c[g] && (a[g] > c[g] ? (a[g] = c[g], a[k] = c[k]) : a[k] = c[k] + c[g] - a[g]);
                    a[g] > c[g] && (a[g] = c[g]);
                    a[k] < c[k] && (a[k] = c[k])
                });
                return a
            },
            mapZoom: function(a, c, g, k, d) {
                var f = this.xAxis[0],
                    l = f.max - f.min,
                    h = r(c, f.min + l / 2),
                    b = l * a;
                l = this.yAxis[0];
                var m = l.max - l.min,
                    e = r(g, l.min + m / 2);
                m *= a;
                h = this.fitToBox({
                    x: h - b * (k ? (k - f.pos) / f.len : .5),
                    y: e - m * (d ? (d - l.pos) / l.len : .5),
                    width: b,
                    height: m
                }, {
                    x: f.dataMin,
                    y: l.dataMin,
                    width: f.dataMax - f.dataMin,
                    height: l.dataMax -
                        l.dataMin
                });
                b = h.x <= f.dataMin && h.width >= f.dataMax - f.dataMin && h.y <= l.dataMin && h.height >= l.dataMax - l.dataMin;
                k && f.mapAxis && (f.mapAxis.fixTo = [k - f.pos, c]);
                d && l.mapAxis && (l.mapAxis.fixTo = [d - l.pos, g]);
                "undefined" === typeof a || b ? (f.setExtremes(void 0, void 0, !1), l.setExtremes(void 0, void 0, !1)) : (f.setExtremes(h.x, h.x + h.width, !1), l.setExtremes(h.y, h.y + h.height, !1));
                this.redraw()
            }
        });
        B(d, "beforeRender", function() {
            this.mapNavigation = new f(this);
            this.mapNavigation.update()
        });
        c.MapNavigation = f
    });
    v(d, "parts-map/MapPointer.js", [d["parts/Globals.js"], d["parts/Utilities.js"]], function(c, d) {
        var p = d.extend,
            f = d.pick;
        d = d.wrap;
        c = c.Pointer;
        p(c.prototype, {
            onContainerDblClick: function(c) {
                var f = this.chart;
                c = this.normalize(c);
                f.options.mapNavigation.enableDoubleClickZoomTo ? f.pointer.inClass(c.target, "highcharts-tracker") && f.hoverPoint && f.hoverPoint.zoomTo() : f.isInsidePlot(c.chartX - f.plotLeft, c.chartY - f.plotTop) && f.mapZoom(.5, f.xAxis[0].toValue(c.chartX), f.yAxis[0].toValue(c.chartY), c.chartX, c.chartY)
            },
            onContainerMouseWheel: function(c) {
                var f =
                    this.chart;
                c = this.normalize(c);
                var d = c.detail || -(c.wheelDelta / 120);
                f.isInsidePlot(c.chartX - f.plotLeft, c.chartY - f.plotTop) && f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity, d), f.xAxis[0].toValue(c.chartX), f.yAxis[0].toValue(c.chartY), c.chartX, c.chartY)
            }
        });
        d(c.prototype, "zoomOption", function(c) {
            var d = this.chart.options.mapNavigation;
            f(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy");
            c.apply(this, [].slice.call(arguments, 1))
        });
        d(c.prototype, "pinchTranslate", function(c,
            f, d, p, q, t, a) {
            c.call(this, f, d, p, q, t, a);
            "map" === this.chart.options.chart.type && this.hasZoom && (c = p.scaleX > p.scaleY, this.pinchTranslateDirection(!c, f, d, p, q, t, a, c ? p.scaleX : p.scaleY))
        })
    });
    v(d, "parts-map/MapSeries.js", [d["parts/Globals.js"], d["mixins/legend-symbol.js"], d["parts/Point.js"], d["parts/Utilities.js"]], function(c, d, q, f) {
        var p = f.extend,
            y = f.fireEvent,
            w = f.getNestedProperty,
            C = f.isArray,
            r = f.isNumber,
            t = f.merge,
            a = f.objectEach,
            n = f.pick,
            g = f.seriesType,
            k = f.splat,
            u = c.colorMapPointMixin,
            A = c.noop,
            l = c.Series,
            h = c.seriesTypes;
        g("map", "scatter", {
            animation: !1,
            dataLabels: {
                crop: !1,
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                overflow: !1,
                padding: 0,
                verticalAlign: "middle"
            },
            marker: null,
            nullColor: "#f7f7f7",
            stickyTracking: !1,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}<br/>"
            },
            turboThreshold: 0,
            allAreas: !0,
            borderColor: "#cccccc",
            borderWidth: 1,
            joinBy: "hc-key",
            states: {
                hover: {
                    halo: null,
                    brightness: .2
                },
                normal: {
                    animation: !0
                },
                select: {
                    color: "#cccccc"
                },
                inactive: {
                    opacity: 1
                }
            }
        }, t(c.colorMapSeriesMixin, {
            type: "map",
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: A,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            setOptions: function(b) {
                b = l.prototype.setOptions.call(this, b);
                var a = b.joinBy;
                null === a && (a = "_i");
                a = this.joinBy = k(a);
                a[1] || (a[1] = a[0]);
                return b
            },
            getBox: function(b) {
                var a = Number.MAX_VALUE,
                    e = -a,
                    h = a,
                    g = -a,
                    f = a,
                    d = a,
                    k = this.xAxis,
                    l = this.yAxis,
                    t;
                (b || []).forEach(function(b) {
                    if (b.path) {
                        "string" === typeof b.path ? b.path = c.splitPath(b.path) : "M" === b.path[0] && (b.path = c.SVGRenderer.prototype.pathToSegments(b.path));
                        var m = b.path || [],
                            k = -a,
                            l = a,
                            z = -a,
                            x = a,
                            D = b.properties;
                        b._foundBox || (m.forEach(function(b) {
                            var a = b[b.length - 2];
                            b = b[b.length - 1];
                            "number" === typeof a && "number" === typeof b && (l = Math.min(l, a), k = Math.max(k, a), x = Math.min(x, b), z = Math.max(z, b))
                        }), b._midX = l + (k - l) * n(b.middleX, D && D["hc-middle-x"], .5), b._midY = x + (z - x) * n(b.middleY, D && D["hc-middle-y"], .5), b._maxX = k, b._minX = l, b._maxY = z, b._minY = x, b.labelrank = n(b.labelrank, (k - l) * (z - x)), b._foundBox = !0);
                        e = Math.max(e, b._maxX);
                        h = Math.min(h, b._minX);
                        g = Math.max(g, b._maxY);
                        f = Math.min(f,
                            b._minY);
                        d = Math.min(b._maxX - b._minX, b._maxY - b._minY, d);
                        t = !0
                    }
                });
                t && (this.minY = Math.min(f, n(this.minY, a)), this.maxY = Math.max(g, n(this.maxY, -a)), this.minX = Math.min(h, n(this.minX, a)), this.maxX = Math.max(e, n(this.maxX, -a)), k && "undefined" === typeof k.options.minRange && (k.minRange = Math.min(5 * d, (this.maxX - this.minX) / 5, k.minRange || a)), l && "undefined" === typeof l.options.minRange && (l.minRange = Math.min(5 * d, (this.maxY - this.minY) / 5, l.minRange || a)))
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            getExtremes: function() {
                var b =
                    l.prototype.getExtremes.call(this, this.valueData),
                    a = b.dataMin;
                b = b.dataMax;
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                r(a) && (this.valueMin = a);
                r(b) && (this.valueMax = b);
                return {
                    dataMin: this.minY,
                    dataMax: this.maxY
                }
            },
            translatePath: function(b) {
                var a = this.xAxis,
                    e = this.yAxis,
                    c = a.min,
                    h = a.transA,
                    g = a.minPixelPadding,
                    f = e.min,
                    d = e.transA,
                    k = e.minPixelPadding,
                    l = [];
                b && b.forEach(function(b) {
                    "M" === b[0] ? l.push(["M", (b[1] - (c || 0)) * h + g, (b[2] - (f || 0)) * d + k]) : "L" === b[0] ? l.push(["L", (b[1] - (c || 0)) *
                        h + g, (b[2] - (f || 0)) * d + k
                    ]) : "C" === b[0] ? l.push(["C", (b[1] - (c || 0)) * h + g, (b[2] - (f || 0)) * d + k, (b[3] - (c || 0)) * h + g, (b[4] - (f || 0)) * d + k, (b[5] - (c || 0)) * h + g, (b[6] - (f || 0)) * d + k]) : "Q" === b[0] ? l.push(["Q", (b[1] - (c || 0)) * h + g, (b[2] - (f || 0)) * d + k, (b[3] - (c || 0)) * h + g, (b[4] - (f || 0)) * d + k]) : "Z" === b[0] && l.push(["Z"])
                });
                return l
            },
            setData: function(b, m, e, h) {
                var g = this.options,
                    f = this.chart.options.chart,
                    d = f && f.map,
                    k = g.mapData,
                    n = this.joinBy,
                    D = g.keys || this.pointArrayMap,
                    A = [],
                    p = {},
                    u = this.chart.mapTransforms;
                !k && d && (k = "string" === typeof d ? c.maps[d] :
                    d);
                b && b.forEach(function(a, e) {
                    var m = 0;
                    if (r(a)) b[e] = {
                        value: a
                    };
                    else if (C(a)) {
                        b[e] = {};
                        !g.keys && a.length > D.length && "string" === typeof a[0] && (b[e]["hc-key"] = a[0], ++m);
                        for (var c = 0; c < D.length; ++c, ++m) D[c] && "undefined" !== typeof a[m] && (0 < D[c].indexOf(".") ? q.prototype.setNestedProperty(b[e], a[m], D[c]) : b[e][D[c]] = a[m])
                    }
                    n && "_i" === n[0] && (b[e]._i = e)
                });
                this.getBox(b);
                (this.chart.mapTransforms = u = f && f.mapTransforms || k && k["hc-transform"] || u) && a(u, function(b) {
                    b.rotation && (b.cosAngle = Math.cos(b.rotation), b.sinAngle = Math.sin(b.rotation))
                });
                if (k) {
                    "FeatureCollection" === k.type && (this.mapTitle = k.title, k = c.geojson(k, this.type, this));
                    this.mapData = k;
                    this.mapMap = {};
                    for (u = 0; u < k.length; u++) f = k[u], d = f.properties, f._i = u, n[0] && d && d[n[0]] && (f[n[0]] = d[n[0]]), p[f[n[0]]] = f;
                    this.mapMap = p;
                    if (b && n[1]) {
                        var B = n[1];
                        b.forEach(function(b) {
                            b = w(B, b);
                            p[b] && A.push(p[b])
                        })
                    }
                    if (g.allAreas) {
                        this.getBox(k);
                        b = b || [];
                        if (n[1]) {
                            var y = n[1];
                            b.forEach(function(b) {
                                A.push(w(y, b))
                            })
                        }
                        A = "|" + A.map(function(b) {
                            return b && b[n[0]]
                        }).join("|") + "|";
                        k.forEach(function(a) {
                            n[0] && -1 !== A.indexOf("|" +
                                a[n[0]] + "|") || (b.push(t(a, {
                                value: null
                            })), h = !1)
                        })
                    } else this.getBox(A)
                }
                l.prototype.setData.call(this, b, m, e, h)
            },
            drawGraph: A,
            drawDataLabels: A,
            doFullTranslate: function() {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function() {
                var b = this,
                    a = b.xAxis,
                    e = b.yAxis,
                    c = b.doFullTranslate();
                b.generatePoints();
                b.data.forEach(function(m) {
                    r(m._midX) && r(m._midY) && (m.plotX = a.toPixels(m._midX, !0), m.plotY = e.toPixels(m._midY, !0));
                    c && (m.shapeType = "path", m.shapeArgs = {
                        d: b.translatePath(m.path)
                    })
                });
                y(b, "afterTranslate")
            },
            pointAttribs: function(b, a) {
                a = b.series.chart.styledMode ? this.colorAttribs(b) : h.column.prototype.pointAttribs.call(this, b, a);
                a["stroke-width"] = n(b.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return a
            },
            drawPoints: function() {
                var b = this,
                    a = b.xAxis,
                    e = b.yAxis,
                    c = b.group,
                    g = b.chart,
                    f = g.renderer,
                    d = this.baseTrans;
                b.transformGroup || (b.transformGroup = f.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(c), b.transformGroup.survive = !0);
                if (b.doFullTranslate()) g.hasRendered &&
                    !g.styledMode && b.points.forEach(function(a) {
                        a.shapeArgs && (a.shapeArgs.fill = b.pointAttribs(a, a.state).fill)
                    }), b.group = b.transformGroup, h.column.prototype.drawPoints.apply(b), b.group = c, b.points.forEach(function(a) {
                        if (a.graphic) {
                            var e = "";
                            a.name && (e += "highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase());
                            a.properties && a.properties["hc-key"] && (e += " highcharts-key-" + a.properties["hc-key"].toLowerCase());
                            e && a.graphic.addClass(e);
                            g.styledMode && a.graphic.css(b.pointAttribs(a, a.selected && "select" || void 0))
                        }
                    }),
                    this.baseTrans = {
                        originX: a.min - a.minPixelPadding / a.transA,
                        originY: e.min - e.minPixelPadding / e.transA + (e.reversed ? 0 : e.len / e.transA),
                        transAX: a.transA,
                        transAY: e.transA
                    }, this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    });
                else {
                    var k = a.transA / d.transAX;
                    var l = e.transA / d.transAY;
                    var t = a.toPixels(d.originX, !0);
                    var A = e.toPixels(d.originY, !0);
                    .99 < k && 1.01 > k && .99 < l && 1.01 > l && (l = k = 1, t = Math.round(t), A = Math.round(A));
                    var p = this.transformGroup;
                    if (g.renderer.globalAnimation) {
                        var u = p.attr("translateX");
                        var q = p.attr("translateY");
                        var B = p.attr("scaleX");
                        var r = p.attr("scaleY");
                        p.attr({
                            animator: 0
                        }).animate({
                            animator: 1
                        }, {
                            step: function(b, a) {
                                p.attr({
                                    translateX: u + (t - u) * a.pos,
                                    translateY: q + (A - q) * a.pos,
                                    scaleX: B + (k - B) * a.pos,
                                    scaleY: r + (l - r) * a.pos
                                })
                            }
                        })
                    } else p.attr({
                        translateX: t,
                        translateY: A,
                        scaleX: k,
                        scaleY: l
                    })
                }
                g.styledMode || c.element.setAttribute("stroke-width", n(b.options[b.pointAttrToOptions && b.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (k || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                l.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var b = this,
                    a = l.prototype.render;
                b.chart.renderer.isVML && 3E3 < b.data.length ? setTimeout(function() {
                    a.call(b)
                }) : a.call(b)
            },
            animate: function(b) {
                var a = this.options.animation,
                    e = this.group,
                    c = this.xAxis,
                    h = this.yAxis,
                    g = c.pos,
                    f = h.pos;
                this.chart.renderer.isSVG && (!0 === a && (a = {
                    duration: 1E3
                }), b ? e.attr({
                    translateX: g + c.len / 2,
                    translateY: f + h.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : e.animate({
                    translateX: g,
                    translateY: f,
                    scaleX: 1,
                    scaleY: 1
                }, a))
            },
            animateDrilldown: function(b) {
                var a = this.chart.plotBox,
                    e = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    c = e.bBox,
                    h = this.chart.options.drilldown.animation;
                b || (b = Math.min(c.width / a.width, c.height / a.height), e.shapeArgs = {
                    scaleX: b,
                    scaleY: b,
                    translateX: c.x,
                    translateY: c.y
                }, this.points.forEach(function(b) {
                    b.graphic && b.graphic.attr(e.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, h)
                }))
            },
            drawLegendSymbol: d.drawRectangle,
            animateDrillupFrom: function(b) {
                h.column.prototype.animateDrillupFrom.call(this,
                    b)
            },
            animateDrillupTo: function(b) {
                h.column.prototype.animateDrillupTo.call(this, b)
            }
        }), p({
            applyOptions: function(b, a) {
                var e = this.series;
                b = q.prototype.applyOptions.call(this, b, a);
                a = e.joinBy;
                e.mapData && e.mapMap && (a = q.prototype.getNestedProperty.call(b, a[1]), (a = "undefined" !== typeof a && e.mapMap[a]) ? (e.xyFromShape && (b.x = a._midX, b.y = a._midY), p(b, a)) : b.value = b.value || null);
                return b
            },
            onMouseOver: function(b) {
                f.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) q.prototype.onMouseOver.call(this,
                    b);
                else this.series.onMouseOut(b)
            },
            zoomTo: function() {
                var b = this.series;
                b.xAxis.setExtremes(this._minX, this._maxX, !1);
                b.yAxis.setExtremes(this._minY, this._maxY, !1);
                b.chart.redraw()
            }
        }, u));
        ""
    });
    v(d, "parts-map/MapLineSeries.js", [d["parts/Globals.js"], d["parts/Utilities.js"]], function(c, d) {
        d = d.seriesType;
        var p = c.seriesTypes;
        d("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(c, d) {
                c = p.map.prototype.pointAttribs.call(this,
                    c, d);
                c.fill = this.options.fillColor;
                return c
            },
            drawLegendSymbol: p.line.prototype.drawLegendSymbol
        });
        ""
    });
    v(d, "parts-map/MapPointSeries.js", [d["parts/Globals.js"]], function(c) {
        var d = c.merge,
            q = c.Point,
            f = c.Series;
        c = c.seriesType;
        c("mappoint", "scatter", {
            dataLabels: {
                crop: !1,
                defer: !1,
                enabled: !0,
                formatter: function() {
                    return this.point.name
                },
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0,
            drawDataLabels: function() {
                f.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            }
        }, {
            applyOptions: function(c, f) {
                c = "undefined" !== typeof c.lat && "undefined" !== typeof c.lon ? d(c, this.series.chart.fromLatLonToPoint(c)) : c;
                return q.prototype.applyOptions.call(this, c, f)
            }
        });
        ""
    });
    v(d, "parts-more/BubbleLegend.js", [d["parts/Globals.js"], d["parts/Color.js"], d["parts/Legend.js"], d["parts/Utilities.js"]], function(c, d, q, f) {
        "";
        var p = d.parse;
        d = f.addEvent;
        var y = f.arrayMax,
            w = f.arrayMin,
            C = f.isNumber,
            r = f.merge,
            t = f.objectEach,
            a = f.pick,
            n = f.stableSort,
            g = f.wrap,
            k = c.Series,
            u = c.Chart,
            A = c.noop,
            l = c.setOptions;
        l({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: {
                            fontSize: 10,
                            color: void 0
                        },
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: {
                        value: void 0,
                        borderColor: void 0,
                        color: void 0,
                        connectorColor: void 0
                    },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        l = function() {
            function c(b,
                a) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = A;
                this.init(b, a)
            }
            c.prototype.init = function(b, a) {
                this.options = b;
                this.visible = !0;
                this.chart = a.chart;
                this.legend = a
            };
            c.prototype.addToLegend = function(b) {
                b.splice(this.options.legendIndex, 0, this)
            };
            c.prototype.drawLegendSymbol = function(b) {
                var c = this.chart,
                    e = this.options,
                    g = a(b.options.itemDistance, 20),
                    h = e.ranges;
                var d = e.connectorDistance;
                this.fontMetrics = c.renderer.fontMetrics(e.labels.style.fontSize.toString() + "px");
                h && h.length && C(h[0].value) ? (n(h, function(b, a) {
                    return a.value - b.value
                }), this.ranges = h, this.setOptions(), this.render(), c = this.getMaxLabelSize(), h = this.ranges[0].radius, b = 2 * h, d = d - h + c.width, d = 0 < d ? d : 0, this.maxLabel = c, this.movementX = "left" === e.labels.align ? d : 0, this.legendItemWidth = b + d + g, this.legendItemHeight = b + this.fontMetrics.h / 2) : b.options.bubbleLegend.autoRanges = !0
            };
            c.prototype.setOptions = function() {
                var b = this.ranges,
                    c = this.options,
                    e = this.chart.series[c.seriesIndex],
                    h = this.legend.baseline,
                    g = {
                        "z-index": c.zIndex,
                        "stroke-width": c.borderWidth
                    },
                    d = {
                        "z-index": c.zIndex,
                        "stroke-width": c.connectorWidth
                    },
                    f = this.getLabelStyles(),
                    k = e.options.marker.fillOpacity,
                    l = this.chart.styledMode;
                b.forEach(function(m, n) {
                    l || (g.stroke = a(m.borderColor, c.borderColor, e.color), g.fill = a(m.color, c.color, 1 !== k ? p(e.color).setOpacity(k).get("rgba") : e.color), d.stroke = a(m.connectorColor, c.connectorColor,
                        e.color));
                    b[n].radius = this.getRangeRadius(m.value);
                    b[n] = r(b[n], {
                        center: b[0].radius - b[n].radius + h
                    });
                    l || r(!0, b[n], {
                        bubbleStyle: r(!1, g),
                        connectorStyle: r(!1, d),
                        labelStyle: f
                    })
                }, this)
            };
            c.prototype.getLabelStyles = function() {
                var b = this.options,
                    c = {},
                    e = "left" === b.labels.align,
                    h = this.legend.options.rtl;
                t(b.labels.style, function(b, a) {
                    "color" !== a && "fontSize" !== a && "z-index" !== a && (c[a] = b)
                });
                return r(!1, c, {
                    "font-size": b.labels.style.fontSize,
                    fill: a(b.labels.style.color, "#000000"),
                    "z-index": b.zIndex,
                    align: h || e ? "right" : "left"
                })
            };
            c.prototype.getRangeRadius = function(b) {
                var a = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, a.ranges[a.ranges.length - 1].value, a.ranges[0].value, a.minSize, a.maxSize, b)
            };
            c.prototype.render = function() {
                var b = this.chart.renderer,
                    a = this.options.zThreshold;
                this.symbols || (this.symbols = {
                    connectors: [],
                    bubbleItems: [],
                    labels: []
                });
                this.legendSymbol = b.g("bubble-legend");
                this.legendItem = b.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY =
                    0;
                this.ranges.forEach(function(b) {
                    b.value >= a && this.renderRange(b)
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            };
            c.prototype.renderRange = function(b) {
                var a = this.options,
                    e = a.labels,
                    c = this.chart.renderer,
                    h = this.symbols,
                    g = h.labels,
                    d = b.center,
                    f = Math.abs(b.radius),
                    k = a.connectorDistance || 0,
                    l = e.align,
                    n = e.style.fontSize;
                k = this.legend.options.rtl || "left" === l ? -k : k;
                e = a.connectorWidth;
                var t = this.ranges[0].radius || 0,
                    A = d - f - a.borderWidth / 2 + e / 2;
                n =
                    n / 2 - (this.fontMetrics.h - n) / 2;
                var p = c.styledMode;
                "center" === l && (k = 0, a.connectorDistance = 0, b.labelStyle.align = "center");
                l = A + a.labels.y;
                var u = t + k + a.labels.x;
                h.bubbleItems.push(c.circle(t, d + ((A % 1 ? 1 : .5) - (e % 2 ? 0 : .5)), f).attr(p ? {} : b.bubbleStyle).addClass((p ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (a.className || "")).add(this.legendSymbol));
                h.connectors.push(c.path(c.crispLine([
                    ["M", t, A],
                    ["L", t + k, A]
                ], a.connectorWidth)).attr(p ? {} : b.connectorStyle).addClass((p ?
                    "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (a.connectorClassName || "")).add(this.legendSymbol));
                b = c.text(this.formatLabel(b), u, l + n).attr(p ? {} : b.labelStyle).addClass("highcharts-bubble-legend-labels " + (a.labels.className || "")).add(this.legendSymbol);
                g.push(b);
                b.placed = !0;
                b.alignAttr = {
                    x: u,
                    y: l + n
                }
            };
            c.prototype.getMaxLabelSize = function() {
                var b, a;
                this.symbols.labels.forEach(function(e) {
                    a = e.getBBox(!0);
                    b = b ? a.width > b.width ? a : b : a
                });
                return b || {}
            };
            c.prototype.formatLabel =
                function(b) {
                    var a = this.options,
                        e = a.labels.formatter;
                    a = a.labels.format;
                    var c = this.chart.numberFormatter;
                    return a ? f.format(a, b) : e ? e.call(b) : c(b.value, 1)
                };
            c.prototype.hideOverlappingLabels = function() {
                var b = this.chart,
                    a = this.symbols;
                !this.options.labels.allowOverlap && a && (b.hideOverlappingLabels(a.labels), a.labels.forEach(function(b, c) {
                    b.newOpacity ? b.newOpacity !== b.oldOpacity && a.connectors[c].show() : a.connectors[c].hide()
                }))
            };
            c.prototype.getRanges = function() {
                var b = this.legend.bubbleLegend,
                    c = b.options.ranges,
                    e, h = Number.MAX_VALUE,
                    g = -Number.MAX_VALUE;
                b.chart.series.forEach(function(b) {
                    b.isBubble && !b.ignoreSeries && (e = b.zData.filter(C), e.length && (h = a(b.options.zMin, Math.min(h, Math.max(w(e), !1 === b.options.displayNegative ? b.options.zThreshold : -Number.MAX_VALUE))), g = a(b.options.zMax, Math.max(g, y(e)))))
                });
                var d = h === g ? [{
                    value: g
                }] : [{
                    value: h
                }, {
                    value: (h + g) / 2
                }, {
                    value: g,
                    autoRanges: !0
                }];
                c.length && c[0].radius && d.reverse();
                d.forEach(function(b, a) {
                    c && c[a] && (d[a] = r(!1, c[a], b))
                });
                return d
            };
            c.prototype.predictBubbleSizes =
                function() {
                    var b = this.chart,
                        a = this.fontMetrics,
                        c = b.legend.options,
                        h = "horizontal" === c.layout,
                        g = h ? b.legend.lastLineHeight : 0,
                        d = b.plotSizeX,
                        f = b.plotSizeY,
                        k = b.series[this.options.seriesIndex];
                    b = Math.ceil(k.minPxSize);
                    var l = Math.ceil(k.maxPxSize);
                    k = k.options.maxSize;
                    var n = Math.min(f, d);
                    if (c.floating || !/%$/.test(k)) a = l;
                    else if (k = parseFloat(k), a = (n + g - a.h / 2) * k / 100 / (k / 100 + 1), h && f - a >= d || !h && d - a >= f) a = l;
                    return [b, Math.ceil(a)]
                };
            c.prototype.updateRanges = function(b, a) {
                var c = this.legend.options.bubbleLegend;
                c.minSize =
                    b;
                c.maxSize = a;
                c.ranges = this.getRanges()
            };
            c.prototype.correctSizes = function() {
                var b = this.legend,
                    a = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(a.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, a.maxPxSize), b.render())
            };
            return c
        }();
        d(q, "afterGetAllItems", function(a) {
            var b = this.bubbleLegend,
                h = this.options,
                e = h.bubbleLegend,
                g = this.chart.getVisibleBubbleSeriesIndex();
            b && b.ranges && b.ranges.length && (e.ranges.length && (e.autoRanges = !!e.ranges[0].autoRanges), this.destroyItem(b));
            0 <= g && h.enabled && e.enabled && (e.seriesIndex = g, this.bubbleLegend = new c.BubbleLegend(e, this), this.bubbleLegend.addToLegend(a.allItems))
        });
        u.prototype.getVisibleBubbleSeriesIndex = function() {
            for (var a = this.series, b = 0; b < a.length;) {
                if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length) return b;
                b++
            }
            return -1
        };
        q.prototype.getLinesHeights = function() {
            var a = this.allItems,
                b = [],
                c = a.length,
                e, g = 0;
            for (e = 0; e < c; e++)
                if (a[e].legendItemHeight && (a[e].itemHeight = a[e].legendItemHeight), a[e] === a[c - 1] || a[e + 1] && a[e]._legendItemPos[1] !==
                    a[e + 1]._legendItemPos[1]) {
                    b.push({
                        height: 0
                    });
                    var d = b[b.length - 1];
                    for (g; g <= e; g++) a[g].itemHeight > d.height && (d.height = a[g].itemHeight);
                    d.step = e
                }
            return b
        };
        q.prototype.retranslateItems = function(a) {
            var b, c, e, g = this.options.rtl,
                d = 0;
            this.allItems.forEach(function(h, f) {
                b = h.legendGroup.translateX;
                c = h._legendItemPos[1];
                if ((e = h.movementX) || g && h.ranges) e = g ? b - h.options.maxSize / 2 : b + e, h.legendGroup.attr({
                    translateX: e
                });
                f > a[d].step && d++;
                h.legendGroup.attr({
                    translateY: Math.round(c + a[d].height / 2)
                });
                h._legendItemPos[1] =
                    c + a[d].height / 2
            })
        };
        d(k, "legendItemClick", function() {
            var a = this.chart,
                b = this.visible,
                c = this.chart.legend;
            c && c.bubbleLegend && (this.visible = !b, this.ignoreSeries = b, a = 0 <= a.getVisibleBubbleSeriesIndex(), c.bubbleLegend.visible !== a && (c.update({
                bubbleLegend: {
                    enabled: a
                }
            }), c.bubbleLegend.visible = a), this.visible = b)
        });
        g(u.prototype, "drawChartBox", function(a, b, c) {
            var e = this.legend,
                g = 0 <= this.getVisibleBubbleSeriesIndex();
            if (e && e.options.enabled && e.bubbleLegend && e.options.bubbleLegend.autoRanges && g) {
                var d = e.bubbleLegend.options;
                g = e.bubbleLegend.predictBubbleSizes();
                e.bubbleLegend.updateRanges(g[0], g[1]);
                d.placed || (e.group.placed = !1, e.allItems.forEach(function(a) {
                    a.legendGroup.translateY = null
                }));
                e.render();
                this.getMargins();
                this.axes.forEach(function(a) {
                    a.visible && a.render();
                    d.placed || (a.setScale(), a.updateNames(), t(a.ticks, function(a) {
                        a.isNew = !0;
                        a.isNewLabel = !0
                    }))
                });
                d.placed = !0;
                this.getMargins();
                a.call(this, b, c);
                e.bubbleLegend.correctSizes();
                e.retranslateItems(e.getLinesHeights())
            } else a.call(this, b, c), e && e.options.enabled &&
                e.bubbleLegend && (e.render(), e.retranslateItems(e.getLinesHeights()))
        });
        c.BubbleLegend = l;
        return c.BubbleLegend
    });
    v(d, "parts-more/BubbleSeries.js", [d["parts/Globals.js"], d["parts/Color.js"], d["parts/Point.js"], d["parts/Utilities.js"]], function(c, d, q, f) {
        var p = d.parse,
            y = f.arrayMax,
            w = f.arrayMin,
            C = f.clamp,
            r = f.extend,
            t = f.isNumber,
            a = f.pick,
            n = f.pInt;
        d = f.seriesType;
        f = c.Axis;
        var g = c.noop,
            k = c.Series,
            u = c.seriesTypes;
        d("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            animationLimit: 250,
            marker: {
                lineColor: null,
                lineWidth: 1,
                fillOpacity: .5,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            isBubble: !0,
            pointAttribs: function(a,
                c) {
                var g = this.options.marker.fillOpacity;
                a = k.prototype.pointAttribs.call(this, a, c);
                1 !== g && (a.fill = p(a.fill).setOpacity(g).get("rgba"));
                return a
            },
            getRadii: function(a, c, g) {
                var b = this.zData,
                    d = this.yData,
                    e = g.minPxSize,
                    h = g.maxPxSize,
                    f = [];
                var k = 0;
                for (g = b.length; k < g; k++) {
                    var l = b[k];
                    f.push(this.getRadius(a, c, e, h, l, d[k]))
                }
                this.radii = f
            },
            getRadius: function(a, c, g, b, d, e) {
                var h = this.options,
                    f = "width" !== h.sizeBy,
                    k = h.zThreshold,
                    l = c - a,
                    n = .5;
                if (null === e || null === d) return null;
                if (t(d)) {
                    h.sizeByAbsoluteValue && (d = Math.abs(d -
                        k), l = Math.max(c - k, Math.abs(a - k)), a = 0);
                    if (d < a) return g / 2 - 1;
                    0 < l && (n = (d - a) / l)
                }
                f && 0 <= n && (n = Math.sqrt(n));
                return Math.ceil(g + n * (b - g)) / 2
            },
            animate: function(a) {
                !a && this.points.length < this.options.animationLimit && this.points.forEach(function(a) {
                    var c = a.graphic;
                    if (c && c.width) {
                        var b = {
                            x: c.x,
                            y: c.y,
                            width: c.width,
                            height: c.height
                        };
                        c.attr({
                            x: a.plotX,
                            y: a.plotY,
                            width: 1,
                            height: 1
                        });
                        c.animate(b, this.options.animation)
                    }
                }, this)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            translate: function() {
                var a, c = this.data,
                    g = this.radii;
                u.scatter.prototype.translate.call(this);
                for (a = c.length; a--;) {
                    var b = c[a];
                    var d = g ? g[a] : 0;
                    t(d) && d >= this.minPxSize / 2 ? (b.marker = r(b.marker, {
                        radius: d,
                        width: 2 * d,
                        height: 2 * d
                    }), b.dlBox = {
                        x: b.plotX - d,
                        y: b.plotY - d,
                        width: 2 * d,
                        height: 2 * d
                    }) : b.shapeArgs = b.plotY = b.dlBox = void 0
                }
            },
            alignDataLabel: u.column.prototype.alignDataLabel,
            buildKDTree: g,
            applyZones: g
        }, {
            haloPath: function(a) {
                return q.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            },
            ttBelow: !1
        });
        f.prototype.beforePadding = function() {
            var c =
                this,
                g = this.len,
                d = this.chart,
                b = 0,
                f = g,
                e = this.isXAxis,
                k = e ? "xData" : "yData",
                p = this.min,
                u = {},
                q = Math.min(d.plotWidth, d.plotHeight),
                r = Number.MAX_VALUE,
                B = -Number.MAX_VALUE,
                v = this.max - p,
                E = g / v,
                F = [];
            this.series.forEach(function(b) {
                var g = b.options;
                !b.bubblePadding || !b.visible && d.options.chart.ignoreHiddenSeries || (c.allowZoomOutside = !0, F.push(b), e && (["minSize", "maxSize"].forEach(function(a) {
                        var b = g[a],
                            c = /%$/.test(b);
                        b = n(b);
                        u[a] = c ? q * b / 100 : b
                    }), b.minPxSize = u.minSize, b.maxPxSize = Math.max(u.maxSize, u.minSize), b = b.zData.filter(t),
                    b.length && (r = a(g.zMin, C(w(b), !1 === g.displayNegative ? g.zThreshold : -Number.MAX_VALUE, r)), B = a(g.zMax, Math.max(B, y(b))))))
            });
            F.forEach(function(a) {
                var g = a[k],
                    d = g.length;
                e && a.getRadii(r, B, a);
                if (0 < v)
                    for (; d--;)
                        if (t(g[d]) && c.dataMin <= g[d] && g[d] <= c.max) {
                            var h = a.radii ? a.radii[d] : 0;
                            b = Math.min((g[d] - p) * E - h, b);
                            f = Math.max((g[d] - p) * E + h, f)
                        }
            });
            F.length && 0 < v && !this.logarithmic && (f -= g, E *= (g + Math.max(0, b) - Math.min(f, g)) / g, [
                ["min", "userMin", b],
                ["max", "userMax", f]
            ].forEach(function(b) {
                "undefined" === typeof a(c.options[b[0]],
                    c[b[1]]) && (c[b[0]] += b[2] / E)
            }))
        };
        ""
    });
    v(d, "parts-map/MapBubbleSeries.js", [d["parts/Globals.js"], d["parts/Point.js"], d["parts/Utilities.js"]], function(c, d, q) {
        var f = q.merge;
        q = q.seriesType;
        var p = c.seriesTypes;
        p.bubble && q("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: p.map.prototype.getMapData,
            getBox: p.map.prototype.getBox,
            setData: p.map.prototype.setData,
            setOptions: p.map.prototype.setOptions
        }, {
            applyOptions: function(c,
                q) {
                return c && "undefined" !== typeof c.lat && "undefined" !== typeof c.lon ? d.prototype.applyOptions.call(this, f(c, this.series.chart.fromLatLonToPoint(c)), q) : p.map.prototype.pointClass.prototype.applyOptions.call(this, c, q)
            },
            isValid: function() {
                return "number" === typeof this.z
            },
            ttBelow: !1
        });
        ""
    });
    v(d, "parts-map/HeatmapSeries.js", [d["parts/Globals.js"], d["mixins/legend-symbol.js"], d["parts/Utilities.js"]], function(c, d, q) {
        var f = q.clamp,
            p = q.extend,
            y = q.fireEvent,
            w = q.isNumber,
            v = q.merge,
            r = q.pick;
        q = q.seriesType;
        var t =
            c.colorMapPointMixin,
            a = c.Series,
            n = c.SVGRenderer.prototype.symbols;
        q("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: {
                symbol: "rect",
                radius: 0,
                lineColor: void 0,
                states: {
                    hover: {
                        lineWidthPlus: 0
                    },
                    select: {}
                }
            },
            clip: !0,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
            },
            states: {
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, v(c.colorMapSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                a.prototype.init.apply(this, arguments);
                var c = this.options;
                c.pointRange = r(c.pointRange, c.colsize || 1);
                this.yAxis.axisPointRange = c.rowsize || 1;
                p(n, {
                    ellipse: n.circle,
                    rect: n.square
                })
            },
            getSymbol: a.prototype.getSymbol,
            setClip: function(c) {
                var g = this.chart;
                a.prototype.setClip.apply(this, arguments);
                (!1 !== this.options.clip || c) && this.markerGroup.clip((c || this.clipBox) && this.sharedClipKey ? g[this.sharedClipKey] :
                    g.clipRect)
            },
            translate: function() {
                var a = this.options,
                    c = a.marker && a.marker.symbol || "",
                    d = n[c] ? c : "rect";
                a = this.options;
                var f = -1 !== ["circle", "square"].indexOf(d);
                this.generatePoints();
                this.points.forEach(function(a) {
                    var g = a.getCellAttributes(),
                        b = {
                            x: Math.min(g.x1, g.x2),
                            y: Math.min(g.y1, g.y2),
                            width: Math.max(Math.abs(g.x2 - g.x1), 0),
                            height: Math.max(Math.abs(g.y2 - g.y1), 0)
                        };
                    var k = a.hasImage = 0 === (a.marker && a.marker.symbol || c || "").indexOf("url");
                    if (f) {
                        var e = Math.abs(b.width - b.height);
                        b.x = Math.min(g.x1, g.x2) + (b.width <
                            b.height ? 0 : e / 2);
                        b.y = Math.min(g.y1, g.y2) + (b.width < b.height ? e / 2 : 0);
                        b.width = b.height = Math.min(b.width, b.height)
                    }
                    e = {
                        plotX: (g.x1 + g.x2) / 2,
                        plotY: (g.y1 + g.y2) / 2,
                        clientX: (g.x1 + g.x2) / 2,
                        shapeType: "path",
                        shapeArgs: v(!0, b, {
                            d: n[d](b.x, b.y, b.width, b.height)
                        })
                    };
                    k && (a.marker = {
                        width: b.width,
                        height: b.height
                    });
                    p(a, e)
                });
                y(this, "afterTranslate")
            },
            pointAttribs: function(g, d) {
                var f = a.prototype.pointAttribs.call(this, g, d),
                    k = this.options || {},
                    n = this.chart.options.plotOptions || {},
                    h = n.series || {},
                    b = n.heatmap || {};
                n = k.borderColor ||
                    b.borderColor || h.borderColor;
                h = k.borderWidth || b.borderWidth || h.borderWidth || f["stroke-width"];
                f.stroke = g && g.marker && g.marker.lineColor || k.marker && k.marker.lineColor || n || this.color;
                f["stroke-width"] = h;
                d && (g = v(k.states[d], k.marker && k.marker.states[d], g.options.states && g.options.states[d] || {}), d = g.brightness, f.fill = g.color || c.color(f.fill).brighten(d || 0).get(), f.stroke = g.lineColor);
                return f
            },
            markerAttribs: function(a, c) {
                var g = a.marker || {},
                    d = this.options.marker || {},
                    f = a.shapeArgs || {},
                    k = {};
                if (a.hasImage) return {
                    x: a.plotX,
                    y: a.plotY
                };
                if (c) {
                    var b = d.states[c] || {};
                    var n = g.states && g.states[c] || {};
                    [
                        ["width", "x"],
                        ["height", "y"]
                    ].forEach(function(a) {
                        k[a[0]] = (n[a[0]] || b[a[0]] || f[a[0]]) + (n[a[0] + "Plus"] || b[a[0] + "Plus"] || 0);
                        k[a[1]] = f[a[1]] + (f[a[0]] - k[a[0]]) / 2
                    })
                }
                return c ? k : f
            },
            drawPoints: function() {
                var c = this;
                if ((this.options.marker || {}).enabled || this._hasPointMarkers) a.prototype.drawPoints.call(this), this.points.forEach(function(a) {
                    a.graphic && a.graphic[c.chart.styledMode ? "css" : "animate"](c.colorAttribs(a))
                })
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            getValidPoints: function(c, d) {
                return a.prototype.getValidPoints.call(this, c, d, !0)
            },
            getBox: c.noop,
            drawLegendSymbol: d.drawRectangle,
            alignDataLabel: c.seriesTypes.column.prototype.alignDataLabel,
            getExtremes: function() {
                var c = a.prototype.getExtremes.call(this, this.valueData),
                    d = c.dataMin;
                c = c.dataMax;
                w(d) && (this.valueMin = d);
                w(c) && (this.valueMax = c);
                return a.prototype.getExtremes.call(this)
            }
        }), v(t, {
            applyOptions: function(a, d) {
                a = c.Point.prototype.applyOptions.call(this, a, d);
                a.formatPrefix = a.isNull || null === a.value ?
                    "null" : "point";
                return a
            },
            isValid: function() {
                return Infinity !== this.value && -Infinity !== this.value
            },
            haloPath: function(a) {
                if (!a) return [];
                var c = this.shapeArgs;
                return ["M", c.x - a, c.y - a, "L", c.x - a, c.y + c.height + a, c.x + c.width + a, c.y + c.height + a, c.x + c.width + a, c.y - a, "Z"]
            },
            getCellAttributes: function() {
                var a = this.series,
                    c = a.options,
                    d = (c.colsize || 1) / 2,
                    n = (c.rowsize || 1) / 2,
                    l = a.xAxis,
                    h = a.yAxis,
                    b = this.options.marker || a.options.marker;
                a = a.pointPlacementToXValue();
                var m = r(this.pointPadding, c.pointPadding, 0),
                    e = {
                        x1: f(Math.round(l.len -
                            (l.translate(this.x - d, !1, !0, !1, !0, -a) || 0)), -l.len, 2 * l.len),
                        x2: f(Math.round(l.len - (l.translate(this.x + d, !1, !0, !1, !0, -a) || 0)), -l.len, 2 * l.len),
                        y1: f(Math.round(h.translate(this.y - n, !1, !0, !1, !0) || 0), -h.len, 2 * h.len),
                        y2: f(Math.round(h.translate(this.y + n, !1, !0, !1, !0) || 0), -h.len, 2 * h.len)
                    };
                [
                    ["width", "x"],
                    ["height", "y"]
                ].forEach(function(a) {
                    var c = a[0];
                    a = a[1];
                    var d = a + "1",
                        g = a + "2",
                        f = Math.abs(e[d] - e[g]),
                        k = b && b.lineWidth || 0,
                        h = Math.abs(e[d] + e[g]) / 2;
                    b[c] && b[c] < f && (e[d] = h - b[c] / 2 - k / 2, e[g] = h + b[c] / 2 + k / 2);
                    m && ("y" === a &&
                        (d = g, g = a + "1"), e[d] += m, e[g] -= m)
                });
                return e
            }
        }));
        ""
    });
    v(d, "parts-map/GeoJSON.js", [d["parts/Globals.js"], d["parts/Utilities.js"]], function(c, d) {
        function p(c, a) {
            var d, g = !1,
                f = c.x,
                p = c.y;
            c = 0;
            for (d = a.length - 1; c < a.length; d = c++) {
                var t = a[c][1] > p;
                var l = a[d][1] > p;
                t !== l && f < (a[d][0] - a[c][0]) * (p - a[c][1]) / (a[d][1] - a[c][1]) + a[c][0] && (g = !g)
            }
            return g
        }
        var f = d.error,
            v = d.extend,
            y = d.format,
            w = d.merge;
        d = d.wrap;
        var C = c.Chart,
            r = c.win;
        C.prototype.transformFromLatLon = function(c, a) {
            var d, g = (null === (d = this.userOptions.chart) || void 0 ===
                d ? void 0 : d.proj4) || r.proj4;
            if (!g) return f(21, !1, this), {
                x: 0,
                y: null
            };
            c = g(a.crs, [c.lon, c.lat]);
            d = a.cosAngle || a.rotation && Math.cos(a.rotation);
            g = a.sinAngle || a.rotation && Math.sin(a.rotation);
            c = a.rotation ? [c[0] * d + c[1] * g, -c[0] * g + c[1] * d] : c;
            return {
                x: ((c[0] - (a.xoffset || 0)) * (a.scale || 1) + (a.xpan || 0)) * (a.jsonres || 1) + (a.jsonmarginX || 0),
                y: (((a.yoffset || 0) - c[1]) * (a.scale || 1) + (a.ypan || 0)) * (a.jsonres || 1) - (a.jsonmarginY || 0)
            }
        };
        C.prototype.transformToLatLon = function(c, a) {
            if ("undefined" === typeof r.proj4) f(21, !1, this);
            else {
                c = {
                    x: ((c.x - (a.jsonmarginX || 0)) / (a.jsonres || 1) - (a.xpan || 0)) / (a.scale || 1) + (a.xoffset || 0),
                    y: ((-c.y - (a.jsonmarginY || 0)) / (a.jsonres || 1) + (a.ypan || 0)) / (a.scale || 1) + (a.yoffset || 0)
                };
                var d = a.cosAngle || a.rotation && Math.cos(a.rotation),
                    g = a.sinAngle || a.rotation && Math.sin(a.rotation);
                a = r.proj4(a.crs, "WGS84", a.rotation ? {
                    x: c.x * d + c.y * -g,
                    y: c.x * g + c.y * d
                } : c);
                return {
                    lat: a.y,
                    lon: a.x
                }
            }
        };
        C.prototype.fromPointToLatLon = function(c) {
            var a = this.mapTransforms,
                d;
            if (a) {
                for (d in a)
                    if (Object.hasOwnProperty.call(a, d) && a[d].hitZone &&
                        p({
                            x: c.x,
                            y: -c.y
                        }, a[d].hitZone.coordinates[0])) return this.transformToLatLon(c, a[d]);
                return this.transformToLatLon(c, a["default"])
            }
            f(22, !1, this)
        };
        C.prototype.fromLatLonToPoint = function(c) {
            var a = this.mapTransforms,
                d;
            if (!a) return f(22, !1, this), {
                x: 0,
                y: null
            };
            for (d in a)
                if (Object.hasOwnProperty.call(a, d) && a[d].hitZone) {
                    var g = this.transformFromLatLon(c, a[d]);
                    if (p({
                            x: g.x,
                            y: -g.y
                        }, a[d].hitZone.coordinates[0])) return g
                }
            return this.transformFromLatLon(c, a["default"])
        };
        c.geojson = function(c, a, d) {
            var g = [],
                f = [],
                n = function(a) {
                    a.forEach(function(a, c) {
                        0 === c ? f.push(["M", a[0], -a[1]]) : f.push(["L", a[0], -a[1]])
                    })
                };
            a = a || "map";
            c.features.forEach(function(c) {
                var d = c.geometry,
                    h = d.type;
                d = d.coordinates;
                c = c.properties;
                var b;
                f = [];
                "map" === a || "mapbubble" === a ? ("Polygon" === h ? (d.forEach(n), f.push(["Z"])) : "MultiPolygon" === h && (d.forEach(function(a) {
                        a.forEach(n)
                    }), f.push(["Z"])), f.length && (b = {
                        path: f
                    })) : "mapline" === a ? ("LineString" === h ? n(d) : "MultiLineString" === h && d.forEach(n), f.length && (b = {
                        path: f
                    })) : "mappoint" === a && "Point" === h &&
                    (b = {
                        x: d[0],
                        y: -d[1]
                    });
                b && g.push(v(b, {
                    name: c.name || c.NAME,
                    properties: c
                }))
            });
            d && c.copyrightShort && (d.chart.mapCredits = y(d.chart.options.credits.mapText, {
                geojson: c
            }), d.chart.mapCreditsFull = y(d.chart.options.credits.mapTextFull, {
                geojson: c
            }));
            return g
        };
        d(C.prototype, "addCredits", function(c, a) {
            a = w(!0, this.options.credits, a);
            this.mapCredits && (a.href = null);
            c.call(this, a);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    });
    v(d, "parts-map/Map.js", [d["parts/Globals.js"], d["parts/Utilities.js"]],
        function(c, d) {
            function p(a, c, d, f, p, q, l, h) {
                return [
                    ["M", a + p, c],
                    ["L", a + d - q, c],
                    ["C", a + d - q / 2, c, a + d, c + q / 2, a + d, c + q],
                    ["L", a + d, c + f - l],
                    ["C", a + d, c + f - l / 2, a + d - l / 2, c + f, a + d - l, c + f],
                    ["L", a + h, c + f],
                    ["C", a + h / 2, c + f, a, c + f - h / 2, a, c + f - h],
                    ["L", a, c + p],
                    ["C", a, c + p / 2, a + p / 2, c, a + p, c],
                    ["Z"]
                ]
            }
            var f = d.extend,
                v = d.merge,
                y = d.pick,
                w = c.Chart;
            d = c.defaultOptions;
            var C = c.Renderer,
                r = c.SVGRenderer,
                t = c.VMLRenderer;
            f(d.lang, {
                zoomIn: "Zoom in",
                zoomOut: "Zoom out"
            });
            d.mapNavigation = {
                buttonOptions: {
                    alignTo: "plotBox",
                    align: "left",
                    verticalAlign: "top",
                    x: 0,
                    width: 18,
                    height: 18,
                    padding: 5,
                    style: {
                        fontSize: "15px",
                        fontWeight: "bold"
                    },
                    theme: {
                        "stroke-width": 1,
                        "text-align": "center"
                    }
                },
                buttons: {
                    zoomIn: {
                        onclick: function() {
                            this.mapZoom(.5)
                        },
                        text: "+",
                        y: 0
                    },
                    zoomOut: {
                        onclick: function() {
                            this.mapZoom(2)
                        },
                        text: "-",
                        y: 28
                    }
                },
                mouseWheelSensitivity: 1.1
            };
            c.splitPath = function(a) {
                "string" === typeof a && (a = a.replace(/([A-Za-z])/g, " $1 ").replace(/^\s*/, "").replace(/\s*$/, ""), a = a.split(/[ ,;]+/).map(function(a) {
                    return /[A-za-z]/.test(a) ? a : parseFloat(a)
                }));
                return r.prototype.pathToSegments(a)
            };
            c.maps = {};
            r.prototype.symbols.topbutton = function(a, c, d, f, q) {
                return p(a - 1, c - 1, d, f, q.r, q.r, 0, 0)
            };
            r.prototype.symbols.bottombutton = function(a, c, d, f, q) {
                return p(a - 1, c - 1, d, f, 0, 0, q.r, q.r)
            };
            C === t && ["topbutton", "bottombutton"].forEach(function(a) {
                t.prototype.symbols[a] = r.prototype.symbols[a]
            });
            c.Map = c.mapChart = function(a, d, f) {
                var g = "string" === typeof a || a.nodeName,
                    n = arguments[g ? 1 : 0],
                    p = n,
                    l = {
                        endOnTick: !1,
                        visible: !1,
                        minPadding: 0,
                        maxPadding: 0,
                        startOnTick: !1
                    },
                    h = c.getOptions().credits;
                var b = n.series;
                n.series = null;
                n = v({
                    chart: {
                        panning: {
                            enabled: !0,
                            type: "xy"
                        },
                        type: "map"
                    },
                    credits: {
                        mapText: y(h.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                        mapTextFull: y(h.mapTextFull, "{geojson.copyright}")
                    },
                    tooltip: {
                        followTouchMove: !1
                    },
                    xAxis: l,
                    yAxis: v(l, {
                        reversed: !0
                    })
                }, n, {
                    chart: {
                        inverted: !1,
                        alignTicks: !1
                    }
                });
                n.series = p.series = b;
                return g ? new w(a, n, f) : new w(n, d)
            }
        });
    v(d, "masters/modules/map.src.js", [], function() {})
});
//# sourceMappingURL=map.js.map