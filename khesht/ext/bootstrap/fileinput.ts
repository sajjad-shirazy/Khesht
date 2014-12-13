/// <amd-dependency path="fileinput/js/fileinput.min.js"/>
/// <amd-dependency path="stylesheet!fileinput/css/fileinput.min.css"/>

import D = require('khesht/ext/bootstrap/dom');
import Base = require('khesht/element');

class FileInput extends Base {
    input: JQuery;
    constructor(options) {
        super(D.div());
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
}
export = FileInput; 