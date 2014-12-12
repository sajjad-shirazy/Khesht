import U = require('khesht/utils');
import D = require('khesht/ext/bootstrap/dom');
import Page = require('khesht/ext/bootstrap/page');
import Base = require('khesht/element');

class Form extends Base {
    protected page: Page;
    private inputTypes = 'input,select,textarea';
    constructor(page:Page,attr?:any) {
        super(D.form($.extend({ action: require.toUrl('api') + '/', method: 'POST' }, attr)));
        this.page = page;
        this.addHidden('callback', this.page.url);
    }
    setDefaults(values: any) {
        U.each(values, (index, value) => {
            this.set(index, value);
        });
    }
    disable(name: string) {
        D.disable(this[name]);
    }
    enable(name: string) {
        D.enable(this[name]);
    }
    set(name: string, value: any) {
        var input: JQuery = this[name];
        if (input) {
            input.val(value);
            if (input.attr('type') == 'hidden') {
                input.trigger('change');
            }
        }
    }
    br(counts: number = null) {
        this.append(D.br(counts));
    }
    hr() {
        this.append(D.hr());
    }
    addInput(name: string, control: any, required: boolean = false, label: string = '', description: string = null, lWidth?: number, br: boolean= true):JQuery {
        control = control instanceof jQuery ? control : D.box().append(control).css({ padding: '7px'});//D.text({ disabled: true }).val(control);
        var input = label ? D.labeledControl(control, label, description, lWidth).append(br ? D.br(2) : null) : D.div().append(control, br ? D.br() : null).children();
        this.append(input);
        if (name) {
            this[name + '_wrapper'] = input;
            this[name] = (<JQuery>this[name + '_wrapper']).find(this.inputTypes).attr('name', name).data('required', required);
        }
        return control;
    }
    addDescription(title: string, icon?: string) {
        this.append(D.p().append(D.glyphicon(icon), ' ', title));
    }
    addSection(title: any, icon: string = 'bookmark') {
        this.append(D.pageHeader().append(D.h2().append(D.glyphicon(icon), ' ', title)));
    }
    addHidden(name: string, value: any) {
        this.append(this[name] = D.hidden({ name: name, value: value }));
    }
    addSubmit(icon?:string): JQuery {
        return D.button(null, icon).addClass('btn-lg btn-block btn-success').appendTo(this.dom).click(this.submit.bind(this));
    }
    submit() {
        this.dom.find('.has-error').removeClass('has-error');
        this.dom.find(this.inputTypes).each((index, element) => {
            var input = $(element),
                type = type == 'file' ? element['files'] : input.attr('type'),
                value = input.val(),
                name = input.attr('name'),
                hassError = false;
            if (value) {
                switch (type) {
                    case 'email':
                        hassError = !Form.validateEmail(value);
                        break;
                    case 'password':
                        var pass = this['pass'] || this['password'];
                        hassError = name == 'repass' && pass && value != pass.val();
                        break;
                    default:
                        break;
                }
            } else if (input.data('required')) {
                hassError = true;
            }
            if (hassError) {
                this.inputWrapper(input.attr('name')).addClass('has-error');
            }
        });
        if (this.dom.find('.has-error').length == 0) {
            this.dom.submit();
        } else {
            this.onvalidationfail();
        }
    }
    protected onvalidationfail() {
        this.page.addMessage('validation_fail', 'fail');
    }
    protected inputWrapper(name: string):JQuery {
        return this[name + '_wrapper'];
    }
    static validateEmail(email): boolean {
        return new RegExp(<any>/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(email);
    }
} 
export = Form;