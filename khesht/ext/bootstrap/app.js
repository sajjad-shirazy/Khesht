var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/app'], function (require, exports, Base) {
    var APP = (function (_super) {
        __extends(APP, _super);
        function APP() {
            _super.apply(this, arguments);
        }
        APP.prototype.css = function () {
            return _super.prototype.css.call(this).concat([
                'bootstrap/css/bootstrap.min.css'
            ]);
        };
        APP.prototype.js = function () {
            return _super.prototype.js.call(this).concat([
                'bootstrap/js/bootstrap.min'
            ]);
        };
        return APP;
    })(Base);
    return APP;
});
//# sourceMappingURL=app.js.map