var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/form'], function (require, exports, D, Base) {
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form() {
            _super.apply(this, arguments);
        }
        Form.prototype.addInput = function (name, control, required, lable, desc, lWidth) {
            if (required === void 0) { required = true; }
            if (lable === void 0) { lable = null; }
            if (desc === void 0) { desc = null; }
            if (lWidth === void 0) { lWidth = 0; }
            var output = _super.prototype.addInput.call(this, name, D.div().append(D.labeledControl(control, lable, desc, lWidth), lWidth > 0 && lable ? D.br() : null, lWidth > 0 && desc ? D.br() : null).children(), required);
            return output;
        };
        Form.prototype.addButton = function (text, icon) {
            if (text === void 0) { text = 'Submit'; }
            if (icon === void 0) { icon = 'ok'; }
            return D.a(null, icon).addClass('btn btn-info btn-block').append(text).appendTo(this.dom);
        };
        Form.prototype.addSubmit = function (text) {
            if (text === void 0) { text = 'Submit'; }
            return _super.prototype.addSubmit.call(this, text).addClass('btn btn-info btn-block');
        };
        /**
        * type : 'success','warning','fail' other values shows as info
        */
        Form.prototype.addMessage = function (text, mod) {
            switch (mod) {
                case 'success':
                    mod = 'success';
                    break;
                case 'warning':
                    mod = 'warning';
                    break;
                case 'fail':
                    mod = 'danger';
                    break;
                default:
                    mod = 'info';
            }
            D.alert('bell').addClass('alert-' + mod).append(' ' + text).appendTo(this['div_messages']);
        };
        return Form;
    })(Base);
    return Form;
});
//# sourceMappingURL=form.js.map