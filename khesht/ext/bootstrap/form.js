var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht/ext/bootstrap/dom', 'khesht/element'], function (require, exports, U, D, Base) {
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(page, attr) {
            _super.call(this, D.form($.extend({ action: require.toUrl('api') + '/', method: 'POST' }, attr)));
            this.inputTypes = 'input,select,textarea';
            this.page = page;
            this.addHidden('callback', this.page.url);
        }
        Form.prototype.setDefaults = function (values) {
            var _this = this;
            U.each(values, function (index, value) {
                _this.set(index, value);
            });
        };
        Form.prototype.disable = function (name) {
            D.disable(this[name]);
        };
        Form.prototype.enable = function (name) {
            D.enable(this[name]);
        };
        Form.prototype.set = function (name, value) {
            var input = this[name];
            if (input) {
                input.val(value);
                if (input.attr('type') == 'hidden') {
                    input.trigger('change');
                }
            }
        };
        Form.prototype.br = function (counts) {
            if (counts === void 0) { counts = null; }
            this.append(D.br(counts));
        };
        Form.prototype.hr = function () {
            this.append(D.hr());
        };
        Form.prototype.addInput = function (name, control, required, label, description, lWidth, br) {
            if (required === void 0) { required = false; }
            if (label === void 0) { label = ''; }
            if (description === void 0) { description = null; }
            if (br === void 0) { br = true; }
            control = control instanceof jQuery ? control : D.box().append(control).css({ padding: '7px' }); //D.text({ disabled: true }).val(control);
            var input = label ? D.labeledControl(control, label, description, lWidth).append(br ? D.br(2) : null) : D.div().append(control, br ? D.br() : null).children();
            this.append(input);
            if (name) {
                this[name + '_wrapper'] = input;
                this[name] = this[name + '_wrapper'].find(this.inputTypes).attr('name', name).data('required', required);
            }
            return control;
        };
        Form.prototype.addDescription = function (title, icon) {
            this.append(D.p().append(D.glyphicon(icon), ' ', title));
        };
        Form.prototype.addSection = function (title, icon) {
            if (icon === void 0) { icon = 'bookmark'; }
            this.append(D.pageHeader().append(D.h2().append(D.glyphicon(icon), ' ', title)));
        };
        Form.prototype.addHidden = function (name, value) {
            this.append(this[name] = D.hidden({ name: name, value: value }));
        };
        Form.prototype.addSubmit = function (icon) {
            return D.button(null, icon).addClass('btn-lg btn-block btn-success').appendTo(this.dom).click(this.submit.bind(this));
        };
        Form.prototype.submit = function () {
            var _this = this;
            this.dom.find('.has-error').removeClass('has-error');
            this.dom.find(this.inputTypes).each(function (index, element) {
                var input = $(element), type = type == 'file' ? element['files'] : input.attr('type'), value = input.val(), name = input.attr('name'), hassError = false;
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
                    _this.inputWrapper(input.attr('name')).addClass('has-error');
                }
            });
            if (this.dom.find('.has-error').length == 0) {
                this.dom.submit();
            }
            else {
                this.onvalidationfail();
            }
        };
        Form.prototype.onvalidationfail = function () {
            this.page.addMessage('validation_fail', 'fail');
        };
        Form.prototype.inputWrapper = function (name) {
            return this[name + '_wrapper'];
        };
        Form.validateEmail = function (email) {
            return new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(email);
        };
        return Form;
    })(Base);
    return Form;
});
//# sourceMappingURL=form.js.map