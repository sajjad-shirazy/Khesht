var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht.bootstrap/dom', 'khesht/element'], function (require, exports, D, Base) {
    var $ = require("jquery");
    var Columns = (function () {
        function Columns(table) {
            this.table = table;
        }
        Columns.prototype.get = function (index) {
            return this.table.find(['tr *:nth-child(', index, ')'].join(''));
        };
        Columns.prototype.header = function (index) {
            return jQuery(this.get(index)[0]);
        };
        Columns.prototype.rows = function (index) {
            return jQuery($.grep(this.get(index), function (dom, i) {
                return dom.tagName == 'TD';
            }));
        };
        Columns.prototype.hide = function (index) {
            this.get(index).hide();
        };
        Columns.prototype.show = function (index) {
            this.get(index).show();
        };
        return Columns;
    })();
    var Table = (function (_super) {
        __extends(Table, _super);
        function Table(data) {
            _super.call(this, D.div());
            if (data && data.length > 0) {
                var columns = Object.keys(data[0]), rows = data.map(function (value) {
                    return columns.map(function (key) {
                        return value[key];
                    });
                }), table = D.table(columns, rows).addClass('table-striped table-hover table-bordered');
                this.columns = new Columns(table);
                this.dom.addClass('table-responsive').append(table);
            }
        }
        return Table;
    })(Base);
    return Table;
});
//# sourceMappingURL=table.js.map