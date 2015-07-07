//import U = require('khesht/utils');
import D = require('khesht.bootstrap/dom');
import Base = require('khesht/form');

class Form extends Base {
    addInput(name: string, control: JQuery, required: boolean = true, lable: any = null, desc: any = null, lWidth= 0): JQuery {
        var output = super.addInput(name, D.div().append(
            D.labeledControl(control, lable, desc, lWidth),
            lWidth > 0 && lable ? D.br() : null,
            lWidth > 0 && desc ? D.br() : null
            ).children(), required);
        return output;
    }
    addButton(text: string = 'Submit', icon: string = 'ok'): JQuery {
        return D.a(null, icon).addClass('btn btn-info btn-block').append(text).appendTo(this.dom);
    }
    addSubmit(text: string = 'Submit'): JQuery {
        return super.addSubmit(text).addClass('btn btn-info btn-block');
    }
    /**
    * type : 'success','warning','fail' other values shows as info 
    */
    addMessage(text: string, mod: string) {
        switch (mod) {
            case 'success':
                mod = 'success';
                break;
            case 'warning':
                mod = 'warning';
                break;
            case 'fail':
                mod = 'danger';
                break;
            default:
                mod = 'info';
        }
        D.alert('bell').addClass('alert-' + mod).append(' ' + text).appendTo(this['div_messages']);
    }
} 
export = Form;