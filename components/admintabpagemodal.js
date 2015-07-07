var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'modals/okclose'], function (require, exports, D, Modal) {
    var $ = require("jquery");
    var AdminTabPageModal = (function (_super) {
        __extends(AdminTabPageModal, _super);
        function AdminTabPageModal(adminTabPage, options) {
            _super.call(this, options);
            this.adminTabPage = adminTabPage;
            this.dom.attr({ action: require.toUrl('api') });
            this.addHiddens({ form_key: window['FORM_KEY'] });
            this.dom.wrap(D.box());
        }
        return AdminTabPageModal;
    })(Modal);
    return AdminTabPageModal;
});
//# sourceMappingURL=admintabpagemodal.js.map