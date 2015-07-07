var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/utils', 'components/admintabpage', 'modals/admintabpagemodal', 'components/fileinput'], function (require, exports, D, U, AdminTabPage, AdminTabPageModal, FileInput) {
    var $ = require("jquery");
    var AddCategory = (function (_super) {
        __extends(AddCategory, _super);
        function AddCategory(tabPage) {
            _super.call(this, tabPage, { icon: 'plus', title: 'Add Category' });
            this.addHidden('call', 'clipart.addCategury');
            this.addInput('name', D.text(), true, 'Title');
        }
        AddCategory.prototype.onsuccess = function (data) {
            _super.prototype.onsuccess.call(this, data);
            this.adminTabPage.data = data;
            this.adminTabPage.initCategories();
        };
        return AddCategory;
    })(AdminTabPageModal);
    var Clipart = (function (_super) {
        __extends(Clipart, _super);
        function Clipart() {
            _super.apply(this, arguments);
        }
        Clipart.prototype.ajaxes = function () {
            return $.extend(_super.prototype.ajaxes.call(this), {
                data: U.getJSON(require.toUrl('pcd_root/cliparts/clipart.json'), null, null, null, { cache: false })
            });
        };
        Clipart.prototype.start = function () {
            _super.prototype.start.call(this);
            this.DOM.empty().append(D.div().addClass('col-lg-3').append(D.pageHeader().append(D.h4().append('Categories')), this.div_categuries = D.div(), D.hr(), D.button(null, 'remove').append('Remove Category').addClass('btn-danger btn-block').click(this.onclick_btn_removeCat.bind(this)), new AddCategory(this).link.addClass('btn btn-success btn-block')), this.div_items = D.div().addClass('col-lg-9'));
            this.initCategories();
        };
        Clipart.prototype.initCategories = function () {
            var _this = this;
            this.div_categuries.empty().append(this.div_categuries = D.listGroup($.map(this.data, function (value, key) {
                return D.a(null, 'folder-close').append(D.space() + key).click(_this.onclick_categuryItem.bind(_this));
            }), 'div'));
            this.div_categuries.children().first().click();
        };
        Clipart.prototype.onclick_btn_removeCat = function (e) {
            var _this = this;
            var name = Object.keys(this.data)[this.div_categuries.find('.active').index()];
            if (name) {
                $('#loading-mask').show();
                U.getJSON(require.toUrl('api'), {
                    call: 'clipart.removeCategury',
                    name: name
                }, function (result) {
                    _this.data = result;
                    _this.start();
                    $('#loading-mask').hide();
                });
            }
        };
        Clipart.prototype.onclick_categuryItem = function (e) {
            this.div_categuries.children().removeClass('active');
            this.switchCatagury(Object.keys(this.data)[$(e.target).addClass('active').index()]);
            return false;
        };
        Clipart.prototype.switchCatagury = function (name) {
            var _this = this;
            var fileInput = new FileInput({
                initialCaption: name,
                allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
                uploadUrl: require.toUrl('api'),
                overwriteInitial: false,
                uploadAsync: false,
                initialPreview: $.map(this.data[name], function (value) {
                    return D.div().append(D.img({ src: require.toUrl('pcd_root/cliparts/' + value) }).addClass('file-preview-image')).html();
                }),
                initialPreviewConfig: $.map(this.data[name], function (value, index) {
                    return {
                        caption: value,
                        width: "120px",
                        url: require.toUrl('api'),
                        key: index
                    };
                }),
                uploadExtraData: {
                    form_key: window['FORM_KEY'],
                    call: 'clipart.uploadItem',
                    categury: name
                },
                deleteExtraData: {
                    form_key: window['FORM_KEY'],
                    call: 'clipart.removeItem',
                    categury: name
                }
            });
            fileInput.input.on('filedeleted', function (event, key, jqXHR) {
                _this.data = jqXHR.responseJSON;
            }).on('fileuploaded', function (event, data, previewId, index) {
                _this.data = data.response;
            }).on('filecleared', function (event) {
                _this.switchCatagury(name);
            });
            this.div_items.empty().append(fileInput.DOM);
        };
        Clipart.icon = 'heart';
        return Clipart;
    })(AdminTabPage);
    return Clipart;
});
//# sourceMappingURL=clipart.js.map