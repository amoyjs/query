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
function text(target) {
    return typeof target._font === 'string';
}
function container(target) {
    return typeof target.anchor === 'undefined';
}

var is = /*#__PURE__*/Object.freeze({
    sprite: sprite,
    text: text,
    container: container
});

function createQuery(stage, query) {
    return function (selector) {
        var com = [];
        var any = fns.reduce(function (prev, current) { return current(prev, query); }, selector);
        var type = typeof any;
        switch (type) {
            case 'string':
                selector = any.trim();
                if (['view', 'sprite', 'text'].includes(selector)) {
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
    return array.filter(function (item) {
        if (typeof item[key] === 'string') {
            var vals = item[key].split(' ');
            return vals.includes(value);
        }
        else {
            return item[key] === value;
        }
    });
}

function type(object) {
    var class2type = {};
    var type = class2type.toString.call(object);
    var typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';
    if (object == null)
        return object + '';
    typeString.split(' ').forEach(function (type) {
        class2type["[object " + type + "]"] = type.toLowerCase();
    });
    var isObject = typeof object === 'object';
    var isFn = typeof object === 'function';
    return isObject || isFn ? class2type[type] || 'object' : typeof object;
}
var getValue = function (root, get) {
    if (type(root) !== 'object')
        return root;
    var value = root;
    var keyArr = get.split('.');
    for (var i = 0, l = keyArr.length; i < l; i++) {
        var v = keyArr[i];
        if (v) {
            if (value[v]) {
                value = value[v];
            }
            else {
                value = undefined;
                break;
            }
        }
    }
    return value;
};

var EventBus = /** @class */ (function () {
    function EventBus() {
        this.handlers = [];
    }
    EventBus.prototype.add = function (handler) {
        this.handlers.push(handler);
        return this;
    };
    EventBus.prototype.del = function (handler) {
        var _this = this;
        if (!handler) {
            this.handlers = [];
        }
        else {
            this.handlers.map(function (value, index) {
                value === handler && _this.handlers.splice(index, 1);
            });
        }
        return this;
    };
    EventBus.prototype.fire = function (evObj, that) {
        if (!this.handlers || !this.handlers.length)
            return;
        this.handlers.map(function (handler) {
            if (typeof handler === 'function')
                handler.bind(that)(evObj);
        });
        return this;
    };
    EventBus.prototype.clear = function () {
        this.handlers = [];
    };
    return EventBus;
}());

var u = {
    getCurTargetByEv: function (evTarget, ev) {
        var curTarget;
        var maxZindex = 0;
        if (getValue(evTarget, 'children.length')) {
            evTarget.children.map(function (child) {
                if (child.containsPoint) {
                    if (child.containsPoint(ev.data.global) && child.zIndex >= maxZindex) {
                        curTarget = child;
                        maxZindex = child.zIndex;
                    }
                }
            });
        }
        if (curTarget) {
            var childCurTarget = u.getCurTargetByEv(curTarget, ev);
            if (childCurTarget) {
                curTarget = childCurTarget;
            }
        }
        return curTarget || evTarget;
    },
    getFingers: function (ev) {
        return getValue(ev, 'data.originalEvent.touches.length') || 1;
    },
    getPoint: function (ev, index) {
        if (ev.data.pointerType === 'touch') {
            var touches = ev.data.originalEvent.touches;
            return {
                x: Math.round(touches[index].pageX),
                y: Math.round(touches[index].pageY),
            };
        }
        else {
            return {
                x: Math.round(ev.data.global.x),
                y: Math.round(ev.data.global.y),
            };
        }
    },
    getVector: function (p1, p2) {
        var x = Math.round(p1.x - p2.x);
        var y = Math.round(p1.y - p2.y);
        return { x: x, y: y };
    },
    getLength: function (v1) {
        return Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    },
    getAngle: function (v1, v2) {
        if (typeof v1 !== 'object' || typeof v2 !== 'object') {
            console.error('getAngle error!');
            return;
        }
        // 判断方向，顺时针为 1 ,逆时针为 -1；
        var direction = v1.x * v2.y - v2.x * v1.y > 0 ? 1 : -1;
        // 两个向量的模；
        var len1 = this.getLength(v1);
        var len2 = this.getLength(v2);
        var mr = len1 * len2;
        var dot;
        var r;
        if (mr === 0)
            return 0;
        // 通过数量积公式可以推导出：
        // cos = (x1 * x2 + y1 * y2)/(|a| * |b|);
        dot = v1.x * v2.x + v1.y * v2.y;
        r = dot / mr;
        if (r > 1)
            r = 1;
        if (r < -1)
            r = -1;
        // 解值并结合方向转化为角度值；
        return Math.acos(r) * direction;
    },
    getAnchorPoint: function (target) {
        return {
            x: target.x,
            y: target.y,
        };
    },
};

var RTOUCH_SUPPORT_EVENT = [
    'touchstart',
    'touchmove',
    'touchend',
    // 拖动
    'drag',
    'dragstart',
    'dragend',
    // 双指缩放
    'pinch',
    'pinchstart',
    'pinchend',
    // 双指旋转
    'rotate',
    'rotatestart',
    'rotateend',
    // 划动
    'swipeleft',
    'swiperight',
    'swipeup',
    'swipedown',
    // 短点击
    'shorttap',
    'longtap',
    // 单指缩放
    'singlepinch',
    'singlepinchstart',
    'singlepinchend',
    // 单指旋转
    'singlerotate',
    'singlerotatestart',
    'singlerotateend',
];
// 挟持的原生事件
var ORIGIN_EVENT_MAP = [{
        name: 'pointerdown',
        fn: '_start',
    }, {
        name: 'pointermove',
        fn: '_move',
    }, {
        name: 'pointerup',
        fn: '_end',
    }, {
        name: 'pointerupoutside',
        fn: '_end',
    }];
// 事件中心
var RTouch = /** @class */ (function () {
    function RTouch(target) {
        // 触摸手指数量
        this.fingers = 0;
        // 是否开始触摸
        // 用于解决 精灵区域外 move 也被触发的问题
        this.touching = false;
        this.isSingleButton = false;
        this.Bus = {};
        this.target = target;
        // 初始化事件中心
        this.initEventBus();
        // 事件挟持
        this.bindOriginEvent();
    }
    RTouch.prototype.initEventBus = function () {
        var _this = this;
        RTOUCH_SUPPORT_EVENT.map(function (evName) {
            Object.defineProperty(_this.Bus, evName, { value: new EventBus() });
        });
    };
    RTouch.prototype.bindOriginEvent = function () {
        var _this = this;
        ORIGIN_EVENT_MAP.map(function (_a) {
            var name = _a.name, fn = _a.fn;
            _this.target.interactive = true;
            _this.target.on(name, _this[fn], _this);
        });
    };
    RTouch.prototype._start = function (ev) {
        var _this = this;
        this.touching = true;
        this.startTime = Date.now();
        this.fingers = u.getFingers(ev);
        // 记录第一触控点
        this.swipeStartPoint = this.startPoint = u.getPoint(ev, 0);
        // 判断触控区域是否为单指操作的按钮
        this.singleBasePoint = u.getAnchorPoint(this.target);
        var curTarget = u.getCurTargetByEv(ev.target, ev);
        this.isSingleButton = curTarget && (curTarget.name === 'singlebutton');
        if (this.fingers === 1) {
            // 单指且监听 singlePinch 时，计算向量模；
            var startVector = u.getVector(this.startPoint, this.singleBasePoint);
            this.singlePinchStartLength = u.getLength(startVector);
        }
        else if (this.fingers > 1) {
            // 双指操作时，记录第二触控点
            this.secondPoint = u.getPoint(ev, 1);
            // 计算双指向量；
            this.vector1 = u.getVector(this.secondPoint, this.startPoint);
            // 计算向量模
            this.pinchStartLength = u.getLength(this.vector1);
        }
        // 触发长按
        this.longtapTimer = setTimeout(function () {
            _this.fireEvent('longtap', {
                origin: ev,
            });
            _this.longtapTimer = null;
        }, 1000);
        this.fireEvent('touchstart', {
            origin: ev,
        });
    };
    RTouch.prototype._move = function (ev) {
        if (!this.touching)
            return;
        var curPoint = u.getPoint(ev, 0);
        if (!this.startPoint)
            this.startPoint = curPoint;
        if (this.fingers > 1) {
            // 双指操作， 触发 pinch 与 rotate
            var curSecPoint = u.getPoint(ev, 1);
            var vector2 = u.getVector(curSecPoint, curPoint);
            var pinchLength = u.getLength(vector2);
            if (this.pinchStartLength) {
                this.eventStart('pinch', {
                    origin: ev,
                    delta: {
                        scale: pinchLength / this.pinchStartLength,
                    },
                });
                this.pinchStartLength = pinchLength;
            }
            if (this.vector1) {
                this.eventStart('rotate', {
                    delta: {
                        rotate: u.getAngle(this.vector1, vector2),
                    },
                    origin: ev,
                });
                this.vector1 = vector2;
            }
        }
        else {
            // 触发 单指缩放
            if (this.isSingleButton) {
                var pinchV2 = u.getVector(curPoint, this.singleBasePoint);
                var singlePinchLength = u.getLength(pinchV2);
                this.eventStart('singlepinch', {
                    delta: {
                        scale: singlePinchLength / this.singlePinchStartLength,
                        deltaX: curPoint.x - this.startPoint.x,
                        deltaY: curPoint.y - this.startPoint.y,
                    },
                    origin: ev,
                });
                this.singlePinchStartLength = singlePinchLength;
            }
            // 触发 单指旋转;
            if (this.isSingleButton) {
                var rotateV1 = u.getVector(this.startPoint, this.singleBasePoint);
                var rotateV2 = u.getVector(curPoint, this.singleBasePoint);
                this.eventStart('singlerotate', {
                    delta: {
                        rotate: u.getAngle(rotateV1, rotateV2),
                    },
                    origin: ev,
                });
            }
        }
        // 触发 drag
        this.eventStart('drag', {
            delta: {
                x: curPoint.x - this.startPoint.x,
                y: curPoint.y - this.startPoint.y,
            },
            origin: ev,
        });
        this.fireEvent('touchmove', {
            origin: ev,
        });
        this.startPoint = curPoint;
    };
    RTouch.prototype._end = function (ev) {
        var _this = this;
        var evArr = ['pinch', 'drag', 'rotate', 'singlerotate', 'singlepinch'];
        this.touching = false;
        this.fingers = u.getFingers(ev);
        evArr.map(function (evName) {
            _this.eventEnd(evName, {
                origin: ev,
                type: evName,
            });
        });
        if (this.swipeStartPoint) {
            var endPoint = {
                x: Math.round(ev.data.global.x),
                y: Math.round(ev.data.global.y),
            };
            var deltaX = endPoint.x - this.swipeStartPoint.x;
            var deltaY = endPoint.y - this.swipeStartPoint.y;
            var endTime = Date.now();
            var eventType = '';
            if (deltaX > 30 && Math.abs(deltaY) < 100) {
                // 右划
                eventType = 'swiperight';
            }
            else if (deltaX < -30 && Math.abs(deltaY) < 100) {
                // 左划
                eventType = 'swipeleft';
            }
            else if (deltaY > 30 && Math.abs(deltaX) < 100) {
                // 下划
                eventType = 'swipedown';
            }
            else if (deltaY < -30 && Math.abs(deltaX) < 100) {
                // 上划
                eventType = 'swipeup';
            }
            else if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) {
                if (endTime - this.startTime < 500) {
                    // 触发短点击
                    eventType = 'shorttap';
                }
            }
            if (eventType) {
                this.fireEvent(eventType, {
                    origin: ev,
                });
            }
        }
        this.fireEvent('touchend', {
            origin: ev,
        });
        if (this.longtapTimer)
            clearTimeout(this.longtapTimer);
    };
    RTouch.prototype.fireEvent = function (evName, ev) {
        if (this.Bus[evName]) {
            this.Bus[evName].fire(Object.assign(ev, {
                type: evName,
                stopPropagation: function () {
                    ev.origin.stopPropagation();
                },
            }), this.target);
        }
    };
    RTouch.prototype.destory = function () {
        var _this = this;
        ORIGIN_EVENT_MAP.map(function (_a) {
            var name = _a.name, fn = _a.fn;
            _this.target.off(name, _this[fn], _this);
        });
    };
    RTouch.prototype.eventStart = function (evName, ev) {
        var ing = evName + "ing";
        var start = evName + "start";
        if (!this[ing]) {
            this.fireEvent(start, ev);
            this[ing] = true;
        }
        else {
            this.fireEvent(evName, ev);
        }
    };
    RTouch.prototype.eventEnd = function (evName, ev) {
        var ing = evName + "ing";
        var end = evName + "end";
        if (this[ing]) {
            ev.type = end;
            this.fireEvent(end, ev);
            this[ing] = false;
        }
    };
    RTouch.prototype.on = function (evName, handler) {
        var _this = this;
        var _evName = evName.trim().toLowerCase();
        _evName.split(' ').map(function (name) {
            _this.Bus[name].add(handler);
        });
        return this;
    };
    RTouch.prototype.off = function (evName, handler) {
        var _this = this;
        var _evName = evName.trim().toLowerCase();
        _evName.split(' ').map(function (name) {
            handler ? _this.Bus[name].del(handler) : _this.Bus[name].clear();
        });
        return this;
    };
    return RTouch;
}());

function on(target, evName, fn) {
    if (RTOUCH_SUPPORT_EVENT.includes(evName)) {
        if (!target['RTouch'])
            target['RTouch'] = new RTouch(target);
        target['RTouch'].on(evName, fn);
    }
    else {
        target.interactive = true;
        target.on(evName, fn);
    }
    return target;
}
function off(target, evName, fn) {
    if (RTOUCH_SUPPORT_EVENT.includes(evName) && target['RTouch']) {
        target['RTouch'].off(evName, fn);
    }
    else {
        target.interactive = true;
        target.off(evName, fn);
    }
    return target;
}
var queryEvent = {
    on: function (name, closure) {
        if (name === void 0) { name = ''; }
        if (closure === void 0) { closure = function () { }; }
        var events = name.split(' ');
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                this[i].interactive = true;
                on(this[i], events[j], closure);
            }
        }
        return this;
    },
    off: function (name) {
        if (name === void 0) { name = ''; }
        var events = name.split(' ');
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < events.length; j++) {
                this[i].off(events[j]);
                off(this[i], events[j]);
            }
        }
        return this;
    },
};

var query = function (stage) { return window.$ = createQuery(stage, query); };
query.use = use;
query.extend = extend;
query.extend([
    queryEvent,
    instance,
]);

export { query };
//# sourceMappingURL=query.es.js.map
