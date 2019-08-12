(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@amoy/query-event')) :
    typeof define === 'function' && define.amd ? define(['@amoy/query-event'], factory) :
    (global = global || self, global.query = factory(global.queryEvent));
}(this, function (queryEvent) { 'use strict';

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
        return {
            x: this[0] ? this[0].x : 0,
            y: this[0] ? this[0].y : 0
        };
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
    function text() {
        console.log('text() not support yet');
        return this[0] && this[0]._text && this[0]._text;
    }
    function css() {
        console.log('css() not support yet');
    }
    function find() {
        console.log('find() not support yet');
    }
    function offset() {
        console.log('offset() not support yet');
    }
    function prev() {
        console.log('prev() not support yet');
    }
    function next() {
        console.log('next() not support yet');
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
        text: text,
        css: css,
        find: find,
        offset: offset,
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
                '#': 'id',
                '.': 'className'
            };
            for (var key in selectTypes) {
                if (query.startsWith(key)) {
                    result.push({
                        key: selectTypes[key],
                        value: query.slice(1)
                    });
                }
            }
            if (REG_PROP.test(query)) {
                var _a = parsePropQuery(query), key = _a[0], value = _a[1];
                result.push({
                    key: key,
                    value: value
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

    /**
     * query
     *
     * @module query/query
     *
     * @param { Object } stage - PIXI stage
     *
     * @example
     *
     * import { Application as Game } from 'pixi.js'
     *
     * const game = new Game({
     *     width: window.innerWidth,
     *     height: window.innerHeight,
     * })
     *
     * query(game.stage)
     * //then you can use as
     * $('sprite').hide()
     * // or
     * $('text').on('tap', () => {})
     */
    // @ts-ignore
    var query = function (stage) { return window.$ = createQuery(stage, query); };
    query.use = use;
    query.extend = extend;
    query.extend([
        queryEvent,
        instance,
    ]);

    return query;

}));
//# sourceMappingURL=query.js.map
