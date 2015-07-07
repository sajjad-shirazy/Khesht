var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/dom', 'khesht/eventdispatcher'], function (require, exports, D, EventDispatcher) {
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
        Element.prototype.disable = function (name) {
            D.disable(this[name]);
        };
        Element.prototype.enable = function (name) {
            D.enable(this[name]);
        };
        Element.prototype.br = function (counts) {
            if (counts === void 0) { counts = null; }
            this.append(D.br(counts));
        };
        Element.prototype.hr = function () {
            this.append(D.hr());
        };
        Element.prototype.get = function (propertyName) {
            return this[propertyName];
        };
        Element.prototype.appendProperty = function (name, control) {
            if (name)
                this[name] = control;
            this.append(control);
            return control;
        };
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