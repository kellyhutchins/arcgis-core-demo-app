
import Widget from "@arcgis/core/widgets/Widget";
import { subclass, property } from "@arcgis/core/core/accessorSupport/decorators";

import { messageBundle } from "@arcgis/core/widgets/support/decorators/messageBundle";
import { tsx } from "@arcgis/core/widgets/support/widget";
const CSS = {
    base: "esri-hello-world",
    emphasis: "esri-hello-world--emphasis"
};

@subclass("esri.widgets.HelloWorld")
class HelloWorld extends Widget {

    constructor(params?: any) {
        super(params);
    }
    @property()
    firstName: string = "John";

    @property()
    lastName: string = "Smith";

    @property()
    emphasized: boolean = false;

    @property()
    @messageBundle("ts-tutorial-app/assets/widgetT9n/widget")
    messages = null;

    render() {
        const greeting = this._getGreeting();
        const classes = {
            [CSS.emphasis]: this.emphasized
        };

        return (
            <div class={this.classes(CSS.base, classes)}>
                {greeting}
            </div>
        );
    }

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    private _getGreeting(): string {
        return `${this.messages.greeting} ${this.firstName} ${this.lastName}!`;
    }

}

export default HelloWorld;