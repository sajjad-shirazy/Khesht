var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/eventdispatcher'], function(require, exports, EventDispatcher) {
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
                id: B.uniqueId(),
                size: ''
            }, options);
            this.modal = B.modal(this.options.size, B.modal['header'](this.options.icon, this.options.title, this.options.showCloseBotton), [
                this.form = B.form().addClass('form-horizontal').append(body),
                B.hr().css({ 'margin-top': 'inherit', 'margin-bottom': 'inherit' }),
                this.div_message = B.div()
            ], footer).attr({ id: this.options.id, 'data-backdrop': 'static', 'data-keyboard': false }).appendTo(B.body).on('show.bs.modal', this.onshow.bind(this)).on('hidden.bs.modal', this.onclose.bind(this));
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
            return B.a({ 'data-toggle': 'modal', 'data-target': '#' + this.options.id }, this.options.icon).append(' ', this.options.title);
        };
        Modal.prototype.input = function (control, lable, desc) {
            return B.labeledControl(null, lable, desc, 4, control);
        };
        Modal.prototype.message = function (what, type) {
            if (typeof type === "undefined") { type = 'info'; }
            B.alert('phone-alt').addClass('alert-' + type).append(what).appendTo(this.div_message);
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
