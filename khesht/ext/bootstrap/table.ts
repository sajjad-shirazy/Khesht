import D = require('khesht/ext/bootstrap/dom');
import Base = require('khesht/element');

class Columns {
    protected table: JQuery;
    constructor(table: JQuery) {
        this.table = table;
    }
    get(index: number):JQuery {
        return this.table.find(['tr *:nth-child(', index, ')'].join(''));
    }
    header(index: number): JQuery {
        return $(this.get(index)[0]);
    }
    rows(index: number):JQuery {
        return $($.grep(<any>this.get(index), function (dom: Element, i) { return dom.tagName == 'TD'; }));
    }
    hide(index: number) {
        this.get(index).hide();
    }
    show(index: number) {
        this.get(index).show();
    }
}
class Table extends Base {
    columns: Columns;
    constructor(data:any[]) {
        super(D.div());
        if (data && data.length > 0) {
            var columns = Object.keys(data[0]),
                rows = data.map(function (value) { return columns.map(function (key) { return value[key]; }); }),
                table = D.table(columns, rows).addClass('table-striped table-hover table-bordered');
            this.columns = new Columns(table);
            this.dom.addClass('table-responsive').append(table);
        }
    }
}
export = Table;