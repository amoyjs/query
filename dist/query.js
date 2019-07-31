(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.query = factory());
}(this, function () { 'use strict';

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
    //# sourceMappingURL=events.js.map

    //# sourceMappingURL=index.js.map

    var prototype = /*#__PURE__*/Object.freeze({
        on: on,
        off: off
    });

    function query(stage) {
        var $ = createQuery(stage);
        // @ts-ignore
        window.$ = $;
        return $;
    }
    function createQuery(stage) {
        return function (selector) {
            var com = [];
            var type = typeof selector;
            switch (type) {
                case 'string':
                    com.push.apply(com, stage.children);
                    break;
                case 'object':
                    com.push(selector);
                    break;
                default:
                    break;
            }
            return Object.assign(com, query.prototype);
        };
    }
    Object.assign(query.prototype, prototype);

    return query;

}));
//# sourceMappingURL=query.js.map
