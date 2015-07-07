var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/utils', 'modals/newtemplate', 'modals/edittemplate', 'components/admintabpage', 'components/templateviewer'], function (require, exports, D, U, NewTemplate, EditTemplate, AdminTabPage, TemplateViewer) {
    var $ = require("jquery");
    var Template = (function (_super) {
        __extends(Template, _super);
        function Template() {
            _super.apply(this, arguments);
        }
        Template.prototype.ajaxes = function () {
            return $.extend(_super.prototype.ajaxes.call(this), {
                data: U.getJSON(require.toUrl('api'), { call: 'template.getList' }, null, null, { cache: false })
            });
        };
        Template.prototype.start = function () {
            _super.prototype.start.call(this);
            this.DOM.empty().append(D.div().addClass('col-lg-3').append(D.pageHeader().append(D.h4().append('Templates')), this.div_templates = D.div(), D.hr(), new NewTemplate(this).link.addClass('btn btn-success btn-block'), D.button(null, 'remove').append('Remove').addClass('btn-danger btn-block').click(this.onclick_btn_removeTemplate.bind(this))), D.div().addClass('col-lg-9').append(this.div_items = D.box().append(D.br(9))));
            this.init();
        };
        Template.prototype.init = function () {
            var _this = this;
            this.div_templates.empty().append(this.data ? this.div_templates = D.listGroup($.map(this.data, function (value, index) {
                return D.a(null, 'modal-window').append(D.space() + index).click(_this.onclick_templateItem.bind(_this));
            }), 'div') : D.center().append(D.em().text('<Empty>')));
            this.div_templates.children().first().click();
        };
        Template.prototype.onclick_btn_removeTemplate = function (e) {
            var _this = this;
            var name = this.data[this.div_templates.find('.active').index()];
            if (name) {
                $('#loading-mask').show();
                U.getJSON(require.toUrl('api'), {
                    call: 'template.remove',
                    name: name
                }, function (result) {
                    _this.data = result;
                    _this.init();
                    $('#loading-mask').hide();
                });
            }
        };
        Template.prototype.onclick_templateItem = function (e) {
            this.div_templates.children().removeClass('active');
            this.switchTemplate(Object.keys(this.data)[$(e.target).addClass('active').index()]);
            return false;
        };
        Template.prototype.switchTemplate = function (name) {
            this.div_items.empty().append(D.a({ href: require.toUrl('site_root/index.php/pcd/?adminmod=true&id=' + name), target: '_blank' }, 'share-alt').append('Load on the designer').addClass('btn btn-info btn-block'), new EditTemplate(this, name).link.addClass('btn btn-success btn-block'), D.br(), new TemplateViewer(name, this.data[name].cases, this.data[name].sides).DOM);
        };
        return Template;
    })(AdminTabPage);
    return Template;
});
//# sourceMappingURL=template.js.map