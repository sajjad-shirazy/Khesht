var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/eventdispatcher'], function (require, exports, EventDispatcher) {
    var Element = (function (_super) {
        __extends(Element, _super);
        function Element(dom) {
            _super.call(this);
            this.dom = dom;
        }
        Object.defineProperty(Element.prototype, "DOM", {
            get: function () {
                return this.dom;
            },
            enumerable: true,
            configurable: true
        });
        Element.prototype.append = function () {
            var contents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                contents[_i - 0] = arguments[_i];
            }
            this.dom.append.apply(this.dom, contents);
        };
        Element.prototype.prepend = function () {
            var contents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                contents[_i - 0] = arguments[_i];
            }
            this.dom.prepend.apply(this.dom, contents);
        };
        return Element;
    })(EventDispatcher);
    return Element;
});
//# sourceMappingURL=element.js.map