var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht.bootstrap/form', 'khesht.bootstrap/tab'], function (require, exports, D, Form, Tab) {
    var $ = require("jquery");
    var TemplateViewer = (function (_super) {
        __extends(TemplateViewer, _super);
        function TemplateViewer(template, cases, sides) {
            _super.call(this);
            this.sides = sides;
            this.template = template;
            this.tabs = new Tab();
            this.append(D.panel('Options', [
                sides.front ? this.addInput('side', D.select(['Back', 'Front']).change(this.refresh.bind(this)), true, 'Sides') : null,
                this.addInput('case', D.select(cases.map(function (value) {
                    return value.split('.')[0];
                })).change(this.refresh.bind(this)), true, 'Case'),
                this.addInput('bg', D.checkbox({ checked: true }, 'Show Background Color').change(this.refresh.bind(this))),
                this.addInput('effect', D.checkbox(null, 'Show Effect').change(this.refresh.bind(this))),
                this.addInput('objects', D.checkbox(null, 'Show Design Objects').change(this.refresh.bind(this)))
            ]).addClass('panel-default'), this.tabs.DOM);
            this.tabs.on('change', this.refresh.bind(this));
            this.tabs.addTab('Preview', D.box());
            this.tabs.addTab('PDF', D.box());
        }
        TemplateViewer.prototype.refresh = function () {
            var _this = this;
            this.tabs.selectedItem.empty().append(D.box().append(D.br(4), D.loading().append(D.br(), D.em().append('Please wait ...')), D.br(4)));
            switch (this.tabs.selectedIndex) {
                case 0:
                    var side = this.getInput('side') ? this.getInput('side').val() : 'back', img_preview = D.img({
                        src: require.toUrl('api') + '&' + $.param({
                            call: 'template.renderPreview',
                            form_key: window['FORM_KEY'],
                            template: this.template,
                            side: side,
                            case: this.getInput('case').val(),
                            width: this.sides[side].size[0] * 2.83,
                            height: this.sides[side].size[1] * 2.83,
                            bg: this.getInput('bg').is(':checked'),
                            effect: this.getInput('effect').is(':checked'),
                            objects: this.getInput('objects').is(':checked')
                        })
                    }).load(function () {
                        _this.tabs.selectedItem.empty().append(D.box().append(D.center().append(img_preview)));
                    });
                    break;
                case 1:
                    var side = this.getInput('side') ? this.getInput('side').val() : 'back', emb_pdf = D.dom('embed', {
                        src: require.toUrl('api') + '&' + $.param({
                            call: 'template.renderPDF',
                            form_key: window['FORM_KEY'],
                            template: this.template,
                            side: side,
                            case: this.getInput('case').val(),
                            width: this.sides[side].size[0] * 2.83,
                            height: this.sides[side].size[1] * 2.83,
                            bleed: this.sides[side].bleed * 2.83,
                            bg: this.getInput('bg').is(':checked'),
                            effect: this.getInput('effect').is(':checked'),
                            objects: this.getInput('objects').is(':checked')
                        })
                    }).width('100%').height(this.sides[side].size[1] * 2.83);
                    emb_pdf.ready(function () {
                        _this.tabs.selectedItem.empty().append(D.box().append(D.center().append('please wait ...', emb_pdf)));
                    });
                    break;
            }
        };
        return TemplateViewer;
    })(Form);
    return TemplateViewer;
});
//# sourceMappingURL=templateviewer.js.map