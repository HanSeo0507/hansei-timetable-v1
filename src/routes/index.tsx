import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "src/components";

import { Login, Main } from "src/pages";

const Loading: React.FC = () => {
	return <div></div>;
};

const Router: React.FC = () => (
	<BrowserRouter>
		<Suspense fallback={<Loading />}>
			<Switch>
				{" "}
				<PrivateRoute exact path="/" component={Main} />
				<Route path="/login" component={Login} />
			</Switch>
		</Suspense>
	</BrowserRouter>
);

export default Router;
