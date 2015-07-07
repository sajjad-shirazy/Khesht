var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht.bootstrap/dom', 'khesht.bootstrap/form'], function (require, exports, U, D, Base) {
    var $ = require("jquery");
    var Modal = (function (_super) {
        __extends(Modal, _super);
        /**
        * options: {
        *     ajaxSubmit: string; //default value is true
        *     icon: string;
        *     title: string;
        *     showCloseBotton: boolean;
        *     id: string;
        *     size: string;
        * };
        */
        function Modal(options) {
            this.options = $.extend({
                ajaxSubmit: true,
                icon: 'flag',
                title: '.titile',
                showCloseBotton: true,
                id: U.uniqueId(),
                size: ''
            }, options);
            _super.call(this, null, this.options.ajaxSubmit);
            this.modal = D.div({ 'class': 'modal fade', role: 'dialog', tabindex: -1, 'aria-hidden': true, 'aria-labelledby': U.uniqueId() }).append(D.div().append(D.div().append(this.header = Modal.modalHeader(this.options.icon, this.options.title, this.options.showCloseBotton).addClass('modal-header'), D.div().addClass('modal-body').append(this.dom.change(this.handleUpdate.bind(this))), this.footer = D.div().addClass('modal-footer')).addClass('modal-content')).addClass('modal-dialog ' + this.options.size)).attr({ id: this.options.id, 'data-backdrop': 'static', 'data-keyboard': false }).appendTo(D.body).on({ 'show.bs.modal': this.onshow.bind(this), 'hidden.bs.modal': this.onclose.bind(this) });
            //this.dom.parent().append(D.br());
        }
        Modal.modalHeader = function (icon, title, showCloseButton) {
            return D.div().append((showCloseButton ? D.button({ 'class': 'close', 'data-dismiss': 'modal', 'aria-hidden': true }).append(D.span({ 'aria-hidden': true }).html('&times;'), D.span().text('Close').addClass('sr-only')) : null), D.dom('h4').addClass('modal-title').append((icon ? D.glyphicon(icon) : null), ' ', title)).children();
        };
        Modal.prototype.show = function () {
            this.modal.modal('show');
        };
        Modal.prototype.close = function () {
            this.modal.modal('hide');
        };
        Modal.prototype.onshow = function () {
        };
        Modal.prototype.onclose = function () {
            if ($('.modal-backdrop').length > 0) {
                D.body.addClass('modal-open');
            }
        };
        Object.defineProperty(Modal.prototype, "link", {
            get: function () {
                return D.a({ 'data-toggle': 'modal', 'data-target': '#' + this.options.id }, this.options.icon).append(' ', this.options.title);
            },
            enumerable: true,
            configurable: true
        });
        Modal.prototype.handleUpdate = function () {
            var _this = this;
            //U.log('handleUpdate', this.modal);
            var intervalHandler = setInterval(function () {
                _this.modal.modal('handleUpdate');
                clearInterval(intervalHandler);
            }, 100);
        };
        return Modal;
    })(Base);
    return Modal;
});
//# sourceMappingURL=modal.js.map