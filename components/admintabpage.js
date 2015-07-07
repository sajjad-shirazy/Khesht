var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht.bootstrap/dom', 'khesht/component'], function (require, exports, U, D, Component) {
    var $ = require("jquery");
    var AdminTabPage = (function (_super) {
        __extends(AdminTabPage, _super);
        function AdminTabPage() {
            _super.call(this, D.box().css('margin-top', '5px').append(D.br(7)));
            //error.form_validation
            U.appendString({ error: { form_validation: 'Fill all fields' } });
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
//# sourceMappingURL=admintabpage.js.map