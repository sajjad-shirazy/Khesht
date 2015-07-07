var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/utils', 'components/admintabpage', 'components/fileinput'], function (require, exports, D, U, AdminTabPage, FileInput) {
    var $ = require("jquery");
    var Effect = (function (_super) {
        __extends(Effect, _super);
        function Effect() {
            _super.apply(this, arguments);
        }
        Effect.prototype.ajaxes = function () {
            return $.extend(_super.prototype.ajaxes.call(this), {
                data: U.getJSON(require.toUrl('pcd_root/effects/effect.json'), null, null, { cache: false })
            });
        };
        Effect.prototype.start = function () {
            var _this = this;
            _super.prototype.start.call(this);
            var fileInput = new FileInput({
                initialCaption: name,
                allowedFileExtensions: ['svg'],
                uploadUrl: require.toUrl('api'),
                overwriteInitial: false,
                uploadAsync: false,
                initialPreview: $.map(this.data.effect.names, function (value) {
                    return D.div().append(D.img({ src: require.toUrl(['pcd_root/effect/', value, '.svg'].join('')) }).addClass('file-preview-image')).html();
                }),
                initialPreviewConfig: $.map(this.data.effect.names, function (value, index) {
                    return {
                        caption: value,
                        width: "120px",
                        url: require.toUrl('api'),
                        key: value
                    };
                }),
                uploadExtraData: {
                    form_key: window['FORM_KEY'],
                    call: 'effect.uploadItem',
                    categury: name
                },
                deleteExtraData: {
                    form_key: window['FORM_KEY'],
                    call: 'effect.removeItem',
                    categury: name
                }
            });
            fileInput.input.on('filedeleted', function (event, key, jqXHR) {
                _this.data = jqXHR.responseJSON;
            }).on('fileuploaded', function (event, data, previewId, index) {
                _this.data = data.response;
            }).on('filecleared', function (event) {
                _this.start();
            });
            this.dom.empty().append(fileInput.DOM);
        };
        return Effect;
    })(AdminTabPage);
    return Effect;
});
//# sourceMappingURL=effects.js.map