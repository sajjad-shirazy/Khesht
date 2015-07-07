var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/component'], function (require, exports, Component) {
    var $ = require("jquery");
    var AdminTabPage = (function (_super) {
        __extends(AdminTabPage, _super);
        function AdminTabPage() {
            _super.apply(this, arguments);
        }
        AdminTabPage.prototype.load = function () {
            _super.prototype.load.call(this);
            $('#loading-mask').show();
        };
        AdminTabPage.prototype.start = function () {
            _super.prototype.start.call(this);
            $('#loading-mask').hide();
        };
        return AdminTabPage;
    })(Component);
    return AdminTabPage;
});
//# sourceMappingURL=tabpage.js.map