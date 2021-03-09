import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "src/App";

import "bootstrap/dist/css/bootstrap.min.css";

Sentry.init({
	dsn: "https://7db268bc22fa4037953c19299996e528@o546871.ingest.sentry.io/5668777",
	release: "hansei-timetable@" + process.env.npm_package_version,
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("app"));
