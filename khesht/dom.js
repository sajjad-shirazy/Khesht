/// <amd-dependency path="jquery"/>
define(["require", "exports", 'khesht/utils', "jquery"], function (require, exports, U) {
    var $ = require("jquery");
    var DOM = (function () {
        function DOM() {
        }
        DOM.scrollTo = function (dom, duration) {
            if (duration === void 0) { duration = 'slow'; }
            return dom.animate({ scrollTop: 0 }, duration);
        };
        DOM.enable = function (dom) {
            return dom ? dom.removeAttr('disabled') : null;
        };
        DOM.disable = function (dom) {
            return dom ? dom.attr('disabled', 'disabled') : null;
        };
        DOM.dom = function (name, attr) {
            var dom = jQuery(document.createElement(name));
            if (attr)
                dom.attr(attr);
            return dom;
        };
        DOM.link = function (attr) {
            return this.dom('link', attr);
        };
        DOM.stylesheet = function (path) {
            if (this.stylesheets[path]) {
                return this.stylesheets[path];
            }
            else {
                path = require.toUrl(path);
                U.log('loading stylesheet :', path);
                return this.stylesheets[path] = this.link({ rel: 'stylesheet', href: path }).appendTo(this.head);
            }
        };
        /*
        * - paths automaticly match with requireJS configs
        */
        DOM.script = function (files, success) {
            require.call(null, files, 
            //loading ajax datas
            function () {
                U.each(files, function (i, js) {
                    U.log('script file loaded :', js);
                });
                if (success)
                    success();
            }, function (err) {
                U.error(err.requireModules && err.requireModules[0], 'loading scripts failed');
            });
        };
        DOM.space = function (count) {
            if (count === void 0) { count = 1; }
            return (new Array(count + 1)).join('&nbsp;');
        };
        DOM.p = function (attr) {
            return this.dom('p', attr);
        };
        DOM.em = function (attr) {
            return this.dom('em', attr);
        };
        DOM.hr = function (attr) {
            return this.dom('hr', attr);
        };
        DOM.h1 = function (attr) {
            return this.dom('h1', attr);
        };
        DOM.h2 = function (attr) {
            return this.dom('h2', attr);
        };
        DOM.h3 = function (attr) {
            return this.dom('h3', attr);
        };
        DOM.h4 = function (attr) {
            return this.dom('h4', attr);
        };
        DOM.h5 = function (attr) {
            return this.dom('h5', attr);
        };
        DOM.h6 = function (attr) {
            return this.dom('h6', attr);
        };
        DOM.abbr = function (attr) {
            return this.dom('abbr', attr);
        };
        DOM.small = function (attr) {
            return this.dom('small', attr);
        };
        DOM.br = function (times, attr) {
            if (times) {
                return this.div().append(Array.apply(null, new Array(times)).map(function () {
                    return DOM.br(null, attr);
                })).children();
            }
            else {
                return this.dom('br', attr);
            }
        };
        DOM.center = function (attr) {
            return this.dom('center', attr);
        };
        DOM.kbd = function (attr) {
            return this.dom('kbd', attr);
        };
        DOM.div = function (attr) {
            return this.dom('div', attr);
        };
        DOM.img = function (attr) {
            return this.dom('img', attr);
        };
        DOM.span = function (attr) {
            return this.dom('span', attr);
        };
        DOM.strong = function (attr) {
            return this.dom('strong', attr);
        };
        /**
        * items : [item1,item2,...]
        * items : [[item1,value1],[item2,value2],...]
        */
        DOM.ul = function (items, attr) {
            var _this = this;
            var ul = this.dom('ul', attr);
            if (items && items instanceof Array) {
                U.each(items, function (index, item) {
                    if (item) {
                        if (U.isString(item) || item instanceof Array || !item.is('li'))
                            item = _this.dom('li').append(item);
                        ul.append(item);
                    }
                });
            }
            else {
                ul.append(items);
            }
            return ul;
        };
        DOM.li = function (attr) {
            return this.dom('li', attr);
        };
        DOM.svg = function (attr) {
            return this.dom('svg', { 'xmlns': "http://www.w3.org/2000/svg", 'xmlns:xlink': "http://www.w3.org/1999/xlink" }).attr(attr);
        };
        //--------------------------------------------------------------
        // UI
        DOM.a = function (attr) {
            return this.dom('a', $.extend({ href: '#' }, attr));
        };
        DOM.button = function (attr) {
            return this.dom('button', attr).attr('type', 'button');
        };
        DOM.input = function (attr) {
            return this.dom('input', attr);
        };
        DOM.text = function (attr) {
            return this.input(attr).attr('type', 'text');
        };
        DOM.hidden = function (attr) {
            return this.input(attr).attr('type', 'hidden');
        };
        DOM.textarea = function (attr) {
            return this.dom('textarea', attr);
        };
        DOM.email = function (attr) {
            return this.input(attr).attr('type', 'email');
        };
        DOM.password = function (attr) {
            return this.input(attr).attr('type', 'password');
        };
        DOM.checkbox = function (attr) {
            return this.dom('input', attr).attr('type', 'checkbox');
        };
        DOM.radio = function (attr) {
            return this.dom('input', attr).attr('type', 'radio');
        };
        DOM.option = function (attr) {
            return this.dom('option', attr);
        };
        /**
        * data : [item1,item2,...]
        * data : [[item1,value1],[item2,value2],...]
        */
        DOM.options = function (data) {
            var result = new Array();
            if (data) {
                if (data instanceof Array) {
                    U.each(data, function (index, value) {
                        if (value instanceof Array) {
                            result.push(DOM.option({ 'value': value[1] }).append(value[0]));
                        }
                        else {
                            result.push(DOM.option().append(value));
                        }
                    });
                }
            }
            return result;
        };
        /**
        * data : [item1,item2,...]
        * data : [[item1,value1],[item2,value2],...]
        */
        DOM.select = function (items, attr) {
            return this.dom('select', attr).append(this.options(items));
        };
        DOM.optgroup = function (attr) {
            return this.dom('optgroup', attr);
        };
        DOM.submit = function (attr) {
            return this.input(attr).attr('type', 'submit');
        };
        DOM.form = function (attr) {
            return this.dom('form', attr);
        };
        DOM.label = function (forId, attr) {
            return this.dom('label', attr).attr({ 'for': forId });
        };
        DOM.table = function (columns, rows) {
            var head = this.dom('thead').append(this.tr(columns, 'th'));
            var body = this.dom('tbody');
            if (rows)
                $.each(rows, function (index, row) {
                    body.append(DOM.tr(row));
                });
            return this.dom('table').append(head, body);
        };
        /**
        * cells : [cell_1,cell_2,...]
        * cellTag : tag name of cells
        */
        DOM.tr = function (cells, cellTag) {
            if (cellTag === void 0) { cellTag = 'td'; }
            var row = this.dom('tr');
            if (cells) {
                $.each(cells, function (index, cell) {
                    row.append(DOM.dom(cellTag).append(cell));
                });
            }
            return row;
        };
        DOM.fieldset = function (attr) {
            return this.dom('fieldset', attr);
        };
        //-------------------------------------------------------
        //-- components
        DOM.loading = function () {
            return this.center().append(this.img({ src: require.toUrl('images/loading.gif') }));
        };
        DOM.emptyDiv = function (attr) {
            return this.div(attr).append(this.center().append(this.em().append('Empty'))).css('font-weight', 'normal');
        };
        DOM.head = jQuery(document.head);
        DOM.body = jQuery(document.body);
        /*
        * - stylesheet automaticly appends to head
        * - paths automaticly match with requireJS configs
        * - automaticly prevents reapititive css files
        */
        DOM.stylesheets = {};
        return DOM;
    })();
    return DOM;
});
//# sourceMappingURL=dom.js.map