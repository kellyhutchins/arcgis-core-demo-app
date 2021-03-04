
import "./styles/style.scss";
import applicationBaseJSON from "./config/applicationBase.json";
import applicationJSON from "./config/application.json";
import ApplicationBase from "./ApplicationBase/ApplicationBase";

import Main from "./Main";
new ApplicationBase({
    config: applicationJSON,
    settings: applicationBaseJSON
}).load().then(base => new Main(base), (message) => {
    if (message === "identity-manager:not-authorized") {
        document.body.classList.remove("configurable-application--loading");
        document.body.classList.add("app-error");
    }
});