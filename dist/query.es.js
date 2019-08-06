var fns = [];
function use(fn) {
    fns.push(fn);
}

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
        // @ts-ignore
        var any = fns.reduce(function (prev, current) { return current(prev, query); }, selector);
        var type = typeof any;
        switch (type) {
            case 'string':
                selector = any.trim();
                if (['container', 'sprite', 'text'].includes(selector)) {
                    com.push.apply(com, getTypedItem(selector, get(stage)));
                }
                else {
                    var parsed = parseStringQuery(selector);
                    parsed.map(function (item) { return com.push.apply(com, findBy(item.key, item.value, get(stage))); });
                }
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
function getTypedItem(type, source) {
    return source.filter(function (item) { return is[type](item); });
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var queryEvent = createCommonjsModule(function (module, exports) {
(function (global, factory) {
     factory(exports) ;
}(commonjsGlobal, function (exports) {
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
        EventBus.prototype.fire = function (evObj) {
            if (!this.handlers || !this.handlers.length)
                return;
            this.handlers.map(function (handler) {
                if (typeof handler === 'function')
                    handler(evObj);
            });
            return this;
        };
        EventBus.prototype.clear = function () {
            this.handlers = [];
        };
        return EventBus;
    }());

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

    var get = function (root, get) {
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

    var u = {
        getFingers: function (ev) {
            return get(ev, 'data.originalEvent.touches.length') || 1;
        },
        getPoint: function (ev, index) {
            if (ev.data.pointerType === 'touch') {
                var touches = ev.data.originalEvent.touches;
                return {
                    x: Math.round(touches[index].pageX),
                    y: Math.round(touches[index].pageY)
                };
            }
            else {
                return {
                    x: Math.round(ev.data.global.x),
                    y: Math.round(ev.data.global.y)
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
                y: target.y
            };
        }
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
            fn: '_start'
        }, {
            name: 'pointermove',
            fn: '_move'
        }, {
            name: 'pointerup',
            fn: '_end'
        }, {
            name: 'pointerupoutside',
            fn: '_end'
        }];
    // 事件中心
    var RTouch = /** @class */ (function () {
        function RTouch(target) {
            // 触摸手指数量
            this.fingers = 0;
            // 是否开始触摸
            // 用于解决 精灵区域外 move 也被触发的问题
            this.touching = false;
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
            this.touching = true;
            this.startTime = Date.now();
            this.fingers = u.getFingers(ev);
            this.singleBasePoint = u.getAnchorPoint(this.target);
            // 记录第一触控点
            this.swipeStartPoint = this.startPoint = u.getPoint(ev, 0);
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
            this.fireEvent('touchstart', {
                origin: ev
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
                            scale: pinchLength / this.pinchStartLength
                        }
                    });
                    this.pinchStartLength = pinchLength;
                }
                if (this.vector1) {
                    this.eventStart('rotate', {
                        delta: {
                            rotate: u.getAngle(this.vector1, vector2)
                        },
                        origin: ev
                    });
                    this.vector1 = vector2;
                }
            }
            // 触发 drag
            this.eventStart('drag', {
                delta: {
                    x: curPoint.x - this.startPoint.x,
                    y: curPoint.y - this.startPoint.y
                },
                origin: ev
            });
            this.fireEvent('touchmove', {
                origin: ev
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
                    type: evName
                });
            });
            if (this.swipeStartPoint) {
                var endPoint = {
                    x: Math.round(ev.data.global.x),
                    y: Math.round(ev.data.global.y)
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
                    else {
                        // 触发长按
                        eventType = 'longtap';
                    }
                }
                if (eventType) {
                    this.fireEvent(eventType, {
                        origin: ev
                    });
                }
            }
            this.fireEvent('touchend', {
                origin: ev
            });
        };
        RTouch.prototype.fireEvent = function (evName, ev) {
            if (this.Bus[evName]) {
                this.Bus[evName].fire(Object.assign(ev, {
                    type: evName,
                    stopPropagation: function () {
                        ev.origin.stopPropagation();
                    }
                }));
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

    function bind(target, evName, fn) {
        if (RTOUCH_SUPPORT_EVENT.includes(evName)) {
            if (!target['RTouch'])
                target['RTouch'] = new RTouch(target);
            target['RTouch'].on(evName, fn);
        }
        else {
            target.interactive = true;
            target.on(evName, fn);
        }
    }
    function off(target, evName, fn) {
        if (RTOUCH_SUPPORT_EVENT.includes(evName) && target['RTouch']) {
            target['RTouch'].off(evName, fn);
        }
        else {
            target.interactive = true;
            target.off(evName, fn);
        }
    }
    var event = {
        on: function (name, closure) {
            if (name === void 0) { name = ''; }
            if (closure === void 0) { closure = function () { }; }
            var events = name.split(' ');
            for (var i = 0; i < this.length; i++) {
                for (var j = 0; j < events.length; j++) {
                    this[i].interactive = true;
                    bind(this[i], events[j], closure);
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
        }
    };
    // @ts-ignore
    if (window.query)
        window.query.extend(event);

    exports.default = event;
    exports.event = event;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

});

var queryEvent$1 = unwrapExports(queryEvent);

// @ts-ignore
var query = function (stage) { return window.$ = createQuery(stage, query); };
query.use = use;
query.extend = extend;
query.extend([
    queryEvent$1,
]);

export default query;
//# sourceMappingURL=query.es.js.map
