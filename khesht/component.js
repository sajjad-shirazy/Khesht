var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht/element'], function (require, exports, U, Element) {
    var $ = require("jquery");
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(dom, autoLoad) {
            if (autoLoad === void 0) { autoLoad = true; }
            _super.call(this, dom);
            this.loaded = false;
            if (autoLoad) {
                this.load();
            }
        }
        Component.prototype.ajaxes = function () {
            return {};
        };
        Object.defineProperty(Component.prototype, "initialized", {
            get: function () {
                return this.loaded;
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.load = function () {
            var _this = this;
            var done = function () {
                _this.loaded = true;
                _this.triger('load');
                _this.start();
            };
            if (!this.loaded) {
                //loading ajax datas
                U.when(this.ajaxes(), function (result) {
                    $.extend(_this, result);
                    done();
                }, function () {
                    _this.start();
                    done();
                });
            }
        };
        Component.prototype.start = function () {
        };
        Object.defineProperty(Component.prototype, "DOM", {
            get: function () {
                return this.dom;
            },
            enumerable: true,
            configurable: true
        });
        return Component;
    })(Element);
    return Component;
});
//# sourceMappingURL=component.js.map