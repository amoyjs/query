(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.query = factory());
}(this, function () { 'use strict';

    function extend(object) {
        if (object === void 0) { object = {}; }
        Object.assign(this.prototype, object);
    }

    function createQuery(stage, query) {
        return function (selector) {
            var com = [];
            var type = typeof selector;
            switch (type) {
                case 'string':
                    var parsed = parseStringQuery(selector);
                    parsed.map(function (item) {
                        com.push.apply(com, findBy(item.key, item.value, get(stage)));
                    });
                    break;
                case 'object':
                    com.push.apply(com, find(selector, get(stage)));
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
            if (query.startsWith('.')) {
                result.push({
                    key: 'name',
                    value: query.slice(1)
                });
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
    function parsePropQuery(string) {
        var _a = string.match(REG_PROP), _ = _a[0], key = _a[1], value = _a[2];
        return [key, value];
    }
    function get(object) {
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
    function find(item, array) {
        return array.filter(function (_item) { return _item === item; });
    }
    function findBy(key, value, array) {
        return array.filter(function (item) { return item[key] === value; });
    }

    function on(name, closure) {
        if (name === void 0) { name = ''; }
        if (closure === void 0) { closure = function () { }; }
        var events = name.split(' ');
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                this[i].interactive = true;
                this[i].on(events[j], closure);
            }
        }
    }
    function off(name) {
        if (name === void 0) { name = ''; }
        var events = name.split(' ');
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                this[i].off(events[j]);
            }
        }
    }



    var extension = /*#__PURE__*/Object.freeze({
        on: on,
        off: off
    });

    // @ts-ignore
    var query = function (stage) { return window.$ = createQuery(stage, query); };
    query.extend = extend;
    query.extend(extension);

    return query;

}));
//# sourceMappingURL=query.js.map
