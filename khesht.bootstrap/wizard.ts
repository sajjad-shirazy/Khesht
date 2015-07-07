import D = require('khesht.bootstrap/dom');
import Element = require('khesht/element');
import WizardPage = require('khesht.bootstrap/wizardpage');

var $: JQueryStatic = require("jquery");

class WizardOptions {
    str_next: string = 'مرحله بعد';
    str_wait: string = 'لطفا صبر کنید ...';
    css_btn_next: string = 'btn-primary';
    from: number = 0;
    input: any = {};
}

class Wizard extends Element {
    protected pageIndex: number;
    protected options: WizardOptions;
    protected div_page: JQuery;
    protected div_message: JQuery;
    protected btn_next: JQuery;
    protected pages: WizardPage<any>[];
    constructor(pages: WizardPage<any>[], options?: WizardOptions) {
        super(D.div());
        this.pages = pages;
        this.options = $.extend(new WizardOptions(), options);
        if (this.pages && this.pages.length > 0) {
            this.pageIndex = -1 + parseInt(options.from ? <any>options.from : 0);
            this.dom.append(
                this.div_page = D.div(),
                this.div_message = D.div(),
                this.btn_next = D.button().addClass('btn-lg btn-block ' + this.options.css_btn_next).click(this.btn_next_click.bind(this))
                );
            this.next();
        }
    }
    protected btn_next_click() {
        if (this.pageIndex >= 0) {
            D.disable(this.btn_next);
            this.pages[this.pageIndex].process(this.next.bind(this), (error: string) => {
                D.enable(this.btn_next);
                this.message(error, 'danger');
                this.btn_next.text(this.options.str_next);
            });
        } else {
            this.next();
        }
    }
    protected next(prevOutput?: any) {
        this.pageIndex++;
        if (this.pageIndex < this.pages.length) {
            this.div_page.empty().append(D.br(3), D.loading(), D.br(3));
            this.div_message.empty();
            this.btn_next.hide();
            this.pages[this.pageIndex].on('load', () => {
                this.div_page.empty().append(this.pages[this.pageIndex].DOM);
                if (this.pageIndex == this.pages.length - 1)
                    this.btn_next.hide();
                else {
                    D.enable(this.btn_next.show().text(this.options.str_next));
                }
            });
            this.pages[this.pageIndex].load(prevOutput || this.options.input);
        }
    }
    protected message(content: string, mod: string) {
        this.div_message.prepend(D.alert().addClass('alert-' + mod).append(content));
    }
}

export = Wizard;