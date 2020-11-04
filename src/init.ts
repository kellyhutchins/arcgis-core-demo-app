
import "./styles/style.scss";
import applicationBaseJSON from "./config/applicationBase.json";
import applicationJSON from "./config/application.json";
import ApplicationBase from "./ApplicationBase/ApplicationBase";

import Main from "./Main";
new ApplicationBase({
    config: applicationJSON,
    settings: applicationBaseJSON
}).load().then(base => new Main(base), (message) => {
    console.log("Message")
    if (message === "identity-manager:not-authorized") {
        document.body.classList.remove("configurable-application--loading");
        document.body.classList.add("app-error");
        // todo support new localization
        // document.getElementById("viewContainer").innerHTML = `<h1>${i18n.licenseError.title}</h1><p>${i18n.licenseError.message}</p>`;
    }
});