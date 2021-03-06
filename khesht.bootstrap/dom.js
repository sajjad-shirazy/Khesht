/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht/dom', "jquery"], function (require, exports, U, D) {
    var $ = require('jquery');
    var DOM = (function (_super) {
        __extends(DOM, _super);
        function DOM() {
            _super.apply(this, arguments);
        }
        DOM.glyphiconClass = function (name) {
            return name ? 'glyphicon glyphicon-' + name : null;
        };
        DOM.glyphicon = function (name, spaces) {
            if (spaces === void 0) { spaces = 1; }
            return name ? D.div().append(this.span().addClass('glyphicon glyphicon-' + name).click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                jQuery(e.target).parent().click();
                return false;
            }), this.space(spaces)).children() : null;
        };
        DOM.box = function (attr) {
            return this.div(attr).addClass(this.boxClass).css({ 'margin-top': '5px', 'margin-bottom': '5px' });
        };
        DOM.container = function (attr) {
            return this.div(attr).addClass('container');
        };
        DOM.middeledDIV = function (dom, width) {
            if (width === void 0) { width = 4; }
            var w1 = Math.abs((12 - width) / 2), w3 = 12 - width - w1;
            return [
                this.div().addClass('col-lg-' + w1),
                this.div().addClass('col-lg-' + width).append(dom),
                this.div().addClass('col-lg-' + w3)
            ];
        };
        //--------------------------------------------------------------
        // UI
        DOM.a = function (attr, icon) {
            return _super.a.call(this, attr).append(this.glyphicon(icon), ' ');
        };
        DOM.button = function (attr, icon) {
            return _super.button.call(this, attr).addClass('btn').append(this.glyphicon(icon), ' ');
        };
        DOM.submit = function (attr, icon) {
            return _super.submit.call(this, attr).addClass('btn').append(this.glyphicon(icon), ' ');
        };
        DOM.input = function (attr) {
            return _super.input.call(this, attr).addClass('form-control');
        };
        DOM.textarea = function (attr) {
            return _super.textarea.call(this, attr).addClass('form-control');
        };
        DOM.checkbox = function (attr, desc) {
            return this.div().addClass('checkbox').append(_super.label.call(this, null).append(_super.checkbox.call(this, attr)).append(desc));
        };
        DOM.radio = function (attr, desc) {
            return this.div().addClass('radio').append(_super.label.call(this, null).append(_super.radio.call(this, attr)).append(desc));
        };
        /**
        * data : [item1,item2,...]
        * data : [[item1,value1],[item2,value2],...]
        */
        DOM.select = function (items, attr) {
            return _super.select.call(this, items, attr).addClass('form-control');
        };
        DOM.form = function (attr) {
            return _super.form.call(this, attr).attr('rol', 'form');
        };
        DOM.label = function (forId, attr, text, desc) {
            return _super.label.call(this, forId, attr).addClass('control-label').append(text, (desc ? this.h6().append(desc) : null));
        };
        DOM.table = function (columns, rows) {
            return _super.table.call(this, columns, rows).addClass('table');
        };
        //--------------------------------------------------------------
        //--------------------------------------------------------------
        //--------------------------------------------------------------
        //--------------------------------------------------------------
        // components
        //--------------------------------------------------------------
        DOM.badge = function (value) {
            return this.span().addClass('badge').append(value);
        };
        DOM.formGroup = function (attr) {
            return this.div(attr).addClass('form-group');
        };
        DOM.inputGroup = function (attr) {
            return this.div(attr).addClass('input-group');
        };
        DOM.inputAddon = function (minWidth, attr) {
            return this.span(attr).addClass('input-group-addon').css(minWidth ? { 'min-width': minWidth + 'px' } : {});
        };
        DOM.inputAddonControl = function (minWidth, attr) {
            return this.span(attr).addClass('input-group-btn').css(minWidth ? { 'min-width': minWidth + 'px' } : {});
        };
        /**
        * items:item[]
        */
        DOM.listGroup = function (items, tagname, attr) {
            if (tagname === void 0) { tagname = 'ul'; }
            var output = tagname == 'ul' ? this.ul(items, attr) : this.div(attr).append(items);
            output.children().addClass('list-group-item');
            return output.addClass('list-group');
        };
        DOM.pageHeader = function (attr) {
            return this.div(attr).addClass('page-header');
        };
        DOM.pageFooter = function (attr) {
            return this.div(attr).addClass('footer');
        };
        DOM.labeledControl = function (control, label, desc, lWidth, id) {
            if (lWidth === void 0) { lWidth = 4; }
            if (!id)
                control.attr('id', id = U.uniqueId());
            var dom_lable = label ? this.label(id, null, label, desc) : null;
            return this.formGroup().append(label && lWidth && lWidth < 12 ? [
                this.div().addClass('col-lg-' + lWidth).append(dom_lable),
                this.div().addClass('col-lg-' + (12 - lWidth)).append(control)
            ] : [
                dom_lable,
                control
            ]);
        };
        DOM.closeButton = function (arrt) {
            return this.button(arrt).append('&times;').addClass('close');
        };
        DOM.panel = function (header, body, footer) {
            return this.div().addClass('panel').append(header ? this.div().addClass('panel-heading').append(header) : null, this.div().addClass('panel-body').append(body), footer ? this.div().addClass('panel-footer').append(footer) : null);
        };
        DOM.alert = function (icon) {
            return this.div({ role: 'alert' }).addClass('alert alert-dismissible').append(this.closeButton({ 'data-dismiss': 'alert', 'aria-hidden': 'true' }), this.glyphicon(icon));
        };
        DOM.progress = function () {
            return this.div().addClass('progress');
        };
        DOM.progressBar = function (value, min, max) {
            min |= 0;
            max |= 100;
            value |= 0;
            return this.div({ 'role': 'progressbar', 'aria-valuenow': value, 'aria-valuemin': min, 'aria-valuemax': max }).addClass('progress-bar').css('width', value + '%');
        };
        DOM.collapse = function (id) {
            return this.div({ 'id': id, 'class': 'collapse' });
        };
        /**
        * items : [item1,item2,...]
        * items : [[item1,value1],[item2,value2],...]
        */
        DOM.dropdown = function (tag, title, items, icon) {
            var a_title = this.a({ 'class': 'dropdown-toggle', 'data-toggle': 'dropdown' }, icon).append((title ? [title + ' ', this.dom('b').addClass('caret')] : null));
            return this.dom(tag).addClass('dropdown').append(a_title, this.ul(items).addClass('dropdown-menu'));
        };
        /**
        * menu : [item1,item2,...]
        * menu : [[item1,value1],[item2,value2],...]
        */
        DOM.navbar = function (brand, leftMenu, leftThings, rightMenu) {
            var collapseId = U.uniqueId();
            return this.dom('nav', { 'class': 'navbar', role: 'navigation' }).append(this.div().append(this.navbarHeader(collapseId).append((brand || jQuery('')).addClass('navbar-brand')), this.collapse(collapseId).append(this.ul(leftMenu).addClass('nav navbar-nav'), leftThings, this.ul(rightMenu).addClass('nav navbar-nav navbar-right')).addClass('navbar-collapse')).addClass('container'));
        };
        DOM.navbarHeader = function (collapseId) {
            var sr_only = this.span().addClass('sr-only').append('Toggle navigation');
            var icon_bar = this.span().addClass('icon-bar');
            var btn_toggle = this.button({ 'class': 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '#' + collapseId }).append(sr_only, icon_bar, icon_bar.clone(), icon_bar.clone());
            return this.div().addClass('navbar-header').append(btn_toggle);
        };
        /**
        * items = [[title:JQuery,content:JQuery], [title:JQuery,content:JQuery], ...]
        */
        DOM.accordion = function (items, css) {
            var accordion_id = U.uniqueId(), result = this.div({ id: accordion_id }).addClass('panel-group');
            U.each(items, function (i, item) {
                console.log(item);
                var id = U.uniqueId(), panel = this.panel(this.span().css('font-weight', 'bolder').addClass('panel-title').append(this.a({
                    'data-toggle': 'collapse',
                    'data-parent': '#' + accordion_id,
                    href: '#' + id
                }).append(item[0])), item[1]).addClass(css || 'panel-default');
                this.div({ id: id }).addClass('panel-collapse collapse').append(panel.find('.panel-body')).appendTo(panel);
                result.append(panel);
            });
            return result;
        };
        DOM.breadcrumb = function () {
            return this.dom('ol').addClass('breadcrumb');
        };
        DOM.topmenu = function (brand, left_menu, left_things, right_menu) {
            var top_padding = ++this.topmenusCount * 50;
            this.body.css('paddingTop', top_padding + 10 + 'px');
            return this.navbar(brand, left_menu, left_things, right_menu).css('top', top_padding - 50).css('z-index', 1030 - this.topmenusCount).addClass('navbar-fixed-top');
        };
        DOM.jumbotron = function () {
            return this.div().addClass('jumbotron');
        };
        DOM.popover = function (dom, options) {
            return D.a({ 'data-toggle': 'popover' }).append(dom).popover($.extend({
                trigger: 'focus',
                html: true
            }, options));
        };
        DOM.popoverHelpButton = function (content) {
            return this.popover(this.glyphicon('question-sign'), {
                'content': content
            });
        };
        DOM.topmenusCount = 0;
        DOM.boxClass = 'panel panel-body panel-default';
        return DOM;
    })(D);
    return DOM;
});
//# sourceMappingURL=dom.js.map