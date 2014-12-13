/// <amd-dependency path="jquery"/>

import U = require('khesht/utils');


class DOM {
    static head: JQuery = $(document.head);
    static body: JQuery = $(document.body);
    static enable(dom: JQuery):JQuery {
        return dom ? dom.removeAttr('disabled') : null;
    }
    static disable(dom: JQuery):JQuery {
        return dom ? dom.attr('disabled', 'disabled') : null;
    }
    static dom(name:string, attr?):JQuery {
        var dom = $(document.createElement(name));
        if (attr) dom.attr(attr);
        return dom;
    }
    static link(attr?): JQuery {
        return this.dom('link', attr);
    }
    /*
    * - stylesheet automaticly appends to head 
    * - paths automaticly match with requireJS configs
    * - automaticly prevents reapititive css files    
    */
    protected static stylesheets: any = {};
    static stylesheet(path: string): JQuery {
        if (this.stylesheets[path]) {
            return this.stylesheets[path];
        } else {
            path = require.toUrl(path);
            U.log('loading stylesheet :', path);
            return this.stylesheets[path] = this.link({ rel: 'stylesheet', href: path }).appendTo(this.head);
        }
    }
    /*
    * - paths automaticly match with requireJS configs
    */
    static script(files: string[], success?: () => void) {
        require.call(null, files,
            //loading ajax datas
            function () {
                U.each(files, function (i, js) {
                    U.log('script file loaded :', js);
                });
                if (success) success();
            },
            function (err) {
                U.error(err.requireModules && err.requireModules[0], 'loading scripts failed');
            });
    }
    static p(attr?): JQuery {
        return this.dom('p', attr);
    }
    static em(attr?): JQuery {
        return this.dom('em', attr);
    }
    static hr(attr?): JQuery {
        return this.dom('hr', attr);
    }
    static h1(attr?): JQuery {
        return this.dom('h1', attr);
    }
    static h2(attr?): JQuery {
        return this.dom('h2', attr);
    }
    static h3(attr?): JQuery {
        return this.dom('h3', attr);
    }
    static h4(attr?): JQuery {
        return this.dom('h4', attr);
    }
    static h5(attr?): JQuery {
        return this.dom('h5', attr);
    }
    static h6(attr?): JQuery {
        return this.dom('h6', attr);
    }
    static small(attr?): JQuery {
        return this.dom('small', attr);
    }
    static br(times?:number, attr?): JQuery {
        if (times) {
            return this.div().append(Array.apply(null, new Array(times)).map(function () { return DOM.br(null, attr) })).children();
        } else {
            return this.dom('br', attr);
        }
    }
    static center(attr?): JQuery {
        return this.dom('center', attr);
    }
    static kbd(attr?): JQuery {
        return this.dom('kbd', attr);
    }
    static div(attr?): JQuery {
        return this.dom('div', attr);
    }
    static img(attr?): JQuery {
        return this.dom('img', attr);
    }
    static span(attr?): JQuery {
        return this.dom('span', attr);
    }
    static strong(attr?): JQuery {
        return this.dom('strong', attr);
    }
    /**
    * items : [item1,item2,...]
    * items : [[item1,value1],[item2,value2],...]
    */
    static ul(items: any[], attr?): JQuery {
        var ul = this.dom('ul', attr);
        if (items && items instanceof Array) {
            U.each(items, (index, item) => {
                if (item) {
                    if (item instanceof String || item instanceof Array || !item.is('li'))
                        item = this.dom('li').append(item);
                    ul.append(item);
                }
            });
        } else {
            ul.append(items);
        }
        return ul;
    }
    static li(attr?): JQuery {
        return this.dom('li', attr);
    }
    static svg(attr?): JQuery {
        return this.dom('svg', { 'xmlns': "http://www.w3.org/2000/svg", 'xmlns:xlink': "http://www.w3.org/1999/xlink" }).attr(attr);
    }
    //--------------------------------------------------------------
    // UI
    static a(attr?): JQuery {
        return this.dom('a', $.extend({ href: '#' }, attr));
    }
    static button(attr?): JQuery {
        return this.dom('button', attr).attr('type', 'button');
    }
    static input(attr?): JQuery {
        return this.dom('input', attr);
    }
    static text(attr?): JQuery {
        return this.input(attr).attr('type', 'text');
    }
    static hidden(attr?): JQuery {
        return this.input(attr).attr('type', 'hidden');
    }
    static textarea(attr?): JQuery {
        return this.dom('textarea', attr);
    }
    static email(attr?): JQuery {
        return this.input(attr).attr('type', 'email');
    }
    static password(attr?): JQuery {
        return this.input(attr).attr('type', 'password');
    }
    static checkbox(attr?): JQuery {
        return this.dom('input', attr).attr('type', 'checkbox');
    }
    static radio(attr?): JQuery {
        return this.dom('input', attr).attr('type', 'radio');
    }
    static option(attr?): JQuery {
        return this.dom('option', attr);
    }
    /**
    * data : [item1,item2,...]
    * data : [[item1,value1],[item2,value2],...]
    */
    static options(data:any[]): JQuery {
        var result:any = new Array();
        if (data) {
            if (data instanceof Array) {
                U.each(data, function (index, value) {
                    if (value instanceof Array) {
                        result.push(DOM.option({ 'value': value[1] }).append(value[0]));
                    } else {
                        result.push(DOM.option().append(value));
                    }
                });
            }
        }
        return result;
    }
    /**
    * data : [item1,item2,...]
    * data : [[item1,value1],[item2,value2],...]
    */
    static select(items?, attr?): JQuery {
        return this.dom('select', attr).append(this.options(items));
    }
    static optgroup(attr?): JQuery {
        return this.dom('optgroup', attr);
    }
    static submit(attr?): JQuery {
        return this.input(attr).attr('type', 'submit');
    }
    static form(attr?): JQuery {
        return this.dom('form', attr);
    }
    static label(forId:string, attr?): JQuery {
        return this.dom('label', attr).attr({ 'for': forId });
    }
    static table(columns, rows): JQuery {
        var head = this.dom('thead').append(this.tr(columns, 'th'));
        var body = this.dom('tbody');
        if (rows) $.each(rows, function (index, row) {
            body.append(DOM.tr(row));
        });
        return this.dom('table').append(head, body);
    }
    /**
    * cells : [cell_1,cell_2,...]
    * cellTag : tag name of cells
    */
    static tr(cells: JQuery[], cellTag: string= 'td'): JQuery {
        var row = this.dom('tr');
        if (cells) {
            $.each(cells, function (index, cell) {
                row.append(DOM.dom(cellTag).append(cell));
            });
        }
        return row;
    }
    static fieldset(attr?): JQuery {
        return this.dom('fieldset', attr);
    }
    //-------------------------------------------------------
    //-- components
    static loading(): JQuery {
        return this.center().append(this.img({ src: require.toUrl('images/loading.gif') }));
    }
}
export = DOM;