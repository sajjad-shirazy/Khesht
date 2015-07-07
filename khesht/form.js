var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht/dom', 'khesht/element'], function (require, exports, U, D, Base) {
    var $ = require("jquery");
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(attr, ajaxSubmit) {
            if (ajaxSubmit === void 0) { ajaxSubmit = false; }
            _super.call(this, D.form($.extend({ action: require.toUrl('api') + '/', method: 'POST' }, attr)));
            this.inputTypes = 'input,select,textarea';
            ajaxSubmit || this.addHidden('callback', U.url);
            this.appendProperty('div_messages', D.div());
        }
        Object.defineProperty(Form.prototype, "responce", {
            get: function () {
                return this.ajaxRescponce;
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.setDefaults = function (values) {
            var _this = this;
            U.each(values, function (index, value) {
                _this.setValue(index, value);
            });
        };
        Form.prototype.setValue = function (name, value) {
            var input = this.get(name);
            if (input) {
                input.val(value);
                if (input.attr('type') == 'hidden') {
                    input.trigger('change');
                }
            }
        };
        Form.prototype.getInput = function (name) {
            return name in this ? this[name].input : null;
        };
        Form.prototype.addInput = function (name, control, required) {
            if (required === void 0) { required = false; }
            if (name) {
                var input = control.is(this.inputTypes) ? control : control.find(this.inputTypes);
                input.attr('name', name).data('required', required);
                $.extend(control, { input: input });
                this.appendProperty(name, control);
            }
            return control;
        };
        Form.prototype.addHidden = function (name, value) {
            this.append(this[name] = D.hidden({ name: name, value: value }));
        };
        Form.prototype.addHiddens = function (data) {
            var _this = this;
            U.each(data, function (name, value) {
                _this.addHidden(name, value);
            });
        };
        Form.prototype.addSubmit = function (text) {
            if (text === void 0) { text = 'Submit'; }
            return D.submit({ value: text }).appendTo(this.dom).click(this.submit.bind(this));
            ;
        };
        Form.prototype.validate = function () {
            var _this = this;
            this.dom.find('.has-error').removeClass('has-error');
            //U.log(this.dom.find(this.inputTypes));
            this.dom.find(this.inputTypes).each(function (index, element) {
                var input = jQuery(element), type = type == 'file' ? element['files'] : input.attr('type'), value = input.val(), name = input.attr('name'), hassError = false;
                if (value) {
                    switch (type) {
                        case 'email':
                            hassError = !Form.validateEmail(value);
                            break;
                        case 'password':
                            var pass = _this['pass'] || _this['password'];
                            hassError = name == 'repass' && pass && value != pass.val();
                            break;
                        default:
                            break;
                    }
                }
                else if (input.data('required')) {
                    hassError = true;
                }
                if (hassError) {
                    _this.get(input.attr('name')).addClass('has-error');
                }
            });
            if (this.dom.find('.has-error').length == 0) {
                return true;
            }
            else {
                this.onfail(U.str('error.form_validation'));
                return false;
            }
        };
        Form.prototype.submit = function () {
            if (this.getInput('callback')) {
                this.validate() && this.dom.submit();
            }
            else {
                this.ajax();
            }
        };
        Form.prototype.formData = function () {
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
        };
        /*
        * calls a KAPI api request
        * - fails automaticly will handel
        */
        Form.prototype.ajaxAPI = function (call) {
            if (this.validate()) {
                NProgress.start();
                D.disable(this.dom);
                U.api(call, this.formData, this.onsuccess.bind(this), this.onfail.bind(this));
            }
        };
        /**
        * create an ajax JSON request
        * - fails automaticly will handel
        */
        Form.prototype.ajax = function (options) {
            if (options === void 0) { options = {}; }
            if (this.validate()) {
                NProgress.start();
                D.disable(this.dom);
                var data = this.dom.find('input[type="file"]').length == 0 ? this.formData() : this.dom;
                return U.getJSON(this.dom.attr('action'), data, this.onsuccess.bind(this), this.onfail.bind(this), { type: this.dom.attr('method') });
            }
            else {
                return null;
            }
        };
        Form.prototype.onsuccess = function (data) {
            D.enable(this.dom);
            this.ajaxRescponce = data;
            this.triger('success');
            this.addMessage('success', 'done !');
            NProgress.done();
        };
        Form.prototype.onfail = function (error) {
            this.triger('fail');
            this.addMessage(error, 'fail');
            NProgress.done();
        };
        Form.prototype.addMessage = function (text, mod) {
            D.scrollTo(D.p().append(text).appendTo(this['div_messages']));
        };
        Form.validateEmail = function (email) {
            return new RegExp(/^((([a-z]|\d|[!#\jQuery%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\jQuery%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?jQuery/i).test(email);
        };
        Form.prototype.reset = function () {
            this.get('div_messages').empty();
            this.dom.trigger('reset');
            //this.dom.find('[value]').attr('value', null);
            this.dom.find('.has-error').removeClass('has-error');
        };
        return Form;
    })(Base);
    return Form;
});
//# sourceMappingURL=form.js.map