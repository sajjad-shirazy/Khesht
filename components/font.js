var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/utils', 'modals/admintabpagemodal', 'components/admintabpage', 'components/fileinput'], function (require, exports, D, U, AdminTabPageModal, AdminTabPage, FileInput) {
    var $ = require("jquery");
    var AddFont = (function (_super) {
        __extends(AddFont, _super);
        function AddFont(tabPage) {
            _super.call(this, tabPage, { icon: 'plus', title: 'Add Font' });
            this.dom.attr({ enctype: 'multipart/form-data' });
            this.addHidden('call', 'font.add');
            this.addInput('name', D.text(), true, 'Title');
            var fileInput_options = {
                showPreview: false,
                showCaption: true,
                browseClass: "btn btn-default",
                msgValidationError: 'Error'
            };
            this.addInput('ttf', new FileInput($.extend(fileInput_options, { allowedFileExtensions: ['ttf'] })).DOM, true, 'TTF File');
            this.addInput('svg', new FileInput($.extend(fileInput_options, { allowedFileExtensions: ['svg'] })).DOM, true, 'SVG File');
            this.addInput('eot', new FileInput($.extend(fileInput_options, { allowedFileExtensions: ['eot'] })).DOM, true, 'EOT File');
            this.addInput('woff', new FileInput($.extend(fileInput_options, { allowedFileExtensions: ['woff'] })).DOM, true, 'WOFF File');
        }
        AddFont.prototype.onsuccess = function (data) {
            _super.prototype.onsuccess.call(this, data);
            this.adminTabPage.data = data;
            this.adminTabPage.initFonts();
            this.btn_ok.hide();
        };
        return AddFont;
    })(AdminTabPageModal);
    var Font = (function (_super) {
        __extends(Font, _super);
        function Font() {
            _super.apply(this, arguments);
        }
        Font.prototype.ajaxes = function () {
            return $.extend(_super.prototype.ajaxes.call(this), {
                data: U.getJSON(require.toUrl('pcd_root/designfonts/font.json'), null, null, null, { cache: false })
            });
        };
        Font.prototype.start = function () {
            _super.prototype.start.call(this);
            this.DOM.empty().append(D.div().addClass('col-lg-3').append(D.pageHeader().append(D.h4().append('Fonts')), this.div_fonts = D.div(), D.hr(), D.button(null, 'remove').append('Remove Font').addClass('btn-danger btn-block').click(this.onclick_btn_removeFont.bind(this)), new AddFont(this).link.addClass('btn btn-success btn-block')), D.div().addClass('col-lg-9').append(this.div_items = D.box().append(D.br(9))));
            this.initFonts();
        };
        Font.prototype.initFonts = function () {
            var _this = this;
            this.div_fonts.empty().append(this.data.length > 0 ? this.div_fonts = D.listGroup($.map(this.data, function (value) {
                return D.a(null, 'text-background').append(D.space() + value).click(_this.onclick_fontItem.bind(_this));
            }), 'div') : D.center().append(D.em().text('<Empty>')));
            this.div_fonts.children().first().click();
        };
        Font.prototype.onclick_btn_removeFont = function (e) {
            var _this = this;
            var name = this.data[this.div_fonts.find('.active').index()];
            if (name) {
                $('#loading-mask').show();
                U.getJSON(require.toUrl('api'), {
                    call: 'font.remove',
                    name: name
                }, function (result) {
                    _this.data = result;
                    _this.initFonts();
                    $('#loading-mask').hide();
                });
            }
        };
        Font.prototype.onclick_fontItem = function (e) {
            this.div_fonts.children().removeClass('active');
            this.switchFont(this.data[$(e.target).addClass('active').index()]);
            return false;
        };
        Font.prototype.switchFont = function (name) {
            var fonts = D.dom('style', { type: 'text/css' }).text("@font-face{font-family:'%NAME%';src:url('%PATH%.eot');src:url('%PATH%.eot?#iefix') format('embedded-opentype'),url('%PATH%.woff') format('woff'),url('%PATH%.ttf') format('truetype'),url('%PATH%.svg#%NAME%') format('svg');font-weight:normal;font-style:normal}".replace(/%NAME%/g, name).replace(/%PATH%/g, require.toUrl('pcd_root/designfonts/' + name.replace(/ /g, '').toLowerCase()))), text = 'Big Brother Is Watching You ...', text_size = '2em';
            this.div_items.empty().append(D.pageHeader().append(D.h3().append(D.glyphicon('eye-open'), 'HTML View')), D.box().height(200).append(fonts, D.p().text(text).css({ 'font-family': name, 'font-size': text_size, color: 'brown' })), D.pageHeader().append(D.h3().append(D.glyphicon('eye-open'), 'SVG View')), D.box().height(200).append(D.dom('svg').append(D.dom('def').append(fonts.clone()), D.dom('text').text(text).css({ 'font-family': name, 'font-size': text_size, color: 'brown' }))), D.pageHeader().append(D.h3().append(D.glyphicon('eye-open'), 'PDF View')), D.box().height(300).append(D.em().append('wait a bit ...'), D.dom('embed', {
                src: require.toUrl('api') + '&' + $.param({
                    call: 'font.preview',
                    svg: D.div().append(D.dom('svg').append(D.dom('text', { x: 50, y: 200, 'font-family': name.replace(' ', '').toLowerCase(), 'font-size': text_size, fill: 'brown' }).text(text))).html(),
                    width: 800,
                    height: 200
                })
            }).width('100%').height('80%')), D.br(), D.alert('warning-sign').append('if you see any error on these previewes you have to remove this font.').addClass('alert-warning'));
        };
        return Font;
    })(AdminTabPage);
    return Font;
});
//# sourceMappingURL=font.js.map