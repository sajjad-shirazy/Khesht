var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/utils', 'khesht/app', 'khesht/page', 'khesht.bootstrap/topmenu', 'khesht.bootstrap/form'], function (require, exports, D, U, APP, Base, TopMenu, Form) {
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(args) {
            _super.call(this, args, D.container().appendTo(D.body.empty()));
            this.form = new Form();
            this.append(this.form.DOM);
        }
        Page.prototype.header = function (brand) {
            if (brand === void 0) { brand = D.a({ href: U.param({ page: 'index' }) }).append(APP.config.name).click(Page.navigate); }
            _super.prototype.header.call(this);
            D.topmenusCount = 0;
            this.topMenu = new TopMenu(brand);
            this.append(this.topMenu.DOM);
        };
        Page.prototype.body = function () {
            _super.prototype.body.call(this);
            if (this.args.message) {
                this.form.addMessage(this.args.message, this.args.status);
            }
        };
        Page.prototype.translateMessage = function (value) {
            return value;
        };
        Page.prototype.footer = function (content) {
            if (content === void 0) { content = APP.config.name; }
            _super.prototype.footer.call(this);
            D.body.append(D.container().append(D.br(), D.hr(), D.pageFooter().append(content)));
        };
        return Page;
    })(Base);
    return Page;
});
//# sourceMappingURL=page.js.map