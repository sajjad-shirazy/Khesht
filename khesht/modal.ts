import D = require('khesht/ext/bootstrap/dom');
import U = require('khesht/utils');
import EventDispatcher = require('khesht/eventdispatcher');

class Modal extends EventDispatcher {
    private modal: JQuery = null;
    private div_message: JQuery;
    form: JQuery = null;
    options: {
        icon: string;
        title: string;
        showCloseBotton: boolean;
        id: string;
        size: string;
    };
    constructor(body?: JQuery, footer?: JQuery, options?: any) {
        super();
        this.options = $.extend({
            icon: 'flag',
            title: '.titile',
            showCloseBotton: true,
            id: U.uniqueId(),
            size: ''
        }, options);
        this.modal = D.modal(
            this.options.size,
            D.modal['header'](this.options.icon, this.options.title, this.options.showCloseBotton), //Header
            <any>[//Body
                this.form = D.form().addClass('form-horizontal').append(body),
                D.hr().css({ 'margin-top': 'inherit', 'margin-bottom': 'inherit' }),
                this.div_message = D.div()
            ],
            footer//Footer
            )
            .attr({ id: this.options.id, 'data-backdrop': 'static', 'data-keyboard': false }).appendTo(D.body)
            .on('show.bs.modal', this.onshow.bind(this))
            .on('hidden.bs.modal', this.onclose.bind(this));
    }
    show() {
        this.modal.modal('show');
    }
    close() {
        this.modal.modal('hide');
    }
    onshow() {
    }
    onclose() {
    }
    link(): JQuery {
        return D.a({ 'data-toggle': 'modal', 'data-target': '#' + this.options.id }, this.options.icon).append(' ', this.options.title);
    }
    input(control: JQuery, lable: string,desc?:string): JQuery {
        return D.labeledControl(control, lable, desc, 4);
    }
    message(what: string, type: string = 'info') {
        D.alert('phone-alt').addClass('alert-' + type).append(what).appendTo(this.div_message);
    }
    ajaxParams(): any {
        return {};
    }
    reset() {
        this.div_message.empty();
    }
}
export = Modal;