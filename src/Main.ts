import ApplicationBase from "./ApplicationBase/ApplicationBase";
import Expand from "@arcgis/core/widgets/Expand";
import Legend from "@arcgis/core/widgets/Legend";
import HelloWorld from "./HelloWorld/HelloWorld";
import { registerMessageBundleLoader, createJSONLoader, fetchMessageBundle, setLocale, getLocale } from "@arcgis/core/intl";
import { autoUpdatedStrings } from "./ApplicationBase/support/t9nUtils/autoUpdateStringUtils";
const CSS = {
    loading: "configurable-application--loading"
};

import {
    createMapFromItem,
    createView,
    getConfigViewProperties,
    getItemTitle
} from "./ApplicationBase/support/itemUtils";

import {
    setPageLocale,
    setPageDirection,
    setPageTitle
} from "./ApplicationBase/support/domHelper";


export default class Main {
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  ApplicationBase
    //----------------------------------
    base: ApplicationBase = null;
    bundle = null;
    bundleName = "ts-tutorial-app/assets/appNLS/t9n/common"
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public constructor(base: ApplicationBase) {

        this._handleT9N()

        if (!base) {
            console.error("ApplicationBase is not defined");
            return;
        }

        setPageLocale(base.locale);
        setPageDirection(base.direction);

        this.base = base;
        const { webMapItems } = base?.results;

        const validWebMapItems = webMapItems.map(response => {
            return response.value;
        });

        const item = validWebMapItems[0];

        if (!item) {
            console.error("Could not load an item to display");
            return;
        }
        this._createMapFromId(item);

        document.body.classList.remove(CSS.loading);
    }
    async _handleT9N() {

        registerMessageBundleLoader(
            createJSONLoader({
                pattern: "ts-tutorial-app/",
                base: "ts-tutorial-app",
                location: new URL("./", window.location.href)
            })
        );
        this.bundle = await fetchMessageBundle(this.bundleName);
    }
    async _createMapFromId(item) {
        const { config } = this.base;
        config.title = !config.title ? getItemTitle(item) : "";
        setPageTitle(config.title);
        const portalItem: __esri.PortalItem = this.base.results.applicationItem
            .value;
        const appProxies =
            portalItem && portalItem.applicationProxies
                ? portalItem.applicationProxies
                : null;

        const viewContainerNode = document.getElementById("viewContainer");
        const defaultViewProperties = getConfigViewProperties(config);

        const viewNode = document.createElement("div");
        viewContainerNode.appendChild(viewNode);
        const viewProperties = {
            ...defaultViewProperties,
            container: viewNode
        };

        const map = await createMapFromItem({ item, appProxies });


        const view = await createView({
            ...viewProperties,
            map
        });

        const greetingsWidget = new HelloWorld({
            firstName: "Jane",
            lastName: "Doe",
            container: document.createElement("div")
        });

        view.ui.add(greetingsWidget, "bottom-right");
        const legend = new Legend({
            view
        });

        const expand = new Expand({
            content: legend,
            expandTooltip: this.bundle.tools.expandLegendTip
        });
        view.ui.add(expand, "top-left");

        // Update expand tooltip when locale changes 
        autoUpdatedStrings.add({ obj: expand, property: "expandTooltip", bundleName: this.bundleName, key: "tools.expandLegendTip" });


        const b = document.createElement("button");
        b.classList.add("app-locale-button")
        b.innerHTML = "Toggle Locale (French - English)";
        view.ui.add(b, { position: "top-right", index: 0 })
        b.addEventListener("click", () => {
            getLocale() === "fr" ? setLocale("en") : setLocale("fr");
        });

    }

}

