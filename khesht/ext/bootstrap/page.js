/// <amd-dependency path="bootstrap/js/bootstrap.min"/>
/// <amd-dependency path="stylesheet!bootstrap/css/bootstrap.min.css"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/ext/bootstrap/dom', 'khesht/utils', 'khesht/app', 'khesht/page', 'khesht/ext/bootstrap/topmenu', 'khesht/ext/bootstrap/form', "bootstrap/js/bootstrap.min", "stylesheet!bootstrap/css/bootstrap.min.css"], function (require, exports, D, U, APP, Base, TopMenu, Form) {
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(args) {
            _super.call(this, args);
            this.form = new Form(this);
            this.form.append(this.div_messages = D.div());
            this.dom = D.container().append(this.form.DOM).appendTo(this.dom);
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
                this.addMessage(this.args.message, this.args.status);
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
        /**
        * type : 'success','warning','fail' other values shows as info
        */
        Page.prototype.addMessage = function (text, mod) {
            if (mod === void 0) { mod = 'info'; }
            switch (mod) {
                case 'success':
                    mod = 'success';
                    break;
                case 'warning':
                    mod = 'warning';
                    break;
                case 'fail':
                    mod = 'danger';
                    break;
                default:
                    mod = 'info';
            }
            D.alert('bell').addClass('alert-' + mod).append(' ', this.translateMessage(text)).appendTo(this.div_messages);
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        };
        return Page;
    })(Base);
    return Page;
});
//# sourceMappingURL=page.js.map