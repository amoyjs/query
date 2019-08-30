(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@amoy/query-event')) :
    typeof define === 'function' && define.amd ? define(['exports', '@amoy/query-event'], factory) :
    (global = global || self, factory(global.query = {}, global.queryEvent));
}(this, function (exports, queryEvent) { 'use strict';

    queryEvent = queryEvent && queryEvent.hasOwnProperty('default') ? queryEvent['default'] : queryEvent;

    /**
     * show
     *
     * show the selected item
     *
     * @module query/show
     *
     * @example
     *
     * $('text').show()
     */
    function show() {
        for (var i = 0; i < this.length; i++) {
            this[i].visible = true;
        }
        return this;
    }
    /**
     * hide
     *
     * hide the selected item
     *
     * @module query/hide
     *
     * @example
     *
     * $('text').hide()
     */
    function hide() {
        for (var i = 0; i < this.length; i++) {
            this[i].visible = false;
        }
        return this;
    }
    /**
     * get
     *
     * get item by index or get a collection for selected items
     *
     * @module query/get
     *
     * @param index
     *
     * @example
     *
     * $('text').get()
     * // or
     * $('text').get(0)
     */
    function get(index) {
        if (index) {
            return this[index];
        }
        else {
            var pure = [];
            for (var i = 0; i < this.length; i++) {
                pure.push(this[i]);
            }
            return pure;
        }
    }
    /**
     * width
     *
     * if param `width` is type of number,
     * `width()` will set selected items' width property
     * else return the first selected item's width value
     *
     * @module query/width
     *
     * @param { Number } width
     *
     * @example
     *
     * $('text').width()
     */
    function width(width) {
        if (typeof width === 'number') {
            for (var i = 0; i < this.length; i++) {
                this[i].width = width;
            }
        }
        else {
            return this[0].width;
        }
    }
    /**
     * height
     *
     * if param `height` is type of number,
     * `height()` will set selected items' height property
     * else return the first selected item's height value
     *
     * @module query/height
     *
     * @param { Number } height
     *
     * @example
     *
     * $('text').height()
     */
    function height(height) {
        if (typeof height === 'number') {
            for (var i = 0; i < this.length; i++) {
                this[i].height = height;
            }
        }
        else {
            return this[0].height;
        }
    }
    /**
     * position
     *
     * return the first selected item's coordanites
     *
     * @module query/position
     *
     * @example
     *
     * $('text').position()
     */
    function position() {
        if (this[0]) {
            return {
                x: this[0].x,
                y: this[0].y,
            };
        }
        else {
            return null;
        }
    }
    /**
     * children
     *
     * return the first selected item's children
     *
     * @module query/children
     *
     * @example
     *
     * $('text').children()
     */
    function children() {
        return this[0] ? this[0].children : [];
    }
    /**
     * count
     *
     * return the selected items' count
     *
     * @module query/count
     *
     * @example
     *
     * $('text').count()
     */
    function count() {
        return this.length;
    }
    /**
     * first
     *
     * return the first selected item
     *
     * @module query/first
     *
     * @example
     *
     * $('text').first()
     *
     * @example
     *
     * $('text').first()
     */
    function first() {
        return this[0];
    }
    /**
     * last
     *
     * return the last selected item
     *
     * @module query/last
     *
     * @example
     *
     * $('text').last()
     */
    function last() {
        return this[this.length - 1];
    }
    /**
     * each
     *
     * @module query/each
     *
     * @param { Function } closure - executeable functoin
     *
     * @example
     *
     * $('text').each(item => {
     *     $(item).hide()
     * })
     */
    function each(closure) {
        for (var i = 0; i < this.length; i++) {
            closure(this[i], i);
        }
    }
    /**
     * empty
     *
     * remove the selected items' children
     *
     * @module query/empty
     *
     * @example
     *
     * $('text').empty()
     */
    function empty() {
        for (var i = 0; i < this.length; i++) {
            this[i].removeChildren();
        }
    }
    /**
     * parent
     *
     * if the first selected item's parent exist, return it, else return `null`
     *
     * @module query/parent
     *
     * @example
     *
     * $('text').parent()
     */
    function parent() {
        return this[0] ? this[0].parent : null;
    }
    function attr(key, value) {
        if (this[0]) {
            if (value) {
                this[0][key] = value;
                return this[0];
            }
            else {
                return this[0][key];
            }
        }
    }
    function text() {
        if (this[0]) {
            if (this[0].text) {
                return this[0].text;
            }
            else if (this[0].children && this[0].children[0].text) {
                return this[0].children[0].text;
            }
        }
        else {
            return null;
        }
    }
    function find() {
        console.log('find() not support yet');
    }
    function prev() {
        var _this = this;
        if (this[0] && this[0].parent && this[0].parent.children.length) {
            return this[0].parent.children.filter(function (v, i) {
                if (v === _this[0]) {
                    return _this[0].parent.children[i - 1];
                }
            })[0];
        }
    }
    function next() {
        var _this = this;
        if (this[0] && this[0].parent && this[0].parent.children.length) {
            return this[0].parent.children.filter(function (v, i) {
                if (v === _this[0]) {
                    return _this[0].parent.children[i + 1];
                }
            })[0];
        }
    }

    var instance = /*#__PURE__*/Object.freeze({
        show: show,
        hide: hide,
        get: get,
        width: width,
        height: height,
        position: position,
        children: children,
        count: count,
        first: first,
        last: last,
        each: each,
        empty: empty,
        parent: parent,
        attr: attr,
        text: text,
        find: find,
        prev: prev,
        next: next
    });

    var fns = [];
    function use(fn) {
        fns.push(fn);
    }

    /**
     * extend
     *
     * query extend method
     *
     * @module query/extend
     *
     * @param { Object | Array } target - extend target
     *
     * @example
     *
     * import query from '@amoy/query'
     *
     * query.extend({
     *     hide() {
     *         for (let i = 0; i < this.length; i++) {
     *             // hide all the selected items
     *             this[i].visible = false
     *         }
     *     },
     * })
     *
     * $('some query').hide()
     */
    function extend(target) {
        var _this = this;
        if (target === void 0) { target = []; }
        if (Array.isArray(target)) {
            target.map(function (item) { return extend.bind(_this)(item); });
        }
        else if (typeof target === 'object') {
            Object.assign(this.prototype, target);
        }
        else {
            console.error("query extension's type must be \"object\" or \"object[]\"");
        }
    }

    function sprite(target) {
        return typeof target._anchor !== 'undefined' && typeof target._font === 'undefined';
    }
    function text$1(target) {
        return typeof target._font === 'string';
    }
    function container(target) {
        return typeof target.anchor === 'undefined';
    }

    var is = /*#__PURE__*/Object.freeze({
        sprite: sprite,
        text: text$1,
        container: container
    });

    function createQuery(stage, query) {
        return function (selector) {
            var com = [];
            // @ts-ignore
            var any = fns.reduce(function (prev, current) { return current(prev, query); }, selector);
            var type = typeof any;
            switch (type) {
                case 'string':
                    selector = any.trim();
                    if (['container', 'sprite', 'text'].includes(selector)) {
                        com.push.apply(com, getTypedItem(selector, get$1(stage)));
                    }
                    else {
                        var parsed = parseStringQuery(selector);
                        parsed.map(function (item) { return com.push.apply(com, findBy(item.key, item.value, get$1(stage))); });
                    }
                    break;
                case 'object':
                    com.push(any);
                    break;
                default:
                    break;
            }
            return Object.assign(com, query.prototype);
        };
    }
    var REG_PROP = /\[(.*)\=(.*)\]/; // 匹配 `[${key}=${value}]` 形式字符串
    function parseStringQuery(query) {
        if (query === void 0) { query = ''; }
        var result = [];
        query.split(',').map(function (query) {
            query = query.trim();
            var selectTypes = {
                '#': ['id'],
                '.': ['className', 'class', 'classname'],
            };
            for (var key in selectTypes) {
                if (query.startsWith(key)) {
                    selectTypes[key].map(function (attrName) {
                        result.push({
                            key: attrName,
                            value: query.slice(1),
                        });
                    });
                }
            }
            if (REG_PROP.test(query)) {
                var _a = parsePropQuery(query), key = _a[0], value = _a[1];
                result.push({
                    key: key,
                    value: value,
                });
            }
        });
        return result;
    }
    function getTypedItem(type, source) {
        return source.filter(function (item) { return is[type](item); });
    }
    function parsePropQuery(string) {
        var _a = string.match(REG_PROP), _ = _a[0], key = _a[1], value = _a[2];
        return [key, value];
    }
    function get$1(object) {
        var result = [];
        var walk = function (object) {
            if (object.children.length > 0) {
                result.push.apply(result, object.children);
                object.children.map(function (child) { return walk(child); });
            }
        };
        walk(object);
        return result;
    }
    function findBy(key, value, array) {
        return array.filter(function (item) { return item[key] === value; });
    }

    var query = function (stage) { return window.$ = createQuery(stage, query); };
    query.use = use;
    query.extend = extend;
    query.extend([
        queryEvent,
        instance,
    ]);

    exports.query = query;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=query.js.map
