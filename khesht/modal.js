var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/ext/bootstrap/dom', 'khesht/utils', 'khesht/eventdispatcher'], function (require, exports, D, U, EventDispatcher) {
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(body, footer, options) {
            _super.call(this);
            this.modal = null;
            this.form = null;
            this.options = $.extend({
                icon: 'flag',
                title: '.titile',
                showCloseBotton: true,
                id: U.uniqueId(),
                size: ''
            }, options);
            this.modal = D.modal(this.options.size, D.modal['header'](this.options.icon, this.options.title, this.options.showCloseBotton), [
                this.form = D.form().addClass('form-horizontal').append(body),
                D.hr().css({ 'margin-top': 'inherit', 'margin-bottom': 'inherit' }),
                this.div_message = D.div()
            ], footer).attr({ id: this.options.id, 'data-backdrop': 'static', 'data-keyboard': false }).appendTo(D.body).on('show.bs.modal', this.onshow.bind(this)).on('hidden.bs.modal', this.onclose.bind(this));
        }
        Modal.prototype.show = function () {
            this.modal.modal('show');
        };
        Modal.prototype.close = function () {
            this.modal.modal('hide');
        };
        Modal.prototype.onshow = function () {
        };
        Modal.prototype.onclose = function () {
        };
        Modal.prototype.link = function () {
            return D.a({ 'data-toggle': 'modal', 'data-target': '#' + this.options.id }, this.options.icon).append(' ', this.options.title);
        };
        Modal.prototype.input = function (control, lable, desc) {
            return D.labeledControl(control, lable, desc, 4);
        };
        Modal.prototype.message = function (what, type) {
            if (type === void 0) { type = 'info'; }
            D.alert('phone-alt').addClass('alert-' + type).append(what).appendTo(this.div_message);
        };
        Modal.prototype.ajaxParams = function () {
            return {};
        };
        Modal.prototype.reset = function () {
            this.div_message.empty();
        };
        return Modal;
    })(EventDispatcher);
    return Modal;
});
//# sourceMappingURL=modal.js.map