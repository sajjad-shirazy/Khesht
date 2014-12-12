var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/ext/bootstrap/dom', 'khesht/element', 'khesht/utils'], function (require, exports, D, Base, U) {
    var SigninBox = (function (_super) {
        __extends(SigninBox, _super);
        function SigninBox(brand) {
            var _this = this;
            _super.call(this);
            this.dom = D.panel(null, D.form().append(D.glyphicon('user').css({ 'font-size': '3em', color: 'lightgray' }), D.hr(), D.br(), D.labeledControl(this.txt_email = D.text({ type: 'email', name: 'email' }).addClass('input-lg'), 'پست الکترونیک', null, null), D.labeledControl(this.txt_password = D.password({ name: 'password' }).addClass('input-lg'), 'کلمه عبور', null, null), D.br(), this.div_message = D.div(), this.btn_login = D.button().addClass('btn-primary btn-lg btn-block').append('ورود').click(function () {
                _this.btn_login.text('لطفا صبر کنید ...')[0].disabled = true;
                U.api('user.login', { email: _this.txt_email.val(), password: _this.txt_password.val() }, function (data) {
                    if (data) {
                        window['location'] = '?page=user';
                    }
                    else {
                        _this.div_message.prepend(D.alert().addClass('alert-danger').append('پست الکترونیک یا کلمه عبور صحیح نمی باشد .'));
                        _this.btn_login.text('ورود')[0].disabled = false;
                    }
                });
            }))).addClass('panel-default');
        }
        return SigninBox;
    })(Base);
    return SigninBox;
});
//# sourceMappingURL=signinbox.js.map