var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', 'khesht/eventdispatcher'], function (require, exports, U, EventDispatcher) {
    var Khesht = (function (_super) {
        __extends(Khesht, _super);
        function Khesht() {
            _super.apply(this, arguments);
        }
        Khesht.dom = function (name, attr) {
            var dom = $(document.createElement(name));
            if (attr)
                dom.attr(attr);
            return dom;
        };
        /*
        * - stylesheet automaticly appends to head
        * - paths automaticly match with requireJS configs
        */
        Khesht.stylesheet = function (path) {
            path = require.toUrl(path);
            U.log('loading stylesheet :', path);
            return this.head.append(B.dom('link', { rel: 'stylesheet', href: path }));
        };
        Khesht.p = function (attr) {
            return this.dom('p', attr);
        };
        Khesht.em = function (attr) {
            return this.dom('em', attr);
        };
        Khesht.hr = function (attr) {
            return this.dom('hr', attr);
        };
        Khesht.h1 = function (attr) {
            return this.dom('h1', attr);
        };
        Khesht.h2 = function (attr) {
            return this.dom('h2', attr);
        };
        Khesht.h3 = function (attr) {
            return this.dom('h3', attr);
        };
        Khesht.h4 = function (attr) {
            return this.dom('h4', attr);
        };
        Khesht.h5 = function (attr) {
            return this.dom('h5', attr);
        };
        Khesht.small = function (attr) {
            return this.dom('small', attr);
        };
        Khesht.br = function (times, attr) {
            if (times) {
                return Array.apply(null, new Array(times)).map(function () {
                    return this.br(null, attr);
                });
            }
            else {
                return this.dom('br', attr);
            }
        };
        Khesht.center = function (attr) {
            return this.dom('center', attr);
        };
        Khesht.kbd = function (attr) {
            return this.dom('kbd', attr);
        };
        Khesht.div = function (attr) {
            return this.dom('div', attr);
        };
        Khesht.img = function (attr) {
            return this.dom('img', attr);
        };
        Khesht.span = function (attr) {
            return this.dom('span', attr);
        };
        Khesht.strong = function (attr) {
            return this.dom('strong', attr);
        };
        /**
        * items : [item1,item2,...]
        * items : [[item1,value1],[item2,value2],...]
        */
        Khesht.ul = function (items, attr) {
            var ul = this.dom('ul', attr);
            if (items && items instanceof Array) {
                U.each(items, function (index, item) {
                    if (item) {
                        if (item instanceof String || item instanceof Array || !item.is('li'))
                            item = this.dom('li').append(item);
                        ul.append(item);
                    }
                });
            }
            else {
                ul.append(items);
            }
            return ul;
        };
        Khesht.li = function (attr) {
            return this.dom('li', attr);
        };
        Khesht.svg = function (attr) {
            return this.dom('svg', { 'xmlns': "http://www.w3.org/2000/svg", 'xmlns:xlink': "http://www.w3.org/1999/xlink" }).attr(attr);
        };
        //--------------------------------------------------------------
        // UI
        Khesht.a = function (attr) {
            return this.dom('a', { href: '#' }).attr(attr);
        };
        Khesht.button = function (attr) {
            return this.dom('button', attr).attr('type', 'button');
        };
        Khesht.input = function (attr) {
            return this.dom('input', attr);
        };
        Khesht.text = function (attr) {
            return this.input(attr).attr('type', 'text');
        };
        Khesht.textarea = function (attr) {
            return this.dom('textarea', attr);
        };
        Khesht.email = function (attr) {
            return this.input(attr).attr('type', 'email');
        };
        Khesht.password = function (attr) {
            return this.input(attr).attr('type', 'password');
        };
        Khesht.checkbox = function (attr) {
            return this.dom('input', attr).attr('type', 'checkbox');
        };
        Khesht.radio = function (attr) {
            return this.dom('input', attr).attr('type', 'radio');
        };
        Khesht.option = function (attr) {
            return this.dom('option', attr);
        };
        /**
        * data : [item1,item2,...]
        * data : [[item1,value1],[item2,value2],...]
        */
        Khesht.options = function (data) {
            var result = new Array();
            if (data) {
                if (data instanceof Array) {
                    $.each(data, function (index, value) {
                        if (value instanceof Array) {
                            result.push(this.option({ 'value': value[1] }).append(value[0]));
                        }
                        else {
                            result.push(this.option().append(value));
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
        Khesht.select = function (items, attr) {
            return this.dom('select', attr).append(this.options(items));
        };
        Khesht.optgroup = function (attr) {
            return this.dom('optgroup', attr);
        };
        Khesht.submit = function (attr) {
            return this.input(attr).attr('type', 'submit');
        };
        Khesht.form = function (attr) {
            return this.dom('form', attr);
        };
        Khesht.label = function (forId, attr) {
            return this.dom('label', attr).attr({ 'for': forId });
        };
        Khesht.table = function (columns, rows) {
            var head = this.dom('thead').append(this.tr(columns, 'th'));
            var body = this.dom('tbody');
            if (rows)
                $.each(rows, function (index, row) {
                    body.append(this.tr(row));
                });
            return this.dom('table').append(head, body);
        };
        /**
        * cells : [cell_1,cell_2,...]
        * cellTag : tag name of cells
        */
        Khesht.tr = function (cells, cellTag) {
            if (cellTag === void 0) { cellTag = 'td'; }
            var row = this.dom('tr');
            if (cells) {
                $.each(cells, function (index, cell) {
                    row.append(this.dom(cellTag).append(cell));
                });
            }
            return row;
        };
        Khesht.fieldset = function (attr) {
            return this.dom('fieldset', attr);
        };
        Khesht.head = $(document.head);
        Khesht.body = $(document.body);
        return Khesht;
    })(EventDispatcher);
    return Khesht;
});
//# sourceMappingURL=khesht.js.map