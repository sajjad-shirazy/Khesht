/// <amd-dependency path="fileinput/js/fileinput.min.js"/>
/// <amd-dependency path="stylesheet!fileinput/css/fileinput.min.css"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/ext/bootstrap/dom', 'khesht/element', "fileinput/js/fileinput.min.js", "stylesheet!fileinput/css/fileinput.min.css"], function (require, exports, D, Base) {
    var FileInput = (function (_super) {
        __extends(FileInput, _super);
        function FileInput(options) {
            _super.call(this, D.div());
            options = $.extend({
                browseClass: "btn btn-default btn-block btn-lg",
                showCaption: false,
                showRemove: false,
                showUpload: false,
                browseLabel: 'جستجوی فایل ها',
                msgFilesTooMany: 'شما {n} فایل را انتخاب کرده اید . این بیشتر از تعداد مجاز است .',
                msgSizeTooLarge: 'حجم {name} بیشتر از حدّ مجاز است .',
                msgInvalidFileType: 'امکان ارسال این نوع از فایل ها نیست .',
                msgLoading: 'لطفا صبر کنید',
                msgProgress: 'در حال بارگزاری {name}',
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