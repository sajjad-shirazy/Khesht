var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/ext/bootstrap/dom', 'khesht/element'], function (require, exports, D, Element) {
    var WizardOptions = (function () {
        function WizardOptions() {
            this.str_next = 'مرحله بعد';
            this.str_wait = 'لطفا صبر کنید ...';
            this.css_btn_next = 'btn-primary';
            this.from = 0;
            this.input = {};
        }
        return WizardOptions;
    })();
    var Wizard = (function (_super) {
        __extends(Wizard, _super);
        function Wizard(pages, options) {
            _super.call(this, D.div());
            this.pages = pages;
            this.options = $.extend(new WizardOptions(), options);
            if (this.pages && this.pages.length > 0) {
                this.pageIndex = -1 + parseInt(options.from ? options.from : 0);
                this.dom.append(this.div_page = D.div(), this.div_message = D.div(), this.btn_next = D.button().addClass('btn-lg btn-block ' + this.options.css_btn_next).click(this.btn_next_click.bind(this)));
                this.next();
            }
        }
        Wizard.prototype.btn_next_click = function () {
            var _this = this;
            if (this.pageIndex >= 0) {
                D.disable(this.btn_next);
                this.pages[this.pageIndex].process(this.next.bind(this), function (error) {
                    D.enable(_this.btn_next);
                    _this.message(error, 'danger');
                    _this.btn_next.text(_this.options.str_next);
                });
            }
            else {
                this.next();
            }
        };
        Wizard.prototype.next = function (prevOutput) {
            var _this = this;
            this.pageIndex++;
            if (this.pageIndex < this.pages.length) {
                this.div_page.empty().append(D.br(3), D.loading(), D.br(3));
                this.div_message.empty();
                this.btn_next.hide();
                this.pages[this.pageIndex].addEventListener('load', function () {
                    _this.div_page.empty().append(_this.pages[_this.pageIndex].DOM);
                    if (_this.pageIndex == _this.pages.length - 1)
                        _this.btn_next.hide();
                    else {
                        D.enable(_this.btn_next.show().text(_this.options.str_next));
                    }
                });
                this.pages[this.pageIndex].load(prevOutput || this.options.input);
            }
        };
        Wizard.prototype.message = function (content, mod) {
            this.div_message.prepend(D.alert().addClass('alert-' + mod).append(content));
        };
        return Wizard;
    })(Element);
    return Wizard;
});
//# sourceMappingURL=wizard.js.map