import D = require('khesht.bootstrap/dom');
import Component = require('khesht/component');


class WizardPage<InputType> extends Component {
    /**
    * input from prev wisard page
    */
    protected input: InputType;
    protected title: string;
    constructor(title: string) {
        super(D.div(), false);
        this.title = title;
    }
    load(input?: InputType) {
        this.input = input;
        super.load();
    }
    protected start() {
        super.start();
        document.title = this.title;
        this.dom.append(
            D.pageHeader().append(D.h1().append(this.title))
            );
    }
    process(success: () => void, fail: (message: string) => void) {
        success();
    }
}

export = WizardPage;