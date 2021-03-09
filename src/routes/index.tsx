import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Login } from "src/pages";

const Loading: React.FC = () => {
	return <div></div>;
};

const Router: React.FC = () => (
	<BrowserRouter>
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route path="/login" component={Login} />
			</Switch>
		</Suspense>
	</BrowserRouter>
);

export default Router;
