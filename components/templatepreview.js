var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/element'], function (require, exports, Element) {
    var $ = require("jquery");
    var TemplatePreview = (function (_super) {
        __extends(TemplatePreview, _super);
        function TemplatePreview(template) {
            _super.call(this);
        }
        return TemplatePreview;
    })(Element);
    return TemplatePreview;
});
//# sourceMappingURL=templatepreview.js.map