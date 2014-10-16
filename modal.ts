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
            id: B.uniqueId(),
            size: ''
        }, options);
        this.modal = B.modal(
            this.options.size,
            B.modal['header'](this.options.icon, this.options.title, this.options.showCloseBotton), //Header
            [//Body
                this.form = B.form().addClass('form-horizontal').append(body),
                B.hr().css({ 'margin-top': 'inherit', 'margin-bottom': 'inherit' }),
                this.div_message = B.div()
            ],
            footer//Footer
            )
            .attr({ id: this.options.id, 'data-backdrop': 'static', 'data-keyboard': false }).appendTo(B.body)
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
        return B.a({ 'data-toggle': 'modal', 'data-target': '#' + this.options.id }, this.options.icon).append(' ', this.options.title);
    }
    input(control: JQuery, lable: string,desc?:string): JQuery {
        return B.labeledControl(null, lable, desc, 4, control);
    }
    message(what: string, type: string = 'info') {
        B.alert('phone-alt').addClass('alert-' + type).append(what).appendTo(this.div_message);
    }
    ajaxParams(): any {
        return {};
    }
    reset() {
        this.div_message.empty();
    }
}
export = Modal;