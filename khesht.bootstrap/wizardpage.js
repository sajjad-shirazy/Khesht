var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/component'], function (require, exports, D, Component) {
    var WizardPage = (function (_super) {
        __extends(WizardPage, _super);
        function WizardPage(title) {
            _super.call(this, D.div(), false);
            this.title = title;
        }
        WizardPage.prototype.load = function (input) {
            this.input = input;
            _super.prototype.load.call(this);
        };
        WizardPage.prototype.start = function () {
            _super.prototype.start.call(this);
            document.title = this.title;
            this.dom.append(D.pageHeader().append(D.h1().append(this.title)));
        };
        WizardPage.prototype.process = function (success, fail) {
            success();
        };
        return WizardPage;
    })(Component);
    return WizardPage;
});
//# sourceMappingURL=wizardpage.js.map