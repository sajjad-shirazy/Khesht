// <amd-dependency path="fileinput/js/fileinput.min"/>
// <amd-dependency path="stylesheet!fileinput/css/fileinput.min"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/element'], function (require, exports, D, Base) {
    var $ = require("jquery");
    var FileInput = (function (_super) {
        __extends(FileInput, _super);
        function FileInput(options) {
            _super.call(this, D.div());
            options = $.extend({
                browseClass: "btn btn-default btn-block btn-lg",
                showCaption: false,
                showRemove: false,
                showUpload: false,
                attr: {}
            }, options);
            this.append(this.input = D.input($.extend({ type: 'file', multiple: true }, options.attr)));
            this.input['fileinput'](options);
        }
        return FileInput;
    })(Base);
    return FileInput;
});
//# sourceMappingURL=fileinput.js.map