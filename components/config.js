var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/utils', 'components/admintabpage', 'khesht.bootstrap/form'], function (require, exports, D, U, AdminTabPage, Form) {
    var $ = require("jquery");
    var Config = (function (_super) {
        __extends(Config, _super);
        function Config() {
            _super.apply(this, arguments);
        }
        Config.prototype.ajaxes = function () {
            return $.extend(_super.prototype.ajaxes.call(this), {
                data: U.getJSON(require.toUrl('pcd_root/config.json'), null, null, null, { cache: false })
            });
        };
        Config.prototype.start = function () {
            _super.prototype.start.call(this);
            var form = new Form({}, true);
            form.addInput('default_id', D.text().val(this.data.default_id), true, 'Default Prouduct', 'an entity id of a product or a template name. indicates what must load on http://yoursite.com/pcd/ by default.');
            form.addInput('max_upload_size', D.text().val(this.data.max_upload_size), true, 'Max file size of user uploads (bytes)');
            form.addButton('Save', 'floppy-disk').click(function () {
                if (form.validate()) {
                    $('#loading-mask').show();
                    U.getJSON(require.toUrl('api'), $.extend(form.formData(), {
                        call: 'system.saveConfig',
                        form_key: window['FORM_KEY']
                    }), function (result) {
                        $('#loading-mask').hide();
                        alert('Saved !');
                    });
                }
            });
            this.dom.empty().append(D.box().addClass('col-lg-6').append(D.box().append(form.DOM), D.box().append(D.a().append('Clean Uploaded files').addClass('btn btn-block btn-danger').click(function () {
                $('#loading-mask').show();
                U.getJSON(require.toUrl('api'), {
                    call: 'system.cleanUploads',
                    form_key: window['FORM_KEY']
                }, function (result) {
                    $('#loading-mask').hide();
                    alert(result + ' items cleaned !');
                }, function (error) {
                    $('#loading-mask').hide();
                    alert('Cleaning Uploaded files failed!');
                });
            }))));
        };
        return Config;
    })(AdminTabPage);
    return Config;
});
//# sourceMappingURL=config.js.map