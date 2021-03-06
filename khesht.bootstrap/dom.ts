﻿/// <amd-dependency path="jquery"/>

import U = require('khesht/utils');
import D = require('khesht/dom'); 

var $: JQueryStatic = require('jquery');

class DOM extends D {
    static topmenusCount = 0;
    static boxClass = 'panel panel-body panel-default';
    protected static glyphiconClass(name): string {
        return name ? 'glyphicon glyphicon-' + name : null;
    }
    static glyphicon(name, spaces: number = 1): JQuery {
        return name ? D.div().append(
            this.span().addClass('glyphicon glyphicon-' + name).click(function (e: Event) {
                e.preventDefault();
                e.stopPropagation();
                jQuery(e.target).parent().click();
                return false;
            }),
            this.space(spaces)
        ).children() : null;
    }
    static box(attr?): JQuery {
        return this.div(attr).addClass(this.boxClass).css({ 'margin-top': '5px', 'margin-bottom': '5px' });
    }
    static container(attr?): JQuery {
        return this.div(attr).addClass('container');
    }
    static middeledDIV(dom: JQuery, width: number = 4): JQuery {
        var w1 = Math.abs((12 - width) / 2),
            w3 = 12 - width - w1;
        return <any>[
            this.div().addClass('col-lg-' + w1),
            this.div().addClass('col-lg-' + width).append(dom),
            this.div().addClass('col-lg-' + w3)
        ];
    }
    //--------------------------------------------------------------
    // UI
    static a(attr?, icon?: string): JQuery {
        return super.a(attr).append(this.glyphicon(icon), ' ');
    }
    static button(attr?, icon?: string): JQuery {
        return super.button(attr).addClass('btn').append(this.glyphicon(icon), ' ');
    }
    static submit(attr?, icon?: string): JQuery {
        return super.submit(attr).addClass('btn').append(this.glyphicon(icon), ' ');
    }
    static input(attr?): JQuery {
        return super.input(attr).addClass('form-control');
    }
    static textarea(attr?): JQuery {
        return super.textarea(attr).addClass('form-control');
    }
    static checkbox(attr?, desc?): JQuery {
        return this.div().addClass('checkbox').append(super.label(null).append(super.checkbox(attr)).append(desc));
    }
    static radio(attr?, desc?): JQuery {
        return this.div().addClass('radio').append(super.label(null).append(super.radio(attr)).append(desc));
    }
    /**
    * data : [item1,item2,...]
    * data : [[item1,value1],[item2,value2],...]
    */
    static select(items?, attr?): JQuery {
        return super.select(items, attr).addClass('form-control');
    }
    static form(attr?): JQuery {
        return super.form(attr).attr('rol', 'form');
    }
    static label(forId: string, attr?, text?, desc?): JQuery {
        return super.label(forId, attr).addClass('control-label').append(text, (desc ? this.h6().append(desc) : null));
    }
    static table(columns, rows): JQuery {
        return super.table(columns, rows).addClass('table');
    }
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    // components
    //--------------------------------------------------------------
    static badge(value: any): JQuery {
        return this.span().addClass('badge').append(value);
    }
    static formGroup(attr?): JQuery {
        return this.div(attr).addClass('form-group');
    }
    static inputGroup(attr?): JQuery {
        return this.div(attr).addClass('input-group');
    }
    static inputAddon(minWidth?: number, attr?): JQuery {
        return this.span(attr).addClass('input-group-addon').css(minWidth ? { 'min-width': minWidth + 'px' } : {});
    }
    static inputAddonControl(minWidth?: number, attr?): JQuery {
        return this.span(attr).addClass('input-group-btn').css(minWidth ? { 'min-width': minWidth + 'px' } : {});
    }
    /**
    * items:item[]
    */
    static listGroup(items, tagname= 'ul', attr?): JQuery {
        var output = tagname == 'ul' ? this.ul(items, attr) : this.div(attr).append(items);
        output.children().addClass('list-group-item');
        return output.addClass('list-group');
    }
    static pageHeader(attr?): JQuery {
        return this.div(attr).addClass('page-header');
    }
    static pageFooter(attr?): JQuery {
        return this.div(attr).addClass('footer');
    }
    static labeledControl(control: JQuery, label: any, desc?: any, lWidth: number= 4, id?: string): JQuery {
        if (!id) control.attr('id', id = U.uniqueId());
        var dom_lable = label ? this.label(id, null, label, desc) : null;
        return this.formGroup().append(
            label && lWidth && lWidth < 12 ?
            [
                this.div().addClass('col-lg-' + lWidth).append(dom_lable),
                this.div().addClass('col-lg-' + (12 - lWidth)).append(control)
            ] : [
                dom_lable,
                control
            ]
            );
    }
    static closeButton(arrt?): JQuery {
        return this.button(arrt).append('&times;').addClass('close');
    }
    static panel(header: any, body: any, footer?: any): JQuery {
        return this.div().addClass('panel').append(header ? this.div().addClass('panel-heading').append(header) : null, this.div().addClass('panel-body').append(body), footer ? this.div().addClass('panel-footer').append(footer) : null);
    }
    static alert(icon?: string): JQuery {
        return this.div({ role: 'alert' }).addClass('alert alert-dismissible').append(this.closeButton({ 'data-dismiss': 'alert', 'aria-hidden': 'true' }), this.glyphicon(icon));
    }
    static progress(): JQuery {
        return this.div().addClass('progress');
    }
    static progressBar(value: number, min: number, max: number): JQuery {
        min |= 0;
        max |= 100;
        value |= 0;
        return this.div({ 'role': 'progressbar', 'aria-valuenow': value, 'aria-valuemin': min, 'aria-valuemax': max }).addClass('progress-bar').css('width', value + '%');
    }
    static collapse(id: string): JQuery {
        return this.div({ 'id': id, 'class': 'collapse' });
    }
    /**
    * items : [item1,item2,...]
    * items : [[item1,value1],[item2,value2],...]
    */
    static dropdown(tag: string, title: string, items: any[], icon?: string): JQuery {
        var a_title = this.a({ 'class': 'dropdown-toggle', 'data-toggle': 'dropdown' }, icon).append((title ? [title + ' ', this.dom('b').addClass('caret')] : null));
        return this.dom(tag).addClass('dropdown').append(a_title, this.ul(items).addClass('dropdown-menu'));
    }
    /**
    * menu : [item1,item2,...]
    * menu : [[item1,value1],[item2,value2],...]
    */
    static navbar(brand: JQuery, leftMenu?: any[], leftThings?: JQuery, rightMenu?: any[]): JQuery {
        var collapseId = U.uniqueId();
        return this.dom('nav', { 'class': 'navbar', role: 'navigation' }).append(
            this.div().append(
                this.navbarHeader(collapseId).append((brand || jQuery('')).addClass('navbar-brand')),
                this.collapse(collapseId).append(
                    this.ul(leftMenu).addClass('nav navbar-nav'),
                    leftThings,
                    this.ul(rightMenu).addClass('nav navbar-nav navbar-right')
                    ).addClass('navbar-collapse')
                ).addClass('container')
            );
    }
    static navbarHeader(collapseId: string): JQuery {
        var sr_only = this.span().addClass('sr-only').append('Toggle navigation');
        var icon_bar = this.span().addClass('icon-bar');
        var btn_toggle = this.button({ 'class': 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '#' + collapseId }).append(sr_only, icon_bar, icon_bar.clone(), icon_bar.clone());
        return this.div().addClass('navbar-header').append(btn_toggle);
    }
    /**
    * items = [[title:JQuery,content:JQuery], [title:JQuery,content:JQuery], ...]
    */
    static accordion(items: any[], css?: string): JQuery {
        var accordion_id = U.uniqueId(),
            result = this.div({ id: accordion_id }).addClass('panel-group');
        U.each(items, function (i, item) {
            console.log(item);
            var id = U.uniqueId(),
                panel = this.panel(
                    //title
                    this.span().css('font-weight', 'bolder').addClass('panel-title').append(this.a({
                        'data-toggle': 'collapse',
                        'data-parent': '#' + accordion_id,
                        href: '#' + id
                    }).append(item[0])),
                    //body
                    item[1]
                    ).addClass(css || 'panel-default');
            this.div({ id: id }).addClass('panel-collapse collapse').append(panel.find('.panel-body')).appendTo(panel);
            result.append(panel);
        });
        return result;
    }
    static breadcrumb(): JQuery {
        return this.dom('ol').addClass('breadcrumb');
    }
    static topmenu(brand, left_menu, left_things, right_menu): JQuery {
        var top_padding = ++this.topmenusCount * 50;
        this.body.css('paddingTop', top_padding + 10 + 'px');
        return this.navbar(brand, left_menu, left_things, right_menu).css('top', top_padding - 50).css('z-index', 1030 - this.topmenusCount).addClass('navbar-fixed-top');
    }
    static jumbotron(): JQuery {
        return this.div().addClass('jumbotron');
    }
    static popover(dom: JQuery, options): JQuery {
        return D.a({ 'data-toggle': 'popover' }).append(dom).popover($.extend({
            trigger: 'focus',
            html: true
        }, options));
    }
    static popoverHelpButton(content:JQuery): JQuery {
        return this.popover(this.glyphicon('question-sign'), {
            'content': content
        });
    }
}
export = DOM;