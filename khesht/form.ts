import U = require('khesht/utils');
import D = require('khesht/dom');
import Base = require('khesht/element');

var $: JQueryStatic = require("jquery");

class Form extends Base {
    private inputTypes = 'input,select,textarea';
    private ajaxRescponce: any;
    public get responce(): any {
        return this.ajaxRescponce;
    }
    constructor(attr?:any, ajaxSubmit:boolean = false) {
        super(D.form($.extend({ action: require.toUrl('api') + '/', method: 'POST' }, attr)));
        ajaxSubmit || this.addHidden('callback', U.url);
        this.appendProperty('div_messages', D.div());
    }
    setDefaults(values: any) {
        U.each(values, (index, value) => {
            this.setValue(index, value);
        });
    }
    setValue(name: string, value: any) {
        var input: JQuery = this.get(name);
        if (input) {
            input.val(value);
            if (input.attr('type') == 'hidden') {
                input.trigger('change');
            }
        }
    }
    getInput(name: string): JQuery {
        return name in this ? this[name].input : null;
    }
    addInput(name: string, control: JQuery, required: boolean = false): JQuery {
        if (name) {
            var input = control.is(this.inputTypes) ? control : control.find(this.inputTypes);
            input.attr('name', name).data('required', required);
            $.extend(control, { input: input });
            this.appendProperty(name, control);
        }
        return control;
    }
    addHidden(name: string, value: any) {
        this.append(this[name] = D.hidden({ name: name, value: value }));
    }
    addHiddens(data) {
        U.each(data, (name, value) => {
            this.addHidden(name, value);
        });
    }
    addSubmit(text:string = 'Submit'): JQuery {
        return D.submit({ value: text}).appendTo(this.dom).click(this.submit.bind(this));;
    }
    validate():boolean {
        this.dom.find('.has-error').removeClass('has-error');
        //U.log(this.dom.find(this.inputTypes));
        this.dom.find(this.inputTypes).each((index, element) => {
            var input = jQuery(element),
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
                this.get(input.attr('name')).addClass('has-error');
            }
        });
        if (this.dom.find('.has-error').length == 0) {
            return true;
        } else {
            this.onfail(U.str('error.form_validation'));
            return false;
        }        
    }
    submit() {
        if (this.getInput('callback')) {
            this.validate() && this.dom.submit();
        } else {
            this.ajax();
        }
    }
    formData(): any {
        /*var data = new FormData();
        this.dom.find('input').each(function (i, value) {
            var input = $(value);
            U.log(input.attr('name'), input.val());
            switch (input.attr('type')) {
                case 'file':
                    U.each(value['files'], function (name, file) {
                        data.append(name, file);
                    });
                    break;
                default:
                    data.append(input.attr('name'), input.val());
            }
        });
        return data;*/
        //return new window['FormData'](this.dom[0]);
        var data = {};
        this.dom.find('input').each(function (i, value) {
            var input = $(value);
            data[input.attr('name')] = input.val();
        });
        return data;
    }
    /*
    * calls a KAPI api request
    * - fails automaticly will handel 
    */
    ajaxAPI(call: string) {
        if (this.validate()) {
            NProgress.start();
            D.disable(this.dom);
            U.api(call, this.formData, this.onsuccess.bind(this), this.onfail.bind(this));
        }
    }
    /**
    * create an ajax JSON request
    * - fails automaticly will handel 
    */
    ajax(options: JQueryAjaxSettings = {}): JQueryXHR {
        if (this.validate()) {
            NProgress.start();
            D.disable(this.dom);
            var data = this.dom.find('input[type="file"]').length == 0 ? this.formData() : this.dom;
            return U.getJSON(this.dom.attr('action'), data, this.onsuccess.bind(this), this.onfail.bind(this), { type: this.dom.attr('method') });
        } else {
            return null;
        }
    }
    protected onsuccess(data) {
        D.enable(this.dom);
        this.ajaxRescponce = data;
        this.triger('success');
        this.addMessage('success', 'done !');
        NProgress.done();
    }
    protected onfail(error) {
        this.triger('fail');
        this.addMessage(error, 'fail');
        NProgress.done();
    }
    addMessage(text: string, mod: string) {
        D.scrollTo(D.p().append(text).appendTo(this['div_messages']));
    }
    static validateEmail(email): boolean {
        return new RegExp(<any>/^((([a-z]|\d|[!#\jQuery%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\jQuery%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?jQuery/i).test(email);
    }
    reset() {
        this.get('div_messages').empty();
        this.dom.trigger('reset');
        //this.dom.find('[value]').attr('value', null);
        this.dom.find('.has-error').removeClass('has-error');
    }
} 
export = Form;